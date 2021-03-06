require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
// app.get('/', (req, res) => {
//     res.json({msg: 'e_kart app running'})
// })

const URI = process.env.MONGODB_URL

mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if(err) throw err;
    console.log("MongoDB Connection successful")
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static("Frontend/build"));
}


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})