var express = require('express');
var path = require("path");
var superagent = require('superagent');
var charset = require('superagent-charset');
var app = express();
var fs = require('fs');
var cheerio = require('cheerio');

charset(superagent);


var i = 0;
var url = "http://www.ssss82.com/s01/index.html";

var urlFix = "http://www.ssss82.com";


app.get('/listav', function (req, r) {

    console.log(i++);
    var targetUrl = url;
    superagent.get(targetUrl)
        .charset('utf-8')
        .end(function (err, res) {
            if (res) {
                var obj = {};
                var text = res.text;
                var $ = cheerio.load(text, {decodeEntities: false});
                var jq = $(text);
                var pageList = [];
                var imageList = [];
                var titleList = [];
                jq.find("#channel li").each(function (v,i) {
                    if($(this).find("a")){
                        pageList.push($(this).find("a").attr("href"));
                        titleList.push($(this).find("a").attr("title"));
                        imageList.push(urlFix+$(this).find("img").attr("src"));


                    }
                });

                obj.pageList= pageList;
                obj.imageList = imageList;
                obj.titleList = titleList;

                r.send(obj);
            }
        });
});


/**
 * netstreambasepath=http%3A%2F%2Flocalhost%3A81%2FHLSprovider%2Fjwplayer5%2Findex58011.html&amp;
 * id=player&amp;hls_debug=false&amp;
 * hls_debug2=false&amp;
 * hls_lowbufferlength=3&amp;
 * hls_minbufferlength=-1&amp;
 * hls_maxbufferlength=60&amp;
 * hls_startfromlowestlevel=true&amp;
 *
 * hls_seekfromlowestlevel=true&amp;
 * hls_live_flushurlcache=false&amp;
 * hls_live_seekdurationthreshold=60&amp;
 * hls_seekmode=ACCURATE&amp;
 * provider=/swf/HLS.swf&amp;
 * file=http://107.167.9.200:8011/B0425/s137/s137.m3u8&amp;
 * qualitymonitor.pluginmode=FLASH&amp;
 * controlbar.position=over&amp;
 * image=/pic/0425/f736hayr.jpg
 */

app.get('/detail', function (req, r) {

    var img = '<table> <tr><td align="center"><img  src="http://www.ssss82.com{vPic}"/></td></tr></table>';

    var emh0  = '<div class="text-center"><a href="{href}" class="btn-primary btn">播放</a></div>';
    var emhtml1 =  '<embed id="CuPlayerVideo_video_embed1" src="http://www.ssss82.com/swf/HLSplayer.swf?v=1.5" type="application/x-shockwave-flash"'+
        'allowscriptaccess="always" allowfullscreen="true" width="300" height="100"'+
        'flashvars="netstreambasepath=id=player&amp;&amp;hls_debug=false&amp;hls_debug2=false&amp;'+
        'hls_lowbufferlength=3&amp;'+
        'hls_minbufferlength=-1&amp;'+
        'hls_maxbufferlength=60&amp;'+
        'hls_startfromlowestlevel=true&amp;'+
        'hls_seekfromlowestlevel=true&amp;'+
        'hls_live_flushurlcache=false&amp;'+
        'hls_live_seekdurationthreshold=60&amp;'+
        'hls_seekmode=ACCURATE&amp;provider=http://www.ssss82.com/swf/HLS.swf' +
        '&amp;file=';

    var emhtml2 = '&amp;qualitymonitor.pluginmode=FLASH&amp;controlbar.position=over&amp;image=http://www.ssss82.com';

    var emhtml3 =  '">';

    r.set("Content-Type",'text/html');
    var page = req.query.page;
    var targetUrl = urlFix+page;

    superagent.get(targetUrl)
        .charset('utf-8')
        .end(function (err, res) {
            if (res) {
                var obj = {};
                var text = res.text;
                var $ = cheerio.load(text, {decodeEntities: false});
                var jstext = $('script[language="JavaScript"]').text();
                var avalue = jstext.split(";");

                var vPic ="";
                var video = "";
                if(avalue[5]){

                    vPic =avalue[5].split("=")[1].replace('"',"").replace('"',"").trim();
                }
                if(avalue[7]){
                    video = avalue[7].split("=")[1];
                    var tag = video.split("+")[1];
                    console.log(getIP(tag));
                    video= video.replace('"+'+tag+'+"',getIP(tag)).trim();
                    video= video.replace("\"",'').replace("\"",'');
                }
                img = img.replace("{vPic}",vPic);
                console.log(img);


                emh0 = emh0.replace("{href}",video);

                var emh = img+emh0+emhtml1+video+emhtml2+vPic+emhtml3;


                fs.readFile(path.join("data/", 'single.html'), 'utf-8', function (err,data) {
                    data  =   data.replace("{htmlContent}",emh);
                    r.send(data);
                })


            }
        });
});


