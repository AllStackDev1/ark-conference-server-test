import { ContainerModule, interfaces } from 'inversify';

import { TYPES } from 'di/types';
import {
  AuthService,
  IAuthService,
  UserService,
  IUserService,
  ChatService,
  IChatService,
  RedisService,
  SocketService,
  ConferenceService,
  IConferenceService,
} from 'services';

const initializeModule = (bind: interfaces.Bind) => {
  bind(TYPES.RedisService).to(RedisService).inSingletonScope();
  bind(TYPES.SocketService).to(SocketService).inSingletonScope();
  bind<IAuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
  bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
  bind<IChatService>(TYPES.ChatService).to(ChatService).inSingletonScope();
  bind<IConferenceService>(TYPES.ConferenceService)
    .to(ConferenceService)
    .inSingletonScope();
};

export const ServicesModule = new ContainerModule(initializeModule);
