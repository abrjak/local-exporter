'use strict';

var mysql = require('../db.js');

const StringBuilder = require('string-builder');
let sb = new StringBuilder();

var Data = function(data){
    this.content = data.content;
};

var resultset = [];

Data.getData = function(result){

    const sql = `
    SELECT * FROM test_data ORDER BY lp_id DESC LIMIT 3
    `;

    mysql.query(sql, function(err, rows){
        if(err){
            console.log(err);
            result(null, err);
        } else {

            sb.append('# HELP local_dur local duration.\n');
            sb.append('# TYPE local_dur gauge\n');

            rows.forEach(function(row){

                sb.append('local_dur{scen="').append(row.scen_name).append('", pm="').append(row.pm_name).append('"} ').append(row.lp_dur).append('\n');

            });

            sb.append('# HELP local_duration local duration.\n');
            sb.append('# TYPE local_duration histogram\n');

            rows.forEach(function(row){

                sb.append('local_duration_bucket{scen="').append(row.scen_name).append('", pm="').append(row.pm_name).append('", le="100"} ').append(row.lp_dur).append('\n');

            });

        }
    });


    result(null, sb.toString());
    sb.clear();
};

module.exports = Data;