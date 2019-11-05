/**
* Created by luwenjun on 2018/11/13.
*/
var LeadorPano = {};
var PANO_IMAGE = {} // 图片资源
var PANO_CONFIG = {} // 全景资源配置;
var IMAP_CONFIG = {}; // 地图资源配置
var ARROW_TEXT = {} // 创建箭头画布
var PANO_DATATYPE = {
    ISHOWCHINA: 'ISHOWCHINA',
    TWS: 'TWS'
}
var PANO_ZOOM = {
    ZOOM0: { col: 1, row: 1, zom: 0, offset_c: 0, offset_r: 0 },
    ZOOM1: { col: 2, row: 1, zom: 1, offset_c: 0, offset_r: 0 },
    ZOOM2: { col: 3, row: 2, zom: 2, offset_c: -38, offset_r: -300 },
    ZOOM3: { col: 6, row: 3, zom: 3, offset_c: -76, offset_r: -100 },
    ZOOM4: { col: 12, row: 6, zom: 4, offset_c: -152, offset_r: -200 }
}

PANO_CONFIG = {
    TWS_PANO_HD: 'http://1.97.81.194:8080/{service-code}/Image3DResourceService/GetImageTile/?clientType=2&ImageID={station-id}&row={row}&col={col}&zoom={z}', // 全景高清格式化地址 000002-X-201303210444250000
    TWS_PANO_COORD_SEARCH: 'http://1.97.81.194:8080/{service-code}/Image3DIndexService/GetStationByCoord/?x={lng}&y={lat}&type={type}&tolerance={tolerance}', // 根据坐标查询全景 116.4114340470&y=39.9069079720
    TWS_PANO_STATION_STEP_SEARCH: 'http://1.97.81.194:8080/{service-code}/Image3DIndexService/GetStationByStep/?StationID={station-id}&step={step}', // ?StationID=005212-0-201408210332080540&step=1
    TWS_PANO_STATION_SEARCH: 'http://1.97.81.194:8080/{service-code}/Image3DIndexService/GetStationByID/?StationID={station-id}', // 根据站点查全景 000271-0-200903140245410789
    TWS_PANO_SOURCE_DATA: 'http://1.97.81.194:8080/{service-code}/Image3DIndexService/GetImageMetadata/?return', //获取元数据信息接口
    TWS_PANO_REGEO: 'http://1.97.81.202:25001/v3/rgeo?ak=ec85d3648154874552835438ac6a02b2&location={location}&callback={callback}', // 逆向地理编码
    TWS_PANO_MEASURE: 'http://1.97.81.194:8080/{service-code}/Image3DMeasureService/Pixel2Coord/?MeasureType=1&leftimageid={leftimageid}&leftx={leftx}&lefty={lefty}&rightimageid={rightimageid}&rightx={rightx}&righty={righty}&coortype=300&prjtype=313&return', //000073-1-200703200330180146
    TWS_PANO_MARKER_ADD: 'http://1.97.81.194:8080/{service-code}/Image3DMarkerService/AddImageMarker/?name={name}&tag={tag}&type={type}&symbolguid={symbolguid}&imageid={imageid}&pixshape={pixshape}&geoshape=',
    TWS_PANO_MARKER_QUERT_BY_STATIONID: 'http://1.97.81.194:8080/{service-code}/Image3DMarkerService/SearchImageMarkersByImageID/?imageid={imageid}&position=&pagecount=&return',
    TWS_PANO_MARKER_DELETE_BY_GUID: 'http://1.97.81.194:8080/{service-code}/Image3DMarkerService/DeleteImageMarker/?guid={guid}&return',
};

