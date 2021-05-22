/*
 * @Author: GengYuan
 * @Date: 2021-05-22 09:53:38
 * @LastEditTime: 2021-05-22 14:03:08
 * @LastEditors: GengYuan
 * @Description:
 * @FilePath: \MD-DaiMai\MD-damai\js\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

// import "../util/jquery-3.5.1.min.js";
import * as func from "./function.js";

// NOTE 判断登陆状态
let isLogin = false;
// NOTE 注册按钮点击事件
$("main").on("click", "#finishRegister", () => {
  func.getRegister();
});
// NOTE 登录按钮点击事件
$("main").on("click", "#finishLogin", () => {
  if(func.getLogin()){
     isLogin = true;
  }else{
     isLogin = false;
  }
});
