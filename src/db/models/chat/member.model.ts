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

class ChatMemberModel extends Model<ChatMemberModelDto> {
  declare userId: string;
  declare joinedAt: Date;
  declare id?: CreationOptional<string>;
  declare chatId?: CreationOptional<string>;

  declare static associations: {
    user: Association<ChatMemberModel, UserModel>;
  };
}

ChatMemberModel.init(
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
    },
    userId: {
      // unique: true,
      allowNull: false,
      type: DataTypes.UUID,
      references: { model: 'Users', key: 'id' },
    },
    chatId: {
      allowNull: false,
      onDelete: 'CASCADE',
      type: DataTypes.UUID,
      references: { model: 'Chats', key: 'id' },
    },
    joinedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'ChatMembers',
  },
);

// Define associations within the models
ChatMemberModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

decorate(injectable(), ChatMemberModel);

export { ChatMemberModel };

export type ChatMemberModelDto = InferAttributes<ChatMemberModel>;
