/**
* Created by luwenjun on 2018/11/13.
*/
var LeadorPano = {};
var LeadorDMI = {};
var PANO_IMAGE = {} // 图片资源
var PANO_CONFIG = {} // 全景资源配置;
var IMAP_CONFIG = {}; // 地图资源配置
var ARROW_TEXT = {} // 创建箭头画布

//6000*3000
var PANO_ZOOM_6_3 = {
    ZOOM0: { col: 1, row: 1, zom: 0, offset_x: 0, offset_y: -256 },
    ZOOM1: { col: 2, row: 1, zom: 1, offset_x: -274, offset_y: -128 },//-150
    ZOOM2: { col: 3, row: 2, zom: 2, offset_x: -35.5, offset_y: -256},//-300 
    ZOOM3: { col: 6, row: 3, zom: 3, offset_x: -73, offset_y: 0 },//-100
    ZOOM4: { col: 12, row: 6, zom: 4, offset_x: -152, offset_y: 0 }//-200
}

//8000*4000
var PANO_ZOOM_8_4 = {
    ZOOM0: { col: 1, row: 1, zom: 0, offset_x: 0, offset_y: -256 },
    ZOOM1: { col: 2, row: 1, zom: 1, offset_x: -23.3, offset_y: 0 },
    ZOOM2: { col: 4, row: 2, zom: 2, offset_x: -50, offset_y:  0 },
    ZOOM3: { col: 8, row: 4, zom: 3, offset_x: -100, offset_y: 0 },
    ZOOM4: { col: 16, row: 8, zom: 4, offset_x: -152, offset_y: 0 }
}
//5120*2560
var PANO_ZOOM_5_2 = {
    ZOOM0: { col: 1, row: 1, zom: 0, offset_x: 0, offset_y: -256  },
    ZOOM1: { col: 2, row: 1, zom: 1, offset_x:-(256+128), offset_y: -(128+64) },
    ZOOM2: { col: 3, row: 2, zom: 2, offset_x: -256, offset_y: -(256+128) },
    ZOOM3: { col: 5, row: 3, zom: 3, offset_x: 0, offset_y: -256 },
    ZOOM4: { col: 10, row:5, zom: 4, offset_x:0, offset_y: 0 }
}


PANO_CONFIG = {
    TWS_PANO_HD: 'http://1.97.81.108:2019/{service-code}/Image3DResourceService/GetImageTile/?clientType=2&ImageID={station-id}&row={row}&col={col}&zoom={z}', // 全景高清格式化地址 000002-X-201303210444250000
    TWS_PANO_COORD_SEARCH: 'http://1.97.81.108:2019/{service-code}/Image3DIndexService/GetStationByCoord/?x={lng}&y={lat}&type={type}&tolerance={tolerance}', // 根据坐标查询全景 116.4114340470&y=39.9069079720
    TWS_PANO_STATION_STEP_SEARCH: 'http://1.97.81.108:2019/{service-code}/Image3DIndexService/GetStationByStep/?StationID={station-id}&step={step}', // ?StationID=005212-0-201408210332080540&step=1
    TWS_PANO_STATION_SEARCH: 'http://1.97.81.108:2019/{service-code}/Image3DIndexService/GetStationByID/?StationID={station-id}', // 根据站点查全景 000271-0-200903140245410789
    TWS_PANO_STATION_JOINTS: 'http://1.97.81.108:2019/{service-code}/Image3DIndexService/GetStationJoints/?stationid={station-id}&direction={direction}&return',
    TWS_PANO_SOURCE_DATA: 'http://1.97.81.108:2019/{service-code}/Image3DIndexService/GetImageMetadata/?return', //获取元数据信息接口
    TWS_PANO_STATION_INFO:'http://1.97.81.108:2019/{service-code}/Image3DResourceService/GetImageSize/?imageid={imageid}',// 获取站点信息

    TWS_PANO_MEASURE: 'http://1.97.81.108:2019/{service-code}/Image3DMeasureService/Pixel2Coord/?MeasureType=1&leftimageid={leftimageid}&leftx={leftx}&lefty={lefty}&rightimageid={rightimageid}&rightx={rightx}&righty={righty}&coortype=300&prjtype=313&return', //000073-1-200703200330180146
    TWS_PANO_MARKER_ADD: 'http://1.97.81.108:2019/{service-code}/Image3DMarkerService/AddImageMarker/?name={name}&tag={tag}&type={type}&symbolguid={symbolguid}&imageid={imageid}&pixshape={pixshape}&geoshape=',
    TWS_PANO_MARKER_QUERT_BY_STATIONID: 'http://1.97.81.108:2019/{service-code}/Image3DMarkerService/SearchImageMarkersByImageID/?imageid={imageid}&position=&pagecount=&return',
    TWS_PANO_MARKER_DELETE_BY_GUID: 'http://1.97.81.108:2019/{service-code}/Image3DMarkerService/DeleteImageMarker/?guid={guid}&return',

    TWS_PANO_REGEO: 'http://1.97.81.202:25001/v3/rgeo?ak=1e706fc68d966cd554c63a8e800e0daf&location={location}&callback={callback}', // 逆向地理编码
    TWS_PANO_ROUTE: 'http://1.97.81.202:25001/v3/route/car?origin={origin}&destination={destination}&output=json&ak=1e706fc68d966cd554c63a8e800e0daf&callback={callback}'//ec85d3648154874552835438ac6a02b2
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
};





