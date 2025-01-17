// First steps to setting up Node.js HTTP web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mysql = require('mysql');
var fileExtensions = {
    ".html": "text/html",
    ".css":  "text/css",
    ".js":   "text/javascript",
    ".jpeg": "text/jpeg",
    ".jpg":  "text/jpeg",
    ".png":  "text/png",
};

//creates database connection variable
var con = mysql.createConnection({
    host: "107.180.1.16",
    port: "3306",
    user: "fall2023team1",
    password: "fall2023team1",
    database: "fall2023team1"
});
con.connect(); //launches connection

var server = http.createServer(function (request, response) {  //creates web server

    //console.log(request.url);
    //console.log(request.headers.host);
    var base = "http://" + request.headers.host;
    //console.log(base);
    var completeurl = new URL(request.url, base);
    //console.log(completeurl);
    //console.log(completeurl.href);

    var table = completeurl.searchParams.get("tableName");
    //console.log(table);
    if (table == "User") {
        //get into sql
        var myQuery = 'SELECT * FROM User';
        con.query(myQuery, function (err, result, fields) {
            // console.log(result);
            response.end(JSON.stringify(result));
        });
    }
    else {

        var pathname = url.parse(request.url).pathname;
        var filename;
        if (pathname === "/") {            
            filename = "index.html";
        }
        else
            filename = path.join(process.cwd(), pathname);

        try {
            fs.accessSync(filename, fs.F_OK);
            var fileStream = fs.createReadStream(filename);
            var typeAttribute = fileExtensions[path.extname(filename)];
            response.writeHead(200, { 'Content-Type': typeAttribute });
            fileStream.pipe(response);
        }
        catch (e) {
            console.log("\n\n");
            console.log('File does not exist: ' + filename);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 - File Not Found (' + filename + ')');
            response.end();
        }
    } //end else
}); // end var server = http.createServer


//---------------Needs "npm install mysql" to function--------------------------*/
//---------------May need other node.js packages------------------------------- */ 
 

//creates server and provides message that the server is active
server.listen(8000); 
console.log("\nThe Web server is alive!!!\n" +
    "It's listening on http://127.0.0.1:8000 or http://localhost:8000");
