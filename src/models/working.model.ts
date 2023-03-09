import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Department} from './department.model';
import {Employee} from './employee.model';

@model({settings: {strict: false}})
export class Working extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Position: string;

  @property({
    type: 'date',
    required: true,
  })
  StartDate: string;

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

  @belongsTo(() => Employee)
  employeeId: string;

  @belongsTo(() => Department)
  departmentId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Working>) {
    super(data);
  }
}

export interface WorkingRelations {
  // describe navigational properties here
}

export type WorkingWithRelations = Working & WorkingRelations;
