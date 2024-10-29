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
import { TalkModel } from './talk.model';

class AttendeeModel extends Model<AttendeeModelDto> {
  declare userId: string;
  declare conferenceId: string;
  declare id?: CreationOptional<string>;
  declare createdAt?: CreationOptional<string>;
  declare updatedAt?: CreationOptional<string>;

  declare static associations: {
    user: Association<AttendeeModel, UserModel>;
    talks: Association<AttendeeModel, TalkModel>;
  };
}

AttendeeModel.init(
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: { model: 'Users', key: 'id' },
    },
    conferenceId: {
      allowNull: false,
      onDelete: 'CASCADE',
      type: DataTypes.UUID,
      references: { model: 'Conferences', key: 'id' },
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
  { sequelize, freezeTableName: true, modelName: 'Attendees' },
);

// Define associations within the models
AttendeeModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' });

decorate(injectable(), AttendeeModel);

export { AttendeeModel };

export type AttendeeModelDto = InferAttributes<AttendeeModel>;
