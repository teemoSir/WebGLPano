// 播放导航控件

$(function() {

    // 速度控制



})
//屏蔽默认右键菜单
window.oncontextmenu = function() {
    return false;
}


window.onload = function() {



    loadDmiTool(); //dmi播放工具
    //  loadPlayTool(); //播放工具
    loadCity(); //区域选择工具
    loadTool(); //工具栏
    loadTip(); //切换按钮
    loadtagDig(); //新建标签弹框
    loadTag(); //标记列表
    loadCrilPlay(); //圆形进度条
    symbolload() //符号管理

    $('#play_close').on('click', function() {
        playreset();
    })



    function playreset() {
        clear_time();
        window['pano_time_play_index'] = 0;
        window['pano_time_play_object'] = null;
        // $('#play_line').css({ 'width': '0.01%' });
        $("#dmi_play").removeAttr('isNav').removeClass().addClass('glyphicon glyphicon-play').attr('title', '点击播放');
        $("#play_value").html("0.00%").hide();
        $(".out_line").unbind("mouseleave").unbind("mouseenter");
        $(".cril_tool").hide();
    }


    var slip = Number($('#play_slipt').val()) * 100;
    $('#play_slipt').on("change", function() {

        slip = $(this).val() * 100;
        if ($("#dmi_play").attr("isNav")) {
            $("#dmi_play").attr('isNav', 0).removeClass().addClass('glyphicon glyphicon-play').attr('title', '点击播放');
            clear_time();
        }
    })

    function star_time() {
        //slip = Number($('#play_slipt').val()) * 100;
        if (!window['pano_time_play_index']) window['pano_time_play_index'] = 0;
        window['pano_time_play'] = setInterval(function() {
            //加载pano
            loadTimePano(window['pano_time_play_index']);

            window['pano_time_play_index']++;
            //var bili = (window['pano_time_play_index'] / window['pano_time_play_object'].length) * 100;
            var cril_bili = (window['pano_time_play_index'] / window['pano_time_play_object'].length) * 100;
            if (cril_bili < 51) {
                var spanNum = parseFloat(cril_bili.toFixed(2));
                $('.cril_value_span').html(spanNum + "%");
                $('.left').css({ transform: 'rotate(' + (cril_bili / 100 * 360) + 'deg)' });
            } else if (cril_bili > 50) {
                var spanNums = parseFloat(cril_bili.toFixed(2));
                $('.cril_value_span').html(spanNums + "%");
                $('.left').css({ transform: 'rotate(0deg)' });
                $('.left').css('background', '#000');
                $('.right').css({ transform: 'rotate(' + ((spanNums - 50) / 100 * 360) + 'deg)' });
            }


            //重置
            if (window['pano_time_play_index'] == window['pano_time_play_object'].length) playreset();

        }, slip);
    }

    function keepjindu() {
        var cril_bili = (window['pano_time_play_index'] / window['pano_time_play_object'].length) * 100;
        $(".out_point").attr("isclear", 1)
        console.log(cril_bili);
        if (cril_bili < 51) {
            var spanNum = parseFloat(cril_bili.toFixed(2))
            $('.cril_value_span').html(spanNum + "%");
            $('.left').css({ transform: 'rotate(' + (cril_bili / 100 * 360) + 'deg)' });
        } else if (cril_bili > 50) {
            var spanNums = parseFloat(cril_bili.toFixed(2));
            $('.cril_value_span').html(spanNums + "%");
            $('.left').css({ transform: 'rotate(0deg)' });
            $('.left').css('background', '#000');
            $('.right').css({ transform: 'rotate(' + ((spanNums - 50) / 100 * 360) + 'deg)' });
        }
    }


    function clear_time() {
        if ($("#dmi_play").attr('isNav') != 0) {
            clearInterval(window['pano_time_play']);
            $('.right').css({ transform: 'rotate(0deg)' });
            $('.left').css({ transform: 'rotate(0deg)', background: "#fff" });
            $("#play_value").html("0.00%").hide();
            // $('.out_line').unbind("mouseleave").unbind("mouseenter");
        } else {
            clearInterval(window['pano_time_play']);


        }

    }

    function loadTimePano(index) {
        if (!window['pano_time_play_object']) return false;
        if (window['pano_time_play_object'][index]) {
            var lnglat = { lng: window['pano_time_play_object'][index][0], lat: window['pano_time_play_object'][index][1] };
            pano.loadPlayByCoord(lnglat, 0.005);
        } else {
            clear_time();
        }
    }

    //
    function isNavCril() {
        if ($("#dmi_play").attr('data') == 0) {
            $("#dmi_play").attr('data', 1);
        } else {
            $("#dmi_play").attr('data', 0);
        }
    }




    //peter

    //工具栏
    $('#navul > li').not('.navhome').hover(function() {
        $(this).addClass('navmoon')
    }, function() {
        $(this).removeClass('navmoon')
    });
    //城市
    var tool = [];
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'];
    tool.push("<div class='city_top' >");
    //tool.push(" <div class=' 'style='width:500px'>");鄂州 恩施 阜新 和田 海口 淮南 喀什 开县 兰州 吕梁 临汾
    tool.push("     <ul>");
    tool.push("         <li class='city_top_li'>热搜城市</li>");
    tool.push("         <li  class='city_top_li span_parent'>");
    /* tool.push("             <span class='pano-tag-city' style='padding:5px' onclick='geo(this)'>北京</span>");
    tool.push("             <span class='pano-tag-city' style='padding:5px' onclick='geo(this)'>晋中</span>");*/
    tool.push("         </li>");

    tool.push("         <li class='city_top_li'>搜索城市</li>");
    tool.push("         <li class='city_top_li' ><input type='text' class='pano-search'  placeholder='输入城市'> <ul class='city_ul'></ul></li> ");
    tool.push("         <li class='city_top_li'>字母索引</li>");
    tool.push("         <li class='city_top_li'>");

    for (var i in abc) {
        tool.push("             <span class='pano-tag-city'  ><a href='#{t}' id='{id}' style='padding:0 5px'>{b}</a></span>"
        .replace('{t}', abc[i].toString().toLocaleUpperCase())
        .replace('{b}', abc[i].toString().toLocaleUpperCase()));
    }

    tool.push("         </li>");
    tool.push("         <li> <div class= 'city_div' >");

    for (var i in abc) {
        var flag = true, t = [];
        for (var ii in ADCODE) {
            if (abc[i] == ADCODE[ii].name.substring(0, 1) && tool.join('').indexOf(ADCODE[ii].city) < 0) {
                var coord = '';
                if (ADCODE[ii].coord) coord = ADCODE[ii].coord;
                t.push("<span class='pano-tag-city' style='padding:5px' id='{id}' onclick='geo(this)' name='{coord}'>{t}</span>"
                .replace('{t}', ADCODE[ii].city)
                 .replace('{id}', '打开_' + ADCODE[ii].city)
                .replace('{coord}', coord));
                flag = false;
            }
        }

        if (flag == false) {
            tool.push("<div></div>");

            tool.push("            <a id='{q}'><b style='padding-right:15px'>{t}</b></a>".replace('{t}', abc[i].toString().toLocaleUpperCase()).replace('{q}', abc[i].toString().toLocaleUpperCase()));
        }
        tool.push(t.join(''));
    }

    tool.push("         </div></li>");
    tool.push("     </ul>");
    tool.push(" </div>");
    $(".nav_city_chid").html(tool.join(''));
    //点击城市显示
    $('.nav_city_chid').hide();

    $("#nav_city").on('click', function() {
        //查询cookie中的城市
        var hotCity_name = pano_cookie.getCookie("hotCity"), hot_span = '';
        if (hotCity_name != undefined) {
            $(".span_parent>span").remove();
            hotCity_name = hotCity_name.split(",");
            for (var i = 0; i < hotCity_name.length; i++) {
                hot_span += "<span  class='pano-tag-city' style='padding:5px' onclick='searchByClick(this)'>" + hotCity_name[i] + "</span> "
            }
            $(".span_parent").append(hot_span);
        }
        if ($('#nav_city').attr('data') == 1) {
            $('.nav_city_chid').hide();
            $('#nav_city').attr('data', 0)
        } else {
            $('.nav_city_chid').show();
            $('#nav_city').attr('data', 1);

        }
    });



    //城市搜索
    var cityObj = ADCODE, cityNameArr = [], searchArr = [];
    //获取城市名称 
    $.each(cityObj, function(index, item) {
        if (cityObj.length > 0) {
            var curCyName = cityObj[index].city;
            cityNameArr.push(curCyName);
        }
    });

    //input触发模糊查询
    var city_li = "", pageNum = 0;

    $('.pano-search').on("keyup", function() {
        var curStr = $.trim($(this).val());
        if (!curStr) {
            city_li = '';
            $(".city_ul").hide();
            $(".city_ul").html('');
        }

        pageNum++;

        city_li = '';
        for (var i = 0; i < cityNameArr.length; i++) {

            if (city_li.indexOf(cityNameArr[i]) < 0) {
                if (cityNameArr[i].indexOf(curStr) >= 0) {
                    city_li += "<li onclick='searchByClick(this)'>" + cityNameArr[i] + "<li>";
                }
            }
        }

        $(".city_ul").html(city_li).show();
    });
    $(".city_ul").on("click", "li", function(e) {
        $(".city_ul").hide();
        $(".pano-search").val(e.target.innerHTML);
        var cur_city_name = e.target.innerHTML.slice(0, 4);
        $("#nav_city").text(cur_city_name);

        $("#nav_city").append("<i></i>");
        // console.log(e.target.innerHTML);
    })

    function goCity(_this) {
        pano.message('进入', 1000);
        geo(_this);

        //切换城市停止播放
        if ($('#dmi_play').attr('data') == 1) {
            $('#dmi_play').click();
        }
    }

    $('#pano_dmi_tool_1').on('click', function() {

        loadPANO();
        $('#dmi-panel').hide();
        $('#pano_dmi_tool_2').hide();
        rloaddmi();
    })

    $('#pano_dmi_tool_2').on('click', function() {
        loadDMI();
        $('#dmi-panel').show();
        $('#pano_dmi_tool_1').hide();
        rloaddmi();
    })

    function rloaddmi() {
        var tag_li = '';
        for (var i = 0; pano.ImageMarkers.length > i; i++) {
            var tagName = pano.ImageMarkers[i].Name, Guid = pano.ImageMarkers[i].Guid; ;
            tag_li += "<li class='tag_li'><label for='" + Guid + "' ><input type='checkbox' class='tag_checkbox' id='" + Guid + "'> " + tagName + "</label></li>";
        }
        $(".tag_ul").append(tag_li);
    }

    //播放默认站点线路DMI playDMI(false);//pause
    $('#dmi_play').on('click', function() {
        if ($(this).attr("isNav")) {
            if ($(this).attr("isNav") == 0) {
                $(this).attr('isNav', 1).removeClass().addClass('glyphicon glyphicon-pause').attr('title', '点击暂停');
                //判断是否是暂停后播放
                if ($(".out_point").attr("isclear") == 1) {
                    star_time();
                } else {
                    clear_time();
                    star_time();
                }
            } else {
                $(this).attr('isNav', 0).removeClass().addClass('glyphicon glyphicon-play').attr('title', '点击播放');
                clear_time();
                keepjindu();
            }
            // $(".out_point").hover(function() { $(".cril_value_span").hide(); }, function() { $(".cril_value_span").show(); })
            isNavCril();

        } else {
            if ($(this).attr('data') == 0) {
                $(this).attr('data', 1).removeClass().addClass('glyphicon glyphicon-pause').attr('title', '点击暂停');
                playDMI(true);
            } else {
                $(this).attr('data', 0).removeClass().addClass('glyphicon glyphicon-play').attr('title', '点击播放');
                playDMI(false);
            }

        }

    })



    //历史点加载
    $('#pano_lishi_marker').on('click', function() {
        if ($(this).attr('data') == 0) {
            $(this).attr('data', 1)//.html("<div class='glyphicon glyphicon-eye-close' style='font-size:28px'></div><br> 隐藏标注");
            $(".tag_ul").html('');
            $(".tag_div").slideToggle('slow', function() {
                var tag_li = '';
                for (var i = 0; pano.ImageMarkers.length > i; i++) {
                    var tagName = pano.ImageMarkers[i].Name, Guid = pano.ImageMarkers[i].Guid; ;
                    tag_li += "<li class='tag_li'><label for='" + Guid + "' ><input type='checkbox' class='tag_checkbox' id='" + Guid + "'> " + tagName + "</label></li>";
                }
                $(".tag_ul").append(tag_li);
            });

        } else {
            $(this).attr('data', 0)//.html("<div class='glyphicon glyphicon-eye-open' style='font-size:28px'></div><br> 显示标注");
            $(".tag_div").slideToggle('slow');
        }
    })


    //hover时显示提示
    $(".nav_city").append("<span class='tip_div span_a'>这里可以切换城市</span>");
    $(".out_line").append("<p class='tip_div span_d'>这里是指南针和播放工具</p>");
    $(".pano-tip").append("<span class='tip_div span_c'>这里是切换影像</span>");
    $("#top_bg").append("<span class='tip_div span_b'>这里是工具栏</span>");

    // $("#nav_city").hover(function() { $(".span_a").show() }, function() { $(".span_a").hide() })
    // $("#top_bg").hover(function() { $(".span_b").show() }, function() { $(".span_b").hide() })
    //  $(".pano-tip").hover(function() { $(".span_c").show() }, function() { $(".span_c").hide() })
    // $(".out_point").hover(function() { $(".span_d").show() }, function() { $(".span_d").hide() });
    $("#container").one("mousemove", function() {
        $(".tip_div").show();
        setTimeout(function() { $(".tip_div").hide(); }, 2000);
    })



    //显示标记

    $(".btn_tag_close").on("click", function() {
        $(".tag_div").slideUp();
    });

    $(".all_box").on("change", function() {
        if ($(this).prop("checked")) {
            $(".tag_checkbox").each(function() {
                $(this).prop("checked", true)
            });
        } else {
            $(".tag_checkbox").each(function() {
                $(this).prop("checked", false)
            });
        }
    });

    //方向盘hover
    $(".fx_icon").hover(function() { $(".de_icon").show() }, function() { $(".de_icon").hide(); })


    //进度条关闭
    $(".btn_cril_close").on("click", function() {
        $(".cril_tool").fadeOut("slow");
        $("#dmi_play").removeAttr("isNav");
        $('#play_value').html("0.00%").hide();
        $('.out_line').unbind("mouseleave").unbind("mouseenter");
    });

    $(".symbol_mage").on("click", function() {

        $(".form_infor").show();

    })
    $(".icon_top_right").on("click", function() {

        $(".form_infor").hide();
    });
    //http://1.97.81.108:2020/tms.ashx/?fun=QueryImageList
    /* $.ajax({
    type: "POST",
    dataType:"jsonp",
    url: "http://1.97.81.168:8088/dezhou_dmi/Image3DMarkerService/UpdateMarkerSymbolFile/",
    data: {
    guid: "0346033C-E2A1-4A2F-A37C-C11BE185ECA9",
    body: "gL6GI3KM7Ij5GI3KM7ei4Ij5GI3ei4"
    },
    success: function(data) {

            console.log(data);
    }


    })*/

    /*  $('#files').on('change', function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e) {

            var result = e.target.result; console.log(result);

            var xhr = new XMLHttpRequest();
    xhr.open('post', 'http://1.97.81.168:8088/kashi_pano/Image3DMarkerService/UpdateMarkerSymbolFile/?guid=0DAB9B94-180E-4CAD-BA0E-C859AC7FE1D9', true);
    xhr.setRequestHeader('Context-Type', 'Application/octet-stream');
    xhr.send(result);

            xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
    if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText))
    }
    }
    }
    xhr.onerror = function(e) {
    console.log(e)
    }
    }
    });
    */

    //符号管理的事件操作
    //hover
    $(".icon_middle_left ul li").each(function() {
        var cur_li = $(this);
        $(this).hover(function() {

            $(this).find("div").show();
            $(this).css("borderColor", "red");

        }, function() {

            $(this).find("div").hide();
            $(this).css({ borderColor: "#ccc" });
        })

    });
    //添加 符号信息
    $(".icon_add").on("click", function() {
        var cur_name = decodeURIComponent($(".iconName").val());
        var url = decodeURIComponent(" http://1.97.81.168:8088/dezhou_dmi/Image3DMarkerService/AddMarkerSymbol/?name=" + cur_name + "");
        pano.sendAjax({
            async: true,
            type: 'get',
            url: url,
            callback: function(data) {
                console.log(data);
                if (data.Status == 1) {

                }
            }
        })


    })

    //del
    var cur_guid;
    $(".icon_del").on("click", function() {
        cur_guid = $(this).parents("li").find(".cur_guid").val();
        $(".zhezhao").show();
        $(".icon_del_dig").show();
    })
    $(".del_cancel").on("click", function() {
        $(".zhezhao").hide();
        $(".icon_del_dig").hide();
    });
    $(".del_ok").on("click", function() {

        var url = " http://1.97.81.168:8088/dezhou_dmi/Image3DMarkerService/DeleteMarkerSymbol/?guid=" + cur_guid + "";
        pano.sendAjax({
            async: true,
            type: 'get',
            url: url,
            callback: function(data) {
                console.log(data);
                $(".zhezhao").hide();
                $(".icon_del_dig").hide();
                if (data.Status == 1) {

                }
            }
        })

    });
    //修改
    $(".icon_mod").on("click", function() {
        $(".icon_middle_left li a").css("color", "#000")
        $(this).parents("li").find("a").css("color", "red");
        $(".icon_add").hide();
        $(".icon_mod_keep").show();

    });

    //提交修改
    $("#symbolName").on("change", function() {
        var file = this.files[0];
        if (FileReader) {
            var fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onloadend = function(e) {
                $("#YLImage").attr("src", e.target.result);

                $("#Symbol").val(e.target.result);
            }
        }
    })

  
}

