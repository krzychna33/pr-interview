export interface IContactDb {
  id: string;
  createdDate: Date;
  updatedDate: Date;

  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

export interface ICreateContact {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}
