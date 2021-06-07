function Ujiuye() { // 外部函数
    // 获取非行间样式
    function getStyle(elem, attr) {
        // elem: 元素
        // attr: 属性
        if (window.getComputedStyle) {
            // 标准
            // console.log(window.getComputedStyle(elem)[attr]);
            return window.getComputedStyle(elem)[attr];
        } else {
            // ie
            // console.log(elem.currentStyle[attr]);
            return elem.currentStyle[attr];
        }
    }

    // 运动函数
    var timerId = null;

    function move(elem, attr, speed, target) {
        // elem: 元素
        // attr: 属性
        // speed: 每一步的步长
        // target: 目标结果值
        // 3.7 开始新的定时器之前清除旧的定时器  
        clearInterval(timerId);
        // 什么时候speed是正数 什么时候speed是负数
        var qs = parseInt(getStyle(elem, attr));
        speed = qs < target ? speed : -speed;

        // 3.1 定时器
        timerId = setInterval(function () {
            // 3.2 获取当前位置  1px --> 1  100px-->100
            var cur = parseInt(getStyle(elem, attr));
            // 3.3 向前移动10px
            var end = cur + speed; // + 10 + +10  -10  + -10
            // 3.5 判断是否到达结束值  1000
            if ((end <= target && speed < 0) || (end >= target && speed > 0)) {
                end = target;
                // 3.6 清除定时器
                clearInterval(timerId);
            }
            // 3.4 改变elem的left 元素.style.属性名 = 值
            elem.style[attr] = end + 'px';
        }, 10);
    }

    // 获取随机数
    function getRandom(min, max) {
        var num = Math.floor(Math.random() * (max - min) + min);
        return num;
    }

    // 添加0
    function add0(num) { // num = 5
        num = num >= 10 ? num : '0' + num; // num = 5 >= 10? num : 0+ num;  num = 05
        return num;
    }

    // 获取随机验证码
    function getRandomCode(n, str) { // 可传可不传的参数 就叫做可选参数 
        // 可选设置默认值
        n = n ? n : 4;
        str = str ? str : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // 4. 存储字符串
        var nstr = '';
        // 2. 需要生成4位字符  随机 ---> 下标 ---> 4个
        for (var i = 0; i < n; i++) {
            // 3. 随机数 整个字符串的长度
            var num = Math.floor(Math.random() * str.length);
            console.log(num);
            // 5. 拼接
            nstr += str[num];
        }
        return nstr;
    }

    // 用来创建标签
    function cE(elem, val) {
        // elem: 标签名
        // val: 标签的内容
        var td2 = document.createElement(elem);
        td2.innerHTML = val;

        // 函数内的td2  要在外面使用  将td2 作为返回值 返回出去
        return td2;
    }

    // 事件绑定函数
    function bind(elem, type, fn) {
        // elem: 元素
        // type: 事件类型
        // fn: 函数
        // 判断
        if (elem.addEventListener) {
            elem.addEventListener(type, fn, false);
        } else {
            // ie
            elem.attachEvent('on' + type, fn);
        }
    }

    // 事件解绑函数
    function unbind(elem, type, fn) {
        // elem: 元素
        // type: 事件类型
        // fn: 函数
        if (elem.removeEventListener) {
            // 标准
            elem.removeEventListener(type, fn, false);
        } else {
            // ie
            elem.detachEvent('on' + type, fn);
        }
    }

    // 元素滚动滚轮事件
    function mScroll(elem, upfn, downfn) {
        // elem: 元素
        // upfn: 页面向上走的时候触发的函数
        // downfn: 页面向下走的时候触发的函数
        elem.onmousewheel = scroll;
        if (elem.addEventListener) {
            elem.addEventListener('DOMMouseScroll', scroll);
        }

        function scroll(evs) {
            // console.log('滚了');
            var ev = window.event || evs;

            // 1. 不知道什么状态 假设
            var tag = true; // true--上  false--下

            // 3. 判断当前是什么浏览器
            if (ev.wheelDelta) {
                // chrome / ie
                tag = ev.wheelDelta > 0 ? false : true;
            } else {
                // ff 
                tag = ev.detail > 0 ? true : false;
            }

            // 2. 根据tag判断向上向下
            if (tag) {
                // 具体向上
                upfn();
            } else {
                // 具体向下
                downfn();
            }
        }
    }

    // 拖拽函数
    function drag(elem, big) { // elem: 元素 big: 大盒子 静态做碰撞的盒子
        // 如果不传big  就是简单拖拽
        // 如果传了big  就是碰撞
        // 1. 鼠标按下事件
        elem.onmousedown = function (evs) {
            // 2. 兼容
            var ev = window.event || evs;
            // 3. 按下的时候 鼠标距离元素左侧的距离x: 鼠标的位置 ev.clientX - 盒子的偏移位置 offsetLeft
            var x = ev.clientX - elem.offsetLeft;
            var y = ev.clientY - elem.offsetTop;

            // 4. 加上移动
            document.onmousemove = function (evs) {
                // 5. 兼容
                var ev = window.event || evs;
                // 6. 求left = clientX - x
                var l = ev.clientX - x;
                var t = ev.clientY - y;

                // 13. 判断big是否存在
                if (big) {
                    // 12 判断是否在安全范围
                    if ((l < big.offsetLeft - elem.offsetWidth) || (l > big.offsetLeft + big.offsetWidth) || (t < big.offsetTop - elem.offsetHeight) || (t > big.offsetTop + big.offsetHeight)) {
                        big.style.background = '#ccc';
                    } else {
                        big.style.background = 'red';
                    }
                }
                // 7. 赋值给elem
                elem.style.left = l + 'px';
                elem.style.top = t + 'px';
            }


            // 8. 当鼠标抬起的时候 移动事件清除
            document.onmouseup = function () {
                document.onmousemove = null;
                // 11. 释放捕获
                if (elem.releaseCapture) {
                    elem.releaseCapture();
                }
            }

            // 9. 阻止默认行为
            // 10. 设置全局捕获: 元素.setCapture();
            if (elem.setCapture) {
                elem.setCapture();
            }
            return false;
        }
    }

    // 缓冲运动
    function buffMove(elem, json, fn) {
        // elem: 元素
        // json: 每一个属性名和属性值
        // fn: 回调函数 非必传

        // 8.频繁触发的时候 清除定时器
        clearInterval(elem.timer);
        // 开启定时器
        elem.timer = setInterval(function () {
            // 12. 假设本次已经到达
            var tag = true; // true--已经到达  false--未到达
            // 所有的属性 
            for (var key in json) {
                // key: 属性名-->attr
                // json[key]: 属性值--->target

                // 4. 获取当前位置
                // 11. 判断是不是透明度属性
                if (key == 'opacity') {
                    var cur = getStyle(elem, key) * 100;
                } else {
                    var cur = parseInt(getStyle(elem, key));
                }

                // 10. 计算速度
                var speed = (json[key] - cur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                // 5. 计算结束位置
                var end = cur + speed;

                // 7. 添加判断
                // 判断哪一个没有到达目标值
                if (end != json[key]) {
                    // 13 假设不成立
                    tag = false;
                }


                // 6. 赋值给elem的key
                // 12 判断是否是透明度属性
                if (key == 'opacity') {
                    elem.style[key] = end / 100;
                } else {
                    elem.style[key] = end + 'px';
                }
            }
            // for执行结束之后 tag还是true  表示所有属性都到达了目标值  可以清除定时器
            if (tag) {
                clearInterval(elem.timer);
                // 如果fn存在 调用fn
                fn && fn();
            }
        }, 10);

    }
    // 转换时间
    function getTime(ms) {
        // 获取毫秒数
        // ms:毫秒
        var s = parseInt(ms / 1000 % 60);
        var m = parseInt(ms / 1000 / 60 % 60);
        var h = parseInt(ms / 1000 / 60 / 60 % 24);
        var d = parseInt(ms / 1000 / 60 / 60 / 24);
        return [s, m, h, d]
    }

    function a() {
        var a1 = console.log('a');
        return a1
    }
    // return buffMove;
    // return [cE, bind, unbind];
    return {
        'buffMove': buffMove,
        'drag': drag,
        'mScroll': mScroll,
        'unbind': unbind,
        'bind': bind,
        'getStyle': getStyle,
        'cE': cE,
        'move': move,
        'getRandom': getRandom,
        'add0': add0,
        'getRandomCode': getRandomCode,
        'getTime': getTime,
        'a': a
    };

}
var ujy =new Ujiuye();
