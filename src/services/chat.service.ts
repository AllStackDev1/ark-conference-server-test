import { injectable, inject } from 'inversify';
import { NOT_FOUND } from 'http-status';

import { TYPES } from 'di/types';
import { AppError } from 'utils';
import { BaseService } from './base.service';
import {
  ChatHistoryRepository,
  ChatMemberRepository,
  ChatRepository,
} from 'repositories';
import {
  ChatHistoryModelDto,
  ChatMemberModelDto,
  ChatModelDto,
} from 'db/models';
import type { CreateChatSchema } from 'validators';

export interface IChatService {
  create(dto: CreateChatSchema): Promise<ChatModelDto>;
  getById(id: string): Promise<ChatModelDto | null>;
  getChatMembers(chatId: string): Promise<ChatMemberModelDto[]>;
  getChatHistories(chatId: string): Promise<ChatHistoryModelDto[]>;
}

@injectable()
export class ChatService extends BaseService implements IChatService {
  constructor(
    @inject(TYPES.ChatRepository)
    private repo: ChatRepository,
    @inject(TYPES.ChatMemberRepository)
    protected memberRepo: ChatMemberRepository,
    @inject(TYPES.ChatHistoryRepository)
    protected historyRepo: ChatHistoryRepository,
  ) {
    super();
  }

  public async create(dto: CreateChatSchema) {
    return await this.repo.create(dto);
  }

  public async getById(id: string) {
    const chat = await this.repo.getById(id);
    if (chat) return chat;
    throw new AppError('No chat found', NOT_FOUND);
  }

  public async getChatMembers(chatId: string) {
    return await this.memberRepo.getAll({ chatId });
  }

  public async getChatHistories(chatId: string) {
    return await this.historyRepo.getAll({ chatId });
  }
}
