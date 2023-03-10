import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Employee} from './employee.model';
import {SalaryCoef} from './salary-coef.model';

@model({settings: {strict: false}})
export class Salary extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amout: number;

  @property({
    type: 'date',
    default: Date(),
  })
  AppliedDate?: string;

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

  @belongsTo(() => SalaryCoef)
  salaryCoefId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Salary>) {
    super(data);
  }
}

export interface SalaryRelations {
  // describe navigational properties here
}

export type SalaryWithRelations = Salary & SalaryRelations;
