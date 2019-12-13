'use strict';

module.exports = function(app){
    var ctrl = require('../controller/appController.js');
    
    app.route('/metrics')
        .get(ctrl.get_data);
    
    app.route('/post')
        .post(ctrl.post_data);
};