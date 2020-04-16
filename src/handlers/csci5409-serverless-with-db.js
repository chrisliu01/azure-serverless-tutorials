/***
 * This web service is based on Azure and coded by Serverless API
 */
// initlize  the parameters of connection tables`
// Require and initialize outside of your main handler
const mysql = require('serverless-mysql')({
    config: {
        host     : process.env.RDS_HOSTNAME || 'csci5409-part.c2vryhkngaoi.us-east-2.rds.amazonaws.com',
        database : process.env.RDS_MYSQL_DB || 'csci5409',
        user     : process.env.RDS_USERNAME || 'admin',
        password : process.env.RDS_PASSWORD || '12345678',
        port     : process.env.RDS_PORT || '3306'
    }
});
let table = process.env.RDS_MYSQL_TABLE || 'part';

module.exports.root = async function (context, req) {
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: 'Hello World! CSCI 5409 course '
    };
};

// scan the table, return all the results (Method: GET, can be tested on browser directly)
module.exports.readall = async function (context, req) {
    let sql = "select * from " + table;
    let results = await mysql.query(sql);
    let data = JSON.stringify(results);
    context.res = {
        body: data
    };
};

// read one part
module.exports.read = async function (context, req) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no_old = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_no = parseInt(req_part_no_old);

    let sql = "select * from  "+ table +" where `part_no` = "+ req_part_no +";";
    let results = await mysql.query(sql);
    let data = JSON.stringify(results);
    context.res = {
        body: data
    };
};


// create a new part (Replace: part_no with the demand part no you want to search, for example:  0 ;  Replace: part_desc with the updated value)
module.exports.create = async function (context, req) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no_old = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_desc = req.body.part_desc || req.query.part_desc || req.params.part_desc;
    let req_part_no = parseInt(req_part_no_old);

    if (!req_part_no) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The part_no should be integer only (' + req_part_no + ')'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else {
        let sql = "INSERT INTO " + table + " SET `part_no` = " + req_part_no + ", `part_desc` = '" + req_part_desc + "';";
        let results = await mysql.query(sql);
        let data = JSON.stringify(results);
        context.res = {
            body: data
        };
    }
};

// update a part (Replace: part_no with the demand part no you want to search, for example:  0 ;  Replace: part_desc with the updated value)
module.exports.update = async function (context, req) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no_old = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_desc = req.body.part_desc || req.query.part_desc || req.params.part_desc;
    let req_part_no = parseInt(req_part_no_old);
    let sql = "update "+ table +" SET `part_desc` = '"+ req_part_desc +"' where `part_no` = "+ req_part_no +";";
    let results = await mysql.query(sql);
    let data = JSON.stringify(results);
    context.res = {
        body: data
    };
};

module.exports.delete = async function (context, req) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no_old = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_no = parseInt(req_part_no_old);

    let sql = "delete from  "+ table +" where `part_no` = "+ req_part_no +";";
    let results = await mysql.query(sql);
    let data = JSON.stringify(results);
    context.res = {
        body: data
    };
};