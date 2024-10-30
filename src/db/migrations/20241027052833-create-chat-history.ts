/** @type {import('sequelize-cli').Migration} */

import { type DataTypes, QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('ChatHistories', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      senderId: {
        allowNull: true,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },
      chatId: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: { model: 'Chats', key: 'id' },
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('ChatHistories');
  },
};
