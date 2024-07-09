import { responseSend } from "../config/config.js";
import sequelize from "../models/db_connector.js";
import initModels from "../models/init-models.js";


let models = initModels(sequelize);
export const orderCreate = async(req, res) => {
    const {user_id, food_id, amount} = req.body
    let checkFoodId = await models.food.findOne({
        where:{
            food_id
        }
    })
    if(checkFoodId){
    let newOrder = {
        user_id,
        food_id,
        amount
    }
    
    let checkOrder = await models.order.create(newOrder)
    responseSend(res, "", "Thành công !", 200); }
    else {responseSend(res, "No food existed !", "", 400)}
}