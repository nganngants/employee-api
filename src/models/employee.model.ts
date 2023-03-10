import {Entity, hasMany, model, property} from '@loopback/repository';
import {Certificate} from './certificate.model';
import {Working} from './working.model';

@model({settings: {strict: false}})
export class Employee extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  EmpId?: string;

  @property({
    type: 'string',
    required: true,
  })
  FullName: string;

  @property({
    type: 'date',
    required: true,
  })
  DateOfBirth: string;

  @property({
    type: 'string',
  })
  Address?: string;

  @property({
    type: 'string',
  })
  Birthplace?: string;

  @property({
    type: 'string',
  })
  PhoneNumber?: string;

  @property({
    type: 'string',
  })
  Email?: string;

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

  @property({
    type: 'string',
  })
  avatarURL?: string;

  @hasMany(() => Certificate)
  certificates?: Certificate[];

  @hasMany(() => Working)
  workings?: Working[];
  //@hasMany(() => Department, {through : {model: () => Working}})
  //departments?: Department[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
