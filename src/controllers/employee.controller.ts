import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody, response
} from '@loopback/rest';
import _ from 'lodash';
import {FILE_UPLOAD_SERVICE} from '../keys';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';
import {FileUpload} from '../services/file-upload.service';

export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository : EmployeeRepository,
    @inject(FILE_UPLOAD_SERVICE) private fileUploadHandler: FileUpload,
    //@inject('controllers.UploadController') private upload: UploadController,
  ) {}

  @post('/employees')
  @response(200, {
    description: 'Employee model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employee)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployee',
            exclude: ['id'],
          }),
        },
      },
    })
    employee: Omit<Employee, 'id' >,
    //request: Request,
    //@inject(RestBindings.Http.RESPONSE) res: Response,
    ): Promise<Employee> {

      // const uploadedFiles = await new Promise<Express.Multer.File[]>((resolve, reject) => {
      //   this.fileUploadHandler(request, res, (err) => {
      //     if (err) reject(err);
      //     else resolve(request.files as Express.Multer.File[]);
      //   });
      // });

      // const file = uploadedFiles.find(f => f.fieldname === 'avatar');
      //const employee = request.body;
      // if (file) {
      //   //employee.avatar = file.buffer;
      //   employee.avatarURL = file.path;
      //   //employee.avatarURL = `/employees/${employee.id}/avatar`;
      // }
    const certList = employee.certificateList || null;
    const work = employee.working || null;
    const toCreate = _.omit(employee, 'certificateList', 'working');
    const created = await this.employeeRepository.create(toCreate);
    if (Array.isArray(certList))
    {
      for (const cert of certList) {
        await this.employeeRepository.certificates(created.id).create(cert);
      }
    }
    if (work != null)
    {
      await this.employeeRepository.workings(created.id).create(work);
    }

    return this.employeeRepository.findById(created.id, { include: [{relation: 'certificates'}, {relation: 'workings'}] });

  }

  @get('/employees/count')
  @response(200, {
    description: 'Employee model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.count(where);
  }

  @get('/employees')
  @response(200, {
    description: 'Array of Employee model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employee, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employee) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeeRepository.find(filter);
  }

  @patch('/employees')
  @response(200, {
    description: 'Employee PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.updateAll(employee, where);
  }

  @get('/employees/{id}')
  @response(200, {
    description: 'Employee model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Employee, {exclude: 'where'}) filter?: FilterExcludingWhere<Employee>
  ): Promise<Employee> {
    return this.employeeRepository.findById(id, filter);
  }

  @patch('/employees/{id}')
  @response(204, {
    description: 'Employee PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.updateById(id, employee);
  }

  @put('/employees/{id}')
  @response(204, {
    description: 'Employee PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.replaceById(id, employee);
  }

  @del('/employees/{id}')
  @response(204, {
    description: 'Employee DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.employeeRepository.deleteById(id);
  }
}
