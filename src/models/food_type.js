import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class food_type extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'food_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "food_type_pkey",
        unique: true,
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
  }
}
