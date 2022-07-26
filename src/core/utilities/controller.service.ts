import { plainToClass } from 'class-transformer';

type IClassType<T> = new () => T;

export abstract class ControllerService<T, P> {
  constructor(private readonly dtoClass: IClassType<T>) {}

  protected dtoMapper(contact: P) {
    return plainToClass(this.dtoClass, contact, {
      strategy: 'excludeAll',
    });
  }
}
