'use strict';

var mysql = require('../db.js');

const StringBuilder = require('string-builder');
let sb = new StringBuilder();

var ErrDetail = function(error){
    this.error = error.content;
};

ErrDetail.getErrDetail = function(result){

    const sql = `
    SELECT
        proc_id,
        scen_name,
        pm_name,
        errmsg,
        proc_end
    FROM test_data
    WHERE errmsg is not null
    ORDER BY proc_end DESC LIMIT 4
    `;

    mysql.query(sql, function(err, rows){
        if(err){
            console.log(err);
            result(null, err);
        } else {

            if(rows.length == 0){
                console.log('No Errors this Scrape');
            }

            rows.forEach(function(row){

                console.log(row.proc_id, row.scen_name, row.pm_name);
                

            });

            result(null, rows[0]);
        }
    });

    
};

module.exports = ErrDetail;