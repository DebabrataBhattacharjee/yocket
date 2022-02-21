require('dotenv').config();
const express = require('express');
const app = express();
const port = 4500 || process.env.PORT;
const connectDB = require('./database/connectDB');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

//MIDDLEWARE
app.use(bodyParser.json());

//ROUTES
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/comments', commentsRoutes);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening at port no. ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
