import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {EmpDbDataSource} from '../datasources';
import {Working, WorkingRelations, Employee, Department} from '../models';
import {EmployeeRepository} from './employee.repository';
import {DepartmentRepository} from './department.repository';

export class WorkingRepository extends DefaultCrudRepository<
  Working,
  typeof Working.prototype.id,
  WorkingRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof Working.prototype.id>;

  public readonly department: BelongsToAccessor<Department, typeof Working.prototype.id>;

  constructor(
    @inject('datasources.EmpDb') dataSource: EmpDbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(Working, dataSource);
    this.department = this.createBelongsToAccessorFor('department', departmentRepositoryGetter,);
    this.registerInclusionResolver('department', this.department.inclusionResolver);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