PANO_IMAGE = {
    ARROW_TXTURE_OUT: '../example/assets/topo.png',
    ARROW_TXTURE_IN: '../example/assets/topo_hover.png',
    PIN_RAD: '../example/assets/pin-red.png',
    LOGO: '../example/assets/logo_03.png',
    MARKER_MONKEY: '../example/assets/monkey.png',
    SECTOR: '../example/assets/sector.png'
};

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
        duration: 500, // 过渡时长
        loader: true // 过渡图片
    }

    this._OPTIONS.timeAnim = options.timeAnim || false;

    this._OPTIONS.fov = options.fov || 90;

    this._OPTIONS.lng = options.lng || 0;

    this._OPTIONS.lat = options.lat || 0;

    //this._OPTIONS.loadingImage = options.loadingImage || PANO_IMAGE.LOGO;

    this._OPTIONS.loadingTxt = options.loadingTxt || '加载中...';

    this._OPTIONS.loadShrink = options.loadShrink || undefined;

    this._OPTIONS.pluginArrow = options.pluginArrow || undefined;

    this._OPTIONS.pluginMasure = options.pluginMasure || undefined;

    // 是否加载小地图 默认true加载，false不加载
    // this._OPTIONS.map_tool = options.map_tool || false;

    this._OPTIONS.latitudeRange = options.latitudeRange || [Math.PI / 2, -Math.PI / 3.5].sort();

    // 是否加载标记
    this._OPTIONS.loadMarker = options.loadMarker || undefined;

    // 绘制容器
    if (!container) {
        throw new Error('container 缺失.');
    }
    this._OPTIONS.container = container;

    // 全景坐标
    if (options.position && options.position.lng && options.position.lat) {
        this._OPTIONS.position = options.position;
    }

    if (!this._VIEWER) {
        this.init()
    }

    // 加载
    this.setStationByCoord();
}




LeadorPano.prototype.setStationByCoord = function(options) {
    var _this = this;
    // 接受参数
    if (options) {
        this._OPTIONS.position = options.position;
    }

    // 坐标使用逆向地理编码解析citycode
    this.getReGeo({
        url: PANO_CONFIG.TWS_PANO_REGEO.concat().replace('{location}', this._OPTIONS.position.lng + ',' + this._OPTIONS.position.lat),
        callback: regeo
    });

    function regeo(data) {
 // ad_code.js
            if (!AD_CODE) {
                throw new Error('AD_CODE 字典表缺失')
            }
            if (!data.result || !data.result[0]) {
                throw new Error('result 异常')
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
            for (var i in AD_CODE) {
                if ((AD_CODE[i][1].toString().substring(0, 4) + '00') === (location.adCode.toString().substring(0, 4) + '00')) {
                    location.serviceCode = AD_CODE[i][0];
                    break;
                }
            }
            if (!location.serviceCode) {
                throw new Error('serviceCode 缺失');
            }
            _this.setLocation(location);


            // 设置站点
            _this._setStationByCoord(function(data){
              if (data.Status == 1) {
                _this.setStation(data.Station); // 缓存站点
                _this.initHD(); // 加载场景
              }
              
              _this.message(data.Message, 5000);
            })
    }


}



// 逆向地理编码
LeadorPano.prototype.getReGeo = function(options) {
    if (!options.url || !options.callback) {
        throw new Error('参数缺失.')
    }

    this.sendJsonp({ url: options.url, callback: callback });

    function callback(data) {

        if (data.status != 0) {
            throw new Error(data.message)
        }
        options.callback(data);
    }
}

/**
* 方向性箭头的绘制
* @param options
* @param options.panorama 全景地址集合
*/
LeadorPano.prototype._controller = function(options) {
    if (!options) {
        throw new Error('参数缺失.')
    }


    // 缓存事件用于注销
    if (this._ARROW_EVENT) {
        // 注销绑定的事件
        for (var i = 0; i < this._ARROW_EVENT.length; i++) {
            this._unbind(this._ARROW_EVENT[i].name, this._ARROW_EVENT[i].func);
        }
    }
    this._ARROW_EVENT = []

    // 模型缓存清空
    if (this._SELECT_PANEL) {
        for (var i = 0; i < this._SELECT_PANEL.length; i++) {
            this._VIEWER.scene.remove(this._SELECT_PANEL[i]);
        }
    }
    this._SELECT_PANEL = [];

    var _this = this;
    this.getStationByID(this.getStation().StationID, this.getLocation().serviceCode, function(data) {
        // 准备加载
        if (data.Status == 1) {
            _this._VIEWER.once('panorama-loaded', callback);
        }

        console.warn(data.Message)
        //console.log(_this._OPTIONS.data.Station)
        function callback() {

            // 箭头工具
            if (_this._OPTIONS.pluginArrow) {
                _this._pluginArrow();
            }

            // 量测工具
            if (_this._OPTIONS.pluginMasure) {
                _this._pluginMasure()
            }

          
        }
    });


}

// 全景站点获取
LeadorPano.prototype.getStationByID = function(station, sercercode, callback) {
    var url = PANO_CONFIG.TWS_PANO_STATION_SEARCH.concat()
        .replace('{station-id}', station)
        .replace('{service-code}', sercercode)
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
        this.lnglat = { lng: _this._OPTIONS.data.LonLatShape.X, lat: _this._OPTIONS.data.LonLatShape.Y }
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
            center: new IMAP.LngLat(_this._OPTIONS.data.LonLatShape.X, _this._OPTIONS.data.LonLatShape.Y)//中心点坐标
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
        var angle = (180 / Math.PI * lnglat.longitude) - _this._OPTIONS.data.Yaw;
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
            _this.message('此区域暂无全景', 5000);
            return false;
        }
        _this._OPTIONS.data.StationID = data.StationID;
        _this._OPTIONS.loadShrink = true;
        if (!data.LonLatShape) {
            _this._PANO_MAP._MONKEY_MARKER.setPosition({ lng: data.LonLatShape.X, lat: data.LonLatShape.Y })
        }
        _this.initHD();
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
    var options= this._OPTIONS.data;
    if (!options) {
        throw new Error('参数缺失')
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
        throw new Error('参数缺失');
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
        throw new Error('对象未实例');
    }
    if (!options) {
        throw new Error('参数缺失');
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
        throw new Error('捕获异常')
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
    console.log(this._EVENT.selectModels)
}

// 根据 neme 删除 object3D
LeadorPano.prototype.toggleArrow = function() {
    if (!this._VIEWER) {
        throw new Error('对象未实例');
    }
    if (!this._ARROW_GROUP) {
        throw new Error('对象未实例');
    }
    if (this._ARROW_GROUP.show) {
        this._VIEWER.scene.add(this._ARROW_GROUP);
        this._ARROW_GROUP.show = false;
    } else {
        this._VIEWER.scene.remove(this._ARROW_GROUP);
        this._ARROW_GROUP.show = true;
    }
    return this._ARROW_GROUP.show
}


LeadorPano.prototype._arrowClick = function() {
    this._EVENT = {};
    this._EVENT.selectModels = this._raycaster(event);
    if (!this._EVENT.selectModels) {
        throw new Error('捕获异常')
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
        return false;
    }

    this._OPTIONS.data.StationID = this._EVENT.selectModels.station.replace('-0-', '-X-');
    //this._OPTIONS.loadShrink = true;
    this.initHD();
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
        this._INTERSECTED = undefined
    }
    return this._INTERSECTED
}


