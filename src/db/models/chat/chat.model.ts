import {
  Model,
  UUIDV4,
  DataTypes,
  InferAttributes,
  CreationOptional,
  Association,
} from 'sequelize';
import { decorate, injectable } from 'inversify';

import sequelize from 'configs/sequelize.config';
import { ChatMemberModel } from './member.model';
import { ChatHistoryModel } from './history.model';
import { TalkModel } from '../conference';

class ChatModel extends Model<ChatModelDto> {
  declare talkId: string;
  declare id?: CreationOptional<string>;
  declare createdAt?: CreationOptional<string>;
  declare updatedAt?: CreationOptional<string>;

  declare static associations: {
    members: Association<ChatModel, ChatMemberModel>;
    histories: Association<ChatModel, ChatHistoryModel>;
  };
}

ChatModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
    },
    talkId: {
      unique: true,
      allowNull: false,
      onDelete: 'CASCADE',
      type: DataTypes.UUID,
      references: { model: 'Talks', key: 'id' },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  { sequelize, freezeTableName: true, modelName: 'Chats' },
);

// Define associations within the models
ChatModel.hasMany(ChatMemberModel, { foreignKey: 'chatId', as: 'members' });
ChatMemberModel.belongsTo(ChatModel, { as: 'chat', foreignKey: 'chatId' });

ChatModel.hasMany(ChatHistoryModel, { foreignKey: 'chatId', as: 'histories' });
ChatHistoryModel.belongsTo(ChatModel, { as: 'chat', foreignKey: 'chatId' });

TalkModel.hasOne(ChatModel, { as: 'talk', foreignKey: 'talkId' });
ChatModel.belongsTo(TalkModel, { as: 'talk', foreignKey: 'talkId' });

decorate(injectable(), ChatModel);

export { ChatModel };

export type ChatModelDto = InferAttributes<ChatModel>;
