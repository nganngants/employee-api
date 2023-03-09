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
  Department,
  Working,
} from '../models';
import {DepartmentRepository} from '../repositories';

export class DepartmentWorkingController {
  constructor(
    @repository(DepartmentRepository) protected departmentRepository: DepartmentRepository,
  ) { }

  @get('/departments/{id}/workings', {
    responses: {
      '200': {
        description: 'Array of Department has many Working',
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
    return this.departmentRepository.workings(id).find(filter);
  }

  @post('/departments/{id}/workings', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {'application/json': {schema: getModelSchemaRef(Working)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Department.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Working, {
            title: 'NewWorkingInDepartment',
            exclude: ['id'],
            optional: ['departmentId']
          }),
        },
      },
    }) working: Omit<Working, 'id'>,
  ): Promise<Working> {
    return this.departmentRepository.workings(id).create(working);
  }

  @patch('/departments/{id}/workings', {
    responses: {
      '200': {
        description: 'Department.Working PATCH success count',
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
    return this.departmentRepository.workings(id).patch(working, where);
  }

  @del('/departments/{id}/workings', {
    responses: {
      '200': {
        description: 'Department.Working DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Working)) where?: Where<Working>,
  ): Promise<Count> {
    return this.departmentRepository.workings(id).delete(where);
  }
}
