/*//获取元素
var inner=document.querySelector(".inner");
var tips=document.querySelector(".tips");
//动态绑定数据
var ary=["img/hollywood_1.jpg","img/hollywood_2.jpg","img/hollywood_3.jpg","img/hollywood_4.jpg"];
var len=ary.length;
var strInner='';
var strTips='';
var winH=window.innerHeight;
function dataBind(){
    strInner+='<div class="item"><img src="" trueSrc="'+ary[len-1]+'"/></div>';
    ary.forEach(function(item,index){
        strInner+='<div class="item"><img src="" trueSrc="'+item+'"/></div>';
        strTips+='<span></span>';
    });
    strInner+='<div class="item"><img src="" trueSrc="'+ary[0]+'"/></div>';
    inner.innerHTML+=strInner;
    tips.innerHTML=strTips;
};
dataBind();
var imgList=document.querySelectorAll(".inner>.item>img");
console.log(imgList)
var spanList=document.querySelectorAll(".tips>span");
spanList[0].className="select";
Array.prototype.forEach.call(imgList,function(item,index){
    item.style.height=winH+"px";
});
//延迟加载
function lazyLoad(){
    Array.prototype.forEach.call(imgList,function(item,index){
        var tempImg=new Image;
        tempImg.src=item.getAttribute("trueSrc");
        tempImg.onload=function(){
            item.src=this.src;
            tempImg=null;
        }
    })
}
lazyLoad();*/
//自动轮播
var inner=document.querySelector(".inner");
var tips=document.querySelector(".tips");
var imgList=document.querySelectorAll(".inner>.item>img");
var spanList=document.querySelectorAll(".tips>span");
spanList[0].className="select";
Array.prototype.forEach.call(imgList,function(item,index){
    item.style.height=winH+"px";
});
var winH=window.innerHeight;
var len=4;
var step=1;
var interval=1500;
var autoTimer=null;
var numList=document.getElementsByClassName("num");
var concat=document.getElementsByClassName("concat")[0];
var tel=document.getElementsByClassName("tel")[0];
var email=document.getElementsByClassName("email")[0];