// 添加箭头
LeadorPano.prototype._pluginArrow = function() {

    // 清空现有箭头
    if (this._ARROW_GROUP) {
        this._VIEWER.scene.remove(this._ARROW_GROUP);
    }

    // 绘制新箭头
    this._ARROW_GROUP = new THREE.Group();
    this._ARROW_GROUP.name = this.getRandom('arrow');
    this._VIEWER.scene.add(this._ARROW_GROUP);
    //this._straight({ arrow_rotation: 0, station: 0, text_rotation: 0 });  //此处bug

    var options = this._OPTIONS.data;
    console.warn((options.JunctionItems == true ? ' × 交叉路口' : ' — 直行路口'));
    if (options.JunctionItems) {
        //交叉口
        var index_x = 0;
        while (index_x < options.JunctionItems.length) {
            this._cross({
                arrow_rotation: (options.JunctionItems[index_x].Angle + 360) % 360,
                station: options.JunctionItems[index_x].StationID,
                text_rotation: (options.JunctionItems[index_x].Angle + 360 - options.angle) % 360
            });
            index_x++;
        }
    } else {
        if (options.Next && options.Yaw) {
            this._straight({ arrow_rotation: 180, station: options.Next, text_rotation: (360 - options.Yaw - 180) });  //前进一个视野站点
        }
        if (options.Previous && options.Yaw) {
            this._straight({ arrow_rotation: 0, station: options.Previous, text_rotation: (360 - options.Yaw) }); //后退一个视野站点
        }
    }

    var _this = this;

    // 点击事件
    this._bind('click', backClick)
    this._ARROW_EVENT.push({ name: 'click', func: backClick });
    function backClick() {
        window.event.preventDefault()
        // 箭头点击事件
        _this._arrowClick();
    }
    /*
    this._bind('mousemove',backMove)
    this._ARROW_EVENT.push({name: 'mousemove', func: backMove});
    function backMove() {
    window.event.preventDefault()
    _this._arrowMove();
    }*/
}

