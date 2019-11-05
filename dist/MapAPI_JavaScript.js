/**
 * v.1.0
 * @author luwenjun 2016年10月31日10:52:45
 */

document.write("<script src='/lib/openlayers.js'></script>");
document.write("<link rel='stylesheet' href='/lib/openlayers.css' type='text/css'>");
document.write("<script src='/lib/polyfill.min.js'></script>")

//------------------------------↓枚举 开始↓-----------------------------//
/**
 * 地图事件枚举类型
 *  @author luwenjun 20160813
 */
var TYEnumMapType = {
    TY_OL_OSM: 15,// OL3地图
    TY_OL_Land: 16,// OL3地形图
    TY_GD_VEC: 2,// 高德地图
    TY_GD_IMG: 3,// 高德卫星地图
    TY_ISHOW_VEC: 4,
    //  TY_QQ_IMG: 5,//腾讯卫星地图
    // TY_QQ_Land: 6,// 腾讯地形图
    TY_360_VEC: 6,//360地图
    //   TY_360_IMG: 8,//360卫星地图
    TY_Google_VEC: 9,//谷歌地图
    TY_Google_IMG: 10,// 谷歌卫星地图
    TY_Google_Land: 11,//谷歌地形图
    TY_TDT_VEC: 12,//天地图
    TY_TDT_IMG: 13,//天地图卫星图层
}

/**
 *  空间计算类型枚举枚举类型
 *  @author  luwenjun  20160918
 */
var TYEnumTraffic = {
    TY_TRAFFIC_360: 1,//360实时路况
    TY_TRAFFIC_ISHOW: 2,//腾讯实时路况
    TY_TRAFFIC_AMAP: 3//高德实时路况
}

/**
 *  空间计算类型枚举枚举类型
 *  @author  luwenjun  20160818
 */
var TYEnumSpAsis = {
    P_PGON: 1,//点是否在多边形内
    LINE_SIS: 2,//测量线
    PLOYGON_SIS: 3//面积
}

/**
 *坐标系枚举
 */
var TYEnumLngLatType = {
    TY_GPS: 1,//gps地球坐标系  天地图，google地图
    TY_GCJ: 2,//gps火星坐标系，360，qq，高德
    TY_BD: 3//百度地图
}

/**
 * 地图事件实例化参数
 * @author 陆文军 20160926
 * @param data
 * event:触发的方法 TYEnumEvent类型
 * callback：回调函数名称 strng
 * @constructor
 */
function TYEventOptions(data) {
    if (data) {
        if (data.event)
            this.event = data.event;
        if (data.callback)
            this.callback = data.callback
    }
}

/**
 * 瓦片地图枚举
 * @param URL_SL 矢量地图
 * @param URL_WX 卫星地图
 * @param URL_DX 地形图
 * @param URL_LK 路况图
 * @author luwenjun 20160913
 * */