/**
* 坐标转换
* @author luwenjun 20160920
* @returns  坐标转换
*/

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


LeadorDMI = function(options, callback_dmi) {

    var _this=this;
    
     this.getReGeo({
        url: PANO_CONFIG.TWS_PANO_REGEO.concat().replace('{location}', options.position.lng + ',' + options.position.lat),
        callback: function(data) {
            if (data.status != 0) {
                console.warn(data.message);
                return false;
            }

             // ad_code.js
            if (!AD_CODE) {
                throw new Error('AD_CODE 字典表未加载')
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
                if ((AD_CODE[i][1].toString().substring(0, 4)) === (location.adCode.toString().substring(0, 4))) {
                    location.serviceCode = AD_CODE[i][0];
                    break;
                }
            }
            if (!location.serviceCode) {
                for (var i in AD_CODE) {
                    if ((AD_CODE[i][1].toString().substring(0, 2)) === (location.adCode.toString().substring(0, 2))) {
                        location.serviceCode = AD_CODE[i][0];
                        break;
                    }
                }
            }
            if (!location.serviceCode) {
                
                console.log('AD_CODE 缺失：暂未发布 {a} DMI可量测实景影像。'.replace('{a}',location.province))
                window.location.href='http://1.97.81.108/example/dmi-no.html';
                return false;
            }
            _this.setDMILocation(location);
            
            //根据坐标查询并加载
             _this.getDMIStationByCoord(options,callback_dmi);
        }
    })
    
    
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
    xhr.onerror=function(){
       options.callback({Status:-1,Message:'请求失败或服务不存在！'});
    }
   

}

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
    .replace('{service-code}',this.getDMILocation().serviceCode.replace('_pano','_dmi'))
    .replace('{tolerance}', options.tel);
    // 获得站点
    this.sendAjax({
        async: true,
        type: 'get',
        url: url,
        callback: function(data) {
            //_this.message(data.Message, 5000);
            _this.DMIStation = data.Station;

            callback(data)
        }
    })


   
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
         .replace('{service-code}',this.getDMILocation().serviceCode.replace('_pano','_dmi'));

    for (var i = 1; i <= 6; i++) {
        station.push(url.replace('{station-id}', options.substring(0, 6) + '-' + i + '-' + options.substring(9, 27)));
    }

    this.DMIImageList = station;
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

    var _this = LeadorPano;
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
LeadorDMI.prototype.getDMIMeasure = function(options, callback) {

    var url = PANO_CONFIG.TWS_PANO_MEASURE.concat()
        .replace('{leftimageid}', options.leftid)
        .replace('{leftx}', options.leftx)
        .replace('{lefty}', options.lefty)
        .replace('{rightimageid}', options.rightid)
        .replace('{rightx}', options.rightx)
        .replace('{righty}', options.righty)
        .replace('{service-code}', this.getDMILocation().serviceCode.replace('_pano','_dmi'));

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

//pano._VIEWER.setCaption();


