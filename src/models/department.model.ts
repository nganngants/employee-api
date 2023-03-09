import {Entity, hasMany, model, property} from '@loopback/repository';
import {Employee} from './employee.model';
import {Working} from './working.model';

@model({settings: {strict: false}})
export class Department extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'date',
    default: Date(),
  })
  CreatedDate?: string;

  @property({
    type: 'date',
    default: Date(),
  })
  UpdatedDate?: string;

  @hasMany(() => Employee, {through: {model: () => Working}})
  employees: Employee[];

  @hasMany(() => Working)
  workings: Working[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
