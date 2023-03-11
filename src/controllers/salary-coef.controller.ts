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
import {SalaryCoef} from '../models';
import {SalaryCoefRepository} from '../repositories';

export class SalaryCoefController {
  constructor(
    @repository(SalaryCoefRepository)
    public salaryCoefRepository : SalaryCoefRepository,
  ) {}

  @post('/salary-coefs')
  @response(200, {
    description: 'SalaryCoef model instance',
    content: {'application/json': {schema: getModelSchemaRef(SalaryCoef)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaryCoef, {
            title: 'NewSalaryCoef',
            exclude: ['id'],
          }),
        },
      },
    })
    salaryCoef: Omit<SalaryCoef, 'id'>,
  ): Promise<SalaryCoef> {
    return this.salaryCoefRepository.create(salaryCoef);
  }

  @get('/salary-coefs/count')
  @response(200, {
    description: 'SalaryCoef model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SalaryCoef) where?: Where<SalaryCoef>,
  ): Promise<Count> {
    return this.salaryCoefRepository.count(where);
  }

  @get('/salary-coefs')
  @response(200, {
    description: 'Array of SalaryCoef model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SalaryCoef, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SalaryCoef) filter?: Filter<SalaryCoef>,
  ): Promise<SalaryCoef[]> {
    return this.salaryCoefRepository.find(filter);
  }

  @patch('/salary-coefs')
  @response(200, {
    description: 'SalaryCoef PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaryCoef, {partial: true}),
        },
      },
    })
    salaryCoef: SalaryCoef,
    @param.where(SalaryCoef) where?: Where<SalaryCoef>,
  ): Promise<Count> {
    return this.salaryCoefRepository.updateAll(salaryCoef, where);
  }

  @get('/salary-coefs/{id}')
  @response(200, {
    description: 'SalaryCoef model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SalaryCoef, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SalaryCoef, {exclude: 'where'}) filter?: FilterExcludingWhere<SalaryCoef>
  ): Promise<SalaryCoef> {
    return this.salaryCoefRepository.findById(id, filter);
  }

  @patch('/salary-coefs/{id}')
  @response(204, {
    description: 'SalaryCoef PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaryCoef, {partial: true}),
        },
      },
    })
    salaryCoef: SalaryCoef,
  ): Promise<void> {
    await this.salaryCoefRepository.updateById(id, salaryCoef);
  }

  @put('/salary-coefs/{id}')
  @response(204, {
    description: 'SalaryCoef PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() salaryCoef: SalaryCoef,
  ): Promise<void> {
    await this.salaryCoefRepository.replaceById(id, salaryCoef);
  }

  @del('/salary-coefs/{id}')
  @response(204, {
    description: 'SalaryCoef DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.salaryCoefRepository.deleteById(id);
  }
}
