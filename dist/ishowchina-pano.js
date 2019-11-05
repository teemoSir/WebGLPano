/**
* Created by luwenjun on 2018/11/13.
*/
var LeadorPano = {};
var LeadorDMI = {};
var PANO_IMAGE = {} // 图片资源
var PANO_CONFIG = {} // 全景资源配置;
var IMAP_CONFIG = {}; // 地图资源配置
var ARROW_TEXT = {} // 创建箭头画布
var tolerance = 0.01;

//6000*3000
var PANO_ZOOM_6_3 = {
    ZOOM0: { col: 1, row: 1, zom: 0, offset_x: 0, offset_y: -250 },
    ZOOM1: { col: 2, row: 1, zom: 1, offset_x: -274, offset_y: -128 }, //-150
    ZOOM2: { col: 3, row: 2, zom: 2, offset_x: -35.5, offset_y: -256 }, //-300 
    ZOOM3: { col: 6, row: 3, zom: 3, offset_x: -73, offset_y: 0 }, //-100
    ZOOM4: { col: 12, row: 6, zom: 4, offset_x: -152, offset_y: 0}//-200
}

//8000*4000
var PANO_ZOOM_8_4 = {
    ZOOM0: { col: 1, row: 1, zom: 0, offset_x: 0, offset_y: -250 },
    ZOOM1: { col: 2, row: 1, zom: 1, offset_x: -23.3, offset_y: 0 },
    ZOOM2: { col: 4, row: 2, zom: 2, offset_x: -50, offset_y: 0 },
    ZOOM3: { col: 8, row: 4, zom: 3, offset_x: -100, offset_y: 0 },
    ZOOM4: { col: 16, row: 8, zom: 4, offset_x: -152, offset_y: 0 }
}
//5120*2560
var PANO_ZOOM_5_2 = {
    ZOOM0: { col: 1, row: 1, zom: 0, offset_x: 0, offset_y: -250 },
    ZOOM1: { col: 2, row: 1, zom: 1, offset_x: -(256 + 128), offset_y: -(128 + 64) },
    ZOOM2: { col: 3, row: 2, zom: 2, offset_x: -256, offset_y: -(256 + 128) },
    ZOOM3: { col: 5, row: 3, zom: 3, offset_x: 0, offset_y: -256 },
    ZOOM4: { col: 10, row: 5, zom: 4, offset_x: 0, offset_y: 0 }
}

var DMI_ZOOM = {
    ZOOM0: { col: 1, row: 1, zom: 0 },
    ZOOM1: { col: 2, row: 1, zom: 1 },
    ZOOM2: { col: 3, row: 2, zom: 2 },
    ZOOM3: { col: 5, row: 2, zom: 3 },
    ZOOM4: { col: 10, row: 4, zom: 4 }
}


PANO_CONFIG = {
    TWS_PANO_HD: 'http://1.97.81.168:8088/{service-code}/Image3DResourceService/GetImageTile/?clientType=2&ImageID={station-id}&row={row}&col={col}&zoom={z}', // 全景高清格式化地址 000002-X-201303210444250000
    TWS_PANO_COORD_SEARCH: 'http://1.97.81.168:8088/{service-code}/Image3DIndexService/GetStationByCoord/?x={lng}&y={lat}&type={type}&tolerance={tolerance}', // 根据坐标查询全景 116.4114340470&y=39.9069079720
    TWS_PANO_STATION_STEP_SEARCH: 'http://1.97.81.168:8088/{service-code}/Image3DIndexService/GetStationByStep/?StationID={station-id}&step={step}', // ?StationID=005212-0-201408210332080540&step=1
    TWS_PANO_STATION_SEARCH: 'http://1.97.81.168:8088/{service-code}/Image3DIndexService/GetStationByID/?StationID={station-id}', // 根据站点查全景 000271-0-200903140245410789
    TWS_PANO_STATION_JOINTS: 'http://1.97.81.168:8088/{service-code}/Image3DIndexService/GetStationJoints/?stationid={station-id}&return', //&direction={direction}
    TWS_PANO_SOURCE_DATA: 'http://1.97.81.168:8088/{service-code}/Image3DResourceService/GetImageInfo/?imageid={imageid}', //获取元数据信息接口
    TWS_PANO_STATION_INFO: 'http://1.97.81.168:8088/{service-code}/Image3DResourceService/GetImageSize/?imageid={imageid}', // 获取站点信息

    TWS_PANO_MEASURE: 'http://1.97.81.168:8088/{service-code}/Image3DMeasureService/Pixel2Coord/?MeasureType=1&leftimageid={leftimageid}&leftx={leftx}&lefty={lefty}&rightimageid={rightimageid}&rightx={rightx}&righty={righty}&coortype=300&prjtype=313&return', //000073-1-200703200330180146
    TWS_PANO_MARKER_ADD: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/AddImageMarker/?name={name}&tag={tag}&type={type}&symbolguid={symbolguid}&imageid={imageid}&pixshape={pixshape}&geoshape=',
    TWS_PANO_MARKER_UPDATE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/UpdateMarkerSymbol/?name={name}&tag={tag}&type={type}&symbolguid={symbolguid}&imageid={imageid}&pixshape={pixshape}&geoshape=',
    TWS_PANO_MARKER_QUERT_BY_STATIONID: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/SearchImageMarkersByImageID/?imageid={imageid}&position=&pagecount=&return',
    TWS_PANO_MARKER_DELETE_BY_GUID: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/DeleteImageMarker/?guid={guid}&return',

    TWS_PANO_SYMBOL_GET_BY_ID: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/GetMarkerSymbolByGuid/?guid={guid}', //通过唯一标识获取符号信息接口
    TWS_PANO_SYMBOL_ADD: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/AddMarkerSymbol/?name={name}&tag={tag}&format=&return=', //新增符号信息接口
    TWS_PANO_SYMBOL_DELETE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/DeleteMarkerSymbol/?guid={guid}&return=', //删除符号信息接口
    TWS_PANO_SYMBOL_UPDATE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/UpdateMarkerSymbol/?guid={guid}&name={name}&tag={tag}&format=&return=', //修改符号信息接口
    TWS_PANO_SYMBOL_GET_IMAGE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/GetMarkerSymbolFile/?guid={guid}', //获取符号图片接口
    TWS_PANO_SYMBOL_SET_IMAGE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/UpdateMarkerSymbolFile/?guid={guid}', //更新符号图片接口
    //24　新增符号信息接口 http://192.168.60.13:8008/Image3DMarkerService/AddMarkerSymbol/?name=test1&tag=%E5%B8%B8%E8%A7%84&format=&return=[json/xml]

    //25　修改符号信息接口 http://192.168.60.13:8008/Image3DMarkerService/UpdateMarkerSymbol/?guid=7218E959-4180-4E44-A0D1-B7F4DC2CD97D&name=test1&tag=%E5%B8%B8%E8%A7%84&format=& return=[json/xml]

    //26　删除符号信息接口 http://192.168.60.13:8008/Image3DMarkerService/DeleteMarkerSymbol/?guid=ADE0D1BA-0E12-433C-B18A-23030D099F81 &return=[json/xml]

    //28　通过唯一标识获取符号信息接口 http://192.168.60.13:8008/Image3DMarkerService/GetMarkerSymbolByGuid?Guid=04495ae6-8690-491c-a49c-ba13c36eaddb

    //29　获取符号图片接口 http://192.168.60.13:8008/Image3DMarkerService/GetMarkerSymbolFile/?guid=04495ae6-8690-491c-a49c-ba13c36eaddb

    //30　更新符号图片接口 http://192.168.60.13:8008/Image3DMarkerService/UpdateMarkerSymbolFile/?guid=ADE0D1BA-0E12-433C-B18A-23030D099F81& return=[json/xml]

    TWS_PANO_GEO: 'http://1.97.81.202:25001/v3/geo?ak=1e706fc68d966cd554c63a8e800e0daf&address={address}&callback={callback}',
    TWS_PANO_REGEO: 'http://1.97.81.202:25001/v3/rgeo?ak=1e706fc68d966cd554c63a8e800e0daf&location={location}&callback={callback}', // 逆向地理编码
    TWS_PANO_ROUTE: 'http://1.97.81.107:8445/v3/route/car?origin={origin}&destination={destination}&output=json&ak=1e706fc68d966cd554c63a8e800e0daf&callback={callback}'//ec85d3648154874552835438ac6a02b2
};

PANO_IMAGE = {
    ARROW_TXTURE_OUT: 'http://1.97.81.108/example/assets/topo.png',
    ARROW_TXTURE_IN: 'http://1.97.81.108//example/assets/topo_hover.png',
    PIN_RAD: 'http://1.97.81.108//example/assets/pin-red.png',
    LOGO: 'http://1.97.81.108//example/assets/photosphere-logo.gif',
    MARKER_MONKEY: 'http://1.97.81.108//example/assets/monkey.png',
    SECTOR: 'http://1.97.81.108//example/assets/sector.png',
    HD: 'http://1.97.81.108/example/assets/1116895.png',
    MARKER: 'http://1.97.81.108/example/assets/1116127.png',
    CL: 'http://1.97.81.108/example/assets/1116556.png',
    NULLPNG: 'http://1.97.81.108/example/assets/backgroundimg2.png'
}



ARROW_TEXT = {
    '北': getCanvas('北'),
    '东北': getCanvas('东北'),
    '东': getCanvas('东'),
    '东南': getCanvas('东南'),
    '南': getCanvas('南'),
    '西南': getCanvas('西南'),
    '西': getCanvas('西'),
    '西北': getCanvas('西北')
}


/**
* 原始实例
* @param {string} container 容器ID
* @param {object} options 
* @param {bool}   options.navbar 是否支持导航栏 默认false
* @param {bool}   options.keyboard 是否支持在全屏下键盘的操作 默认true
* @param {bool}   options.transition 全景图过渡动画配置
* @param {bool}   options.timeAnim 自动漫游播放 默认false
* @param {bool}   options.fov 控制视野深度 30-90
* @param {bool}   options.lng 控制水平视野方向
* @param {bool}   options.lat 控制垂直视野方向
* @param {bool}   options.loadingImage 视野过渡图片
* @param {bool}   options.loadingTxt  视野过渡文字
* @param {bool}   options.loadShrink  预加载过渡缩略全景 默认 true ,不加载 false
* @param {bool}   options.pluginArrow  是否加载方向指示器 默认true 加载，false不加载
* @param {bool}   options.pluginMasure  是否加载量测控件 默认true加载，false不加载
* @param {bool}   options.latitudeRange  视野限制
* @param {bool}   options.data_type  数据模式
* @return {object} 全景对象
* @author  luwenjun@leader.com.cn
*/
LeadorPano = function(container, options) {

    this._OPTIONS = {};

    this._OPTIONS.navbar = options.navbar || false;

    this._OPTIONS.keyboard = options.keyboard || false;

    this._OPTIONS.transition = options.transition || {
        duration: 100, // 过渡时长
        loader: false // 过渡效果
    }

    this._OPTIONS.timeAnim = options.timeAnim || false;

    this._OPTIONS.fov = options.fov || 90;

    this._OPTIONS.lng = options.lng || 0;

    this._OPTIONS.lat = options.lat || 0;

    //this._OPTIONS.loadingImage = options.loadingImage || PANO_IMAGE.LOGO;

    this._OPTIONS.loadingTxt = options.loadingTxt || 'Loading...';

    this._OPTIONS.loadShrink = options.loadShrink || undefined;

    this._OPTIONS.pluginArrow = options.pluginArrow || undefined;

    //this._OPTIONS.pluginMasure = options.pluginMasure || undefined;

    // 是否加载小地图 默认true加载，false不加载
    // this._OPTIONS.map_tool = options.map_tool || false;

    this._OPTIONS.latitudeRange = options.latitudeRange || [Math.PI / 2, -Math.PI / 3.5].sort();

    // 是否加载标记
    this._OPTIONS.loadMarker = false; //options.loadMarker || undefined;

    // 绘制容器
    if (!container) {
        console.warn('container 缺失.');
    }
    this._OPTIONS.container = container;

    this._OPTIONS.viewType;

    // 全景坐标
    options.position = {
        lng: 116.391243766,
        lat: 39.906103878
    }
    this._OPTIONS.position = options.position;


    /* if (options.position && options.position.lng && options.position.lat) {
    this._OPTIONS.position = options.position;
    }
    */
    if (!this._VIEWER) {
        this.init()
    }



    // 加载
    this.loadPanoByCity();

}



LeadorPano.prototype.loadPanoByCity = function(position) {
    console.info('loadPanoByCity');
    var _this = this;
    //更新坐标
    if (position) this._OPTIONS.position = position;

    this.getReGeo({
        url: PANO_CONFIG.TWS_PANO_REGEO.concat().replace('{location}', this._OPTIONS.position.lng + ',' + this._OPTIONS.position.lat),
        callback: callback
    });

    function callback(data) {
        if (data.status == 0) {

            _this.queryAdCode(data);
            _this._setStationByCoord(callbackByCoord, 0.005);

            function callbackByCoord(data) {
                if (data.Status == 1) {
                    if (data.Station.DataType == 2) {
                        _this.initScenByDMI();
                    } else if (data.Station.DataType == 4) {
                        _this.initScenByPano();
                    }
                } else {
                    if (_this.getLocation().serviceDmi) {
                        _this.initScenByDMI();
                    } else {
                        _this.clearPano();
                        _this.loadDMIPhotoError();
                    }

                }
            }
        } else {
            _this.message('正想地理编码未解析该坐标所属区域', 2000);
            return false;
        }
    }
}

LeadorPano.prototype.loadPanoByCity02 = function(options) {
    var _this = this;

    libLoad();
    function libLoad() {

        _this.adCodeByCity(options.city);

        _this._setStationByCoord(callbackByCoord, 0.005);

        function callbackByCoord(data) {

            //_this.message(data.Message, 500);

            if (data.Status == 1) {
                if (data.Station.DataType == 2) {
                    _this.initScenByDMI();
                }
                else if (data.Station.DataType == 4) {
                    _this.initScenByPano(); // 加载场景
                }

            } else {
                _this.clearPano();
                _this.loadDMIPhotoError();
            }
        }
    }



}






