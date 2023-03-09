import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Employee,
  Certificate,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeCertificateController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/certificates', {
    responses: {
      '200': {
        description: 'Array of Employee has many Certificate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Certificate)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Certificate>,
  ): Promise<Certificate[]> {
    return this.employeeRepository.certificates(id).find(filter);
  }

  @post('/employees/{id}/certificates', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Certificate)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificate, {
            title: 'NewCertificateInEmployee',
            exclude: ['id'],
            optional: ['employeeId']
          }),
        },
      },
    }) certificate: Omit<Certificate, 'id'>,
  ): Promise<Certificate> {
    return this.employeeRepository.certificates(id).create(certificate);
  }

  @patch('/employees/{id}/certificates', {
    responses: {
      '200': {
        description: 'Employee.Certificate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificate, {partial: true}),
        },
      },
    })
    certificate: Partial<Certificate>,
    @param.query.object('where', getWhereSchemaFor(Certificate)) where?: Where<Certificate>,
  ): Promise<Count> {
    return this.employeeRepository.certificates(id).patch(certificate, where);
  }

  @del('/employees/{id}/certificates', {
    responses: {
      '200': {
        description: 'Employee.Certificate DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Certificate)) where?: Where<Certificate>,
  ): Promise<Count> {
    return this.employeeRepository.certificates(id).delete(where);
  }
}
