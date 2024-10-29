import { ContainerModule, interfaces } from 'inversify';
import {
  UserRepository,
  ChatRepository,
  TalkRepository,
  AttendeeRepository,
  ConferenceRepository,
  ChatMemberRepository,
  ChatHistoryRepository,
} from 'repositories';

import { TYPES } from 'di/types';

const initializeModule = (bind: interfaces.Bind) => {
  bind<UserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
  bind<ChatRepository>(TYPES.ChatRepository)
    .to(ChatRepository)
    .inSingletonScope();
  bind<TalkRepository>(TYPES.TalkRepository)
    .to(TalkRepository)
    .inSingletonScope();
  bind<AttendeeRepository>(TYPES.AttendeeRepository)
    .to(AttendeeRepository)
    .inSingletonScope();
  bind<ConferenceRepository>(TYPES.ConferenceRepository)
    .to(ConferenceRepository)
    .inSingletonScope();
  bind<ChatMemberRepository>(TYPES.ChatMemberRepository)
    .to(ChatMemberRepository)
    .inSingletonScope();
  bind<ChatHistoryRepository>(TYPES.ChatHistoryRepository)
    .to(ChatHistoryRepository)
    .inSingletonScope();
};

export const RepositoriesModule = new ContainerModule(initializeModule);
