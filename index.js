const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
const db_uri = process.env.Database_URI
const studentRoutes = require('./routes/studentRoutes')
const adminRoutes = require('./routes/adminRoutes')

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database connected successfully!!');
    })
    .catch((err) => {
        console.log(err);
    })
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));

app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
    res.send("this is homepage")
})

app.get('/alldata', (req, res) => {
    res.send("show all result of student")
})

app.listen(PORT, () => console.log(`server is runing on Port ${PORT}`))