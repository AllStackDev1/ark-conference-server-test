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
import { TalkModel } from './talk.model';
import { AttendeeModel } from './attendee.model';

class ConferenceModel extends Model<ConferenceModelDto> {
  declare theme: string;
  declare image: string;
  declare datetime: Date;
  declare location: string;
  declare id?: CreationOptional<string>;
  declare createdAt?: CreationOptional<string>;
  declare updatedAt?: CreationOptional<string>;

  declare static associations: {
    talks: Association<ConferenceModel, TalkModel>;
    attendees: Association<ConferenceModel, AttendeeModel>;
  };
}

ConferenceModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
    },
    theme: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
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
  {
    sequelize,
    freezeTableName: true,
    modelName: 'Conferences',
  },
);

// Define associations within the models
ConferenceModel.hasMany(TalkModel, {
  foreignKey: 'conferenceId',
  as: 'talks',
});
TalkModel.belongsTo(ConferenceModel, {
  foreignKey: 'conferenceId',
  as: 'conference',
});

ConferenceModel.hasMany(AttendeeModel, {
  foreignKey: 'conferenceId',
  as: 'attendees',
});
AttendeeModel.belongsTo(ConferenceModel, {
  foreignKey: 'conferenceId',
  as: 'conference',
});

decorate(injectable(), ConferenceModel);

export { ConferenceModel };

export type ConferenceModelDto = InferAttributes<ConferenceModel>;