//符号库管理

function symbolload() {
    //http://1.97.81.108:2020/tms.ashx/?fun=QueryImageList

    /*
    http://1.97.81.168:8088/dezhou_dmi/Image3DMarkerService
    http://1.97.81.168:8088/dezhou_dmi/Image3DMarkerService/AddMarkerSymbol/?name=test1&tag=%E5%B8%B8%E8%A7%84&format
    http://1.97.81.168:8088/dezhou_dmi/Image3DMarkerService/UpdateMarkerSymbolFile/?guid=ADE0D1BA-0E12-433C-B18A-23030D099F81
    */



    var symTool = [];
    symTool.push("<form action='http://1.97.81.108:2020/tms.ashx/?fun=UpdateImage'  method='post' class='form_infor'>");

    symTool.push("  <div class='icon_dig'>");

    symTool.push("  	<div class='icon_top'>");
    symTool.push("  		<p class='icon_top_left'>符号库管理</p>");
    symTool.push("	        <span class='icon_top_right'>×</span>");
    symTool.push("      </div>");


    symTool.push("<div class='icon_middle'>");
    
    symTool.push("<strong>新增与编辑</strong>");
    /* symTool.push("	<div class='icon_pic_name'>");
    symTool.push("	<span class=''>名称：</span>");
    symTool.push("<input type='text' class='iconName'/>");
    symTool.push("</div>");
    symTool.push("	<div class='icon_pic_up'>");
    symTool.push("	<input type='file'  class='files'  id='files'/>");
    symTool.push("	</div>");
    symTool.push("	<input type='button' value='添加' class='icon_add'/>");
    symTool.push("	<input type='button' value='保存' class='icon_mod_keep'/>");
    symTool.push("	</div>");
    symTool.push("</div>");
    symTool.push("<div class='zhezhao'></div><div class='icon_del_dig'>");
    symTool.push("<p>删除弹框</p>	<span>确定删除？</span><input type='button' class='del_cancel' value='取消'>");
    symTool.push("	<input type='button' class='del_ok' value='确定'>");
    symTool.push("</div>");
    symTool.push("<hr>");*/

    symTool.push("<table width='100%'>");
    symTool.push("<div style='border-bottom:1px solid #ccc;heigth:5px'></div>");
    symTool.push("<td>名称：</td>");
    symTool.push("<td> <input id='name' name='name' class='pano-symbol' /></td>");
    symTool.push("<td rowspan='2' style='text-align:center;color:#ccc'><img id='YLImage' style='width:120px;height: 120px;margin-top:15px'><br><p>图片预览</p></td>");
    symTool.push("<tr>");

    symTool.push("<td>图片：</td>");
    symTool.push("<td><input type='file' id='symbolName' name='symbolName' class='pano-symbol' onchange='symbolChange(this)' /><input type='hidden' id='Symbol' name='Symbol' value=''/></td>");
 
    symTool.push("<tr>");

    symTool.push("<td></td>");
    symTool.push("<td> <button style='margin:0' class='btn_tag' type='submit'>保存</button></td>");
    symTool.push("<td><span style='color:red'>提示：图片与名称必填。</span></td>");
    symTool.push("<tr>");
    symTool.push("</table>");
    
 /*  symTool.push(" <form id='form1' method='post' action='tms.ashx/?fun=UpdateImage'>");
   symTool.push("    <strong></strong>");
   symTool.push("  <br>");
    symTool.push("    <strong>文件：</strong>");
    symTool.push("    <br />");
    symTool.push("    ");

    symTool.push("    <strong>预览：</strong>");
   symTool.push("     <img src='' id='YLImage' style='height: 80px;'>");
    symTool.push("    ");
    symTool.push("   <img  id='base64' style='width:50px;height:50px' />'");

   symTool.push(" </form>");*/

    symTool.push("<strong>预览</strong>");
    symTool.push("<div style='border-top:1px solid #ccc;heigth:5px'></div>");
    symTool.push("	<div class='icon_middle_left'>");
    symTool.push("<ul>{context}</ul>");
    symTool.push("</div>");
    symTool.push("  </div>");
    symTool.push("	</form>");


    pano.getSymbol(function(data) {
        if (data.status == 1) {
            load(data.data);
            console.info(data.message);
        } else {
            console.info("symbol load error");
        }
    });

    function load(data) {
        var symList = [];

        for (var i in data) {
            symList.push("<li>");
            var src = data[i].file;
            symList.push("<img src='{src}' style='width:50px;height:50px' />".replace('{src}', src));
            symList.push("<a>{name}</a><input type='hidden' value=''  class='cur_guid'>".replace('{name}', data[i].name));
            symList.push("<div class='icon_bottom_btn'>");
            symList.push("	<input type='button' class='icon_del' value='删除'>");
            symList.push("	<input type='button' class='icon_mod' value='修改'>");
            symList.push("	</div>");
            symList.push("</li>");
        }

        $("body").append(symTool.join('').replace('{context}', symList.join('')));
    }


}

