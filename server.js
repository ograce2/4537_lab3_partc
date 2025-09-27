const http = require("http");
const url = require("url");
const fm = require("./fileManager");
const defaultMessage = "Go to readFile or writeFile paths";


class Server{
    static startLocalServer(){
        http.createServer(function (req, res) {
            Server.handleRequest(req, res)

        }).listen(8888);
    }

    static handleRequest(req, res){
        const q = url.parse(req.url, true);
        const pathVals = q.path.split("/");

        if (pathVals.length > 2 && pathVals.at(-2) === fm.FileManager.readPath){
            const filename = pathVals.length > 2 ? pathVals.at(-1) : "";
            fm.FileManager.readFile(filename, res, req);
        } else if(pathVals.length > 2 && pathVals.at(-2) === fm.FileManager.wrtiePath){
            const data = q.query["text"];
            if (data === undefined){
                res.writeHead(404, {"Content-Type": "text/html"});
                return res.end(fm.FileManager.writeError);
            }
            fm.FileManager.writeFile(data, res, req);
        } else{
            res.writeHead(200, {"Content-Type": "text/html"});
            return res.end(defaultMessage);
        }
    }

    static startVercelServer(req, res) {
        Server.handleRequest(req, res);
    }
}

module.exports = Server.startVercelServer;


if (require.main === module) {
    Server.startLocalServer();
} 