LeadorPano.prototype.loadPanoPlay = function(options, tol) {
    var _this = this;
    this._OPTIONS.position = options;

    //  if (_this.isLoad) {
    //     _this._setStationByCoord(callbackByCoord, 0.005);
    // } else {
    this.getReGeo({
        url: PANO_CONFIG.TWS_PANO_REGEO.concat().replace('{location}', this._OPTIONS.position.lng + ',' + this._OPTIONS.position.lat),
        callback: callback
    });
    //     _this.isLoad = true;
    // }

    function callback(data) {
        if (data.status == 0) {
            _this.queryAdCode(data);
            _this._setStationByCoord(callbackByCoord, 0.005);
        }
    }

    function callbackByCoord(data) {
        if (data.Status == 1) {
            if (data.Station.DataType == 2) {
                _this.initScenByDMI();
            } else if (data.Station.DataType == 4) {
                _this.initScenByPano(); // 加载场景
            }

        } else {
            _this.clearPano();
            _this.loadDMIPhotoError();
        }
    }

}


LeadorPano.prototype.loadPano = function(options, tol) {
    var _this = this;
    this._OPTIONS.position = options;

    // if (_this.isLoad) {
    //   _this._setStationByCoord(callbackByCoord, 0.005);
    // } else {
    this.getReGeo({
        url: PANO_CONFIG.TWS_PANO_REGEO.concat().replace('{location}', this._OPTIONS.position.lng + ',' + this._OPTIONS.position.lat),
        callback: callback
    });
    //     _this.isLoad = true;
    //  }

    function callback(data) {
        if (data.status == 0) {
            _this.queryAdCode(data);
            _this._getStationByCoord(callbackByCoord, 0.005);
        }
    }

    function callbackByCoord(data) {
        if (data.Status == 1) {
            if (data.Station.DataType == 2) {
                _this.initScenByDMI();
            } else if (data.Station.DataType == 4) {
                _this.initScenByPano(); // 加载场景
            }

        } else {
            _this.clearPano();
            _this.loadDMIPhotoError();
        }
    }

}

// 匹配服务器库
LeadorPano.prototype.queryAdCode = function(data) {

    // 新版本 adcidejs  ADCODE
    if (!ADCODE) {
        console.warn('AD_CODE 字典表缺失'); return false;
    }
    if (!data.result || !data.result[0]) {
        console.warn('result 异常'); return false;
    }
    var location = { adCode: data.result[0].addressComponent.adCode,
        cityCode: data.result[0].addressComponent.cityCode,
        city: data.result[0].addressComponent.city,
        district: data.result[0].addressComponent.district,
        province: data.result[0].addressComponent.province,
        street: data.result[0].addressComponent.street,
        street_number: data.result[0].addressComponent.street
    };

    // 中间库查询服务拼音
    //县查询
    for (var i in ADCODE) {
        if (ADCODE[i].adcode.toString() == location.adCode.toString()) {
            location.serviceCode = ADCODE[i].name;
            if (ADCODE[i].type == 'dmi') {
                location.serviceDmi = 'dmi';
            }
            if (ADCODE[i].type == 'pano') {
                location.servicePano = 'pano';
            }
        }
    }


    //市查询
    if (!location.serviceCode) {
        for (var i in ADCODE) {
            if ((ADCODE[i].adcode.toString().substring(0, 4)) === (location.adCode.toString().substring(0, 4))) {
                location.serviceCode = ADCODE[i].name;
                if (ADCODE[i].type == 'dmi') {
                    location.serviceDmi = 'dmi';
                }
                if (ADCODE[i].type == 'pano') {
                    location.servicePano = 'pano';
                }
            }
        }

    }


    //直辖市查询
    if (!location.serviceCode) {
        for (var i in ADCODE) {
            if ((ADCODE[i].adcode.toString().substring(0, 2)) === (location.adCode.toString().substring(0, 2))) {
                location.serviceCode = ADCODE[i].name;
                if (ADCODE[i].type == 'dmi') {
                    location.serviceDmi = 'dmi';
                }
                if (ADCODE[i].type == 'pano') {
                    location.servicePano = 'pano';
                }
            }
        }
    }

    console.log(ADCODE.length + '_ADCODE');

    if (!location.serviceCode) {
        console.warn('ADCODE 字典表缺失');
        return false;
    }
    console.info(location.province + location.city + location.province + location.district + '-' + location.serviceCode + '-' + location.servicePano + '-' + location.serviceDmi);
    this.setLocation(location);

    return this.getLocation();
}


LeadorPano.prototype.adCodeByCity = function(city) {

    var location;

    // 中间库查询服务拼音
    for (var i in ADCODE) {
        if (ADCODE[i].city == city) {

            if (!location) {
                location = {
                    adCode: ADCODE[i].adcode,
                    cityCode: '',
                    city: ADCODE[i].city,
                    district: '',
                    province: '',
                    street: '',
                    serviceCode: ADCODE[i].name,
                    street_number: ''
                }
            }


            if (ADCODE[i].type == 'dmi') {
                location.serviceDmi = 'dmi';
                console.log('serviceDmi')
                /*  this._OPTIONS.position = {
                lng: ADCODE[i].coord.split(',')[0],
                lat: ADCODE[i].coord.split(',')[1]
                }*/
            }
            if (ADCODE[i].type == 'pano') {
                location.servicePano = 'pano';
                console.log('servicePano')
                /* this._OPTIONS.position = {
                lng: ADCODE[i].coord.split(',')[0],
                lat: ADCODE[i].coord.split(',')[1]
                }*/
            }

        }
    }


    console.info(location.province + location.city + location.province + location.district + '-' + location.serviceCode + '-' + location.servicePano + '-' + location.serviceDmi);

    //添加到缓存
    this.setLocation(location);

    return this.getLocation();
}

LeadorPano.prototype.setStationByCoord = function(options, chaotu_callback) {
    var _this = this;
    // 接受参数
    if (options) {
        this._OPTIONS.position = options.position;
    }
    if (!this._OPTIONS.OLD_SERVICES_CODE) {
        this._OPTIONS.OLD_SERVICES_CODE;
    }

    // 坐标使用逆向地理编码解析citycode
    this.getReGeo({
        url: PANO_CONFIG.TWS_PANO_REGEO.concat().replace('{location}', this._OPTIONS.position.lng + ',' + this._OPTIONS.position.lat),
        callback: regeoCallback
    });

    function regeoCallback(data) {
        var location = _this.queryAdCode(data);
        if (location) queryLocation(location);
    }

    function queryLocation(location) {
        // 设置站点
        _this._setStationByCoord(function(data) {
            //_this.message(data.Message, 500);

            if (data.Status == 1) {
                //执行一个
                _this.setStation(data.Station); // 缓存站点 
                queryCamear(location);
            }
        }, null, 0.1)
    }
    function queryCamear(location) {
        //记录相机信息
        if (_this._OPTIONS.OLD_SERVICES_CODE == location.serviceCode) { //如果和上一次code相同
            _this.initScenByPano(); // 加载场景
        } else {
            _this.initScenByPano(); // 加载场景
        }
        _this._OPTIONS.OLD_SERVICES_CODE = location.serviceCode;
    }
}



// 逆向地理编码
LeadorPano.prototype.getReGeo = function(options) {
    if (!options.url || !options.callback) {
        console.warn('参数缺失.');
        return false;
    }

    this.sendJsonp({ url: options.url, callback: callback });

    function callback(data) {

        if (data.status != 0) {
            console.warn(data.message);
            return false;
        }
        options.callback(data);
    }
}
// 地理编码
LeadorPano.prototype.getGeo = function(options) {
    if (!options.address || !options.callback) {
        console.warn('参数缺失.');
        return false;
    }

    var url = PANO_CONFIG.TWS_PANO_GEO.replace('{address}', options.address);
    this.sendJsonp({ url: url, callback: callback });

    function callback(data) {
        options.callback(data);
    }
}


/**
* 方向性箭头的绘制
* @param options
* @param options.panorama 全景地址集合
*/
LeadorPano.prototype._controller = function() {

    //this.loadPlayTool();

    var _this = this, station = this.getStation();

    if (station.DataType == 2) {
        //实景
        loadDmiTool();
    } else if (station.DataType == 4) {
        //全景
        loadPanoTool();
    }

    // 加载标记
    console.info('全景标记加载');
    if (this.getLocation().servicePano) {
        this.queryMarkerByStationID(this.getStation().StationID, function(data) {
            if (data.Status == 1) {
                if (data.ImageMarkers && data.Count > 0) {
                    _this.ImageMarkers = data.ImageMarkers;
                    //加载控件
                    $('#pano_lishi_marker').show();
                }
            }
        })
    }

    function loadPanoTool() {
        $('#icon_arrow').show();
        $("ManY").show();
        //高清资源
        console.info('高清资源加载');
        if (station.DataType == 4) {
            if (_this._OPTIONS.panoDefaultZoom < 2) {
                _this.initScenByPano(2);
            }
        }

        // 箭头工具  
        console.info('方位指示加载开始');
        if (_this._OPTIONS.pluginArrow) {
            _this._pluginArrow();
        }


        //加载其他照片资源控件
        console.info('同位置DMI加载');
        if (_this.getLocation().serviceDmi) {
            $('#pano_dmi_tool_2').show();
        } else {
            //celiang.style.display='none';
            $('#pano_dmi_tool_2').hide();
        }
        $('#pano_dmi_tool_1').hide();

        //dmi影藏容器
        $('#dmi-panel').hide();
        //线路站点播放
        // $('#dmi_play').hide();
    }


    function loadDmiTool() {
        $('#icon_arrow').hide();
        $("ManY").hide();

        //dmi图片容器
        $('#dmi-panel').show();
        //标记隐藏
        $('#pano_lishi_marker').hide();
        //量测
        $('#pano_dmi_tool').show();

        //线路站点播放
        // $('#dmi_play').show();

        //全景

        $('#pano_dmi_tool_2').hide();
        if (_this.getLocation().servicePano) {
            $('#pano_dmi_tool_1').show();

        } else {
            $('#pano_dmi_tool_1').hide();

        }


    }

}





// 后退一步
LeadorPano.prototype.goStationByStep = function(step) {
    var _this = this;
    var station = this.getStation();

    //DMI
    if (station.DataType == 2) {
        station = station.StationID.split('-')[0] + '-0-' + station.StationID.split('-')[2]
        this.setDMIStationStep(station, step, callback);

        function callback(data) {

            if (data.Status == 1) {
                // _this.message(data.Station.Address, 500)
                _this.loadDMIPhoto();
            } else {
                _this.loadDMIPhotoError();
            }
        }

    } else { //全景
        this.setStationStep(station.StationID, step);
    }

}

LeadorPano.prototype.loadDMIPhoto = function(bool) {
    var _this = this;
    this.loadCopyright();

    //如果是播放模式
    if (bool == true) {
        _this._merge2x3Image(callback);
    } else {

        this.setArrow(function() {
            _this._merge2x3Image(callback);
        });
    }

    //给DMI加入标记
    //this.loadMarkers();

    function callback(src) {
        var img = document.getElementById('dmi-image');
        img.src = src;
    }


}

LeadorPano.prototype.loadDMIPhotoError = function() {
    this.message('该区域暂无实景影像，请保证该区域拥有蓝色路网', 500)
    var img = document.getElementById('dmi-image');
    img.src = PANO_IMAGE.NULLPNG;
    this.chaotuMapSetCenter(this._OPTIONS.position);
}




LeadorPano.prototype.reload = function() {

    if (window['pano_time_play']) clearInterval(window['pano_time_play']);
    window['pano_time_play_index'] = 0;
    window['pano_time_play_object'] = null;
    //$('#play_line').css({ 'width': '0.01%' });

    //播放比例
    // $('#play_value').html('{star} {stop}'.replace('{star}', 0.00).replace('{stop}', '%'));
    // $('#pano-play').slideUp();
    $(".cril_tool").hide();
    $('#play_star').attr('data', 0);
    $('#play_star').find('span').html('开始');


    this.loadPanoByCity();
    // 加载

}

LeadorPano.prototype.getDMIImageByType = function(face) {
    var DMIList = this._OPTIONS.DMIList.Sizes;
    var station = this.getStation().StationID;

    var typeid1 = station.split('-')[0];
    var typeid2 = station.split('-')[1];
    var typeid3 = station.split('-')[2];

    //保存当前图像朝向ID
    if (!this._OPTIONS.StationFaceID) {
        this._OPTIONS.StationFaceID = 1;
    }
    var _this = this;

    //console.log(this._OPTIONS.StationFaceID);
    //左 下标怎加一位
    this.setArrow(function() {
        if ((_this._OPTIONS.StationFaceID + face) < 0) {
            _this._OPTIONS.Station.StationID = typeid1 + '-{face}-'.replace('{face}', DMIList[0].CameraNo) + typeid3;
            _this._OPTIONS.StationFaceID = 0;
            _this._merge2x3Image(callback);

        } else if ((_this._OPTIONS.StationFaceID + face) >= DMIList.length) {
            _this._OPTIONS.Station.StationID = typeid1 + '-{face}-'.replace('{face}', DMIList[DMIList.length - 1].CameraNo) + typeid3;
            _this._OPTIONS.StationFaceID = DMIList.length - 1;
            _this._merge2x3Image(callback);
        } else {

            _this._OPTIONS.Station.StationID = typeid1 + '-{face}-'.replace('{face}', DMIList[_this._OPTIONS.StationFaceID + face].CameraNo) + typeid3;
            _this._OPTIONS.StationFaceID = Number(_this._OPTIONS.StationFaceID + face);
            _this._merge2x3Image(callback);

        }
    });

    function callback(src) {
        var img = document.getElementById('dmi-image');
        img.src = src;

    }

}


// 全景站点获取
LeadorPano.prototype.getStationByID = function(station, callback) {
    var url = PANO_CONFIG.TWS_PANO_STATION_SEARCH.concat()
        .replace('{station-id}', station)
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano)
        .replace('-X-', '-0-');

    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (callback) callback(data);
        }
    })
}

// 
/**
* 设置站点本地信息
* @param {object} options 填充你地理数据 
*/
LeadorPano.prototype.setLocation = function(options) {
    this._OPTIONS.location = options;
}

// 
/**
* 获得站点本地信息
*/
LeadorPano.prototype.getLocation = function() {
    return this._OPTIONS.location;
}


