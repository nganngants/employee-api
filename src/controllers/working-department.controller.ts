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
  Department,
} from '../models';
import {WorkingRepository} from '../repositories';

export class WorkingDepartmentController {
  constructor(
    @repository(WorkingRepository)
    public workingRepository: WorkingRepository,
  ) { }

  @get('/workings/{id}/department', {
    responses: {
      '200': {
        description: 'Department belonging to Working',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Department)},
          },
        },
      },
    },
  })
  async getDepartment(
    @param.path.string('id') id: typeof Working.prototype.id,
  ): Promise<Department> {
    return this.workingRepository.department(id);
  }
}
