const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connection successful!'))
    .catch((err) => console.log('DB connection error:', err.message));

//puerto y servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`);
});
