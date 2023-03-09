import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Certificate extends Entity {
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
  Name: string;

  @property({
    type: 'date',
    required: true,
  })
  IssuedDate: string;

  @property({
    type: 'date',
  })
  ExpiredDate?: string;

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
    mongodb: {
      type: 'ObjectId'
    }
  })
  employeeId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Certificate>) {
    super(data);
  }
}

export interface CertificateRelations {
  // describe navigational properties here
}

export type CertificateWithRelations = Certificate & CertificateRelations;
