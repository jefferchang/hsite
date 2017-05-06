;(function () {
	
	'use strict';



    var htmltmp =
        '<tr>'+
        '<td align="center" >' +
			'<a href="/detail?page={pages}">' +
			 '<img src="{bigImage}" alt="Image" class="img-responsive">' +
			'</a>'+
			'<h2>{title}</h2>' +
		'</td>'+
        '</tr>';


    var init = function(){
        var html ="";
        $.ajax({

            url:"/listav",
            success:function (data) {
                var pageList =  data.pageList;
                var imageList = data.imageList;
                var titleList = data.titleList ;
                pageList.forEach(function (v,i) {
                    html += htmltmp.replace("{pages}", pageList[i]).replace("{bigImage}",imageList[i]).replace("{title}",titleList[i]);

                });
                $("#datas").html(html);

            }
        })
    };







    // Document on load.
    $(function(){
        init();
    });





}());