function symbolChange(t) {
    var file = t.files[0];
    if (FileReader) {
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onloadend = function(e) {
            $("#YLImage").attr("src", e.target.result);

            $("#Symbol").val(e.target.result);
        }
    }
}


function BtnTag() {
    var val = $('.tag_name').val();
    if (!val) return false;
    $('#diag_tag').slideUp();
    tijiao(val);
}

function BtnTagClose() {
    $("#diag_tag").slideDown();
}

function loadTooltip(options) {
    var tipc = document.createElement('div');
    tipc.className = 'psv-tooltip psv-tooltip--center-top psv-tooltip--visible';
    tipc.style.cssText = 'top: 70%;left: 50%;z-index: 160;';
    tipc.innerHTML = '<div class="psv-tooltip-arrow" style="top: 10px; right: -10px;"></div><div class="psv-tooltip-content">操作或播放实景可以使用控制盘完成</div>'; //

    var body = document.body.appendChild(tipc);
}

function searchByClick(_this) {
    $('#打开_' + _this.innerHTML).click();
}

//封装添加城市
function addCity(name) {
    var hotCity = pano_cookie.getCookie("hotCity"), newcityArr = [], hotcityArr;
    if (hotCity != undefined) {
        hotcityArr = hotCity.split(",");
        hotcityArr.unshift(name);
        newcityArr = quchong(hotcityArr);
        if (newcityArr.length > 26) {
            newcityArr.pop();
            pano_cookie.setCookie("hotCity", newcityArr, 100);
        } else {
            pano_cookie.setCookie("hotCity", newcityArr, 100);
        }
    } else {
        pano_cookie.setCookie("hotCity", name, 100);
    }
    return newcityArr;
}