/**
* 鼠标量测区域绘制
* */
LeadorPano.prototype._pluginMap = function(options) {
    var _this = this;

    function _panoMarker() {
        //删除标记
        if (_this._PANO_MAP._MONKEY_MARKER) {
            _this._PANO_MAP.getOverlayLayer().removeOverlay(_this._PANO_MAP._MONKEY_MARKER);
        }

        //添加标记
        this._marker = new IMAP.MarkerOptions();
        this._marker.editabled = true;
        this._marker.anchor = IMAP.Constants.BOTTOM_CENTER;
        this._marker.title = '拖动改变位置'
        this._marker.icon = new IMAP.Icon(PANO_IMAGE.MARKER_MONKEY, {
            'size': new IMAP.Size(25, 29),
            'offset': new IMAP.Pixel(0, 0)
        });
        this.lnglat = { lng: _this._OPTIONS.Station.LonLatShape.X, lat: _this._OPTIONS.Station.LonLatShape.Y }
        _this._PANO_MAP._MONKEY_MARKER = new IMAP.Marker(this.lnglat, this._marker);
        _this._PANO_MAP._MONKEY_MARKER.addEventListener('dragend', _panoEventDragend);

        //MONKEY_MARKER.setLabel('京Q-8382233', IMAP.Constants.RIGHT_TOP, new IMAP.Pixel(0,0));
        _this._PANO_MAP.getOverlayLayer().addOverlay(_this._PANO_MAP._MONKEY_MARKER, true);
        _this._PANO_MAP.setCenter(this.lnglat);

    }

    function _panoReadNetwork() {
        //蓝色路网加载
        var tileLayer = new IMAP.TileLayer({
            maxZoom: 18,
            minZoom: 1,
            tileSize: 256,
            baseUrl: PANO_CONFIG.READ_NETWORK.concat()
        });

        _this._PANO_MAP.addLayer(tileLayer);
    }

    function _panoContainer(width, height) {
        this._ele = document.createElement('div');
        this._ele.id = _this.getRandom('pano_map');
        this._ele.style = ' position: absolute;right: 5px;bottom: 5px;width: {w}px;height: {h}px;cursor: pointer;z-index: 100000;border:1px solid #999'.replace('{w}', width).replace('{h}', height)
        _this._VIEWER.container.appendChild(this._ele);
        return this._ele.id;
    }

    function _panoMap(container) {
        _this._PANO_MAP = new IMAP.Map(container, {
            minZoom: 3, //最小地图级别
            maxZoom: 18, //最大地图级别
            zoom: 12, //初始化级别
            center: new IMAP.LngLat(_this._OPTIONS.Station.LonLatShape.X, _this._OPTIONS.Station.LonLatShape.Y)//中心点坐标
        });
    }

    function _panoSector(container) {
        // 添加扇形
        this.coord = _this._PANO_MAP.lnglatToPixel(_this._PANO_MAP._MONKEY_MARKER.getPosition());
        this.img = document.createElement('img');
        this.img.src = PANO_IMAGE.SECTOR;
        this.img.style = 'position:absolute;width:40px;z-index:1000;opacity: 0.7;left:{location}px;top:{t}px'.replace('{location}', this.coord.x - 20).replace('{t}', this.coord.y - 30);
        this.addele = document.getElementById(container);
        this.addele.appendChild(this.img);
        _this._PANO_MAP._SECTOR = this.img;

        // 加入监控时刻刷新扇形方位指示
        _this._VIEWER.on('position-updated', _positionUpdated)
    }

    function _positionUpdated(lnglat) {
        var angle = (180 / Math.PI * lnglat.longitude) - _this._OPTIONS.Station.Yaw;
        _this._PANO_MAP._SECTOR.style.transform = 'rotate({r}deg)'.replace('{r}', angle);
        _this._PANO_MAP._SECTOR.style.transformOrigin = '50% 100%';
    }

    function _panoEvent() {
        _this._PANO_MAP.addEventListener(IMAP.Constants.CLICK, _panoEventClick);
        _this._PANO_MAP.addEventListener(IMAP.Constants.MOVE_START, _mapEventMoveStart);
        _this._PANO_MAP.addEventListener(IMAP.Constants.MOVE_END, _mapEventMoveEnd);
        _this._PANO_MAP.addEventListener(IMAP.Constants.ZOOM_START, _mapEventMoveStart);
        _this._PANO_MAP.addEventListener(IMAP.Constants.ZOOM_END, _mapEventMoveEnd);
    }

    var container = _panoContainer(300, 250);
    _panoMap(container);
    _panoMarker();
    _panoReadNetwork();
    _panoSector(container);
    _panoEvent();

    function _panoEventClick(event) {
        // 设置图标中心
        _this._PANO_MAP._MONKEY_MARKER.setPosition(event.lnglat);

        // 设置地图中心
        _this._PANO_MAP.setCenter(event.lnglat);

        // 根据坐标加载全景
        _this.updatePanoByCoord(event.lnglat, panoByCoord)
    }

    function panoByCoord(data) {
        if (!data.StationID || data.status) {
            _this.message('此区域暂无全景', 1000);
            return false;
        }
        _this._OPTIONS.Station.StationID = data.StationID;
        _this._OPTIONS.loadShrink = true;
        if (!data.LonLatShape) {
            _this._PANO_MAP._MONKEY_MARKER.setPosition({ lng: data.LonLatShape.X, lat: data.LonLatShape.Y })
        }
        _this.initScenByPano();
    }

    function _panoEventDragend(event) {
        // 设置地图中心
        _this._PANO_MAP.setCenter(event.lnglat);

        // 根据坐标加载全景
        _this.updatePanoByCoord(event.lnglat, panoByCoord)
    }

    function _mapEventMoveEnd() {
        this.coord = _this._PANO_MAP.lnglatToPixel(_this._PANO_MAP._MONKEY_MARKER.getPosition());
        _this._PANO_MAP._SECTOR.style.top = this.coord.y - 30 + 'px';
        _this._PANO_MAP._SECTOR.style.left = this.coord.x - 20 + 'px';
        _this._PANO_MAP._SECTOR.style.display = '';
    }

    function _mapEventMoveStart() {
        _this._PANO_MAP._SECTOR.style.display = 'none';
    }
}

/**
* 鼠标量测区域绘制
* */
LeadorPano.prototype._pluginMasure = function() {
    //console.log(options)
    var options = this._OPTIONS.Station;
    if (!options) {
        console.warn('参数缺失');
        return false;
    }

    //bug init
    this._addPanel({
        panel_x: 0,
        panel_y: 0,
        rotation: 0
    });

    // 鼠标量测区域绘制
    if (options.JunctionItems) {
        var index = 0;
        while (index < options.JunctionItems.length) {
            this._addPanel({
                panel_x: 50,
                panel_y: 100,
                rotation: (Math.PI / 180 * options.JunctionItems[index].Angle)
            });
            index++;
        }
        if (index >= 3 && options.Next) {
            this._addPanel({
                panel_x: 50,
                panel_y: 100,
                rotation: (Math.PI / 180 * 180)
            });
        }
    } else {
        // 非交叉口只有前后
        if (options.Previous) {
            this._addPanel({
                panel_x: 50,
                panel_y: 100,
                rotation: 0
            });
        }
        if (options.Next) {
            this._addPanel({
                panel_x: 50,
                panel_y: 100,
                rotation: (Math.PI / 180 * 180)
            });

        }
    }

    // 鼠标量测圆绘制
    this._addCircle();

    var _this = this;
    //增加事件
    this._bind('mousemove', backMove, false);
    this._ARROW_EVENT.push({ name: 'mousemove', func: backMove });
    function backMove() {
        _this._circleMove();
        // 文字移动事件
        _this._textMove();
    }
}


LeadorPano.prototype._textMove = function() {
    // 射线查询是否有对象
    var _EVENT = this._raycaster(event);
    var _CSS = 'z-index:1000000;position:absolute;top:{t}px;left:{location}px;color:#fff;font-size:13px;text-align:center;';
    var _DIS = 0;
    var _POINT = null;
    var _CONTENT = null;
    var _VIEWS = null;

    if (_EVENT[0].object.parent.name && _EVENT[0].object.parent.name.indexOf('PANEL') >= 0) {
        _DIS = _EVENT[0].distance;
        _POINT = _EVENT[0].point;
        _EVENT = _EVENT[0].object.parent;
    } else {
        if (this._TEXT_DISTINCE) {
            _CSS = _CSS.replace('{t}', -100).replace('{location}', -100);
            this._TEXT_DISTINCE = this.updateElement({ ele: this._TEXT_DISTINCE, css: _CSS, html: _CONTENT });
        }
        return false;
    }

    // 转换三维坐标到屏幕坐标
    _VIEWS = this._VIEWER.vector3ToViewerCoords(_POINT);
    _CONTENT = '前进{m}米'.replace('{m}', Math.abs((_DIS / 3).toFixed(1)))
    _CSS = _CSS.replace('{t}', _VIEWS.y + 25).replace('{location}', _VIEWS.x - 33);

    if (!this._TEXT_DISTINCE) {
        this._TEXT_DISTINCE = {};
        this._TEXT_DISTINCE = this.addElement({ name: 'div', css: _CSS, html: _CONTENT });
    } else {
        this._TEXT_DISTINCE = this.updateElement({ ele: this._TEXT_DISTINCE, css: _CSS, html: _CONTENT });
    }
    this._VIEWER.renderer.render(this._VIEWER.scene, this._VIEWER.camera);
}

LeadorPano.prototype._circleMove = function() {
    if (!this._SELECT_CIRCLE) {
        console.warn('参数缺失');
        return false;
    }
    // 如果有选中
    var select = this._raycaster(event);
    if (select[0]) {
        if (select[0].object.parent.name.indexOf('PANEL') > -1) {
            this._SELECT_CIRCLE.position.x = select[0].point.x;
            this._SELECT_CIRCLE.position.z = select[0].point.z;
        } else {
            this._SELECT_CIRCLE.position.x = 0;
            this._SELECT_CIRCLE.position.z = 0;
        }
    }
    this._VIEWER.renderer.render(this._VIEWER.scene, this._VIEWER.camera);
}

// 测量工具绘制的圆形
LeadorPano.prototype._addCircle = function() {
    if (!this._SELECT_CIRCLE) {
        var geometry = new THREE.RingBufferGeometry(3, 3.2, 100);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = 0;
        mesh.position.y = -9.5;
        mesh.rotation.x = -Math.PI / 2;

        var object3D = new THREE.Object3D();
        object3D.add(mesh);
        object3D.name = this.getRandom('circle');
        this._SELECT_CIRCLE = object3D;
        this._VIEWER.scene.add(object3D);
    }
}

// 鼠标量测工具
LeadorPano.prototype._addPanel = function(options) {
    if (!this._VIEWER) {
        console.warn('对象未实例');
        return false;
    }
    if (!options) {
        console.warn('参数缺失');
        return false;
    }
    var object3D, material, geometry, mesh;
    object3D = new THREE.Object3D();
    object3D.rotation.y = options.rotation; // 旋转角度与交叉口角度一致
    object3D.name = this.getRandom('panel');

    geometry = new THREE.PlaneGeometry(options.panel_x, options.panel_y, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.0, transparent: true });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -60;
    mesh.position.y = -10;
    mesh.rotation.x = -Math.PI / 2;

    object3D.add(mesh);
    this._SELECT_PANEL.push(object3D);
    this._VIEWER.scene.add(object3D);
}

LeadorPano.prototype._arrowMove = function() {
    this._EVENT = {};
    this._EVENT.selectModels = this._raycaster(event);
    if (!this._EVENT.selectModels) {
        console.warn('捕获异常');
        return false;
    }

    for (var i = 0; i < this._EVENT.selectModels.length; i++) {
        if (this._EVENT.selectModels[i].object.parent.name
            && this._EVENT.selectModels[i].object.parent.name.indexOf('ARROW') >= 0) {
            this._EVENT.selectModels = this._EVENT.selectModels[i].object.parent;
            break;
        }
    }
    // 是否有站点可跳转
    if (!this._EVENT.selectModels.name) {
        return false;
    }

    console.log(this._EVENT.selectModels);
}

// 根据 neme 删除 object3D
LeadorPano.prototype.toggleArrow = function() {

    if (this._OPTIONS.pluginArrow != true) {
        this._VIEWER.scene.add(this._ARROW_GROUP);
        this._OPTIONS.pluginArrow = true;
    } else {
        this._VIEWER.scene.remove(this._ARROW_GROUP);
        this._OPTIONS.pluginArrow = false;
    }
    return this.arrowShow;
}

LeadorPano.prototype.showArrow = function(bool) {

    if (bool == true) {
        this._VIEWER.scene.add(this._ARROW_GROUP);
        this._OPTIONS.pluginArrow = true;
    } else if (bool == false) {
        this._VIEWER.scene.remove(this._ARROW_GROUP);
        this._OPTIONS.pluginArrow = false;
    }
    return this.arrowShow;
}



LeadorPano.prototype._arrowClick = function(e) {
    var ee = window.event || e;
    this._EVENT = {};
    this._EVENT.selectModels = this._raycaster(ee);
    if (!this._EVENT.selectModels) {
        console.warn('捕获异常');
        return false;
    }

    for (var i = 0; i < this._EVENT.selectModels.length; i++) {
        if (this._EVENT.selectModels[i].object.parent.name
            && this._EVENT.selectModels[i].object.parent.name.indexOf('ARROW') >= 0
            && this._EVENT.selectModels[i].object.parent.station) {
            this._EVENT.selectModels = this._EVENT.selectModels[i].object.parent;
            break;
        }
    }

    // 是否有站点可跳转
    if (!this._EVENT.selectModels.name) {
        //this.message('站点未连接，无法跳转',1000);
        return false;
    }
    var station = this._EVENT.selectModels.station; //.replace('-0-', '-X-');

    /*if (station) {
    this._OPTIONS.Station.StationID = station;
    this.initScenByPano(2);
    }*/
    if (station.toUpperCase() == 'null'.toUpperCase()) {
        this.message('暂无连续站点，请点击蓝色路网进入该全景', 2000);
        return false;
    }
    else if (station.toUpperCase() == 'next'.toUpperCase()) {
        this.setStationStep(1);
    } else if (station.toUpperCase() == 'previous'.toUpperCase()) {
        this.setStationStep(-1);
    }

    /*  else {
    this._OPTIONS.Station.StationID = station;
    this.initScenByPano(2);
    }*/
}

// 捕获射线
LeadorPano.prototype._raycaster = function(options) {
    this._ARROW_DROW = {}
    this._ARROW_DROW.view = this._VIEWER.container;
    this._ARROW_DROW.standardVector = new THREE.Vector3((options.clientX / this._ARROW_DROW.view.offsetWidth) * 2 - 1, -(options.clientY / this._ARROW_DROW.view.offsetHeight) * 2 + 1, 0.5); //标准设备坐标
    //标准设备坐标转世界坐标
    this._ARROW_DROW.worldVector = this._ARROW_DROW.standardVector.unproject(this._VIEWER.camera);
    //射线投射方向单位向量(worldVector坐标减相机位置坐标)
    this._ARROW_DROW.ray = this._ARROW_DROW.worldVector.sub(this._VIEWER.camera.position).normalize();
    //创建射线投射器对象
    this._ARROW_DROW.raycaster = new THREE.Raycaster(this._VIEWER.camera.position, this._ARROW_DROW.ray);
    this._ARROW_DROW.intersects = this._ARROW_DROW.raycaster.intersectObjects(this._VIEWER.scene.children, true);
    if (this._ARROW_DROW.intersects.length > 0) {
        this._INTERSECTED = this._ARROW_DROW.intersects;
    } else {
        this._INTERSECTED = undefined;
    }
    return this._INTERSECTED
}


