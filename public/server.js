const express = require('express');
const path = require('path')

const app = express();

const port = 3001;

app.use(express.static('public'));
