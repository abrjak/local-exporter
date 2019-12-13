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
    SELECT * FROM test_data ORDER BY proc_end DESC LIMIT 4
    `;

    mysql.query(sql, function(err, rows){
        if(err){
            console.log(err);
            result(null, err);
        } else {

            // basic counter for proc dur
            sb.append('# HELP local_dur_total total counter local duration.\n');
            sb.append('# TYPE local_dur_total counter\n');

            rows.forEach(function(row){

                sb.append('local_dur_total{scen="').append(row.scen_name)
                .append('", pm="').append(row.pm_name)
                .append('", state="').append(row.proc_state)
                .append('"} ').append(row.proc_dur)
                .append(' ').append(new Date().getTime()).append('\n');

            });
            
            // basic gauge for proc dur
            sb.append('# HELP local_dur_seconds gauge local duration.\n');
            sb.append('# TYPE local_dur_seconds gauge\n');

            rows.forEach(function(row){

                sb.append('local_dur_seconds{scen="').append(row.scen_name)
                .append('", pm="').append(row.pm_name)
                .append('", state="').append(row.proc_state)
                .append('"} ').append(row.proc_dur).append('\n');

            });
            
            // histogram bucket for proc dur
            sb.append('# HELP local_dur_sec histogram local duration.\n');
            sb.append('# TYPE local_dur_sec histogram\n');

            rows.forEach(function(row){

                sb.append('local_dur_sec_bucket{scen="').append(row.scen_name)
                .append('", pm="').append(row.pm_name)
                .append('", state="').append(row.proc_state)
                .append('", le="100"} ').append(row.proc_dur).append('\n');

            });

            // histogram sum for proc dur
            sb.append('# HELP local_dur_sec histogram local duration.\n');
            sb.append('# TYPE local_dur_sec histogram\n');

            rows.forEach(function(row){

                sb.append('local_dur_sec_sum{scen="').append(row.scen_name)
                .append('", pm="').append(row.pm_name)
                .append('", state="').append(row.proc_state)
                .append('"} ').append(row.proc_dur).append('\n');

            });

            // histogram count for proc dur
            sb.append('# HELP local_dur_sec histogram local duration.\n');
            sb.append('# TYPE local_dur_sec histogram\n');

            rows.forEach(function(row){

                sb.append('local_dur_sec_count{scen="').append(row.scen_name)
                .append('", pm="').append(row.pm_name)
                .append('", state="').append(row.proc_state)
                .append('"} ').append(row.proc_dur).append('\n');

            });

        }
    });


    result(null, sb.toString());
    sb.clear();
};

module.exports = Data;