import { IBase } from './base.model';

export interface ICreateContact {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

export interface IContact extends IBase, ICreateContact {}
