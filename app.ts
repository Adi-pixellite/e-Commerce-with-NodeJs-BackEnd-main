import express from 'express';
import bodyParser from 'body-parser';
import SellerRoutes from "./routes/SellerRoutes"
import CustomerRoutes from "./routes/CustomerRoutes"

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//To Handle URLs

app.use(`/`, SellerRoutes)
app.use(`/`, CustomerRoutes)



//Server
app.listen("4000",()=>{
    console.log(`server listening on port : 4000`);
})