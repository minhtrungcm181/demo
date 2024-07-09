import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY;

// create token
export const createToken = (data) => {



    return jwt.sign({ data }, SECRET_KEY, { expiresIn: "50m" })
}





// decode token
export const decodeToken = (token) => {
    return jwt.decode(token)
}

export const middleToken = (req, res, next) => {

    let { token } = req.headers
    let error = verifyToken(token)
    if (error)
        // token không hợp lệ
        res.status(401).send(error.message)
    else
        // token hợp lệ
        next()


}

function verifyToken(token) {
    throw new Error('Function not implemented.');
}
