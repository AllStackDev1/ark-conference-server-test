import { injectable, inject } from 'inversify';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { useAdapter } from '@type-cacheable/ioredis-adapter';
import { Cacheable, CacheUpdate } from '@type-cacheable/core';

import { TYPES } from 'di/types';
import { AppError } from 'utils';
import { BaseService } from './base.service';
import {
  AttendeeRepository,
  ChatMemberRepository,
  ChatRepository,
  ConferenceRepository,
  TalkRepository,
} from 'repositories';
import { RedisService } from './redis.service';
import {
  TalkModel,
  ChatModelDto,
  AttendeeModel,
  ChatHistoryModel,
  AttendeeModelDto,
  ConferenceModelDto,
} from 'db/models';
import type {
  CreateTalkSchema,
  UpdateTalkSchema,
  CreateAttendeeSchema,
  UpdateConferenceSchema,
  CreateConferenceSchema,
} from 'validators';

export interface IConferenceService {
  getAllConferences(): Promise<{ data: ConferenceModelDto[]; message: string }>;
  getConferenceById(id: string): Promise<ConferenceModelDto | null>;
  update(
    id: string,
    payload: UpdateConferenceSchema,
  ): Promise<ConferenceModelDto | null>;
  delete(id: string): Promise<number>;
  addAttendeeToConference(
    id: string,
    dto: CreateAttendeeSchema,
  ): Promise<AttendeeModelDto>;
  addTalkToConference(
    id: string,
    dto: CreateTalkSchema,
  ): Promise<ConferenceModelDto | null>;
  addAttendeeToConference(
    id: string,
    dto: CreateAttendeeSchema,
  ): Promise<AttendeeModelDto>;
  addTalkToAttendee(
    attendee: string,
    talkId: string,
  ): Promise<{ chat: ChatModelDto; conference: ConferenceModelDto }>;
}

@injectable()
export class ConferenceService
  extends BaseService
  implements IConferenceService
{
  constructor(
    @inject(TYPES.RedisService)
    redisService: RedisService,
    @inject(TYPES.TalkRepository)
    protected talkRepo: TalkRepository,
    @inject(TYPES.ConferenceRepository)
    protected repo: ConferenceRepository,
    @inject(TYPES.ChatRepository)
    protected chatRepo: ChatRepository,
    @inject(TYPES.ChatMemberRepository)
    protected memberRepo: ChatMemberRepository,
    @inject(TYPES.AttendeeRepository)
    protected attendeeRepo: AttendeeRepository,
  ) {
    super();
    useAdapter(
      redisService.getClient({
        enableOfflineQueue: true,
      }),
      false,
      { ttlSeconds: 3600 },
    );
  }

  @CacheUpdate({
    cacheKey: (_, __, result) => result.id,
    cacheKeysToClear: ['conferences'],
  })
  public async create(dto: CreateConferenceSchema) {
    return await this.repo.create(dto);
  }

  @Cacheable({ cacheKey: 'conferences' })
  public async getAllConferences() {
    const conferences = await this.repo.getAll();
    return {
      data: conferences,
      message: `${conferences.length} conference${conferences.length > 1 ? 's' : ''} found.`,
    };
  }

  // @Cacheable({ cacheKey: ([id]) => id })
  public async getConferenceById(id: string) {
    const conference = await this.repo.getById(id, {
      include: [
        {
          model: AttendeeModel,
          as: 'attendees',
          include: ['user'],
        },
        {
          model: TalkModel,
          as: 'talks',
          required: false,
          include: [
            {
              model: AttendeeModel,
              as: 'attendees',
              include: ['user'],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    if (conference) return conference;
    throw new AppError('No conference found', NOT_FOUND);
  }

  @CacheUpdate({
    cacheKey: (args, ctx, result) => result.id,
    cacheKeysToClear: () => ['Conferences'],
  })
  public async update(id: string, payload: UpdateConferenceSchema) {
    const [updatedRows] = await this.repo.updateById(id, payload);

    if (updatedRows) {
      const conference = await this.repo.getById(id);
      if (conference) return conference;
    }
    throw new AppError('Unable to update, please try again.', BAD_REQUEST);
  }

  // @CacheClear({ cacheKey: ([id]) => [id, 'conferences'] })
  public async delete(id: string) {
    return this.repo.deleteById(id);
  }

  public async addTalkToConference(
    conferenceId: string,
    dto: CreateTalkSchema,
  ) {
    await this.talkRepo.create({ conferenceId, ...dto });
    return await this.getConferenceById(conferenceId);
  }

  public async updateTalk(talkId: string, payload: UpdateTalkSchema) {
    const [updatedRows] = await this.talkRepo.updateById(talkId, payload);

    if (updatedRows) {
      const talk = await this.talkRepo.getById(talkId);
      if (talk) return talk;
    }
    throw new AppError('Unable to update, please try again.', BAD_REQUEST);
  }

  public async removeTalk(id: string) {
    return await this.talkRepo.deleteById(id);
  }

  public async addAttendeeToConference(
    conferenceId: string,
    dto: CreateAttendeeSchema,
  ) {
    return await this.attendeeRepo.create({ conferenceId, ...dto });
  }

  public async addTalkToAttendee(attendeeId: string, talkId: string) {
    const attendee = await this.attendeeRepo.getById(attendeeId);
    if (attendee) {
      // @ts-expect-error ts fooling
      await attendee?.addTalk(talkId);

      let chat = await this.chatRepo.getOne(
        { talkId: talkId },
        {
          include: [
            {
              model: ChatHistoryModel,
              as: 'histories',
              include: ['sender'],
            },
          ],
        },
      );

      if (!chat) {
        chat = await this.chatRepo.create({ talkId: talkId });
      }

      // Optional: Check if the user is already a member
      const existingMember = await this.memberRepo.getOne({
        chatId: chat.id,
        userId: attendee.userId,
      });

      if (!existingMember) {
        await this.memberRepo.create({
          chatId: chat.id as string,
          userId: attendee.userId,
          joinedAt: new Date(),
        });
      }

      return {
        chat,
        conference: await this.getConferenceById(attendee.conferenceId),
      };
    }

    throw new AppError('Unable to update, please try again.', BAD_REQUEST);
  }
}
