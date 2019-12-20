const fetch = require('node-fetch');

var header = {
    "Content-Type"  : "application/json",
    "Authorization" : "Bearer eyJrIjoid3JQanJBaWZ4aGtvQk02UDJlZVNnaGI1ekdiUmNPbGciLCJuIjoiYWRtaW4iLCJpZCI6MX0="
}

fetch('http://localhost:3001/api/dashboards/uid/_T3KeaBWz', {method : 'GET', headers : header })
.then(res => res.json())
.then(json => console.log(json));

var anno = {
    "dashboardId": 2,
    "panelId": 8,
    "time": 	1576835600000,
    "timeEnd":	1576835623500,
    "text": "ErrMsg and Detail",
    "tags": [
        "err"
    ]
}

fetch('http://localhost:3001/api/annotations', {method : 'POST', body : JSON.stringify(anno), headers : header })
.then(res => res.json())
.then(json => console.log(json));