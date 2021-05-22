/*
 * @Author: GengYuan
 * @Date: 2021-05-22 10:40:51
 * @LastEditTime: 2021-05-22 12:59:19
 * @LastEditors: GengYuan
 * @Description:
 * @FilePath: \MD-DaiMai\MD-damai\js\Initialization.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

$(document).ready(function () {
  $(".button-collapse").sideNav();
  $(".modal").modal();
  $(".carousel").carousel({
    full_width: true,
    indicators: true,
  });
  $(".datepicker").pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
  });
  $("ul.tabs").tabs();
  $("select").material_select();
});
