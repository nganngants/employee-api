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
  Salary,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeSalaryController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/salaries', {
    responses: {
      '200': {
        description: 'Array of Employee has many Salary',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Salary)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Salary>,
  ): Promise<Salary[]> {
    return this.employeeRepository.salaries(id).find(filter);
  }

  @post('/employees/{id}/salaries', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Salary)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salary, {
            title: 'NewSalaryInEmployee',
            exclude: ['id'],
            optional: ['employeeId']
          }),
        },
      },
    }) salary: Omit<Salary, 'id'>,
  ): Promise<Salary> {
    return this.employeeRepository.salaries(id).create(salary);
  }

  @patch('/employees/{id}/salaries', {
    responses: {
      '200': {
        description: 'Employee.Salary PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salary, {partial: true}),
        },
      },
    })
    salary: Partial<Salary>,
    @param.query.object('where', getWhereSchemaFor(Salary)) where?: Where<Salary>,
  ): Promise<Count> {
    return this.employeeRepository.salaries(id).patch(salary, where);
  }

  @del('/employees/{id}/salaries', {
    responses: {
      '200': {
        description: 'Employee.Salary DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Salary)) where?: Where<Salary>,
  ): Promise<Count> {
    return this.employeeRepository.salaries(id).delete(where);
  }
}