// 添加箭头
LeadorPano.prototype._pluginArrow = function() {

    var _this = this;
    this.clearMarkers();

    //DMI无需加载
    if (this.getStation().DataType == 2) {
        return false;
    }

    // 缓存事件用于注销
    if (this._ARROW_EVENT) {
        // 注销绑定的事件
        for (var i = 0; i < this._ARROW_EVENT.length; i++) {
            this._unbind(this._ARROW_EVENT[i].name, this._ARROW_EVENT[i].func);
        }
    }
    this._ARROW_EVENT = [];

    // 清空现有箭头
    if (this._ARROW_GROUP) this._VIEWER.scene.remove(this._ARROW_GROUP);



    // 绘制新箭头
    this._ARROW_GROUP = new THREE.Group();
    this._ARROW_GROUP.name = this.getRandom('arrow');
    this._VIEWER.scene.add(this._ARROW_GROUP);

    // 请求获得路口
    var join = {
        stationid: this.getStation().StationID.replace('-X-', '-0-'),
        direction: this.getStation().Direction
    }
    this.getJoints(join, callback)

    function callback(data) {
        var extend = _this.getStation().Extend.substring(1, _this.getStation().Extend.length - 2);
        extend = extend.split('}{');
        console.log(extend);
        var star = extend[0].split(',')[0];
        var stop = extend[extend.length - 1].split(',')[0];

        _this._OPTIONS.Station.Previous = _this.getStation().Previous;
        _this._OPTIONS.Station.Next = _this.getStation().Next || stop;

        //保存到站点信息
        _this._OPTIONS.Station.Joint = data.Junction;

        console.info((data.Status == 1 ? '路口' : '直行'), data.Junction);

        //绘制交叉
        if (data.Status == 1) {
            //交叉口

            for (var i in data.Junction) {
                var opt = {
                    arrow_rotation: 360 - data.Junction[i].Angle,
                    station: data.Junction[i].StationID,
                    text_rotation: _this.getStation().Yaw + data.Junction[i].Angle
                }
                _this._cross(opt);
                // 街道名
                drawRoad(360 - data.Junction[i].Angle, [data.Junction[i].Angle, -10]); //data.Junction[i].RoadName
            }

            /*    var opt = {
            arrow_rotation: 0,
            station: 'back',
            text_rotation: _this.getStation().Yaw - 180
            }
            _this._cross(opt);

            // 街道名
            drawRoad(_this.getStation().Address, [180, -10]);*/

        } else {
            if (_this.getStation().Previous) {
                _this._straight({ arrow_rotation: 0, station: 'previous', text_rotation: (360 - _this.getStation().Yaw) });
            } else {
                _this._straight({ arrow_rotation: 0, station: 'null', text_rotation: (360 - _this.getStation().Yaw) });
            }

            if (_this.getStation().Next) {
                _this._straight({ arrow_rotation: 180, station: 'next', text_rotation: (360 - _this.getStation().Yaw - 180) });
            } else {
                _this._straight({ arrow_rotation: 180, station: 'null', text_rotation: (360 - _this.getStation().Yaw - 180) });
            }

            // 街道名
            drawRoad(_this.getStation().Address, [0, -10]);
            // 街道名
            drawRoad(_this.getStation().Address, [180, -10]);
        }

    }

    function drawRoad(name, pos) {

        // 绘制街道名称
        var opt = {
            content: name,
            position: { lng: pos[0], lat: pos[1] },
            tag: '',
            className: 'pano-road'
        }
        _this.drawLabel(_this.getRandom('roadname'), opt);
    }




    // 点击事件
    this._bind('click', event_callback)
    this._ARROW_EVENT.push({ name: 'click', func: event_callback });
    function event_callback(e) {
        // 箭头点击事件
        _this._arrowClick(e);
    }

    /*   this._bind('mousemove',backMove)
    this._ARROW_EVENT.push({name: 'mousemove', func: backMove});
    function backMove(e) {
    //  window.event.preventDefault()
    _this._arrowMove(e);
    }*/


}



LeadorPano.prototype._cross = function(options) {
    this._ARROW_DROW = {}

    //文字获取 ARROW_TEXT
    this._ARROW_DROW.rotation = (options.text_rotation + 360) % 360; //排除负值
    this._ARROW_DROW.canvas = this.getDirectionByAngle(this._ARROW_DROW.rotation);
    this._ARROW_DROW.geometry = new THREE.PlaneGeometry(1.1, 1.5, 1); //控制箭头大小
    this._ARROW_DROW.material = new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(this._ARROW_DROW.canvas.value),
        transparent: true,
        opacity: 0.9
        // side: THREE.DoubleSide//双面显示
    });

    // 计算子网格的旋转坐标
    this._ARROW_DROW.angle = Math.PI / 180 * options.arrow_rotation;
    this._ARROW_DROW.jd = 180 * (this._ARROW_DROW.angle + Math.PI / 2) / Math.PI;
    this._ARROW_DROW.mesh_x = 0.0 + 1.6 * Math.cos(this._ARROW_DROW.jd * Math.PI / 180);
    this._ARROW_DROW.mesh_y = 0.0 + 1.6 * Math.sin(this._ARROW_DROW.jd * Math.PI / 180);

    // 获得子网格的旋转坐标
    this._ARROW_DROW.mesh = new THREE.Mesh(this._ARROW_DROW.geometry, this._ARROW_DROW.material);
    this._ARROW_DROW.mesh.position.x = this._ARROW_DROW.mesh_x;
    this._ARROW_DROW.mesh.position.y = this._ARROW_DROW.mesh_y;
    this._ARROW_DROW.mesh.rotation.z = this._ARROW_DROW.angle;

    // 添加到 object3D 用于捕获，翻转坐标为右手坐标系
    this._ARROW_DROW.object3D = new THREE.Object3D();
    this._ARROW_DROW.object3D.add(this._ARROW_DROW.mesh);
    this._ARROW_DROW.object3D.rotation.x = -Math.PI / 2;
    this._ARROW_DROW.object3D.station = options.station;
    this._ARROW_DROW.object3D.name = this.getRandom('arrow');

    // 添加到组 设置父子坐标让其根据自定义点旋转 参考 ：http://threejs.outsidelook.cn/examples/set-pivot/index.html
    this._ARROW_GROUP.add(this._changePivot(0, 0, 0, this._ARROW_DROW.object3D));

    var _this = this;

    this._addRequestAnimationFrame(function() {
        /*
        小葵花妈妈课堂，开课啦：
        圆点坐标：(x0,y0)
        半径：r
        角度：a0
        则圆上任一点为：（x1,y1）
        x1   =   x0   +   r   *   cos(ao   *   3.14   /180   )
        y1   =   y0   +   r   *   sin(ao   *   3.14   /180   )
        */
        //角度=弧度*180/PI
        //弧度=角度*PI/180
        this.__jd = (_this.getViewPosition().lng * Math.PI / 180) - Math.PI / 2;
        this.__x = 0 + 7.0 * Math.cos(this.__jd);
        this.__y = 0 + 7.0 * Math.sin(this.__jd);
        _this._ARROW_GROUP.position.set(-this.__x, -3.0, -this.__y);
        if (_this._VIEWER.renderer) {
            _this._VIEWER.renderer.render(_this._VIEWER.scene, _this._VIEWER.camera);
        }

    })
}

LeadorPano.prototype._straight = function(options) {
    this._ARROW_DROW = {};
    // var rotation, canvas, geometry, material, angle, jd, cos_x, sin_y, mesh, object3D;
    // 图片贴图样式

    //文字获取 ARROW_TEXT
    this._ARROW_DROW.rotation = (options.text_rotation + 360) % 360; //排除负值
    this._ARROW_DROW.canvas = this.getDirectionByAngle(360 - (this._ARROW_DROW.rotation + 180) % 360);
    this._ARROW_DROW.geometry = new THREE.PlaneGeometry(1.4, 1.8, 10, 10); //控制箭头大小
    this._ARROW_DROW.material = new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(this._ARROW_DROW.canvas.value), //options.texture,
        transparent: true,
        opacity: 0.8
        // side: THREE.DoubleSide//双面显示
    });

    // 计算子网格的旋转坐标
    this._ARROW_DROW.angle = Math.PI / 180 * options.arrow_rotation;
    this._ARROW_DROW.jd = 180 * (this._ARROW_DROW.angle + Math.PI / 2) / Math.PI;
    //  console.log(this._ARROW_DROW.jd, this._ARROW_DROW.angle, this._ARROW_DROW.canvas.name, options)
    this._ARROW_DROW.cos_x = 0.0 + 1.2 * Math.cos(this._ARROW_DROW.jd * Math.PI / 180);
    this._ARROW_DROW.sin_y = 0.0 + 1.2 * Math.sin(this._ARROW_DROW.jd * Math.PI / 180);

    // 获得子网格的旋转坐标
    this._ARROW_DROW.mesh = new THREE.Mesh(this._ARROW_DROW.geometry, this._ARROW_DROW.material);
    this._ARROW_DROW.mesh.position.x = this._ARROW_DROW.cos_x;
    this._ARROW_DROW.mesh.position.y = this._ARROW_DROW.sin_y;
    this._ARROW_DROW.mesh.rotation.z = this._ARROW_DROW.angle;

    // 添加到 object3D 用于捕获，翻转坐标为右手坐标系
    this._ARROW_DROW.object3D = new THREE.Object3D();
    this._ARROW_DROW.object3D.add(this._ARROW_DROW.mesh);
    this._ARROW_DROW.object3D.rotation.x = -Math.PI / 2;
    this._ARROW_DROW.object3D.station = options.station;
    this._ARROW_DROW.object3D.name = this.getRandom('arrow');

    var _this = this;
    // 添加到组 设置父子坐标让其根据自定义点旋转
    // 参考 ：http://threejs.outsidelook.cn/examples/set-pivot/index.html
    this._ARROW_GROUP.add(this._changePivot(0, 0, 0, this._ARROW_DROW.object3D));


    this._addRequestAnimationFrame(function() {
        /*
        小葵花妈妈课堂，开课啦：
        圆点坐标：(x0,y0)
        半径：r
        角度：a0
        则圆上任一点为：（x1,y1）
        x1   =   x0   +   r   *   cos(ao   *   3.14   /180   )
        y1   =   y0   +   r   *   sin(ao   *   3.14   /180   )
        */
        //角度=弧度*180/PI
        //弧度=角度*PI/180
        this.__jd = (_this.getViewPosition().lng * Math.PI / 180) - Math.PI / 2;
        this.__x = 0 + 7.0 * Math.cos(this.__jd);
        this.__y = 0 + 7.0 * Math.sin(this.__jd);
        _this._ARROW_GROUP.position.set(-this.__x, -3.0, -this.__y);
        if (_this._VIEWER.renderer) {
            _this._VIEWER.renderer.render(_this._VIEWER.scene, _this._VIEWER.camera);
        }

    })

}

LeadorPano.prototype._addRequestAnimationFrame = function(options) {
    if (typeof options == 'function') {
        var raf = 'RequestAnimationFrame'//PANO_TOOL.getRandom('RequestAnimationFrame');

        if (window[raf]) {
            delete window[raf];
        }

        window[raf] = function() {
            window.requestAnimationFrame(window[raf]);
            options();
        }
        window[raf]();
    }
}



//为DMI增加箭头指向
LeadorPano.prototype.dmiArrow = function() {
    var ele = {
        bei: document.getElementById('dmi-bei'),
        nan: document.getElementById('dmi-nan')
    }
    if (ele.bei) ele.bei.remove();
    if (ele.nan) ele.nan.remove();

    var Yaw = this.getStation().Yaw;
    var iconYaw = this._OPTIONS.DMIList.Sizes[1];
    if (this._OPTIONS.StationFaceID) {
        iconYaw = this._OPTIONS.StationFaceID;
    }
    //console.log(iconYaw);

    var canvas_bei = this.getDirectionByAngle(Yaw);
    canvas_bei.value.className = 'dmi-arrow';
    canvas_bei.value.style.transform = 'perspective(1000px) rotateX(70deg) rotateZ({deg}deg)'.replace('{deg}', iconYaw.Yaw - Yaw - 90);
    canvas_bei.value.id = 'dmi-bei';

    var canvas_nan = this.getDirectionByAngle(Yaw + 180);
    canvas_nan.value.className = 'dmi-arrow';
    canvas_nan.value.style.transform = 'perspective( 1000px) rotateX(70deg) rotateZ({deg}deg)'.replace('{deg}', iconYaw.Yaw + 180 - Yaw - 90);
    canvas_nan.value.id = 'dmi-nan';

    var container = document.getElementById('dmi-panel');
    container.appendChild(canvas_bei.value);
    container.appendChild(canvas_nan.value);

}


// 反转系统
LeadorPano.prototype._changePivot = function(x, y, z, obj) {
    this._ARROW_GROUP.position.set(x, y, z);
    obj.position.set(x, y, z);
    return obj;
}




LeadorPano.prototype.initScenByPano = function(router) {
    var _this = this;

    this.loadCopyright();

    //增加
    _this.getCameraInfo(function(info) {
        goTeemo();
    })

    function goTeemo() {
        console.info(_this._OPTIONS.Camera);

        var zoom = PANO_ZOOM_6_3;

        // 加载不同相机规格的照片
        switch (_this._OPTIONS.Camera) {
            case "6000*3000":
                zoom = PANO_ZOOM_6_3;
                break;
            case "8000*4000":
                zoom = PANO_ZOOM_8_4;
                break;
            case "5120*2560":
                zoom = PANO_ZOOM_5_2;
                break;
        }

        //加载不同清晰度的照片
        switch (router) {
            case 0:
                zoom = zoom.ZOOM0;
                break;
            case 1:
                zoom = zoom.ZOOM1;
                break;
            case 2:
                zoom = zoom.ZOOM2;
                break;
            case 3:
                zoom = zoom.ZOOM3;
                break;
            case 4:
                zoom = zoom.ZOOM4;
                break;
            default:
                zoom = zoom.ZOOM0;
                break;
        }

        _this._OPTIONS.panoDefaultZoom = zoom.zom;


        _this._mergeNxNImage(zoom);
    }



    // 加载插件 方向箭头 量测工具 小地图


    this._VIEWER.once('panorama-loaded', function() {

        //  _this.message(_this.getStation().Address, 500);
        _this._controller();
    })

}

