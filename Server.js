var express = require('express');
var sql = require('mssql');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express();
var fs = require("fs");
app.use(bodyParser.json());

app.get('/listUsers', function (req, res) {
	    var config = {
        user: 'sa',
        password: '1234',
        server: 'syslp247',
        database: 'SampleDB',
		options: {
      encrypt: true
    }
    };

	    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from students', function (err, recordset) {

            if (err){console.log(err)}
else{
			 recordset.forEach(function (record){
				 console.log(record);
			 });
            // send records as a response
            res.send(recordset);
}

        });
    });

});

app.get('/Getlist', function (req, res) {

	res.send("[{'id':1,'text':'Root node','children':[{'id':2,'text':'Child node 1'},{'id':3,'text':'Child node 2'}]}]");
});

app.post('/insertUser',function(req,res){
	var user_id = req.body.id;
    var token = req.body.name;
    var geo = req.body.address;
	console.log(user_id + " -> Success " + token + "-----" + geo);
});

var server = app.listen(8081);
server.on('close',function(){

	console.log("server stopped!!!");

});
