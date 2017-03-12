
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let option = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'echart',
    password: '123456',
}

let pool = mysql.createPool(option);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/data', function(req, res, next) {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query('select region, rent, area from housedata limit 50', (err, results) => {
            if (err)
                throw err;
            for (let single of results) {;
            }
            res.json(JSON.stringify(results));
        })
        connection.release();
    })
});


module.exports = router;
