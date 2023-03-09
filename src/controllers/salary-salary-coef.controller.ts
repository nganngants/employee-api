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
  SalaryCoef,
} from '../models';
import {SalaryRepository} from '../repositories';

export class SalarySalaryCoefController {
  constructor(
    @repository(SalaryRepository)
    public salaryRepository: SalaryRepository,
  ) { }

  @get('/salaries/{id}/salary-coef', {
    responses: {
      '200': {
        description: 'SalaryCoef belonging to Salary',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SalaryCoef)},
          },
        },
      },
    },
  })
  async getSalaryCoef(
    @param.path.string('id') id: typeof Salary.prototype.id,
  ): Promise<SalaryCoef> {
    return this.salaryRepository.salaryCoef(id);
  }
}
