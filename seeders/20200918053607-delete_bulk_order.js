'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('orders', null, {})
    await queryInterface.bulkDelete('order_details', null, {})
  
  }
};
