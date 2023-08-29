import { IBase } from './base.model';

export interface ICreateAddress {
  address: string;
  city: string;
  postalCode: string;
}

export interface IAddress extends IBase, ICreateAddress {}
