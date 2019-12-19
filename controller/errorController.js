'use sstrict';

var ErrDetail = require('../model/errorModel.js');

var errMsg = require('../errmsg.json');

exports.get_error = function(req, res){
    ErrDetail.getErrDetail(function(err, content){
        if(err){
            res.send(err);
        } else {
            res.send(content);
        }
    });
};

exports.get_root = function(req, res){
    res.send('200 OK');
    res.end();
};

exports.get_search = function(req, res){

    var result = [];
    errMsg.forEach(err => {
        result.push(err.target);
    });

    res.json(result);
    res.end();
};


// Entry Generator

setInterval(autoPoster, 15000);

function autoPoster(){

    ErrDetail.getErrDetail(function(err, content){});

};