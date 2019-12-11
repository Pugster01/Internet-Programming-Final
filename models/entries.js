/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoincrement: true
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gloats: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'entries',
    timestamps: false
  });
};
