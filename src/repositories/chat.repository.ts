import { injectable, inject } from 'inversify';

import { TYPES } from 'di/types';
import { ChatModel, ChatModelDto } from 'db/models';
import { BaseRepository } from './base.repository';

@injectable()
export class ChatRepository extends BaseRepository<ChatModelDto, ChatModel> {
  constructor(@inject(TYPES.ChatModel) protected model: typeof ChatModel) {
    super(model);
  }
}
