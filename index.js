const express =require('express')

const app = express();

// routes
const router = require('./src/routes/index');



// running port
const port = 5000 ;

express.json();
app.use(express.json());

// entry point
app.use("/api/v1", router)


app.listen(port, () => {console.log(`Sever runnung on port ${port} `)})