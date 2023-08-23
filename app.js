const express = require('express');
const app = express();


const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleWare = require("./middleware/error-handler");

const port = process.env.PORT || 3000;

//Middleware to parse json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//To use static files
app.use(express.static('./public'))


// app.get('/', (req, res) => {
//     res.send('Task manager');
// })

app.use('/api/v1/tasks', tasks);

//Middleware
app.use(notFound);

//Error handler middleware
app.use(errorHandlerMiddleWare);

//app.get('/api/v1/tasks');
//app.post('api/vi/tasks');
//app.get('api/v1/tasks/:id')
//app.patch('api/v1/tasks/:'id')
//app.delete('api/v1/tasks/:'id')

const start = async () => {
    try {
        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server running on port ${port}...`));
        
    } catch (error) {
        console.log(error);
    }
}

start();
