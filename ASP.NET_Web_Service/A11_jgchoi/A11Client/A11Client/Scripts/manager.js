﻿
// Manager.js

function getAccessToken() {

    // get a reference to the login form
    var form = document.querySelector("#loginForm");

    // to monitor your progress, use the F12 developer tools debugger, and/or the Console
    console.log(form.username.value);
    console.log(form.password.value);

    // create an xhr object
    var xhr = new XMLHttpRequest();

    // configure its completion handler
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            // request-response cycle has been completed, so continue

            if (xhr.status === 200) {
                // request was successfully completed, and data was received, so continue

                // if you're interested in seeing the returned JSON...
                // open the browser developer tools, and look in the JavaScript console
                console.log(xhr.responseText);

                // get the token response
                var tokenResponse = JSON.parse(xhr.responseText);

                // save the token in the browser's session storage area of memory
                sessionStorage.setItem('token', tokenResponse.access_token);

                // navigate to home page
                window.location = '/HTML5Home.html'

            } else {
                // request was NOT successful, so you can do something here if you wish,
                // like notify the user etc. 
            }
        } else {
            // during the request lifecycle, this event is raised many times
            // this 'else' block can be empty, or can be used to display a progress message to the user
        }
    }

    // package the data that will be sent to the token endpoint; it's a simple string
    var data = 'grant_type=password&username=' + form.username.value + '&password=' + form.password.value;

    // configure the xhr object to fetch content, POST, token endpoint
    xhr.open('post', 'http://localhost:2548/token', true);

    // set the request header
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');



    // set the request header(s)
    xhr.setRequestHeader('Accept', 'application/json');

    // send the request, with the data
    xhr.send(data);

};

function loadAppClaims() {

    // create an xhr object
    var xhr = new XMLHttpRequest();

    // configure its completion handler
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            // request-response cycle has been completed, so continue

            if (xhr.status === 200) {
                // request was successfully completed, and data was received, so continue

                // if you're interested in seeing the returned JSON...
                // open the browser developer tools, and look in the JavaScript console
                console.log(xhr.responseText);

                // get the token response
                var employeeData = JSON.parse(xhr.responseText);

                // at this point in time...
                // we will use the data, in the user interface or whatever 
                // you can add code to this function body, 
                // or call out to a separately-defined function

                // below, we will add code to this function body
                // can add table rows using a string, or using DOM methods
                // here, we will use the DOM methods to build the table rows

                // get a reference to the table body
                var t = document.querySelector('#claimTable');

                // add rows...
                for (var i = 0; i < employeeData.length; i++) {
                    
                    // add a new row to the end of the table body
                    var row = t.insertRow(-1);

                    // add the table cells...
                    var c0 = row.insertCell(-1);
                    var t0 = document.createTextNode(employeeData[i].Description);
                    c0.appendChild(t0);

                    var c1 = row.insertCell(-1);
                    var t1 = document.createTextNode(employeeData[i].ClaimType);
                    c1.appendChild(t1);

                    var c2 = row.insertCell(-1);
                    var t2 = document.createTextNode(employeeData[i].ClaimTypeUri);
                    c2.appendChild(t2);

                    var c2 = row.insertCell(-1);
                    var t2 = document.createTextNode(employeeData[i].ClaimValue);
                    c2.appendChild(t2);

                    var c3 = row.insertCell(-1);
                    var t3 = document.createTextNode(employeeData[i].DateCreated);
                    c3.appendChild(t3);

                    var c4 = row.insertCell(-1);
                    var t4 = document.createTextNode(employeeData[i].DateUpdated);
                    c4.appendChild(t4);

                    var c5 = row.insertCell(-1);
                    var t5 = document.createTextNode(employeeData[i].DateRetired);
                    c5.appendChild(t5);

                    var c6 = row.insertCell(-1);
                    var t6 = document.createTextNode(employeeData[i].IsActive);
                    c6.appendChild(t6);

                    var c7 = row.insertCell(-1);
                    var t7 = document.createTextNode(employeeData[i].IsRoleClaim);
                    c7.appendChild(t7);

                    // etc.
                }
            }
        }
    }

    // configure the xhr object to fetch content
    xhr.open('get', 'http://localhost:2548/api/AppClaims', true);

    // fetch the token from session storage in the browser's memory
    var token = sessionStorage.getItem('token');
    if (!token) {
        token = 'Empty';
    }
    // set the request header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    // set the request header(s)
    xhr.setRequestHeader('Accept', 'application/json');

    // send the request, a GET request does not send any entity body data
    xhr.send();
}


