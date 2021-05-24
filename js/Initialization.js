/*
 * @Author: GengYuan
 * @Date: 2021-05-22 10:40:51
 * @LastEditTime: 2021-05-24 18:01:32
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
  let timer = setInterval(() => {
    $(".carousel").carousel("next");
  }, 5000);
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
    $("#buySit").attr("href", "#modal5");
  } else {
    $("header .unLogin").removeClass("hide");
    $("#buySit").attr("href", "#modal2");
  }
});
// NOTE 所有ajax请求完成后执行新建container
$(document).ajaxStop(function () {
  // alert('数据加载完成');
  func.creatContainer();
  func.creatComment();
});
// NOTE 滑倒底刷新container模式
// $(window).scroll(function () {
//   let scrollTop = $(this).scrollTop();
//   let scrollHeight = $(document).height();
//   let windowHeight = $(this).height();
//   if (scrollTop + windowHeight == scrollHeight) {
//     $("main .goodList.hide").first().removeClass("hide");
//   }
// });
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
// NOTE 商品卡片点击事件
$("main").on("click", ".goods", function () {
  let tempID = $(this).attr("num");
  let tempPlaylist = JSON.parse(sessionStorage.getItem("playList")).goods;
  let target = tempPlaylist.find((el) => {
    return el.id == tempID;
  });
  $("main .container").addClass("hide");
  $("main .buy")
    .removeClass("hide")
    .find("#good_img")
    .attr("src", target.img_src);
  $("main .buy").find("#title").text(target.good_name);
  $("main .buy").find("#place").text(target.place);
  for (let i = 0; i < target.times.length; i++) {
    $("main .buy").find("#time").append(`
      <div class="col s4">
                <div class="card">
                  <div class="card-content">
                    <p>${target.times[i]}</p>
                  </div>
                </div>
              </div>
      `);
  }
  let isArray = Array.isArray(target.price);
  if (isArray) {
    for (let i = 0; i < target.price.length; i++) {
      $("main .buy").find("#price").append(`
    <div class="col s4">
                    <div class="card">
                      <div class="card-content">
                        <p>${target.price[i]}</p>
                      </div>
                    </div>
                  </div>
    `);
    }
  } else {
    $("main .buy").find("#price").append(`
    <div class="col s4">
                    <div class="card">
                      <div class="card-content">
                        <p>${target.price}</p>
                      </div>
                    </div>
                  </div>
    `);
  }
  $("main .buy").find("#showInfo").append(`
          <div class="row">
            <div class="col s12">
            <h5>项目概况</h5>
              <div class="card">
                <div class="card-content">
                  ${target.details}
                </div>
              </div>
            </div>
          </div>
  `);
  $("main .buy").find("#showInfo img").addClass("responsive-img");
  // 评分星星点击事件
  let commentScore = 0;
  $("main .buy")
    .find("#score")
    .on("click", "i", function () {
      $(this).addClass("red-text");
      $(this).prevAll().addClass("red-text");
      $(this).nextAll().removeClass("red-text");
      commentScore = $("main .buy #score i").index($(this)) + 1;
      console.log(commentScore);
    });
  // 评论区加载
  let tempComment = JSON.parse(localStorage.getItem("comment"));
  let thisComment = tempComment.find((el) => {
    return el.playID == tempID;
  });
  for (let i = 0; i < thisComment.userComment.length; i++) {
    let target = thisComment.userComment[i];
    let isLogin = sessionStorage.getItem("isLogin");
    $("main .buy").find("#comment").append(` <div class="card horizontal">
    <div class="card-stacked">
      <div class="card-content">
        <p>
        <div class="chip">
          <img src="../images/user.jpg" alt="Contact Person" />
          ${target.userName}
        </div>
        ${target.str}</p>
      </div>
      <div class="card-content">
         <button id="clean${target.num}${target.userName}" objname="${target.num}${target.userName}" class="btn waves-effect right delbtn disabled">删除</button>
      </div>
      <div class="card-action">
        <span id="commentScore${target.num}${target.userName}">
        </span>
        <span class="right">${target.time}</span>
      </div>
    </div>
  </div>`);
    if (isLogin == "true") {
      let tempArr = func.getLocalStorage("userlist");
      let onLogin = sessionStorage.getItem("onLogin");
      let userID = tempArr.find((el) => {
        return el.userName == onLogin;
      }).userID;
      if (userID == target.userName) {
        $("main .buy")
          .find(`#clean${target.num}${target.userName}`)
          .removeClass("disabled");
      }
    }
    for (let j = 1; j <= target.score; j++) {
      $("main .buy").find(`#commentScore${target.num}${target.userName}`)
        .append(`
      <i class="material-icons">grade</i>`);
    }
  }
  // 评论区功能
  let x = 0;
  $("main .buy").on("click", "#goComment", function () {
    let isLogin = sessionStorage.getItem("isLogin");
    if (isLogin == "true") {
      x++;
      let str = sessionStorage.getItem("onLogin");
      let tempArr = func.getLocalStorage("userlist");
      let commentID = tempArr.find((user) => {
        return user.userName == str;
      }).userID;
      let commentStr = $("main .buy #textarea1").val();
      let commentTime = Date();
      thisComment.userComment.push({
        userName: commentID,
        str: commentStr,
        num: x,
        time: commentTime,
        score: commentScore,
      });
      $("main .buy").find("#comment").append(`
  <div class="card horizontal">
  <div class="card-stacked">
    <div class="card-content">
      <p>
      <div class="chip">
        <img src="../images/user.jpg" alt="Contact Person" />
        ${commentID}
      </div>
      ${commentStr}</p>
    </div>
    <div class="card-content">
        <button id="clean${x}${commentID}" objname="${x}${commentID}" class="btn waves-effect right delbtn">删除</button>
    </div>
    <div class="card-action">
    <span id="commentScore${x}${commentID}">
      </span>
      <span class="right">${commentTime}</span>
    </div>
  </div>
</div>
  `);
      for (let i = 1; i <= commentScore; i++) {
        $("main .buy").find(`#commentScore${x}${commentID}`).append(`
    <i class="material-icons">grade</i>`);
      }
      localStorage.setItem("comment", JSON.stringify(tempComment));
      Materialize.toast("提交评论成功", 4000);
    } else {
      Materialize.toast("请您先登录", 4000);
    }
  });
  $("main .buy").on("click", ".delbtn", function () {
    $(this).parents(".horizontal").remove();
    let str = $(this).attr("objname");
    let index = 0;
    thisComment.userComment.forEach((element) => {
      if (element.num + element.userName != str) {
        index++;
      }
    });
    thisComment.userComment.splice(index, 1);
    localStorage.setItem("comment", JSON.stringify(tempComment));
  });
});
// NOTE 剧院点击事件
$("header").on("click", "#theater", function () {
  let tempTheaterlist = JSON.parse(
    sessionStorage.getItem("theaterList")
  ).places;
  $("main .container").addClass("hide");
  for (let i = 0; i < tempTheaterlist.length; i++) {
    $("main").append(`
    <div class="container white z-depth-1 theaterList" num=${tempTheaterlist[i].id}>
    <div class="row" id="threater">
    <h5 class="header center">${tempTheaterlist[i].name}</h5>
    <div class="col s12 m12">
      <div class="card horizontal hoverable medium">
        <div class="card-image">
          <img src=${tempTheaterlist[i].img_src}>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><span class="bold">地址：</span>${tempTheaterlist[i].address}</p>
            <p><span class="bold">电话：</span>${tempTheaterlist[i].phone}</p>
            <p><span class="bold">交通路线：</span>地铁1号线芳村站B1出口上右转30米</p>
          </div>
          <div class="card-action">
            <span class="bold">剧院评分：${tempTheaterlist[i].mark}</span>
            <button class="theaterBuy btn right">立即购票</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
    `);
  }
  // NOTE 剧院立即购票事件
  $("main .theaterList").on("click", ".theaterBuy", function () {
    let num = $(this).parents(".theaterList").attr("num");
    let tempPlaylist = JSON.parse(sessionStorage.getItem("playList")).goods;
    let target = tempTheaterlist.find((el) => {
      return el.id == num;
    });
    $("main .container").addClass("hide");
    $("main").append(`
  <div class="container white z-depth-1 goodList" id="theaterPlay">
      <h4>正在上映</h4>
      <div class="row">
      </div>
    </div>`);
    for (let i = 0; i < target.goods.length; i++) {
      let element = tempPlaylist.find((el) => {
        return el.id == target.goods[i];
      });
      console.log(element);
      $("main #theaterPlay .row").append(`
    <div class="col l3 s6">
            <div class="card hoverable goods" num=${element.id}>
              <div class="card-image">
                <img src=${element.img_src} />
                 <span class="card-title">${element.good_name}</span>
              </div>
              <div class="card-content">
                <p class="truncate bold">${element.place}</p>
                <p class="truncate">${element.play_time}</p>
              </div>
            </div>
          </div>`);
    }
  });
});
// NOTE 座位生成
$("main .buy").on("click", "#buySit", function (event) {
  let isLogin = sessionStorage.getItem("isLogin");
  if (isLogin) {
    $('#modal5 #sits').html('');
    $('#modal5 #chooseSit').html('');
    for (let i = 1; i <= 5; i++) {
      $("#modal5 #sits").append(`<ul class="center r${i}"></ul>`);
      for (let j = 1; j <= 8; j++) {
        $(`#modal5 #sits .r${i}`).append(
          `<li><i class="material-icons c${j}" position="${i}排${j}座">perm_identity</i></li>`
        );
      }
    }

    let num = 0;
    $("#modal5 #sits i").on("click", function () {
      if ($(this).hasClass("cyan-text")) {
        $(this).removeClass("cyan-text");
        let str = $(this).attr('position');
        $('#modal5 #chooseSit .col').each(function(){
          if($(this).find('p').text() == str){
            $(this).remove();
          }
        })
        num--;
      } else {
        if(num == 4){
          Materialize.toast('您只能选择4个座位',4000);
          return;
        }
        $(this).addClass("cyan-text");
        $('#modal5 #chooseSit').append(`
        <div class="col l3 m6 s12">
        <div class="card">
          <div class="card-content white-text cyan">
            <p>${$(this).attr('position')}</p>
          </div>
        </div>
      </div>
        `)
        num++;
      }
      if(num == 0){
        $('#modal5 .modal-footer a').addClass('disabled');
      }else{
        $('#modal5 .modal-footer a').removeClass('disabled');
        $('#modal5 .modal-footer a').on('click',function(){
          alert('zhixing');
        })
      }
    });
  } else {
    Materialize.toast("请您先登录", 4000);
  }
});
