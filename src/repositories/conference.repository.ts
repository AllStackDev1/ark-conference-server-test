import { injectable, inject } from 'inversify';

import { TYPES } from 'di/types';
import { ConferenceModel, ConferenceModelDto } from 'db/models';
import { BaseRepository } from './base.repository';

@injectable()
export class ConferenceRepository extends BaseRepository<
  ConferenceModelDto,
  ConferenceModel
> {
  constructor(
    @inject(TYPES.ConferenceModel) protected model: typeof ConferenceModel,
  ) {
    super(model);
  }
}