var TYEnumMapUrl = {
    TY_GAODE: {
        ID: 1,
        URL_SL: [
            //高德大字体地图
            //"http://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}&ltype=3",
            //"http://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
            "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
        ],
        URL_WX: [
            "http://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            "http://webst04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
        ]
    },//高德
    TY_TIANDITU: {
        ID: 2,
        URL_SL: [
            "http://t1.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&L={z}",
            "http://t1.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}"
        ],
        URL_WX: [
            "http://t1.tianditu.com/DataServer?T=img_w&x={x}&y={y}&L={z}",
            "http://t1.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}"
        ]
    },//天地图
    TY_GOOGLE: {
        ID: 3,
        URL_SL: ["http://mt3.google.cn/vt/lyrs=m@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil"],
        URL_WX: ["http://mt3.google.cn/vt/lyrs=y@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil"],
        URL_DX: ["http://mt3.google.cn/vt/lyrs=p@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil"]
    },//谷歌
    TY_ISHOW: {
        ID: 4,
        URL_SL: ["http://tile4.ishowchina.com/v3/tile/{z}/{x}/{y}.png"]
    },//我秀
    TY_OL3: {
        ID: 5,
        URL_SL: ["http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        URL_DX: ["https://tile-a.openstreetmap.fr/{z}/{x}/{y}.png"]
    },
    TY_360: {
        ID: 6,
        URL_SL: ["https://map2.ssl.qhimg.com/sotile/ver27/2/{z}/?x={x}&y={y}"]
    }
}

/**
 * 海量点图形大小枚举类型
 * @author luwenjun 20160815
 */
var TYEnumDrivingPolicy = {
    LEAST_TIME: 1,//最短时间
    LEAST_MONEY: 2,//最经济
    LEAST_DISTANCE: 3,//最短距离
    REAL_TRAFFIC: 4//考虑路况

}


/*ol.events.EventType = {
 CHANGE: 'change',
 CLICK: 'click',
 DBLCLICK: 'dblclick',
 DRAGENTER: 'dragenter',
 DRAGOVER: 'dragover',
 DROP: 'drop',
 ERROR: 'error',
 KEYDOWN: 'keydown',
 KEYPRESS: 'keypress',
 LOAD: 'load',
 MOUSEDOWN: 'mousedown',
 MOUSEMOVE: 'mousemove',
 MOUSEOUT: 'mouseout',
 MOUSEUP: 'mouseup',
 MOUSEWHEEL: 'mousewheel',
 MSPOINTERDOWN: 'mspointerdown',
 RESIZE: 'resize',
 TOUCHSTART: 'touchstart',
 TOUCHMOVE: 'touchmove',
 TOUCHEND: 'touchend',
 WHEEL: 'wheel'
 };*/
/**
 * 事件枚举
 * @author luwenjun 20160926
 * */
var TYEnumEvent = {
    TY_CLICK: "singleclick",//鼠标点击事件
    TY_DOUBLECLICK: "dblclick",//鼠标双击事件
    TY_MOUSEOVER: "pointermove",//鼠标悬浮事件
    TY_DRAGSTART: "pointerdrag",//地图开始拖拽事件
    TY_DRAGEND: "moveend",//地图结束拖拽事件
    TY_ZOOMCHANGE: "",//地图缩放变化事件
    TY_DRAGGING: "pointerdrag"//地图正在拖拽事件
}

/**
 * 手绘点线面枚举类型
 * @author luwenjun 20160826
 * */
var TYEnumOverLay = {
    TY_POINT: 1,//点
    TY_POLYLINE: 2,//折线
    TY_CIRCLE: 3,//圆
    TY_POLYGON: 4,//多边形
    TY_RECTANGLE: 5//矩形
}

/**
 * 海量点形状枚举类型
 * @author luwenjun 20160926
 */
var TYEnumMassShape = {
    TY_MASS_CUSTOM: 1,//	自定义图形，图片
    TY_MASS_CIRCLE: 2,//海量点的圆点
    TY_MASS_STAR: 3,//海量点的五角星
    TY_MASS_BULLE: 4,//海量点的气泡
    TY_MASS_RECT: 5//海量点的正方形

}

/**
 * 海量点图形大小枚举类型
 *  @author luwenjun 20160926
 */
var TYEnumMassSize = {
    TY_MASS_SUPERBIG: 4,//	超大尺寸 20*20
    TY_MASS_BIG: 3,//大尺寸 15*15
    TY_MASS_MIDDLE: 2,//	中等尺寸 10*10
    TY_MASS_SMALL: 1//	小尺寸5*5
}


/**
 * 逆地理编码返回值枚举类型
 * @author luwenjun 20160813
 */
var TYEnumGeocoder = {
    TY_EXACT_DESC: 1,//精确位置
    TY_NEAR_DESC: 2,//附近描述,省市县+街区（村庄）+建筑物附近
    TY_Road_DESC: 3//道路附近描述 省市县+道路+街道附近
}
//------------------------------↑枚举 结束↑-----------------------------//

//------------------------------↓基础类 开始↓-----------------------------//
/**
 * 图标类的实例化对象 TYIcon
 * @param data 参数对象
 * url：图标的取图地址，
 * size：图标的可视区域
 * offset：偏移量，定位图片按指定位置显示图标
 * @author luwenjun 20160926
 * @returns  图标对象
 */
function TYIcon(data) {
    if (data && typeof (data) == "string")
        return data;

    this.url = "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png";
    this.offset = new TYPixel(0, 0);

    if (data) {
        if (data.url)
            this.url = data.url;
        if (data.offset)
            this.offset = data.offset;
        if (data.size) {
            var obj = new Object({
                image: this.url,
                size: data.size,
                imageOffset: this.offset
            });
            return obj;
        }
        //else{
        //    var size = [19,30];
        //    var image = "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png";
        //    var obj = new Object({
        //        image: image,
        //        size: size,
        //        imageOffset: this.offset
        //    });
        //    return obj;
        //}
    } else {
        var obj = new Object({
            image: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            size: [19, 30]
        })
        return obj;
    }
}

/**
 * 标签TYLabel类
 * @param data 参数对象 content：标签内容，offset 偏移量:TYPixel类型
 * @author luwenjun 20160813
 * @returns  TYLabel 标签类
 */
function TYLabel(data) {
    this.content;
    this.offset;
    if (data) {
        if (data.content)
            this.content = data.content;
        if (data.offset)
            this.offset = data.offset;
    }

}

/**
 * 像素坐标类
 * @param x 屏幕横坐标 单位px
 * @param y 屏幕纵坐标 单位px
 * @author luwenjun 20160813
 * @returns  TYPixel 像素类
 */
function TYPixel(x, y) {
    return [x, y];
}

/**
 * 尺寸Size类
 * @param width 宽度 单位px
 * @param height 高度 单位px
 * @author luwenjun 20160813
 * @returns  TYSize 尺寸类
 */
function TYSize(width, height) {
    return [width, height];
}
//------------------------------↑基础类 结束↑-----------------------------//

//------------------------------↓图形实体 开始↓-----------------------------//
/**
 * 绘制点基础类
 * @param pointId 覆盖物id
 * @param label 覆盖物提示文字
 * @param lnglat 坐标对象
 * @param icon 图标对象
 * @author luwenjun 2016-8-13
 * @returns  绘制点基础类
 */
function TYMarker(marker) {
    this.pointId = null;
    this.label = null;
    this.lnglat = null;
    this.icon = null;
    if (marker) {
        if (marker.pointId) this.pointId = marker.pointId;
        if (marker.label) this.label = marker.label;
        if (marker.lnglat) this.lnglat = marker.lnglat;
        if (marker.icon) this.icon = marker.icon;
    }
}

/**
 * 绘制线基础类
 * @param lnglat 坐标组
 * @param lineId id
 * @param lineColor 颜色
 * @param lineWidth 宽度
 * @param lineType 类型
 * @param lineOpacity 透明度
 * @param label 提示文字
 * @param isEdit 可否编辑
 * @author luwenjun 2016-8-13
 * @returns  绘制点基础类
 */
function TYLine(line) {
    this.lnglat = null;
    this.lineId = null;
    this.lineColor = "blue";
    this.lineWidth = 1;
    this.lineType = "solid";
    this.lineOpacity = .6;
    this.isEdit = false;

    if (line) {
        if (line.lnglat) this.lnglat = line.lnglat;
        if (line.pointId) this.pointId = line.pointId;
        if (line.lineColor) this.lineColor = line.lineColor;
        if (line.lineWidth) this.lineWidth = line.lineWidth;
        if (line.lineType) this.lineType = line.lineType;
        if (line.lineOpacity) this.lineOpacity = line.lineOpacity;
        if (line.isEdit != undefined) this.isEdit = line.isEdit;
    }
}

/**
 * 绘制矩形基础类
 * @param rectangleId id
 * @param t_r_LngLat 右上角坐标
 * @param b_l_LngLat 左下角坐标
 * @param lineColor 线条颜色
 * @param lineWidth 线条宽度
 * @param lineType= 线条类型
 * @param lineOpacity 线条透明度
 * @param fillColor= 填充颜色
 * @param fillOpacity 填充透明度
 * @param label 提示文本
 * @param isEdit 是否可以编辑
 * @author luwenjun 2016-8-13
 * @returns  绘制矩形基础类
 */
function TYRectangle(rectangle) {
    this.rectangleId = null;
    this.t_r_LngLat = null;
    this.b_l_LngLat = null;
    this.lineColor = "blue";
    this.lineWidth = 1;
    this.lineType = "solid";
    this.lineOpacity = .6;
    this.fillColor = "white";
    this.fillOpacity = .6;
    this.isEdit = false;
    if (rectangle) {
        if (rectangle.rectangleId) this.rectangleId = rectangle.rectangleId;
        if (rectangle.t_r_LngLat) this.t_r_LngLat = rectangle.t_r_LngLat;
        if (rectangle.b_l_LngLat) this.b_l_LngLat = rectangle.b_l_LngLat;
        if (rectangle.lineColor) this.lineColor = rectangle.lineColor;
        if (rectangle.lineWidth) this.lineWidth = rectangle.lineWidth;
        if (rectangle.lineType) this.lineType = rectangle.lineType;
        if (rectangle.lineOpacity) this.lineOpacity = rectangle.lineOpacity;
        if (rectangle.fillColor) this.fillColor = rectangle.fillColor;
        if (rectangle.fillOpacity) this.fillOpacity = rectangle.fillOpacity;
        if (rectangle.isEdit) this.isEdit = rectangle.isEdit;
    }

}

/**
 * 绘制多边形基础类
 * @param t_r_LngLat 右上角坐标
 * @param b_l_LngLat 左下角坐标
 * @param lineColor 线条颜色
 * @param lineWidth 线条宽度
 * @param lineType= 线条类型
 * @param lineOpacity 线条透明度
 * @param fillColor= 填充颜色
 * @param fillOpacity 填充透明度
 * @param label 提示文本
 * @param isEdit 是否可以编辑
 * @author luwenjun 2016-8-13
 * @returns  绘制多边形基础类
 */
function TYPolygon(polygon) {
    this.lnglat = null;
    this.polygonId = null;
    this.lineColor = "blue";
    this.lineWidth = 1;
    this.lineType = "solid";
    this.lineOpacity = .6;
    this.fillColor = "white";
    this.fillOpacity = .6;
    this.isEdit = false;

    if (polygon) {
        if (polygon.lnglat) this.lnglat = polygon.lnglat;
        if (polygon.polygonId) this.polygonId = polygon.polygonId;
        if (polygon.lineColor) this.lineColor = polygon.lineColor;
        if (polygon.lineWidth) this.lineWidth = polygon.lineWidth;
        if (polygon.lineType) this.lineType = polygon.lineType;
        if (polygon.lineOpacity) this.lineOpacity = polygon.lineOpacity;
        if (polygon.fillColor) this.fillColor = polygon.fillColor;
        if (polygon.fillOpacity) this.fillOpacity = polygon.fillOpacity;
        if (polygon.isEdit != undefined) this.isEdit = polygon.isEdit;
    }
}

/**
 * 绘制圆基础类
 * @param lnglat 圆的中心坐标
 * @param circleId id
 * @param lineColor 线条颜色
 * @param lineWidth 线条宽度
 * @param lineType= 线条类型
 * @param lineOpacity 线条透明度
 * @param fillColor= 填充颜色
 * @param fillOpacity 填充透明度
 * @param label 提示文本
 * @param isEdit 是否可以编辑
 * @author luwenjun 2016-8-13
 * @returns  绘制圆基础类
 */
function TYCircle(circle) {
    this.lnglat = null;
    this.circleId = null;
    this.radius = null;
    this.lineColor = "blue";
    this.lineWidth = 1;
    this.lineType = "solid";
    this.lineOpacity = .6;
    this.fillColor = "white";
    this.fillOpacity = .6;
    this.isEdit = false;

    if (circle) {
        if (circle.lnglat) this.lnglat = circle.lnglat;
        if (circle.circleId) this.circleId = circle.circleId;
        if (circle.radius) this.radius = circle.radius;
        if (circle.lineColor) this.lineColor = circle.lineColor;
        if (circle.lineWidth) this.lineWidth = circle.lineWidth;
        if (circle.lineType) this.lineType = circle.lineType;
        if (circle.lineOpacity) this.lineOpacity = circle.lineOpacity;
        if (circle.fillColor) this.fillColor = circle.fillColor;
        if (circle.fillOpacity) this.fillOpacity = circle.fillOpacity;
        if (circle.isEdit != undefined) this.isEdit = circle.isEdit;
    }
}
//------------------------------↑图形实体 结束↑-----------------------------//

//------------------------------↓初始化参数 开始↓-----------------------------//
/**
 * 设置地图固定视野参数初始化
 * @param t_r_lnglat 右上角坐标
 * @param b_l_lnglat 左下角坐标
 * @author luwenjun 2016-8-13
 * @returns
 */
function TYBoundsOption(boundsOption) {
    this.t_r_lnglat = null;
    this.b_l_lnglat = null;

    if (boundsOption) {
        if (boundsOption.t_r_lnglat) this.t_r_lnglat = boundsOption.t_r_lnglat;
        if (boundsOption.b_l_lnglat) this.b_l_lnglat = boundsOption.b_l_lnglat;
    }
}

/**
 * 轨迹回放
 * @param data 包括两个对象 locusData locusState
 * @locusData 轨迹信息 宝库下列属性
 * @@locusId    String        当前轨迹id
 * @@label    JSON        实例化一个TYLabel对象
 * @@icon    JSON        TYIcon对象化一个移动图标
 * @@lnglat    JSON        多个坐标数组
 * @@nodeIcon    JSON        TYIcon实例化一个轨迹点图标
 * @@lineWidth    Number        线宽(默认3px)
 * @@lineOpacity    Number        线透明度0-1(默认0.6)
 * @@lineColor    String        线颜色(默认blue)
 * @locusState 包括下列属性
 * @@moveSpeed    Number        移动速度(默认5000米/小时)
 * @@isSetView    Boolean        自适应(默认为true)
 * @@syncEvent    String        同步事件
 * @@overlayEvent    JSON        实例化TYOverlayEvent对象，轨迹点上触发(默认无事件)
 * @author luwenjun 20160813
 * @constructor
 */
function TYLocusOption(data) {
    this.locusData = {
        locusId: null,
        label: null,
        icon: "http://wd.tygps.com:82/tymap/carright.png",
        lnglat: [],
        lineType: "solid",
        lineWidth: 3,
        nodeIcon: null,
        lineOpacity: 0.6,
        lineColor: "#0000ff"
    }

    this.locusState = {
        moveSpeed: 100,
        isSetView: true,
        syncEvent: null,
        circlable: false,
        overlayEvent: null
    }
    if (data) {
        if (data.locusData) {
            if (data.locusData.locusId) this.locusData.locusId = data.locusData.locusId;
            if (data.locusData.icon) this.locusData.icon = data.locusData.icon;
            if (data.locusData.label) this.locusData.label = data.locusData.label;
            if (data.locusData.lnglat) this.locusData.lnglat = data.locusData.lnglat;
            if (data.locusData.lineType) this.locusData.lineType = data.locusData.lineType;
            if (data.locusData.nodeIcon) this.locusData.nodeIcon = data.locusData.nodeIcon;
            if (data.locusData.lineWidth) this.locusData.lineWidth = data.locusData.lineWidth;
            if (data.locusData.lineColor) this.locusData.lineColor = data.locusData.locusData.lineColor;
            if (data.locusState) {
                if (data.locusState.moveSpeed) this.locusState.moveSpeed = data.locusState.moveSpeed;
                if (data.locusState.isSetView != undefined) this.locusState.isSetView = data.locusState.isSetView;
                if (data.locusState.syncEvent) this.locusState.syncEvent = data.locusState.syncEvent;
                if (data.locusState.circlable != undefined) this.locusState.circlable = data.locusState.circlable;
                if (data.locusState.overlayEvent) this.locusState.overlayEvent = data.locusState.overlayEvent;
            }
        }
    }
}

/**
 *驾车导航功能
 * * @param data 参数对象，包括下列属性
 * @policy:    枚举    默认最短时间
 * @passWayPoints    Array.lnglat    经过点数组，默认无途经点，最大支持16个坐标点
 * @origin    Lnglat    出发地
 * @destination    Lnglat    目标地
 * @panelId    String    盛放导航数据的html的容器，默认无
 * @callback    Function    回调函数，返回数据会在回调函数内异步返回,如果无回调函数则同步返回数据,默认无
 *  * @author xinhongchun 20160815
 * @constructor
 */
function TYDrivingOptions(data) {
    this.policy = TYEnumDrivingPolicy.LEAST_TIME;
    this.passWayPoints = [];
    this.origin = null;
    this.destination = null;
    this.panelId = null;
    this.callback = null;
    if (data) {
        if (data.policy)
            this.policy = data.policy;
        if (data.passWayPoints)
            this.passWayPoints = data.passWayPoints;
        if (data.origin)
            this.origin = data.origin;
        if (data.policy)
            this.policy = data.policy;
        if (data.destination)
            this.destination = data.destination;
        if (data.panelId)
            this.panelId = data.panelId;
        if (data.callback)
            this.callback = data.callback;
    }
}

/**
 * 地图初始化参数初始化
 * @param contentId 地图容器id
 * @param lnglat 地图中心坐标
 * @param mapLevel 地图显示等级
 * @param isShowOverView 是否开启鹰眼
 * @param isShowControl 是否显示视野工具栏
 * @param isShowSale 是否显示比例尺
 * @author luwenjun 2016-8-13
 * @returns  地图初始化参数对象
 */
function TYMapOptions(MapOptions) {
    this.contentId = null,
        this.lnglat = null,
        this.mapLevel = 12
    if (MapOptions) {
        if (MapOptions.contentId) this.contentId = MapOptions.contentId;
        if (MapOptions.lnglat) this.lnglat = MapOptions.lnglat;
        if (MapOptions.mapLevel) this.mapLevel = MapOptions.mapLevel;
    }
}

/**
 * 地图配置参数初始化
 * @param isShowOverView 是否显示鹰眼
 * @param isShowControl = 是否显示缩放工具
 * @param isShowSale = 是否西那是比例尺
 * @param isAnimate = 是否开启地图动画
 * @param isRotate = 地图是否可旋转,
 * @param isDrag = 是否可鼠标拖动平移
 * @param isZoom= 是否开启缩放
 * @param isDoubleClickZoom =否是开启鼠标左键双击缩放,
 * @param isKeyboard = 是否开启键盘操作
 * @param isJog = 是否开启地图缓动效果
 * @param isScrollWheel = 滚轮缩放
 * @author luwenjun 2016-8-13
 * @returns  地图配置参数对象
 */
function TYConfigOption(ConfigOption) {
    this.isShowOverView = true;
    this.isShowControl = true;
    this.isShowSale = true;
    this.isAnimate = true;
    this.isRotate = true;
    this.isDrag = true;
    this.isZoom = true;
    this.isDoubleClickZoom = true;
    this.isKeyboard = true;
    this.isJog = true;
    this.isScrollWheel = true;

    if (ConfigOption) {
        if (ConfigOption.isShowOverView != undefined) this.isShowOverView = ConfigOption.isShowOverView;
        if (ConfigOption.isShowControl != undefined) this.isShowControl = ConfigOption.isShowControl;
        if (ConfigOption.isShowSale != undefined) this.isShowSale = ConfigOption.isShowSale;
        if (ConfigOption.isAnimate != undefined) this.isAnimate = ConfigOption.isAnimate;
        if (ConfigOption.isRotate != undefined) this.isRotate = ConfigOption.isRotate;
        if (ConfigOption.isDrag != undefined) this.isDrag = ConfigOption.isDrag;
        if (ConfigOption.isZoom != undefined) this.isZoom = ConfigOption.isZoom;
        if (ConfigOption.isDoubleClickZoom != undefined) this.isDoubleClickZoom = ConfigOption.isDoubleClickZoom;
        if (ConfigOption.isKeyboard != undefined) this.isKeyboard = ConfigOption.isKeyboard;
        if (ConfigOption.isJog != undefined) this.isJog = ConfigOption.isJog;
        if (ConfigOption.isScrollWheel != undefined) this.isScrollWheel = ConfigOption.isScrollWheel;
    }
}

/**
 * 图层切换实例化
 * @param type  枚举类型
 * @author luwenjun 20160813
 */
function TYTilesOptions(type) {
    this.TYMapType = _ty_layers_id;
    if (type)this.TYMapType = type;
}

/**
 * 覆盖物绘制点参数初始化
 * @param pointId 绘制点id
 * @param isSetView 会之后自适应
 * @param isClearOverlay 是否清除上次覆盖物
 * @param isGather 是否聚合
 * @param overlayEvent 覆盖物事件
 * @author luwenjun 2016-8-13
 * @returns
 */
function TYPointOption(pointOption) {
    this.pointData = [];
    this.pointState = {
        isSetView: true,
        isClearOverlay: true,
        isGather: false,
        overlayEvent: null
    }
    if (pointOption) {
        if (pointOption.pointData) this.pointData = pointOption.pointData;
        if (pointOption.pointState) {
            if (pointOption.pointState.isSetView != undefined) this.pointState.isSetView = pointOption.pointState.isSetView;
            if (pointOption.pointState.isClearOverlay != undefined) this.pointState.isClearOverlay = pointOption.pointState.isClearOverlay;
            if (pointOption.pointState.isGather != undefined) this.pointState.isGather = pointOption.pointState.isGather;
            if (pointOption.pointState.overlayEvent) this.pointState.overlayEvent = pointOption.pointState.overlayEvent;
        }
    }
}

/**
 * 覆盖物绘制线参数初始化
 * @param isSetView 绘制后自适应
 * @param isClearOverlay 是否清除上次覆盖物
 * @param overlayEvent 覆盖物事件
 * @author luwenjun 2016-8-13
 * @returns
 */
function TYLineOption(lineOption) {
    this.lineData = []
    this.lineState = {
        isSetView: true,
        isClearOverlay: true,
        overlayEvent: null
    }
    if (lineOption) {
        if (lineOption.lineData) this.lineData = lineOption.lineData;
        if (lineOption.lineState) {
            if (lineOption.lineState.isSetView != undefined) this.lineState.isSetView = lineOption.lineState.isSetView;
            if (lineOption.lineState.isClearOverlay != undefined) this.lineState.isClearOverlay = lineOption.lineState.isClearOverlay;
            if (lineOption.lineState.overlayEvent) this.lineState.overlayEvent = lineOption.lineState.overlayEvent;
        }
    }
}

/**
 * 覆盖物绘制矩形参数初始化
 * @param isSetView 会之后自适应
 * @param isClearOverlay 是否清除上次覆盖物
 * @param overlayEvent 覆盖物事件
 * @author luwenjun 2016-8-13
 * @returns
 */
function TYRectangleOption(rectangleOption) {
    this.rectangleData = []
    this.rectangleState = {
        isSetView: true,
        isClearOverlay: true,
        overlayEvent: null
    }
    if (rectangleOption) {
        if (rectangleOption.rectangleData) this.rectangleData = rectangleOption.rectangleData;
        if (rectangleOption.rectangleState) {
            if (rectangleOption.rectangleState.isSetView != undefined) this.rectangleState.isSetView = rectangleOption.rectangleState.isSetView;
            if (rectangleOption.rectangleState.isClearOverlay != undefined) this.rectangleState.isClearOverlay = rectangleOption.rectangleState.isClearOverlay;
            if (rectangleOption.rectangleState.overlayEvent) this.rectangleState.overlayEvent = rectangleOption.rectangleState.overlayEvent;
        }
    }
}

/**
 * 覆盖物绘制多边形参数初始化
 * @param isSetView 会之后自适应
 * @param isClearOverlay 是否清除上次覆盖物
 * @param overlayEvent 覆盖物事件
 * @author luwenjun 2016-8-13
 * @returns
 */
function TYPolygonOption(polygonOption) {
    this.polygonData = []
    this.polygonState = {
        isSetView: true,
        isClearOverlay: true,
        overlayEvent: null
    }
    if (polygonOption) {
        if (polygonOption.polygonData) this.polygonData = rectangleOption.polygonData;
        if (polygonOption.polygonState) {
            if (polygonOption.polygonState.isSetView != undefined) this.polygonState.isSetView = polygonOption.polygonState.isSetView;
            if (polygonOption.polygonState.isClearOverlay != undefined) this.polygonState.isClearOverlay = polygonOption.polygonState.isClearOverlay;
            if (polygonOption.polygonState.overlayEvent) this.polygonState.overlayEvent = polygonOption.polygonState.overlayEvent;
        }
    }
}

/**
 * 覆盖物绘制圆参数初始化
 * @param isSetView 会之后自适应
 * @param isClearOverlay 是否清除上次覆盖物
 * @param overlayEvent 覆盖物事件
 * @author luwenjun 2016-8-13
 * @returns
 */
function TYCircleOption(circleOption) {
    this.circleData = []
    this.circleState = {
        isSetView: true,
        isClearOverlay: true,
        overlayEvent: null
    }
    if (circleOption) {
        if (circleOption.circleData) this.circleData = circleOption.circleData;
        if (circleOption.circleState) {
            if (circleOption.circleState.isSetView != undefined) this.circleState.isSetView = circleOption.circleState.isSetView;
            if (circleOption.circleState.isClearOverlay != undefined) this.circleState.isClearOverlay = circleOption.circleState.isClearOverlay;

            if (circleOption.circleState.overlayEvent) this.circleState.overlayEvent = circleOption.circleState.overlayEvent;
        }
    }
}

/**
 * 手绘点线面参数初始化
 * @param overlayType 覆盖物类型 枚举
 * @param isShowMath 是否显示计算结果
 * @param callfunc 返回值
 * @author luwenjun 2016-8-13
 * @returns
 */
function TYOverlayOption(overlayOption) {
    this.overlayType = null;
    this.isShowMath = false;
    this.callfunc = null;
    this.isClearOverlay = false;
    if (overlayOption) {
        if (overlayOption.overlayType) this.overlayType = overlayOption.overlayType;
        if (overlayOption.isShowMath != undefined) this.isShowMath = overlayOption.isShowMath;
        if (overlayOption.callfunc) this.callfunc = overlayOption.callfunc;
        if (overlayOption.isClearOverlay != undefined) this.isClearOverlay = overlayOption.isClearOverlay;
    }
}

/**
 * 弹窗口参数初始化
 * @param width 弹出框宽度
 * @param height 弹出框高度
 * @param offset 弹出框偏移
 * @param content 内容
 * @param position 弹出框定位坐标
 * @param showShadow 是否显示阴影
 * @param isCustom 是否自定义显示
 * @param enableCloseOnClick 是否移除焦点关闭地图
 * @author luwenjun 2016-8-15
 * @returns
 */
function TYInfoWindowOptions(infoWindowOptions) {
    this.width = 300;
    this.height = 200;
    this.offset = new TYPixel(0, 0);
    this.content = null;
    this.position = null;
    this.showShadow = false;
    this.isCustom = false;
    this.enableCloseOnClick = false;
    if (infoWindowOptions) {
        if (infoWindowOptions.width) this.width = infoWindowOptions.width;
        if (infoWindowOptions.height) this.height = infoWindowOptions.height;
        if (infoWindowOptions.offset) this.offset = infoWindowOptions.offset;
        if (infoWindowOptions.content) this.content = infoWindowOptions.content;
        if (infoWindowOptions.position) this.position = infoWindowOptions.position;
        if (infoWindowOptions.showShadow != undefined) this.showShadow = infoWindowOptions.showShadow;
        if (infoWindowOptions.isCustom != undefined) this.isCustom = infoWindowOptions.isCustom;
        if (infoWindowOptions.enableCloseOnClick != undefined) this.enableCloseOnClick = infoWindowOptions.enableCloseOnClick;
    }
}

/**
 * 行政区域 信息获取
 * @param data 参数对象，含有下列属性
 * @@code    String    地区编码或者具体的地址描述例如：石家庄市长安区，130000
 * @@lineColor    Funtion    线的颜色默认：“#00ff00”
 * @@lineOpacity    decimal    线的透明度[0-1]小数,默认1
 * @@ fillColor    string    填充颜色 默认：“#ffffff”
 * @@fillOpacity    decimal    填充透明度[0-1]小数 默认1
 * @@isDrawArea    Boolean    是否渲染此区域 默认 true
 * @@callback    Function    回调函数需要调用的方法,必选
 * @author luwenjun 20160815
 * @constructor
 */
function TYDistrictSearchOptions(data) {
    this.code = null;
    this.lineColor = "#00ff00";
    this.lineWidth = 1;
    this.lineOpacity = 1;
    this.fillColor = "#ffffff";
    this.fillOpacity = 1;
    this.isDrawArea = true;
    this.isClearOverlay = true;
    this.callback = null;
    if (data) {
        if (data.code) this.code = data.code;
        if (data.lineColor) this.lineColor = data.lineColor;
        if (data.lineWidth) this.lineWidth = data.lineWidth;
        if (data.isClearOverlay != undefined) this.isClearOverlay = data.isClearOverlay;
        if (data.lineOpacity) this.lineOpacity = data.lineOpacity;
        if (data.fillColor) this.fillColor = data.fillColor;
        if (data.fillOpacity) this.fillOpacity = data.fillOpacity;
        if (data.isDrawArea != undefined) this.isDrawArea = data.isDrawArea;
        if (data.callback) this.callback = data.callback;
    }
}

/**
 * 全景地图
 * @param data
 * @@containerId    string    展示全景地图的dom对象id
 *@@position    Lnglat    全景地图初始位置，经纬度点
 *@author 作者 luwenjun 20160926
 * @constructor
 */
function TYPanoramaOption(data) {
    this.containerId;
    this.position;
    if (data) {
        if (data.containerId) this.containerId = data.containerId;
        if (data.position) this.position = data.position
    }
}

/**
 *区域渲染 每个区域信息对象
 * data
 * @@renderId    String        需要渲染的行政区的编码
 * @@lnglat    JSON        实例化一个被渲染区域经纬度对象TYLngLat_Normal设置显示图标与label的位置
 * @@label    JSON        实例化一个TYLabel对象用来显示提示文字(默认为空)
 * @@icon    JSON        实例化一个TYIcon对象表示渲染区域的图标
 * @@borderColor    String        边界线颜色(默认blue
 * @@borderWidth    Number        边界线宽度(默认2px)
 * @@fillColor    String        填充颜色(默认white)
 *@author 作者 luwenjun 20160815
 * @@fillOpacity    String        填充透明度(默认0.6)
 * */
function renderData(data) {
    this.renderId = null;
    this.lnglat = null;
    this.label = null;
    this.icon = null;
    this.borderColor = "0000ff";
    this.borderWidth = 2;
    this.fillColor = "ffffff";
    if (data) {
        if (data.renderId) this.renderId = data.renderId;
        if (data.icon) this.icon = data.icon;
        if (data.lnglat) this.lnglat = data.lnglat;
        if (data.borderWidth) this.borderWidth = data.borderWidth;
        if (data.label) this.label = data.label;
        if (data.borderColor) this.borderColor = data.borderColor.trim('#');
        if (data.fillColor) this.fillColor = data.fillColor.trim('#');

    }
}

/**
 * 行政区域渲染
 * @param data 参数json对象 分为renderDatas 以及renderState
 * @renderDatas 多个renderData数组
 * @renderState 设置对象 包括下列属性
 * @@isClearOverlay    Boolean    N    是否清空所有覆盖物(默认true)
 * @@isSetView    Boolean    N    自适应(默认true)
 * @@overlayEvent    JSON    N    实例化TYOverlayEvent对象，轨迹点上触发(默认无事件)
 *@author 作者 luwenjun 20160815
 * @constructor
 */
function TYAreaRenderOption(data) {
    this.renderDatas = [];
    if (data && data.renderDatas) {
        this.renderDatas = data.renderDatas;
    }
    this.renderState = {
        tileOpacity: 0.4,
        isClearOverlay: true,
        isSetView: true,
        overlayEvent: null
    }
    if (data) {
        if (data.renderState) {
            if (this.renderState.tileOpacity) this.renderState.tileOpacity = data.renderState.tileOpacity;
            if (this.renderState.isClearOverlay != undefined) this.renderState.isClearOverlay = data.renderState.isClearOverlay;
            if (this.renderState.isSetView != undefined) this.renderState.isSetView = data.renderState.isSetView;
            if (this.renderState.overlayEvent) this.renderState.overlayEvent = data.renderState.overlayEvent;
        }
    }
}

/**
 * 坐标转换
 * @param data 参数对象
 * @@lnglats 单个经纬度或者经纬度数组
 * @@otype 经纬度原坐标系 默认gps
 * @@tType 经纬度目标坐标系 默认火星坐标系
 * @@callback 回调函数
 * @author luwenjun 20160815
 * @constructor
 */
function TYConvertOptions(data) {
    this.lnglats = null;
    this.oType = TYEnumLngLatType.TY_GPS;
    this.tType = TYEnumLngLatType.TY_GCJ;

    if (data) {
        if (data.lnglats) this.lnglats = data.lnglats;
        if (data.oType) this.otype = data.oType;
        if (data.tType) this.lnglats = data.tType;
    }
}

/**
 * 天气查询
 * @param data 参数对象
 * @@district 需要查询的位置 district支持城市名称/区域编码（如：“石家庄市”/“130100”）
 * @@callback 回调函数 必填
 * @author luwenjun 20160815
 * @constructor
 */
function TYWeatherOptions(data) {
    this.district = null;
    this.callback = null;
    if (data) {
        if (data.district) this.district = data.district;
        if (data.callback) this.callback = data.callback;
    }
}

/**
 * 定位功能
 * @param
 * showButton        是否显示定位按钮
 默认值：
 buttonDom        自定义定位按钮的内容。可支持HTML代码或Dom元素对象，不设置该属性则使用默认按钮样式
 buttonPosition        定位按钮可停靠的位置“LT”：左上角“LB”：左下角“RT”：右上角“RB”：右下角 默认值：“LB”
 buttonOffset     按钮距离停靠位置的偏移量 默认值：TYPixel(10,20)
 showMarker        定位成功时是否在定位位置显示一个Marker 默认值：true
 showCircle        定位成功并且有精度信息时，是否用一个圆圈circle表示精度范围 默认值：true
 panToLocation        定位成功后，是否把定位得到的坐标设置为地图中心点坐标 默认值：true
 zoomToAccuracy        定位成功且显示精度范围时，是否把地图视野调整到正好显示精度范围 默认值：false
 * @author luwenjun 20160823
 * @constructor
 */
function TYGeolocationOptions(data) {
    this.showButton = true;
    this.buttonPosition = 'LB';
    this.buttonOffset = [10, 20];
    this.showMarker = true;
    this.showCircle = true;
    this.panToLocation = true;
    this.zoomToAccuracy = true;
    this.callback = null;
    if (data) {
        if (data.showButton) this.showButton = data.showButton;
        if (data.buttonOffset) this.buttonOffset = data.buttonOffset;
        if (data.buttonPosition) this.buttonPosition = data.buttonPosition;
        if (data.showMarker != undefined) this.showMarker = data.showMarker;
        if (data.showCircle != undefined) this.showCircle = data.showCircle;
        if (data.panToLocation != undefined) this.panToLocation = data.panToLocation;
        if (data.zoomToAccuracy != undefined) this.zoomToAccuracy = data.zoomToAccuracy;
        if (data.callback) this.callback = data.callback;

    }
}

/**
 * 空间计算参数初始化
 * @param sisType 计算图形 枚举
 * @param point 点是否在某个图形内
 * @param polyLine 线的长度
 * @param polyGon 多边形的面积
 * @author luwenjun 2016-8-15
 * @returns
 */
function TYSpasisOptions(spasisOptions) {
    this.sisType = null;
    this.point = null;
    this.polyLine = null;
    this.polyGon = null;
    if (spasisOptions) {
        if (spasisOptions.sisType) this.sisType = spasisOptions.sisType;
        if (spasisOptions.point) this.point = spasisOptions.point;
        if (spasisOptions.polyLine) this.polyLine = spasisOptions.polyLine;
        if (spasisOptions.polyGon) this.polyGon = spasisOptions.polyGon;
    }
}

/**
 * 地理编码参数初始化
 * @param addiress 地点描述
 * @param callback 回调函数
 * @author luwenjun 2016-8-15
 * @returns
 */
function TYGetLocationOptions(locationOptions) {
    this.address = null;
    this.callback = null;
    if (locationOptions) {
        if (locationOptions.address) this.address = locationOptions.address;
        if (locationOptions.callback) this.callback = locationOptions.callback;
    }
}

/**
 * 逆地理编码参数初始化
 * @param addiress 地点描述
 * @param callback 回调函数
 * @param type 回调函数
 * @param callback 必输异步
 * @author luwenjun 2016-8-15
 * @returns
 */
function TYGeoCoderOptions(geoCoderOption) {
    this.batch = false;
    this.location = null;
    this.type = null;
    this.callback = null;

    if (geoCoderOption) {
        if (geoCoderOption.batch != undefined) this.batch = geoCoderOption.batch;
        if (geoCoderOption.location) this.location = geoCoderOption.location;
        if (geoCoderOption.type) this.type = geoCoderOption.type;
        if (geoCoderOption.callback) this.callback = geoCoderOption.callback;
    }

}

/**
 * 海量点每个点属性
 * @param id id
 * @param lng 进度
 * @param lat 纬度
 * @param color 颜色
 * @param type 类型
 * @param size 大小
 * @param url 图标
 * @param opacity 透明度
 * @author luwenjun 2016-8-15
 * @returns
 */
function MassPoint(data) {
    this.id = null;
    this.lng = null;
    this.lat = null;
    this.color = "#00ff00";
    this.type = TYEnumMassShape.TY_MASS_STAR;
    this.size = TYEnumMassSize.TY_MASS_MIDDLE;
    this.url = "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png";
    this.opacity = 1;
    if (data) {
        if (data.id) this.id = data.id;
        if (data.lng) this.lng = data.lng;
        if (data.lat) this.lat = data.lat;
        if (data.color) this.color = data.color;
        if (data.type) this.type = data.type;
        if (data.size) this.size = data.size;
        if (data.url) this.url = data.url;
        if (data.opacity) this.opacity = data.opacity;

    }
}

/**
 * 海量点功能
 * @param data 海量点参数对象
 * @massId    String        定义点参数名
 * @lnglat    JSON        经纬度数组坐标
 * @fillColor    String        填充色(默认blue)
 * @shapeType    Eumn        调用枚举TYEnumMassShape:
 * @shapeSize    Eumn        调用绘制形状大小的枚举标注大小TYEnumMassSize:
 * @iconUrl    String        图片的路径
 * @fillOpacity    Number        填充物透明度0-1(默认0.6)
 * @massPointState    海量点状态
 * @isClearOverlay    Boolean        是否清除上次绘制的覆盖物(默认true)
 * @isSetView    Boolean        是否自适应(默认true)
 * @overlayEvent    JSON        实例化TYOverlayEvent对象，轨迹点上触发(默认无事件) 悬浮
 *@author 作者 luwenjun 20160815
 * @constructor
 */
function TYMassPointOption(data) {
    this.massPointDatas = [];
    this.massPointState = {
        isClearOverlay: true,
        isSetView: true,
        overlayEvent: null
    }
    if (data) {
        if (data.massPointDatas) this.massPointDatas = data.massPointDatas;
        if (data.massPointState) {
            if (data.massPointState.isClearOverlay != undefined) this.massPointState.isClearOverlay = data.massPointState.isClearOverlay;
            if (data.massPointState.isSetView != undefined) this.massPointState.isSetView = data.massPointState.isSetView;
            if (data.massPointState.overlayEvent) this.massPointState.overlayEvent = data.massPointState.overlayEvent;
        }
    }
}

/**
 *热力图
 *@param data
 *@author 作者 xinhongchun 20160926
 */
function TYHeatMapOption(data) {
    this.heatMapData = {
        radius: 30,
        gradient: {
            0.4: 'rgb(0, 255, 255)',
            0.65: 'rgb(0, 110, 255)',
            0.85: 'rgb(100, 0, 255)',
            1.0: 'rgb(100, 0, 255)'
        },
        opacity: [0, 1],
        zooms: [3, 19],
        max: null,
        DataSet: {}
    }
    this.heatMapState = {
        isClearOverlay: true
    }
    if (data) {
        if (data.heatMapData) {
            if (data.heatMapData.radius) this.heatMapData.radius = data.heatMapData.radius;
            if (data.heatMapData.gradient) this.heatMapData.gradient = data.heatMapData.gradient;
            if (data.heatMapData.opacity) this.heatMapData.opacity = data.heatMapData.opacity;
            if (data.heatMapData.zooms) this.heatMapData.zooms = data.heatMapData.zooms;
            if (data.heatMapData.max) this.heatMapData.max = data.heatMapData.max;
            if (data.heatMapData.DataSet) this.heatMapData.DataSet = data.heatMapData.DataSet;
        }
        if (data.heatMapState) {
            if (data.massPointState.isClearOverlay != undefined) this.massPointState.isClearOverlay = data.massPointState.isClearOverlay;
        }
    }
}

//------------------------------↑初始化参数 结束↑-----------------------------//

//------------------------------↓构造函数 开始↓-----------------------------//

var _map, _ty_layers_id = 15, _ty_source = [], _ty_views, __ty_interaction = [],
    _ty_view, _ty_tool = [], _ty_scale, _ty_rotate = [], _ty_drag, _ty_zoom = [], _ty_doubleClickZoom, _ty_keyboard = [], _ty_scrollwhell;
var _ty_copy = "<span style=\"font-family:Helvetica, 'Hiragino Sans GB','Microsoft Yahei', '微软雅黑', Arial;\">" +
    "&nbsp;<span style=\"font-size: 12px;color:#333333\">&copy; THIEE.COM  </span></span>";

document.write("<style>.ol-scale-line {position: absolute;bottom: 10px;left: 180px;</style>");
document.write("<style>.ol-zoom{position: absolute;top: 6px;left: 6px;}</style>");
document.write("<style>.ol-rotate{position:absolute; top:35px;right:6px}</style>");
document.write("<style>.ol-ding-wei {position: absolute;bottom: 200px;left: 20px;</style>");

//缩放控件合并样式
//document.write("<style>.ol-zoom .ol-zoom-out {margin-top: 204px;}.ol-zoomslider {background-color: transparent;top: 2.3em;}.ol-touch .ol-zoom .ol-zoom-out { margin-top: 212px;}</style>");
//document.write("<style>.ol-touch .ol-zoomslider {top: 2.75em;}.ol-zoom-in.ol-has-tooltip:hover [role=tooltip],.ol-zoom-in.ol-has-tooltip:focus [role=tooltip] {top: 3px;}</style>");
//document.write("<style>.ol-zoom-out.ol-has-tooltip:hover [role=tooltip],.ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {top: 232px;}</style>");

/**
 * 地图初始化
 * @param MapOptions 赋值的参数对象
 * @author luwenjun 2016-09-09
 * @returns
 */
var TYInitialize = function (MapOptions) {
    if (MapOptions) {
        if (!MapOptions.contentId)console.log("地图容器缺失");

        //如果坐标缺失使用定位
        var lonlat;
        if (!MapOptions.lnglat) {
            //设置一个默认地点12750431.936936716, 4584607.105219739
            MapOptions.lnglat = ol.proj.fromLonLat([105.34, 34.91]);
            MapOptions.mapLevel = 5;
            //  var n = new TYGeolocationOptions();
            //  n.showMarker = false;
            //  n.showCircle = false;
            //  n.showButton = true;
            //  n.panToLocation = false;
            //  n.callback = function (e) {
            //      if (e.status) {
            //          lonlat = ol.proj.fromLonLat([e.position.lng, e.position.lat]);
            //      } else {
            //          console.log("定位失败，请传入初始地图坐标。(没有连接网络将无法定位)");
            //      }
            //  };
            //  TYGeolocation(n);
            //  //延迟切换
            //  setTimeout(function () {
            //      if(lonlat){
            //          _map.getView().setCenter(lonlat);
            //          _map.getView().setZoom(11);
            //      }
            //      // console.log(lonlat)
            //  }, 2000)
        }
        //logo
        var logo = document.createElement("a");
        logo.href = "";
        logo.style.width = "32px";
        logo.style.height = "31px";
        logo.style.backgroundImage = "url('http://tytest.tygps.com/MapDemo/Images/logo.png')";
        //logo.style.padding="0px";
        //logo.src = "http://tytest.tygps.com/MapDemo/Images/logo.png";

        var source = [], attr;
        var urlss = url_para();

        for (var i in urlss) {
            if (i == 0) {
                attr = new ol.Attribution({
                    html: _ty_copy
                })
            }
            var source1 = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: [attr],
                    url: urlss[i]
                })
            });
            source.push(source1);
        }

        //文件拖入加入事件
        var dragAndDropInteraction = new ol.interaction.DragAndDrop({
            formatConstructors: [
                ol.format.GPX,
                ol.format.GeoJSON,
                ol.format.IGC,
                ol.format.KML,
                ol.format.TopoJSON
            ]
        });

        var defaultStyle = {
            'Point': new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: 'rgba(255,255,0,0.5)'
                    }),
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: '#ff0',
                        width: 1
                    })
                })
            }),
            'LineString': new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#f00',
                    width: 3
                })
            }),
            'Polygon': new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0,255,255,0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#0ff',
                    width: 1
                })
            }),
            'MultiPoint': new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: 'rgba(255,0,255,0.5)'
                    }),
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: '#f0f',
                        width: 1
                    })
                })
            }),
            'MultiLineString': new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#0f0',
                    width: 3
                })
            }),
            'MultiPolygon': new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0,0,255,0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#00f',
                    width: 1
                })
            })
        };

        var styleFunction = function (feature, resolution) {
            var featureStyleFunction = feature.getStyleFunction();
            if (featureStyleFunction) {
                return featureStyleFunction.call(feature, resolution);
            } else {
                return defaultStyle[feature.getGeometry().getType()];
            }
        };

        dragAndDropInteraction.on('addfeatures', function (event) {
            var vectorSource = new ol.source.Vector({
                features: event.features
            });
            _map.addLayer(new ol.layer.Image({
                source: new ol.source.ImageVector({
                    source: vectorSource,
                    style: styleFunction
                })
            }));
            _map.getView().fit(vectorSource.getExtent(), (_map.getSize()));
        });

        var interactions = ol.interaction.defaults({
            //altShiftDragRotate: false,
            //doubleClickZoom: false,
            keyboard: false
            //mouseWheelZoom: false,
            //shiftDragZoom: false,
            //dragPan: false
        }).extend([
            new ol.interaction.DragRotateAndZoom(),
            dragAndDropInteraction
        ]);

        _ty_views = new ol.View({
            minZoom: 3,
            maxZoom: 28,
            center: MapOptions.lnglat,
            //projection:"EPSG:4326",
            zoom: MapOptions.mapLevel
        });

        //赋值到全局
        _ty_source = source;

        _map = new ol.Map({
            renderer: "canvas",
            loadTilesWhileAnimating: true,//地图加载动画
            loadTilesWhileInteracting: true,//地图加载动画
            logo: logo,
            layers: _ty_source,
            interactions: interactions,
            controls: ol.control.defaults({zoom: false}).extend(
                [
                    new ol.control.Attribution({
                        tipLabel: "版权信息",
                        label: "«",
                        collapseLabel: "»"
                    }),
                    new ol.control.FullScreen({
                        tipLabel: "全屏浏览"
                    })
                ]
            ),
            target: MapOptions.contentId,
            view: _ty_views
        });
    }
}

/**
 * 地图的配置
 * @param configOption 赋值的参数对象
 * @author luwenjun 2016-09-13
 * @returns
 */