LeadorPano.prototype._cross = function(options) {
    this._ARROW_DROW = {}

    //文字获取 ARROW_TEXT
    this._ARROW_DROW.rotation = (options.text_rotation + 360) % 360; //排除负值
    console.log('_cross', 360 - (this._ARROW_DROW.rotation + 180) % 360)
    this._ARROW_DROW.canvas = this.getDirectionByAngle(360 - (this._ARROW_DROW.rotation) % 360);
    this._ARROW_DROW.geometry = new THREE.PlaneGeometry(1.4, 2.0, 1); //控制箭头大小
    this._ARROW_DROW.material = new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(this._ARROW_DROW.canvas.value),
        transparent: true,
        opacity: 0.9
        // side: THREE.DoubleSide//双面显示
    });

    // 计算子网格的旋转坐标
    this._ARROW_DROW.angle = Math.PI / 180 * options.arrow_rotation;
    this._ARROW_DROW.jd = 180 * (this._ARROW_DROW.angle + Math.PI / 2) / Math.PI;
    this._ARROW_DROW.mesh_x = 0.0 + 1.5 * Math.cos(this._ARROW_DROW.jd * Math.PI / 180);
    this._ARROW_DROW.mesh_y = 0.0 + 1.5 * Math.sin(this._ARROW_DROW.jd * Math.PI / 180);

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
        this.__jd = _this.getViewPosition().longitude - Math.PI / 2;
        this.__x = 0 + 5.0 * Math.cos(this.__jd)
        this.__y = 0 + 5.0 * Math.sin(this.__jd)
        _this._ARROW_GROUP.position.set(-this.__x, -1.5, -this.__y);
        _this._VIEWER.renderer.render(_this._VIEWER.scene, _this._VIEWER.camera);
    })
}

LeadorPano.prototype._straight = function(options) {
    this._ARROW_DROW = {};
    // var rotation, canvas, geometry, material, angle, jd, cos_x, sin_y, mesh, object3D;
    // 图片贴图样式

    //文字获取 ARROW_TEXT
    this._ARROW_DROW.rotation = (options.text_rotation + 360) % 360; //排除负值
    this._ARROW_DROW.canvas = this.getDirectionByAngle(360 - (this._ARROW_DROW.rotation + 180) % 360);
    this._ARROW_DROW.geometry = new THREE.PlaneGeometry(1.4, 1.8, 1); //控制箭头大小
    this._ARROW_DROW.material = new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(this._ARROW_DROW.canvas.value), //options.texture,
        transparent: true,
        opacity: 0.9
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
        this.__jd = (_this.getViewPosition().longitude * Math.PI / 180) - Math.PI / 2;
        this.__x = 0 + 5.0 * Math.cos(this.__jd);
        this.__y = 0 + 5.0 * Math.sin(this.__jd);
        _this._ARROW_GROUP.position.set(-this.__x, -3.0, -this.__y);
        _this._VIEWER.renderer.render(_this._VIEWER.scene, _this._VIEWER.camera);
    })

}

LeadorPano.prototype._addRequestAnimationFrame = function(options) {
    if (typeof options == 'function') {
        var RAF = 'RequestAnimationFrame'//PANO_TOOL.getRandom('RequestAnimationFrame');

        if (window[RAF]) {
            delete window[RAF];
        }

        window[RAF] = function() {
            window.requestAnimationFrame(window[RAF]);
            options();
        }
        window[RAF]();
    }
}

// 反转系统
LeadorPano.prototype._changePivot = function(x, y, z, obj) {
    this._ARROW_GROUP.position.set(x, y, z);
    obj.position.set(x, y, z);
    return obj;
}


