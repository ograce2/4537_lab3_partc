import fs from "fs";

export class FileManager{
    static defaultFile = "file.txt";

    static readPath = "readFile";

    static wrtiePath = "writeFile";

    static writeError = "404 error writing to file";
    
    static writeMessage = "Data written to: ";

    static readError = "404 File %1 Not Found!"

    static tmpPath = "./tmp/";

    static readFile(filename, res, req){
        filename = FileManager.tmpPath + filename;
        fs.readFile(filename, function(err, data){
            if (err){
                res.writeHead(404, {"Content-Type": "text/html"});
                return res.end(FileManager.readError.replace("%1", filename.slice(FileManager.tmpPath.length)));
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        })
    }

    static writeFile(data, res, req){
        fs.appendFile(FileManager.tmpPath + FileManager.defaultFile, data, function(err){
            if (err){
                res.writeHead(404, {"Content-Type": "text/html"});
                return res.end(FileManager.writeError);
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(FileManager.writeMessage + FileManager.defaultFile);
            return res.end();
        });
    }
}