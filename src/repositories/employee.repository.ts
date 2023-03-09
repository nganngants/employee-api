import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {EmpDbDataSource} from '../datasources';
import {Certificate, Employee, EmployeeRelations, Working} from '../models';
import {CertificateRepository} from './certificate.repository';
import {WorkingRepository} from './working.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly certificates: HasManyRepositoryFactory<Certificate, typeof Employee.prototype.id>;

  public readonly workings: HasManyRepositoryFactory<Working, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.EmpDb') dataSource: EmpDbDataSource, @repository.getter('CertificateRepository') protected certificateRepositoryGetter: Getter<CertificateRepository>, @repository.getter('WorkingRepository') protected workingRepositoryGetter: Getter<WorkingRepository>,
  ) {
    super(Employee, dataSource);
    this.workings = this.createHasManyRepositoryFactoryFor('workings', workingRepositoryGetter,);
    this.registerInclusionResolver('workings', this.workings.inclusionResolver);
    this.certificates = this.createHasManyRepositoryFactoryFor('certificates', certificateRepositoryGetter,);
    this.registerInclusionResolver('certificates', this.certificates.inclusionResolver);


  }
}
