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
  Working,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeWorkingController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/workings', {
    responses: {
      '200': {
        description: 'Array of Employee has many Working',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Working)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Working>,
  ): Promise<Working[]> {
    return this.employeeRepository.workings(id).find(filter);
  }

  @post('/employees/{id}/workings', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Working)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Working, {
            title: 'NewWorkingInEmployee',
            exclude: ['id'],
            optional: ['employeeId']
          }),
        },
      },
    }) working: Omit<Working, 'id'>,
  ): Promise<Working> {
    return this.employeeRepository.workings(id).create(working);
  }

  @patch('/employees/{id}/workings', {
    responses: {
      '200': {
        description: 'Employee.Working PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Working, {partial: true}),
        },
      },
    })
    working: Partial<Working>,
    @param.query.object('where', getWhereSchemaFor(Working)) where?: Where<Working>,
  ): Promise<Count> {
    return this.employeeRepository.workings(id).patch(working, where);
  }

  @del('/employees/{id}/workings', {
    responses: {
      '200': {
        description: 'Employee.Working DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Working)) where?: Where<Working>,
  ): Promise<Count> {
    return this.employeeRepository.workings(id).delete(where);
  }
}
