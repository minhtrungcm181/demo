import jwt from 'jsonwebtoken'
export const authenticateJWT = (req, res, next) => {
    const token = req.header('token')
    const SECRET_KEY = process.env.SECRET_KEY;
    if (token) {
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401); // Unauthorized
    }
  };