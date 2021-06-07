/* 课程详情 */
var right = document.getElementsByClassName('right')[0];

var right_h2 = right.getElementsByTagName('h2')[0];
right_h2.innerHTML = "[" + videoDetail.year + "] " + videoDetail.title + "";

var right_ul = right.getElementsByTagName('ul')[0];
right_ul.innerHTML = '<li> 年级科目：' + videoDetail.grade + '</li><li> 课时数量：' + videoDetail.time + '课时</li><li> 开课时间：' + videoDetail.duration + '</li><li> 有效期至：' + videoDetail.period + '</li>';

var right_p = right.getElementsByTagName('p');
console.log(right_p);
right_p[1].innerHTML = '<span> ' + ujy.getTime(videoDetail.end)[3] + '</span> 天<span> ' + ujy.getTime(videoDetail.end)[2] + '</span> 时<span>' + ujy.getTime(videoDetail.end)[1] + '</span> 分<span> ' + ujy.getTime(videoDetail.end)[0] + '</span> 秒';

var right_b = right.getElementsByTagName('b')[0];
right_b.innerHTML = "￥" + videoDetail.price + " ";

var right_a = right_p[2].getElementsByTagName('a');
right_a[0].innerHTML = '￥' + videoDetail.singlePrice + '单独购买';
right_a[1].innerHTML = '￥' + videoDetail.group + '拼团';

/* 教师信息 */
var teacher = document.getElementsByClassName('mid type-area')[0];
var teacherSpan = teacher.getElementsByTagName('span');
teacherSpan[1].innerHTML = '<mark>' + videoDetail.teacher + '</mark><br>' + videoDetail.teacherTitle + '';

var teachertxt = teacher.getElementsByTagName('article')[0];
teachertxt.innerHTML = videoDetail.introduce;


/* 视频播放 */
var right1 = document.getElementsByClassName('right1')[0];
var right1_ul = right1.getElementsByTagName('ul');
console.log(right1_ul);
var right1_ul1_msg = '';
for (let i = 0; i < commentList.length; i++) {
    right1_ul1_msg += '<li><div class="box1"><i><img src="' + commentList[i].src + '" alt=""></img></i><em>' + commentList[i].name + '</em><b>' + commentList[i].time + '</b></div><p>' + commentList[i].content + '</p></li>'

}
right1_ul[1].innerHTML = right1_ul1_msg;
//点击切换讨论区
var right1P=right1.getElementsByTagName('p')[0];
var right1Spans=right1P.getElementsByTagName('span');
var right1Divs=right1.getElementsByTagName('div');
for (let i = 0; i < right1Spans.length; i++) {
    right1Spans[i].index = i;
    right1Spans[i].onclick = function () {
        for (let j = 0; j < right1Spans.length; j++) {
            right1Divs[j].style.display = 'none';
            right1Spans[j].className = '';
        }
        right1Divs[this.index].style.display = 'block';
        right1Spans[this.index].className = 'active'
    }
}
// 切换视频
var getVideosrc=right1Divs[0].getElementsByTagName('li');
console.log(getVideosrc);
for (let i = 0; i < getVideosrc.length; i++) {
    getVideosrc[i].index=i;
    getVideosrc[i].onclick=function(){
        for (let i = 0; i < getVideosrc.length; i++) {
            getVideosrc[i].className='';
        }
        video.src="../video/0"+(this.index+1)+".mp4";
        getVideosrc[this.index].className='active';
    }
    
}

/* 课程详情 */
var list = document.getElementsByClassName('list type-area')[0];
var ps = list.getElementsByTagName('p');
var divs = list.getElementsByTagName('div');
var btns = ps[0].getElementsByTagName('span');

// 点击切换
for (let i = 0; i < btns.length; i++) {
    btns[i].index = i;
    btns[i].onclick = function () {
        for (let j = 0; j < btns.length; j++) {
            divs[j].className = '';
            btns[j].className = ''
        }
        divs[this.index].className = 'cur';
        btns[this.index].className = 'active'
    }
}
// 渲染数据
var lists = divs[0].getElementsByClassName('list');
var uls = divs[0].getElementsByTagName('ul');
var listHTML = '';
for (let i = 0; i < classList.length; i++) {
    listHTML +=
        '<section class="list">\
        <h2>' + classList[i].title + ' 含( 四期 )<span class="iconfont">&#xe62f;</span></h2>\
        <ul></ul>\
    </section>';
}
divs[0].innerHTML += listHTML;

for (let i = 0; i < classList.length; i++) {
    var List = classList[i].list;
    var ulHTML = '';
    for (let j = 0; j < List.length; j++) {
        ulHTML +=
            '<li><span class="iconfont">&#xeb21;</span>\
        <a href ="#">' + List[j].name + ' </a>\
        <em></em><b>' + List[j].time + '</b></li>'
    };
    uls[i].innerHTML = ulHTML;
}
// 设置初始样式
uls[0].className = 'cur';
uls[1].className = 'cur';
uls[0].setAttribute('tag', '0')
uls[1].setAttribute('tag', '0')
// 展开收起
var listH2 = divs[0].getElementsByTagName('h2');
var listP = divs[0].getElementsByTagName('p')[0];

for (let i = 0; i < listH2.length; i++) {
    listH2[i].index = i;
    listH2[i].onclick = function (evs) {
        var ev = window.event || evs;
        var attr = uls[this.index].getAttribute('tag');
    
        if (ev.target.nodeName == 'SPAN') {
            if (attr=='0') {
                uls[this.index].className = '';
                uls[this.index].setAttribute('tag', '1')
            } else if (attr==1 ||attr==null) {
                uls[this.index].className = 'cur';
                uls[this.index].setAttribute('tag', '0')
            }
        }
    }
}
var n = 0;
listP.onclick = function () {
    if (n == 0) {
        for (let i = 0; i < uls.length; i++) {
            uls[i].className = 'cur';
            uls[i].setAttribute('tag', '0')
            listP.innerHTML = '点击收起全部';
        }
        n = 1
    } else {
        for (let i = 0; i < uls.length; i++) {
            uls[i].className = '';
            listP.innerHTML = '点击展开全部';
        }
        n = 0;
    }

}

/* 免费试学 */
var playVideo=right.getElementsByTagName('strong')[0];
var left=document.getElementsByClassName('left')[0];
var video=left.getElementsByTagName('video')[0];
var img=left.getElementsByTagName('img')[0];

console.log(playVideo,img,video);
playVideo.onclick=function(){
    img.style.display='none';
    video.style.display='block';
    right.style.display='none';
    right1.style.display='block'
}
// 视频暂停
console.log(video);
video.pause=function(){
    video.poster="../img/videoDetail/san.png";
    console.log(1);
}