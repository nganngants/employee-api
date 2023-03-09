import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {EmpDbDataSource} from '../datasources';
import {Department, DepartmentRelations, Employee, Working} from '../models';
import {WorkingRepository} from './working.repository';
import {EmployeeRepository} from './employee.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {

  public readonly employees: HasManyThroughRepositoryFactory<Employee, typeof Employee.prototype.id,
          Working,
          typeof Department.prototype.id
        >;

  public readonly workings: HasManyRepositoryFactory<Working, typeof Department.prototype.id>;

  constructor(
    @inject('datasources.EmpDb') dataSource: EmpDbDataSource, @repository.getter('WorkingRepository') protected workingRepositoryGetter: Getter<WorkingRepository>, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Department, dataSource);
    this.workings = this.createHasManyRepositoryFactoryFor('workings', workingRepositoryGetter,);
    this.registerInclusionResolver('workings', this.workings.inclusionResolver);
    this.employees = this.createHasManyThroughRepositoryFactoryFor('employees', employeeRepositoryGetter, workingRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