var TYMapConfig = function (configOption) {
    //判断是否保存在缓冲
    if (_ty_view == undefined)_ty_view = new ol.control.OverviewMap({
        collapseLabel: "◣",//"↙",
        label: "◥",//"↗",
        tipLabel: "隐藏/显示",
        collapsed: false
    });
    if (_ty_tool.length == 0) {
        _ty_tool.push(new ol.control.ZoomSlider());
        _ty_tool.push(new ol.control.Zoom({
            zoomInTipLabel: "放大",
            zoomOutTipLabel: "缩小"
        }));
    }
    if (_ty_scale == undefined)_ty_scale = new ol.control.ScaleLine();//{minWidth:100}
    if (_ty_rotate.length == 0) {
        _ty_rotate.push(new ol.interaction.PinchRotate());
        _ty_rotate.push(new ol.interaction.DragRotate({}));
    }

    if (_ty_scrollwhell == undefined)_ty_scrollwhell = new ol.interaction.MouseWheelZoom();
    if (_ty_doubleClickZoom == undefined)_ty_doubleClickZoom = new ol.interaction.DoubleClickZoom();
    if (_ty_drag == undefined)_ty_drag = new ol.interaction.DragPan();

    if (_ty_zoom.length == 0) {
        _ty_zoom.push(new ol.interaction.PinchZoom());
        _ty_zoom.push(new ol.interaction.DragZoom());
    }
    if (_ty_keyboard.length == 0) {
        _ty_keyboard.push(new ol.interaction.KeyboardPan());
        _ty_keyboard.push(new ol.interaction.KeyboardZoom());
    }

    if (configOption) {
        //鹰眼
        if (configOption.isShowOverView)_map.addControl(_ty_view);
        else _map.removeControl(_ty_view);
        //视野工具
        if (configOption.isShowControl) {
            _map.addControl(_ty_tool[0]);
            _map.addControl(_ty_tool[1]);
        } else {
            _map.removeControl(_ty_tool[0]);
            _map.removeControl(_ty_tool[1]);
        }
        //比例尺
        if (configOption.isShowSale)_map.addControl(_ty_scale);
        else _map.removeControl(_ty_scale);
        //是否可旋转
        if (configOption.isRotate) {
            for (var i in _ty_rotate) {
                _map.addInteraction(_ty_rotate[i]);
            }
        } else {
            for (var i in _ty_rotate) {
                _map.removeControl(_ty_rotate[i]);
            }
        }

        //缓动效果-已开启
        //动画-已开启
        //热点气泡-无此功能

        //平移
        if (configOption.isDrag)_map.addInteraction(_ty_drag);
        else _map.removeControl(_ty_drag);

        //双击缩放
        if (configOption.isZoom && configOption.isDoubleClickZoom)_map.addInteraction(_ty_doubleClickZoom);
        else if (configOption.isDoubleClickZoom)_map.addInteraction(_ty_doubleClickZoom);
        else _map.removeInteraction(_ty_doubleClickZoom);

        //滚轮缩放
        if (configOption.isZoom && configOption.isScrollWheel)_map.addInteraction(_ty_scrollwhell);
        else if (configOption.isScrollWheel)_map.addInteraction(_ty_scrollwhell);
        else _map.removeInteraction(_ty_scrollwhell);

        //缩放
        if (configOption.isZoom) {
            if (_ty_zoom.length > 0) {
                for (var i in _ty_zoom) {
                    _map.addInteraction(_ty_zoom[i]);
                }
            }
        } else {
            if (_ty_zoom.length > 0) {
                for (var i in _ty_zoom) {
                    _map.removeInteraction(_ty_zoom[i]);
                }
            }
        }
        //键盘操作
        if (configOption.isKeyboard) {
            if (_ty_keyboard.length > 0) {
                //console.log(_ty_keyboard.length)
                for (var i in _ty_keyboard) {
                    _map.addInteraction(_ty_keyboard[i]);
                }
            }
        } else {
            if (_ty_keyboard.length > 0) {
                for (var i in _ty_keyboard) {
                    _map.removeInteraction(_ty_keyboard[i]);
                }
            }
        }
    } else {
        _map.addControl(_ty_view);
        _map.addControl(_ty_tool[0]);
        _map.addControl(_ty_tool[1]);
        _map.addControl(_ty_scale);
        if (_ty_rotate.length > 0) {
            for (var i in _ty_rotate) {
                _map.addInteraction(_ty_rotate[i]);
            }
        }
        _map.addInteraction(_ty_scrollwhell);
        _map.addInteraction(_ty_doubleClickZoom);
        _map.addInteraction(_ty_drag);
        if (_ty_keyboard.length > 0) {
            for (var i in _ty_keyboard) {
                _map.addInteraction(_ty_keyboard[i]);
            }
        }
        if (_ty_zoom.length > 0) {
            for (var i in _ty_zoom) {
                _map.addInteraction(_ty_zoom[i]);
            }
        }
    }
}

/**
 * 设置地图中心
 * @param lnglat 坐标对象
 * @author luwenjun 2016-09-13
 * @returns
 */
var TYSetCenter = function (lnglat) {
    if (lnglat) {
        try {
            //_ty_hdxg2();
            _ty_views.setCenter(lnglat);
        } catch (e) {
            console.log(e.message);
        }
    }
}

function elastic(t) {
    return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
}

/**
 * 设置地图等级
 * @param Level 等级
 * @author luwenjun 2016-09-13
 * @returns
 */
var TYSetLevel = function (Level) {
    if (Level && Level > 0) {
        try {
            _map.getView().setZoom(Level);
        } catch (e) {
            console.log(e.message);
        }
    }
}

/**
 * 设置一个右上角左下角形成的矩形地图视野
 * @param lnglat 入参参数
 * @author luwenjun 2016-09-13
 * @returns
 */
var TYSetBounds = function (lnglat) {
    if (lnglat) {
        try {
            var x1 = lnglat.t_r_lnglat[0];
            var y1 = lnglat.t_r_lnglat[1];
            var x2 = lnglat.b_l_lnglat[0];
            var y2 = lnglat.b_l_lnglat[1];

            var ext = ol.extent.boundingExtent([
                [x1, y1],
                [x2, y2]
            ]);
            _map.getView().fit(ext, _map.getSize());
            //if (x1 >= x2 && y1 >= y2) {
            //    // _ty_hdxg();
            //    _map.getView().fit([x2, y2, x1, y1], _map.getSize());
            //} else {
            //    console.log("右上角坐标小于左下角坐标，无法建立视野");
            //}
        } catch (e) {
            console.log(e.message);
        }
    }
}

/**
 * 地图视野控制-地图视野固定
 * @param lnglat 固定坐标
 * @author luwenjun 2016-9-14
 * @returns
 */
var _ty_onKey;
var TYSetLimitBounds = function (lnglat) {
    var adX = [], adY = [];
    if (lnglat) {
        try {
            adX.push(lnglat.t_r_lnglat[0]);
            adX.push(lnglat.b_l_lnglat[0]);
            adY.push(lnglat.t_r_lnglat[1]);
            adY.push(lnglat.b_l_lnglat[1]);

            _ty_box(adX, adY);

            _ty_moveEnd(_map.getView().getCenter(), _map.getView().getZoom());
        } catch (e) {
            console.log(e.message);
        }
    }
}

function _ty_moveEnd(center, zoom) {
    // var extent = _map.getView().calculateExtent(_map.getSize());
    // var bottomLeft =ol.extent.getBottomLeft(extent);
    // var topRight = ol.extent.getTopRight(extent);
    if (center && zoom) {
        _ty_onKey = _map.on('moveend', function (evt) {
            var map = evt.map;
            if (map.getView().getCenter() != center || zoom != map.getView().getZoom()) {
                //_ty_hdxg();
                _map.getView().setCenter(center);
                _map.getView().setZoom(zoom);
            }
        });
        _ty_point.push(_ty_onKey);
    }
}

/**
 * 地图视野控制-清除视野控制
 * @param lnglat 视野跳转
 * @author luwenjun 2016-8-26
 * @returns
 */
var TYBoundsClear = function () {
    if (_ty_onKey)_map.unByKey(_ty_onKey);
}

/**
 * 覆盖物-绘制marker
 * @param pointOptions 绘制点对象
 * @author luwenjun 2016-9-14
 * @returns
 */
var _ty_cluster = [], _ty_point = [], _ty_popup = [], _ty_overlays = [];
var TYDrawPoint = function (pointOptions, isfor) {
    _map.on('pointermove', function (e) {
        var pixel = _map.getEventPixel(e.originalEvent);
        var hit = _map.hasFeatureAtPixel(pixel);
        _map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    if (pointOptions) {
        /*  try {*/
        if (!pointOptions.pointData) {
            console.log("参数缺失");
        }
        //清理
        if (pointOptions.pointState.isClearOverlay) {
            TYClear();
        }

        //切换图层
        if (!isfor) {
            var _ty_points = [];
            _ty_points.push('point');
            _ty_points.push(pointOptions);
            _ty_overlays.push(_ty_points);
        }

        var pointFeatureArr = [];
        var __data = [];

        //单个对象
        if (pointOptions.pointData.length == undefined) {
            __data.push(pointOptions.pointData);
        } else {
            __data = pointOptions.pointData;
        }

        var __boxX = [], __boxY = [];
        for (var i in __data) {
            var text, image, size, anchor, textOffset, fp;
            if (__data[i].label) {
                if (__data[i].label.content) {
                    text = __data[i].label.content;
                } else {
                    text = "";
                }
            } else {
                text = "";
            }

            if (__data[i].icon.image) {
                image = __data[i].icon.image;
            }

            if (__data[i].icon.imageOffset) {
                anchor = __data[i].icon.imageOffset;
            }
            if (__data[i].icon.size) {
                size = __data[i].icon.size;
                fp = "pixels";
            } else {
                fp = "fraction";
                size = [19, 31];
                anchor = [.5, 1];
            }
            if (__data[i].label) {
                if (__data[i].label.offset)textOffset = __data[i].label.offset;
                else textOffset = [0, 0]
            } else textOffset = [0, 0];
            //console.log(__data);

            var style = new ol.style.Style({
                image: new ol.style.Icon({
                    //   anchorXUnits: fp,
                    //  anchorYUnits: fp,
                    opacity: 1,
                    src: image,
                    anchor: [.5, 1],
                    size: size
                })
                /* text: new ol.style.Text({
                 font: "13px Microsoft Yahei",
                 text: text,
                 fill: new ol.style.Fill({
                 color: "#aa3300"
                 }),
                 stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                 offsetX: textOffset[0],
                 offsetY: textOffset[1],
                 textAlign: "left"
                 })*/
            });

            var geo = new ol.geom.Point(__data[i].lnglat);

            var feature = new ol.Feature({
                geometry: geo
            });

            feature.setId(__data[i].pointId);
            feature.kid = i;
            feature.label = __data[i].label;
            feature.icon = __data[i].icon;
            feature.setStyle(style);


            pointFeatureArr.push(feature);

            //绘制lable信息框
            var div = document.createElement("div");
            div.innerHTML = text;

            var popup = new ol.Overlay({
                id: "_ty_lj_key_bs_2017_" + i,
                //autoPan: true,
                stopEvent: false,
                positioning: "top-left",
                offset: [textOffset[0] - (size[0] / 2), textOffset[1] - size[1]],
                element: div
            });
            popup.setPosition(__data[i].lnglat);
            _map.addOverlay(popup);
            _ty_popup.push(popup);

            //自适应计算冒泡
            __boxX.push(__data[i].lnglat[0]);
            __boxY.push(__data[i].lnglat[1]);
        }

        if (pointOptions.pointState.overlayEvent) {
            var keys__ = _map.on(pointOptions.pointState.overlayEvent.mouseEvent, function (evt) {
                var feature = _map.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                if (feature) {
                    if (feature.get("features")) {
                        if (feature.get("features").length == 1) {
                            ___isfuncion(feature.get("features")[0]);
                        } else if (feature.get("features").length > 1) {
                            var zoom = _map.getView().getZoom();
                            if (zoom >= 3 && zoom < 18) {
                                var minx, miny, maxx, maxy;
                                for (var i in feature.get("features")) {
                                    if (i > 1) {
                                        var a = feature.get("features")[i - 1].getGeometry().getCoordinates();
                                        var b = feature.get("features")[i].getGeometry().getCoordinates();
                                        if (a[0] >= b[0])maxx = a[0];
                                        minx = b[0];
                                        if (a[1] >= b[1])maxy = a[1];
                                        miny = b[1];
                                    }
                                }
                                _map.getView().getCenter([((maxx - minx) / 2 + minx), ((maxy - miny) / 2 + miny)])
                                _map.getView().setZoom(zoom + 1);
                            }
                        }
                    } else {
                        ___isfuncion(feature);
                    }
                }
            });
            _ty_point.push(keys__);

            function ___isfuncion(feature) {
                // var names = feature.getStyle().getText().getText();
                //alert(names + "，回调函数");
                var mkNew = new Object();
                var coord = feature.getGeometry().getCoordinates();
                mkNew.GPSLngLat = new GPSLngLat(coord[0], coord[1]);
                mkNew.pointId = feature.getId();
                mkNew.label = feature.label;
                mkNew.icon = feature.icon;

                pointOptions.pointState.overlayEvent.mouseFunc(mkNew);
            }
        }
        var source = new ol.source.Vector({
            features: pointFeatureArr
        });
        //是否聚合
        if (pointOptions.pointState.isGather == true) {
            var clusterSource = new ol.source.Cluster({
                distance: parseInt(50, 10),
                source: source
            });
            source = clusterSource;
        }

        var styleCache = {};
        var layerss = new ol.layer.Vector({
            zIndex: 50000,
            updateWhileAnimating: true,
            updateWhileInteracting: true,
            source: source,
            style: function (feature) {
                if (pointOptions.pointState.isGather == true) {
                    var size = feature.get('features').length;
                    var style = styleCache[size];

                    for (var i in feature.get('features')) {
                        var ursls, imgsize;
                        if (size <= 1) {
                            ursls = feature.get('features')[i].getStyle().getImage().getSrc();
                            imgsize = feature.get('features')[i].getStyle().getImage().getSize();
                            for (var ii in _ty_popup) {
                                //if(_ty_popup[ii].getId()=="_ty_lj_dyn_bs_2017_"+feature.get('features')[i].kid)
                                _ty_popup[ii].getElement().style.display = "block";
                            }
                        } else {
                            if (size > 1 && size < 10) {
                                ursls = "http://webapi.amap.com/theme/v1.3/m1.png";
                                imgsize = [53, 53];
                            } else if (size >= 10 && size <= 99) {
                                ursls = "http://webapi.amap.com/theme/v1.3/m2.png";
                                imgsize = [56, 56];
                            } else if (size >= 100) {
                                ursls = "http://webapi.amap.com/theme/v1.3/m3.png";
                                imgsize = [66, 66];
                            }
                            for (var ii in _ty_popup) {
                                if (_ty_popup[ii].getId() == "_ty_lj_key_bs_2017_" + feature.get('features')[i].kid)
                                    _ty_popup[ii].getElement().style.display = "none";
                            }
                        }

                        if (size <= 1) {
                            style = new ol.style.Style({
                                image: new ol.style.Icon({
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'fraction',
                                    opacity: 1,
                                    src: ursls,
                                    anchorOrigin: "top-left",
                                    size: imgsize
                                })
                                /* text: new ol.style.Text({
                                 font: "13px Microsoft Yahei",
                                 text: feature.get('features')[i].getStyle().getText().getText(),
                                 fill: new ol.style.Fill({
                                 color: "red"
                                 }),
                                 offsetX: 15 ,
                                 offsetY: 0,
                                 stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                                 textAlign: "left"
                                 })*/
                            });
                        } else {
                            style = new ol.style.Style({
                                image: new ol.style.Icon({
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'fraction',
                                    opacity: 1,
                                    src: ursls,
                                    anchorOrigin: "top-left",
                                    size: imgsize
                                }),
                                text: new ol.style.Text({
                                    font: "13px Microsoft Yahei",
                                    text: size.toString(),
                                    fill: new ol.style.Fill({
                                        color: "#000"
                                    }),
                                    offsetX: 0,
                                    offsetY: 0,
                                    stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                                    textAlign: "center"
                                })
                            });
                        }
                        styleCache[size] = style;
                    }
                    return style;
                }
            }
        });
        _map.addLayer(layerss);
        _ty_cluster.push(layerss);
        //自适应
        if (pointOptions.pointState.isSetView) {
            _ty_box(__boxX, __boxY);
        }
        //console.log(layerss);

        /*  } catch (e) {
         console.log(e.message);
         }*/
    }
}

/**
 * 覆盖物-绘制line
 * @param lineOption 绘制线对象
 * @author luwenjun 2016-9-21
 * @returns
 */
var TYDrawLine = function (lineOption, isfor) {
    if (lineOption) {
        if (!lineOption.lineData) {
            console.log("参数缺失");
        }

        //清理
        if (lineOption.lineState.isClearOverlay)TYClear();

        //切换图层
        if (!isfor) {
            var _ty_lines = [];
            _ty_lines.push('line');
            _ty_lines.push(lineOption);
            _ty_overlays.push(_ty_lines);
        }

        var __data = [];
        //单个对象
        if (lineOption.lineData.length) {
            __data = lineOption.lineData;
        } else {
            __data.push(lineOption.lineData);
        }

        var lineFeatureArr = [], dash = [0, 0], __boxX = [], __boxY = [], styles = [];
        for (var i in __data) {
            if (__data[i].lineType != "solid")dash = [3, 5];
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: __data[i].lineWidth,
                    lineDash: dash,
                    color: __data[i].lineColor
                })
            });
            if (i == 0)styles.push(style);
            var lineFeature = new ol.Feature(new ol.geom.LineString(__data[i].lnglat));
            lineFeature.setId(__data[i].lineId);
            lineFeature.setStyle(style);
            lineFeatureArr.push(lineFeature);

            var _rom_data = __data[i].lnglat;

            for (var ii in _rom_data) {
                __boxX.push(_rom_data[ii][0]);
                __boxY.push(_rom_data[ii][1]);
            }
        }
        if (lineOption.lineState.overlayEvent) {
            var keys__ = _map.on(lineOption.lineState.overlayEvent.mouseEvent, function (evt) {
                var feature = _map.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                if (feature) {
                    var line = new Object();
                    line.lineId = feature.getId();
                    var arr = feature.getGeometry().getCoordinates();
                    var arrGPS = [];
                    for (var i in arr) {
                        arrGPS.push(new GPSLngLat(arr[i][0], arr[i][1]))
                    }
                    line.lnglat = arrGPS;
                    lineOption.lineState.overlayEvent.mouseFunc(line);
                }
            });
            _ty_point.push(keys__);
        }

        var layers = new ol.layer.Vector({
            zIndex: 50000,
            source: new ol.source.Vector({
                features: lineFeatureArr
            })
        });


        var select = new ol.interaction.Select({
            style: styles
        });
        var modify = new ol.interaction.Modify({
            features: select.getFeatures(),
            style: styles
        });
        _map.addInteraction(select);
        _map.addInteraction(modify);

        if (__ty_interaction) {
            __ty_interaction.push(select);
            __ty_interaction.push(modify);
        }


        _map.addLayer(layers);
        _ty_cluster.push(layers);

        if (lineOption.lineState.isSetView) {
            _ty_box(__boxX, __boxY);
        }


    }
}

/**
 * 覆盖物-绘制矩形
 * @param rectangleOption 绘制矩形对象
 * @author luwenjun 2016-8-16
 * @returns
 */
var TYDrawRectangle = function (rectangleOption, isfor) {
    if (rectangleOption) {
        if (!rectangleOption.rectangleData) {
            console.log("参数缺失");
        }
        //清理
        if (rectangleOption.rectangleState.isClearOverlay)TYClear();

        //切换图层
        if (!isfor) {
            var _ty_rects = [];
            _ty_rects.push('rect');
            _ty_rects.push(rectangleOption);
            _ty_overlays.push(_ty_rects);
        }

        var __data = [];
        //单个对象
        if (rectangleOption.rectangleData.length) {
            __data = rectangleOption.rectangleData;
        } else {
            __data.push(rectangleOption.rectangleData);
        }

        var rectangleFeatureArr = [], dash = [0, 0], __boxX = [], __boxY = [];
        for (var i in __data) {
            if (__data[i].lineType != "solid")dash = [3, 5];
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: __data[i].lineWidth,
                    lineDash: dash,
                    color: __data[i].lineColor
                }),
                fill: new ol.style.Fill({
                    color: [255, 255, 255, .7]//rectangleOption.rectangleData[i].fillColor
                })
            });

            var lt, tr, rb, bl;
            tr = __data[i].t_r_LngLat;
            bl = __data[i].b_l_LngLat;
            lt = [tr[0], bl[1]];
            rb = [bl[0], tr[1]];

            var rectangleFeature = new ol.Feature(
                new ol.geom.Polygon(
                    [
                        [tr, rb, bl, lt, tr]
                    ]
                )
            );

            rectangleFeature.setId(__data[i].rectangleId);
            rectangleFeature.setStyle(style);
            rectangleFeatureArr.push(rectangleFeature);

            var _rom_data = [];
            _rom_data.push(tr);
            _rom_data.push(bl);

            for (var ii in _rom_data) {
                __boxX.push(_rom_data[ii][0]);
                __boxY.push(_rom_data[ii][1]);
            }
        }


        if (rectangleOption.rectangleState.overlayEvent) {
            var keys__ = _map.on(rectangleOption.rectangleState.overlayEvent.mouseEvent, function (evt) {
                var feature = _map.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                if (feature) {
                    var rectangle = new Object();
                    rectangle.rectangleId = feature.getId();
                    var arr = feature.getGeometry().getCoordinates();
                    //console.log(feature)
                    var arrGPS = [];
                    for (var i in arr[0]) {
                        arrGPS.push(new GPSLngLat(arr[0][i][0], arr[0][i][1]))
                    }
                    rectangle.GPSLngLat = arrGPS;
                    rectangleOption.rectangleState.overlayEvent.mouseFunc(rectangle);


                }
            });
            _ty_point.push(keys__);
        }

        var layers = new ol.layer.Vector({
            zIndex: 50000,
            source: new ol.source.Vector({
                features: rectangleFeatureArr
            })
        });


        var select = new ol.interaction.Select();
        var modify = new ol.interaction.Modify({
            features: select.getFeatures()
        });
        var translate = new ol.interaction.Translate({
            features: select.getFeatures()
        });
        _map.addInteraction(select);
        _map.addInteraction(translate);
        _map.addInteraction(modify);

        if (__ty_interaction) {
            __ty_interaction.push(select);
            __ty_interaction.push(translate);
            __ty_interaction.push(modify);
        }

        _map.addLayer(layers);
        _ty_cluster.push(layers);

        if (rectangleOption.rectangleState.isSetView) {
            _ty_box(__boxX, __boxY);
        }

    }
}

/**
 * 覆盖物-多边形
 * @param rectangleOption 绘制多边形对象
 * @author luwenjun 2016-9-22
 * @returns
 */
var TYDrawPolygon = function (polygonOption, isfor) {
    if (polygonOption) {
        if (!polygonOption.polygonData) {
            console.log("参数缺失");
        }
        //清理
        if (polygonOption.polygonState.isClearOverlay)TYClear();

        if (!isfor) {
            var _ty_polygons = [];
            _ty_polygons.push('polygon');
            _ty_polygons.push(polygonOption);
            _ty_overlays.push(_ty_polygons);
        }

        var __data = [];
        //单个对象
        if (polygonOption.polygonData.length) {
            __data = polygonOption.polygonData;
        } else {
            __data.push(polygonOption.polygonData);
        }

        var polygonFeatureArr = [], dash = [0, 0], __boxX = [], __boxY = [];
        for (var i in __data) {
            if (__data[i].lineType != "solid")dash = [3, 5];
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: __data[i].lineWidth,
                    lineDash: dash,
                    color: __data[i].lineColor
                }),
                fill: new ol.style.Fill({
                    color: [255, 255, 255, .7]//rectangleOption.rectangleData[i].fillColor
                })
            });

            var polygonFeature = new ol.Feature(
                new ol.geom.Polygon(
                    [
                        __data[i].lnglat
                    ]
                )
            );
            polygonFeature.setId(__data[i].polygonId);
            polygonFeature.setStyle(style);
            polygonFeatureArr.push(polygonFeature);

            var _rom_data = __data[i].lnglat;

            for (var ii in _rom_data) {
                __boxX.push(_rom_data[ii][0]);
                __boxY.push(_rom_data[ii][1]);
            }
        }


        if (polygonOption.polygonState.overlayEvent) {
            var keys__ = _map.on(polygonOption.polygonState.overlayEvent.mouseEvent, function (evt) {
                var feature = _map.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                if (feature) {
                    var polygon = new Object();
                    polygon.polygonId = feature.getId();
                    var arr = feature.getGeometry().getCoordinates();
                    console.log(feature)
                    var arrGPS = [];
                    for (var i in arr[0]) {
                        arrGPS.push(new GPSLngLat(arr[0][i][0], arr[0][i][1]))
                    }
                    polygon.GPSLngLat = arrGPS;
                    polygonOption.polygonState.overlayEvent.mouseFunc(polygon);


                }
            });
            _ty_point.push(keys__);
        }

        var layers = new ol.layer.Vector({
            zIndex: 50000,
            source: new ol.source.Vector({
                features: polygonFeatureArr
            })
        });


        var select = new ol.interaction.Select();
        var modify = new ol.interaction.Modify({
            features: select.getFeatures()
        });
        var translate = new ol.interaction.Translate({
            features: select.getFeatures()
        });
        _map.addInteraction(select);
        _map.addInteraction(translate);
        _map.addInteraction(modify);

        if (__ty_interaction) {
            __ty_interaction.push(select);
            __ty_interaction.push(translate);
            __ty_interaction.push(modify);
        }

        _map.addLayer(layers);
        _ty_cluster.push(layers);

        if (polygonOption.polygonState.isSetView) {
            _ty_box(__boxX, __boxY);
        }

    }
}

/**
 * 覆盖物-绘制圆
 * @param circleOption 绘制圆对象
 * @author luwenjun 2016-9-22
 * @returns
 */
