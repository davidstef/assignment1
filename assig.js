const fs = require('fs');
const data = fs.readFileSync("posts.csv", { encoding: "utf8" });
const details = data.split("\n");
const info = details[0].split(",");
var users = [];
var i = 0;

for (i = 1; i < details.length; i++) {
    var aux = details[i].split(",");
    var user = {};

    for (var j = 0; j < info.length; j++) {
        user[info[j]] = aux[j];
    }
    users.push(user);
}

var http = require('http');

http.createServer(function (req, res) {
    if (req.url == "/") {
        res.writeHead(301,
            { Location: 'http://localhost:8080/blog', 'Content-Type': 'text/html' }
        );
        return res.end();
    }
    if (req.url == "/blog") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(renderHTML(users));
        return res.end();
    }
    if (req.url == "/404") {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("404 not found!");
        return res.end();
    }

        var ID = req.url.split("/")[2];
        var post = users.find(function (user){
            return user.id == ID;
        })

     if (post) {
        var text = renderHTML([post]);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(text);
        return res.end();
    }

    res.writeHead(301,
        { Location: 'http://localhost:8080/404', 'Content-Type': 'text/html' }
    );
    return res.end();

}).listen(8080);

function renderHTML(users) {
    var text = "";
    var id_txt, name_txt, e_txt, t_txt, p_txt;

    for (var i = 0; i < users.length; i++) {
        name_txt = "<p>" + "<small>" + users[i].first_name + users[i].last_name + "</small>" + "</p>";
        e_txt = "<p>" + "<small>" + users[i].email + "</small>" + "</p>";
        t_txt = "<h3>" + users[i].title + "</h3>";
        p_txt = "<p>" + users[i].post + "</p>";
        id_txt = "<a href= /blog/" + users[i].id + ">Detail</a>";
        text = text + name_txt + e_txt + t_txt + p_txt + id_txt;
        text = text + "<hr/>";
    }
    return text;
}

function searchID(ID) {
    ID = req.url.split("/")[2];
    return ID;
}






