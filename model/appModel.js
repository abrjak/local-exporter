'use strict';

var mysql = require('../db.js');

const StringBuilder = require('string-builder');
let sb = new StringBuilder();

var _ = require('lodash');
const fetch = require('node-fetch');

const header = {
    "Content-Type"  : "application/json",
    "Authorization" : "Bearer eyJrIjoid3JQanJBaWZ4aGtvQk02UDJlZVNnaGI1ekdiUmNPbGciLCJuIjoiYWRtaW4iLCJpZCI6MX0="
}

const url_get = 'http://localhost:3001/api/dashboards/uid/_T3KeaBWz';
const url_post = 'http://localhost:3001/api/annotations';
const url_upd = 'http://localhost:3001/api/dashboards/db';

var Data = function(data){
    this.content = data.content;
};

var resultset = [];

Data.getData = function(result){

    const sql = `
        select
            proc_id,
            scen_name,
            pm_name,
            proc_state,
            proc_dur,
            errmsg,
            UNIX_TIMESTAMP(proc_end) as proc_end
        from test_data
        where proc_end > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 15 SECOND)
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

                if(row.scen_name == "all_right" && row.proc_state == 3){
                    console.log('Error in Scenario All-Right detected! Process ', row.proc_id);
                    getDashboard(row);
                }

            });

            sb.append('# HELP local_time_gauge test exp.\n');
            sb.append('# TYPE local_time_gauge gauge\n');
            sb.append('local_time_gauge 1\n');

            // ------------------------------------- //
            // FETCH GRAFANA API TEST CASES          //
            // ------------------------------------- //

            function getDashboard(entry){
                
                fetch(url_get, {method : 'GET', headers : header })
                .then(res => res.json())
                .then(json => getPanel(json, entry));
            };

            function getPanel(db, data){
                var db_id =  db.dashboard.id;
                var panels = db.dashboard.panels;

                _.each(panels, function(panel){
                    var type = panel.type;
                    var selectedScen = panel.scopedVars.scen.value;
                    var description = panel.description;
                    var panel_id = panel.id;

                    if(type == "graph" && selectedScen == data.scen_name && description == "proc_state_3"){
                        
                        var new_anno = {
                            "dashboardId": db_id,
                            "panelId": panel_id,
                            "time": 	(data.proc_end * 1000),
                            "timeEnd":	(data.proc_end * 1000),
                            "text": data.errmsg,
                            "tags": [
                                "err"
                            ]
                        }

                        // Create new Annotation on corresponding Panel
                        fetch(url_post, {method : 'POST', body : JSON.stringify(new_anno), headers : header })
                        .then(res => res.json())
                        .then(json => console.log(json));
                        
                    }
                });

                var time_from = db.dashboard.time.from;
                var time_to = db.dashboard.time.to;
                console.log('TIME | From ', time_from, ', To ', time_to);

                console.log(db.dashboard.templating.list[1].current.value);



            };

        }
    });

    result(null, sb.toString());
    sb.clear();
};

module.exports = Data;