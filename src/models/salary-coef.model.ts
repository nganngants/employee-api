import {Entity, model, property} from '@loopback/repository';

@model()
export class SalaryCoef extends Entity {
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
  coef: number;

  @property({
    type: 'number',
    default: 0,
  })
  bonusCoef?: number;


  constructor(data?: Partial<SalaryCoef>) {
    super(data);
  }
}

export interface SalaryCoefRelations {
  // describe navigational properties here
}

export type SalaryCoefWithRelations = SalaryCoef & SalaryCoefRelations;