LeadorPano.prototype.chaotuMapSetCenter = function(position, oldPosition) {
    try {
        var xy = { lng: this.getStation().X, lat: this.getStation().Y }
        if (position) {
            xy = position;
        }
        //oldPosition
        if (parent.window.frames['workspace_iframe0']) {
            parent.window.frames['workspace_iframe0'].panTo(xy.lng, xy.lat);
            parent.window.frames['workspace_iframe0'].updateFeature(xy.lng, xy.lat)
        }
    } catch (e) {

    }
}

//加载DMI环境
LeadorPano.prototype.initScenByDMI = function(bool) {


    var _this = this;
    this.loadCopyright();
    //清空现有全景环境
    this.clearPano();

    this.getDMICameraInfo(function(data) {
        //console.log(data);
        if (data.Status == 1) {
            _this.loadDMIPhoto(bool);
        } else {
            _this.loadDMIPhotoError();

        }
    })
}


//为DMI增加箭头指向 dmi路口选择
LeadorPano.prototype.setJunction = function(data) {

    var _this = this;

    if (data.Junction.length == 1) {
        caseI(data);
        console.info('DMI节点直行');
    } else {
        _this.message('前方道路交叉,请选择路口', 5000);
        console.log('DMI岔路', data.Junction);
        caseX(data);
    }

    function caseI(data) {
        _this.getDMIStationByID(data.Junction[0].StationID, function(data) {
            if (data.Status != 1) {
                _this.message(data.Message, 2000);
            }
        })

    }

    function caseX(data) {
        if (_this.intervalPlayTime) clearInterval(_this.intervalPlayTime);
        // $('#dmi_play').click();
        $('#pano_out_point').hide();
        $('#fx_icon').hide();
        _this.addJunction(data.Junction);
    }
}

//绘制箭头
LeadorPano.prototype.addJunction = function(options) {
    var _this = this;
    var container = document.getElementById('dmi-panel'), img = document.getElementById('dmi-image');
    var yaw = this.getStation().Yaw;


    for (var i in options) {
        arrow(options[i]);
    }

    function arrow(jun) {

        var d = document.createElement('div');
        d.innerHTML = '<div class=\'pano-3d-arrow\'><div style=\'font-size:30px;height:80px\'>{address}</div><div class=\'glyphicon glyphicon-menu-up\' style=\'font-size:100px\'></div></div>'.replace('{address}', jun.RoadName.substring(0, 9));
        d.className = 'dmi-arrow';
        d.style.transform = 'perspective(700px) rotateX(55deg) rotateZ({deg}deg)'.replace('{deg}', jun.Angle);
        d.onclick = function() {
            _this.getDMIStationByID(jun.StationID, function(data) {
                if (data.Status = 1) {
                    $('#pano_out_point').show();
                    $('#fx_icon').show();

                    _this.clearJunction();
                    _this.intervalPlayTime = setInterval(function() {
                        _this.goStationByStep(1);
                    }, 1000)
                } else {
                    _this.message(data.Message, 2000);
                }
            });
        }
        container.appendChild(d);
    }
    //开启闪烁
    this.tipJunction(false)
}

LeadorPano.prototype.clearJunction = function() {
    //清空闪烁
    this.tipJunction(true);
    $('.dmi-arrow').each(function(i, data) {
        $(data).remove();
    })
}


//true 清空定时器 false：开始闪烁
LeadorPano.prototype.tipJunction = function(bool) {
    var index = 0, setIntervalarrow;
    if (!bool) {

        setIntervalarrow = setInterval(function() {

            if (index >= 8) {

                $('.dmi-arrow').each(function(i, data) {
                    $(data).removeClass().addClass('dmi-arrow');
                })
                if (setIntervalarrow) clearInterval(setIntervalarrow);
            } else {
                $('.dmi-arrow').each(function(i, data) {
                    $(data).css('opacity', index % 2)
                })
            }
            index++;
        }, 500)
    } else {
        if (setIntervalarrow) clearInterval(setIntervalarrow);
    }



}



//为DMI增加箭头指向
LeadorPano.prototype.dmiArrow = function() {
    var ele = {
        bei: document.getElementById('dmi-bei'),
        nan: document.getElementById('dmi-nan')
    }
    if (ele.bei) ele.bei.remove();
    if (ele.nan) ele.nan.remove();

    var Yaw = this.getStation().Yaw;
    var Pitch = this.getAng(this.getStation().Pitch);
    var iconYaw = this._OPTIONS.DMIList.Sizes[1];


    var canvas_bei = this.getDirectionByAngle(Yaw); console.log(Pitch, Yaw);
    canvas_bei.value.className = 'dmi-arrow';
    canvas_bei.value.style.transform = 'perspective(700px) rotateX(80deg) rotateZ({deg}deg)'.replace('{deg}', 0); //transform: perspective(300px) rotateX(79deg) rotateZ(-179.803deg);
    canvas_bei.value.id = 'dmi-bei';

    var canvas_nan = this.getDirectionByAngle(Yaw + 180);
    canvas_nan.value.className = 'dmi-arrow';
    canvas_nan.value.style.transform = 'perspective( 700px) rotateX(80deg) rotateZ({deg}deg)'.replace('{deg}', 180);
    canvas_nan.value.id = 'dmi-nan';

    var container = document.getElementById('dmi-panel');
    container.appendChild(canvas_bei.value);
    container.appendChild(canvas_nan.value);

}

//pano_out_point
LeadorPano.prototype.setArrow = function(callback) {
    var Yaw = this.getStation().Yaw, _this = this;
    var pano_out_point = document.getElementById('pano_out_point');
    pano_out_point.style.transform = 'rotateZ({deg}deg)'.replace('{deg}', -Yaw);

    $('.out_point_e').css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw))
    $('.out_point_w').css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw))
    $('.out_point_s').css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw))
    $('.out_point_n').css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw))


    /*  $("#fx_icon").css('transform', 'rotateZ({deg}deg)'.replace('{deg}', -Yaw))
    $(".fx_icon_Es").css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw));
    $(".fx_icon_Ws").css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw));
    $(".fx_icon_Ns").css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw));
    $(".fx_icon_Ss").css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw));

    $("#dmi_play").css('transform', 'rotateZ({deg}deg)'.replace('{deg}', Yaw))*/

    var join = {
        stationid: this.getStation().StationID.replace('-X-', '-0-'),
        direction: this.getStation().Direction
    }
    this.getJoints(join, callbackJoints);

    function callbackJoints(data) {
        if (data.Status == 1) {
            if (data.Junction.length == 1) {
                console.info('节点直行', data.Junction);
            } else {
                console.info('DMI岔路', data.Junction);
            }
            _this.setJunction(data);
        } else {
            console.info('DMI直行');
            if (callback) callback();
        }
    }

}


LeadorPano.prototype.loadCopyright = function() {
    var _this = this, queryid = document.getElementById('copyright-leador');
    serarchCity();
    var childSpan = document.createElement('span');
    var preDiv = document.getElementById("copyright-leador")
    childSpan.className = "tip_div span_e";
    childSpan.innerHTML = "这里是影像类型";
    preDiv.appendChild(childSpan);
    childSpan.style = "display:none";
    function serarchCity() {
        var text = [], address = _this.getStation().Address.replace('门前东路', '前门东路');
        text.push(_this.getLocation().province + _this.getLocation().city + _this.getLocation().district + _this.getLocation().street + address);
        text.push(_this.getStation().StationID.split('-')[2].substring(0, 8));
        var type = (_this.getStation().DataType == 4) ? '全景影像' : '可量测实景影像';

        if (queryid) {
            queryid.innerHTML = type + ' | ' + text[0] + ' | ' + text[1];
            queryid.data = _this.getStation().StationID;
        } else {
            add(_this.getContainerID(), _this.getStation().StationID);
        }

        function add(id, station) {
            var panoBody = window.document.getElementById(id);
            var childText = document.createElement('div');
            childText.className = "pano-copyright";
            childText.id = "copyright-leador";
            childText.data = station;
            childText.innerHTML = type + ' | ' + text[0] + ' | ' + text[1];
            panoBody.appendChild(childText);

        }
    }

}


// TWS系统图片拼接模式
LeadorPano.prototype._mergeNxNImage = function(options) {
    var _this = this;

    var hd = PANO_CONFIG.TWS_PANO_HD.concat()
        .replace('{z}', options.zom)
        .replace('{station-id}', this.getStation().StationID.replace('-0-', '-X-'))
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano)
    // .replace('{dataType}', options.dataType)



    //合并图片
    var tileOption = {
        position: [],
        data: [],
        canvasWidth: 512 * Number(options.col) + (options.offset_x),
        canvasHeight: 512 * Number(options.row) + (options.offset_y),
        imgWidth: 512,
        imgHeight: 512,
        callback: callback
    }

    for (var c = 0; c < options.col; c++) {
        for (var r = 0; r < options.row; r++) {
            tileOption.position.push([c * tileOption.imgWidth, r * tileOption.imgHeight]);
            tileOption.data.push(hd.replace('{row}', r).replace('{col}', c));
        }
    }
    //console.log(tileOption)
    this._mergeImage(tileOption);

    function callback(Url) {
        // src赋值
        _this._PANOURL = Url;

        // 加载结束既重新绘制全景
        _this._VIEWER.setPanorama(Url, true);
    }
}

// DMI图片拼接模式
LeadorPano.prototype._merge2x3Image = function(dmicallback) {
    var options = DMI_ZOOM.ZOOM2;
    var _this = this, camera = this._OPTIONS.DMIList.Sizes[1];

    if (!this.getLocation().serviceDmi) {
        return false;
    }
    var hd = PANO_CONFIG.TWS_PANO_HD.concat()
        .replace('{z}', options.zom)
        .replace('{station-id}', this.getStation().StationID.replace('-0-', '-{face}-'.replace('{face}', camera.CameraNo)))
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi)

    //合并图片
    var tileOption = {
        position: [],
        data: [],
        canvasWidth: 512 * Number(options.col),
        canvasHeight: 512 * Number(options.row),
        imgWidth: 512,
        imgHeight: 512,
        callback: callback
    }

    for (var c = 0; c < options.col; c++) {
        for (var r = 0; r < options.row; r++) {
            tileOption.position.push([c * tileOption.imgWidth, r * tileOption.imgHeight]);
            tileOption.data.push(hd.replace('{row}', r).replace('{col}', c));
        }
    }
    this._mergeImage(tileOption);

    function callback(imageUrl) {
        dmicallback(imageUrl);
        _this._controller();
    }
}

/**
*根据图片切片进行合并
* @param options
* @param options.canvasWidth 需要合并的片宽度
* @param options.canvasHeight 需要合并的片高度
* @param options.canvasFillStyle 填充色
* @param options.data 切片请求数组
* @param options.position 切片合并相对坐标原点
* @param options.imgWidth 图片宽度
* @param options.imgHeight 图片高度
* @param options.callback 回调
* @param options.pano 全景朝向
*/
LeadorPano.prototype._mergeImage = function(options) {

    var canvas = document.createElement('canvas');
    canvas.width = options.canvasWidth;
    canvas.height = options.canvasHeight;

    var ctx = canvas.getContext('2d');
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    // 递归完成4*4切片的拼接
    function drawing(next) {
        if (next < options.data.length) {
            var img = new Image;
            img.crossOrigin = 'Anonymous'; //解决跨域
            img.src = options.data[next];
            img.onload = function() {
                ctx.drawImage(img, options.position[next][0], options.position[next][1], options.imgWidth, options.imgHeight);
                drawing(next + 1); //递归
            }
            img.error = function(e) {
                console.log(e)
            }
        } else {
            options.callback(canvas.toDataURL('image/png', 1), options.index)
        }
    }

    drawing(0);
}

LeadorPano.prototype.init = function() {

    this._VIEWER = new Viewer({
        container: this._OPTIONS.container,
        panorama: '',
        caption: '',
        //fisheye: true,
        //webgl: false,
        time_anim: this._OPTIONS.timeAnim, // 自动漫游播放
        default_fov: this._OPTIONS.fov, //控制视野深度 30-90
        default_lng: this._OPTIONS.lng, // 控制水平视野方向
        default_lat: this._OPTIONS.lat, // 控制垂直视野方向
        loading_img: this._OPTIONS.loadingImage,
        loading_txt: this._OPTIONS.loadingTxt,
        //tilt_down_max: _OPTIONS.tilt_down_max,
        //tilt_up_max: Math.PI / 7,
        // mousemove_hover:true, //视野跟随光标
        // touchmove_two_fingers:true, // 触摸屏双指旋转
        latitude_range: this._OPTIONS.latitudeRange, //[Math.PI/2, -Math.PI/3.5]
        transition: this._OPTIONS.transition,
        lang: {
            autorotate: '视野漫游',
            zoom: '缩放',
            zoomOut: '放大',
            zoomIn: '缩小',
            download: '下载',
            fullscreen: '全屏',
            markers: '标记',
            gyroscope: '陀螺仪',
            stereo: '立体',
            stereo_notification: '单击任意位置退出立体视图.',
            please_rotate: ['请旋转您的设备', '(或 点击继续)'],
            two_fingers: ['Use two fingers to navigate']
        },
        navbar: false
    });




}

// 调起白板
LeadorPano.prototype.showPanel = function(options) {

    this._VIEWER.showPanel(options, false)
}

LeadorPano.prototype.hidePanel = function() {

    this._VIEWER.hidePanel()
}

// 获取摄像机坐标
LeadorPano.prototype.getViewPosition = function() {

    var coord = this._VIEWER.getPosition();
    return {
        lng: this.getAng(coord.longitude),
        lat: this.getAng(coord.latitude)
    };
}

// 摄像机漫游到一个视野坐标
LeadorPano.prototype.setAnimateAngle = function(options, time) {

    this._VIEWER.animate({ longitude: this.getRad(options.lng), latitude: this.getRad(options.lat) }, time)
}

// 开启或关闭自动旋转摄像机
LeadorPano.prototype.toggleAutoRotate = function() {

    this._VIEWER.toggleAutorotate();
}

// 设置摄像机到一个视野坐标
LeadorPano.prototype.setAngle = function(options) {
    if (this._VIEWER) {
        this._VIEWER.rotate({ longitude: this.getRad(options.lng), latitude: this.getRad(options.lat) })
    }
}

