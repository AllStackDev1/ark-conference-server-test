import { injectable, inject } from 'inversify';

import { TYPES } from 'di/types';
import { ChatMemberModel, ChatMemberModelDto } from 'db/models';
import { BaseRepository } from './base.repository';

@injectable()
export class ChatMemberRepository extends BaseRepository<
  ChatMemberModelDto,
  ChatMemberModel
> {
  constructor(
    @inject(TYPES.ChatMemberModel) protected model: typeof ChatMemberModel,
  ) {
    super(model);
  }
}