var TYDrawCircle = function (circleOption, isfor) {
    if (circleOption) {
        if (!circleOption.circleData) {
            console.log("参数缺失");
        }
        //清理
        if (circleOption.circleState.isClearOverlay)TYClear();

        if (!isfor) {
            var _ty_circles = [];
            _ty_circles.push('circle');
            _ty_circles.push(circleOption);
            _ty_overlays.push(_ty_circles);
        }

        var __data = [];
        //单个对象
        if (circleOption.circleData.length) {
            __data = circleOption.circleData;
        } else {
            __data.push(circleOption.circleData);
        }

        var circleFeatureArr = [], dash = [0, 0], __boxX = [], __boxY = [];
        for (var i in __data) {
            if (__data[i].lineType != "solid")dash = [3, 5];
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: __data[i].lineWidth,
                    lineDash: dash,
                    color: __data[i].lineColor
                }),
                fill: new ol.style.Fill({
                    color: [255, 255, 255, .7]//rectangleOption.rectangleData[i].fillColor
                })
            });

            var circleFeature = new ol.Feature(
                new ol.geom.Circle(
                    __data[i].lnglat,
                    __data[i].radius
                )
            );
            circleFeature.setId(__data[i].circleId);
            circleFeature.setStyle(style);
            circleFeatureArr.push(circleFeature);

            var pointFeature = new ol.Feature({
                geometry: new ol.geom.Point(__data[i].lnglat)
            });

            var stylePoint = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 2,
                    stroke: new ol.style.Stroke({
                        color: RGBA("#ffffff", 1),
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: RGBA("#FF4500", 0.9)
                    })
                })

            });
            //pointFeature.setStyle(stylePoint);
            //circleFeatureArr.push(pointFeature);


            var _rom_data = __data[i].lnglat;
            __boxX.push(_rom_data[0]);
            __boxY.push(_rom_data[1]);
        }


        if (circleOption.circleState.overlayEvent) {
            var keys__ = _map.on(circleOption.circleState.overlayEvent.mouseEvent, function (evt) {
                var feature = _map.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                if (feature) {
                    var circle = new Object();
                    //  console.log(feature)
                    var arr = feature.getGeometry().getCenter();
                    circle.GPSLngLat = new GPSLngLat(arr[0], arr[1]);
                    circle.radius = feature.getGeometry().getRadius();
                    circle.circleId = feature.getId();
                    circleOption.circleState.overlayEvent.mouseFunc(circle);

                }
            });
            _ty_point.push(keys__);
        }

        var layers = new ol.layer.Vector({
            zIndex: 50000,
            source: new ol.source.Vector({
                features: circleFeatureArr
            })
        });

        var select = new ol.interaction.Select();
        //   if(circleOption.circleState.overlayEvent.mouseEvent=="singleclick"){
        //       select= new ol.interaction.Select();
        //   }
        //   else if(circleOption.circleState.overlayEvent.mouseEvent=="dblclick"){
        //       select= new ol.interaction.Select({
        //           condition: ol.events.condition.doubleClick
        //       });
        //   }
        //   else if(circleOption.circleState.overlayEvent.mouseEvent="pointermove"){
        //       select= new ol.interaction.Select({
        //           condition: ol.events.condition.pointermove
        //       });
        //   }

        //   if(select){
        //       select.on("select",function(feature){
        //           if(feature.selected[0]){
        //               //console.log(feature)
        //               try{
        //                   var feat=feature.selected[0];
        //                   var circle = new Object();
        //                   var arr = feat.getGeometry().getCenter();
        //                   circle.GPSLngLat = new GPSLngLat(arr[0], arr[1]);
        //                   circle.radius = feat.getGeometry().getRadius();
        //                   circle.circleId = feat.getId();
        //                   circleOption.circleState.overlayEvent.mouseFunc(circle);
        //               }
        //               catch (e){
        //                  // console.log(e.message);
        //               }
        //           }
        //       })
        //   }


        var translate = new ol.interaction.Translate({
            features: select.getFeatures()
        });

        _map.addInteraction(select);
        _map.addInteraction(translate);

        if (__ty_interaction) {
            __ty_interaction.push(select);
            __ty_interaction.push(translate);
        }

        _map.addLayer(layers);
        _ty_cluster.push(layers);

        if (circleOption.circleState.isSetView) {
            _ty_box(__boxX, __boxY);
        }

    }
}

/**
 * 手绘点线面
 * @param drawOverlayOption 手绘点线面
 * @author luwenjun 2016-8-17
 * @returns
 */
var _ty_draw_vector = [], _ty_draw_end, _ty_draw;
var TYDrawOverlay = function (drawOverlayOption) {
    if (drawOverlayOption) {
//清理
        if (drawOverlayOption.isClearOverlay) {
            TYClear();
        } else {
            TYClear(false);
        }

        var source = new ol.source.Vector({wrapX: false});
        var vector = new ol.layer.Vector({
            zIndex: 50000,
            source: source,
            style: function (feature) {
                var geometry = feature.getGeometry();
                var text;
                //console.log(feature);
                switch (geometry.getType()) {
                    case  "Point":
                        var coor = GPSLngLat(geometry.getCoordinates()[0], geometry.getCoordinates()[1]);
                        text = "经度:" + coor.GPSLng;
                        text += "\r\n纬度:" + coor.GPSLat;
                        break;
                    case  "LineString":
                        var coor = geometry.getCoordinates();
                        var Length = formatLength(coor);
                        text = "长:" + Length + " m";
                        break;
                    case  "Circle":
                        var coor = GPSLngLat(geometry.getCenter()[0], geometry.getCenter()[1]);
                        text = "经度:" + coor.GPSLng;
                        text += "\r\n纬度:" + coor.GPSLat;
                        text += "\r\n半径:" + formatLength([geometry.getFirstCoordinate(), geometry.getLastCoordinate()]) + " m";
                        break;
                    case  "Polygon":
                        var coor = geometry.getCoordinates()[0];
                        text = "面积:" + formataArea(coor) + " ㎡";
                        break;
                    case  "Square":
                        var coor = geometry.getCoordinates()[0];
                        text = "面积:" + formataArea(coor) + " ㎡";
                        break;
                }

                var style = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.7)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(255, 0, 0, 0.7)',
                        width: 3
                    }),
                    image: new ol.style.Icon({
                        opacity: 1,
                        src: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                        imgSize: [19, 31],
                        anchor: [.5, 1]
                    }),
                    text: new ol.style.Text({
                        font: "12px Microsoft Yahei",
                        text: ((drawOverlayOption.isShowMath == true) ? text : ""),
                        fill: new ol.style.Fill({
                            color: "red"
                        }),
                        stroke: new ol.style.Stroke({color: "#fff", width: 3}),
                        // offsetX: 15,
                        offsetY: 15,
                        textAlign: "center"
                    })
                });
                return style;
            }
        });

        _map.addLayer(vector);
        _ty_draw_vector.push(vector);
        // global so we can remove it later
        function addInteraction() {
            var value;
            if (drawOverlayOption.overlayType) {
                if (drawOverlayOption.overlayType == 1)value = "Point";
                if (drawOverlayOption.overlayType == 2)value = "LineString";
                if (drawOverlayOption.overlayType == 3)value = "Circle";
                if (drawOverlayOption.overlayType == 4)value = "Polygon";
                if (drawOverlayOption.overlayType == 5)value = "Square";
            }
            if (value) {
                var geometryFunction, maxPoints;
                if (value === 'Square') {
                    value = 'LineString';
                    maxPoints = 2;
                    geometryFunction = function (coordinates, geometry) {
                        if (!geometry) {
                            geometry = new ol.geom.Polygon(null);
                        }
                        var start = coordinates[0];
                        var end = coordinates[1];
                        geometry.setCoordinates([
                            [start, [start[0], end[1]], end, [end[0], start[1]], start]
                        ]);
                        return geometry;
                    };
                }
                _ty_draw = new ol.interaction.Draw({
                    source: source,
                    type: (value),
                    geometryFunction: geometryFunction,
                    maxPoints: maxPoints
                });
                _map.addInteraction(_ty_draw);
            }
        }

        addInteraction();

        //清除上次事件
        if (_ty_point) {
            for (var i  in  _ty_point) {
                _map.removeInteraction(_ty_point[0]);
            }
        }

        if (drawOverlayOption.callfunc) {
            _ty_draw_end = _ty_draw.on("drawend", function (draw) {
                //console.log()
                var geometry = draw.feature.getGeometry(), New = {};
                switch (geometry.getType()) {
                    case  "Point":
                        var coor = GPSLngLat(geometry.getCoordinates()[0], geometry.getCoordinates()[1]);
                        //返回值
                        New = new Object();
                        New.GPSLngLat = coor;
                        break;
                    case  "LineString":
                        //返回值
                        var coor = geometry.getCoordinates();
                        var newCoor = [];
                        for (var i in coor) {
                            newCoor.push(GPSLngLat(coor[i][0], coor[i][1]));
                        }
                        New = new Object();
                        New.GPSLngLat = newCoor;
                        New.length = formatLength(coor);
                        break;
                    case  "Circle":
                        var coor = GPSLngLat(geometry.getCenter()[0], geometry.getCenter()[1]);
                        New.GPSLngLat = coor;
                        New.radius = formatLength([geometry.getFirstCoordinate(), geometry.getLastCoordinate()]);
                        New.area = Math.pow(New.radius, 2) * Math.PI;
                        break;
                    case  "Polygon":
                        var coor = geometry.getCoordinates()[0];

                        var newCoor = [];
                        for (var i in coor) {
                            newCoor.push(GPSLngLat(coor[i][0], coor[i][1]));
                        }
                        New = new Object();
                        New.GPSLngLat = newCoor;
                        New.area = formataArea(coor);
                        break;
                    case  "Square":
                        var coor = geometry.getCoordinates()[0];
                        var newCoor = [];
                        for (var i in coor) {
                            newCoor.push(GPSLngLat(coor[i][0], coor[i][1]));
                        }
                        New = new Object();
                        New.GPSLngLat = newCoor;
                        New.area = formataArea(coor);
                        break;
                }
                //回调
                drawOverlayOption.callfunc(New);
            })

            _ty_point.push(_ty_draw_end);
        }
    }
}

/**
 * 关闭手绘点线面
 * @param bool 是否清空
 * @author luwenjun 2016-9-23
 * @returns
 */
var TYDrawStop = function (b) {
    if (_ty_draw)_map.removeInteraction(_ty_draw);//关闭功能
    if (b && _ty_draw_vector) {
        for (var i in _ty_draw_vector) {
            _map.removeLayer(_ty_draw_vector[i]);
        }
    }
    //TYClear();
}

/**
 * 返回覆盖物视野
 * @author luwenjun 2016-10-24
 * @returns
 */
var TYSetFitView = function () {
    if (_ty_cluster) {
        var features = _ty_cluster[0].getSource().getFeatures();
        if (features.length > 0) {
            var xX = [], yY = [];
            for (var i in features) {
                //console.log(features[i].getGeometry().getExtent());
                xX.push(features[i].getGeometry().getExtent()[0]);
                xX.push(features[i].getGeometry().getExtent()[2]);
                yY.push(features[i].getGeometry().getExtent()[1]);
                yY.push(features[i].getGeometry().getExtent()[3]);
            }
            var extent = [xX.sort()[0], yY.sort()[0], xX.sort()[xX.sort().length - 1], yY.sort()[xX.sort().length - 1]];
            //console.log(extent);
            _map.getView().fit(extent, _map.getSize())
        }
    }
}

/**
 * 弹出窗口
 * @param windowOptions 弹出窗口
 * @author luwenjun 2016-9-23
 * @returns
 */
/*document.write("<div id='popup'></div>");*/
/*document.write("<div id='popup' class='ol-popup'>");
 document.write("    <a href='#' id='popup-closer' class='ol-popup-closer'></a>");
 document.write("    <div id='popup-content'></div>");
 document.write("</div>");*/
document.write("<style>.ol-popup{position: absolute;background-color: white;-webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));");
document.write("filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));padding: 15px;border-radius: 10px;border: 1px solid #cccccc;bottom: 12px;left: -50px;min-width: 280px;}</style>");
document.write("<style>.ol-popup:after, .ol-popup:before {top: 100%;border: solid transparent;content: ' ';height: 0;width: 0;position: absolute;pointer-events: none;}</style>");
document.write("<style>.ol-popup:after {border-top-color: white;border-width: 10px;left: 48px;margin-left: -10px;}</style>");
document.write("<style>.ol-popup:before {border-top-color: #cccccc;border-width: 11px;left: 48px;margin-left: -11px;}</style>");
document.write("<style>.ol-popup-closer {text-decoration: none;position: absolute;top: 2px;right: 8px;}</style>");
document.write("<style>.ol-popup-closer:after {content: '✖';}</style>");

var __ty_closer, __ty_overlay, __ty_closeinfo, _ty_infoWindow;
var TYInfoWindow = function (windowOptions) {
    if (windowOptions) {

        if (!windowOptions.position) {
            console.log("弹出框参数缺失");
        }
        if (__ty_overlay) __ty_overlay.setPosition(undefined);
        if (__ty_closer) {
            __ty_closer.click();
            __ty_closer.blur();
        }
        //构建信息窗体中显示的内容
        var isCustomS, enableCloseOnClickS, offsetS, positionS, contentS;

        isCustomS = windowOptions.isCustom;
        enableCloseOnClickS = windowOptions.enableCloseOnClick;
        if (windowOptions.offset)offsetS = windowOptions.offset;
        if (windowOptions.position)positionS = windowOptions.position;
        if (windowOptions.content)contentS = windowOptions.content;

        var htmls, offset;
        if (isCustomS) {
            //  zdy.style.zIndex = 30000;
            var zdy = document.createElement("div");
            zdy.id = "zdy" + Math.random();

            zdy.innerHTML = contentS;
            htmls = zdy;
            offsetS = [offsetS[0] - 3, offsetS[1] - 20]
        } else {
            var container = document.createElement("div");
            container.className = "ol-popup";
            var content = document.createElement("div");

            content.id = "popup-content" + Math.random();
            var closer = document.createElement("a")
            closer.className = "ol-popup-closer";
            closer.onclick = function () {
                TYInfoWindowClose();
                return false;
            };
            container.appendChild(closer);
            container.appendChild(content);
            __ty_closer = closer;
            container.style.width = windowOptions.width + "px";
            container.style.height = windowOptions.height + "px";
            //  container.style.zIndex = 30000;
            content.innerHTML = contentS;
            htmls = container;
        }
        var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
            element: htmls,
            autoPan: true,
            offset: offsetS,
            positioning: "top-left"
        }));

        _map.addOverlay(overlay);
        __ty_overlay = overlay;

        overlay.setPosition(windowOptions.position);

        if (enableCloseOnClickS) {
            __ty_closeinfo = _map.on('click', function (evt) {
                TYInfoWindowClose();
            });
        }

    }
}

/**
 * 关闭提示框
 * @author luwenjun 2016-9-22
 * @returns
 */
var TYInfoWindowClose = function () {
    //if (__ty_overlay)_map.removeOverlay(__ty_overlay);
    if (__ty_overlay) __ty_overlay.setPosition(undefined);
    if (__ty_closeinfo)_map.unByKey(__ty_closeinfo);
    if (__ty_closer) {
        __ty_closer.click();
        __ty_closer.blur();
    }

}

/**
 地图事件
 */
var TYAddMapEvent = function (options) {
    if (_map) {
        var db = _map.on("click", function (e) {
            var r = {location: new GPSLngLat(e.coordinate[0], e.coordinate[1])}
            if (options.callback) options.callback(r);
        });
        _ty_point.push(db);
    }
}

/**
 * 街景地图
 * @param 街景 参数
 * containerId 【要放街景的容器】
 * position TYLngLat 经纬度
 *  * @author luwenjun 20160926
 */
var TYPanorama = function (PanoramaOption) {
    try {
        //console.log(PanoramaOption.position);
        var containerid = PanoramaOption.containerId;
        var lnglat = PanoramaOption.position;
        var coor = ol.proj.toLonLat([lnglat[0], lnglat[1]]);
        TYShowQQOpenStreetView(coor[0], coor[1], coor[0], coor[1], containerid);
    } catch (e) {
        console.log(e.message);
    }
}

//根据参数设置相应街景地图
document.write("<script type='text/javascript' src='http://map.qq.com/api/js?v=2.exp&key=CBYBZ-BVHHX-LLQ4A-7VFUV-NAJPO-VKFKO'></script>")
var _streetViewDiv;
/**
 * 街景地图
 * @param x1, x2, y1, y2, container【要放街景的容器】
 * * @author dongyanan
 */
function TYShowQQOpenStreetView(x1, y1, x2, y2, container) {
    var ishascon = 'yes';
    if (typeof (container) == 'undefined') {
        ishascon = 'no';
    }
    if (_streetViewDiv) {
        container = _streetViewDiv;
        document.getElementById(container).style.display = "false";
    }

    if (typeof (container) == 'undefined') {
        container = TYCeateOpenSteetViewContainer();
        _streetViewDiv = container;
    }
    var panoLatLng = new qq.maps.LatLng(y1, x1);
    document.getElementById(container).innerHTML = "";
    // 创建街景
    var pano = new qq.maps.Panorama(document.getElementById(container));
    var pano_service = new qq.maps.PanoramaService();
    pano_service.getPano(panoLatLng, 200, function (result) {
        if (null != result) {
            pano.setPano(result.svid);
            var alpha = Math.acos((y2 - y1) / Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
            if (x2 - x1 < 0) {
                alpha = Math.PI * 2 - alpha;
            }
            //修改场景的俯仰角
            pano.setPov({
                heading: alpha / Math.PI * 180,
                pitch: 0
            });
        } else {
            document.getElementById(container).innerHTML = "该范围不包含全景";
        }
    });
    if (ishascon == 'no') {
        TYCeateOpenSteetViewContainerCloseButton(container);
    }
}

/**
 * 创建街景地图容器
 * @param container【要放街景的容器】id
 * * @author luwenjun 201601815
 */
function TYCeateOpenSteetViewContainerCloseButton(container) {
    var div = document.getElementById(container);
    var div1 = document.createElement("div");
    div1.style.position = "absolute";
    div1.style.top = "1px";
    div1.style.width = "45px";
    div1.style.height = "15px";
    div1.style.right = "1px";
    div1.style.left = "auto";
    div1.style.textAlign = "center";
    div1.style.verticalAlign = "middle";
    div1.style.zIndex = "100000000000";
    div1.style.backgroundColor = "#73A2d6";
    div1.id = "OpenSteetViewContainer02";
    div1.innerHTML = '<a href="#" style="font-weight:bold;color:#FFFFFF;font-size:12px"  >[关闭]</a>';
    div.appendChild(div1);
    div.onclick = function () {
        div.style.display = "none";
    }
}

/**
 * 创建街景地图容器
 * * @author luwenjun 201601815
 */
function TYCeateOpenSteetViewContainer() {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.bottom = "1px";
    div.style.width = "400px";
    div.style.height = "300px";
    div.style.right = "1px";
    div.style.left = "auto";
    div.style.zIndex = "1100";
    div.id = TYMapRandomString(10);
    div.style.display = "";
    var containerdiv = document.getElementsByClassName("amap-container")[0];
    containerdiv.appendChild(div);
    return div.id;
}

/**
 * 生成随机数
 * @param len 随机数长度
 *  @author luwenjun 20160815
 */
function TYMapRandomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function getSortFun(order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

/**
 * 海量点
 * @param spAsisOptions 空间计算参数对象
 * @author luwenjun 2016-8-18
 * @returns
 */
var TYMassPoint = function (pointOptions) {
    _map.on('pointermove', function (e) {
        var pixel = _map.getEventPixel(e.originalEvent);
        var hit = _map.hasFeatureAtPixel(pixel);
        _map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    if (pointOptions) {
        /*  try {*/
        if (!pointOptions.massPointDatas) {
            console.log("参数缺失");
        }
        //清理
        if (pointOptions.massPointState.isClearOverlay)TYClear();

        var pointFeatureArr = [];
        var __data = pointOptions.massPointDatas;

        var __boxX = __data.sort(getSortFun("asc", "lng"));
        var __boxY = __data.sort(getSortFun("asc", "lat"));

        for (var i in __data) {
            //__boxX.push(__data);
            var style, color, opacity, size, url;

            if (__data[i].opacity) opacity = __data[i].opacity;
            else opacity = 1;

            if (__data[i].color)color = RGBA(__data[i].color, opacity);
            else color = RGBA("#3399CC", 1);

            if (__data[i].url) {
                url = __data[i].url;
            } else {
                url = "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png";
            }

            if (__data[i].size) {
                if (__data[i].size == 4)size = 20;
                if (__data[i].size == 3)size = 15;
                if (__data[i].size == 2)size = 10;
                if (__data[i].size == 1)size = 5;
            } else {
                size = 10;
            }

            if (__data[i].type == 1) {
                style = new ol.style.Style({
                    image: new ol.style.Icon({
                        opacity: opacity,
                        src: url,
                        anchor: [1, 1]
                    })
                });
            } else if (__data[i].type == 2) {
                style = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: size,
                        /* stroke: new ol.style.Stroke({
                         color: '#fff'
                         }),*/
                        fill: new ol.style.Fill({
                            color: color
                        })
                    })
                })
            } else if (__data[i].type == 3) {
                style = new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 5,
                        radius: size,
                        radius2: size / 2,
                        angle: 0,
                        /* stroke: new ol.style.Stroke({
                         color: '#fff'
                         }),*/
                        fill: new ol.style.Fill({
                            color: color
                        })
                    })
                })
            } else if (__data[i].type == 4) {
                style = new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: size,
                        radius2: size / 3,
                        angle: Math.PI / 3,
                        /*  stroke: new ol.style.Stroke({
                         color: '#fff'
                         }),*/
                        fill: new ol.style.Fill({
                            color: color
                        })
                    })
                })
            } else if (__data[i].type == 5) {
                style = new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 4,
                        radius: size,
                        angle: Math.PI / 4,
                        /*   stroke: new ol.style.Stroke({
                         color: '#fff'
                         }),*/
                        fill: new ol.style.Fill({
                            color: color
                        })
                    })
                })
            }
            var coor = ol.proj.fromLonLat([__data[i].lng, __data[i].lat]);
            var geo = new ol.geom.Point(coor);

            var feature = new ol.Feature({
                geometry: geo
            });

            feature.setId(__data[i].id);
            feature.setStyle(style);
            //加属性
            feature.color = __data[i].color;
            feature.opacity = opacity;
            feature.size = size;
            feature.url = url;
            feature.type = __data[i].type;
            pointFeatureArr.push(feature);
        }

        if (pointOptions.massPointState.overlayEvent) {
            var keys__ = _map.on(pointOptions.massPointState.overlayEvent.mouseEvent, function (evt) {
                var feature = _map.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                if (feature) {
                    ___isfuncion(feature)
                }
            });
            _ty_point.push(keys__);
            function ___isfuncion(feature) {
                //console.log(feature);
                var mkNew = new Object();
                var coord = feature.getGeometry().getCoordinates();
                var newcoord = new GPSLngLat(coord[0], coord[1]);
                mkNew.GPSlng = newcoord.GPSLng;
                mkNew.GPSlat = newcoord.GPSLat;
                mkNew.color = feature.color;
                mkNew.id = feature.getId();
                mkNew.opacity = opacity;
                mkNew.size = feature.size;
                mkNew.type = feature.type;
                mkNew.url = feature.url;

                pointOptions.massPointState.overlayEvent.mouseFunc(mkNew);
            }
        }

        var source = new ol.source.Vector({
            features: pointFeatureArr
        });

        var styleCache = {};
        var layerss = new ol.layer.Vector({
            zIndex: 50000,
            updateWhileAnimating: true,
            updateWhileInteracting: true,
            source: source
        });
        _map.addLayer(layerss);
        _ty_cluster.push(layerss);
        //自适应
        var a = ol.proj.fromLonLat([__boxX[0].lng, __boxY[0].lat]);
        var b = ol.proj.fromLonLat([__boxX[__boxX.length - 1].lng, __boxY[__boxY.length - 1].lat]);
        _map.getView().fit([a[0], a[1], b[0], b[1]], _map.getSize());

        /*  } catch (e) {
         console.log(e.message);
         }*/
    }
}

/**
 * 轨迹回放方法
 * @param LocusOption 轨迹回放参数实例
 *  * @author luwenjun 20160817
 */
