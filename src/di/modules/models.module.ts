import { ContainerModule, interfaces } from 'inversify';

import { TYPES } from 'di/types';
import {
  UserModel,
  ChatModel,
  TalkModel,
  AttendeeModel,
  ChatMemberModel,
  ConferenceModel,
  ChatHistoryModel,
} from 'db/models';

const initializeModule = (bind: interfaces.Bind) => {
  bind(TYPES.UserModel).toFunction(UserModel);
  bind(TYPES.ChatModel).toFunction(ChatModel);
  bind(TYPES.TalkModel).toFunction(TalkModel);
  bind(TYPES.AttendeeModel).toFunction(AttendeeModel);
  bind(TYPES.ChatMemberModel).toFunction(ChatMemberModel);
  bind(TYPES.ConferenceModel).toFunction(ConferenceModel);
  bind(TYPES.ChatHistoryModel).toFunction(ChatHistoryModel);
};

export const ModelsModule = new ContainerModule(initializeModule);
