import { responseSend } from "../config/config.js";
import { createToken } from "../config/jwt.js";
import sequelize from "../models/db_connector.js";
import initModels from "../models/init-models.js";
import bcrypt from 'bcrypt'

let models = initModels(sequelize);


export const login = async (req, res) => {
    
    let { email, password } = req.body
    console.log(req.sessionID);


    let checkUser = await models.user.findOne({
        where: { email }
    })
    // []
    if (checkUser) {
        if (bcrypt.compareSync(password, checkUser.pass_word)) {

            // yarn add jsonwebtoken

            let token = createToken({ userId: checkUser.dataValues.user_id });

            // login thành công
            responseSend(res, token, "Thành công !", 200)
            console.log(email)

           if(req.session.authenticated){

           }
            

        } else {
            responseSend(res, "", "Sai mật khẩu !", 403)

        }

    } else {
        // sai mật khẩu hoặc email
        responseSend(res, "", "Sai Email !", 403)

    }

}
export const signUp = async (req, res) => {
    let { email, password, fullName } = req.body
    // check email tồn tại => 403

    // yarn add bcrypt 
    let newUser = {
        email,
        pass_word: bcrypt.hashSync(password, 10), // mã hóa password => hash password một chiều
        full_name: fullName
    }

    await models.user.create(newUser)
    // model.user.create(model)
    responseSend(res, "", "Thành công !", 200)

    // => 200
}
export const signOut = async (req, res) => {
    req.session.destroy(function(err) {
        return res.status(200).json({status: 'success', session: 'cannot access session here'})
    })

}