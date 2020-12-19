module.exports = (sequelize, type) => {
   return sequelize.define('user', 
      {
         id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
         },
         name: {
            type: type.STRING(100),
            allowNull: false
         },
         email: {
            type: type.STRING(50),
            allowNull: false,
         },
         birthDate: {
            type: type.STRING(50),
            allowNull: false,
         },
      }, 
      {
         tableName: 'user',
         timestamps: false
      }
   );
 };

 