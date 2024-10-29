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
import { AttendeeModel } from './attendee.model';

class TalkModel extends Model<TalkModelDto> {
  declare topic: string;
  declare datetime: Date;
  declare location: string;
  declare conferenceId: string;
  declare AttendeeTalks?: CreationOptional<string>;
  declare id?: CreationOptional<string>;
  declare createdAt?: CreationOptional<string>;
  declare updatedAt?: CreationOptional<string>;

  declare static associations: {
    attendees: Association<TalkModel, AttendeeModel>;
  };
}

TalkModel.init(
  {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
    },
    topic: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    conferenceId: {
      allowNull: false,
      onDelete: 'CASCADE',
      type: DataTypes.UUID,
      references: { model: 'Conferences', key: 'id' },
    },
    datetime: {
      allowNull: false,
      type: DataTypes.DATE,
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
  { sequelize, freezeTableName: true, modelName: 'Talks' },
);

AttendeeModel.belongsToMany(TalkModel, {
  as: 'talks',
  otherKey: 'talkId',
  through: 'AttendeeTalks',
  foreignKey: 'attendeeId', // This should match the actual column name in AttendeeTalks
});
TalkModel.belongsToMany(AttendeeModel, {
  as: 'attendees',
  foreignKey: 'talkId', // This should match the actual column name in AttendeeTalks
  otherKey: 'attendeeId',
  through: 'AttendeeTalks',
});

decorate(injectable(), TalkModel);

export { TalkModel };

export type TalkModelDto = InferAttributes<TalkModel>;
