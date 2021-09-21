const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8081;
dotenv.config();


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
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));

// app.options('*', cors())
// app.use(function (req, res, next) {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept,Authorization,http, data, chrome, chrome-extension, chrome-untrusted, https"

//     );
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
//     next();
// })

app.use(cors({
    origin:'*',
    credentials: true,
    "Access-Control-Allow-Credentials": true
}));
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => {
    res.send("this is homepage")
})



app.listen(PORT, () => console.log(`server is runing on Port ${PORT}`))