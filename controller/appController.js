'use strict';

var Data = require('../model/appModel.js');
var Entry = require('../model/entryModel.js');

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


// Entry Generator

setInterval(autoPoster, 15000);
setInterval(randomError, 60000);

function randomError(){
    var dur = 25;
    var newEntry = JSON.parse('{"scen_name":"all_right", "pm_name":"pm_perfect", "proc_state":"3", "proc_dur":' + dur + ', "errmsg":"err in pm_main"}');
    Entry.postData(newEntry, function(err, user){});
}

function autoPoster(){

       // random entry 1
    var dur = Math.floor(Math.random() * 100) + 1;
    var state = Math.floor(Math.random() * 3) + 1;
    var newEntry;

    if(state == 3){
        newEntry = JSON.parse('{"scen_name":"test", "pm_name":"pm_test", "proc_state":' + state + ', "proc_dur":' + dur + ', "errmsg":"err in pm_test"}');
    } else {
        newEntry = JSON.parse('{"scen_name":"test", "pm_name":"pm_test", "proc_state":' + state + ', "proc_dur":' + dur + '}');
    }    

    Entry.postData(newEntry, function(err, user){});

    // random entry 2
    dur = Math.floor(Math.random() * 100) + 1;

    if(state == 3){
        newEntry = JSON.parse('{"scen_name":"test", "pm_name":"pm_main", "proc_state":' + state + ', "proc_dur":' + dur + ', "errmsg":"err in pm_main"}');
    } else {
        newEntry = JSON.parse('{"scen_name":"test", "pm_name":"pm_main", "proc_state":' + state + ', "proc_dur":' + dur + '}');
    }   

    Entry.postData(newEntry, function(err, user){});


    // random entry 3
    dur = Math.floor(Math.random() * 100) + 1;
    state = Math.floor(Math.random() * 3) + 1;

    if (state == 3){
        newEntry = JSON.parse('{"scen_name":"error_test", "pm_name":"pm_error", "proc_state":' + state + ', "proc_dur":' + dur + ', "errmsg": "err in pm_error"}');
    } else {
        newEntry = JSON.parse('{"scen_name":"error_test", "pm_name":"pm_error", "proc_state":' + state + ', "proc_dur":' + dur + '}');
    }    

    Entry.postData(newEntry, function(err, user){});

    // perfect entry
    //dur = Math.floor(Math.random() * 15) + 10;
    dur = 10;
    newEntry = JSON.parse('{"scen_name":"all_right", "pm_name":"pm_perfect", "proc_state":"1", "proc_dur":' + dur + '}');
    Entry.postData(newEntry, function(err, user){});

    newEntry = JSON.parse('{"scen_name":"all_right", "pm_name":"pm_perfect", "proc_state":"2", "proc_dur":' + (dur+5) + '}');
    Entry.postData(newEntry, function(err, user){});
};