/**
*Createdbyluwenjunon2018/11/13.
*/
/*varAD_adcode=[
['guiyang_pano',520100],
['akesu_pano',652901],
['kelamayi_pano',650200],
['wuhan_pano',420100],
//['guangzhou_pano',440100],
['huangshi_pano',420200],
['jingzhou_pano',421000],
['jingmen_pano',420800],
['guizhou_pano',140200],
['lanzhou_pano',620100],
['benxi_pano',210500],
['bejing_pano',110000],
['haikou_pano',460100],
['yichang_pano',420500],
['yangquan_pano',140300],
['huanggang_pano',421100],
['delingha_pano',632802],
['ezhou_pano',420700]
	
]*/

var ADCODE = [
//108
{adcode: 440100, server: 108, city: '广州', name: 'guangzhou', port: '8001', type: 'pano' },
{ adcode: 440100, server: 108, city: '广州', name: 'guangzhou', port: '8140', type: 'dmi' },
{ adcode: 310000, server: 108, city: '上海', name: 'shanghai', port: '8005', type: 'dmi' },
{ adcode: 420100, server: 108, city: '武汉', name: 'wuhan', port: '8000', type: 'pano' },
{ adcode: 420100, server: 108, city: '武汉', name: 'wuhan', port: '8141', type: 'dmi' },
{ adcode: 650100, server: 108, city: '乌鲁木齐', name: 'wulumuqi', port: '8003', type: 'pano' },
{ adcode: 340100, server: 108, city: '合肥', name: 'hefei', port: '8006', type: 'dmi' },
{ adcode: 460200, server: 108, city: '三亚', name: 'sanya', port: '8002', type: 'pano' },
{ adcode: 888888, server: 108, city: '佛州', name: 'foshan', port: '8007', type: 'dmi' },
{ adcode: 320300, server: 108, city: '徐州', name: 'xuzhou', port: '8008', type: 'dmi' },
{ adcode: 450300, server: 108, city: '桂林', name: 'guilin', port: '8009', type: 'dmi' },
{ adcode: 888888, server: 108, city: '溪口', name: 'xikou', port: '8010', type: 'dmi' },
{ adcode: 650200, server: 108, city: '克拉玛依', name: 'kelamayi', port: '8011', type: 'pano' },
{ adcode: 429000, server: 108, city: '神龙架', name: 'shenlongjia', port: '8012', type: 'pano' },
{ adcode: 420200, server: 108, city: '黄石', name: 'huangshi', port: '8013', type: 'pano' },
{ adcode: 420200, server: 108, city: '黄石', name: 'huangshi', port: '8142', type: 'dmi' },
{ adcode: 511600, server: 108, city: '广安邻水', name: 'guanganlinshui', port: '8014', type: 'dmi' },
{ adcode: 532500, server: 108, city: '红河', name: 'honghe', port: '8015', type: 'dmi' },
{ adcode: 140900, server: 108, city: '忻州', name: 'xinzhou', port: '8017', type: 'pano' },
{ adcode: 430400, server: 108, city: '衡阳', name: 'hengyang', port: '8018', type: 'dmi' },
{ adcode: 510900, server: 108, city: '遂宁', name: 'suining', port: '8019', type: 'dmi' },
{ adcode: 421000, server: 108, city: '荆州', name: 'jingzhou', port: '8020', type: 'pano' },
{ adcode: 421000, server: 108, city: '荆州', name: 'jingzhou', port: '8143', type: 'dmi' },
{ adcode: 360600, server: 108, city: '鹰潭', name: 'yingtan', port: '8021', type: 'dmi' },
{ adcode: 533103, server: 108, city: '芒市', name: 'mangshi', port: '8023', type: 'dmi' },
{ adcode: 420800, server: 108, city: '荆门', name: 'jingmen', port: '8024', type: 'pano' },
{ adcode: 420800, server: 108, city: '荆门', name: 'jingmen', port: '8144', type: 'dmi' },
{ adcode: 371400, server: 108, city: '德州', name: 'dezhou', port: '8025', type: 'dmi' },
{ adcode: 230900, server: 108, city: '七台河', name: 'qitaihe', port: '8026', type: 'dmi' },
{ adcode: 410900, server: 108, city: '濮阳', name: 'puyang', port: '8027', type: 'dmi' },
{ adcode: 420600, server: 108, city: '襄阳', name: 'xiangyang', port: '8028', type: 'dmi' },
{ adcode: 441300, server: 108, city: '惠州', name: 'huizhou', port: '8030', type: 'dmi' },
{ adcode: 360500, server: 108, city: '新余', name: 'xinyu', port: '8031', type: 'dmi' },
{ adcode: 440500, server: 108, city: '汕头', name: 'shantou', port: '8032', type: 'dmi' },
{ adcode: 130200, server: 108, city: '唐山', name: 'tangshan', port: '8033', type: 'dmi' },
{ adcode: 131100, server: 108, city: '衡水', name: 'hengshui', port: '8034', type: 'dmi' },
{ adcode: 653100, server: 108, city: '喀什', name: 'kashi', port: '8035', type: 'pano' },
{ adcode: 421200, server: 108, city: '咸宁', name: 'xianning', port: '8036', type: 'pano' },
{ adcode: 210600, server: 108, city: '丹东', name: 'dandong', port: '8037', type: 'pano' },
{ adcode: 211200, server: 108, city: '铁岭', name: 'tieling', port: '8038', type: 'pano' },
{ adcode: 652801, server: 108, city: '库尔勒', name: 'kuerle', port: '8039', type: 'pano' },
{ adcode: 652900, server: 108, city: '阿克苏', name: 'akesu', port: '8040', type: 'pano' },
{ adcode: 653200, server: 108, city: '和田', name: 'hetian', port: '8041', type: 'pano' },
{ adcode: 654000, server: 108, city: '伊犁', name: 'yili', port: '8042', type: 'pano' },

//109
{adcode: 520100, server: 109, city: '贵阳', name: 'guiyang', port: '8043', type: 'pano' },
{ adcode: 520100, server: 109, city: '贵阳', name: 'guiyang', port: '9001', type: 'dmi' },
{ adcode: 620100, server: 109, city: '兰州', name: 'lanzhou', port: '8044', type: 'pano' },
{ adcode: 620100, server: 109, city: '兰州', name: 'lanzhou', port: '9000', type: 'dmi' },
{ adcode: 520300, server: 109, city: '遵义', name: 'zunyi', port: '8045', type: 'dmi' },
{ adcode: 361100, server: 109, city: '上饶', name: 'shangrao', port: '8047', type: 'dmi' },
{ adcode: 210500, server: 109, city: '本溪', name: 'benxi', port: '8048', type: 'pano' },
{ adcode: 210500, server: 109, city: '本溪', name: 'benxi', port: '8132', type: 'dmi' },
{ adcode: 321300, server: 109, city: '宿迁', name: 'suqian', port: '8049', type: 'dmi' },
{ adcode: 371700, server: 109, city: '菏泽', name: 'heze', port: '8050', type: 'dmi' },
{ adcode: 410800, server: 109, city: '焦作', name: 'jiaozuo', port: '8051', type: 'dmi' },
{ adcode: 431000, server: 109, city: '郴州', name: 'chenzhou', port: '8052', type: 'dmi' },
{ adcode: 120000, server: 109, city: '天津', name: 'tianjin', port: '8053', type: 'dmi' },
{ adcode: 370700, server: 109, city: '潍坊', name: 'weifang', port: '8054', type: 'dmi' },
{ adcode: 211100, server: 109, city: '盘锦', name: 'panjin', port: '8056', type: 'pano' },
{ adcode: 210800, server: 109, city: '营口', name: 'yingkou', port: '8057', type: 'pano' },
{ adcode: 210900, server: 109, city: '阜新', name: 'fuxin', port: '8058', type: 'pano' },
{ adcode: 210300, server: 109, city: '鞍山', name: 'anshan', port: '8059', type: 'pano' },
{ adcode: 210181, server: 109, city: '新民', name: 'xinmin', port: '8060', type: 'pano' },
{ adcode: 140400, server: 109, city: '长治', name: 'changzhi', port: '8061', type: 'pano' },
{ adcode: 420700, server: 109, city: '鄂州', name: 'ezhou', port: '8062', type: 'pano' },
{ adcode: 500234, server: 109, city: '开县', name: 'kaixian', port: '8063', type: 'pano' },
{ adcode: 320100, server: 109, city: '南京', name: 'nanjing', port: '8064', type: 'pano' },
{ adcode: 421300, server: 109, city: '随州', name: 'suizhou', port: '8065', type: 'pano' },

//110          

{adcode: 110000, server: 110, city: '北京', name: 'beijing', port: '8066', type: 'pano' },
{ adcode: 110000, server: 110, city: '北京', name: 'beijing', port: '8133', type: 'dmi' },
{ adcode: 810000, server: 110, city: '香港', name: 'xianggang', port: '8067', type: 'dmi', coord: '114.1556955250,22.2779466350' },
{ adcode: 820000, server: 110, city: '澳门', name: 'aomen', port: '8068', type: 'dmi' },
{ adcode: 460100, server: 110, city: '海口', name: 'haikou', port: '8069', type: 'pano' },
{ adcode: 460100, server: 110, city: '海口', name: 'haikou', port: '8134', type: 'dmi' },
{ adcode: 140100, server: 110, city: '太原', name: 'taiyuan', port: '8070', type: 'pano' },
{ adcode: 530100, server: 110, city: '昆明', name: 'kunming', port: '8071', type: 'pano' },
{ adcode: 510100, server: 110, city: '成都', name: 'chengdu', port: '8072', type: 'dmi' },
{ adcode: 330100, server: 110, city: '杭州', name: 'hangzhou', port: '8073', type: 'dmi' },
{ adcode: 130100, server: 110, city: '石家庄', name: 'shijiazhuang', port: '8074', type: 'dmi' },
{ adcode: 610100, server: 110, city: '西安', name: 'xian', port: '8075', type: 'dmi' },
{ adcode: 220100, server: 110, city: '长春', name: 'changchun', port: '8076', type: 'dmi' },
{ adcode: 350100, server: 110, city: '福州', name: 'fuzhou', port: '8077', type: 'dmi' },
{ adcode: 500000, server: 110, city: '重庆大足', name: 'chongqingdazu', port: '8078', type: 'dmi' },
{ adcode: 150200, server: 110, city: '包头', name: 'baotou', port: '8081', type: 'dmi' },
{ adcode: 430600, server: 110, city: '岳阳', name: 'yueyang', port: '8083', type: 'dmi' },
{ adcode: 420500, server: 110, city: '宜昌', name: 'yichang', port: '8084', type: 'pano' },
{ adcode: 420500, server: 110, city: '宜昌', name: 'yichang', port: '8135', type: 'dmi' },
{ adcode: 513401, server: 110, city: '西昌', name: 'xichang', port: '8085', type: 'dmi' },
{ adcode: 371000, server: 110, city: '威海', name: 'weihai', port: '8086', type: 'dmi' },
{ adcode: 320400, server: 110, city: '常州', name: 'changzhou', port: '8087', type: 'dmi' },
{ adcode: 330900, server: 110, city: '舟山', name: 'zhoushan', port: '8088', type: 'dmi' },
{ adcode: 330300, server: 110, city: '温州', name: 'wenzhou', port: '8089', type: 'dmi' },
{ adcode: 370200, server: 110, city: '青岛', name: 'qingdao', port: '8090', type: 'dmi' },
{ adcode: 140200, server: 110, city: '大同', name: 'datong', port: '8091', type: 'pano' },
{ adcode: 140800, server: 110, city: '运城', name: 'yuncheng', port: '8092', type: 'pano' },
{ adcode: 140300, server: 110, city: '阳泉', name: 'yangquan', port: '8093', type: 'pano' },
{ adcode: 140300, server: 110, city: '阳泉', name: 'yangquan', port: '8136', type: 'dmi' },
{ adcode: 140600, server: 110, city: '朔州', name: 'shuozhou', port: '8094', type: 'pano' },
{ adcode: 141100, server: 110, city: '吕梁', name: 'lvliang', port: '8095', type: 'pano' },
{ adcode: 141000, server: 110, city: '临汾', name: 'linfen', port: '8096', type: 'pano' },
{ adcode: 330200, server: 110, city: '宁波', name: 'ningbo', port: '8098', type: 'pano' },
{ adcode: 451300, server: 110, city: '来宾', name: 'laibin', port: '8099', type: 'dmi' },
{ adcode: 340400, server: 110, city: '淮南', name: 'huainan', port: '8100', type: 'pano' },
{ adcode: 430700, server: 110, city: '常德', name: 'changde', port: '8101', type: 'dmi' },
{ adcode: 370800, server: 110, city: '济宁', name: 'jining', port: '8102', type: 'dmi' },
{ adcode: 230600, server: 110, city: '大庆', name: 'daqing', port: '8103', type: 'dmi' },
{ adcode: 330800, server: 110, city: '衢州', name: 'quzhou', port: '8104', type: 'dmi' },
{ adcode: 410400, server: 110, city: '平顶山', name: 'pingdingshan', port: '8106', type: 'dmi' },
{ adcode: 520200, server: 110, city: '六盘水', name: 'liupanshui', port: '8107', type: 'dmi' },
{ adcode: 320583, server: 110, city: '昆山', name: 'kunshan', port: '8108', type: 'dmi' },
{ adcode: 421100, server: 110, city: '黄冈', name: 'huanggang', port: '8109', type: 'pano' },
{ adcode: 421100, server: 110, city: '黄冈', name: 'huanggang', port: '8137', type: 'dmi' },
{ adcode: 632802, server: 110, city: '德令哈', name: 'delingha', port: '8110', type: 'pano' },
{ adcode: 632802, server: 110, city: '德令哈', name: 'delingha', port: '8138', type: 'dmi' },
{ adcode: 430200, server: 110, city: '株洲', name: 'zhuzhou', port: '8112', type: 'dmi' },
{ adcode: 320500, server: 110, city: '苏州', name: 'suzhou', port: '8113', type: 'dmi' },
{ adcode: 140700, server: 110, city: '晋中', name: 'jinzhong', port: '8114', type: 'pano' },
{ adcode: 621000, server: 110, city: '庆阳', name: 'qingyang', port: '8115', type: 'dmi' },
{ adcode: 511100, server: 110, city: '乐山', name: 'leshan', port: '8116', type: 'dmi' },
{ adcode: 371600, server: 110, city: '滨州', name: 'binzhou', port: '8117', type: 'dmi' },
{ adcode: 419000, server: 110, city: '济源', name: 'jiyuan', port: '8118', type: 'dmi' },
{ adcode: 350800, server: 110, city: '龙岩', name: 'longyan', port: '8119', type: 'dmi' },
{ adcode: 420300, server: 110, city: '十堰', name: 'shiyan', port: '8120', type: 'pano' },
{ adcode: 420700, server: 110, city: '鄂州', name: 'ezhou', port: '8121', type: 'pano' },
{ adcode: 420700, server: 110, city: '鄂州', name: 'ezhou', port: '8139', type: 'dmi' },
{ adcode: 429000, server: 110, city: '潜江', name: 'qianjiang', port: '8122', type: 'pano' },
{ adcode: 422801, server: 110, city: '恩施', name: 'enshi', port: '8124', type: 'pano' },
{ adcode: 420900, server: 110, city: '孝感', name: 'xiaogan', port: '8125', type: 'pano' },
{ adcode: 211400, server: 110, city: '葫芦岛', name: 'huludao', port: '8126', type: 'pano' },
{ adcode: 211300, server: 110, city: '朝阳', name: 'chaoyang', port: '8128', type: 'pano' },
{ adcode: 659000, server: 110, city: '石河子', name: 'shihezi', port: '8129', type: 'pano' },
{ adcode: 652100, server: 110, city: '吐鲁番', name: 'tulufan', port: '8130', type: 'pano' },
{ adcode: 370283, server: 110, city: '平度', name: 'pingdu', port: '8131', type: 'dmi' }
]


