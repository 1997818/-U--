var shop = document.getElementsByClassName('shop type-area')[0];
var shop_ul = shop.getElementsByTagName('ul')[0];
var pageNum = document.getElementsByClassName('footer')[0];
/* 筛选和分页 */
// 临时数据
var lsDate = online;
var num = Math.ceil(lsDate.length / 12);
var n = 1;
var pagetxt = '';
for (let i = 0; i < num; i++) {
    pagetxt += '<span>' + (i + 1) + '</span>';
}
pageNum.innerHTML = '<span>上一页</span>' + pagetxt + '<span>下一页</span>';
var spans = pageNum.getElementsByTagName('span');
spans[1].className = "active";
console.log(pageNum);
// 点击跳转
pageNum.onclick = function (evs) {
    var ev = window.event || evs;
    var tar = ev.target || ev.srcElement;
    for (let i = 0; i < spans.length; i++) {
        spans[i].className = ''
    }
    if (tar.nodeName == 'SPAN') {
        if (tar.innerHTML == '上一页') {
            n--;
            shop_ulHTML();
        } else if (tar.innerHTML == '下一页') {
            n++;
            shop_ulHTML();
        } else {
            n = tar.innerHTML;
            shop_ulHTML();
        }
    }
}
// 点击筛选
var ps = document.getElementsByTagName('p');
console.log(ps);
var bs = ps[3].getElementsByTagName('b');
for (let i = 0; i < bs.length; i++) {
    bs[i].onclick = function () {
        var attr = this.getAttribute('tag');
        for (let i = 0; i < bs.length; i++) {
            bs[i].className=''; 
        }
        
        if (attr == 'all') {             
            lsDate = online;
            num = Math.ceil(lsDate.length / 12);
            this.className='active';
        } else {           
            lsDate = online.filter(function (val) {
                return val.subject == attr;
            }) ;
            num = Math.ceil(lsDate.length / 12);
            this.className='active';
        }
        for (let i = 0; i < spans.length; i++) {
            spans[i].className='';
            
        }
        shop_ulHTML();
    }

}
/* 渲染数据 */
function shop_ulHTML() {
    if (n <= 1) {
        spans[0].style.color = '#ccc';
        n = 1;
    } else {
        spans[0].style.color = '#000';
    }
    if (n >= num) {
        spans[spans.length - 1].style.color = '#ccc';
        n = num;
    } else {
        spans[spans.length - 1].style.color = '#000';
    }
    if (n >= 1 && n <= num) {
        ulHTMl = lsDate.slice(12 * (n - 1), 12 * n);
        var shop_ulmsg = '';
        for (let i = 0; i < ulHTMl.length; i++) {
            shop_ulmsg += '<li><div><img src="' + ulHTMl[i].src + '" alt=""><span class="learn">' + ulHTMl[i].cont + '</span><span class="people">' + ulHTMl[i].num + '人在学习</span></div><p>' + ulHTMl[i].title + '<br><span class="span1">' + ulHTMl[i].time + '课时</span><a href="#">' + (ulHTMl[i].isFree ? "免费学习" : "付费学习") + '</a></p></li>'
        }
        shop_ul.innerHTML = shop_ulmsg;
        spans[n].className = 'active'
    }
}
shop_ulHTML();