// 获取容器大小
LeadorPano.prototype.getViewSize = function() {

    return this._VIEWER.getSize();
}
// 根据步数加载前一步或后一步 step 正数前进 负数后退
LeadorPano.prototype.setStationStep = function(step) {


    if (step == 0 || typeof (step) != 'number') {
        console.warn('step 步数不可为 0')
        return false;
    }

    // 清空现有箭头
    if (this._ARROW_GROUP) this._VIEWER.scene.remove(this._ARROW_GROUP);

    // station = station.replace('-X-', '-0-')
    var _this = this;

    /*this.sendAjax({
    async: true,
    type: 'get',
    url: PANO_CONFIG.TWS_PANO_STATION_STEP_SEARCH.concat()
    .replace('{station-id}', station)
    .replace('{step}', step)
    .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano),
    callback: function(data) {
    _this.message(data.Message, 500);
    //可以加入岔路口
    if (data.Status == 1) {
    _this.setStation(data.Station);
    _this.initScenByPano(2);

            }
    }
    })*/
    if (step == 1) {
        station = this.getStation().Next;
    } else if (step == -1) {
        station = this.getStation().Previous;
    }
    this.getStationByID(station, function(data) {
        if (data.Status == 1) {
            _this.setStation(data.Station);
            _this.initScenByPano(2);
        }
    })

}

LeadorPano.prototype.setDMIStationStep = function(station, step, callback) {
    var _this = this;

    if (this.getLocation().serviceDmi) {
        this.sendAjax({
            async: true,
            type: 'get',
            url: PANO_CONFIG.TWS_PANO_STATION_STEP_SEARCH.concat()
            .replace('{station-id}', station)
            .replace('{step}', step)
            .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi),
            callback: function(data) {
                if (data.Status == 1) {
                    _this.setStation(data.Station);
                }
                if (callback) callback(data);
            }
        })
    } else {
        callback({ Status: 0, Message: this.getLocation().city + '暂无DMI可量测影像!' });
    }

}

// 获得当前站点
LeadorPano.prototype.getStation = function() {
    return this._OPTIONS.Station;
}



// 获得当前站点
LeadorPano.prototype.getContainerID = function() {
    return this._OPTIONS.container;
}

/**
* 将站点信息装入
* @param {string} content 站点详细信息
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.setStation = function(options) {
    if (!options) {
        console.warn('options 缺失.'); return false;
    }
    this._OPTIONS.Station = options;
    //this.loadCopyright();
    this.chaotuMapSetCenter();
}

// 设置是否全屏
LeadorPano.prototype.toggleFullScreen = function() {

    this._VIEWER.toggleFullscreen();

}

/**
* 发送消息提醒
* @param {string} content 文本信息
* @param {number} timeout 延迟隐藏时间（毫米）
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.message = function(content, timeout) {
    if (this._VIEWER) {
        if (!content) {
            console.warn('content 缺失.');
            return false;
        }
        timeout = timeout || 2000;
        if (this._VIEWER.showNotification) {
            this._VIEWER.showNotification({ content: content, timeout: timeout })
        }

    }

}

/**
* 获取视野缩放等级
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.getZoom = function() {
    if (!this._VIEWER) {
        console.warn('全景未实例化.');
        return false;
    }
    return this._VIEWER.getZoomLevel();
}

/**
* 设置视野缩放等级
* @param {number} level
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.setZoom = function(level) {
    if (!this._VIEWER && typeof level == 'number') {
        console.warn('_VIEWER或参数异常');
        return false;
    }
    return this._VIEWER.zoom(level);
}

/**
* 事件注册
* @param {string} eventName 事件名称
* @param {function} callback 回调
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype._bind = function(name, event, useCapture) {
    if (!this._VIEWER) {
        console.warn('参数缺失.')
        return false;
    }
    if (!this._VIEWER.container) {
        console.warn('参数container缺失.')
        return false;
    }
    this._VIEWER.container.addEventListener(name, event, useCapture);
}

/**
* 事件注册
* @param {string} eventName 事件名称
* @param {function} callback 回调
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype._unbind = function(name, event, useCapture) {
    if (!this._VIEWER) {
        console.warn('参数缺失.')
        return false;
    }
    if (!this._VIEWER.container) {
        console.warn('参数container缺失.')
        return false;
    }
    this._VIEWER.container.removeEventListener(name, event, useCapture);
}

/**
* 事件注册
* @param {string} eventName 事件名称
* @param {function} callback 回调
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.on = function(name, event, useCapture) {
    var _this = this;
    this._VIEWER.on(name, function(e) {
        var lnglat = { lng: _this.getAng(e.longitude), lat: _this.getAng(e.latitude) };
        event(lnglat)
    }, useCapture);
}

/**
* 事件删除
* @param {string} eventName 事件名称
* @param {function} callback 回调
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.off = function(name, event, useCapture) {
    var _this = this;
    this._VIEWER.off(name, function(e) {
        var lnglat = { lng: _this.getAng(e.longitude), lat: _this.getAng(e.latitude) };
        event(lnglat)
    }, useCapture);
}

/**
* 事件注册一次
* @param {string} eventName 事件名称
* @param {function} callback 回调
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.once = function(name, event, useCapture) {
    var _this = this;
    this._VIEWER.once(name, function(e) {
        var lnglat = { lng: _this.getAng(e.longitude), lat: _this.getAng(e.latitude) };
        event(lnglat)
    }, useCapture);
}


/**
* 根据坐标查询全景
* @param options
* @param options.lng 经度
* @param options.lat 纬度
*/
/*LeadorPano.prototype.updatePanoByCoord = function(options, func) {
var url = PANO_CONFIG.TWS_PANO_COORD_SEARCH.concat()
.replace('{r}', 0.00100)
.replace('{service-code}', this.getLocation().serviceCode)
.replace('{type}',((!options.type)?2:4) )
.replace('{location}', options);
this.sendJsonp({ url: url, callback: func })
}*/


/**
* DMI查询根据站点坐标查询并返回DMI分页url
* @param options
* @param options.lng 经度
* @param options.lat 纬度
*/
LeadorPano.prototype.getDMIStationByCoord = function(options, callback) {

    if (this.getLocation().serviceDmi) {
        var _this = this;
        var url = PANO_CONFIG.TWS_PANO_COORD_SEARCH.concat()
    .replace('{lng}', options.position.lng)
    .replace('{lat}', options.position.lat)
    .replace('{type}', 2)
    .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi)
    .replace('{tolerance}', tolerance);

        // 获得站点
        this.sendAjax({
            async: true,
            type: 'get',
            url: url,
            callback: function(data) {
                if (data.Status == 1) {
                    _this._OPTIONS.DMIStation = data.Station;
                    _this.setStation(data.Station);
                }
                callback(data);
            }
        })
    }

}


// 获得DMI逆向地理数据
LeadorPano.prototype.getDMILocation = function() {
    return this._OPTIONS.DMILocation;
}

// 获得DMI逆向地理数据
LeadorPano.prototype.setDMILocation = function(options) {


    this.DMILocation = options;
}


LeadorPano.prototype.getDMIUrl = function(options) {
    var _this = this;
    var imageList = [], css, photoA, panel, img, photoEveryone, isNotA = false, index = 0;

    for (var i in options.size) {
        photoA = options.size[i];

        if (isNaN(options.size[i].CameraNo) == false) {
            isNotA = true;
            photoA = options.size[i];

        } else {
            index++;
        }

    }

    if (isNotA == true) {
        B();
    } else if (isNotA == false) {
        B();
    }


    function A() {
        for (var f = 0; f <= 1; f++) {
            for (var i = 0; i < options.size.length; i++) {
                if (options.size[i].CameraNo != 'A') {
                    var uu = PANO_CONFIG.TWS_PANO_HD.concat()
                            .replace('{z}', 3)
                            .replace('{col}', i)
                            .replace('{row}', f)
                            .replace('{station-id}', options.station.substring(0, 6) + '-A-' + options.station.substring(9, 27))
                            .replace('{service-code}', _this.getLocation().serviceCode + '_' + _this.getLocation().serviceDmi);

                    imageList.push(uu);


                }
            }
        }
    }


    function B() {
        for (var f = 0; f <= 1; f++) {
            for (var i = 0; i < 3; i++) {
                var uu = PANO_CONFIG.TWS_PANO_HD.concat()
                        .replace('{z}', 2)
                        .replace('{col}', i)
                        .replace('{row}', f)
                        .replace('{station-id}', options.station.substring(0, 6) + '-' + options.size[1].CameraNo + '-' + options.station.substring(9, 27))
                        .replace('{service-code}', _this.getLocation().serviceCode + '_' + _this.getLocation().serviceDmi);
                imageList.push(uu);
            }
        }
    }


    // A类型的宽幅DMI获得宽高
    console.log(options.size, photoA);
    //宽幅图片处理
    if (isNotA == true) {
        //平板的宽度
        panel = {
            width: (512 * (index - 1)) / photoA.Width * 100,
            height: (512 * 2) / photoA.Height * 100
        }
        //每张图片的百分比
        img = {
            width: 100 / (index - 1),
            height: 50
        }
    }

    //非A图片处理
    if (isNotA == false) {
        //平板的宽度
        panel = {
            width: (512 * 3) / photoA.Width * 100,
            height: (512 * 4) / photoA.Height * 100
        }
        //每张图片的百分比
        img = {
            width: 100 / 3,
            height: 50
        }
    }

    return {
        imageList: imageList,
        tileImg: img,
        panelCss: panel
    };
}


// 获得当前站点
LeadorPano.prototype.getDMIStation = function() {
    return this._OPTIONS.DMIStation;
}
// 更新当前站点
LeadorPano.prototype.setDMIStation = function(options) {
    this.DMIStation = options;
}

// 根据站点ID查询站点
LeadorPano.prototype.getDMIStationByID = function(station, callback) {

    var url = PANO_CONFIG.TWS_PANO_STATION_SEARCH.concat()
        .replace('{station-id}', station)
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi);

    var _this = this;
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (data.Status == 1) { _this.setDMIStation(data.Station); _this.setStation(data.Station) }

            if (callback) callback(data);
        }
    })

}

// 根据像素坐标算实际坐标
LeadorPano.prototype.getDMIMeasure = function(options, callback) {

    var url = PANO_CONFIG.TWS_PANO_MEASURE.concat()
        .replace('{leftimageid}', options.leftid)
        .replace('{leftx}', options.leftx)
        .replace('{lefty}', options.lefty)
        .replace('{rightimageid}', options.rightid)
        .replace('{rightx}', options.rightx)
        .replace('{righty}', options.righty)
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi);

    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (callback) {
                callback(data);
            }
        }
    })

}

/**
* 根据坐标查询全景
* @param options
* @param options.lng 经度
* @param options.lat 纬度
*/
LeadorPano.prototype._setStationByCoord = function(callback, tol) {

    var _this = this;
    var url = PANO_CONFIG.TWS_PANO_COORD_SEARCH.concat()
    .replace('{lng}', this._OPTIONS.position.lng)
    .replace('{lat}', this._OPTIONS.position.lat)
    .replace('{tolerance}', ((tol) ? tol : tolerance));

    if (this.getLocation().serviceDmi) {
        url = url.replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi).replace('{type}', 2)

    } else if (this.getLocation().servicePano) {
        url = url.replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano).replace('{type}', 4)
    } else {
        this.message('该区域暂无任何影像资源', 2000);
    }
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (data.Status == 1) _this.setStation(data.Station);
            if (callback) callback(data);
        }
    })

    //this.loading();
}


//针对主要用来查全景
LeadorPano.prototype._getStationByCoord = function(callback, tol) {

    var _this = this;
    var url = PANO_CONFIG.TWS_PANO_COORD_SEARCH.concat()
    .replace('{lng}', this._OPTIONS.position.lng)
    .replace('{lat}', this._OPTIONS.position.lat)
    .replace('{tolerance}', ((tol) ? tol : tolerance));

    if (this.getLocation().servicePano) {
        url = url.replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano).replace('{type}', 4)
    } else if (this.getLocation().serviceDmi) {
        url = url.replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi).replace('{type}', 2)

    } else {
        this.message('该区域暂无任何影像资源', 2000);
    }
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (data.Status == 1) _this.setStation(data.Station);
            if (callback) callback(data);
        }
    })

    //this.loading();
}

LeadorPano.prototype.clearPano = function() {
    this.clearMarkers();
    //this.showArrow(false);
    this._VIEWER.setPanorama(PANO_IMAGE.NULLPNG, true);
}

LeadorPano.prototype.clearDmi = function() {
    // var dmi_panel = document.getElementById('dmi-panel');
    //if(dmi_panel)dmi_panel.remove();
}


/**
* 发送jsonp请求
* @param {object} options
* @param {string} options.url 请求地址
* @param {function} options.callback 回调方法
* @date  2018-12-11
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.sendJsonp = function(options) {
    var funcName = this.getRandom('jsonp');
    var script = document.createElement('script');
    script.src = options.url.toString().replace('{callback}', funcName)
    window[funcName] = function(data) {
        options.callback(data);
    }
    document.head.appendChild(script)
    document.head.removeChild(script)
}

/**
* 发送Ajax请求
* @param {object} options
* @param {string} options.url 请求地址
* @param {function} options.callback 回调方法
* @param {bool} options.async 异步：true，同步：false
* @param {string} options.type 请求方式get post
* @date  2019-04-11
* @author  luwenjun@leader.com.cn
*/


LeadorPano.prototype.sendAjax = function(options) {

    try {

        var xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, options.async);
        xhr.send(null);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    options.callback(JSON.parse(xhr.responseText));
                }
            }
        }
        xhr.onerror = function() {
            options.callback({ Status: -1, Message: '请求失败或服务不存在！' });
        }



    } catch (e) {
        options.callback({ Status: -1, Message: '请求失败或服务不存在！' });
    }


}

/**
* 发送jsonp请求
* @param {object} options
* @param {string} options.url 请求地址
* @param {function} options.callback 回调方法
* @return {object} name：方位 ，value：画布
* @author  luwenjun@leader.com.cn
*/
function getCanvas(text) {
    var canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'Anonymous'; //解决跨域
    img.src = PANO_IMAGE.ARROW_TXTURE_OUT;
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 100, 100);
        ctx.save();
        ctx.fillStyle = '#635D5C';
        ctx.font = 'Bold 25px \'字体\',\'字体\',\'微软雅黑\',\'宋体\'';
        if (text.length > 1) {
            ctx.fillText(text.split('')[0], 38, 50);
            ctx.fillText(text.split('')[1], 38, 80);
        } else {
            ctx.fillText(text.split('')[0], 38, 70);
        }
        ctx.textBaseline = 'middle'; //更改字号后，必须重置对齐方式，否则居中错乱。设置文本的垂直对齐方式
        ctx.textAlign = 'center';
    }
    return { name: text, value: canvas };
}


