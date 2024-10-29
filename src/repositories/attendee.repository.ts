import { injectable, inject } from 'inversify';

import { TYPES } from 'di/types';
import { AttendeeModel, AttendeeModelDto } from 'db/models';
import { BaseRepository } from './base.repository';

@injectable()
export class AttendeeRepository extends BaseRepository<
  AttendeeModelDto,
  AttendeeModel
> {
  constructor(
    @inject(TYPES.AttendeeModel) protected model: typeof AttendeeModel,
  ) {
    super(model);
  }
}
