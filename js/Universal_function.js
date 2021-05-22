/*
 * @Author: leihao
 * @Date: 2021-05-20 12:06:18
 * @LastEditTime: 2021-05-22 14:17:58
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \MD-DaiMai\MD-damai\js\function.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

//获取网络数据
//获取所有商品数据
$.ajax({
    "url": "https://www.fastmock.site/mock/40e170f960701a834866a0bc956002f6/tickets/getAllArts",
    "getAllArts": function (data) {
        var ArtsArr = data.goods;
    }
});
//获取所有剧院数据
$.ajax({
    'url': "",
    "getAllTheatres": function (data) {
        var Theatres = data.places;
    }
});
//获取所有演艺种类数据
$.ajax({
    'url': "",
    "getAllType": function (data) {
        var Type = data.types;
    }
});
//获取所有的城市数据
$.ajax({
    'url': "",
    "getAllCities": function (data) {
        var Cities = data.citys;
    }
});