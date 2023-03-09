import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Working} from '../models';
import {WorkingRepository} from '../repositories';

export class WorkingController {
  constructor(
    @repository(WorkingRepository)
    public workingRepository : WorkingRepository,
  ) {}

  @post('/workings')
  @response(200, {
    description: 'Working model instance',
    content: {'application/json': {schema: getModelSchemaRef(Working)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Working, {
            title: 'NewWorking',
            exclude: ['id'],
          }),
        },
      },
    })
    working: Omit<Working, 'id'>,
  ): Promise<Working> {
    return this.workingRepository.create(working);
  }

  @get('/workings/count')
  @response(200, {
    description: 'Working model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Working) where?: Where<Working>,
  ): Promise<Count> {
    return this.workingRepository.count(where);
  }

  @get('/workings')
  @response(200, {
    description: 'Array of Working model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Working, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Working) filter?: Filter<Working>,
  ): Promise<Working[]> {
    return this.workingRepository.find(filter);
  }

  @patch('/workings')
  @response(200, {
    description: 'Working PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Working, {partial: true}),
        },
      },
    })
    working: Working,
    @param.where(Working) where?: Where<Working>,
  ): Promise<Count> {
    return this.workingRepository.updateAll(working, where);
  }

  @get('/workings/{id}')
  @response(200, {
    description: 'Working model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Working, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Working, {exclude: 'where'}) filter?: FilterExcludingWhere<Working>
  ): Promise<Working> {
    return this.workingRepository.findById(id, filter);
  }

  @patch('/workings/{id}')
  @response(204, {
    description: 'Working PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Working, {partial: true}),
        },
      },
    })
    working: Working,
  ): Promise<void> {
    await this.workingRepository.updateById(id, working);
  }

  @put('/workings/{id}')
  @response(204, {
    description: 'Working PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() working: Working,
  ): Promise<void> {
    await this.workingRepository.replaceById(id, working);
  }

  @del('/workings/{id}')
  @response(204, {
    description: 'Working DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.workingRepository.deleteById(id);
  }
}
