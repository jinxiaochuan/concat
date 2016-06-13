~function(desW){
    var winW=document.documentElement.clientWidth;
    document.documentElement.style.fontSize=winW/desW*100+"px";
}(750);
/*实现滑屏操作--滑屏区域初始化及动画的切换*/
var step=0;
~function(){
    var swiper=new Swiper(".swiper-container",{
        loop:true,
        direction:"vertical",
        effect:"slide",
        pagination:".swiper-pagination",
        paginationType:"bullets",
        onSlidePrevEnd:function(){
            step--;
            change();
            if(step==0){
                step=5;
            }
        },
        onSlideNextEnd:function(){
            step++;
            change();
            if(step==6){
                step=1;
            }
        }

    });
    function change(){
        var divList=document.querySelectorAll(".swiper-slide");
        Array.prototype.forEach.call(divList,function(curDiv,index){
            if(step===index){
                curDiv.id=curDiv.getAttribute("trueId");
            }else{
                curDiv.id="";
            }
        })

    }
}();
/*音频播放*/
~function(){
    var audioBox=document.querySelector(".audio");
    var myAudio=audioBox.getElementsByTagName("audio")[0];
    window.setTimeout(function(){
        myAudio.play();
        myAudio.addEventListener("canplay",function(){
            audioBox.style.display="block";
            audioBox.className='audio audioMove';
            return;
        },false)
    },800);
    audioBox.addEventListener("click",function(){
        if(myAudio.paused){
            myAudio.play();
            audioBox.className='audio audioMove';
            return;
        }
        myAudio.pause();
        audioBox.className='audio';
    },false)
}();
/*实现但当前页时的动画执行*/














