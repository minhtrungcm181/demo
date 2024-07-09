import cors from "cors";
import express from "express";
import rootRouter from "./routes/rootRouter.js";
import {logger} from './logger.js'
import session from "express-session";





const app = express();



logger.info('Info log %');
logger.warn('Warning log');



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

app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: 60000 }}));



app.use(rootRouter);