/**
*创建dom标签
*
* @param {object} options
* @param {string} options.name 标签 div span p
* @param {string} options.css css样式
* @param {string} options.html 需要注入的InnerHTML
* @return {object} dom标签对象
* @date 2018-12-18
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.addElement = function(options) {
    var ele = document.createElement(options.name);
    ele.style = options.css;
    ele.innerHTML = options.html;
    ele.id = this.getRandom(options.name);
    (document.body || document.html).appendChild(ele);
    return ele
}

/**
*更新dom标签
*
* @param {object} options
* @param {string} options.name 标签 div span p
* @param {string} options.css css样式
* @param {string} options.html 需要注入的InnerHTML
* @return {object} dom标签对象
* @date 2018-12-18
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.updateElement = function(options) {
    if (options.css) options.ele.style = options.css;
    if (options.html) options.ele.innerHTML = options.html;
    return options.ele
}


/**
*返回带有标记的唯一值
*
* @param {string} key 关键字
* @return  {string} 唯一字符串
* @date  2018-12-14
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.getRandom = function(key) {
    var date = new Date();
    return key.toUpperCase() + '_' + (Math.random() * 1000000).toFixed(0) + '_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate()
}

/**
*根据方位角返回方位
*
* @param {number} direction 方位角
* @return  {string} 方向描述
* @date  2018-12-11
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.getDirectionByAngle = function(direction) {
    var dir = Math.abs(direction) % 360, back = {};
    if (dir >= 11 && dir < 81) back = ARROW_TEXT.东北;
    else if (dir >= 81 && dir < 101) back = ARROW_TEXT.东;
    else if (dir >= 101 && dir < 171) back = ARROW_TEXT.东南;
    else if (dir >= 171 && dir < 191) back = ARROW_TEXT.南;
    else if (dir >= 191 && dir < 261) back = ARROW_TEXT.西南;
    else if (dir >= 261 && dir < 281) back = ARROW_TEXT.西;
    else if (dir >= 281 && dir < 351) back = ARROW_TEXT.西北;
    else back = ARROW_TEXT.北;
    return back;
}

/**
*根据两点经纬度计算直线距离
*
* @param {object} begin 开始点
* @param {number} begin.lon 开始点
* @param {number} begin.lat 开始点
* @param {number} end.lon 开始点
* @param {number} end.lat 开始点
* @return  {number} 距离
* @date  2019-04-11
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.getJLByCoord = function(begin, end) {
    var lat1 = this.getRad(begin.lat);
    var lat2 = this.getRad(end.lat);
    var a = lat1 - lat2;
    var b = this.getRad(begin.lon) - this.getRad(end.lon);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 63778137.0;
    s = Math.round(s * 10000) / 10000;
    return s;
}

//弧度=角度*PI/180
LeadorPano.prototype.getRad = function(c) {
    return c * Math.PI / 180;
}

//角度=弧度*180/PI
LeadorPano.prototype.getAng = function(c) {
    return c * 180 / Math.PI;
}

/**
*添加标注
*
* @param {object} options 
* @param {string} options.content 标记内容
* @param {string} options.tag 地物类
* @param {string} options.type 标记类型
* @param {string} options.stationid 站点
* @param {object} options.positon 坐标
* @param {number} options.positon.lng 经度
* @param {number} options.positon.lat 纬度
* @param {object} callback 回调 function(data) data添加结果
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.addMarker = function(options, callback) {

    var _this = this;
    var url = PANO_CONFIG.TWS_PANO_MARKER_ADD.concat()
        .replace('{name}', options.content)
        .replace('{tag}', options.tag)
        .replace('{type}', options.type)
        .replace('{symbolguid}', options.symbolguid)
        .replace('{imageid}', options.stationid)
        .replace('{pixshape}', options.position.lng + '|' + options.position.lat + '|0')
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano);
    console.log(options)
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (callback) callback(data);
            if (data.Status == 1) {
                _this.drawMarker(data.Guid, options);

                //刷新
                _this.clearMarkers();
                _this.loadMarkers();
            }
        }
    })
}

/**
* 绘制marker
*
* @param {string} stationid 站点id
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.drawMarker = function(id, options) {
    var opt = {
        id: id,
        longitude: this.getRad(options.position.lng),
        latitude: this.getRad(options.position.lat),
        //    image: PANO_IMAGE.PIN_RAD,
        html: '<div class=\'{className}\'>{content}</div>'.replace('{content}', options.content).replace('{className}', options.className) + '<img src=\'http://1.97.81.108/example/assets/pin-red.png\' style=\'width:25px\'>', //'HTML <b>marker</b> &hearts;',
        anchor: 'bottom center',
        scale: [1, 1],
        style: {
            //  maxWidth: '100px',
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Helvetica, sans-serif',
            textAlign: 'center'
        }
        // tooltip: {
        //     content: options.tag,
        //     position: 'top'
        // }
    }
    console.log(options);
    if (this.getStation().DataType == 4) {

        this._VIEWER.addMarker(opt);
    } else {

        this.addDMIMarker(opt);
    }
}

// dmi添加标记
LeadorPano.prototype.addDMIMarker = function(options) {


    var longitude = this.getAng(options.longitude) * (360 / 100);
    var latitude = this.getAng(options.latitude) * (360 / 100);

    var model = document.createElement('div');
    model.id = this.getRandom('dmi-marker');
    model.className = 'psv-marker psv-marker--normal has-tooltip psv-marker--visible';
    model.style.cssText = 'color: white;font-size: 16px;font-family: Helvetica, sans-serif;text-align: center;z-index: 180;';
    model.innerHTML = options.html;
    model.style.left = '{left}%'.replace('{left}', longitude / Math.pow(Math.PI, 2));
    model.style.top = '{top}%'.replace('{top}', latitude / Math.pow(Math.PI, 2));

    var getContainerID = document.getElementById('dmi-panel');
    getContainerID.appendChild(model);

    if (!this.DMI_MARKER) {
        this.DMI_MARKER = [];
    } else {
        this.DMI_MARKER.push(model);
    }

}
LeadorPano.prototype.clearDMIMarker = function() {
    if (this.DMI_MARKER) {
        for (var i in this.DMI_MARKER) {
            this.DMI_MARKER[i].remove();
        }
    }
}
//dmi-marker

LeadorPano.prototype.drawLabel = function(id, options) {
    var opt = {
        id: id,
        longitude: this.getRad(options.position.lng),
        latitude: this.getRad(options.position.lat),
        //    image: PANO_IMAGE.PIN_RAD,
        html: '<div class=\'{className}\'>{content}</div>'.replace('{content}', options.content).replace('{className}', options.className), //'HTML <b>marker</b> &hearts;',
        anchor: 'bottom center',
        scale: [1, 1],
        style: {
            //  maxWidth: '100px',
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Helvetica, sans-serif',
            textAlign: 'center'
        }
        /*  tooltip: {
        content: options.tag,
        position: 'top'
        }*/
    }
    this._VIEWER.addMarker(opt);
}

LeadorPano.prototype.nextStation = function() {
    var _this = this;
    var extend = this.getStation().Extend.substring(1, this.getStation().Extend.length - 2);
    extend = extend.split('}{');
    console.log(extend);

    var star = extend[0].split(',')[0];
    var stop = extend[extend.length - 2].split(',')[0];

    if (extend) {
        var sti = setInterval(times, 1000);
        var index = 0;
        function times() {
            if (index == extend.length - 1) clearInterval(sti);
            //console.log(extend[index]);
            _this.getStationByID(extend[index].split(',')[0], function(data) {
                console.log(data);
                var x = data.Station.X;
                var y = data.Station.Y;
                _this.chaotuMapSetCenter({ lng: x, lat: y });
            })
            index++;
        }


    }
}
/**
* 查询标注通过Stationid
*
* @param {string} stationid 站点id
* @param {object} callback 回调 function(data) data为查询结果
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.queryMarkerByStationID = function(imageid, callback) {
    if (this.getLocation().servicePano) {
        var url = PANO_CONFIG.TWS_PANO_MARKER_QUERT_BY_STATIONID.concat()
        .replace('{imageid}', imageid)
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano);

        this.sendAjax({
            async: true,
            type: 'get',
            url: url,
            callback: function(data) {
                if (callback) callback(data);
            }
        })
        url = null;
    }

}


/**
* 标注删除
*
* @param {string} guid id
* @param {object} callback 回调函数 functions(data) data为删除结果
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.deleteMarker = function(marker, callback) {
    var url = PANO_CONFIG.TWS_PANO_MARKER_DELETE_BY_GUID.concat()
        .replace('{guid}', marker.id)
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano);

    var _this = this;
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (data.Status == 1) _this._VIEWER.removeMarker(marker);
            if (callback) callback(data);
        }
    })
    url = null;
}


/**
* 显示该全景下所有marker根据Stationid加载
*
* @param {string} stationid 站点id
* @param {object} callback 回调函数 functions(data) data为查询结果
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.loadMarkers = function() {
    var _this = this;
    // 查询站点标记
    this.queryMarkerByStationID(this.getStation().StationID, function(data) {
        if (data.Status == 1) {
            // 绘制标记
            for (var i in data.ImageMarkers) {
                var pos = data.ImageMarkers[i].PixShape.split('|');
                var opt = { content: data.ImageMarkers[i].Name,
                    position: { lng: pos[0], lat: pos[1] },
                    tag: data.ImageMarkers[i].Tag,
                    className: 'pano-tag'
                }
                _this.drawMarker(data.ImageMarkers[i].Guid, opt);
            }

        }
    })

}
LeadorPano.prototype.getMarkerDataListByID = function(callback) {
    var _this = this;
    // 查询站点标记
    this.queryMarkerByStationID(this.getStation().StationID, function(data) {
        if (data.Status == 1) {
            //获取标记渲染到列表
            if (data.ImageMarkers) {
                _this.ImageMarkers = data.ImageMarkers;

            }
        }
        if (callback) callback(_this.ImageMarkers);

    })

}

LeadorPano.prototype.loadMarkerByData = function(data) {
    if (data.Status == 1) {
        // 绘制标记
        for (var i in data.ImageMarkers) {
            var pos = data.ImageMarkers[i].PixShape.split('|');
            var opt = { content: data.ImageMarkers[i].Name,
                position: { lng: pos[0], lat: pos[1] },
                tag: data.ImageMarkers[i].Tag,
                className: 'pano-tag'
            }
            this.drawMarker(data.ImageMarkers[i].Guid, opt);
        }

    }
}


/**
* 清空场景中所有marker
*
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.clearMarkers = function() {
    if (this._VIEWER) this._VIEWER.clearMarkers();
}

/**
* 获取当前光标选择的marker
*
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.getCurrentMarker = function() {
    return this._VIEWER.getCurrentMarker();
}



/**
* 列表显示marker
*
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.toggleMarkersList = function() {
    this._VIEWER.toggleMarkersList();
}

/**
* 路口的查询
*
* @param {string} guid id
* @param {object} callback 回调函数 functions(data) data为删除结果
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.getJoints = function(options, callback) {
    var serviceCode;
    if (this.getStation().DataType == 2) {
        serviceCode = this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi;
    } else {
        serviceCode = this.getLocation().serviceCode + '_' + this.getLocation().servicePano;
    }
    var url = PANO_CONFIG.TWS_PANO_STATION_JOINTS.concat()
        .replace('{station-id}', options.stationid.replace('-X-', '-0-'))
        .replace('{service-code}', serviceCode);
    // if (options.direction) url.replace('&direction={direction}', options.direction);

    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (callback) callback(data);
        }
    })
    url = null;
}



/**
* 导航
*
* @param {string} options 起终点坐标
* @param {object} callback 回调函数 functions(data) data为结果
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.getRoute = function(options) {
    var _this = this;

    if (!options) {
        options = {
            // begin:{lng:116.37074629843,lat:39.931245801454},
            //end:{lng:116.37112658523,lat:39.921477184186}
            begin: { lng: 114.146385, lat: 22.282139 },
            end: { lng: 114.15153, lat: 22.278528 }
        }

    }


    this.getRoutes({
        origin: options.begin,
        destination: options.end
    }, routeCallback);

    function routeCallback(data) {
        var paths = '', lnglat = [];
        if (data.status == 0) {

            for (var i in data.result.routes[0].steps) {
                paths += ';' + data.result.routes[0].steps[i].path;
            }
            paths = paths.substring(1, paths.length);

        }
        for (var i in paths.split(';')) {
            //  var coord = GPS.gcj02towgs84(paths.split(';')[i].split(',')[0], paths.split(';')[i].split(',')[1]);
            // lnglat.push([coord.lng, coord.lat]);
            lnglat.push([paths.split(';')[i].split(',')[0], paths.split(';')[i].split(',')[1]]);
        }
        playRoute(lnglat)
    }
}

LeadorPano.prototype.getRouteByCoord = function(options) {
    var _this = this;
    if (options.length <= 0) {
        this.message('getRouteByCoord 方法参数未获得导航数组', 2000);
        return false;
    }

    //图标定位到该区域
    this.chaotuMapSetCenter({ lng: Number(options[0][0]), lat: Number(options[0][1]) });
    //定位到该区域
    this.loadPlayByCoord({ lng: Number(options[0][0]), lat: Number(options[0][1]) }, 0.005);
    //添加全局数据
    window['pano_time_play_object'] = options;
    //开始导航
    playRoute();
}

// 配备与导航的实景导航
LeadorPano.prototype.loadPlayByCoord = function(options, tol) {
    var _this = this;
    this._OPTIONS.position = options;

    this.getReGeo({
        url: PANO_CONFIG.TWS_PANO_REGEO.concat().replace('{location}', this._OPTIONS.position.lng + ',' + this._OPTIONS.position.lat),
        callback: callback
    });

    function callback(data) {
        if (data.status == 0) {
            _this.queryAdCode(data);
            _this._setStationByCoord(callbackByCoord, 0.003);
        }
    }

    function callbackByCoord(data) {
        if (data.Status == 1) {
            if (data.Station.DataType == 2) {
                _this.initScenByDMI(true);
            } else if (data.Station.DataType == 4) {
                _this.initScenByPano(2); // 加载场景
            }

        } else {
            _this.clearPano();
            _this.loadDMIPhotoError();
        }
    }

}




/**
* 导航
*
* @param {string} options 起终点坐标
* @param {object} callback 回调函数 functions(data) data为结果
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.getRoutes = function(options, callback) {
    var url = PANO_CONFIG.TWS_PANO_ROUTE.concat()
        .replace('{origin}', options.origin.lng + ',' + options.origin.lat)
        .replace('{destination}', options.destination.lng + ',' + options.destination.lat);

    this.sendJsonp({ url: url, callback: callback });

}


// 获取站点信息
LeadorPano.prototype.getCameraInfo = function(callback) {
    var _this = this;
    if (this.getLocation().servicePano) {
        var url = PANO_CONFIG.TWS_PANO_STATION_INFO.concat()
        .replace('{imageid}', this.getStation().StationID.replace('-0-', '-X-'))
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().servicePano);

        this.sendAjax({
            async: true,
            type: 'get',
            url: url,
            callback: function(data) {
                _this._OPTIONS.Camera = data.ImageSize;
                if (callback) callback(data);
            }
        })
    }

}

// 获取DMI站点信息
LeadorPano.prototype.getDMICameraInfo = function(callback) {
    var url, _this = this;
    if (this.getLocation().serviceDmi) {
        url = PANO_CONFIG.TWS_PANO_SOURCE_DATA.concat()
        .replace('{imageid}', this.getStation().StationID)
        .replace('{service-code}', this.getLocation().serviceCode + '_' + this.getLocation().serviceDmi);

        this.sendAjax({
            async: true,
            type: 'get',
            url: url,
            callback: function(data) {

                _this._OPTIONS.DMIList = data;

                if (callback) callback(data);
            }
        })
    }




}

LeadorPano.prototype.setStationHD = function(val) {
    this.initScenByPano(val);
    this.message('高清全景加载中', 1000)
}

//消息窗
LeadorPano.prototype.showOverlay = function(image, texts, subtext) {
    this._VIEWER.showOverlay({ image: image, text: texts, subtext: subtext })
}


/*  TWS_PANO_SYMBOL_GET_BY_ID: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/GetMarkerSymbolByGuid/?guid={guid}', //通过唯一标识获取符号信息接口
TWS_PANO_SYMBOL_ADD: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/AddMarkerSymbol/?name={name}&tag={tag}&format=&return=', //新增符号信息接口
TWS_PANO_SYMBOL_DELETE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/DeleteMarkerSymbol/?guid={guid}&return=', //删除符号信息接口
TWS_PANO_SYMBOL_UPDATE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/UpdateMarkerSymbol/?guid={guid}&name={name}&tag={tag}&format=&return=', //修改符号信息接口
TWS_PANO_SYMBOL_GET_IMAGE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/GetMarkerSymbolFile/?guid={guid}', //获取符号图片接口
TWS_PANO_SYMBOL_SET_IMAGE: 'http://1.97.81.168:8088/{service-code}/Image3DMarkerService/UpdateMarkerSymbolFile/?guid={guid}', //更新符号图片接口
*/
LeadorPano.prototype.addSymbol = function(options, callback) {
  /*  var _this = this;
    var url = PANO_CONFIG.TWS_PANO_SYMBOL_ADD.concat()
    .replace('{lng}', options.position.lng)
    .replace('{lat}', options.position.lat)
    .replace('{type}', 2)
    .replace('{service-code}', this.getDMILocation().serviceCode.replace('_pano', '_dmi'))
    .replace('{tolerance}', tolerance);
    // 获得站点
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            callback(data)
        }
    })*/
this.sendAjax({
    async: true,
    type: 'get',
    url: 'http://1.97.81.108:2020/tms.ashx/?fun=QueryImageList',
    callback: function(data) {
        callback(data)
    }
})

}
LeadorPano.prototype.deleteSymbol = function(options, callback) {

}
LeadorPano.prototype.updateSymbol = function(options, callback) {

}
LeadorPano.prototype.getSymbol = function(callback) {
    /* $.ajax({
    url: "http://1.97.81.108:2020/tms.ashx/?fun=QueryImageList",
    data: xmlDocument,
    success: handleResponse
    })*/

    var _this = this;
    /* var url = PANO_CONFIG.TWS_PANO_SYMBOL_ADD.concat()
    .replace('{lng}', options.position.lng)
    .replace('{lat}', options.position.lat)
    .replace('{type}', 2)
    .replace('{service-code}', this.getDMILocation().serviceCode.replace('_pano', '_dmi'))
    .replace('{tolerance}', tolerance);*/
    // 获得站点
    this.sendAjax({
        async: true,
        type: 'get',
        url: 'http://1.97.81.108:2020/tms.ashx/?fun=QueryImageList',
        callback: function(data) {
            callback(data)
        }
    })
}

