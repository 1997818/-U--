var n = 0;
var ujy = Ujiuye();

/* 轮播图 */
// 获取元素
var banner = document.getElementById('banner');
var rotating = banner.getElementsByClassName('Rotating clearfix')[0];
var box = banner.getElementsByClassName('box')[0];
console.log(box);
var width = 1180;
var left = ujy.getStyle(rotating, 'left');
// 获取数据
var html = '',
    lihtml = '';
for (let i = 0; i < bannerData.length; i++) {
    html += '<li><img src="' + bannerData[i].src + '" alt=""></li>';
    lihtml += '<li><img src="../img/index/left.png" alt=""> ' + bannerData[i].title + '</li>';
}
html += '<li><img src="' + bannerData[0].src + '" alt=""></li>'
rotating.innerHTML = html;
box.innerHTML = lihtml;
// 轮播效果
var lis = rotating.getElementsByTagName('li');
var box_lis = box.getElementsByTagName('li');
var img = box.getElementsByTagName('img');
box_lis[0].className = 'active';
img[0].className = 'active';
console.log(lis);
// 轮播图

var timerID = setInterval(function () {

    n++
    for (let j = 0; j < box_lis.length; j++) {
        box_lis[j].className = '';
        img[j].className = '';
    }

    if (n == lis.length) {
        rotating.style.left = 0;
        n = 1;
    }
    if (n == box_lis.length) {
        box_lis[0].className = 'active';
        img[0].className = 'active';
    } else {
        box_lis[n].className = 'active';
        img[n].className = 'active';
    }
    left = -n * width + 'px';
    ujy.move(rotating, 'left', 50, -n * width);


}, 3000);
// 滑入滑出
for (let i = 0; i < box_lis.length; i++) {
    box_lis[i].index = i;
    box_lis[i].onmouseenter = function () {
        clearInterval(timerID);
        for (let j = 0; j < box_lis.length; j++) {
            box_lis[j].className = '';
            img[j].className = '';
        }
        box_lis[this.index].className = 'active';
        img[this.index].className = 'active';
        n = this.index;
        if (n == 0) {
            rotating.style.left = 0
        }
        left = -n * width + 'px';
        ujy.move(rotating, 'left', 50, -n * width);
    }
    box_lis[i].onmouseleave = function () {
        timerID = setInterval(function () {
            for (let j = 0; j < box_lis.length; j++) {
                box_lis[j].className = '';
                img[j].className = '';
            }
            n++
            if (n == lis.length) {
                rotating.style.left = 0
                n = 1
            }
            left = -n * width + 'px';
            ujy.move(rotating, 'left', 50, -n * width);
            box_lis[n - 1].className = 'active';
            img[n - 1].className = 'active';
        }, 3000);
    }
}

/* 同步课堂 */
var shop1 = document.getElementsByClassName('shop type-area')[0];
var shop1_ul = shop1.getElementsByTagName('ul')[0];
var shop1_msg = '';

for (let i = 0; i < lesson.online.length; i++) {
    shop1_msg += '<li><div><img src="' + lesson.online[i].src + '" alt=""><span class="learn">' + lesson.online[i].cont + '</span><span class="people">' + lesson.online[i].num + '人在学习</span></div><p>' + lesson.online[i].title + '<br><span class="span1">' + lesson.online[i].time + '课时</span><a href="#">免费学习</a></p></li>'

}

shop1_ul.innerHTML = shop1_msg;

/* 在线测试 */
var shop2 = document.getElementsByClassName('shop2 type-area')[0];
var shop2_ul = shop2.getElementsByTagName('ul')[0];
var shop2_msg = '';
console.log(shop2_ul);
for (let i = 0; i < lesson.test.length; i++) {
    shop2_msg += '<li><div><img src="' + lesson.test[i].src + '" alt=""><span class="learn">' + lesson.test[i].cont + '</span>\
    <p><span class="people">' + lesson.test[i].num + '人已考试</span><b class="span1">' + lesson.test[i].time + '</b></p></div><p>' + lesson.test[i].title + '<a href="#">去考试</a></p></li>'
}
shop2_ul.innerHTML = shop2_msg;

/* 精品课程 */
var shop3 = document.getElementsByClassName('shop3 type-area')[0];
var shop3_ul = shop3.getElementsByTagName('ul')[0];
var shop3_msg = '';
console.log(shop3_ul);
for (let i = 0; i < lesson.good.length; i++) {
    shop3_msg += '<li><div><img src="' + lesson.good[i].src + '" alt=""><span class="learn">' + lesson.good[i].cont + '</span><span class="people">' + lesson.good[i].num + '人在学习</span></div><p>' + lesson.good[i].title + '<span class="span1">' + lesson.good[i].time + '课时</span><a href="#">免费学习</a></p></li>'

}
shop3_ul.innerHTML = shop3_msg;

/* 返回顶部 */
var returnTOP = document.getElementsByClassName('fixed')[0];
var returnTOP_ps = returnTOP.getElementsByTagName('p');
console.log(returnTOP_ps[2]);
returnTOP_ps[2].onclick = function () {
    document.documentElement.scrollTop = 0;

}