LeadorPano.prototype.initHD = function() {

    //if (this._OPTIONS.data_type == PANO_DATATYPE.TWS) {
        this._mergeNxNImage(PANO_ZOOM.ZOOM3)
  //  } else if (this._OPTIONS.data_type == PANO_DATATYPE.ISHOWCHINA) {
   //     this._merge4x6Image()
   // }



    // 根据数据设置航向
    if (this.getStation().Yaw) {
        this.setAngle({ longitude: Number(this.getStation().Yaw) * Math.PI / 180, latitude: 0 })
    }

    // 加载全景说明信息
    if (this.getStation().StationID) {
        var text = [];
        text.push(this.getLocation().province + this.getLocation().city + this.getLocation().district + this.getLocation().street + this.getStation().Address);
        text.push(this.getStation().StationID.split('-')[2].substring(0, 8));
        text.push(this.getStation().XYZ.join(','));

        var queryid = document.getElementById('copyright-leador');
        if (!queryid) {
            var panoBody = window.document.getElementById(this.getContainerID());
            var childText = window.document.createElement('div');
            childText.className = "copyright";
            childText.id = "copyright-leador";
            childText.innerHTML = text.join(' | ');
            panoBody.appendChild(childText)
        } else {
            queryid.innerHTML = text.join(' | ');
        }

    }
    
     this.clearMarkers();
      // 加载标记
            if (this._OPTIONS.loadMarker) {
                this.loadMarkers(); 
            }
}
// TWS系统图片拼接模式
LeadorPano.prototype._mergeNxNImage = function(options) {
    var hd = PANO_CONFIG.TWS_PANO_HD.concat()
        .replace('{z}', options.zom)
        .replace('{station-id}', this.getStation().StationID.replace('-0-', '-X-'))
        .replace('{service-code}', this.getLocation().serviceCode)
    // .replace('{dataType}', options.dataType)

    var _this = this;

    //合并图片
    var tileOption = {
        position: [],
        data: [],
        canvasWidth: 512 * Number(options.col) + (options.offset_c),
        canvasHeight: 512 * Number(options.row) + (options.offset_r),
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

    function callback(imageUrl) {
        // src赋值
        _this._PANOURL = imageUrl;

        // 加载结束既重新绘制全景
        _this._VIEWER.setPanorama(_this._PANOURL, true);


        // 加载插件 方向箭头 量测工具 小地图
        _this._controller(_this._OPTIONS);
    }
}

var mergeIndex = 0, nextArr = [2, 4, 1, 3, 5, 6], zIndex = 0;
// IShowChina图片拼接模式
LeadorPano.prototype._merge4x6Image = function(i) {
    i = i || nextArr[0];
    var hd = PANO_CONFIG.TWS_PANO_HD.concat()
        .replace('{f}', i)
        .replace('{s}', this.getStation().StationID)
    // .replace('{dataType}', options.dataType)

    var _this = this;

    //合并图片
    this._mergeImage({
        position: [[0, 0], [512, 0], [0, 512], [512, 512]],
        data: [
            hd.replace('{row}', 0).replace('{col}', 0),
            hd.replace('{row}', 0).replace('{col}', 1),
            hd.replace('{row}', 1).replace('{col}', 0),
            hd.replace('{row}', 1).replace('{col}', 1)
        ],
        canvasWidth: 1024,
        canvasHeight: 1024,
        imgWidth: 512,
        imgHeight: 512,
        index: mergeIndex,
        callback: callback
    })
    function callback(imageUrl, type) {
        // src赋值
        switch (type) {
            case 3:
                _this._PANOURL.left = imageUrl;
                break;
            case 4:
                _this._PANOURL.front = imageUrl;
                break;
            case 1:
                _this._PANOURL.right = imageUrl;
                break;
            case 2:
                _this._PANOURL.back = imageUrl;
                break;
            case 5:
                _this._PANOURL.top = imageUrl;
                break;
            case 6:
                _this._PANOURL.bottom = imageUrl;
                break;
        }

        // 加载结束既重新绘制全景
        if (zIndex == 5) {
            if (_this._VIEWER) {
                _this._VIEWER.setPanorama(_this._PANOURL, true);
            } else {
                _this.init()
            }

            // 加载插件 方向箭头 量测工具 小地图
            _this._controller(_this._OPTIONS);

            // 重置
            zIndex = 0;
        }
        zIndex++;
    }

    mergeIndex++
    if (mergeIndex < 7) this.merge4X6Image(nextArr[mergeIndex]);
    mergeIndex = 0;
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
        // caption: options.desc,
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
        navbar: false //options.navbar
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
        longitude: coord.longitude * 180 / Math.PI,
        latitude: coord.latitude * 180 / Math.PI
    };
}