function loadUsers() {

    // create an xhr object
    var xhr = new XMLHttpRequest();

    // configure its completion handler
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            // request-response cycle has been completed, so continue

            if (xhr.status === 200) {
                // request was successfully completed, and data was received, so continue

                // if you're interested in seeing the returned JSON...
                // open the browser developer tools, and look in the JavaScript console
                console.log(xhr.responseText);

                // get the token response
                var employeeData = JSON.parse(xhr.responseText);

                // at this point in time...
                // we will use the data, in the user interface or whatever 
                // you can add code to this function body, 
                // or call out to a separately-defined function

                // below, we will add code to this function body
                // can add table rows using a string, or using DOM methods
                // here, we will use the DOM methods to build the table rows

                // get a reference to the table body
                var t = document.querySelector('#claimTable');

                // add rows...
                for (var i = 0; i < employeeData.length; i++) {

                    // add a new row to the end of the table body
                    var row = t.insertRow(-1);

                    // add the table cells...
                    var c0 = row.insertCell(-1);
                    var t0 = document.createTextNode(employeeData[i].UserName);
                    c0.appendChild(t0);

                    var c1 = row.insertCell(-1);
                    var t1 = document.createTextNode(employeeData[i].Email);
                    c1.appendChild(t1);


                    // etc.
                }
            }
        }
    }

    // configure the xhr object to fetch content
    xhr.open('get', 'http://localhost:2548/api/UAM', true);

    // fetch the token from session storage in the browser's memory
    var token = sessionStorage.getItem('token');
    if (!token) {
        token = 'Empty';
    }
    // set the request header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    // set the request header(s)
    xhr.setRequestHeader('Accept', 'application/json');

    // send the request, a GET request does not send any entity body data
    xhr.send();
}


function loadEmployees() {

    // create an xhr object
    var xhr = new XMLHttpRequest();

    // configure its completion handler
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            // request-response cycle has been completed, so continue

            if (xhr.status === 200) {
                // request was successfully completed, and data was received, so continue

                // if you're interested in seeing the returned JSON...
                // open the browser developer tools, and look in the JavaScript console
                console.log(xhr.responseText);

                // get the token response
                var employeeData = JSON.parse(xhr.responseText);

                // at this point in time...
                // we will use the data, in the user interface or whatever 
                // you can add code to this function body, 
                // or call out to a separately-defined function

                // below, we will add code to this function body
                // can add table rows using a string, or using DOM methods
                // here, we will use the DOM methods to build the table rows

                // get a reference to the table body
                var t = document.querySelector('#employeesTable');

                // add rows...
                for (var i = 0; i < employeeData.length; i++) {

                    // add a new row to the end of the table body
                    var row = t.insertRow(-1);

                    // add the table cells...
                    var c0 = row.insertCell(-1);
                    var t0 = document.createTextNode(employeeData[i].Surname);
                    c0.appendChild(t0);

                    var c1 = row.insertCell(-1);
                    var t1 = document.createTextNode(employeeData[i].GivenNames);
                    c1.appendChild(t1);

                    // etc.
                }
            }
        }
    }

    // configure the xhr object to fetch content
    xhr.open('get', 'http://host.example.com/api/employees', true);

    // fetch the token from session storage in the browser's memory
    var token = sessionStorage.getItem('token');
    if (!token) {
        token = 'Empty';
    }
    // set the request header
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    // set the request header(s)
    xhr.setRequestHeader('Accept', 'application/json');

    // send the request, a GET request does not send any entity body data
    xhr.send(null);

}
