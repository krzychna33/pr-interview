import { plainToClass } from 'class-transformer';

type IClassType<T> = new () => T;

export abstract class ControllerService<T, P> {
  constructor(private readonly dtoClass: IClassType<T>) {}

  protected dtoMapper(entity: P) {
    return plainToClass(this.dtoClass, entity, {
      strategy: 'excludeAll',
    });
  }
}
