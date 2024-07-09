import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class restaurant extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    res_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    res_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'restaurant',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "restaurant_pkey",
        unique: true,
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
  }
}
