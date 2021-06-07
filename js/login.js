var a1 = document.getElementsByClassName("login")[1];
var a2 = document.getElementsByClassName("register")[0];

var loginDiv = document.getElementById("login");
var login = loginDiv.getElementsByClassName("login")[0];
var close = login.getElementsByClassName('close')[0];

var register = document.getElementsByClassName('enroll')[0];
var t1 = parseInt(ujy.getStyle(login, 'top'));
var t2 = parseInt(ujy.getStyle(register, 'top'));
// 居中
window.onresize = window.onscroll = function name() {
    let st = document.documentElement.scrollTop;
    login.style.top = t1 + st + 'px';
    login.style.marginTop = '265px';
    register.style.top = t2 + st + 'px';
    register.style.marginTop = '265px';
}

/* 登录 */
function auto1() {
    var form = login.getElementsByTagName('form')[0];
    form.onsubmit = function () {
        return false;
    }
    /* 跳转登录 */
    a1.onclick = function () {
        loginDiv.style.display = 'block';
        login.style.display = 'block';
    }
    /* 点击关闭 */
    close.onclick = function () {
        loginDiv.style.display = 'none';
        login.style.display = 'none';
    }
    /* 登录 */
    form.submit.onclick = function () {
        if (form.user.value == localStorage.user && form.pass.value == localStorage.password) {
            // 可以跳转到原页面
            // 判断来源是谁
            // login.html#1: 首页
            // login.html#2: 同步
            // login.html#3: 课程详情
            // login.html#3: 课程播放
            if (location.hash == '#1') {
                // 回首页
                location.href = './index.html';

            }
            if (location.hash == '#2') {
                location.href = './page_tbkt.html';

            }
            if (location.hash == '#2') {
                location.href = './class.html';

            }
            loginDiv.style.display = 'none';
            login.style.display = 'none';
            // 存储一个状态 在其他页面判断当前是否已经成功登录
            localStorage.login = 'true';
            history.go(0);
        } else {
            alert('账号或密码错误');
        }
    }

}
auto1();

function auto() {
    // 绝对居中
    var form = register.getElementsByTagName('form')[0];
    var divs = register.getElementsByTagName('div');
    var strong = register.getElementsByTagName('strong')[0];
    form.onsubmit = function () {
        return false;
    }
    /* 跳转注册 */
    a2.onclick = function () {
        loginDiv.style.display = 'block';
        register.style.display = 'block';
    }
    /* 点击关闭 */
    var close = register.getElementsByClassName('close')[0];
    close.onclick = function () {
        loginDiv.style.display = 'none';
        register.style.display = 'none';
    }
    /* 注册 */
    form.phone.onblur = function () {
        console.log(form.phone.value);
        var reg = /^1[3-9]\d{9}$/
        if (reg.exec(form.phone.value)) {
            localStorage.user = form.phone.value;
            form.phone.style.borderColor = 'green';
            divs[0].style.opacity = 0;
        } else {
            form.phone.style.borderColor = 'red';
            divs[0].style.opacity = 1;
        }
    }
    form.password.onblur = function () {
        console.log(form.password.value);
        var reg = /(?!(^\d{6,18}$))(^[a-zA-Z0-9]{6,18}$)/;
        if (reg.exec(form.password.value)) {
            localStorage.password = form.password.value;
            form.password.style.borderColor = 'green';
            divs[1].style.opacity = 1;
        } else {
            form.password.style.borderColor = 'red';
            divs[1].innerHTML = "密码格式不正确，请重新输入！";
        }
    }
    form.password2.onblur = function () {
        console.log(form.password2.value);
        if (form.password2.value == localStorage.password) {
            localStorage.password = form.password2.value;
            form.password2.style.borderColor = 'green';
            divs[2].style.opacity = 0;
        } else {
            form.password2.style.borderColor = 'red';
            divs[2].style.opacity = 1;
        }
    }
    form.code.onblur = function () {
        console.log(form.code.value);
        if (form.code.value == strong.innerHTML) {
            form.code.style.borderColor = 'green';
            divs[3].style.opacity = 0;
        } else {
            form.code.style.borderColor = 'red';
            divs[3].style.opacity = 1;
        }
    }
    form.submit.onclick = function () {
        if (true) {
            localStorage.user = form.phone.value;
            localStorage.password = form.password.value;
            register.style.display = 'none';
            login.style.display = 'block';
        }
    }

}
auto();
/* 判断登录状态 */
var user = document.getElementsByClassName("user")[0];
var a2 = document.getElementsByClassName("login")[0];
var userP = user.getElementsByTagName('p')[0];
var userUl = user.getElementsByTagName('ul')[0];
var userLis = userUl.getElementsByTagName('li');
var n = 0;
if (localStorage.login == 'true') {
    // 已登录
    // 登录 注册隐藏
    a2.style.display = 'none';
    user.style.display = 'block';
    userUl.style.opacity = '0';
    // 给退出按钮添加点击事件
    userLis[5].onclick = function () {
        localStorage.login = 'false';
        history.go(0);
    }
    // 添加事件
    userP.onclick = function () {
        if (n == 0) {
            userUl.style.opacity = '0'
            n=1;
        } else {
            userUl.style.opacity = '1'
            n=0;
        }
    }
} else {
    // 未登录
    // 登录注册显示
    a2.style.display = 'block';
    user.style.display = 'none';
}