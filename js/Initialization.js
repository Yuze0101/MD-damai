/*
 * @Author: GengYuan
 * @Date: 2021-05-22 10:40:51
 * @LastEditTime: 2021-05-23 01:18:03
 * @LastEditors: GengYuan
 * @Description:
 * @FilePath: \MD-DaiMai\MD-damai\js\Initialization.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import * as func from "./function.js";
import { data } from "./global.js";

  // // 初始化滚动container显示
  // // $('.container')
  // let options = [{ selector: ".container", offset: 500, callback: function(element) {
  //   Materialize.toast("Please continue scrolling!", 1500 );
  //   Materialize.fadeInImage($(element));
  // } }];
  // Materialize.scrollFire(options);
// NOTE 网页加载时，初始化插件
$(document).ready(function () {
  // NOTE 框架功能初始化
  // 初始化侧边栏
  $(".button-collapse").sideNav();
  // 初始化模态框
  $(".modal").modal();
  // 初始化轮播图
  $(".carousel").carousel({
    full_width: true,
    indicators: true,
  });
  // 初始化日期选择
  $(".datepicker").pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
  });
  // 初始化标签页
  $("ul.tabs").tabs();
  // 初始化下拉选择
  $("select").material_select();
  // 初始化文本域
  $("#textarea1").val("");
  $("#textarea1").trigger("autoresize");
  // 初始化确认订单中的折叠组件
  $(".collapsible").collapsible();
  // NOTE 初始化演绎数据到临时存储
  func.getData(data);
  // NOTE 判断登录显示左侧页面
  let isLogin = sessionStorage.getItem("isLogin");
  if (isLogin == "true") {
    let str = sessionStorage.getItem("onLogin");
    let tempArr = func.getLocalStorage("userlist");
    let tempID = tempArr.find((user) => {
      return user.userName == str;
    }).userID;
    let tempName = tempArr.find((user) => {
      return user.userName == str;
    }).userName;
    $("header .unLogin").addClass("hide");
    $("header #loginName").text("你好，" + tempID);
    $("header #loginEmail").text(tempName);
    $("header #loginImg").removeClass("hide");
  } else {
    $("header .unLogin").removeClass("hide");
  }
});
// NOTE 所有ajax请求完成后执行新建container
$(document).ajaxStop( function(){
  // alert('数据加载完成');
  func.creatContainer();
} );
// NOTE 滑倒底刷新container模式
$(window).scroll(function() { 
  let scrollTop = $(this).scrollTop();
  let scrollHeight = $(document).height();
  let windowHeight = $(this).height();
  if(scrollTop + windowHeight == scrollHeight){
      $('main .hide').first().removeClass('hide');
  }
});
// NOTE 判断输入框的是否适合规则
$("main").on("keyup", "#userName,#inputUser", function () {
  let reg = new RegExp(
    "(^1[3-9][0-9]{9}$|[0-9a-zA-Z]@[a-z]{2,5}.(com|cn|net))",
    "g"
  );
  let result = reg.test($(this).val());
  if (result) {
    $(this).removeClass("invalid").addClass("valid");
    $("main").on("keyup", "#userPass,#inputPass", function () {
      let reg = new RegExp("^[A-Z][0-9a-zA-Z]{5,15}$", "g");
      let result = reg.test($(this).val());
      if (result) {
        $(this).removeClass("invalid").addClass("valid");
        $("#finishRegister,#finishLogin").removeClass("disabled");
      } else {
        $(this).addClass("invalid").removeClass("valid");
        $("#finishRegister,#finishLogin").addClass("disabled");
      }
    });
  } else {
    $(this).addClass("invalid").removeClass("valid");
    $("#finishRegister,#finishLogin").addClass("disabled");
  }
});

// NOTE 注册按钮点击事件
$("main").on("click", "#finishRegister", function () {
  func.getRegister();
});
// NOTE 登录按钮点击事件
$("main").on("click", "#finishLogin", function () {
  if (func.getLogin()) {
    sessionStorage.setItem("isLogin", "true");
    sessionStorage.setItem("onLogin", $("#inputUser").val());
  } else {
    sessionStorage.setItem("isLogin", "false1");
  }
});
