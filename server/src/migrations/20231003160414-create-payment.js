'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      total_paid: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      paid_at: {
        type: Sequelize.DATE
      },
      occupant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Occupants',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      house_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Houses',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Payments');
  }
};