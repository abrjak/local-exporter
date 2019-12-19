'use strict';

module.exports = function(app){
    var ctrl = require('../controller/appController.js');
    var ctrl_err = require('../controller/errorController.js');
    
    app.route('/metrics')
        .get(ctrl.get_data);
    
    app.route('/post')
        .post(ctrl.post_data);

    app.route('/')
        .get(ctrl_err.get_root);

    app.route('/data')
        .get(ctrl_err.get_error);

    app.route('/search')
        .post(ctrl_err.get_search);
};