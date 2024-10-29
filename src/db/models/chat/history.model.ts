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
import { UserModel } from '../user.model';

class ChatHistoryModel extends Model<ChatHistoryModelDto> {
  declare chatId: string;
  declare timestamp: Date;
  declare message: string;
  declare id?: CreationOptional<string>;
  declare senderId?: CreationOptional<string>;

  declare static associations: {
    sender?: Association<ChatHistoryModel, UserModel>;
  };
}

ChatHistoryModel.init(
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
    },
    senderId: {
      allowNull: true,
      type: DataTypes.UUID,
      references: { model: 'Users', key: 'id' },
    },
    chatId: {
      allowNull: false,
      onDelete: 'CASCADE',
      type: DataTypes.UUID,
      references: { model: 'Chats', key: 'id' },
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    timestamp: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'ChatHistories',
    timestamps: false,
  },
);

// Define associations within the models
ChatHistoryModel.belongsTo(UserModel, { foreignKey: 'senderId', as: 'sender' });

decorate(injectable(), ChatHistoryModel);

export { ChatHistoryModel };

export type ChatHistoryModelDto = InferAttributes<ChatHistoryModel>;
