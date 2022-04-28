const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const path = require('path');

const app = express();

// Importing routes, db
const router = require('./routes/index');
const productsRouter = require('./routes/products.routes');
const connectDB = require('./db/index');

// Settings
app.set('port', process.env.PORT || 3000);

// Static files
// app.use(express.static('public'));
// app.use('/css', express.static(path.join(__dirname, 'public/css')));
// app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes, DB
app.use(router);
app.use(productsRouter);

// Main function
async function main() {
    await connectDB();
    app.listen(app.get('port'), () => {
        console.log('[+] Server on port ' + app.get('port'));
    });
}

main();