/**
* 坐标转换
* @author luwenjun 20160920
* @returns  坐标转换
*/

function panoBtoa(base64Str) {
    var bString = window.btoa(base64Str); //decodeURIComponent
    var len = bString.length;
    var arr = new Uint8Array(len);
    while (len--) {
        arr[len] = bString.charCodeAt(len);
    }
    return arr;
}
function panoAtob(bytes) {
    var bString = "";
    for (var i = 0; i < bytes.length; ++i) {
        bString += String.fromCharCode(bytes[i]);
    }console.log(bString);
    return window.btoa(encodeURIComponent(bString)); //encodeURIComponent
}

var GPS = {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta: function(lat, lng) {
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
        return { lat: dLat, lng: dLon };
    },
    //WGS-84 to GCJ-02
    wgs84togcj02: function(wgsLng, wgsLat) {
        if (this.outOfChina(wgsLat, wgsLng))
            return new TYLngLat_Normal(wgsLng, wgsLat);

        var d = GPS.delta(wgsLat, wgsLng);
        return { lng: Number(wgsLng) + Number(d.lng), lat: Number(wgsLat) + Number(d.lat) }
    },
    //GCJ-02 to WGS-84
    gcj02towgs84: function(gcjLng, gcjLat) {
        if (this.outOfChina(gcjLat, gcjLng))
            return { lat: gcjLat, lng: gcjLng };

        var d = GPS.delta(gcjLat, gcjLng);
        return { lng: Number(gcjLng) - Number(d.lng), lat: Number(gcjLat) - Number(d.lat) }
    },
    //GCJ-02 to WGS-84 exactly
    gcj_decrypt_exact: function(gcjLat, gcjLon) {
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
        return { "lng": wgsLon, "lat": wgsLon }
    },
    //GCJ-02 to BD-09
    bd_encrypt: function(gcjLat, gcjLon) {
        var x = gcjLon, y = gcjLat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
        bdLon = z * Math.cos(theta) + 0.0065;
        bdLat = z * Math.sin(theta) + 0.006;
        return { 'lat': bdLat, 'lng': bdLon };
    },
    //BD-09 to GCJ-02
    bd_decrypt: function(bdLat, bdLon) {
        var x = bdLon - 0.0065, y = bdLat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
        var gcjLon = z * Math.cos(theta);
        var gcjLat = z * Math.sin(theta);
        return { 'lat': gcjLat, 'lng': gcjLon };
    },
    distance: function(latA, logA, latB, logB) {
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
    outOfChina: function(lat, lng) {
        if (lng < 72.004 || lng > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    },
    transformLat: function(x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon: function(x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    }
};



/*
DMI
*/


LeadorDMI = function(station, code, callback_dmi) {

    var _this = this;


    _this.getDMIStationByID(station, code + '_dmi', callback);

    function callback(data) {
        if (callback_dmi) callback_dmi(data);
    }

}

/**
*返回带有标记的唯一值
*
* @param {string} key 关键字
* @return  {string} 唯一字符串
* @date  2018-12-14
* @author  luwenjun@leader.com.cn
*/
LeadorDMI.prototype.getRandom = function(key) {
    var date = new Date();
    return key.toUpperCase() + '_' + (Math.random() * 1000000).toFixed(0) + '_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate()
}

/**
*根据两点经纬度计算直线距离
*
* @param {object} begin 开始点
* @param {number} begin.lon 开始点
* @param {number} begin.lat 开始点
* @param {number} end.lon 开始点
* @param {number} end.lat 开始点
* @return  {number} 距离
* @date  2019-04-11
* @author  luwenjun@leader.com.cn
*/
LeadorDMI.prototype.getJLByCoord = function(begin, end) {
    var lat1 = this.getRad(begin.lat);
    var lat2 = this.getRad(end.lat);
    var a = lat1 - lat2;
    var b = this.getRad(begin.lon) - this.getRad(end.lon);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 63778137.0;
    s = Math.round(s * 10000) / 10000;
    return s;
}

// 逆向地理编码
LeadorDMI.prototype.getReGeo = function(options) {
    if (!options.url || !options.callback) {
        console.warn('参数缺失.')
    }

    this.sendJsonp({ url: options.url, callback: callback });

    function callback(data) {

        if (data.status != 0) {
            console.warn(data.message)
        }
        options.callback(data);
    }
}



//弧度=角度*PI/180
LeadorDMI.prototype.getRad = function(c) {
    return c * Math.PI / 180;
}

//角度=弧度*180/PI
LeadorDMI.prototype.getAng = function(c) {
    return c * 180 / Math.PI;
}



/**
* 发送jsonp请求
* @param {object} options
* @param {string} options.url 请求地址
* @param {function} options.callback 回调方法
* @date  2018-12-11
* @author  luwenjun@leader.com.cn
*/
LeadorDMI.prototype.sendJsonp = function(options) {
    var funcName = this.getRandom('jsonp');
    var script = document.createElement('script');
    script.src = options.url.toString().replace('{callback}', funcName)
    window[funcName] = function(data) {
        options.callback(data);
    }
    document.head.appendChild(script)
    document.head.removeChild(script)
}



LeadorDMI.prototype.sendAjax = function(options) {

    var xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url, options.async);
    xhr.send(null);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                options.callback(JSON.parse(xhr.responseText));
            }
        }
    }
    xhr.onerror = function() {
        options.callback({ Status: -1, Message: '请求失败或服务不存在！' });
    }
}

/*LeadorDMI.prototype.sendAjaxPost = function(options) {
var file = this.files[0];
var reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.onload = function(e) {
console.log(e);
var result = e.target.result;

var xhr = new XMLHttpRequest();
xhr.open(options.type, options.url, options.async);
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


}*/



/**
* DMI查询根据站点坐标查询并返回DMI分页url
* @param options
* @param options.lng 经度
* @param options.lat 纬度
*/
LeadorDMI.prototype.getDMIStationByCoord = function(options, callback) {

    var _this = this;
    var url = PANO_CONFIG.TWS_PANO_COORD_SEARCH.concat()
    .replace('{lng}', options.position.lng)
    .replace('{lat}', options.position.lat)
    .replace('{type}', 2)
    .replace('{service-code}', this.getDMILocation().serviceCode.replace('_pano', '_dmi'))
    .replace('{tolerance}', tolerance);
    // 获得站点
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            //_this.message(data.Message, 5000);
            _this.DMIStation = data.Station;
            //_this.setStation(data.Station);

            callback(data)
        }
    })



}


// 获取DMI站点信息
LeadorDMI.prototype.getDMICameraInfo = function(callback) {
    var url, _this = this;
    if (this.getDMILocation().serviceCode) {
        url = PANO_CONFIG.TWS_PANO_SOURCE_DATA.concat()
        .replace('{imageid}', this.getDMIStation().StationID)
        .replace('{service-code}', this.getDMILocation().serviceCode.replace('_pano', '_dmi'));

        this.sendAjax({
            async: true,
            type: 'get',
            url: url,
            callback: function(data) {
                if (data.Status == 1) {
                    _this.Camera = data.Sizes;
                }

                if (callback) {
                    callback(data);
                }
            }
        })
    }




}


// 获得DMI逆向地理数据
LeadorDMI.prototype.getDMILocation = function() {
    return this.DMILocation;
}

// 获得DMI逆向地理数据
LeadorDMI.prototype.setDMILocation = function(options) {
    this.DMILocation = options;
}
// 获取DMI图片列表
LeadorDMI.prototype.getDMIImageList = function(options) {
    if (!options) {
        options = this.DMIStation.StationID
    }

    var station = [];
    var url = PANO_CONFIG.TWS_PANO_HD.concat()
         .replace('{z}', 0)
         .replace('{col}', 0)
         .replace('{row}', 0)
         .replace('{service-code}', this.getDMILocation().serviceCode.replace('_pano', '_dmi'))
         .replace('{station-id}', options.substring(0, 6) + '-{index}-' + options.substring(9, 27))

    this.DMIImageList = url;
    return this.DMIImageList
}

// 获得当前站点
LeadorDMI.prototype.getDMIStation = function() {
    return {
        StationID: this.DMIStation.StationID,
        Address: this.DMIStation.Address,
        DataType: this.DMIStation.DataType,
        Direction: this.DMIStation.Direction,
        XYZ: [this.DMIStation.X, this.DMIStation.Y, this.DMIStation.H],
        Direction: this.DMIStation.Direction,
        Next: this.DMIStation.Next,
        Previous: this.DMIStation.Previous,
        Yaw: this.DMIStation.Yaw,
        Roll: this.DMIStation.Roll,
        Pitch: this.DMIStation.Pitch
    };
}
// 更新当前站点
LeadorDMI.prototype.setDMIStation = function(options) {
    this.DMIStation = options;
}

// 根据站点ID查询站点
LeadorDMI.prototype.getDMIStationByID = function(station, sercercode, callback) {

    var url = PANO_CONFIG.TWS_PANO_STATION_SEARCH.concat()
        .replace('{station-id}', station)
        .replace('{service-code}', sercercode);

    var _this = this;
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (data.Status == 1) {
                _this.setDMIStation(data.Station)
            }

            if (callback) callback(data);
        }
    })

}

// 根据像素坐标算实际坐标
LeadorDMI.prototype.getDMIMeasure = function(options, dmicallback) {

    var url = PANO_CONFIG.TWS_PANO_MEASURE.concat()
        .replace('{leftimageid}', options.leftid)
        .replace('{leftx}', options.leftx)
        .replace('{lefty}', options.lefty)
        .replace('{rightimageid}', options.rightid)
        .replace('{rightx}', options.rightx)
        .replace('{righty}', options.righty)
        .replace('{service-code}', this.getDMILocation().serviceCode.replace('_pano', '_dmi'));

    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (dmicallback) {
                dmicallback(data);
            }
        }
    })

}

//pano._VIEWER.setCaption();
var pano_cookie = {
    setCookie: function(key, value, time) {
        var tmpDate = new Date();
        tmpDate.setTime(tmpDate.getTime() + (time * 1000 * 60 * 60 * 24));
        document.cookie = key + "=" + value + ";expires=" + tmpDate.toUTCString() + "";
    },
    getCookie: function(key) {
        var keyName = key + "=";
        var kArr = document.cookie.split(";");
        for (var i = 0; i < kArr.length; i++) {
            var cc = kArr[i].trim();
            if (cc.indexOf(keyName) == 0) {
                return cc.substring(keyName.length, cc.length)
            }
        }
        return "";
    },
    delCookie: function(key) {
        setCookie(key, "", -1);
    }
}