// 摄像机漫游到一个视野坐标
LeadorPano.prototype.setAnimateAngle = function(options, time) {

    this._VIEWER.animate({ longitude: options.longitude * Math.PI / 180, latitude: options.latitude * Math.PI / 180 }, time)
}

// 开启或关闭自动旋转摄像机
LeadorPano.prototype.toggleAutoRotate = function() {

    this._VIEWER.toggleAutorotate();
}

// 设置摄像机到一个视野坐标
LeadorPano.prototype.setAngle = function(options) {
    if (this._VIEWER) {
        this._VIEWER.rotate({ longitude: options.longitude * Math.PI / 180, latitude: options.latitude * Math.PI / 180 })
    }
}

// 获取容器大小
LeadorPano.prototype.getViewSize = function() {

    return this._VIEWER.getSize();
}
// 根据步数加载前一步或后一步 step 正数前进 负数后退
LeadorPano.prototype.setStationStep = function(station, step) {

    if (!station) throw new Error('station 缺失.');
    if (step == 0 || typeof (step) != 'number') throw new Error('step 步数不可为0.');


    station = station.replace('-X-', '-0-')
    var _this = this;
    this.sendAjax({
        async: true,
        type: 'get',
        url: PANO_CONFIG.TWS_PANO_STATION_STEP_SEARCH.concat()
        .replace('{station-id}', station)
        .replace('{step}', step)
        .replace('{service-code}', this.getLocation().serviceCode),
        callback: function(data) {

            _this.message(data.Message, 2000);

            if (data.Status == 1) {
                // 历史站点备注
                _this.setStation(data.Station);
                _this.initHD()
            }
        }
    })
}

// 获得当前站点
LeadorPano.prototype.getStation = function() {
    return {
        StationID: this._OPTIONS.data.StationID,
        Address: this._OPTIONS.data.Address,
        DataType: this._OPTIONS.data.DataType,
        Direction: this._OPTIONS.data.Direction,
        XYZ: [this._OPTIONS.data.X, this._OPTIONS.data.Y, this._OPTIONS.data.H],
        Direction: this._OPTIONS.data.Direction,
        Next: this._OPTIONS.data.Next,
        Previous: this._OPTIONS.data.Previous,
        Yaw: this._OPTIONS.data.Yaw,
        Roll: this._OPTIONS.data.Roll,
        Pitch: this._OPTIONS.data.Pitch
    };
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
    if (!options) throw new Error('options 缺失.');
    this._OPTIONS.data = options;
    this._OPTIONS.StationID = options.StationID.replace('-0-', '-X-');
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
            throw new Error('content 缺失.');
        }
        timeout = timeout || 2000;
        this._VIEWER.showNotification({ content: content, timeout: timeout })
    }

}

