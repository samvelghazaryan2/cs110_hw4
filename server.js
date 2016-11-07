'use strict' ;
const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

    const todos = [
         {
            id: Math.random() + '',
            message: 'Go to office hour',
            completed: false,
        },
         {
            id: Math.random() + '',
            message: 'Eat lunch',
            completed: false,
         },
         {
            id: Math.random() + '',
            message: 'Do the homework',
            completed: false,
        }
        ];

 
    const server = http.createServer(function(req, res) {

        const filePath = '../public'+req.url;
        fs.readFile(filePath, function(err, data) {
            if(err) {
                res.statusCode = 404; 
                res.end('No file found');
            }
                res.statusCode = 200;
                res.end(data);
    });
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);
    const method = req.method;

    if(req.url.indexOf('/todos') === 0) {
    if(method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            let localTodos = todos;
            if(parsedQuery.searchtext) {
                localTodos = localTodos.filter(function(obj) {
                    return obj.message.indexOf(parsedQuery.searchtext) >= 0;
                    });
                }
                return res.end(JSON.stringify({items : localTodos}));
        }
    }
    if(req.url.indexOf('/todos') === 0) {
    if(method === 'PUT') {
             // read the content of the message
            let body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', function () {
                let jsonObj = JSON.parse(body); // now that we have the content, convert the JSON into an object

                // find the todo in our todos array and replace it with the new object
                for(let i = 0; i < todos.length; i++) {
                    if(todos[i].id === jsonObj.id) { // found the same object
                        todos[i] = jsonObj; // replace the old object with the new object
                        res.setHeader('Content-Type', 'application/json');
                        return res.end(JSON.stringify(jsonObj));
         }
        }
                res.statusCode = 404;
                return res.end('Data was not found and can therefore not be updated');
        });
            return;
            
            }
        }
        //
        if(req.url.indexOf('/todos') === 0) {
         if(method === 'POST') {

            // read the content of the message
            let body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', function () {
                let jsonObj = JSON.parse(body);  // now that we have the content, convert the JSON into an object
                jsonObj.id = Math.random() + ''; // assign an id to the new object
                todos[todos.length] = jsonObj;   // store the new object into our array (our 'database')

                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(jsonObj));
            });
            return;
        }
    }
        if(req.url.indexOf('/todos/') === 0) {
            if (method === 'DELETE') {
            let id =  req.url.substr(7);
            for(let i = 0; i < todos.length; i++) {
                if(id === todos[i].id) {
                    todos.splice(i, 1);
                    res.statusCode = 200;
                    return res.end('Successfully removed');
                }
            }
            res.statusCode = 404;
            return res.end('Data was not found');
        
    }
        }
    });
        server.listen(3001);