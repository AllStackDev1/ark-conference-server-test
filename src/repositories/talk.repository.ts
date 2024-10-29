import { injectable, inject } from 'inversify';

import { TYPES } from 'di/types';
import { TalkModel, TalkModelDto } from 'db/models';
import { BaseRepository } from './base.repository';

@injectable()
export class TalkRepository extends BaseRepository<TalkModelDto, TalkModel> {
  constructor(@inject(TYPES.TalkModel) protected model: typeof TalkModel) {
    super(model);
  }
}
