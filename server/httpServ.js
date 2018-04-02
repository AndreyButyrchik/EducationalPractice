const http = require("http");
const fs = require("fs");

const serv = http.createServer(function (request, response) {
    if(request.url.startsWith("/")){
        let filePath = '';
        let str = request.url.substr(1);
        if (str === '') {
            filePath = '../public/index.html';
        }
        else {
            filePath = '../public/' + str;
        }
        fs.readFile(filePath, function(error, data){
            if(error){
                response.statusCode = 404;
                response.end("Ooops!");
            }
            else{
                response.end(data);
            }
            return true;
        })
    }
    else{
        response.end("Ooops!");
    }
});

serv.listen(3030, function () {
    console.log('Server is running...');
});