function getIP(tag) {
    var ipp1 = new Array();
    ipp1.push("162.221.13.115");
    var s01=ipp1[Math.floor(Math.random()*ipp1.length)]+":8011";
    if(tag == 's01'){
        return s01;
    }

    var ipp2 = new Array();
    ipp2.push("162.221.14.167");
    var s02=ipp2[Math.floor(Math.random()*ipp2.length)]+":8011";
    if(tag == 's02'){
        return s02;
    }

    var ipp3 = new Array();
    ipp3.push("104.193.92.69");
    var s03=ipp3[Math.floor(Math.random()*ipp3.length)]+":8011";

    if(tag == 's03'){
        return s03;
    }
    var ipp4 = new Array();
    ipp4.push("103.240.140.177");
    var s04=ipp4[Math.floor(Math.random()*ipp4.length)]+":8011";

    if(tag == 's04'){
        return s04;
    }
    var ipp5 = new Array();
    ipp5.push("162.221.12.130");
    var s05=ipp5[Math.floor(Math.random()*ipp5.length)]+":8011";

    if(tag == 's05'){
        return s05;
    }
    var ipp6 = new Array();
    ipp6.push("170.178.190.10");
    var s06=ipp6[Math.floor(Math.random()*ipp6.length)]+":8011";

    if(tag == 's06'){
        return s06;
    }
    var ipp7 = new Array();
    ipp7.push("107.167.9.200");
    var s07=ipp7[Math.floor(Math.random()*ipp7.length)]+":8011";

    if(tag == 's07'){
        return s07;
    }
    var ipp8 = new Array();
    ipp8.push("192.225.235.51");
    var s08=ipp8[Math.floor(Math.random()*ipp8.length)]+":8011";
    if(tag == 's08'){
        return s08;
    }
    var ipp9 = new Array();
    ipp9.push("192.225.235.59");
    var s09=ipp9[Math.floor(Math.random()*ipp9.length)]+":8011";

    if(tag == 's09'){
        return s09;
    }
    var ipp10 = new Array();
    ipp10.push("192.225.235.67");
    var s10=ipp10[Math.floor(Math.random()*ipp10.length)]+":8011";
    if(tag == 's10'){
        return s10;
    }
    var ipp11 = new Array();
    ipp11.push("192.225.235.35");
    var s11=ipp11[Math.floor(Math.random()*ipp11.length)]+":8011";

    if(tag == 's11'){
        return s11;
    }
    var ipp12 = new Array();
    ipp12.push("208.98.50.108");
    var s12=ipp12[Math.floor(Math.random()*ipp12.length)]+":8011";
    if(tag == 's12'){
        return s12;
    }
    var ipp13 = new Array();
    ipp13.push("208.98.63.8");
    var s13=ipp13[Math.floor(Math.random()*ipp13.length)]+":8011";
    if(tag == 's13'){
        return s13;
    }
    var ipp14 = new Array();
    ipp14.push("170.178.165.100");
    var s14=ipp14[Math.floor(Math.random()*ipp14.length)]+":8011";
    if(tag == 's14'){
        return s14;
    }
    var ipp15 = new Array();
    ipp15.push("107.167.28.196");
    var s15=ipp15[Math.floor(Math.random()*ipp15.length)]+":8011";
    if(tag == 's15'){
        return s15;
    }
    var ipp16 = new Array();
    ipp16.push("174.128.225.68");
    var s16=ipp16[Math.floor(Math.random()*ipp16.length)]+":8011";
    if(tag == 's16'){
        return s16;
    }
}

app.use(express.static(path.join(__dirname, 'view')));
app.listen(80);
console.log("启动完成");

 
