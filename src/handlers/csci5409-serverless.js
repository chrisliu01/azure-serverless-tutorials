/***
 * This web service is based on Azure and coded by Serverless API
 */
// obtain access to a file file
let dummyResp = [
    {
        "part_no": 0,
        "part_desc": "engine"
    },
    {
        "part_no": 1,
        "part_desc": "windshield"
    }
];

module.exports.root = async function (context, req) {
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: 'Hello World! CSCI 5409 course '
    };
};

// scan the table, return all the results (Method: GET, can be tested on browser directly)
module.exports.readall = async function (context, req) {
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: dummyResp
    };
};

// read one part
module.exports.read = async function (context, req) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no = req.body.part_no || req.query.part_no || req.params.part_no;

    if (req_part_no) {
        let result = dummyResp.filter(obj => {
            return obj.part_no == req_part_no
        });
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: result
        };
    } else {
        context.res = {
            status: 400,
            body: 'Please pass a part_no on the query string or in the request body',
        };
    }
};


// create a new part (Replace: part_no with the demand part no you want to search, for example:  0 ;  Replace: part_desc with the updated value)
module.exports.create = async function (context, req) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_desc = req.body.part_desc || req.query.part_desc || req.params.part_desc;

    let result = dummyResp.filter(obj => {
        return obj.part_no == req_part_no
    });

    if (req.method != 'POST') {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'You must use POST method to create new part!'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else if (!parseInt(req_part_no)) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The part_no should be integer only (' + req_part_no + ')'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else if (result.length > 0) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The created item already existed (' + req_part_no + ')'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else {
        let item = {
            'part_no': parseInt(req_part_no),
            'part_desc': req_part_desc
        };
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no + "part_desc: " + req_part_desc,
            'Subject': 'New part added (' + req_part_desc + ')'
        };
        dummyResp.push(item);
        context.res = {
            body: messageObj
        };
    }
};

// update a part (Replace: part_no with the demand part no you want to search, for example:  0 ;  Replace: part_desc with the updated value)
module.exports.update = async function (context, req) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_desc = req.body.part_desc || req.query.part_desc || req.params.part_desc;
    req_part_no = parseInt(req_part_no);
    let result = dummyResp.filter(obj => {
        return obj.part_no == req_part_no
    });
    if (req.method != 'POST') {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'You must use POST method to create new part!'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else if (!req_part_no) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The part_no should be integer only (' + req_part_no + ')'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else if(result.length < 1) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The updated item is not found (' + req_part_no +')'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else {
        dummyResp = dummyResp.map(obj =>
            obj.part_no == req_part_no ? {...obj, part_desc: req_part_desc} : obj
        );
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no + "part_desc: " + req_part_desc,
            'Subject': 'successfully update (' + req_part_no + " | " + req_part_desc + ')'
        };
        context.res = {
            body: messageObj
        };
    }
};

module.exports.delete = async function (context, req) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no_old = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_no = parseInt(req_part_no_old);

    let result = dummyResp.filter(obj => {
        return obj.part_no == req_part_no
    });

    if (req.method != 'POST') {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'You must use POST method to create new part!'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else if (!req_part_no) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The part_no should be integer only (' + req_part_no_old + ')'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else if(result.length < 1) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The deleted item is not found (' + req_part_no +')'
        };
        context.res = {
            status: 400,
            body: messageObj
        };
    } else {
// Call array to delete the item from the table
        dummyResp = dummyResp.filter(obj => {
            return obj.part_no != req_part_no
        });
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'successfully delete (' + req_part_no + ')'
        };
        context.res = {
            body: messageObj
        };
    }
};