console.log(numList)
function autoMove(){
    step++;
    if(step===2){
        Array.prototype.forEach.call(numList,function(item,index){
            switch (index){
                case 0:
                case 2:
                case 4:
                    utils.addClass(item,"leftShow");
                    break;
                case 1:
                case 3:
                    utils.addClass(item,"rightShow");
                    break;
            }
        })
    }else{
        Array.prototype.forEach.call(numList,function(item,index){
            switch (index){
                case 0:
                case 2:
                case 4:
                    item.style.right="-45px";
                    console.log(window.getComputedStyle(item,null)["right"])
                    break;
                case 1:
                case 3:
                    item.style.left="-45px";
                    console.log(window.getComputedStyle(item,null)["right"])
                    break;
            }
        })
    }
    inner.style.top=-step*winH+"px";
    inner.style.webkitTransitionDuration="0.5s";
    selectTip();
    if(step>len){
        window.setTimeout(function(){
            inner.style.top=-winH+"px";
            inner.style.webkitTransitionDuration="0s";
            step=1;
        },500)
    }
}
//autoTimer=window.setInterval(autoMove,interval);
//实现touch事件的绑定实现滑动
["start","move","end"].forEach(function(items,index){
    inner.addEventListener("touch"+items,eval(items),false);
});
function start(e){
    //注意：一开始touch时必须清除定时器autoTimer,同时必须清除webkitTransitionDuration这个属性，否则，当move操作的时候，默认有0.5s的时间，导致移动延迟
    //window.clearInterval(autoTimer);
    this.style.webkitTransitionDuration="0s";
    this.startX= e.touches[0].pageX;
    this.startY= e.touches[0].pageY;
    this.startT= parseFloat(window.getComputedStyle(this,null)["top"]);
}
function move(e){
    var moveX=e.touches[0].pageX;
    var moveY= e.touches[0].pageY;
    this.isSw=isSwipe(this.startX,this.startY,moveX,moveY);
    this.direction=swipeDirection(this.startX,this.startY,moveX,moveY);
    if(/^(Up|Down)$/.test(this.direction)){
        this.movePos=moveY-this.startY;
        this.style.top=this.startT+this.movePos+"px";

    }
}
function end(e){
    var _this=this;
    if(this.isSw){
        if(Math.abs(this.movePos)>winH/4){
            if(this.direction==="Up"){
                step++;
                if(step===2){
                    Array.prototype.forEach.call(numList,function(item,index){
                        switch (index){
                            case 0:
                            case 2:
                            case 4:
                                utils.addClass(item,"leftShow");
                                break;
                            case 1:
                            case 3:
                                utils.addClass(item,"rightShow");
                                break;
                        }
                    })
                }else{
                    Array.prototype.forEach.call(numList,function(item,index){
                        switch (index){
                            case 0:
                            case 2:
                            case 4:
                                item.style.right="-45px";
                                utils.removeClass(item,"leftShow")
                                console.log(window.getComputedStyle(item,null)["right"])
                                break;
                            case 1:
                            case 3:
                                item.style.left="-45px";
                                utils.removeClass(item,"rightShow");
                                console.log(window.getComputedStyle(item,null)["left"])
                                break;
                        }
                    })
                };
                if(step===3){
                    utils.addClass(concat,"scale");
                    utils.addClass(tel,"telShow");
                    utils.addClass(email,"emailShow");
                }else{
                    utils.removeClass(concat,"scale");
                    utils.removeClass(tel,"telShow");
                    utils.removeClass(email,"emailShow");
                }
                if(step>len){
                    window.setTimeout(function(){
                        _this.style.top=-winH+"px";
                        _this.style.webkitTransitionDuration="0s";
                        step=1;
                    },500)
                }
            }else if(this.direction==="Down"){
                step--;
                if(step===2){
                    Array.prototype.forEach.call(numList,function(item,index){
                        switch (index){
                            case 0:
                            case 2:
                            case 4:
                                utils.addClass(item,"leftShow");
                                break;
                            case 1:
                            case 3:
                                utils.addClass(item,"rightShow");
                                break;
                        }
                    })
                }else{
                    Array.prototype.forEach.call(numList,function(item,index){
                        switch (index){
                            case 0:
                            case 2:
                            case 4:
                                item.style.right="-45px";
                                utils.removeClass(item,"leftShow")
                                console.log(window.getComputedStyle(item,null)["right"])
                                break;
                            case 1:
                            case 3:
                                item.style.left="-45px";
                                utils.removeClass(item,"rightShow");
                                console.log(window.getComputedStyle(item,null)["left"])
                                break;
                        }
                    })
                }
                if(step===3){
                    utils.addClass(concat,"scale");
                    utils.addClass(tel,"telShow");
                    utils.addClass(email,"emailShow");
                }else{
                    utils.removeClass(concat,"scale");
                    utils.removeClass(tel,"telShow");
                    utils.removeClass(email,"emailShow");
                }
                if(step<1){
                    window.setTimeout(function(){
                        _this.style.top=-len*winH+"px";
                        _this.style.webkitTransitionDuration="0s";
                        step=len;
                    },500)
                }
            }
            this.style.top=-step*winH+"px";
            this.style.webkitTransitionDuration="0.5s";
            selectTip();
        }else{
            this.style.top=-step*winH+"px";
            this.style.webkitTransitionDuration="0.5s";
            selectTip();
        }

    }
}
//按钮
function selectTip() {
    var temp = step;
    temp > len ? temp = 1 : null;
    temp < 1 ? temp = len : null;
    [].forEach.call(spanList,function(item,index){
        item.className = (temp-1 == index) ?"select" :null  ;
    })

}
//判断滑动距离是否超过30，若不超过30认定为不进行换页操作
function isSwipe(startX,startY,moveX,moveY){
    var changeX=moveX-startX;
    var changeY=moveY-startY;
    return Math.abs(changeX)>30||Math.abs(changeY)>30;
}
//
function swipeDirection(startX,startY,moveX,moveY){
    var changeX=moveX-startX;
    var changeY=moveY-startY;
    return Math.abs(changeX)>Math.abs(changeY)?(changeX>0?'Right':'Left'):(changeY>0?'Down':'Up');
}















