/*
 * @Author: leihao
 * @Date: 2021-05-20 12:06:18
 * @LastEditTime: 2021-05-22 20:24:26
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
    'url': "https://www.fastmock.site/mock/40e170f960701a834866a0bc956002f6/tickets/getAllTheatres",
    "getAllTheatres": function (data) {
        var Theatres = data.places;
    }
});
//获取所有演艺种类数据
$.ajax({
    'url': "https://www.fastmock.site/mock/40e170f960701a834866a0bc956002f6/tickets/getAllTypes",
    "getAllType": function (data) {
        var Type = data.types;
    }
});
//获取所有的城市数据
$.ajax({
    'url': "https://www.fastmock.site/mock/40e170f960701a834866a0bc956002f6/tickets/getAllCiyies",
    "getAllCities": function (data) {
        var Cities = data.citys;
    }
});


//NOTE  页面启动时检查登录状态从而启用部分元素和功能
let doSignin = sessionStorage.getItem('signin');
//默认登录状态为false
if (doSignin == null) {
  signin_judge = 'false';
  sessionStorage.setItem('signin', signin_judge);
} else if (doSignin == 'true') {
  showUserInfo();
}
login();
signin();
//NOTE 注册功能
function login() {
  let nameright = false;
  let phoneright = false;
  let emailright = false;
  let passright = false;
  let RepeatPass = false;
  $('main').on('keyup', '#userName', function () {
    let text = $('#userName').val();
    let username = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    if (username.test(text)) {
      nameright = true;
      $('#userName').removeClass('invalid');
    } else {
      $('#userName').addClass('invalid');
    }
  });
  $('main').on('keyup', '#userPhone', function () {
    let text = $('#userPhone').val();
    let phone = /^1[3-9][0-9]{9}$/;
    if (phone.test(text)) {
      phoneright = true;
      $('#userPhone').removeClass('invalid');
    } else {
      $('#userPhone').addClass('invalid');
    }
  });
  $('main').on('keyup', '#userEmail', function () {
    let text = $('#userEmail').val();
    let email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (email.test(text)) {
      emailright = true;
      $('#userEmail').removeClass('invalid');
    } else {
      $('#userEmail').addClass('invalid');
    }
  });
  $('main').on('keyup', '#userPass', function () {
    let text = $('#userPass').val();
    let pass = /^[A-Z][0-9a-zA-Z]{6,16}$/;
    if (pass.test(text)) {
      passright = true;
      $('#userPass').removeClass('invalid');
    } else {
      $('#userPass').addClass('invalid');
    }
  });
  $('main').on('click', '#update_user', function () {
    RepeatPass = false;
    ifNameRepeat();
    if (nameright && phoneright && emailright && passright && RepeatPass) {
      let userBankStr = localStorage.getItem('userBankJSON');
      let UserObj = {
        name: $('#userName').val(),
        phone: $('#userPhone').val(),
        email: $('#userEmail').val(),
        pass: $('#userPass').val()
      }
      if (userBankStr == null) {
        let userBankArr = [];
        userBankArr.push(UserObj);
        userBankStr = JSON.stringify(userBankArr);
        localStorage.setItem('userBankJSON', userBankStr);
      } else {
        let userBankArr = JSON.parse(userBankStr);
        userBankArr.push(UserObj);
        userBankStr = JSON.stringify(userBankArr);
        localStorage.setItem('userBankJSON', userBankStr);
      }
      alert('注册成功');
    }
  });
  //NOTE 用户名重复性检查
  function ifNameRepeat() {
    let userBankStr = localStorage.getItem('userBankJSON');
    if (userBankStr == null) {
      RepeatPass = true;
    } else {
      let userBankArr = JSON.parse(userBankStr);
      let judge = 0
      for (let i = 0; i < userBankArr.length; i++) {
        if (userBankArr[i].name == $('#userName').val()) {
          judge = 1;
        } else {
          judge = 0;
        }
      }
      if (judge == 1) {
        alert('用户名重复，请更改用户名');
      } else {
        RepeatPass = true;
      }
    }
  }
}
//NOTE 登录功能
function signin() {
  let nameright = false;
  let passright = false;
  $('main').on('keyup', '#inputUser', function () {
    let text = $('#inputUser').val();
    let username = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    if (username.test(text)) {
      nameright = true;
      $('#inputUser').removeClass('invalid');
    } else {
      $('#inputUser').addClass('invalid');
    }
  });
  $('main').on('keyup', '#inputPass', function () {
    let text = $('#inputPass').val();
    let pass = /^[A-Z][0-9a-zA-Z]{6,16}$/;
    if (pass.test(text)) {
      passright = true;
      $('#inputPass').removeClass('invalid');
    } else {
      $('#inputPass').addClass('invalid');
    }
  });
  $('main').on('click', '#sign_check', function () {
    if (nameright && passright) {
      let $inputUser = $('#inputUser').val();
      let $inputPass = $('#inputPass').val();
      let userBankStr = localStorage.getItem('userBankJSON');
      if (userBankStr == null) {
        alert('请注册');
      } else {
        let userBankArr = JSON.parse(userBankStr);
        let judge = 0
        for (let i = 0; i < userBankArr.length; i++) {
          if (userBankArr[i].name == $inputUser) {
            if (userBankArr[i].pass == $inputPass) {
              alert('登录成功');
              sessionStorage.setItem('signin', 'true');
              sessionStorage.setItem('user', userBankArr[i].name);
              sessionStorage.setItem('email', userBankArr[i].email);
              judge = 1;
              window.location.reload();
              break;
            }
          }
        }
        if (judge == 0) {
          alert('用户名或密码错误请重试');
        }
      }
    }
  });
}
//NOTE 登录后添加页面元素（用户头像，用户名，邮箱，注销按钮）
function showUserInfo() {
  $('.userView .btn').remove();
  let userimg = `<a href="#!user" id="nav_user_img"><img class="circle" src="../images/user.jpg"/></a>`;
  $('#next_is_user_img').after(userimg);
  let username = sessionStorage.getItem('user');
  let useremail = sessionStorage.getItem('email');
  $('.userView span.name').text(username);
  $('.userView span.email').text(useremail);
  $('#next_is_sign_out').after(`<a href="#!signOUT" class="right-align" id='sign_out_link'>
            <span class="white-text signOUT">
              注销
            </span>
          </a>`);
}
//NOTE 注销事件功能
$('nav').on('click', '#sign_out_link', function () {
  alert('注销成功')
  sessionStorage.setItem('signin', 'false');
  sessionStorage.setItem('user', null);
  sessionStorage.setItem('email', null);
  window.location.reload();
});
