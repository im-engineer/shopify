import express from 'express'
import bodyParser from 'body-parser'
const app = express();
import cors from 'cors'
import {mongoconnection} from './db';
mongoconnection();
import userRoute from './router/userRoute'
import productRoute from './router/productRoute'
import orderRoute from './router/orderRoute'
import sliderRoute from './router/sliderRoute'
import contactRoute from './router/contactRoute'

app.use(cors({origin:"*"}));

app.use(bodyParser.urlencoded(
    {
        extended:true
    }));
app.use(bodyParser.json());

app.use("/user",userRoute)
app.use("/product",productRoute)
app.use("/order",orderRoute)
app.use("/slider",sliderRoute)
app.use("/contact",contactRoute)

app.use("/upload",express.static("uploads"))

export default app;