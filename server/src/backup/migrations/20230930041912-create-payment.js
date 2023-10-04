'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      total: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      total_paid: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      paid_at: {
        allowNull: false,
        type: Sequelize.DATE,
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
      out_standing_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Outstandings',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Payments')
  },
}