//数组去重
function quchong(arr) {
    var obj = {}, newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = 1;
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

function tagclick() {
    $(".tag_div").slideUp();
    pano.clearMarkers(); pano.clearDMIMarker();
    var cur_data_maker = pano.ImageMarkers;
    var tag_checkbox = $(".tag_checkbox");
    $('#all_box').prop('checked', false);

    for (var i in cur_data_maker) {
        if (tag_checkbox[i].checked) {
            var cur_tag_checked_id = tag_checkbox[i].id;
            var pos = cur_data_maker[i].PixShape.split('|');
            var opt = {
                content: cur_data_maker[i].Name,
                position: { lng: pos[0], lat: pos[1] },
                tag: cur_data_maker[i].Tag,
                className: 'pano-tag'
            }
            pano.drawMarker(cur_tag_checked_id, opt);
        }
    }
};

function closePano() {
    // clear_time();
    window['pano_time_play_index'] = 0;
    window['pano_time_play_object'] = null;
    // $('#play_line').css({ 'width': '0.01%' });
    $("#dmi_play").removeAttr("isNav");
    $('#play_value').html("0.00%").hide();
    $('.out_line').unbind("mouseleave").unbind("mouseenter");

    //播放比例
    $('.cril_tool').show();
}

function fx_icon_Ns() {
    pano.goStationByStep(1);
}
function fx_icon_Ss() {
    pano.goStationByStep(-1);
}
function fx_icon_Es() {
    pano.getDMIImageByType(1)
}
function fx_icon_Ws() {
    pano.getDMIImageByType(-1)
}

function zoom(zoo) {
    pano.setZoom(zoo);
}

function loadDmiTool() {

    var drtool = [];
    drtool.push("<span class='de_icon fx_icon_Es'  onclick='fx_icon_Es()'  title='右看'  data-placement='right' data-toggle='tooltip' ></span>");
    drtool.push("<span class='de_icon fx_icon_Ws'  onclick='fx_icon_Ws()'  title='左看'  data-placement='left' data-toggle='tooltip' ></span>");
    drtool.push("<div class='glyphicon glyphicon-play' data='0' style='font-size: 25px;left: 30px;top: 28px;cursor:pointer;' id='dmi_play' data-placement='top' data-toggle='tooltip' title='点击预览线路'></div>");
    drtool.push("<span class='de_icon fx_icon_Ns'  onclick='fx_icon_Ns()'  title='前进'></span>"); //<span class='de_icon fx_icon_AA'  id='dmi_play'  title='线路预览'></span>
    drtool.push("<span class='de_icon fx_icon_Ss'  onclick='fx_icon_Ss()'  title='后退'></span>");
    var fx_icon = document.createElement("div");
    fx_icon.className = "fx_icon";
    fx_icon.id = "fx_icon";
    fx_icon.innerHTML = drtool.join('');

    var image = document.createElement('img');
    image.id = 'dmi-image';
    image.className = 'dmi-image';


    var div = document.createElement('div');
    div.id = 'dmi-panel';
    div.className = 'dmi-panel';
    div.style.display = 'none';
    div.appendChild(image);

    // div.appendChild(fx_icon);
    var out_middle = document.createElement('div');
    out_middle.className = 'out_line';
    var body = document.getElementById(pano.getContainerID());
    body.appendChild(div);
    div.appendChild(out_middle);
    out_middle.appendChild(fx_icon);

    //新添外层
    var outtool = [];
    outtool.push("<span class='out_point_e'>东</span><span class='out_point_w'>西</span><span class='out_point_s'>南</span><span class='out_point_n'>北</span>");
    var out_div = document.createElement("div");
    out_div.className = "out_point";
    out_div.id = "pano_out_point";
    out_div.innerHTML = outtool.join('');
    out_middle.appendChild(out_div);

}
//标记框
function loadTag() {
    var tDiv = [];
    tDiv.push(" <h6 style='  border-bottom: 1px solid #ccc;padding:10px 0 10px 0;width: 100%;'>标注</h6><ul class='tag_ul'></ul>");
    tDiv.push("<label for='all_box' style='border-top: 1px solid #ccc;padding:10px 0 0 0;width: 100%;'><input type='checkbox' id='all_box' class='all_box'  /> 全选 / 反选</label>");
    tDiv.push("<button class='btn_tag_close' value='关闭'> 关闭</button><button class='btn_tag' value='确定' onclick='tagclick();'> 确定</button>");
    var tag_div = document.createElement('div');
    tag_div.className = "tag_div";
    tag_div.innerHTML = tDiv.join('');
    var body = document.getElementById(pano.getContainerID());
    body.append(tag_div);
}
function loadTip() {
    //播放
    var bofang = [];

    //标记
    var biaoji = [];
    biaoji.push("     <div class='pano-message' data-toggle='tooltip' data-placement='left' title='显示标注' id='pano_lishi_marker' data='0' style='display:none'>");
    biaoji.push("         <div class='glyphicon glyphicon-eye-close' style='font-size:28px'></div><br> 显示标注");
    biaoji.push("     </div>");

    //全景
    var newtool = [];
    newtool.push("     <div class='pano-message' data-toggle='tooltip' data-placement='left' title='点击查看全景影像'  id='pano_dmi_tool_1' data='1' style='display:none'>");
    newtool.push("         <div class='glyphicon glyphicon-globe' style='font-size:28px'></div><br> 全景影像");
    newtool.push("     </div>");
    newtool.push("     <div class='pano-message' data-toggle='tooltip' data-placement='left' title='点击查看实景影像'  id='pano_dmi_tool_2' data='1' style='display:none'>");
    newtool.push("         <div class='glyphicon glyphicon-picture' style='font-size:28px'></div><br> 实景影像");
    newtool.push("     </div>");


    var body = document.getElementById(pano.getContainerID());
    var div = document.createElement("div");
    div.className = 'pano-tip';
    div.id = 'pano_righttool';
    div.innerHTML = newtool.join('') + biaoji.join('') + bofang.join('');

    body.appendChild(div);
}

function loadCity() {
    var tool = [];
    //nav_city
    tool.push(" 		<div id='nav_city' data='0'>城市<span class='span_icon glyphicon glyphicon-triangle-bottom pull-right'></span><i></i>  ");
    tool.push(" 		</div>  ");
    tool.push(" 		<div class='nav_city_chid'>  ");
    tool.push(" 		</div>  ");
    var body = document.getElementById(pano.getContainerID());
    var div = document.createElement("div");
    div.className = 'nav_city';
    div.innerHTML = tool.join('');

    body.appendChild(div);
    $("#nav_city").hover(function() {
        $(this).find("i").hide();
    }, function() {
        $(this).find("i").show();
    });
}

function loadTool() {
    var tool = [];

    tool.push(" 		<!--导航开始-->                                                                              ");
    tool.push(" 		<div class='nav_z'>");
    tool.push(" 			<ul id='navul' class='cl'>");
    tool.push(" 					<li class='navul_li' style='display:none;'><a href='#'>缩放</a><i></i>");
    tool.push(" 					<ul>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='zoom(50)'>放大</a>");
    tool.push(" 						</li>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='zoom(0)'>缩小</a>");
    tool.push(" 						</li>");
    tool.push(" 					</ul>");
    tool.push(" 				</li>");
    tool.push(" 				<li>");
    tool.push(" 					<a href='#' onclick='panoToolOpenDMI()' id='liangce_tool'>测量</a>");
    tool.push(" 				</li>");
    tool.push(" 					<li class='navul_li'><a href='#'>标注</a><i></i>");
    tool.push(" 					<ul>");
    tool.push(" 						<li><a href='#' onclick='addMarker()'>新建</a></li>");
    tool.push(" 					    <li><a href='#' onclick='deleteMarker()'>清除</a></li>");
    tool.push(" 					    <li><a href='#' class='symbol_mage'>符号管理</a></li>");
    tool.push(" 					</ul>");
    tool.push(" 				</li>");
    tool.push(" 				<li style='display:none;'>");
    tool.push(" 					<a href='#' onclick='setStationHD(3)' id='pano_hd' >高清</a>");
    tool.push(" 				</li>");
    tool.push(" 				<li class='navul_li' style='display:none;'>");
    tool.push(" 					<a href='#'>级别</a><i></i>");
    tool.push(" 					<ul>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='setStationHD(0)'>1</a>");
    tool.push(" 						</li>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='setStationHD(1)'>2</a>");
    tool.push(" 						</li>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='setStationHD(2)'>3</a>");
    tool.push(" 						</li>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='setStationHD(3)'>4</a>");
    tool.push(" 						</li>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='setStationHD(4)'>5</a>");
    tool.push(" 						</li>");
    tool.push(" 					</ul>");
    tool.push(" 				</li>");

    tool.push(" 				<li  class='navul_li'>");
    tool.push(" 					<a href='#'>更多</a><i></i>");
    tool.push(" 					<ul>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='toggleAutoRotate()'>漫游</a>");
    tool.push(" 						</li>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='setStationHD(3)' id='pano_hd'>高清</a>");
    tool.push(" 						</li>");
    tool.push(" 						<li>");
    tool.push(" 							<a href='#' onclick='toggleArrow()' >方向标</a>");
    tool.push(" 						</li>");
    tool.push(" 					</ul>");
    tool.push(" 				</li>");
    tool.push(" 				<li><a href='#' id='pano-fullscreen-map' isFull='1' onclick='toggleFullScreen()'>全屏</a></li>");
    tool.push(" 			<li>");
    tool.push(" 				<a href='#' id='pano-close-map' onclick='closePano()'>关闭</a>");
    tool.push(" 			</li>");
    tool.push(" 			<!--可在此处直接添加导航-->");
    tool.push(" 		</ul>");
    tool.push(" 	</div>");
    tool.push(" 	<!--导航结束-->");


    var body = document.getElementById(pano.getContainerID());
    var div = document.createElement("div");
    div.id = 'top_bg';
    div.innerHTML = tool.join('');

    body.appendChild(div);
    $(".navul_li").hover(function() {
        $(this).find("i").hide();
    }, function() {
        $(this).find("i").show();
    })


}
//新增圆形进度条
function loadCrilPlay() {
    var criltool = [];

    criltool.push("     <div class='cril_tool_select'><button class='btn_cril_close' value='关闭'  id='play_close' >关闭</button><select name='play_slipt' id='play_slipt' class='cts'><option value='10'>频率</option><option value='10'>1秒</option><option value='20'>2秒</option><option value='30'>3秒</option></select></div>");
    criltool.push(" <div class='cril' id='play_line' ><div class='cril_right'><div class='right'></div></div><div class='cril_left'><div class='left'></div></div><div class='jindu'></div></div>");


    var div = document.createElement("div");
    div.className = 'cril_tool';
    div.innerHTML = criltool.join('');

    $(".out_line").append(div);
    $(".out_line").append("<div class='cril_value_span' id='play_value'></div>");
}





//新建标记弹框

function loadtagDig() {
    var tagtool = [];
    tagtool.push("<h5>新建标记</h5>");
    tagtool.push("<span class='tag_span'>标记名称：</span>");
    tagtool.push("<input type='text' class='tag_name' /> ");
    tagtool.push("<div class='tag_btm'>");
    tagtool.push("<button class='btn_tag_close' onclick='BtnTagClose()'>关闭</button>");
    tagtool.push("<button class='btn_tag'  onclick='BtnTag()'>确认</button>");
    tagtool.push("</div>");
    var body = document.getElementById(pano.getContainerID());
    var div = document.createElement("div");
    div.className = 'diag_tag';
    div.style.display = 'none';
    div.id = 'diag_tag';
    div.innerHTML = tagtool.join('');

    body.appendChild(div);

}



function playRoute() {
    if ($("#dmi_play").attr('data') == 1) {
        $("#dmi_play").click();
    }
    pano.message('全景导航准备完毕，请点击【开始】按钮查看', 3000);
    //进度条显示
    //$('#pano-play').show();
    $("#dmi_play").attr("isNav", 0);
    $('.cril_tool').show();
    $(".cril_tool").find(".left,.right").css({ transform: "rotate(0deg)" });
    $('.left').css({ transform: 'rotate(0deg)', background: "#fff" })
    $('#play_value').hide().html("0.00%");
    $('.out_line').bind("mouseleave", function() {
        $("#play_value").show();

    })
    $('.out_line').bind("mouseenter", function() {
        $("#play_value").hide();

    })

}


function loadDMI() {

    pano.getDMIStationByCoord({
        tel: 0.0005,
        position: { lng: pano.getStation().X, lat: pano.getStation().Y }
    }, function(data) {

        if (data.Status == 1) {
            pano.getDMICameraInfo(cameraCallback);
        } else {
            pano.message('没有量测实景影像', 500);
        }

        function cameraCallback(info) {
            if (info.Status == 1) {
                pano.loadDMIPhoto();
            }
        }
    })
}
function loadPANO() {
    pano.loadPano({ lng: pano.getStation().X, lat: pano.getStation().Y }, 0.05);
}


function geo(th) {

    var cityname = th.innerText;
    $("#nav_city").text(cityname.slice(0, 4));
    addCity(cityname);
    $("#nav_city").append("<i></i>");
    var position = th.getAttribute('name');

    //区域改变
    // $('#nav_city').html(cityname.substring(0, 4) + ' <span class=\'span_icon glyphicon glyphicon-triangle-bottom pull-right\'></span><i></i>');
    $('.nav_city_chid').hide();
    $('#nav_city').attr('data', 0);

    if (cityname && position) {
        pano._OPTIONS.position = {
            lng: position.split(',')[0],
            lat: position.split(',')[1]
        }
        pano.loadPanoByCity02({ city: cityname });
    } else {
        searchCity();
    }

    function searchCity() {
        pano.getGeo({
            address: cityname,
            callback: function(data) {
                if (data.status == 0 && data.results[0]) {
                    if (data.results[0].location) {
                        pano._OPTIONS.position = {
                            lng: data.results[0].location.lng,
                            lat: data.results[0].location.lat
                        }
                    } else {
                        pano._OPTIONS.position = {
                            lng: position.split(',')[0],
                            lat: position.split(',')[1]
                        }
                    }

                    pano.loadPanoByCity();

                }
            }
        });
    }

}



function playDMI(bool) {
    if (bool) {
        pano.intervalPlayTime = setInterval(function() {
            pano.goStationByStep(1);
        }, 800)
    } else {
        if (pano.intervalPlayTime) {
            clearInterval(pano.intervalPlayTime);
        }
    }

}

function goStationByStep(step) {
    pano.goStationByStep(step)
}

//隐藏显示箭头
function toggleArrow() {
    pano.toggleArrow();
}

//自动视野预览
var rotate_ = false;
function toggleAutoRotate() {
    pano.toggleAutoRotate(rotate_)
    if (rotate_) {
        rotate_ = false;
    } else {
        rotate_ = true;
    }
}

//加载高清全景
function setStationHD(val) {
    pano.setStationHD(val);
}

//全屏
function toggleFullScreen() {
    pano.toggleFullScreen();
}

//站点详细信息
function getLocation() {
    var text = [];
    text.push('区域位置:' + pano.getLocation().province + pano.getLocation().city + pano.getLocation().district + pano.getLocation().street + pano.getStation().Address);
    text.push('拍摄时间=' + pano.getStation().StationID.split('-')[2].substring(0, 8));
    text.push('坐标位置=' + pano.getStation().X + ',' + pano.getStation().Y);

    pano.showOverlay('', 'Station Info', text.join('<br>'));
}



function panoToolOpenDMI() {
    var station = pano.getStation().StationID;
    var code = pano.getLocation().serviceCode;
    var url = 'http://1.97.81.108/example/dmi.html?{station},{code}'.replace('{station}', station).replace('{code}', code);
    window.open(url, '双目量测', 'height=480,width=1060,top=100,left=100,toolbar=no,menutool=no,scroll=no;resizable=no');
}

//添加标记
function addMarker() {

    pano.message('请点击需要标记的地物位置', 5000);

    if (pano.getStation().DataType == 4) {
        pano.once('click', function(e) {

            $('.tag_name').val('');
            $('#diag_tag').slideDown();
            $('#diag_tag').attr('data', e.lng + ',' + e.lat)
            console.log(e);
        });
    } else {
        $('#dmi-image').on('click', function() {

            var e = window.event || e;
            var wh = {
                lng: e.x / $(this).width() * 360,
                lat: e.y / $(this).height() * 360
            }


            $('.tag_name').val('');
            $('#diag_tag').slideDown();
            $('#diag_tag').attr('data', wh.lng + ',' + wh.lat);

            console.log(wh);
        })
    }


}


function tijiao(name) {
    var lnglat = $('#diag_tag').attr('data')
    var opt = {
        content: name,
        position: { lng: lnglat.split(',')[0], lat: lnglat.split(',')[1] },
        tag: '【点击查看】',
        stationid: pano.getStation().StationID,
        type: '0',
        symbolguid: '',
        className: 'pano-tag'
    }

    pano.addMarker(opt, function(data) {
        if (data.Status == 1) {
            pano.message('标记 [ ' + name + ' ] 添加成功！', 500);
        } else {
            pano.message('标记 [ ' + name + ' ] 添加失败！', 500);
        }
    })
}

//删除标记
function deleteMarker() {

    pano.message('请点击需要删除的标记', 2000);
    pano.once('select-marker', function(e) {
        var m = pano.getCurrentMarker();
        pano.deleteMarker(m, function(data) {
            if (data.Status == 1) {
                pano.message('成功删除！', 500);
            } else {
                pano.message('删除失败！', 500);
            }
        });
    })

}

//装载标记
function clearMarkers() {
    pano.clearMarkers();
}
// 隐藏标记
function loadMarkers() {

    pano.loadMarkers();
}

function blueroad() {
    if (pano._OPTIONS.BlueRoad == undefined) {
        pano._OPTIONS.BlueRoad = true;
    } else {
        if (pano._OPTIONS.BlueRoad == true) {
            parent.window.frames['workspace_iframe0'].deletelideluwangLayer();
            pano._OPTIONS.BlueRoad = false;
        }
        else {
            parent.window.frames['workspace_iframe0'].addlideluwangLayer();
            pano._OPTIONS.BlueRoad = true;
        }
    }


}

//点击切换
function faceClick(image) {
    var ele = {
        left_image: document.getElementById('left_image'),
        right_image: document.getElementById('right_image')
    }

    var list = pano.getDMIImageList();

    var stationID = pano.getDMIStation().StationID.substring(0, 6) + '-{index}-' + pano.getDMIStation().StationID.substring(9, 27);

    switch (image.id) {
        case 'face1':
            face(list[0], list[1], stationID.replace('{index}', 1), stationID.replace('{index}', 2))
            break;
        case 'face2':
            face(list[0], list[1], stationID.replace('{index}', 1), stationID.replace('{index}', 2))
            break;
        case 'face3':
            face(list[1], list[2], stationID.replace('{index}', 2), stationID.replace('{index}', 3))
            break;
        case 'face4':
            face(list[2], list[3], stationID.replace('{index}', 3), stationID.replace('{index}', 4))
            break;
        case 'face5':
            face(list[3], list[4], stationID.replace('{index}', 4), stationID.replace('{index}', 5))
            break;
        case 'face6':
            face(list[4], list[5], stationID.replace('{index}', 5), stationID.replace('{index}', 6))
            break;
    }
    function face(face_left, face_right, leftid, rightid) {
        // 绑定src到Canvas
        ele.left_image.stationSrc = face_left;
        ele.right_image.stationSrc = face_right;

        // 绑定stationid到canvas
        ele.left_image.stationID = leftid;
        ele.right_image.stationID = rightid;

        loadImageToCanvas(ele.left_image)
        loadImageToCanvas(ele.right_image)
    }
    ele = null, list = null;
}

function printStationToHtml(station) {
    var panel = [];
    panel.push("<div class='panel panel-default' style='margin:0 auto;width:1060px;margin-top:88px;border:1px solid #ccc;box-shadow:3px 3px 3px #000'>");
    panel.push("<span onclick='celiang2Exit()' class='glyphicon glyphicon-remove btn-lg' ></span>");
    panel.push("<table class='model-leador'><tr ><td><p class='text-success'><span class='glyphicon glyphicon-eye-open'></span> 点击列表切换相机视角。</p> </td>"); //
    //  panel.push("<td><div style='margin-left:15px'><button onclick='StationStep(this)' id='go' >站点前进</button><button id='back'  onclick='StationStep(this)'>站点后退</button></div><div style='padding:20px;'>{station}<div></td>");
    //panel.push("<td><div ><button onclick='Marker()'>Add Node</button><button onclick='Clear()'>Clear Node</button></div></td></tr>");
    panel.push("<td><div class='btn btn-group pull-right'><button onclick='Marker()' class='btn btn-success'><span class='glyphicon glyphicon-plus'></span> 添加节点</button><button onclick='Clear()' class='btn btn-danger'><span class='glyphicon glyphicon-remove-circle'></span> 清空节点</button></div></td></tr>");
    panel.push("<tr style='text-align:center;'>");
    panel.push("<td colspan='2'>");
    panel.push("<img src='{face1}' id='face1' onclick='faceClick(this)' class='pano-image'>");
    panel.push("<img src='{face2}' id='face2' onclick='faceClick(this)' class='pano-image'>");
    panel.push("<img src='{face3}' id='face3' onclick='faceClick(this)' class='pano-image'>");
    panel.push("<img src='{face4}' id='face4' onclick='faceClick(this)' class='pano-image'>");
    panel.push("<img src='{face5}' id='face5' onclick='faceClick(this)' class='pano-image'>");
    panel.push("<img src='{face6}' id='face6' onclick='faceClick(this)' class='pano-image'>");
    panel.push("</tr>");

    // panel.push("<tr style='text-align:center'><td>left</td><td>right</td></tr>");

    panel.push("<tr>");
    panel.push("<td><canvas id='left_image' style='margin-top:-25px'>Loading . . . </canvas></td>");
    panel.push("<td><canvas id='right_image' style='margin-top:-25px'>Loading . . .</canvas></td>");
    panel.push("</tr>");

    panel.push("</table></div>");
    // 详细信息
    var text = [];
    text.push('区域位置:' + pano.getLocation().province + pano.getLocation().city + pano.getLocation().district + pano.getLocation().street + pano.getStation().Address);
    text.push('拍摄时间=' + pano.getStation().StationID.split('-')[2].substring(0, 8));
    text.push('坐标位置=' + pano.getStation().X + ',' + pano.getStation().Y);

    var pageurl = pano.getDMIImageList(station);
    var url = panel.join('')
                .replace('{face1}', pageurl[0])
                .replace('{face2}', pageurl[1])
                .replace('{face3}', pageurl[2])
                .replace('{face4}', pageurl[3])
                .replace('{face5}', pageurl[4])
                .replace('{face6}', pageurl[5])
                .replace('{station}', '')

    var panopanel = document.getElementById('pano-panel');
    panopanel.innerHTML = url;

    var ele = {
        left: document.getElementById('left_image'),
        right: document.getElementById('right_image')
    }
    // 绑定Stationid到Canvas
    ele.left.stationSrc = pageurl[0];
    ele.right.stationSrc = pageurl[1];

    var stationID = pano.getDMIStation().StationID.substring(0, 6) + '-{index}-' + pano.getDMIStation().StationID.substring(9, 27);

    // 绑定stationid到canvas
    ele.left.stationID = stationID.replace('{index}', 1);
    ele.right.stationID = stationID.replace('{index}', 2);

    // 更新资源地址
    loadImageToCanvas(ele.left)
    loadImageToCanvas(ele.right)

}

// 标记
function Marker() {
    var ele = {
        left: document.getElementById('left_image'),
        right: document.getElementById('right_image')
    }

    // 绑定颜色
    ele.left._tagcolor = 'red';
    ele.right._tagcolor = 'yellow';

    ele.left.style.cursor = 'crosshair';
    ele.right.style.cursor = 'crosshair';

    // 绑定事件
    ele.left.addEventListener('click', canvasClick);
    ele.right.addEventListener('click', canvasClick);
}

// 清理重置
function Clear() {
    if (pano._MeasureNodeArray) {
        pano._MeasureNodeArray = { left_node_array: [], right_node_array: [], double_eye_stationid: [], node_coord: [] };
    }
    clearCanvas();

}

// 画布事件
function canvasClick(e) {

    if (!pano._MeasureNodeArray) {
        pano._MeasureNodeArray = { left_node_array: [], right_node_array: [], double_eye_stationid: [], node_coord: [] };
    }
    // 获得画布坐标
    var position = getCanvasPos(e, this);
    // 绘制点
    drawCanvasMarker(this, {
        color: this._tagcolor,
        path: [position.x, position.y, 10, 10],
        text: 'Node[' + (pano._MeasureNodeArray.right_node_array.length + 1) + ']',
        font: '13px bold 微软雅黑'
    })
    // 缓存点数组
    if (this._tagcolor == 'red') {
        pano._MeasureNodeArray.left_node_array.push(position);
        pano._MeasureNodeArray.double_eye_stationid[0] = this.stationID;
    }
    else if (this._tagcolor == 'yellow') {
        pano._MeasureNodeArray.right_node_array.push(position);
        pano._MeasureNodeArray.double_eye_stationid[1] = this.stationID;

    }
    //  绘制线
    if (pano._MeasureNodeArray.right_node_array.length >= 2) {
        drawDoubleLine();
    }
    //获得坐标
    if (this._tagcolor == 'yellow') {
        var option = {
            leftid: pano._MeasureNodeArray.double_eye_stationid[0],
            leftx: pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 1].x * (627 / 1536), //627*472
            lefty: pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 1].y * (472 / (1536)), // 303 2048 1536
            rightid: pano._MeasureNodeArray.double_eye_stationid[1],
            rightx: pano._MeasureNodeArray.right_node_array[pano._MeasureNodeArray.right_node_array.length - 1].x * (627 / 1536),
            righty: pano._MeasureNodeArray.right_node_array[pano._MeasureNodeArray.right_node_array.length - 1].y * (472 / 1536 - 300)
        }

        pano.getDMIMeasure(option, callback);

        function callback(data) {
            //console.log(data);
            if (data.Status != '1') {
                return false;
            }
            // 缓存节点
            pano._MeasureNodeArray.node_coord.push(data.Point);
            // 计算距离
            if (pano._MeasureNodeArray.node_coord.length >= 2) {
                var a = pano._MeasureNodeArray.node_coord[pano._MeasureNodeArray.node_coord.length - 2];
                var b = pano._MeasureNodeArray.node_coord[pano._MeasureNodeArray.node_coord.length - 1]

                var dis = pano.getJLByCoord({ lat: a.X, lon: a.Y }, { lat: b.X, lon: b.Y });
                //console.log(dis);

                // 打印距离到画布
                printDis(dis)

            }
        }
    }

    // 停止当前绘制
    this.removeEventListener('click', canvasClick);

    // 恢复鼠标
    this.style.cursor = 'default';
}
function printDis(dis) {
    var x = pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 2].x + (pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 1].x - pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 2].x) / 2;
    var y = pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 2].y + (pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 1].y - pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 2].y) / 2;

    drawCanvasMarker(document.getElementById('left_image'), {
        color: document.getElementById('left_image')._tagcolor,
        path: [x, y, 0.1, 0.1],
        text: dis + 'M',
        font: '12px bold 微软雅黑'
    })


}

