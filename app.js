var express = require('express');
var path = require("path");
var superagent = require('superagent');
var charset = require('superagent-charset');
var app = express();
charset(superagent);

/*
http://api.iclient.ifeng.com/ifengvideoList?page=2&gv=5.5.3&av=0
    &proid=ifengnews
&os=ios_10.2.1&vt=5
&screen=750x1334&publishid=4002
&uid=22b386bc4eb844b1cbce042881765765e4d3df16&nw=wifi
 */

var url = "http://api.3g.ifeng.com/clientShortNews?type=beauty&Itime=1492678202&page=3&gv=5.5.3&av=0&proid=ifengnews&os=ios_10.2.1&vt=5&screen=750x1334&publishid=4002&uid=22b386bc4eb844b1cbce042881765765e4d3df16&nw=wifi";

app.get('/request', function (req, r) {
    var ser_value = req.query.ser_value;
    var targetUrl = url;
    superagent.get(targetUrl)
        .charset('utf-8')
        .end(function (err, res) {
            if (res) {
                r.send(res.text);
            }
        });
});
app.use(express.static(path.join(__dirname, 'view')));
app.listen(3000);
console.log("启动完成");

 
