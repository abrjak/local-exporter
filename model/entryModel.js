'use strict';

var mysql = require('../db.js');

var Entry = function(entry){
   this.proc_id = entry.proc_id;
   this.scen_name = entry.scen_name;
   this.pm_name = entry.pm_name;
   this.proc_state = entry.proc_state;
   this.proc_dur = entry.proc_dur;
   this.errmsg = entry.errmsg;
};

Entry.postData = function(new_entry, result){
    mysql.query("INSERT INTO test_data set ?", new_entry, function(err, res){
        if(err){
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);

            mysql.query("delete from test_data where proc_end < DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 30 SECOND)",function(err, res){
                if(err){
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.insertId);
                }
            });

        }
    });    
};

module.exports = Entry;