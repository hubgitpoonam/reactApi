


import $ from 'jquery';


$(document).ready(function () {
    $.noConflict();
     $('#tables').DataTable({
        "destroy": true, 
        
        "sorting": true,

        "columns": [{
            "data":"id"
        },
            
        {
        "data": "Name"
        }, {
        "data": "City"
        }, {
        "data": "Zipcode"
        }, {
        "data": "Company Name"
        }]
});
});