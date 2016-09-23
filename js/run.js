$(function(){
    var runImg=document.querySelectorAll(".run");
    var jumpImg=document.querySelectorAll(".jump");
    var hinderImg=document.querySelectorAll(".hinder");
    //var fruitImg=document.querySelectorAll(".fruit");
    var moneyImg=document.querySelectorAll(".jinbiss");
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    window.onresize=function(){
        canvas.width=document.documentElement.clientWidth;
        canvas.height=document.documentElement.clientHeight;
    };
    window.onresize();//不管有没有调整浏览器，都先执行window.onresize()里面的内容，使开始时就使canvas的大小适应于浏览器的大小。

    /*程序运行*/
    var gameObj=new game(canvas,cobj,runImg,jumpImg,hinderImg,moneyImg);
    //gameObj.play();
    //$(".menu ul li .lifenum").html(gameObj.life);
    //alert(life.html())



    /*mask*/
    $(".start").on("click",function(){
        $(".door1").css({transition:"all 1s ease",transform:"translate(-100%,0)"});
        $(".door2").css({transition:"all 1s ease",transform:"translate(100%,0)"});
        $(".start").css({opacity:0,display:"none"});
        setTimeout(function(){
            $(".stop").css({display:"block"});
        },1000);
        gameObj.play()
    });
    /*stop*/
    $(".stop").on("click",function(){
        $(".tank1").css({display:"block"});
       //clearInterval(t1);
        $(".tank1 ul .one").on("click",function(){
            $(".tank1").css({display:"none"});
             //alert(1)
            gameObj=new game(canvas,cobj,runImg,jumpImg,hinderImg,moneyImg);
              gameObj.play();
            $(".tank1").css({display:"none"});
            $(".door1").css({transition:"all 1s ease",transform:"translate(0,0)"});
            $(".door2").css({transition:"all 1s ease",transform:"translate(0,0)"});
            $(".start").css({opacity:1,display:"block"});
            $(".stop").css({display:"none"});
        });
        $(".tank1 .cha").on("click",function(){
            $(".tank1").css({display:"none"});
        });
        $(".tank1 ul .two").on("click",function(){
            $(".tank1").css({display:"none"});
            $(".door1").css({transition:"all 1s ease",transform:"translate(0,0)"});
            $(".door2").css({transition:"all 1s ease",transform:"translate(0,0)"});
            $(".start").css({opacity:1,display:"block"});
            $(".stop").css({display:"none"});
        });

    });

    /*继续*/
    $(".tank2 .on").on("click",function(){
        $(".tank2").css({display:"none"});
        gameObj=new game(canvas,cobj,runImg,jumpImg,hinderImg,moneyImg);
        gameObj.play();
    });
    $(".tank2 .quit").on("click",function(){
        $(".tank1").css({display:"none"});
        $(".door1").css({transition:"all 1s ease",transform:"translate(0,0)"});
        $(".door2").css({transition:"all 1s ease",transform:"translate(0,0)"});
        $(".start").css({opacity:1,display:"block"});
        $(".stop").css({display:"none"});
        $(".tank2").css({display:"none"});
    })
});