import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EmpDbDataSource} from '../datasources';
import {SalaryCoef, SalaryCoefRelations} from '../models';

export class SalaryCoefRepository extends DefaultCrudRepository<
  SalaryCoef,
  typeof SalaryCoef.prototype.id,
  SalaryCoefRelations
> {
  constructor(
    @inject('datasources.EmpDb') dataSource: EmpDbDataSource,
  ) {
    super(SalaryCoef, dataSource);
  }
}
