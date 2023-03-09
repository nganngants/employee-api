import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {EmpDbDataSource} from '../datasources';
import {Salary, SalaryRelations, Employee, SalaryCoef} from '../models';
import {EmployeeRepository} from './employee.repository';
import {SalaryCoefRepository} from './salary-coef.repository';

export class SalaryRepository extends DefaultCrudRepository<
  Salary,
  typeof Salary.prototype.id,
  SalaryRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof Salary.prototype.id>;

  public readonly salaryCoef: BelongsToAccessor<SalaryCoef, typeof Salary.prototype.id>;

  constructor(
    @inject('datasources.EmpDb') dataSource: EmpDbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('SalaryCoefRepository') protected salaryCoefRepositoryGetter: Getter<SalaryCoefRepository>,
  ) {
    super(Salary, dataSource);
    this.salaryCoef = this.createBelongsToAccessorFor('salaryCoef', salaryCoefRepositoryGetter,);
    this.registerInclusionResolver('salaryCoef', this.salaryCoef.inclusionResolver);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
