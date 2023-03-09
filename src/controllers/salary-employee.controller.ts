import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Salary,
  Employee,
} from '../models';
import {SalaryRepository} from '../repositories';

export class SalaryEmployeeController {
  constructor(
    @repository(SalaryRepository)
    public salaryRepository: SalaryRepository,
  ) { }

  @get('/salaries/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to Salary',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.string('id') id: typeof Salary.prototype.id,
  ): Promise<Employee> {
    return this.salaryRepository.employee(id);
  }
}
