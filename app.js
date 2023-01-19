const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/userRoute');

const url = 'mongodb+srv://admin:admin@cluster0.otgcor1.mongodb.net/?retryWrites=true&w=majority';

const app = express()

mongoose.connect(url)
const con = mongoose.connection

con.on('open', function(){
    console.log('connected...')
})

app.use(express.json());

app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(9000, () => {
    console.log('Server started')
})