var _ty_locus;
var animating = false;
var speed, now;
var TYMoveLocus_OL3轨迹回放_ = function (LocusOption) {

    if (LocusOption.locusState.isClearOverlay)TYClear();
    var text, image, offset;
    if (LocusOption.locusData) {
        if (LocusOption.locusData.nodeIcon)image = LocusOption.locusData.nodeIcon;
        if (LocusOption.locusData.label)text = LocusOption.locusData.label.content;
        if (LocusOption.locusData.label)offset = LocusOption.locusData.label.offset;
    }

    var styles = {
        'route': new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 2, color: [237, 212, 0, 0.8]
            })
        }),
        'node': new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                stroke: new ol.style.Stroke({
                    color: RGBA("#ffffff", 1),
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: RGBA("#000000", 0.7)
                })
            })
        }),
        'icon1': new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: image
            }),
            text: new ol.style.Text({
                font: "13px Microsoft Yahei",
                //text: "起点",
                fill: new ol.style.Fill({
                    color: "#aa3300"
                }),
                stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                textAlign: "left"
            })
        }),
        'icon2': new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: image
            }),
            text: new ol.style.Text({
                font: "13px Microsoft Yahei",
                //text: "终点",
                fill: new ol.style.Fill({
                    color: "#aa3300"
                }),
                stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                textAlign: "left"
            })
        }),
        'geoMarker': new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                rotation: 0,
                size: [52, 26],
                src: 'http://webapi.amap.com/images/car.png'
            }),
            text: new ol.style.Text({
                font: "13px Microsoft Yahei",
                text: text,
                fill: new ol.style.Fill({
                    color: "#aa3300"
                }),
                stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                offsetX: offset[0],
                offsetY: offset[1],
                textAlign: "left"
            })
        })
    };

    var locussff = [], star, stop;
    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 5,
            color: [237, 212, 0, 0.8]
        })
    });
    var lineFeature = new ol.Feature(new ol.geom.LineString(LocusOption.locusData.lnglat));
    lineFeature.setId(LocusOption.locusData.locusId);
    lineFeature.setStyle(style);
    locussff.push(lineFeature);

    //节点打印
    var arrLngLat = LocusOption.locusData.lnglat;

    var geoMarker = new ol.Feature({
        type: 'geoMarker',
        geometry: new ol.geom.Point(arrLngLat[0])
    });
    geoMarker.setStyle(styles["geoMarker"]);
    locussff.push(geoMarker);

    for (var i in arrLngLat) {
        //console.log(i)
        if (i > 0 && i < arrLngLat.length - 1) {
            //   var nodeMarker = new ol.Feature({
            //  type: 'node',
            //  geometry:new ol.geom.Point(LocusOption.locusData.lnglat[i])
            //  });
            //  locussff.push(nodeMarker);

        }
        else {
            if (i == 0) {
                var starMarker = new ol.Feature({
                    type: 'icon1',
                    geometry: new ol.geom.Point(arrLngLat[i])
                });
                locussff.push(starMarker);
            } else if (i == arrLngLat.length - 1) {
                var startMarker = new ol.Feature({
                    type: 'icon2',
                    geometry: new ol.geom.Point(arrLngLat[i])
                });
                locussff.push(startMarker);
            }
        }
    }

    var routeCoords = arrLngLat;
    var routeLength = arrLngLat.length;

    var vectorLayer = new ol.layer.Vector({
        zIndex: 50000,
        source: new ol.source.Vector({
            features: locussff
        }),
        style: function (feature) {
            // hide geoMarker if animation is active
            if (feature.get('type') === 'geoMarker')  return null;
            return styles[feature.get('type')];
        }
    });

    _map.addLayer(vectorLayer);
    _ty_cluster.push(vectorLayer);

    if (LocusOption.locusState.overlayEvent) {
        var keys__ = _map.on(LocusOption.locusState.overlayEvent.mouseEvent, function (evt) {
            var feature = _map.forEachFeatureAtPixel(evt.pixel,
                function (feature) {
                    return feature;
                });
            if (feature) {
                var mkNew = new Object();
                var coord = feature.getGeometry().getCoordinates();
                var newcoord = new GPSLngLat(coord[0], coord[1]);
                mkNew.GPSlng = newcoord.GPSLng;
                mkNew.GPSlat = newcoord.GPSLat;

                LocusOption.locusState.overlayEvent.mouseFunc(mkNew);
            }
        });
        _ty_point.push(keys__);
    }

    var min = arrLngLat.sort()[0];
    var max = arrLngLat.sort()[routeLength - 1];
    _map.getView().fit([min[0], min[1], max[0], max[1]], _map.getSize());

    //400米/秒
    var lengthNode = parseInt(formatLength(routeCoords) / 400) / routeCoords.length;
    console.log(routeCoords.length)
    var moveFeature = function (event) {
        // console.log(event)
        var vectorContext = event.vectorContext;
        var frameState = event.frameState;

        if (animating) {
            var elapsedTime = frameState.time - now;
            // here the trick to increase speed is to jump some indexes
            // on lineString coordinates
            var index = Math.round(speed * elapsedTime / 1000);

            if (index >= routeLength) {
                stopAnimation(true);
                return;
            }

            var currentPoint = new ol.geom.Point(routeCoords[index]);
            var feature = new ol.Feature(currentPoint);

            var styleK = styles.geoMarker;
            if (index != routeCoords.length - 1) {
                var targetPos, curPos;
                targetPos = {
                    x: _map.getPixelFromCoordinate(routeCoords[index + 1])[0],
                    y: _map.getPixelFromCoordinate(routeCoords[index + 1])[1]
                };
                curPos = {
                    x: _map.getPixelFromCoordinate(routeCoords[index])[0],
                    y: _map.getPixelFromCoordinate(routeCoords[index])[1]
                };
                var x = Math.abs(targetPos.x - curPos.x);
                var y = Math.abs(targetPos.y - curPos.y);
                var z = Math.sqrt(x * x + y * y);
                var ration = Math.round((Math.asin(y / z) / Math.PI * 180));

                var a = 0;
                if (targetPos.y < curPos.y && targetPos.x == curPos.x) a = 270 // (180 - ration);
                else if (targetPos.y > curPos.y && targetPos.x == curPos.x)a = 90///ration;
                else if (targetPos.y == curPos.y && targetPos.x < curPos.x)a = 180//(180 - ration);
                else if (targetPos.y == curPos.y && targetPos.x > curPos.x)a = 0//ration;
                else if (targetPos.y > curPos.y && targetPos.x > curPos.x)a = ration;
                else if (targetPos.y > curPos.y && targetPos.x < curPos.x)a = 180 - ration;
                else if (targetPos.y < curPos.y && targetPos.x < curPos.x)a = 180 + ration;
                else if (targetPos.y < curPos.y && targetPos.x > curPos.x)a = 360 - ration;

                if (a <= 360 && a >= 0)(styleK.getImage()).setRotation((Math.PI * a) / 180);

            }
            vectorContext.drawFeature(feature, styleK);
        }
        // tell OL3 to continue the postcompose animation
        _map.render();
    };

    function startAnimation() {//alert("开始");
        if (animating) {
            stopAnimation(false);
        } else {
            animating = true;
            now = new Date().getTime();
            speed = lengthNode;
            // hide geoMarker
            geoMarker.setStyle(null);
            // just in case you pan somewhere else
            _map.on('postcompose', moveFeature);
            _map.render();
        }

    }

    function stopAnimation(ended) {//alert("结束");
        animating = false;
        //startButton.textContent = 'Start Animation';
        // if animation cancelled set the marker at the beginning
        var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
        (geoMarker.getGeometry()).setCoordinates(coord);
        geoMarker.setStyle(styles["geoMarker"]);
        //remove listener
        _map.un('postcompose', moveFeature);
    }

    _ty_locus = moveFeature;

    _ty_locus.start = function () {
        startAnimation();
    }
    _ty_locus.stop = function () {
        stopAnimation(false);
    }
    _ty_locus.pause = function () {
        stopAnimation(true);
        //alert((geoMarker.getGeometry()).getId())
        //console.log(geoMarker.getGeometry());
    }

}
var TYMoveLocus = function (LocusOption, isfor) {
    if (_ty_locus) {
        _ty_locus.stop();
    }
    try {

        var _locusState = LocusOption.locusState;
        var _locusData = LocusOption.locusData;
        if (_locusState.isClearOverlay) {
            TYClear(isfor);
        }
        if (!isfor) {
            var _ty_s = [];
            _ty_s.push('TYMoveLocus');
            _ty_s.push(LocusOption);
            _ty_overlays.push(_ty_s);
        }
        _TYDrawLinesAndMarkers(_locusData, _locusState);

        //开启路书
        _ty_locus = new TYMapLib.TYTrack(_map, _locusData.lnglat, {
            defaultContent: _locusData.label,
            autoView: _locusState.isSetView, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
            speed: _locusState.moveSpeed,
            enableRotation: true, //是否设置marker随着道路的走向进行旋转
            circlable: _locusState.circlable,
            func: _locusState.syncEvent
        });

    } catch (e) {
        console.log(e.message);
    }
}

function TYLocusStart() {
    if (_ty_locus)
        _ty_locus.start();
}

function TYLocusStop() {
    if (_ty_locus)
        _ty_locus.stop()
}

function TYLocusPause() {
    if (_ty_locus)
        _ty_locus.pause()
}

function _TYDrawLinesAndMarkers(locusData, _locusState) {
    if (locusData) {
        if (locusData.nodeIcon)image = locusData.nodeIcon;
        if (locusData.label)text = locusData.label.content;
        if (locusData.label)offset = locusData.label.offset;
    }
    if (_locusState)TYClear();
    var styles = {
        'route': new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 2, color: [237, 212, 0, 0.8]
            })
        }),
        'node': new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: RGBA("#ffffff", 1),
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: RGBA("#000000", 0.7)
                })
            })
        }),
        'icon1': new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: image
            }),
            text: new ol.style.Text({
                font: "13px Microsoft Yahei",
                text: "起点",
                fill: new ol.style.Fill({
                    color: "#aa3300"
                }),
                stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                textAlign: "left"
            })
        }),
        'icon2': new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: image
            }),
            text: new ol.style.Text({
                font: "13px Microsoft Yahei",
                text: "终点",
                fill: new ol.style.Fill({
                    color: "#aa3300"
                }),
                stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                textAlign: "left"
            })
        }),
        'geoMarker': new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                rotation: 0,
                size: [52, 26],
                src: 'http://webapi.amap.com/images/car.png'
            }),
            text: new ol.style.Text({
                font: "13px Microsoft Yahei",
                text: text,
                fill: new ol.style.Fill({
                    color: "#aa3300"
                }),
                stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                offsetX: offset[0],
                offsetY: offset[1],
                textAlign: "left"
            })
        })
    };

    var locussff = [], star, stop;
    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 5,
            color: [237, 212, 0, 0.8]
        })
    });
    var lineFeature = new ol.Feature(new ol.geom.LineString(locusData.lnglat));
    lineFeature.setId(locusData.locusId);
    lineFeature.setStyle(style);
    locussff.push(lineFeature);

    //节点打印
    var arrLngLat = locusData.lnglat;

    var arrX = [], arrY = [];
    for (var i in arrLngLat) {
        //console.log(i)
        if (i > 0 && i < arrLngLat.length - 1) {
            var nodeMarker = new ol.Feature({
                type: 'node',
                geometry: new ol.geom.Point(locusData.lnglat[i])
            });
            locussff.push(nodeMarker);
        } else {
            if (i == 0) {
                var starMarker = new ol.Feature({
                    type: 'icon1',
                    geometry: new ol.geom.Point(arrLngLat[i])
                });
                locussff.push(starMarker);
            } else if (i == arrLngLat.length - 1) {
                var startMarker = new ol.Feature({
                    type: 'icon2',
                    geometry: new ol.geom.Point(arrLngLat[i])
                });
                locussff.push(startMarker);
            }
        }
        arrX.push(arrLngLat[i][0]);
        arrY.push(arrLngLat[i][1]);
    }

    var routeCoords = arrLngLat;
    var routeLength = arrLngLat.length;

    var vectorLayer = new ol.layer.Vector({
        zIndex: 50000,
        source: new ol.source.Vector({
            features: locussff
        }),
        style: function (feature) {
            // hide geoMarker if animation is active
            if (feature.get('type') === 'geoMarker')  return null;
            return styles[feature.get('type')];
        }
    });

    _map.addLayer(vectorLayer);
    _ty_cluster.push(vectorLayer);

    //标题
    var mp2 = document.createElement("div");
    mp2.id = "mycar_title";
    mp2.innerHTML = text;

    var title = new ol.Overlay({
        id: "_ty_lj_key_title",
        //autoPan: true,
        position: [arrX[0][0], arrY[0][1]],
        stopEvent: false,
        offset: offset,
        positioning: "bottom-left",
        element: mp2
    });
    _map.addOverlay(title);
    _ty_popup.push(title);

    //视野
    _ty_box(arrX, arrY);

    //添加事件
    if (_locusState.overlayEvent) {
        var keys__ = _map.on(_locusState.overlayEvent.mouseEvent, function (evt) {
            var feature = _map.forEachFeatureAtPixel(evt.pixel,
                function (feature) {
                    return feature;
                });
            if (feature) {
                var mkNew = new Object();
                var coord = feature.getGeometry().getCoordinates();
                var newcoord = new GPSLngLat(coord[0], coord[1]);
                mkNew.lng = newcoord.GPSLng;
                mkNew.lat = newcoord.GPSLat;

                _locusState.overlayEvent.mouseFunc(mkNew);
            }
        });
        _ty_point.push(keys__);
    }
}

function TYCar(lnglat, config) {
    var mp = document.createElement("div");
    mp.id = "mymovecar";
    mp.style.position = "absolute";

    var mimg = document.createElement("img");
    if (config.icon)mimg.src = config.icon;
    mp.appendChild(mimg);

    var TYMarker = new ol.Overlay({
        id: "_ty_lj_key_car",
        stopEvent: false,
        offset: [-26, -13],
        positioning: "center-center",
        element: mp
    });

    TYMarker.setPosition(lnglat);
    //console.log(config);
    TYMarker.setRotation = function (a) {
        if (!isNaN(a)) {
            if (a <= 360 && a >= 0) {
                var x = document.getElementById("mymovecar");
                x.style.transform = "rotate(" + a + "deg)";
            }
        }
    }

    return TYMarker;
}

/**
 * @namespace BMap的所有library类均放在TYMapLib命名空间下
 */
var TYMapLib = window.TYMapLib = TYMapLib || {};
(function () {
    /**
     * @exports TYTrack as TYMapLib.TYTrack
     */
    var TYTrack =
        TYMapLib.TYTrack = function (map, path, opts) {
            if (!path || path.length < 1) {
                return;
            }
            this.ismove = false;
            this._cc = 0;
            this._map = map;
            //存储一条路线
            this._path = path;
            //移动到当前点的索引
            this.i = 0;
            //控制暂停后开始移动的队列的数组
            this._setTimeoutQuene = [];
            //进行坐标转换的类
            // this._projection = this._map.getMapType().getProjection();
            this._opts = {
                icon: null,
                //默认速度 米/秒
                speed: 400,
                defaultContent: ''
            };
            this._setOptions(opts);
            this._rotation = 0; //小车转动的角度

            //如果不是默认实例，则使用默认的icon  instanceof BMap.Icon
            if (!this._opts.icon) {
                this._opts.icon = "http://webapi.amap.com/images/car.png";
            }

        }
    /**
     * 根据用户输入的opts，修改默认参数_opts
     * @param {Json Object} opts 用户输入的修改参数.
     * @return 无返回值.
     */
    TYTrack.prototype._setOptions = function (opts) {
        if (!opts) {
            return;
        }
        for (var p in opts) {
            if (opts.hasOwnProperty(p)) {
                this._opts[p] = opts[p];
            }
        }
    }

    /**
     * @description 开始运动
     * @param none
     * @return 无返回值.
     *
     * @example <b>参考示例：</b><br />
     * TYTrack.start();
     */
    TYTrack.prototype.start = function () {
        this.ismove = true;
        var me = this, len = me._path.length;

        //不是第一次点击开始,并且小车还没到达终点
        if (me.i && me.i < len - 1) {
            //没按pause再按start不做处理
            if (!me._fromPause) {
                return;
            } else if (!me._fromStop) {
                //按了pause按钮,并且再按start，直接移动到下一点
                //并且此过程中，没有按stop按钮
                //防止先stop，再pause，然后连续不停的start的异常
                me._moveNext(++me.i);

            }
        } else {
            //第一次点击开始，或者点了stop之后点开始
            me._addMarker();
            //等待marker动画完毕再加载infowindow
            me._timeoutFlag = setTimeout(function () {
                //弹出窗口
                //me._addInfoWin();
                if (me._opts.defaultContent == "") {
                    //  me.hideInfoWindow();
                }
                me._moveNext(me.i);
            }, 400);
        }
        //重置状态
        this._fromPause = false;
        this._fromStop = false;
    },
    /**
     * 结束运动
     * @return 无返回值.
     *
     * @example <b>参考示例：</b><br />
     * TYTrack.stop();
     */
        TYTrack.prototype.stop = function () {
            this.ismove = false;
            this.i = 0;
            this._fromStop = true;
            clearInterval(this._intervalFlag);
            this._clearTimeout();
            //重置landmark里边的poi为未显示状态
            /*  for (var i = 0, t = this._opts.landmarkPois, len = t.length; i < len; i++) {
             t[i].bShow = false;
             }*/
        };
    /**
     * 暂停运动
     * @return 无返回值.
     */
    TYTrack.prototype.pause = function () {

        clearInterval(this._intervalFlag);

        //标识是否是按过pause按钮
        this._fromPause = true;
        this._clearTimeout();
    };
    /**
     * 隐藏上方overlay
     * @return 无返回值.
     *
     * @example <b>参考示例：</b><br />
     * TYTrack.hideInfoWindow();
     */
    TYTrack.prototype.hideInfoWindow = function () {
        this._overlay._div.style.visibility = 'hidden';
    };
    /**
     * 显示上方overlay
     * @return 无返回值.
     *
     * @example <b>参考示例：</b><br />
     * TYTrack.showInfoWindow();
     */

    TYTrack.prototype.showInfoWindow = function () {
        this._overlay._div.style.visibility = 'visible';
    };


    //TYTrack私有方法
    // TY.prototype.extend(TYTrack.prototype, {
    /**
     * 添加marker到地图上
     * @param {Function} 回调函数.
     * @return 无返回值.
     */
    TYTrack.prototype._addMarker = function (callback) {
        if (this._marker) {
            this.stop();
            this._marker.setMap(null);

            clearTimeout(this._timeoutFlag);
        }
        //移除之前的overlay
        this._overlay && this._overlay.setMap(null);
        var marker = new TYCar(this._path[0], this._opts);
        //this._opts.icon && marker.setIcon(this._opts.icon);


        // this._opts.icon && marker.setIcon(this._opts.icon);
        _map.addOverlay(marker);
        _ty_popup.push(marker);
        //if (this._opts.defaultContent && this._opts.defaultContent != "")
        this._marker = marker;


        // var adiv = this._marker.getIcon().containerDiv;
        //adiv.innerHTML = adiv.innerHTML + "<br/>" + this._opts.defaultContent;


    },
    /**
     * 添加上方overlay
     * @return 无返回值. 暂时无用
     */
        TYTrack.prototype._addInfoWin = function () {
            var me = this;
            //if(me._opts.defaultContent!== ""){
            var overlay = new CustomOverlay(me._marker.getLngLat(), me._opts.defaultContent);

            //将当前类的引用传给overlay。
            overlay.setRelatedClass(this);
            this._overlay = overlay;
            this._map.TYaddOverLay(overlay);

            //}

        },

    /**
     * 计算两点间的距离
     * @param {Point} poi 经纬度坐标A点.
     * @param {Point} poi 经纬度坐标B点.
     * @return 无返回值.
     */
        TYTrack.prototype._getDistance = function (pxA, pxB) {
            return formatLength([pxA, pxB])
        },
        //目标点的  当前的步长,position,总的步长,动画效果,回调
    /**
     * 移动小车
     * @param {Number} poi 当前的步长.
     * @param {Point} initPos 经纬度坐标初始点.
     * @param {Point} targetPos 经纬度坐标目标点.
     * @param {Function} effect 缓动效果.
     * @return 无返回值.
     */
        TYTrack.prototype._move = function (initPos, targetPos, effect, currentCount) {
            var me = this;
            me.ismove = true;
            //当前的帧数
            if (!currentCount)
                currentCount = 0;
            //步长，米/秒
            var timer = 10,
                step = this._opts.speed / (1000 / timer),
            //初始坐标
                init_pos = this._map.getPixelFromCoordinate(initPos),
            //获取结束点的(x,y)坐标
                target_pos = this._map.getPixelFromCoordinate(targetPos),
            //总的步长
                count = Math.round(me._getDistance(init_pos, target_pos) / step);

            //如果小于1直接移动到下一点
            if (count < 1) {
                me._moveNext(++me.i);
                return;
            }
            //两点之间匀速移动 setInterval
            me._intervalFlag = setInterval(function () {
                //两点之间当前帧数大于总帧数的时候，则说明已经完成移动
                if (currentCount >= count) {
                    clearInterval(me._intervalFlag);
                    //移动的点已经超过总的长度
                    if (me.i > me._path.length) {
                        return;
                    }
                    //运行下一个点
                    me._moveNext(++me.i);
                } else {
                    currentCount++;
                    me._cc = currentCount;
                    var x = effect(init_pos[0], target_pos[0], currentCount, count),
                        y = effect(init_pos[1], target_pos[1], currentCount, count),
                        pos = me._map.getCoordinateFromPixel([x, y]);
                    //console.log(pos);
                    //设置marker
                    if (currentCount == 1) {
                        var proPos = null;
                        if (me.i - 1 >= 0) {
                            proPos = me._path[me.i - 1];
                        }
                        if (me._opts.enableRotation == true) {
                            me.setRotation(proPos, initPos, targetPos);
                        }
                        if (me._opts.autoView) {

                        }
                    }

                    var extent = _map.getView().calculateExtent(_map.getSize());
                    var bl = ol.extent.getBottomLeft(extent);
                    var tr = ol.extent.getTopRight(extent);
                    var bb = ol.extent.containsCoordinate([bl[0], bl[1], tr[0], tr[1]], pos);

                    //移动中的label
                    var overs = _map.getOverlayById("_ty_lj_key_title");
                    overs.setPosition(pos);

                    if (!bb) {
                        if (me._opts.autoView) {
                            clearInterval(me._intervalFlag);
                            _map.getView().setCenter(pos);
                            me._move(initPos, targetPos, me._tween.linear);
                        } else {
                            me._marker.setPosition(pos);
                        }
                    } else {
                        me._marker.setPosition(pos);
                    }
                }
            }, timer);
        },

    /**
     *在每个点的真实步骤中设置小车转动的角度
     */
        TYTrack.prototype.setRotation = function (prePos, curPos, targetPos) {
            //console.log(prePos);console.log(curPos);

            var me = this;

            curPos = me._map.getPixelFromCoordinate(curPos);
            targetPos = me._map.getPixelFromCoordinate(targetPos);

            curPos = {x: curPos[0], y: curPos[1]};
            targetPos = {x: targetPos[0], y: targetPos[1]}

            var x = Math.abs(targetPos.x - curPos.x);
            var y = Math.abs(targetPos.y - curPos.y);
            var z = Math.sqrt(x * x + y * y);
            var ration = Math.round((Math.asin(y / z) / Math.PI * 180));
            var a = 0;
            if (targetPos.y < curPos.y && targetPos.x == curPos.x) {
                a = 270; // (180 - ration);
            }
            else if (targetPos.y > curPos.y && targetPos.x == curPos.x)
                a = 90///ration;
            else if (targetPos.y == curPos.y && targetPos.x < curPos.x)
                a = 180//(180 - ration);
            else if (targetPos.y == curPos.y && targetPos.x > curPos.x)
                a = 0//ration;
            else if (targetPos.y > curPos.y && targetPos.x > curPos.x)
                a = ration;
            else if (targetPos.y > curPos.y && targetPos.x < curPos.x)
                a = 180 - ration;
            else if (targetPos.y < curPos.y && targetPos.x < curPos.x)
                a = 180 + ration;
            else if (targetPos.y < curPos.y && targetPos.x > curPos.x)
                a = 360 - ration;
            this._marker.setRotation(a);
            //console.log(a)
            return;

        },

        TYTrack.prototype.linePixellength = function (from, to) {
            return Math.sqrt(Math.abs(from.x - to.x) * Math.abs(from.x - to.x) + Math.abs(from.y - to.y) * Math.abs(from.y - to.y));

        },
        TYTrack.prototype.pointToPoint = function (from, to) {
            return Math.abs(from.x - to.x) * Math.abs(from.x - to.x) + Math.abs(from.y - to.y) * Math.abs(from.y - to.y)
        },

    /**
     * 移动到下一个点
     * @param {Number} index 当前点的索引.
     * @return 无返回值.
     */
        TYTrack.prototype._moveNext = function (index) {
            this.ismove = true;
            if (this._opts.func && this._opts.func != "")
                _opts.func(index);
            var me = this;
            if (index == me._path.length - 1 && me._opts.circlable) {
                index = 0;
                me.i = 0;
            }
            if (index < this._path.length - 1) {
                //判断是否需要屏幕暂停，移动中心
                var ifXYZ1 = me._path[index];
                var ifXYZ2 = me._path[index + 1];

                var extent = _map.getView().calculateExtent(_map.getSize());

                var bl = ol.extent.getBottomLeft(extent);
                var tr = ol.extent.getTopRight(extent);

                tr = [_map.getPixelFromCoordinate(tr)[0] - 30, _map.getPixelFromCoordinate(tr)[1] + 30];
                bl = [_map.getPixelFromCoordinate(bl)[0] + 30, _map.getPixelFromCoordinate(tr)[1] - 30];

                tr = _map.getCoordinateFromPixel(tr);
                bl = _map.getCoordinateFromPixel(bl);

                var extentA = ol.extent.containsCoordinate([bl[0], bl[1], tr[0], tr[1]], ifXYZ1);
                var extentB = ol.extent.containsCoordinate([bl[0], bl[1], tr[0], tr[1]], ifXYZ2);

                //console.log(extentA, extentB);
                if (extentA == false || extentB == false) {
                    if (me._opts.autoView) {
                        clearInterval(_ty_locus._intervalFlag);

                        var centerA = (ifXYZ2[0] - ifXYZ1[0]) / 2 + ifXYZ2[0];
                        var centerB = (ifXYZ2[1] - ifXYZ1[1]) / 2 + ifXYZ2[1];

                        if (extentA == false && extentB == false) {
                            _map.getView().setCenter([centerA, centerB]);
                        }
                        else if (extentA == false) {
                            _map.getView().setCenter(ifXYZ1);
                        }
                        else if (extentB == false) {
                            _map.getView().setCenter(ifXYZ2);
                        } else {
                            console.log("#1005853");
                            return;
                        }
                        setTimeout(function () {
                            me._move(me._path[index], me._path[index + 1], me._tween.linear);
                        }, 100);
                    } else {
                        me._move(me._path[index], me._path[index + 1], me._tween.linear);
                    }
                } else {
                    me._move(me._path[index], me._path[index + 1], me._tween.linear);
                }
            }
        },
    /**
     * 设置小车上方infowindow的内容，位置等
     * @param {Point} pos 经纬度坐标点.
     * @return 无返回值.
     */
        TYTrack.prototype._setInfoWin = function (pos) {
            //设置上方overlay的position
            var me = this;
            if (!me._overlay) {
                return;
            }
            me._overlay.setPosition(pos, me._marker.getIcon().size);
            var index = me._troughPointIndex(pos);
            if (index != -1) {
                clearInterval(me._intervalFlag);
                //  me._overlay.setHtml(me._opts.landmarkPois[index].html);
                me._overlay.setPosition(pos, me._marker.getIcon().getSize());
                me._pauseForView(index);
            } else {
                me._overlay.setHtml(me._opts.defaultContent);
            }
        },
    /**
     * 在某个点暂停的时间
     * @param {Number} index 点的索引.
     * @return 无返回值.
     */
        TYTrack.prototype._pauseForView = function (index) {

            var me = this;
            var t = setTimeout(function () {
                    //运行下一个点
                    me._moveNext(++me.i);
                },
                me._opts.landmarkPois[index].pauseTime * 1000);
            me._setTimeoutQuene.push(t);
        },
        //清除暂停后再开始运行的timeout
        TYTrack.prototype._clearTimeout = function () {
            for (var i in this._setTimeoutQuene) {
                clearTimeout(this._setTimeoutQuene[i]);
            }
            this._setTimeoutQuene.length = 0;
        },
        //缓动效果
        TYTrack.prototype._tween = {
            //初始坐标，目标坐标，当前的步长，总的步长
            linear: function (initPos, targetPos, currentCount, count) {
                var b = initPos, c = targetPos - initPos, t = currentCount,
                    d = count;
                return c * t / d + b;
            }
        },

    /**
     * 否经过某个点的index
     * @param {Point} markerPoi 当前小车的坐标点.
     * @return 无返回值.
     */
        TYTrack.prototype._troughPointIndex = function (markerPoi) {
            var t = this._opts.landmarkPois, distance;
            for (var i = 0, len = t.length; i < len; i++) {
                //landmarkPois中的点没有出现过的话
                if (!t[i].bShow) {
                    distance = markerPoi.distance(new AMap.LngLat(t[i].lng, t[i].lat));
                    //两点距离小于10米，认为是同一个点
                    if (distance < 10) {
                        t[i].bShow = true;
                        return i;
                    }
                }
            }
            return -1;
        }


})();

