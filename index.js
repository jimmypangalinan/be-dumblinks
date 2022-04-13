const express =require('express');
require("dotenv").config();

const cors = require("cors");

// routes
const router = require('./src/routes/index');
const app = express();


// running port
const port = process.env.PORT || 5000 ;

app.use(express.json());
app.use(cors());

// entry point
app.use("/api/v1", router);

app.use("/uploads", express.static("uploads"));


app.listen(port, () => {
    console.log(`Sever runnung on port ${port} `)
});