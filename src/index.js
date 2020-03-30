require('dotenv').config();

const express = require('express');
const morgan  = require('morgan');
const mongoose = require('mongoose'); // save & download data, handle database
const path = require('path');
const cors = require('cors');

const app = express();

/**
 * Database setup
 */
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
    }
);

app.use(cors()); // libera o acesso para que todos dominios possam acessar a nossa api e tbm podemos fzr restrições si quizermos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // permite o envio de log
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(require('./routes'));

app.listen(process.env.PORT || 3000);