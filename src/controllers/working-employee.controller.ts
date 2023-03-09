import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Working,
  Employee,
} from '../models';
import {WorkingRepository} from '../repositories';

export class WorkingEmployeeController {
  constructor(
    @repository(WorkingRepository)
    public workingRepository: WorkingRepository,
  ) { }

  @get('/workings/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to Working',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.string('id') id: typeof Working.prototype.id,
  ): Promise<Employee> {
    return this.workingRepository.employee(id);
  }
}
