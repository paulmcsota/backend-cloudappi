
module.exports = (sequelize, type) => {
   return sequelize.define('address', 
      {
         id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         street: {
            type: type.STRING(100),
            allowNull: false,
         },
         state: {
            type: type.STRING(50),
            allowNull: false,
         },
         city: {
            type: type.STRING(50),
            allowNull: false,
         },
         country: {
            type: type.STRING(50),
         },
         zip: {
            type: type.STRING(50),
         },
      }, 
      {
         tableName: 'address',
         timestamps: false
      }
   );
 };

 