function drawDoubleLine() {
    var ele = {
        left: document.getElementById('left_image'),
        right: document.getElementById('right_image')
    }
    // 绘制左侧线
    drawCanvasLine(ele.left, {
        color: ele.left._tagcolor,
        begin: pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 2],
        end: pano._MeasureNodeArray.left_node_array[pano._MeasureNodeArray.left_node_array.length - 1]
    });
    // 绘制右侧线
    drawCanvasLine(ele.right, {
        color: ele.right._tagcolor,
        begin: pano._MeasureNodeArray.right_node_array[pano._MeasureNodeArray.right_node_array.length - 2],
        end: pano._MeasureNodeArray.right_node_array[pano._MeasureNodeArray.right_node_array.length - 1]
    });

}

//  加载图片到画布
function loadImageToCanvas(canvas, src) {

    canvas.width = 512;
    canvas.height = 390;
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'Anonymous'; //解决跨域
    img.src = canvas.stationSrc;
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 512, 389, 0, 0, 512, 389);
        ctx.save();

    }
}

// 获得画布坐标
function getCanvasPos(event, canvas) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;
    return { x: x, y: y }
}

/**
*   画布绘制点
* @param {object} canvas 画布
* @param {object} options
* @param {string} options.color 填充色
* @param {string} options.font 字体及颜色大小
* @param {string} options.text 标签文字
* @param {string} options.path 矩形坐标[x,y,width,height]
* @author  luwenjun@leader.com.cn
*/
function drawCanvasMarker(canvas, options) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = options.color;
    ctx.fillRect(options.path[0] - 5, options.path[1] - 5, options.path[2], options.path[3]);
    ctx.font = options.font;
    ctx.fillText(options.text, options.path[0] - 20, options.path[1] - 10);

}
/**
*   画布绘制线
* @param {object} canvas 画布
* @param {object} options
* @param {string} options.color 填充色
* @param {string} options.font 字体及颜色大小
* @param {string} options.text 标签文字
* @param {string} options.path 矩形坐标[x,y,width,height]
* @author  luwenjun@leader.com.cn
*/
function drawCanvasLine(canvas, options) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.moveTo(options.begin.x, options.begin.y);
    ctx.lineTo(options.end.x, options.end.y);
    ctx.stroke();
}

