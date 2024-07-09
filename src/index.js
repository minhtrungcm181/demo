import cors from "cors";
import express from "express";
import rootRouter from "./routes/rootRouter.js";
import {logger} from './logger.js'
import session from "express-session";


const app = express();


logger.info('Info log %');
logger.warn('Warning log');

app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: 60000 }}));

// var server = app.listen(3000,  "127.0.0.1", function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Example app listening at http://%s:%s", host, port)

// });


app.use(express.json());
app.use(
  cors({
    origin: "*", // tất cả domain truy cập
  })
);

// khởi tạo server BE chạy bằng framework Express
app.listen(8080);
logger.info('http://localhost:8080')

app.get("/", (request, response) => {
  response.status(202).send("hello world");
  logger.info('api start')

});

app.get('/set_session', (req, res) => {
  //set a object to session
  req.session.User = {
      website: 'anonystick.com',
      type: 'blog javascript',
      like: '4550'
  }

  return res.status(200).json({status: 'success'})
})

//set session
app.get('/get_session', (req, res) => {
  //check session
  if(req.session.User){
      return res.status(200).json({status: 'success', session: req.session.User})
  }
  return res.status(200).json({status: 'error', session: 'No session'})
})

//destroy session
app.get('/destroy_session', (req, res) => {
  //destroy session
  req.session.destroy(function(err) {
      return res.status(200).json({status: 'success', session: 'cannot access session here'})
  })
})



app.use(rootRouter);