/**
* 获取视野缩放等级
* @date 2018-12-11
* @author luwenjun@leader.com.cn
*/
LeadorPano.prototype.getZoom = function() {
    if (!this._VIEWER) {
        throw new Error('全景未实例化.');
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
        throw new Error('_VIEWER或参数异常');
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
        throw new Error('参数缺失.')
    }
    if (!this._VIEWER.container) {
        throw new Error('参数container缺失.')
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
        throw new Error('参数缺失.')
    }
    if (!this._VIEWER.container) {
        throw new Error('参数container缺失.')
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
    var _this=this;
    this._VIEWER.on(name, function(e){
        var lnglat = { lng:_this.getAng(e.longitude) , lat: _this.getAng(e.latitude) };
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
   var _this=this;
    this._VIEWER.off(name, function(e){
        var lnglat = { lng:_this.getAng(e.longitude) , lat: _this.getAng(e.latitude) };
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
   var _this=this;
    this._VIEWER.once(name, function(e){
        var lnglat = { lng:_this.getAng(e.longitude) , lat: _this.getAng(e.latitude) };
        event(lnglat)
    }, useCapture);
}


/**
* 根据坐标查询全景
* @param options
* @param options.lng 经度
* @param options.lat 纬度
*/
LeadorPano.prototype.updatePanoByCoord = function(options, func) {
    var url = PANO_CONFIG.TWS_PANO_COORD_SEARCH.concat()
        .replace('{r}', 0.00100)
        .replace('{service-code}', this.getLocation().serviceCode)
        .replace('{type}', 4)
        .replace('{location}', options);
    this.sendJsonp({ url: url, callback: func })
}


/**
* DMI查询根据站点坐标查询并返回DMI分页url
* @param options
* @param options.lng 经度
* @param options.lat 纬度
*/
LeadorPano.prototype.getDMIStationByCoord = function(options, callback_dmi) {

    var _this = this;
    var url = PANO_CONFIG.TWS_PANO_COORD_SEARCH.concat()
    .replace('{lng}', options.position.lng)
    .replace('{lat}', options.position.lat)
    .replace('{type}', 2)
    .replace('{service-code}', 'xianggang')
    .replace('{tolerance}', options.tel);
    // 获得站点
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {

            _this.message(data.Message, 5000);
            if (data.Status != 1) {
                return false;
            }
            _this._OPTIONS.DMIStation = data.Station;
            var StationID = _this._OPTIONS.DMIStation.StationID;

            callback_dmi(StationID)
        }
    })
    // 请求逆向地理编码

    this.getReGeo({
        url: PANO_CONFIG.TWS_PANO_REGEO.concat().replace('{location}', options.position.lng + ',' + options.position.lat),
        callback: function(data) {
            if (data.status != 0) {
                console.warn(data.message);
                return false;
            }
            _this.setDMILocation(data.result[0].addressComponent);
        }
    })
}
// 获得DMI逆向地理数据
LeadorPano.prototype.getDMILocation = function() {
    return this._OPTIONS.DMILocation;
}
// 获得DMI逆向地理数据
LeadorPano.prototype.setDMILocation = function(options) {
    this._OPTIONS.DMILocation = options;
}
// 获取DMI图片列表
LeadorPano.prototype.getDMIImageList = function(options) {
    if (!options) {
        options = this._OPTIONS.DMIStation.StationID
    }

    var station = [];
    var url = PANO_CONFIG.TWS_PANO_HD.concat()
         .replace('{z}', 0)
         .replace('{col}', 0)
         .replace('{row}', 0)
         .replace('{service-code}', 'xianggang');

    for (var i = 1; i <= 6; i++) {
        station.push(url.replace('{station-id}', options.substring(0, 6) + '-' + i + '-' + options.substring(9, 27)));
    }

    this._OPTIONS.DMIImageList = station;
    return this._OPTIONS.DMIImageList
}

// 获得当前站点
LeadorPano.prototype.getDMIStation = function() {
    return {
        StationID: this._OPTIONS.DMIStation.StationID,
        Address: this._OPTIONS.DMIStation.Address,
        DataType: this._OPTIONS.DMIStation.DataType,
        Direction: this._OPTIONS.DMIStation.Direction,
        XYZ: [this._OPTIONS.DMIStation.X, this._OPTIONS.DMIStation.Y, this._OPTIONS.DMIStation.H],
        Direction: this._OPTIONS.DMIStation.Direction,
        Next: this._OPTIONS.DMIStation.Next,
        Previous: this._OPTIONS.DMIStation.Previous,
        Yaw: this._OPTIONS.DMIStation.Yaw,
        Roll: this._OPTIONS.DMIStation.Roll,
        Pitch: this._OPTIONS.DMIStation.Pitch
    };
}
// 更新当前站点
LeadorPano.prototype.setDMIStation = function(options) {
    this._OPTIONS.DMIStation = options;
}

// 根据站点ID查询站点
LeadorPano.prototype.getDMIStationByID = function(station, sercercode, callback) {

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
LeadorPano.prototype.getDMIMeasure = function(options, callback) {

    var url = PANO_CONFIG.TWS_PANO_MEASURE.concat()
        .replace('{leftimageid}', options.leftid)
        .replace('{leftx}', options.leftx)
        .replace('{lefty}', options.lefty)
        .replace('{rightimageid}', options.rightid)
        .replace('{rightx}', options.rightx)
        .replace('{righty}', options.righty)
        .replace('{service-code}', 'xianggang');

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
LeadorPano.prototype._setStationByCoord = function(callback) {

    var url = PANO_CONFIG.TWS_PANO_COORD_SEARCH.concat()
    .replace('{lng}', this._OPTIONS.position.lng)
    .replace('{lat}', this._OPTIONS.position.lat)
    .replace('{type}', 4)
    .replace('{service-code}', this.getLocation().serviceCode)
    .replace('{tolerance}', 0.0001);
    
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if(callback) callback(data);
        }
    })

    //this.loading();
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
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                options.callback(JSON.parse(xhr.responseText));
            } else {
                console.warn('服务异常');
            }
        }
    }
    xhr.open(options.type, options.url, options.async);
    xhr.send()
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
    return c *180/ Math.PI;
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
   