/**
 * 求多点间距离
 * @param hex
 * @param opacity
 * @author luwenjun 2016-9-22
 * @returns
 */
var formatLength = function (coordinates) {
    var wgs84Sphere = new ol.Sphere(6378137), length = 0;
    var sourceProj = _map.getView().getProjection();
    for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
        var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
        length += wgs84Sphere.haversineDistance(c1, c2);
    }
    return length;
};

/**
 * 求多点间面积
 * @param hex
 * @param opacity
 * @author luwenjun 2016-9-22
 * @returns
 */
var formataArea = function (coordinates) {
    var wgs84Sphere = new ol.Sphere(6378137), area = 0;
    var sourceProj = _map.getView().getProjection();
    var newCoor = [];
    for (var i = 0; i < coordinates.length; i++) {
        newCoor.push(ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326'));
    }
    //console.log(newCoor)
    area = wgs84Sphere.geodesicArea(newCoor);
    return Math.abs(area);
};

/**
 * 行政区域渲染
 * @param AreaRenderOption
 * @author luwenjun 2016-10-10
 * @returns
 */
var TYAreaRender = function (AreaRenderOption, isfor) {
    //清理绘制
    if (AreaRenderOption.renderState.isClearOverlay)TYClear();

    if (!isfor) {
        var _ty_s = [];
        _ty_s.push('TYAreaRender');
        _ty_s.push(AreaRenderOption);
        _ty_overlays.push(_ty_s);
    }

    var level = "100000";
    var _renderDatas = AreaRenderOption.renderDatas;

    if (_renderDatas[0].renderId.substr(2, 4) == "0000") {
        level = "101";
    } else if (_renderDatas[0].renderId.substr(4, 2) == "00")
        level = "102";

    var _renderState = AreaRenderOption.renderState;

    var codeIDs = "", fillcolors = "", lineColors = "";

    for (var i in _renderDatas) {
        codeIDs += _renderDatas[i].renderId + ',';
        fillcolors += _renderDatas[i].fillColor.replace('#', '') + ',';
        lineColors += _renderDatas[i].borderColor.replace('#', '') + ',';
        if (_renderDatas[i].icon && _renderDatas[i].icon != "") {
            _addAreaMarker(_renderDatas[i], _renderState.overlayEvent);
        }
    }
    codeIDs = codeIDs.substring(0, codeIDs.length - 1);
    fillcolors = fillcolors.substring(0, fillcolors.length - 1);
    lineColors = lineColors.substring(0, lineColors.length - 1);

    _addAreaRender(fillcolors, lineColors, codeIDs, level);

    if (_renderState.tileOpacity > 0.4)
        _addAreaRender(fillcolors, lineColors, codeIDs, level);
    if (_renderState.tileOpacity > 0.6)
        _addAreaRender(fillcolors, lineColors, codeIDs, level);
    if (_renderState.isSetView) {
        _map.getView().setCenter(_renderDatas[0].lnglat);
        if (_renderDatas[0].renderId.substr(2, 4) == "0000")
            TYSetLevel(6);
        else if (_renderDatas[0].renderId.substr(4, 2) == "00")
            TYSetLevel(8);
    }
}

/**
 *行政区域渲染中的绘制点的方法
 * @param renderData：行政区域渲染的数据，
 * @param overlayEvent：点的事件
 *  *  * @author luwenjun 20161010
 */
function _addAreaMarker(renderData, overlayEvent) {
    var text, textOffset, size;
    if (renderData.label && renderData.label != '')
        text = renderData.label.content;
    if (renderData.label.offset)
        textOffset = renderData.label.offset;
    if (renderData.icon && renderData.icon != '')
        if (renderData.icon.size)size = renderData.icon.size;

    var style = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            stroke: new ol.style.Stroke({
                color: RGBA("#ffffff", 1),
                width: 3
            }),
            fill: new ol.style.Fill({
                color: RGBA("#FF4500", 0.9)
            })
        }),
        text: new ol.style.Text({
            font: "13px Microsoft Yahei",
            text: text,
            fill: new ol.style.Fill({
                color: "#FF4500"
            }),
            stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
            offsetX: renderData.label.offset[0],
            offsetY: renderData.label.offset[1],
            textAlign: "left"
        })
    });

    if (renderData.icon) {
        style = new ol.style.Style({
            image: new ol.style.Icon({
                opacity: 1,
                src: renderData.icon,
                anchor: [.5, 1]
            })
            /*   text: new ol.style.Text({
             font: "13px Microsoft Yahei",
             text: text,
             fill: new ol.style.Fill({
             color: "#FF4500"
             }),
             stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
             offsetX: renderData.label.offset[0],
             offsetY: renderData.label.offset[1],
             textAlign: "left"
             })*/
        });
        var div = document.createElement("div");
        div.innerHTML = text;
        var popup = new ol.Overlay({
            id: "_ty_lj_key_",
            //autoPan: true,
            stopEvent: false,
            positioning: "center",
            offset: textOffset,
            element: div
        });
        popup.setPosition(renderData.lnglat);

        _map.addOverlay(popup);
        _ty_popup.push(popup);
    }


    var m = new ol.Feature({
        geometry: new ol.geom.Point(renderData.lnglat)
    });

    m.setStyle(style);

    var vectorLayer = new ol.layer.Vector({
        zIndex: 700000,
        source: new ol.source.Vector({
            features: [m]
        })
    });

    _map.addLayer(vectorLayer);
    _ty_cluster.push(vectorLayer);

    if (overlayEvent && overlayEvent != "") {
        var keys__ = _map.on(overlayEvent.mouseEvent, function (evt) {
            var feature = _map.forEachFeatureAtPixel(evt.pixel,
                function (feature) {
                    return feature;
                });
            if (feature) {
                var ll = new GPSLngLat(renderData.lnglat.lng, renderData.lnglat.lat)
                renderData.lnglat = ll;
                if (overlayEvent.mouseFunc) overlayEvent.mouseFunc(renderData);
            }
        });
        _ty_point.push(keys__);
    }
}

/**
 *行政区域渲染中的绘制区域的方法
 * areaColor：颜色字符串，
 * areaOutlineColor：线颜色
 * areaCode：行政编码
 *  *  * @author luwenjun 20161010
 */
function _addAreaRender(areaColor, areaOutlineColor, areaCode, level) {
    var source = new ol.source.XYZ({
        minZoom: 3,
        url: "http://api4.tygps.com:8080/sisserver?config=DISTRICTRENDER&userId=" + level + "&zoom={z}&x={x}&y={y}&areacode=" + areaCode
        + "&areacolor=" + areaColor + "&areaoutlinecolor=" + areaOutlineColor + "&a_k=2b592e22ba43480912bf4063a7f082af2d7cfe858d396f9047754b91e68d992920b521280cd9d351"
    });
    var layer = new ol.layer.Tile({
        zIndex: 600000,
        source: source
    });
    _map.addLayer(layer);
    _ty_cluster.push(layer);
}

/**
 * 实时路况
 * @RType hex
 * @author luwenjun 2016-9-22
 * @returns
 */
var _tracffic_time, _tracffic_layer;
var TYOpenTraffic = function (RType, Rtime) {
    //addtraffic(RType);
    if (_tracffic_time) {
        clearInterval(_tracffic_time);
    }
    _tracffic_t = setInterval(function () {
        addtraffic(RType)
    }, Rtime)
}

function addtraffic(RType) {
    if (_tracffic_layer) {
        _map.removeLayer(_tracffic_layer)
    }

    var source, url;
    if (RType == TYEnumTraffic.TY_TRAFFIC_360) {
        url = "http://map.so.com/app/traffic.php?act=tile&x={x}&y={-y}&z={z}"
    } else if (RType == TYEnumTraffic.TY_TRAFFIC_QQ) {
        url = "http://rtt2a.map.qq.com/rtt/?x={x}&y={y}&z={z}"
    } else if (RType == TYEnumTraffic.TY_TRAFFIC_AMAP) {
        url = "http://map.so.com/app/traffic.php?act=tile&x={x}&y={-y}&z={z}"
    } else if (RType == TYEnumTraffic.TY_TRAFFIC_ISHOW) {
        url = "http://tile4.ishowchina.com/v3/tmc/{z}/{x}/{-y}.png"
    }

    source = new ol.source.XYZ({
        url: url
    });
    var layer = new ol.layer.Tile({
        zIndex: 50000,
        source: source
    });

    _map.addLayer(layer);
    _tracffic_layer = layer;
}

var TYCloseTraffic = function () {
    if (_tracffic_layer) {
        _map.removeLayer(_tracffic_layer)
    }
    clearInterval(_tracffic_time);
}

/**
 * 颜色的转换
 * @param hex
 * @param opacity
 * @author luwenjun 2016-9-22
 * @returns
 */
function RGBA(hex, opacity) {
    if (hex.indexOf("#") == -1) return hex; //如果是“red”格式的颜色值，则不转换。//正则错误，参考后面的PS内容
    var h = hex.charAt(0) == "#" ? hex.substring(1) : hex,
        r = parseInt(h.substring(0, 2), 16),
        g = parseInt(h.substring(2, 4), 16),
        b = parseInt(h.substring(4, 6), 16),
        a = opacity;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

/**
 * 获取最好视野
 * @param __boxX
 * @param __boxY
 * @author luwenjun 2016-9-22
 * @returns
 */
function _ty_box(__boxX, __boxY) {
    try {
        var sort1 = [__boxX.sort()[0], __boxX.sort()[__boxX.sort().length - 1]];
        var sort2 = [__boxY.sort()[0], __boxY.sort()[__boxY.sort().length - 1]];
        _map.getView().fit([sort1[0], sort2[0], sort1[1], sort2[1]], _map.getSize());
    } catch (e) {
        console.log(e.message);
    }
}

/**
 * 瓦片地图url的凭借计算
 * @author luwenjun 2016-09-09
 * @returns
 */
var url_para = function () {
    var url;
    //高德
    if (_ty_layers_id == 2)url = TYEnumMapUrl.TY_GAODE.URL_SL;
    else if (_ty_layers_id == 3)url = TYEnumMapUrl.TY_GAODE.URL_WX;
    //360
    else if (_ty_layers_id == 7)url = TYEnumMapUrl.TY_360.URL_SL;
    //谷歌
    else if (_ty_layers_id == 9)url = TYEnumMapUrl.TY_GOOGLE.URL_SL;
    else if (_ty_layers_id == 10)url = TYEnumMapUrl.TY_GOOGLE.URL_WX;
    else if (_ty_layers_id == 11)url = TYEnumMapUrl.TY_GOOGLE.URL_DX;
    //天地图
    else if (_ty_layers_id == 12)url = TYEnumMapUrl.TY_TIANDITU.URL_SL;
    else if (_ty_layers_id == 13)url = TYEnumMapUrl.TY_TIANDITU.URL_WX;
    //天远
    else if (_ty_layers_id == 14)url = TYEnumMapUrl.TY_TIANYUAN.URL_SL;
    //OL3
    else if (_ty_layers_id == 15) url = TYEnumMapUrl.TY_OL3.URL_SL;
    else if (_ty_layers_id == 16) url = TYEnumMapUrl.TY_OL3.URL_DX;
    else url = TYEnumMapUrl.TY_OL3.URL_SL;
    return url;
}

/**
 * 地图的切换
 * @author luwenjun 2016-09-09
 * @returns
 */
var TYMapTiles = function (TilesOptions) {
    if (_map) {
        //删除已有图层
        for (var i in _ty_source) {
            _map.removeLayer(_ty_source[i]);
        }

        //暂存判断图层是否需要纠偏
        var thisMap = _ty_layers_id;
        var nextMap = TilesOptions.TYMapType;
        //console.log(thisMap+","+nextMap)

        //参数赋值到全局
        if (TilesOptions) {
            _ty_layers_id = TilesOptions.TYMapType;
        }

        //添加图层
        var urlss = url_para(), attr = "", layerArr = [];

        //表示使用系统自带地图服务

        for (var i = 0; i < urlss.length; i++) {
            //加入版权
            if (i == 0) {
                attr = new ol.Attribution({
                    html: _ty_copy
                });
            }

            var layer;
            //如果是wms图层
            if (_ty_layers_id == 14) {
                var wmsSource = new ol.source.TileWMS({
                    attributions: [attr],
                    url: urlss[i],
                    params: {
                        request: "GetMap",
                        layers: "tyall:TYMap_Demo"
                    },
                    serverType: 'geoserver'
                    //crossOrigin: 'anonymous'
                });

                layer = new ol.layer.Tile({
                    zIndex: i,
                    source: wmsSource
                });
            }
            else {
                var source = new ol.source.XYZ({
                    attributions: [attr],
                    url: urlss[i]
                });
                layer = new ol.layer.Tile({
                    zIndex: i,
                    source: source
                });
            }
            _map.addLayer(layer);
            layerArr.push(layer);
        }
        _ty_source = layerArr;


        if ((nextMap >= 12) && (thisMap < 12)) {
            TYClear();
            for (var i = 0; i < _ty_overlays.length; i++) {
                _TYRe(_ty_overlays[i], true);
            }
        } else if ((nextMap < 12) && (thisMap >= 12)) {
            TYClear();
            for (var i = 0; i < _ty_overlays.length; i++) {
                _TYRe(_ty_overlays[i], false);
            }
        }
        // console.log(_map.getLayerGroup().getLayers())
    }
}
//--------------------------↓高德构造函数↓-------------------------//
var src__ty = "http://webapi.amap.com/maps?v=1.3&key=f1ddbd6ae784f34719f5b756c7814422&plugin=AMap.Driving,AMap.DistrictSearch,"
src__ty += "AMap.CustomLayer,AMap.Geocoder,AMap.Heatmap,AMap.Geolocation,AMap.Weather";
document.write("<script type='text/javascript' src=" + src__ty + " ></script>");

/**
 * 行政区域获取 方法
 * DistrictSearchOptions 见下面DistrictSearchOptions实例化类描述
 *  * @author luwenjun 20160818
 */
function TYDistrictSearch(DistrictSearchOptions, isfor) {
    try {
        var amapAdcode = {};
        amapAdcode._district = new AMap.DistrictSearch({//
            subdistrict: 0,   //返回下一级行政区
            extensions: 'all'
        });
        amapAdcode._district.search(DistrictSearchOptions.code, function (status, result) {
            var DS = new Object();
            DS.status = false;
            if (status == "complete") {
                DS.status = true;
                DS.district = new Object();
                var b = result.districtList[0].boundaries;
                var pp = [];
                var p = [];
                for (var k in b) {
                    for (var y in b[k]) {
                        p.push(new GPSLngLat(b[k][y].lng, b[k][y].lat));
                    }
                    pp.push(p);
                }
                DS.district.polyine = pp;// result.districtList[0].boundaries;

                DS.district.citycode = result.districtList[0].citycode;
                DS.district.adcode = result.districtList[0].adcode;
                DS.district.name = result.districtList[0].name;
                DS.district.center = GPS.gcj_decrypt(result.districtList[0].center.lat, result.districtList[0].center.lng);

                if (DistrictSearchOptions.isDrawArea) {
                    if (DistrictSearchOptions.isClearOverlay) {
                        TYClear();// TYClear(isfor);
                    }
                    //切换图层
                    if (!isfor) {
                        var _ty_s = [];
                        _ty_s.push('TYDistrictSearch');
                        _ty_s.push(DistrictSearchOptions);
                        _ty_overlays.push(_ty_s);
                    }

                    var dataa = [];
                    if (result.districtList[0].boundaries) {
                        var polygonFeatureArr = [], __boxX = [], __boxY = [];
                        for (var i = 0, l = result.districtList[0].boundaries.length; i < l; i++) {
                            //生成行政区划polygon
                            var datat = [];
                            for (var j = 0; j < result.districtList[0].boundaries[i].length; j++) {
                                var xyz = GPS.gcj_decrypt(result.districtList[0].boundaries[i][j].lat, result.districtList[0].boundaries[i][j].lng);
                                datat.push(new ol.proj.fromLonLat([xyz.lng, xyz.lat]));

                                var xyzJP = new ol.proj.fromLonLat([result.districtList[0].boundaries[i][j].lng, result.districtList[0].boundaries[i][j].lat]);
                                __boxX.push(xyzJP[0]);
                                __boxY.push(xyzJP[1]);
                            }
                            dataa.push(datat);
                        }


                        var style = new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                width: DistrictSearchOptions.lineWidth,
                                color: RGBA(DistrictSearchOptions.lineColor, DistrictSearchOptions.lineOpacity)
                            }),
                            fill: new ol.style.Fill({
                                color: RGBA(DistrictSearchOptions.fillColor, DistrictSearchOptions.fillOpacity)
                            })
                        });
                        //console.log(dataa[0]);

                        for (var i = 0, l = dataa.length; i < l; i++) {
                            var polygonFeature = new ol.Feature(
                                new ol.geom.Polygon([dataa[i]])
                            );
                            polygonFeature.setStyle(style);
                            polygonFeatureArr.push(polygonFeature);
                        }
                        //console.log(polygonFeatureArr);

                        //添加点
                        var style = new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 7,
                                stroke: new ol.style.Stroke({
                                    color: RGBA("#ffffff", 1),
                                    width: 3
                                }),
                                fill: new ol.style.Fill({
                                    color: RGBA("#FF4500", 0.9)
                                })
                            }),
                            text: new ol.style.Text({
                                font: "13px Microsoft Yahei",
                                text: DS.district.name,
                                offsetX: 15,
                                offsetY: 0,
                                fill: new ol.style.Fill({
                                    color: "#FF4500"
                                }),
                                stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
                                textAlign: "left"
                            })
                        });
                        var feature = new ol.Feature({
                            geometry: new ol.geom.Point(new TYLngLat(result.districtList[0].center.lng, result.districtList[0].center.lat))
                        });

                        feature.setStyle(style);
                        polygonFeatureArr.push(feature);

                        var layers = new ol.layer.Vector({
                            zIndex: 60000,
                            source: new ol.source.Vector({
                                features: polygonFeatureArr
                            })
                        });

                        _map.addLayer(layers);
                        _ty_cluster.push(layers);

                        _ty_box(__boxX, __boxY);

                    }
                }
            }
            if (DistrictSearchOptions.callback) DistrictSearchOptions.callback(DS);

        })
    } catch (e) {
        console.log(e.message);
    }
}

/**
 * 坐标转换方法
 * 支持火星，gps，百度三者互相转换
 * @author luwenjun 20160818
 */
var TYconvertFrom = function (ConvertOptions) {
    if (ConvertOptions) {
        try {
            if (!ConvertOptions.lnglats[0][1]) {
                return convertLngLat(ConvertOptions.oType, ConvertOptions.tType, ConvertOptions.lnglats)

            } else {
                var resarray = new Array();
                for (var i in ConvertOptions.lnglats) {
                    var ll = ConvertOptions.lnglats[i];
                    resarray.push(convertLngLat(ConvertOptions.oType, ConvertOptions.tType, ll));
                }
                return resarray;
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
    else {
        console.log("参数缺失");
    }
}

function convertLngLat(o, t, lnglat) {
    if (o == 1) {
        switch (t) {
            case 2:
                var r = GPS.gcj_encrypt(Number(lnglat[1]), Number(lnglat[0]));
                return [r.lng, r.lat];
            case 3:
                var gcjll = GPS.gcj_encrypt(Number(lnglat[1]), Number(lnglat[0]));
                var r = GPS.bd_encrypt(gcjll.lat, gcjll.lng);

                return [r.lng, r.lat];
        }
    } else if (o == 2) {
        switch (t) {
            case 1:
                var r = GPS.gcj_decrypt(Number(lnglat[1]), Number(lnglat[0]));
                return [r.lng, r.lat]
            case 3:
                var r = GPS.bd_encrypt(Number(lnglat[1]), Number(lnglat[0]));
                return [r.lng, r.lat]
        }
    } else if (o == 3) {
        switch (t) {
            case 1:
                var gcjll = GPS.bd_decrypt(Number(lnglat[1]), Number(lnglat[0]));
                var r = GPS.gcj_decrypt(gcjll.lat, gcjll.lng);
                return [r.lng, r.lat]
            case 2:
                var r = GPS.bd_decrypt(Number(lnglat[1]), Number(lnglat[0]));
                return [r.lng, r.lat]
        }
    }
}

/**
 *天气查询服务方法
 *  data 为WeatherOptions实例化参数
 *   * @author luwenjun 20160818
 */
var TYWeather = function (data) {
    var _district = data.district;
    var _callback = data.callback;

    var weather = new AMap.Weather();
    weather.getLive(_district, function (err, data) {
        var res = new Object();
        res.status = false;
        if (!err) {
            res.status = true;
            res.city = data.city;
            res.weather = data.weather;
            res.temperature = data.temperature;
            res.windDirection = data.windDirection;
            res.windPower = data.windPower;
            res.humidity = data.humidity;
            res.reportTime = data.reportTime;
        }
        if (_callback) _callback(res);
    })

}

/**
 *定位
 * data 见下面参数实体GeolocationOptions
 * author luwenjun 20160823
 */
var TYGeolocation = function (data) {
    TYClear();

    var mapObj = new AMap.Map('iCenter');
    var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        showButton: data.showButton,
        buttonOffset: data.buttonOffset,//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: data.zoomToAccuracy,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        showMarker: data.showMarker,         //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: data.showCircle,
        buttonPosition: data.buttonPosition,
        panToLocation: data.panToLocation
    });
    mapObj.addControl(geolocation);
    geolocation.getCurrentPosition();

    AMap.event.addListener(geolocation, 'complete', function (data2) {
        var result = {
            "status": true,
            "position": data2.position,
            "accuracy": data2.accuracy,
            "info": "ok"
        };
        if (data2.isConverted) {
            result.position = GPS.gcj_decrypt(data2.position.getLat(), data2.position.getLng());
        }
        if (data2.position == null)result.info = "定位失败";
        if (data.callback)data.callback(result);
        if (data.showMarker) {
            _ty_lu(result);
        }
        if (data.showButton) {
            var rem = document.getElementById("geoDingWei");
            if (rem)rem.remove();

            var div = document.createElement("div");
            div.style.position = "absolute";
            div.id = "geoDingWei"
            div.style.left = "6px";
            div.style.top = "260px";
            div.className = "ol-control";//⊕⊙╉╊⇩

            var ddata = data;
            div.addEventListener("click", function () {
                addButtonClick();
            });

            div.innerHTML = "<button type='button' title='定位'><span>•</span></button>";
            var myControl = new ol.control.Control({element: div});
            myControl.setMap(_map);
        }
    });

    AMap.event.addListener(geolocation, 'error', function (s) {
        var result = {
            "status": false,
            "position": null,
            "accuracy": null,
            "info": "定位失败"
        };
        if (data.callback) data.callback(result); //返回定位出错信息
    });

    //绘制点
    function _ty_lu(luwenjun) {
        if (luwenjun.status) {
            if (!luwenjun.position) {
                return;
            }
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({
                        color: '#3399CC'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff',
                        width: 2
                    })
                })
            });

            var llsb = GPS.gcj_encrypt(luwenjun.position.lat, luwenjun.position.lng);
            var xx = llsb.lng;
            var yy = llsb.lat;

            //console.log(xx,yy)
            var ll2 = ol.proj.fromLonLat([xx, yy]);

            var geo = new ol.geom.Point(ll2);

            var feature = new ol.Feature({
                geometry: geo
            });
            feature.setStyle(style);

            var source = new ol.source.Vector({
                features: [feature]
            });
            var layerss = new ol.layer.Vector({
                zIndex: 50000,
                source: source
            });

            _map.addLayer(layerss);
            _ty_cluster.push(layerss);

            TYSetLevel(11);
            if (data.panToLocation)TYSetCenter(ll2);

        }
    }
}

