import { BaseModel } from '@rester/orm';

export interface Surf extends BaseModel {

  author?: string;

  content: string;

  like: number;

  createdAt: Date;

  updatedAt: Date;

}

export type SurfID = string;

export type SurfInsertParams = Pick<Surf, 'content'> & Partial<Pick<Surf, 'author'>>;

export type SurfUpdateParams = Partial<SurfInsertParams>;
