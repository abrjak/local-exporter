'use strict';

var Data = require('../model/appModel.js');
var Entry = require('../model/entryModel.js');

var x = 1;
var y = 2;
var z = 0;
var a = 3;
exports.get_data = function(req, res){
    Data.getData(function(err, content){
        res.send(content);
    });
};

exports.post_data = function(req, res){
    var new_entry = new Entry(req.body);

    Entry.postData(new_entry, function(err, entry){
        if(err){
            res.send(err);
        } else {
            res.json(entry);
        }
    });
};

setInterval(autoPoster, 15000);

function autoPoster(){
    var dur = Math.floor(Math.random() * 100) + 1;
    var newEntry = JSON.parse('{"scen_name":"test", "pm_name":"pm_test", "count_succ":'+z+', "count_abort":4, "lp_id":'+x+', "lp_dur":'+dur+'}');
    Entry.postData(newEntry, function(err, user){
    });
    dur = Math.floor(Math.random() * 100) + 1;
    newEntry = JSON.parse('{"scen_name":"test", "pm_name":"pm_all", "count_succ":'+z+', "count_abort":4, "lp_id":'+y+', "lp_dur":'+dur+'}');
    Entry.postData(newEntry, function(err, user){
    });
    dur = Math.floor(Math.random() * 100) + 1;
    newEntry = JSON.parse('{"scen_name":"error", "pm_name":"pm_error", "count_succ":1, "count_abort":'+z+', "lp_id":'+a+', "lp_dur":'+dur+'}');
    Entry.postData(newEntry, function(err, user){
    });
    x = x+3;
    y = y+3;
    a = a+3;
    z++;
};