function clearCanvas() {
    var pageurl = pano.getDMIImageList();
    var ele = {
        left: document.getElementById('left_image'),
        right: document.getElementById('right_image')
    }
    // 更新资源地址
    loadImageToCanvas(ele.left)
    loadImageToCanvas(ele.right)
}

/*
function getRoute() {

pano.message('准备全景导航', 2000);

pano.getRoute({
end: { lng: 116.39764839522, lat: 39.906399609327 }, // 80.2748544381,"Y":41.1503636639,
begin: { lng: 116.38326880046, lat: 39.906043090448} //80.2764292828,"Y":41.1507822404
}, function(data) {
var paths = '', lnglat = [], index = 0;
if (data.status == 0) {

for (var i in data.result.routes[0].steps) {
paths += ';' + data.result.routes[0].steps[i].path;
}
paths = paths.substring(1, paths.length);

}
for (var i in paths.split(';')) {
// var coord = GPS.gcj02towgs84(paths.split(';')[i].split(',')[0], paths.split(';')[i].split(',')[1]);
//lnglat.push([coord.lng, coord.lat]);
lnglat.push([paths.split(';')[i].split(',')[0], paths.split(';')[i].split(',')[1]]);
}

pano.message('< 导航开始 >', 2000);
var pano_outitme = setInterval(function() {
if (lnglat[index]) {
pano.loadPanoByCity({ lng: lnglat[index][0], lat: lnglat[index][1] },0.001); //lnglat[index][0], lat: lnglat[index][1]

index++;
} else {
clearTimeout(pano_outitme);
}
}, 2000)

});


}*/


