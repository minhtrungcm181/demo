
import initModels from "../models/init-models.js";
import { response } from "express";
import { responseSend } from "../config/config.js";
import sequelize from "../models/db_connector.js/index.js";

let models = initModels(sequelize);
export const rateCreate = async(req, res) =>{
    let {user_id, res_id, amount} = req.body
    let newRate = {
        user_id, 
        res_id,
        amount,
        date_rate: new Date(),
    }
    let checkRate = await models.rate_res.findOne({
        where: {
            user_id,
            res_id
        }
    })
    if(!checkRate) {
        await models.rate_res.create(newRate);
        responseSend(res, "", "Thanh Cong !", 200)
    }
    else responseSend(res, "User Already Rate!", "Failed !", 400);

}
export const getRatebyUser = async(req, res) => {
    let {user_id} = req.params
    let rateOfUser = await models.rate_res.findAll({
        where:{
            user_id
        }
    })
    if(rateOfUser.length === 0) {
        responseSend(res, "You did not rate any restaurant !", "", 200)
    } else responseSend(res, rateOfUser, "", 200)
}
export const getRatebyRes = async(req, res) => {
    let {res_id} = req.params
    let rateOfRes = await models.rate_res.findAll({
        where: {
            res_id
        }
    })
    if(rateOfRes.length === 0) {
        responseSend(res, "No one rate your restaurant !", "", 200);
    } else responseSend(res, rateOfRes, "", 200);
}