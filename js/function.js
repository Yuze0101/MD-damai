/*
 * @Author: GengYuan
 * @Date: 2021-05-20 12:06:18
 * @LastEditTime: 2021-05-22 18:08:37
 * @LastEditors: GengYuan
 * @Description: fucntion库 所有功能集合
 * @FilePath: \MD-DaiMai\MD-damai\js\function.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

// 引入jQuery语法
// import "../util/jquery-3.5.1.min.js";
// 引入全局变量

/**
 * @description: 本地存储查询 转为数组 没有则返回空值
 * @param {String} str
 * @return {Array} localArr
 */
export function getLocalStorage(str) {
  let localStr = localStorage.getItem(str);
  let localArr;
  if (localStr == null) {
    return null;
  } else {
    localArr = JSON.parse(localStr);
    return localArr;
  }
}

/**
 * @description: 用户注册模块
 */
export function getRegister() {
  let tempName, tempPass, tempID, registerUser;
  tempName = $("#userName").val();
  tempPass = $("#userPass").val();
  tempID = $("#userID").val();
  registerUser = {
    userName: tempName,
    userPass: tempPass,
    userID: tempID
  };
  if (tempName != "" && tempPass != "") {
    register(registerUser);
    return;
  } else {
    Materialize.toast("账号密码不能为空", 4000);
    return;
  }
}

/**
 * @description: 注册用户数据写入本地存储
 * @param {object} registerUser
 * @return {*}
 */
function register(registerUser) {
  let tempArr = getLocalStorage("userlist");
  if (tempArr == null) {
    tempArr = [registerUser];
  } else {
    for (let i = 0; i < tempArr.length; i++) {
      let tempUser = tempArr[i];
      if (tempUser.userName == registerUser.userName) {
        Materialize.toast("已有账号名，请重新输入", 4000);
        return;
      }
    }
    tempArr.push(registerUser);
  }
  let tempStr = JSON.stringify(tempArr);
  Materialize.toast("注册成功", 4000);
  localStorage.setItem("userlist", tempStr);
}

/**
 * @description: 用户登录模块
 */
export function getLogin() {
  let tempName, tempPass, loginUser;
  tempName = $("#inputUser").val();
  tempPass = $("#inputPass").val();
  loginUser = {
    userName: tempName,
    userPass: tempPass,
  };
  if (tempName != "" && tempPass != "") {
    return login(loginUser);
  } else {
    Materialize.toast("账号密码不能为空", 4000);
    return false;
  }
}
/**
 * @description: 判断是否登录
 * @param {object} loginUser
 * @return {boolearn}
 */
function login(loginUser) {
  let tempArr = getLocalStorage("userlist");
  if (tempArr == null) {
    Materialize.toast("您还未注册，请先注册", 4000);
    return false;
  } else {
    let result = tempArr.find((x)=>{
      return (x.userName ==loginUser.userName && x.userPass == loginUser.userPass)
    })
    if(result == undefined){
      Materialize.toast('账号密码错误',4000);
      return false;
    }else{
      Materialize.toast('登录成功',4000);
      let timer = setTimeout(() => {
        location.reload();
      }, 2000);
      return true;
    }
  }
}