//pano._VIEWER.showOverlay({text:'<h1>哈哈哈哈</h1>',subtext:'<h1>哈哈哈哈</h1>'})
//pano._VIEWER.showTooltip({content:'<h1>哈哈哈哈</h1>',top:955,left:205,position:'center bottom'})

/*var eles = document.getElementById('pano_tool');
eles.addEventListener('click', function(e) {
switch (e.target.id) {
case "toggleAutoRotate":
pano.toggleAutoRotate(rotate_)
if (rotate_) {
rotate_ = false;
} else {
rotate_ = true;
}
break;
case "getViewPosition":
var wh = pano.getViewPosition()
pano.message('lng:' + wh.lng + ",lat:" + wh.lat, 3000)
break;
case "rotate":
pano.setAngle({ lng: Math.random() * 100, lat: Math.random() * 40 })
break;
case "setAnimateAngle":
pano.setAnimateAngle({ lng: Math.random() * 100, lat: Math.random() * 10 }, 3000)
break;
case "getSize":
var wh = pano.getViewSize()
pano.message('height:' + wh.height + ",width:" + wh.width, 3000)
break;
case "toggleFullScreen":
pano.toggleFullScreen();
break;
case "getZoom":
pano.message('level:' + pano.getZoom(), 3000)
break;
case "setZoom":
pano.setZoom(Math.random() * 100);
break;
case "toggleArrow":
pano.toggleArrow();
break;
case "setStationStepP":
           
break;
case "setStationStepN":
          
break;
case "getStation":
pano.message(JSON.stringify(pano.getStation()), 5000)
break;
case "setStationByCoord":
pano.setStationByCoord({
tel: 0.001,
position: {
//lng: 110.7780776000,
// lat: 32.6138837000

lng: 114.3806000290, lat: 22.7038430580
}
})
break;
case "getLocation":
pano.message(JSON.stringify(pano.getLocation()), 5000)
break;
case "Measure":
Measure()
break;
case "addMarker":
pano.once('click', function(e) {
var opt = {
content: e.lng + pano.getStation().Address,
position: { lng: e.lng, lat: e.lat },
tag: e.lng + pano.getStation().Address,
stationid: pano.getStation().StationID,
type: '0',
symbolguid: '',
className: 'pano-tag'
}

pano.addMarker(opt, function(data) {
if (data.Status == 1) {
pano.message('标记 [ ' + opt.content + ' ] 添加成功！', 5000);
} else {
pano.message('标记 [ ' + opt.content + ' ] 添加失败！', 5000);
}
})
});

break;
case "clearMarker":
pano.clearMarkers();
break;
case "deleteMarker":
pano.once('select-marker', function(e) {
var m = pano.getCurrentMarker();
pano.deleteMarker(m, function(data) {
if (data.Status == 1) pano.message('成功删除！', 5000);
});
})

break;
case "selectMarker":
pano.toggleMarkersList();
break;
case "loadMarkers":
pano.loadMarkers();
break;
case "gotoMarker":

pano.once('select-marker', function(e) {
pano.setAnimateAngle({ lng: e.lng, lat: e.lat }, 3000)
})
break;
case "goRoute":
pano.message('准备全景导航', 2000);

pano.getRoute({
end: { lng: 80.2748544381, lat: 41.1503636639 }, // 80.2748544381,"Y":41.1503636639,
begin: { lng: 80.2764292828, lat: 41.1507822404} //80.2764292828,"Y":41.1507822404
}, function(data) {
var paths = '', lnglat = [], index = 0;
if (data.status == 0) {

for (var i in data.result.routes[0].steps) {
paths += ';' + data.result.routes[0].steps[i].path;
}
paths = paths.substring(1, paths.length);

}
for (var i in paths.split(';')) {
var coord = GPS.gcj02towgs84(paths.split(';')[i].split(',')[0], paths.split(';')[i].split(',')[1]);
lnglat.push([coord.lng, coord.lat]);
}

pano.message('< 导航开始 >', 2000);
var pano_outitme = setInterval(function() {
if (lnglat[index]) {
pano.setStationByCoord({
tel: 0.00005,
position: {
lng: lnglat[index][0], lat: lnglat[index][1]
}
})
index++;

} else {
clearTimeout(pano_outitme);
}
}, 3000)

});
break;
}
})







var panel = [];

panel.push("<table class='model-leador'  id='doubleeye'>");
panel.push("<tr style='text-align:center'><th colspan='2'><h3>可量测实景影像(DMI)</h3></th>");

panel.push("<tr style='text-align:center'><th>站点</th><th>测量</th></tr>");
panel.push("<tr class='pano-button'>");
panel.push("<td><div style='margin-left:15px'><button onclick='StationStep(this)' id='go' >站点前进</button><button id='back'  onclick='StationStep(this)'>站点后退</button></div><div style='padding:20px;'>{station}<div></td>");
panel.push("<td><div style='margin-left:15px'><button onclick='Marker()'>添加节点</button><button onclick='Clear()'>删除节点</button></div></td></tr>");

panel.push("<tr style='text-align:center;'>");
panel.push("<td colspan='2'>");
panel.push("<img src='{face1}' id='face1' onclick='faceClick(this)' class='pano-image'>");
panel.push("<img src='{face2}' id='face2' onclick='faceClick(this)' class='pano-image'>");
panel.push("<img src='{face3}' id='face3' onclick='faceClick(this)' class='pano-image'>");
panel.push("<img src='{face4}' id='face4' onclick='faceClick(this)' class='pano-image'>");
panel.push("<img src='{face5}' id='face5' onclick='faceClick(this)' class='pano-image'>");
panel.push("<img src='{face6}' id='face6' onclick='faceClick(this)' class='pano-image'>");
panel.push("</tr>");

panel.push("<tr style='text-align:center'><td>左</td><td>右</td></tr>");

panel.push("<tr>");
panel.push("<td><canvas id='left_image'>Loading . . . </canvas></td>");
panel.push("<td><canvas id='right_image'>Loading . . .</canvas></td>");
panel.push("</tr>");
panel.push("</table>");



//点击切换
function faceClick(image) {
var ele = {
left_image: document.getElementById('left_image'),
right_image: document.getElementById('right_image')
}

var list = pano.getDMIImageList();

var stationID = pano.getDMIStation().StationID.substring(0, 6) + '-{index}-' + pano.getDMIStation().StationID.substring(9, 27);

switch (image.id) {
case 'face1':
face(list[0], list[1], stationID.replace('{index}', 1), stationID.replace('{index}', 2))
break;
case 'face2':
face(list[0], list[1], stationID.replace('{index}', 1), stationID.replace('{index}', 2))
break;
case 'face3':
face(list[1], list[2], stationID.replace('{index}', 2), stationID.replace('{index}', 3))
break;
case 'face4':
face(list[2], list[3], stationID.replace('{index}', 3), stationID.replace('{index}', 4))
break;
case 'face5':
face(list[3], list[4], stationID.replace('{index}', 4), stationID.replace('{index}', 5))
break;
case 'face6':
face(list[4], list[5], stationID.replace('{index}', 5), stationID.replace('{index}', 6))
break;
}
function face(face_left, face_right, leftid, rightid) {
// 绑定src到Canvas
ele.left_image.stationSrc = face_left;
ele.right_image.stationSrc = face_right;

// 绑定stationid到canvas
ele.left_image.stationID = leftid;
ele.right_image.stationID = rightid;

loadImageToCanvas(ele.left_image)
loadImageToCanvas(ele.right_image)
}
ele = null, list = null;
}

//站点的前进与后退
function StationStep(_this) {
_this.innerText = 'loading';
var station = pano.getDMIStation();

if (_this.id == 'go') {
pano.getDMIStationByID(station.Next, 'xianggang', function() {

printStationToHtml(station.Next);
_this.innerText = '前进';
})
} else if (_this.id == 'back') {
pano.getDMIStationByID(station.Previous, 'xianggang', function() {

printStationToHtml(station.Previous);
_this.innerText = '后退';
})
}


}






















*/