function addButtonClick() {
    TYClear();
    var mapObj = new AMap.Map('iCenter');
    var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000         //超过10秒后停止定位，默认：无穷大
        // showButton: data.showButton,
        // buttonOffset: data.buttonOffset,//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        // zoomToAccuracy: data.zoomToAccuracy,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        // showMarker: data.showMarker,         //定位成功后在定位到的位置显示点标记，默认：true
        // showCircle: data.showCircle,
        // buttonPosition: data.buttonPosition,
        // panToLocation: data.panToLocation
    });
    mapObj.addControl(geolocation);
    geolocation.getCurrentPosition();

    AMap.event.addListener(geolocation, 'complete', function (data2) {
        var result = {
            "status": true,
            "position": data2.position,
            "accuracy": data2.accuracy,
            "info": "ok"
        };
        if (data2.isConverted) {
            result.position = GPS.gcj_decrypt(data2.position.getLat(), data2.position.getLng());
        }
        if (data2.position == null)result.info = "定位失败";

        _ty_lu(result);

        var rem = document.getElementById("geoDingWei");
        if (rem)rem.remove();
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.id = "geoDingWei"
        div.style.left = "6px";
        div.style.top = "260px";
        div.className = "ol-control";//⊕⊙╉╊⇩

        div.addEventListener("click", function () {
            addButtonClick();
        });

        div.innerHTML = "<button type='button' title='定位'><span>•</span></button>";
        var myControl = new ol.control.Control({element: div});
        myControl.setMap(_map);

    });

    AMap.event.addListener(geolocation, 'error', function (s) {
        var result = {
            "status": false,
            "position": null,
            "accuracy": null,
            "info": "定位失败"
        };

    });

    //绘制点
    function _ty_lu(luwenjun) {
        if (luwenjun.status) {
            if (!luwenjun.position) {
                return;
            }
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({
                        color: '#3399CC'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff',
                        width: 2
                    })
                })
            });

            var llsb = GPS.gcj_encrypt(luwenjun.position.lat, luwenjun.position.lng);
            var xx = llsb.lng;
            var yy = llsb.lat;

            //console.log(xx,yy)
            var ll2 = ol.proj.fromLonLat([xx, yy]);

            var geo = new ol.geom.Point(ll2);

            var feature = new ol.Feature({
                geometry: geo
            });
            feature.setStyle(style);

            var source = new ol.source.Vector({
                features: [feature]
            });
            var layerss = new ol.layer.Vector({
                zIndex: 50000,
                source: source
            });

            _map.addLayer(layerss);
            _ty_cluster.push(layerss);

            TYSetLevel(11);
            TYSetCenter(ll2);

        }
    }
}

/**
 * 空间计算
 * @param spAsisOptions 空间计算参数对象
 * @author luwenjun 2016-8-18
 * @returns
 */
var TYSpAsis = function (spAsisOptions) {
    //_ty_driving=true;
    if (spAsisOptions) {
        try {
            if (!spAsisOptions.sisType) {
                console.log("空间计算参数缺失");
            }
            //console.log(spAsisOptions)
            var arr = [];
            //构建信息窗体中显示的内容
            //P_Pgon:点是否在多边形内
            //Line_Sis:测量线
            //PloyGon_Sis:测量面
            if (spAsisOptions.sisType == TYEnumSpAsis.P_PGON) {
                var polyGon = [];
                for (var i in spAsisOptions.polyGon) {
                    polyGon.push(ol.proj.toLonLat([spAsisOptions.polyGon[i][0], spAsisOptions.polyGon[i][1]]));
                }
                // console.log(spAsisOptions)
                if (spAsisOptions.point && spAsisOptions.polyGon) {//计算点是否在多边形内
                    var polygon = new AMap.Polygon({
                        path: polyGon
                    });
                    //console.log(ol.proj.toLonLat([spAsisOptions.point[0],spAsisOptions.point[1]]));
                    return polygon.contains(ol.proj.toLonLat([spAsisOptions.point[0], spAsisOptions.point[1]]));
                }

                console.log("计算缺少参数");
            }
            else if (spAsisOptions.sisType == TYEnumSpAsis.LINE_SIS) {//计算线的长度
                if (spAsisOptions.polyLine) {
                    return formatLength(spAsisOptions.polyLine);
                }
                console.log("计算缺少参数");
            }
            else if (spAsisOptions.sisType == TYEnumSpAsis.PLOYGON_SIS) { //计算面积
                if (spAsisOptions.polyGon) {
                    //console.log(spAsisOptions.polyGon);
                    return formataArea(spAsisOptions.polyGon);
                }
                console.log("计算缺少参数");
            }
        } catch (e) {
            console.log(e.message);
        }
    }
}

/**
 * 正向地理编码
 * @param
 * @author luwenjun 2016-8-18
 * @returns
 */
var TYGetLocation = function (locationOptions) {
    if (locationOptions) {
        try {
            if (!locationOptions.callback || !locationOptions.address || locationOptions.address.replace(/\s/g, '') == '') {
                console.log("地理编码参数缺失");
            }

            var geocoder = new AMap.Geocoder({
                radius: 3000 //范围，默认：500
            });
            geocoder.getLocation(locationOptions.address, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {

                    var arr = [];
                    var geocode = result.geocodes;
                    for (var i = 0; i < geocode.length; i++) {
                        var gps = GPS.gcj_decrypt(geocode[i].location.lat, geocode[i].location.lng);
                        var ge = {
                            adress: geocode[i].formattedAddress,
                            province: geocode[i].addressComponent.province,
                            city: geocode[i].addressComponent.city,
                            citycode: geocode[i].addressComponent.citycode,
                            district: geocode[i].addressComponent.district,
                            GPSLngLat: {
                                GPSLng: gps.lng,
                                GPSLat: gps.lat
                            },
                            acode: geocode[i].adcode,
                            township: geocode[i].addressComponent.township,
                            street: geocode[i].addressComponent.street
                        }
                        arr.push(ge)
                    }
                    var geo = {
                        status: true,
                        count: geocode.length,
                        geocodes: arr
                    }
                    // console.log(geo)
                    if (locationOptions.callback) locationOptions.callback(geo);
                    //返回参数
                } else {
                    console.log("解析失败");
                }

            });


        } catch (e) {
            console.log(e.message);
        }
    }
}

/**
 * 逆向地理编码
 * @param
 * @author luwenjun 2016-8-19
 * @returns
 */
var TYGeoCoder = function (GeoCoderOptions) {
    if (GeoCoderOptions) {
        /* try {*/
        if (!GeoCoderOptions.callback || !GeoCoderOptions.location) {
            console.log("逆向地理编码参数缺失");
        }

        var geocoder = new AMap.Geocoder({
            extensions: "all",
            radius: 1000 //范围，默认：500
        });
        var inputArr = [];
        //判断是否是批量查询
        if (GeoCoderOptions.batch) {
            if (GeoCoderOptions.location.length >= 1) {
                for (var i in GeoCoderOptions.location) {
                    inputArr.push(ol.proj.toLonLat([GeoCoderOptions.location[i][0], GeoCoderOptions.location[i][1]]));// GeoCoderOptions.location[0])
                }
            } else {
                console.log("逆向地理编码参数缺失，必须是数组。");
            }

        } else {
            inputArr.push(ol.proj.toLonLat([GeoCoderOptions.location[0], GeoCoderOptions.location[1]]));//GeoCoderOptions.location;
        }
        //console.log(GeoCoderOptions);
        //console.log(inputArr);
        geocoder.getAddress([
            [114, 37],
            [114, 37.5],
            [114, 37.7]
        ], function (status, result) {
            if (status === 'complete' && result.info === 'OK') { //console.log(result)
                var arr = [], geoArr, geocode = result.regeocodes;

                for (var i = 0; i < geocode.length; i++) {
                    var poi = "", direction = "", distance = "", street = "", streetNumber = "", province = "", city = "", township = "", district = "", LngLat = null;

                    //赋值
                    if (geocode[i].pois[0]) {
                        if (geocode[i].pois[0].name) poi = geocode[i].pois[0].name;
                        if (geocode[i].pois[0].distance) distance = geocode[i].pois[0].distance;
                        if (geocode[i].pois[0].distance) direction = geocode[i].pois[0].direction;
                        //console.log(geocode[i].pois[0].location);
                        if (geocode[i].pois[0]) {
                            if (geocode[i].pois[0].location) {
                                var ll = GPS.gcj_decrypt(geocode[i].pois[0].location.lat, geocode[i].pois[0].location.lng);
                                LngLat = {GPSLng: ll.lng, GPSLat: ll.lat};
                            } else {
                                LngLat = {};
                            }
                        } else {
                            LngLat = {};
                        }
                    }
                    if (geocode[i].addressComponent) {
                        if (geocode[i].addressComponent.street) street = geocode[i].addressComponent.street;
                        if (geocode[i].addressComponent.streetNumber) streetNumber = geocode[i].addressComponent.streetNumber;
                        if (geocode[i].addressComponent.province) province = geocode[i].addressComponent.province;
                        if (geocode[i].addressComponent.city) city = geocode[i].addressComponent.city;
                        if (geocode[i].addressComponent.township) township = geocode[i].addressComponent.township;
                        if (geocode[i].addressComponent.district) district = geocode[i].addressComponent.district;
                    }

                    var description = province + city + district;//+township;

                    //拼接定制详细信息
                    //1.精确描述,省市县+建筑物+距离方向
                    if (GeoCoderOptions.type == TYEnumGeocoder.TY_EXACT_DESC) {
                        if (poi) description += poi;
                        if (direction) description += "向" + direction;
                        if (distance) description += distance + "米";
                    }
                    //2.附近描述,省市县+街区（村庄）+建筑物附近
                    else if (GeoCoderOptions.type == TYEnumGeocoder.TY_NEAR_DESC) {
                        if (street) description += street;
                        if (streetNumber) description += streetNumber;
                        if (poi) description += poi + "附近";
                    }
                    //3.道路附近描述 省市县+道路+街道附近
                    else if (GeoCoderOptions.type == TYEnumGeocoder.TY_ROAD_DESC) {
                        if (street) description += street;
                        if (streetNumber) description += streetNumber;
                        if (township) description += township + "附近";
                    }

                    geoArr = {
                        description: description,
                        Poi: poi,
                        direction: direction,
                        distance: distance,
                        province: province,
                        city: city,
                        township: township,
                        street: street,
                        district: district,
                        GPSLngLat: LngLat
                    }
                    arr.push(geoArr)
                }

                //附近描述,省市县+街区（村庄）+建筑物附近
                //道路附近描述  省市县+道路+街道附近
                var geo = {
                    status: true,
                    geocodes: arr
                }
                //console.log(geo)
                if (GeoCoderOptions.callback) GeoCoderOptions.callback(geo);
                //返回参数
            } else {
                console.log("逆向解析失败");
            }

        });


        /* } catch (e) {
         console.log(e.message);
         }*/
    }
}

/**
 * 导航功能 方法
 * 参数为DrivingOptions 实例化
 * @author luwenjun 20160818
 */
var TYDriving = function (DrivingOptions, isfor) {
    try {
        if (!isfor) {
            var _ty_s = [];
            _ty_s.push('TYDriving');
            _ty_s.push(DrivingOptions);
            _ty_overlays.push(_ty_s);
        }

        var driving = new AMap.Driving({
            policy: DrivingOptions.policy,
            // map: _map,
            panel: DrivingOptions.panelId
        });

        //此处判断图层，入参到高德API需要统一为纠偏坐标
        //起始点
        var ll1 = ol.proj.toLonLat([DrivingOptions.origin[0], DrivingOptions.origin[1]]);
        var ll2 = ol.proj.toLonLat([DrivingOptions.destination[0], DrivingOptions.destination[1]]);
        if (_ty_layers_id >= 12) {
            ll1 = GPS.gcj_encrypt(ll1[1], ll1[0]);
            ll2 = GPS.gcj_encrypt(ll2[1], ll2[0]);

            ll1 = [ll1.lng, ll1.lat];
            ll2 = [ll2.lng, ll2.lat];
        }

        //途经点
        var linePoint = [];
        if (DrivingOptions.passWayPoints) {
            if (_ty_layers_id >= 12) {
                for (var i in DrivingOptions.passWayPoints) {
                    var newline = ol.proj.toLonLat([DrivingOptions.passWayPoints[i][0], DrivingOptions.passWayPoints[i][1]]);
                    var ll = GPS.gcj_encrypt(newline[1], newline[0]);
                    linePoint.push([ll.lng, ll.lat])
                }
            } else {
                for (var i in DrivingOptions.passWayPoints) {
                    var newline = ol.proj.toLonLat([DrivingOptions.passWayPoints[i][0], DrivingOptions.passWayPoints[i][1]]);
                    linePoint.push([newline[0], newline[1]])
                }
            }
        }
        // console.log(ll1,ll2)
        driving.search(ll1, ll2, {
                waypoints: linePoint//途径点
            },
            function (status, result) {
                var DrivingResult = new Object();
                DrivingResult.status = false;
                if (DrivingOptions.callback && DrivingOptions.callback != "") {
                    if (status == "complete") {
                        DrivingResult.status = true;

                        //返回GPS
                        var gps1 = GPS.gcj_decrypt(result.origin.lat, result.origin.lng);
                        gps1 = {"lng": gps1.lng, "lat": gps1.lat};
                        DrivingResult.origin = gps1;
                        var gps2 = GPS.gcj_decrypt(result.destination.lat, result.destination.lng);
                        gps2 = {"lng": gps2.lng, "lat": gps2.lat};
                        DrivingResult.destination = gps2;

                        var route = new Object();
                        route.policy = result.routes[0].policy;
                        route.distance = result.routes[0].distance;
                        route.time = result.routes[0].time;
                        route.steps = [];
                        var a = new Array();
                        for (var i = 0; i < result.routes[0].steps.length; i++) {
                            var tystep = new Object();
                            tystep.start_location = result.routes[0].steps[i].start_location;
                            tystep.end_location = result.routes[0].steps[i].end_location;
                            tystep.instruction = result.routes[0].steps[i].instruction;
                            tystep.action = result.routes[0].steps[i].action;
                            tystep.orientation = result.routes[0].steps[i].orientation;
                            tystep.road = result.routes[0].steps[i].road;
                            tystep.distance = result.routes[0].steps[i].distance;
                            tystep.time = result.routes[0].steps[i].time;
                            var op = result.routes[0].steps[i].path;

                            var p = [];
                            for (var key in op) {
                                var gps = GPS.gcj_decrypt(op[key].lat, op[key].lng);
                                gps = {"GPSLng": gps.lng, "GPSLat": gps.lat};
                                p.push(gps);
                            }
                            tystep.path = p;
                            route.steps.push(tystep);
                            a = a.concat(p);
                        }

                        DrivingResult.paths = a;
                        DrivingResult.routes = route;
                    }
                }
                if (DrivingOptions.callback) DrivingOptions.callback(DrivingResult);

                //绘制路线
                var styles = {
                    'icon1': new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            size: [19, 31],
                            src: "http://webapi.amap.com/theme/v1.3/markers/n/start.png"
                        }),
                        text: new ol.style.Text({
                            font: "13px Microsoft Yahei",
                            text: "起点",
                            fill: new ol.style.Fill({
                                color: "#aa3300"
                            }),
                            offsetX: 15,
                            offsetY: -15,
                            stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                            textAlign: "left"
                        })
                    }),
                    'icon2': new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            size: [19, 31],
                            src: "http://webapi.amap.com/theme/v1.3/markers/n/end.png"
                        }),
                        text: new ol.style.Text({
                            font: "13px Microsoft Yahei",
                            text: "终点",
                            offsetX: 15,
                            offsetY: -15,
                            fill: new ol.style.Fill({
                                color: "#aa3300"
                            }),
                            stroke: new ol.style.Stroke({color: "#fff", width: 2}),
                            textAlign: "left"
                        })
                    })
                };
                var locussff = [], star, stop;
                var style = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width: 5,
                        color: [237, 212, 0, 0.8]
                    })
                });
                var style2 = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width: 5,
                        lineDash: [4, 6],
                        color: RGBA("#cccccc", .8)
                    })
                });

                var arrLngLat = DrivingResult.paths;
                var arrs = [], xx = [], yy = [];
                for (var i in arrLngLat) {
                    //谷歌 高德
                    var lnglat = GPS.gcj_encrypt(arrLngLat[i].GPSLat, arrLngLat[i].GPSLng);
                    var toCoor = ol.proj.fromLonLat([lnglat.lng, lnglat.lat]);
                    //地图纠偏 天地图 天远地图
                    if (_ty_layers_id >= 12) {
                        lnglat = [arrLngLat[i].GPSLng, arrLngLat[i].GPSLat]
                        toCoor = ol.proj.fromLonLat([lnglat[0], lnglat[1]]);
                    }
                    arrs.push(toCoor);
                    xx.push(toCoor[0]);
                    yy.push(toCoor[1]);
                }

                //线路
                var lineFeature = new ol.Feature(new ol.geom.LineString(arrs));
                lineFeature.setStyle(style);
                locussff.push(lineFeature);

                //添加起点虚线
                var start = [DrivingResult.origin.lng, DrivingResult.origin.lat];
                var stop = [DrivingResult.destination.lng, DrivingResult.destination.lat];

                start = GPS.gcj_encrypt(start[1], start[0]);
                stop = GPS.gcj_encrypt(stop[1], stop[0]);
                start = [start.lng, start.lat];
                stop = [stop.lng, stop.lat];

                if (_ty_layers_id >= 12) {
                    start = [DrivingResult.origin.lng, DrivingResult.origin.lat];
                    stop = [DrivingResult.destination.lng, DrivingResult.destination.lat];
                }

                var starPoint = ol.proj.fromLonLat([start[0], start[1]]);
                var stopPoint = ol.proj.fromLonLat([stop[0], stop[1]]);

                var lineFeature2 = new ol.Feature(new ol.geom.LineString(
                    [starPoint, arrs[0]]
                ));
                lineFeature2.setStyle(style2);
                locussff.push(lineFeature2);

                var lineFeature3 = new ol.Feature(new ol.geom.LineString(
                    [stopPoint, arrs[arrs.length - 1]]
                ));
                lineFeature3.setStyle(style2);
                locussff.push(lineFeature3);

                //节点打印
                var icon1 = new ol.Feature({
                    type: 'icon1',
                    geometry: new ol.geom.Point([starPoint[0], starPoint[1]])
                });
                icon1.setStyle(styles["icon1"]);
                locussff.push(icon1);

                var icon2 = new ol.Feature({
                    type: 'icon2',
                    geometry: new ol.geom.Point([stopPoint[0], stopPoint[1]])
                });
                icon2.setStyle(styles["icon2"]);
                locussff.push(icon2);

                var vectorLayer = new ol.layer.Vector({
                    zIndex: 50000,
                    source: new ol.source.Vector({
                        features: locussff
                    })
                });

                _map.addLayer(vectorLayer);
                _ty_cluster.push(vectorLayer);
                _map.getView().fit([xx.sort()[0], yy.sort()[0], xx.sort()[xx.sort().length - 1], yy.sort()[yy.sort().length - 1]], _map.getSize());
                //制作点击效果
                var line = DrivingResult.routes.steps;

                var cll = $(".amap-lib-driving").find("dl").find("dt").each(function (i) {
                    $(this).click(function () {
                        //alert(i)
                        _ty_hdxg2();
                        if (i == 0) {
                            //starPoint
                            _map.getView().setCenter(starPoint);
                        } else if (i == line.length + 1) {
                            _map.getView().setCenter(stopPoint);
                        } else {
                            var x = ol.proj.fromLonLat([line[i - 1].end_location.lng, line[i - 1].end_location.lat]);
                            var y = ol.proj.fromLonLat([line[i - 1].start_location.lng, line[i - 1].start_location.lat]);
                            var acc = [];
                            acc.push(x[0]);
                            acc.push(y[0]);
                            var accc = [];
                            accc.push(x[1]);
                            accc.push(y[1]);
                            _map.getView().fit([acc.sort()[0], accc.sort()[0], acc.sort()[acc.sort().length - 1], accc.sort()[accc.sort().length - 1]], _map.getSize());
                        }
                    })
                });
            })
    } catch (e) {
        console.log(e.message);
    }
}

/**
 * 热力图 方法
 * 参数为DrivingOptions 实例化
 * @author luwenjun 20160818
 */
var TYHeatMap = function (TYHeatMapOption) {
    if (TYHeatMapOption.heatMapState.isClearOverlay) {
        TYClear();
    }
    if (!TYHeatMapOption)console.log("参数缺失");
    if (!TYHeatMapOption.heatMapData.DataSet) {
        console.log("数据缺失");
    }
    var heat = [], addX = [], addY = [];

    for (var i in TYHeatMapOption.heatMapData.DataSet) {
        var ll = ol.proj.fromLonLat([TYHeatMapOption.heatMapData.DataSet[i].lng, TYHeatMapOption.heatMapData.DataSet[i].lat]);
        var feature = new ol.Feature({
            geometry: new ol.geom.Point(ll)
        });
        heat.push(feature);

        addX.push(ll[0]);
        addY.push(ll[1]);
    }

    var source = new ol.source.Vector({
        features: heat
    });

    var gradient = [], radius, zooms = [];
    if (TYHeatMapOption.heatMapData.gradient) {
        gradient[0] = [TYHeatMapOption.heatMapData.gradient[0.5]];
        gradient[1] = [TYHeatMapOption.heatMapData.gradient[0.65]];
        gradient[2] = [TYHeatMapOption.heatMapData.gradient[0.7]];
        gradient[3] = [TYHeatMapOption.heatMapData.gradient[0.9]];
        gradient[4] = [TYHeatMapOption.heatMapData.gradient[1.0]];
        //数据无法统一。。。so。。编写固定数据
    }
    if (TYHeatMapOption.heatMapData.radius) {
        radius = TYHeatMapOption.heatMapData.radius
    }
    if (TYHeatMapOption.heatMapData.zooms) {
        zooms = TYHeatMapOption.heatMapData.zooms;
    }

    var vector = new ol.layer.Heatmap({
        source: source,
        gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],//['#0000FF', '#75D3F8', '#00FF00', '#FFEA00', '#FF0000']
        radius: 15,
        blur: 13,
        zIndex: 60000,
        opacity: 0.5
    });
    _map.addLayer(vector);
    _ty_cluster.push(vector);

    _ty_box(addX, addY);
}
//--------------------------↑高德构造函数↑-------------------------//

/**
 * 地图覆盖物控制-清除覆盖物
 * @author luwenjun 2016-8-16
 * @returns
 */
var TYClear = function (isEdit) {
    //false说明只清除事件
    if (isEdit == false) {
        TYDrawStop(false);
        //清理事件
        if (_ty_point) {
            for (var i in _ty_point) {
                _map.unByKey(_ty_point);
            }
        }
        //清除图形的编辑事件
        if (__ty_interaction) {
            for (var i in __ty_interaction) {
                _map.removeInteraction(__ty_interaction[i]);
            }
        }
        return;
    }
    TYDrawStop(true);//清理手绘事件
    //清理事件
    if (_ty_point) {
        for (var i in _ty_point) {
            _map.unByKey(_ty_point);
        }
    }
    //是否清空
    if (_ty_cluster) {
        for (var i in _ty_cluster) {
            _map.removeLayer(_ty_cluster[i]);
        }
    }
    //清除图形的编辑事件
    if (__ty_interaction) {
        for (var i in __ty_interaction) {
            _map.removeInteraction(__ty_interaction[i]);
        }
    }

    //清理覆盖物，保证label的刷新
    if (_map) {
        if (_ty_popup) {
            for (var i in _ty_popup) {
                //console.log(_ty_popup[i].getId());
                _map.removeOverlay(_ty_popup[i]);
            }
        }
    }
}

/**
 * 删除图形
 * @author luwenjun 2016年10月29日16:23:52
 * @returns
 */
var TYRemove = function (id) {
    var ifRemove = 0;
    try {
        _map.getLayers().forEach(function (e) {
            if (e.getZIndex() > 100) {
                if (e.getSource()) {
                    if (e.getSource().getFeatureById(id)) {
                        ifRemove++;
                        e.getSource().removeFeature(e.getSource().getFeatureById(id));
                    }
                }
            }
        })
        return ifRemove;
    } catch (e) {
        console.log(e.message);
    }
}
//------------------------------↑构造函数 结束↑-----------------------------//

//------------------------------↓基础对象 开始↓-----------------------------//
/**
 * 地理坐标类
 * @param lng 经度
 * @param lat 纬度
 * @author luwenjun 20160909
 * @returns  返回高斯直角坐标xy
 */
function TYLngLat_Normal(lng, lat) {
    return ol.proj.fromLonLat([Number(lng), Number(lat)]);
}

/**
 * 地理坐标类 gps to 火星坐标系
 * @param lng 经度
 * @param lat 纬度
 * @author luwenjun 20160909
 * @returns  返回高斯直角坐标xy
 */
function TYLngLat(lng, lat) {
    if (!_ty_layers_id)console.log("全局参数缺失");
    //除了天远地图和天地图不需要坐标校正，其他都需要
    var lnglat;
    if (_ty_layers_id >= 12) {
        lnglat = {"lng": lng, "lat": lat};
    } else {
        lnglat = GPS.gcj_encrypt(lat, lng);
    }
    //经纬度坐标转换到高斯坐标
    return ol.proj.fromLonLat([lnglat.lng, lnglat.lat]);
}

/**
 *  GPSLngLat
 * @param Lnglat：返回给客户端用户的坐标，GPS，并且需要判断图层
 * @author luwenjun 20160920
 * @returns  GPS对象
 */
function GPSLngLat(lng, lat) {
    //高斯坐标转换到经纬度坐标
    var _l_l = ol.proj.toLonLat([lng, lat]);
    var lnglat;
    if (_ty_layers_id >= 12) {
        lnglat = {"lng": _l_l[0], "lat": _l_l[1]};
    } else {
        lnglat = GPS.gcj_decrypt(_l_l[1], _l_l[0]);
    }
    return {"GPSLng": lnglat.lng, "GPSLat": lnglat.lat};
}

/**
 * 事件对象 TYOverlayEvent
 * @param data 参数对象
 * @param mouseEvent：鼠标事件：枚举类型，
 * @param mouseFunc：触发事件名称 string类型
 * @author luwenjun 20160813
 * @returns  图标对象
 */
function TYOverlayEvent(data) {
    this.mouseEvent = TYEnumEvent.TY_CLICK;
    if (data) {
        if (data.mouseEvent) {
            this.mouseEvent = data.mouseEvent;
        }
        if (data.mouseFunc) {
            this.mouseFunc = data.mouseFunc
        }
    }
}

