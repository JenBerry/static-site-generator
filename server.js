/*jshint esversion: 6 */
const express = require('express');
const app = express();
const path = require('path');
 
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(express.static('public'));
 
app.listen(3000, () => console.log('Listening on port 3000!'));
