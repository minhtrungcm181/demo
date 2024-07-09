import { Sequelize } from "sequelize";

const sequelize = new Sequelize("food_db", "admin", "admin", {
    host: "localhost",
    port: 15432,
    dialect: "postgres"
})
export default sequelize