//------------------------------↑基础对象 结束↑-----------------------------//

//------------------------------↓公共方法 开始↓-----------------------------//

/**
 * 坐标转换
 * @author luwenjun 20160920
 * @returns  坐标转换
 */
var GPS = {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta: function (lat, lng) {
        // Krasovsky 1940
        //
        // a = 6378245.0, 1/f = 298.3
        // b = a * (1 - f)
        // ee = (a^2 - b^2) / a^2;
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        var dLat = this.transformLat(lng - 105.0, lat - 35.0);
        var dLon = this.transformLon(lng - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * this.PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return {'lat': dLat, 'lng': dLon};
    },
    //WGS-84 to GCJ-02
    gcj_encrypt: function (wgsLat, wgsLon) {
        if (this.outOfChina(wgsLat, wgsLon))
            return new TYLngLat_Normal(wgsLon, wgsLat);

        var d = this.delta(wgsLat, wgsLon);
        //return new TYLngLat_Normal(wgsLon + d.lng, wgsLat + d.lat);
        return {"lng": wgsLon + d.lng, "lat": wgsLat + d.lat}
    },
    //GCJ-02 to WGS-84
    gcj_decrypt: function (gcjLat, gcjLon) {
        if (this.outOfChina(gcjLat, gcjLon))
            return {'lat': gcjLat, 'lng': gcjLon};

        var d = this.delta(gcjLat, gcjLon);
        //return new TYLngLat_Normal(gcjLon - d.lng, gcjLat - d.lat);
        return {"lng": gcjLon - d.lng, "lat": gcjLat - d.lat}
    },
    //GCJ-02 to WGS-84 exactly
    gcj_decrypt_exact: function (gcjLat, gcjLon) {
        var initDelta = 0.01;
        var threshold = 0.000000001;
        var dLat = initDelta, dLon = initDelta;
        var mLat = gcjLat - dLat, mLon = gcjLon - dLon;
        var pLat = gcjLat + dLat, pLon = gcjLon + dLon;
        var wgsLat, wgsLon, i = 0;
        while (1) {
            wgsLat = (mLat + pLat) / 2;
            wgsLon = (mLon + pLon) / 2;
            var tmp = this.gcj_encrypt(wgsLat, wgsLon)
            dLat = tmp.lat - gcjLat;
            dLon = tmp.lng - gcjLon;
            if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
                break;

            if (dLat > 0) pLat = wgsLat; else mLat = wgsLat;
            if (dLon > 0) pLon = wgsLon; else mLon = wgsLon;

            if (++i > 10000) break;
        }
        //console.log(i);
        //return new TYLngLat_Normal(wgsLon, wgsLon);
        return {"lng": wgsLon, "lat": wgsLon}
    },
    //GCJ-02 to BD-09
    bd_encrypt: function (gcjLat, gcjLon) {
        var x = gcjLon, y = gcjLat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
        bdLon = z * Math.cos(theta) + 0.0065;
        bdLat = z * Math.sin(theta) + 0.006;
        return {'lat': bdLat, 'lng': bdLon};
    },
    //BD-09 to GCJ-02
    bd_decrypt: function (bdLat, bdLon) {
        var x = bdLon - 0.0065, y = bdLat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
        var gcjLon = z * Math.cos(theta);
        var gcjLat = z * Math.sin(theta);
        return {'lat': gcjLat, 'lng': gcjLon};
    },
    distance: function (latA, logA, latB, logB) {
        var earthR = 6371000;
        var x = Math.cos(latA * Math.PI / 180) * Math.cos(latB * Math.PI / 180) * Math.cos((logA - logB) * Math.PI / 180);
        var y = Math.sin(latA * Math.PI / 180) * Math.sin(latB * Math.PI / 180);
        var s = x + y;
        if (s > 1)
            s = 1;
        if (s < -1)
            s = -1;
        var alpha = Math.acos(s);
        var distance = alpha * earthR;
        return distance;
    },
    outOfChina: function (lat, lng) {
        if (lng < 72.004 || lng > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    },
    transformLat: function (x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon: function (x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    }
};

/**
 * 缓动效果
 * @author luwenjun 20160920
 * @returns  缓动效果
 */
function _ty_hdxg() {
    _ty_hdxg2();
    // var duration = 2000;
    // var start = +new Date();
    // var pan = ol.animation.pan({
    //     duration: duration,
    //     source: /** @type {ol.Coordinate} */ (_map.getView().getCenter()),
    //     start: start
    // });
    // var bounce = ol.animation.bounce({
    //     duration: duration,
    //     resolution: 4 * _map.getView().getResolution(),
    //     start: start
    // });
    // _map.beforeRender(pan, bounce);
}

/**
 * 缓动效果2
 * @author luwenjun 20160920
 * @returns  缓动效果
 */
function _ty_hdxg2() {
    var pan = ol.animation.pan({
        duration: 2000,
        source: (_map.getView().getCenter())
    });
    _map.beforeRender(pan);
}

/**
 * 缓存图层切换
 * @author luwenjun 20160920
 * @returns  缓存图层切换
 */
function _TYRe(a, b) {
    //console.log("缓存绘制中-->>")
    var center = _map.getView().getCenter();
    if (b) {
        center = ol.proj.toLonLat(center);
        center = GPS.gcj_decrypt(center[1], center[0]);
        center = ol.proj.fromLonLat([center.lng, center.lat]);
    } else {
        center = ol.proj.toLonLat(center);
        center = GPS.gcj_encrypt(center[1], center[0]);
        center = ol.proj.fromLonLat([center.lng, center.lat]);
    }
    _map.getView().setCenter(center);

    if (a[0] == "TYDistrictSearch") {
        TYDistrictSearch(a[1], true);
    }
    else if (a[0] == "point") {
        if (b) {
            if (a[1].pointData.length) {
                for (var i = 0; i < a[1].pointData.length; i++) {
                    var point = ol.proj.toLonLat([a[1].pointData[i].lnglat[0], a[1].pointData[i].lnglat[1]]);
                    point = GPS.gcj_decrypt(point[1], point[0]);
                    a[1].pointData[i].lnglat = ol.proj.fromLonLat([point.lng, point.lat]);
                }
            } else {
                var point = ol.proj.toLonLat([a[1].pointData.lnglat[0], a[1].pointData.lnglat[1]]);
                point = GPS.gcj_decrypt(point[1], point[0]);
                a[1].pointData.lnglat = ol.proj.fromLonLat([point.lng, point.lat]);
            }
        } else {
            if (a[1].pointData.length) {
                for (var i = 0; i < a[1].pointData.length; i++) {
                    var point = ol.proj.toLonLat([a[1].pointData[i].lnglat[0], a[1].pointData[i].lnglat[1]]);
                    point = GPS.gcj_encrypt(point[1], point[0]);
                    a[1].pointData[i].lnglat = ol.proj.fromLonLat([point.lng, point.lat]);
                }
            } else {
                var point = ol.proj.toLonLat([a[1].pointData.lnglat[0], a[1].pointData.lnglat[1]]);
                point = GPS.gcj_encrypt(point[1], point[0]);
                a[1].pointData.lnglat = ol.proj.fromLonLat([point.lng, point.lat]);
            }
        }
        a[1].pointState.isSetView = false;
        TYDrawPoint(a[1], true);
    }
    else if (a[0] == "line") {
        if (b) {
            if (a[1].lineData.length) {
                for (var i = 0; i < a[1].lineData.length; i++) {
                    for (var j = 0; j < a[1].lineData[i].lnglat.length; j++) {
                        var line = ol.proj.toLonLat([a[1].lineData[i].lnglat[j][0], a[1].lineData[i].lnglat[j][1]]);
                        line = GPS.gcj_decrypt(line[1], line[0]);
                        a[1].lineData[i].lnglat[j] = ol.proj.fromLonLat([line.lng, line.lat]);
                    }
                }
            } else {
                for (var j = 0; j < a[1].lineData.lnglat.length; j++) {
                    var line = ol.proj.toLonLat([a[1].lineData.lnglat[j][0], a[1].lineData.lnglat[j][1]]);
                    line = GPS.gcj_decrypt(line[1], line[0]);
                    a[1].lineData.lnglat[j] = ol.proj.fromLonLat([line.lng, line.lat]);
                }
            }
        } else {
            if (a[1].lineData.length) {
                for (var i = 0; i < a[1].lineData.length; i++) {
                    for (var j = 0; j < a[1].lineData[i].lnglat.length; j++) {
                        var line = ol.proj.toLonLat([a[1].lineData[i].lnglat[j][0], a[1].lineData[i].lnglat[j][1]]);
                        line = GPS.gcj_encrypt(line[1], line[0]);
                        a[1].lineData[i].lnglat[j] = ol.proj.fromLonLat([line.lng, line.lat]);
                    }
                }
            } else {
                for (var j = 0; j < a[1].lineData.lnglat.length; j++) {
                    var line = ol.proj.toLonLat([a[1].lineData.lnglat[j][0], a[1].lineData.lnglat[j][1]]);
                    line = GPS.gcj_encrypt(line[1], line[0]);
                    a[1].lineData.lnglat[j] = ol.proj.fromLonLat([line.lng, line.lat]);
                }
            }
        }
        a[1].lineState.isSetView = false;
        TYDrawLine(a[1], true);
    }
    else if (a[0] == "rect") {
        if (b) {
            if (a[1].rectangleData.length) {
                for (var i = 0; i < a[1].rectangleData.length; i++) {
                    var tr = ol.proj.toLonLat([a[1].rectangleData[i].t_r_LngLat[0], a[1].rectangleData[i].t_r_LngLat[1]]);
                    var bl = ol.proj.toLonLat([a[1].rectangleData[i].b_l_LngLat[0], a[1].rectangleData[i].b_l_LngLat[1]]);
                    tr = GPS.gcj_decrypt(tr[1], tr[0]);
                    bl = GPS.gcj_decrypt(bl[1], bl[0]);
                    a[1].rectangleData[i].t_r_LngLat = ol.proj.fromLonLat([tr.lng, tr.lat]);
                    a[1].rectangleData[i].b_l_LngLat = ol.proj.fromLonLat([bl.lng, bl.lat]);
                }
            } else {
                var tr = ol.proj.toLonLat([a[1].rectangleData.t_r_LngLat[0], a[1].rectangleData.t_r_LngLat[1]]);
                var bl = ol.proj.toLonLat([a[1].rectangleData.b_l_LngLat[0], a[1].rectangleData.b_l_LngLat[1]]);
                tr = GPS.gcj_decrypt(tr[1], tr[0]);
                bl = GPS.gcj_decrypt(bl[1], bl[0]);
                a[1].rectangleData.t_r_LngLat = ol.proj.fromLonLat([tr.lng, tr.lat]);
                a[1].rectangleData.b_l_LngLat = ol.proj.fromLonLat([bl.lng, bl.lat]);
            }
        } else {
            if (a[1].rectangleData.length) {
                for (var i = 0; i < a[1].rectangleData.length; i++) {
                    var tr = ol.proj.toLonLat([a[1].rectangleData[i].t_r_LngLat[0], a[1].rectangleData[i].t_r_LngLat[1]]);
                    var bl = ol.proj.toLonLat([a[1].rectangleData[i].b_l_LngLat[0], a[1].rectangleData[i].b_l_LngLat[1]]);
                    tr = GPS.gcj_encrypt(tr[1], tr[0]);
                    bl = GPS.gcj_encrypt(bl[1], bl[0]);
                    a[1].rectangleData[i].t_r_LngLat = ol.proj.fromLonLat([tr.lng, tr.lat]);
                    a[1].rectangleData[i].b_l_LngLat = ol.proj.fromLonLat([bl.lng, bl.lat]);
                }
            } else {
                var tr = ol.proj.toLonLat([a[1].rectangleData.t_r_LngLat[0], a[1].rectangleData.t_r_LngLat[1]]);
                var bl = ol.proj.toLonLat([a[1].rectangleData.b_l_LngLat[0], a[1].rectangleData.b_l_LngLat[1]]);
                tr = GPS.gcj_encrypt(tr[1], tr[0]);
                bl = GPS.gcj_encrypt(bl[1], bl[0]);
                a[1].rectangleData.t_r_LngLat = ol.proj.fromLonLat([tr.lng, tr.lat]);
                a[1].rectangleData.b_l_LngLat = ol.proj.fromLonLat([bl.lng, bl.lat]);
            }
        }
        a[1].rectangleState.isSetView = false;
        TYDrawRectangle(a[1], true);
    }
    else if (a[0] == "polygon") {
        if (b) {
            if (a[1].polygonData.length) {
                for (var i = 0; i < a[1].polygonData.length; i++) {
                    for (var j = 0; j < a[1].polygonData[i].lnglat.length; j++) {
                        var polygon = ol.proj.toLonLat([a[1].polygonData[i].lnglat[j][0], a[1].polygonData[i].lnglat[j][1]]);
                        polygon = GPS.gcj_decrypt(polygon[1], polygon[0]);
                        a[1].polygonData[i].lnglat[j] = ol.proj.fromLonLat([polygon.lng, polygon.lat]);
                    }
                }
            } else {
                for (var j = 0; j < a[1].polygonData.lnglat.length; j++) {
                    var polygon = ol.proj.toLonLat([a[1].polygonData.lnglat[j][0], a[1].polygonData.lnglat[j][1]]);
                    polygon = GPS.gcj_decrypt(polygon[1], polygon[0]);
                    a[1].polygonData.lnglat[j] = ol.proj.fromLonLat([polygon.lng, polygon.lat]);
                }
            }
        } else {
            if (a[1].polygonData.length) {
                for (var i = 0; i < a[1].polygonData.length; i++) {
                    for (var j = 0; j < a[1].polygonData[i].lnglat.length; j++) {
                        var polygon = ol.proj.toLonLat([a[1].polygonData[i].lnglat[j][0], a[1].polygonData[i].lnglat[j][1]]);
                        polygon = GPS.gcj_encrypt(polygon[1], polygon[0]);
                        a[1].polygonData[i].lnglat[j] = ol.proj.fromLonLat([polygon.lng, polygon.lat]);
                    }
                }
            } else {
                for (var j = 0; j < a[1].polygonData.lnglat.length; j++) {
                    var polygon = ol.proj.toLonLat([a[1].polygonData.lnglat[j][0], a[1].polygonData.lnglat[j][1]]);
                    polygon = GPS.gcj_encrypt(polygon[1], polygon[0]);
                    a[1].polygonData.lnglat[j] = ol.proj.fromLonLat([polygon.lng, polygon.lat]);
                }
            }
        }
        a[1].polygonState.isSetView = false;
        TYDrawPolygon(a[1], true);
    }
    else if (a[0] == "TYMoveLocus") {
        for (var j = 0; j < a[1].locusData.lnglat.length; j++) {
            var moveLocus = ol.proj.toLonLat([a[1].locusData.lnglat[j][0], a[1].locusData.lnglat[j][1]]);
            if (b) {
                moveLocus = GPS.gcj_decrypt(moveLocus[1], moveLocus[0]);
            } else {
                moveLocus = GPS.gcj_encrypt(moveLocus[1], moveLocus[0]);
            }
            a[1].locusData.lnglat[j] = ol.proj.fromLonLat([moveLocus.lng, moveLocus.lat]);
        }
        a[1].locusState.isSetView = false;
        TYMoveLocus(a[1], true);
    }
    else if (a[0] == "TYAreaRender") {
        for (var j = 0; j < a[1].renderDatas.length; j++) {
            var areaRender = ol.proj.toLonLat([a[1].renderDatas.lnglat[j][0], a[1].renderDatas.lnglat[j][1]]);
            if (b) {
                areaRender = GPS.gcj_decrypt(areaRender[1], areaRender[0]);
            } else {
                areaRender = GPS.gcj_encrypt(areaRender[1], areaRender[0]);
            }
            a[1].renderDatas.lnglat[j] = ol.proj.fromLonLat([areaRender.lng, areaRender.lat]);
        }
        a[1].renderState.isSetView = false;
        TYAreaRender(a[1], true);
    }
    else if (a[0] == "circle") {
        if (a[1].circleData.length) {
            for (var i = 0; i < a[1].circleData.length; i++) {
                var circle = ol.proj.toLonLat([a[1].circleData[i].lnglat[0], a[1].circleData[i].lnglat[1]]);
                if (b) {
                    circle = GPS.gcj_decrypt(circle[1], circle[0]);
                } else {
                    circle = GPS.gcj_encrypt(circle[1], circle[0]);
                }
                a[1].circleData.lnglat[i] = ol.proj.fromLonLat([circle.lng, circle.lat]);
            }
        } else {
            var circle = ol.proj.toLonLat([a[1].circleData.lnglat[0], a[1].circleData.lnglat[1]]);
            if (b) {
                circle = GPS.gcj_decrypt(circle[1], circle[0]);
            } else {
                circle = GPS.gcj_encrypt(circle[1], circle[0]);
            }
            a[1].circleData.lnglat = ol.proj.fromLonLat([circle.lng, circle.lat]);
        }
        a[1].circleState.isSetView = false;
        TYDrawCircle(a[1], true);
    }
    else if (a[0] == "TYDriving__注释__") {
        if (b) {
        } else {
            //点
            var ll1 = ol.proj.toLonLat([a[1].origin[0], a[1].origin[1]]);
            var ll2 = ol.proj.toLonLat([a[1].destination[0], a[1].destination[1]]);

            ll1 = GPS.gcj_encrypt(ll1[1], ll1[0]);
            ll2 = GPS.gcj_encrypt(ll2[1], ll2[0]);

            a[1].origin = ol.proj.fromLonLat([ll1.lng, ll1.lat]);
            a[1].destination = ol.proj.fromLonLat([ll2.lng, ll2.lat]);

            //线段
            if (a[1].passWayPoints) {
                if (a[1].passWayPoints.length > 0) {
                    var pass = [];
                    for (var i in a[1].passWayPoints) {
                        var newline = ol.proj.toLonLat([a[1].passWayPoints[i][0], a[1].passWayPoints[i][1]]);
                        var ll = GPS.gcj_encrypt(newline[1], newline[0]);
                        pass.push(ol.proj.fromLonLat[ll.lng, ll.lat]);
                    }
                    a[1].passWayPoints = pass;
                }
            }
        }
        TYDriving(a[1], true);
    }

}
//------------------------------↑公共方法 结束↑-----------------------------//
/**
 *添加WMS层方法 入参
 *author xinhongchun 2016-11-5 14：40
 */
var TYWMSTilesOptions = function (data) {
    if (data) {
        this.Id = "";
        this.MapType = "";
        this.layers = "";
        this.styles = "";
        this.format = "image/jpeg";
        this.transparent = false;
        this.version = "1.1.1";
        this.srs = "EPSG:4326";
        this.url = "";
        this.IsTile = true;
        if (data.IsTile != null) this.IsTile = data.IsTile;
        if (data.Id != null) this.Id = data.Id;
        if (data.MapType != null) this.MapType = data.MapType;
        if (data.layers != null) this.layers = data.layers;
        if (data.styles != null) this.styles = data.styles;
        if (data.format != null) this.format = data.format;
        if (data.transparent != null) this.transparent = data.transparent;
        if (data.version != null) this.version = data.version;
        if (data.srs != null) this.srs = data.srs;
        if (data.url != null) this.url = data.url;
    }
}
var _ty_wms_array = [];//_ty_canvas_custom,_ty_canvas_url
var TYWMSTiles = function (TYWMSTilesOptions) {
    if (TYWMSTilesOptions.url == undefined || TYWMSTilesOptions.url.trim() == "") {
        return;
    }

    var tm;

    var url = TYWMSTilesOptions.url;
    if (url.indexOf('?') < 0) {
        url += "?";
    }
    if (url.indexOf('http://') < 0) {
        url = "http://" + url;
    }

    if (TYWMSTilesOptions.layers != "") {
        url = url + "layers=" + TYWMSTilesOptions.layers;
    }
    if (TYWMSTilesOptions.version != "") {
        url = url + "&version=" + TYWMSTilesOptions.version;
    }
    if (TYWMSTilesOptions.srs != "") {
        url = url + "&srs=" + TYWMSTilesOptions.srs;
    }
    if (TYWMSTilesOptions.format != "") {
        url = url + "&format=" + TYWMSTilesOptions.format;
    }
    if (TYWMSTilesOptions.styles != "") {
        url = url + "&styles=" + TYWMSTilesOptions.styles;
    }
    if (TYWMSTilesOptions.transparent != "") {
        url = url + "&transparent=" + TYWMSTilesOptions.transparent;
    }
    var source = new ol.source.XYZ({
        tileUrlFunction: function (a) {
            var z = a[0];
            var x = a[1];
            var y = -(a[2] + 1);
            var titleUrl = '';
            var zoom = _map.getView().getZoom();
            var PointConvert = new TransformClassNormal(28, 3);
            var lonlat_0 = PointConvert.pixelToLnglat(0, 256, x, y, zoom);
            var lonlat_2 = PointConvert.pixelToLnglat(256, 0, x, y, zoom);
            var l1 = GPS.gcj_decrypt(lonlat_0.lat, lonlat_0.lng);
            var l2 = GPS.gcj_decrypt(lonlat_2.lat, lonlat_2.lng);
            //var bbox = [l1.lng, l1.lat, l2.lng, l2.lat];
            if (_ty_layers_id >= 12)

                bbox = [lonlat_0.lng, lonlat_0.lat, lonlat_2.lng, lonlat_2.lat];
            else {
                bbox = [l1.lng, l1.lat, l2.lng, l2.lat];
            }
            return url + "&service=WMS&request=GetMap&tiled=true&bbox=" + bbox.join(',') + "&width=256&height=256";
            // return "http://gistest.tygps.com/geoserver/tyall/wms?layers=tyall:200&version=1.1.0&srs=EPSG:4326&format=image/png&transparent=true&service=WMS&request=GetMap&tiled=true&bbox=" + bbox.join(',') + "&width=256&height=256";
            // return titleUrl;
        }
    });
    tm = new ol.layer.Tile({
        zIndex: 999,
        source: source
    });
    _map.addLayer(tm);
    tm.Id = '';
    if (TYWMSTilesOptions.Id != '') {
        tm.Id = TYWMSTilesOptions.Id
    }

    _ty_wms_array.push(tm);

}

var TYRemoveWMSTiles = function (a) {
    if (a) {
        for (var i = 0; i < _ty_wms_array.length; i++) {
            if (_ty_wms_array[i].Id && _ty_wms_array[i].Id == a)
                _map.removeLayer(_ty_wms_array[i]);
        }
    } else {
        for (var i = 0; i < _ty_wms_array.length; i++) {
            _map.removeLayer(_ty_wms_array[i]);
        }
    }
}

function _Math_sinh(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
}

var TransformClassNormal = function (max, min) {


    this.levelMax = max;
    this.levelMin = min;


    /*
     * 某一瓦片等级下瓦片地图X轴(Y轴)上的瓦片数目
     */
    this._getMapSize = function (level) {
        return Math.pow(2, level);
    }

    /*
     * 分辨率，表示水平方向上一个像素点代表的真实距离(m)
     */
    this.getResolution = function (latitude, level) {
        var resolution = 6378137.0 * 2 * Math.PI * Math.cos(latitude) / 256 / this._getMapSize(level);
        return resolution;
    }

    this._lngToTileX = function (longitude, level) {
        var x = (longitude + 180) / 360;
        var tileX = Math.floor(x * this._getMapSize(level));
        return tileX;
    }

    this._latToTileY = function (latitude, level) {
        var lat_rad = latitude * Math.PI / 180;
        var y = (1 - Math.log(Math.tan(lat_rad) + 1 / Math.cos(lat_rad)) / Math.PI) / 2;
        var tileY = Math.floor(y * this._getMapSize(level));

        // 代替性算法,使用了一些三角变化，其实完全等价
        //var sinLatitude = Math.sin(latitude * Math.PI / 180);
        //var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
        //var tileY = Math.floor(y * this._getMapSize(level));

        return tileY;
    }

    /*
     * 从经纬度获取某一级别瓦片坐标编号
     */
    this.lnglatToTile = function (longitude, latitude, level) {
        var o = new Object();
        o.tileX = this._lngToTileX(longitude, level);
        o.tileY = this._latToTileY(latitude, level);

        return o;
    }

    this._lngToPixelX = function (longitude, level) {
        var x = (longitude + 180) / 360;
        var pixelX = Math.round(x * this._getMapSize(level) * 256 % 256);

        return pixelX;
    }

    this._latToPixelY = function (latitude, level) {
        var sinLatitude = Math.sin(latitude * Math.PI / 180);
        var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
        var pixelY = Math.round(y * this._getMapSize(level) * 256 % 256);

        return pixelY;
    }

    /*
     * 从经纬度获取点在某一级别瓦片中的像素坐标
     */
    this.lnglatToPixel = function (longitude, latitude, level) {
        var o = new Object();
        o.pixelX = this._lngToPixelX(longitude, level);
        o.pixelY = this._latToPixelY(latitude, level);

        return o;
    }

    this._pixelXTolng = function (pixelX, tileX, level) {
        var pixelXToTileAddition = pixelX / 256.0;
        var lngitude = (tileX + pixelXToTileAddition) / this._getMapSize(level) * 360 - 180;

        return lngitude;
    }

    this._pixelYToLat = function (pixelY, tileY, level) {
        var pixelYToTileAddition = pixelY / 256.0;
        var latitude = Math.atan(_Math_sinh(Math.PI * (1 - 2 * (tileY + pixelYToTileAddition) / this._getMapSize(level)))) * 180.0 / Math.PI;

        return latitude;
    }

    /*
     * 从某一瓦片的某一像素点到经纬度
     */
    this.pixelToLnglat = function (pixelX, pixelY, tileX, tileY, level) {
        var o = new Object();
        o.lng = this._pixelXTolng(pixelX, tileX, level);
        o.lat = this._pixelYToLat(pixelY, tileY, level);

        return o;
    }
}