var _this=this;
    var url = PANO_CONFIG.TWS_PANO_MARKER_ADD.concat()
        .replace('{name}', options.content)
        .replace('{tag}', options.tag)
        .replace('{type}',options.type)
        .replace('{symbolguid}', options.symbolguid)
        .replace('{imageid}', options.stationid)
        .replace('{pixshape}', options.position.lng+'|'+options.position.lat+'|0')
        .replace('{service-code}', this.getLocation().serviceCode);

    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
             if (callback) callback(data);
             if(data.Status==1){
                _this.drawMarker(data.Guid,options);
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
LeadorPano.prototype.drawMarker = function(id,options) {
var opt ={
        id: id,
        longitude: this.getRad(options.position.lng),
        latitude: this.getRad(options.position.lat),
        //  image: ARROW_TXTURE.PIN_RAD,
        html: '<div style=\'{style}\'>{content}</div>'.replace('{content}',options.content).replace('{style}',options.style), //'HTML <b>marker</b> &hearts;',
        anchor: 'bottom right',
        scale: [1, 1],
        style: {
            //  maxWidth: '100px',
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Helvetica, sans-serif',
            textAlign: 'center'
        },
        tooltip: {
            content: options.tag,
            position: 'top'
        }
    }
 this._VIEWER.addMarker(opt);
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
    var url = PANO_CONFIG.TWS_PANO_MARKER_QUERT_BY_STATIONID.concat()
        .replace('{imageid}',imageid)
        .replace('{service-code}', this.getLocation().serviceCode);

    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if (callback) callback(data);
        }
    })
    url=null;
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
        .replace('{service-code}',this.getLocation().serviceCode);
        
    var _this=this;
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            if(data.Status==1) _this._VIEWER.removeMarker(marker);
            if (callback) callback(data);
        }
    })
    url=null;
}


/**
* 显示该全景下所有marker根据Stationid加载
*
* @param {string} stationid 站点id
* @param {object} callback 回调函数 functions(data) data为查询结果
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.loadMarkers=function(){
var _this=this;
// 查询站点标记
this.queryMarkerByStationID(this.getStation().StationID,function(data){
    if(data.Status==1){
        // 绘制标记
        for(var i in data.ImageMarkers){
                var pos =  data.ImageMarkers[i].PixShape.split('|');
                var opt = {content: data.ImageMarkers[i].Name,
                    position: { lng: pos[0], lat: pos[1] },
                    tag: data.ImageMarkers[i].Tag,
                    style: 'font-size:14px;color:#fff;padding:2px 0px;border-bottom:2px solid #fff'
                }
                _this.drawMarker(data.ImageMarkers[i].Guid,opt);
        }

    }
})

}

/**
* 清空场景中所有marker
*
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.clearMarkers=function(){
    this._VIEWER.clearMarkers();
}

/**
* 获取当前光标选择的marker
*
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.getCurrentMarker=function(){
     return this._VIEWER.getCurrentMarker();
}



/**
* 列表显示marker
*
* @date  2019-05-13
* @author  luwenjun@leader.com.cn
*/
LeadorPano.prototype.toggleMarkersList=function(){
    this._VIEWER.toggleMarkersList();
}