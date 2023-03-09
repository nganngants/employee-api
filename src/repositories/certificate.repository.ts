import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EmpDbDataSource} from '../datasources';
import {Certificate, CertificateRelations} from '../models';

export class CertificateRepository extends DefaultCrudRepository<
  Certificate,
  typeof Certificate.prototype.id,
  CertificateRelations
> {
  constructor(
    @inject('datasources.EmpDb') dataSource: EmpDbDataSource,
  ) {
    super(Certificate, dataSource);
  }
}
