var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors')

//start mysql connection
/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */
var config = require('./config');
var connection = mysql.createConnection({
    host: config.database.host, //mysql database host name
    port: config.database.port, //mysql database port
    user: config.database.user, //mysql database user name
    password: config.database.password, //mysql database password
    database: config.database.db //mysql database name 
});


try {
    connection.connect(function (err) {
        //if (err) throw err
        if (err) {
            console.log('Connection Error:', err);
        } else {
            console.log('You are now connected...');
        }

    })
} catch (e) {
    console.log('Connection Exception:', e);
}
//end mysql connection

//start body-parser configuration
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3001, "127.0.0.1", function () {

    var host = server.address()
        .address
    var port = server.address()
        .port

    console.log("Example app listening at http://%s:%s", host, port)

});

app.options('*', cors());

/*********************************************************************
 *    EMPLOYEE  APIS                                                 *
 *********************************************************************/
//rest api to get all results
app.get('/employees', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('select emp_id,salary,name,DATE_FORMAT(dob,\'%d/%m/%Y\') as dob from employee', function (error, results, fields) {
           
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to get a single employee data
app.get('/employees/:emp_id', function (req, res) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('select emp_id,salary,name,DATE_FORMAT(dob,\'%Y-%m-%d\') as dob from employee where emp_id=?', [req.params.emp_id], function (error, results, fields) {
            
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to create a new record into mysql database
app.post('/employees', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('INSERT INTO employee SET ?', postData, function (error, results, fields) {
          
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to update record into mysql database
app.put('/employees', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('UPDATE `employee` SET `name`=?,`salary`=?,`dob`=? where `emp_id`=?', [req.body.name, req.body.salary, req.body.dob, req.body.emp_id], function (error, results, fields) {
           
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to delete record from mysql database
app.delete('/employees/:emp_id', function (req, res) {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('DELETE FROM `employee` WHERE `emp_id`=?', [req.params.emp_id], function (error, results, fields) {
            
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end('Record has been deleted!');
            }
            
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

/*********************************************************************
 *    SKILLS APIS                                           *
 *********************************************************************/

//rest api to get all results
app.get('/skills', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('select * from skill', function (error, results, fields) {
          if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to get a single skill data
app.get('/skills/:emp_id', function (req, res) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('select * from skill where skill_id=?', [req.params.skill_id], function (error, results, fields) {
            if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to create a new record into mysql database
app.post('/skills', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('INSERT INTO skill SET ?', postData, function (error, results, fields) {
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
            
        });
    } catch (err) {
         console.log("MY ERROR: "+ err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to update record into mysql database
app.options('/skills', cors()) // enable pre-flight request for DELETE request
app.put('/skills', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('UPDATE `skill` SET `name`=? where `skill_id`=?', [req.body.name, req.body.skill_id], function (error, results, fields) {
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to delete record from mysql database

app.options('/skills/:id', cors()) // enable pre-flight request for DELETE request
app.delete('/skills/:skill_id', cors(), function (req, res) {
    console.log(req.body);

    try {
        connection.query('DELETE FROM `skill` WHERE `skill_id`=?', [req.params.skill_id], function (error, results, fields) {
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
                res.header("Access-Control-Allow-Origin", "*");
                res.end('Record has been deleted!');
            }
           
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});


/*********************************************************************
 *    EMPLOYEE SKILLS APIS                                           *
 *********************************************************************/

//rest api to get a multiple skill data for employee
app.get('/employee_skills/:emp_id', function (req, res) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('select * from emp_skill where emp_id=?', [req.params.emp_id], function (error, results, fields) {
            
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to create a new record into mysql database
app.post('/employee_skills', function (req, res) {
    var postData = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('INSERT INTO emp_skill SET ?', postData, function (error, results, fields) {
          
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end(JSON.stringify(results));
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});


//rest api to delete record from mysql database
app.delete('/employee_skills/:emp_id', function (req, res) {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('DELETE FROM `emp_skill` WHERE `emp_id`=?', [req.params.emp_id], function (error, results, fields) {
           
           if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end('Record has been deleted!');
            }
            
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

//rest api to delete record from mysql database
app.delete('/employee_skills', function (req, res) {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    try {
        connection.query('DELETE FROM `emp_skill` WHERE `emp_id`=? AND `skill_id`=?', [req.query.emp_id, req.query.skill_id], function (error, results, fields) {
             if (error) {
             res.status(500);
             var o = {} // empty Object
             var key = 'error';
             o[key] = error;
             res.end(JSON.stringify(o));
            }
            else {
               res.end('Record has been deleted!');
            }
            
        });
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                error: err
                , message: err.message
            }); // 500
    }
});

