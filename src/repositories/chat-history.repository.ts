import { injectable, inject } from 'inversify';

import { TYPES } from 'di/types';
import { ChatHistoryModel, ChatHistoryModelDto } from 'db/models';
import { BaseRepository } from './base.repository';

@injectable()
export class ChatHistoryRepository extends BaseRepository<
  ChatHistoryModelDto,
  ChatHistoryModel
> {
  constructor(
    @inject(TYPES.ChatHistoryModel) protected model: typeof ChatHistoryModel,
  ) {
    super(model);
  }
}
