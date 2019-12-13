'use strict';

var mysql = require('../db.js');

var Entry = function(entry){
   this.id = entry.id;
   this.scen_name = entry.scen_name;
   this.pm_name = entry.pm_name;
   this.count_succ = entry.count_succ;
   this.count_abort = entry.count_abort;
   this.lp_id = entry.lp_id;
   this.lp_dur = entry.lp_dur;
};

Entry.postData = function(new_entry, result){
    mysql.query("INSERT INTO test_data set ?", new_entry, function(err, res){
        if(err){
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });    
};

module.exports = Entry;