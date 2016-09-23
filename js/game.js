/*人物下落时溅起的石子   粒子动画*/
function lizi(cobj){
    this.cobj=cobj;
    this.x=0;
    this.y=0;
    this.x1=20 * Math.random() - 10;
    this.y1=20 * Math.random() - 10;
    this.x2=20 * Math.random() - 10;
    this.y2=20 * Math.random() - 10;
    this.speedy = -4 - Math.random() - 2;
    this.speedx = (18 * Math.random() - 9);
    this.life = 4;
    this.r = 1;
    this.color = "#fef";
}

lizi.prototype={
    draw:function(){
        this.cobj.beginPath();
        this.cobj.save();
        this.cobj.fillStyle=this.color;
        this.cobj.translate(this.x,this.y);
        this.cobj.scale(this.r,this.r);
        this.cobj.moveTo(0,0);
        //this.cobj.bezierCurveTo(this.x1,this.y1,this.x2,this.y2,0,0);//
        this.cobj.lineTo(this.x1,this.y1);
        this.cobj.lineTo(this.x2,this.y2);
        this.cobj.fill();
        this.cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.life-=0.2;
        this.r-=0.06;
    }
};

/*小石子*/

function stone(cobj,x,y,color){
    var color=color||"#fff";
    var stoneArr=[];
    for(var i=0;i<5;i++){
        var liziObj=new lizi(cobj);
        liziObj.x=x;
        liziObj.y=y;
        liziObj.color=color;
        stoneArr.push(liziObj);
    }
//console.log(stoneArr.length)

var t=setInterval(function(){
    for(var i=0;i<stoneArr.length;i++){
        stoneArr[i].draw();
        stoneArr[i].update();
        if(stoneArr[i].r<0||stoneArr[i].life<0){
            stoneArr.splice(i,1);
        }
    }
    if(stoneArr.length==0){
        clearInterval(t)
    }
},60);
}


/*人物*/
function person(canvas,cobj,runImg,jumpImg){
    this.x=canvas.width/4;
    this.y=0;
    this.endy=305;
    this.width=215;
    this.height=157;
    this.canvasW=canvas.width;
    this.canvasH=canvas.height;
    this.canvas=canvas;
    this.cobj=cobj;
    this.runImg=runImg;
    this.jumpImg=jumpImg;
    this.status="runImg";
    this.state=0;
    this.speedy=5;
    this.zhongli=10;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,430,313,0,0,this.width,this.height);
        this.cobj.restore();
    },
    update:function(){
        if(this.y>this.endy){
            this.y=this.endy;
            stone(this.cobj,this.x+this.width/2,this.y+this.height,this.color)
        }else if(this.y<this.endy){
            this.speedy+=this.zhongli;
            this.y+=this.speedy;
        }
    }
};
/*创建障碍物对象*/

function hinder(canvas, cobj, hinderImg) {
    this.canvas = canvas;
    this.cobj = cobj;
    this.hinderImg = hinderImg;
    this.state = 0;
    this.x = canvas.width;
    this.y = 390;
    this.width=70;
    this.height=70;
    this.flag1=false;
}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderImg[this.state],0,0,120,120,0,0,this.width,this.height);
        this.cobj.restore();
    }
};
/*创建金币对象*/

/*function moneys(canvas, cobj, moneyImg) {
    this.canvas = canvas;
    this.cobj = cobj;
    this.moneyImg = moneyImg;
    this.x = canvas.width;
    this.y =Math.random()*200+190;
    this.width=51;
    this.height=60;
    this.flag0=false;
}
moneys.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.moneyImg[0],0,0,254,303,0,0,this.width,this.height);
        this.cobj.restore();
    }
};*/


/*游戏主程序*/
function game(canvas,cobj,runImg,jumpImg,hinderImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    //this.moneyImg=moneyImg;
    this.hinderArr=[];
    //this.moneyArr=[];
    this.person=new person(canvas,cobj,runImg,jumpImg);
    this.speed=15;
    this.score=0;
    this.life=4;
    this.guanka=1;
    //this.moneynum=0
}
game.prototype={
    play:function(){
        var that=this;
        that.key();
        var num=0;
        var back=0;/*背景往相反的方向动*/
        var num2=0;
        var step=5000+parseInt(5*Math.random())*1000;
        var t1=setInterval(function(){
            num++;
            back-=that.speed;
            that.cobj.clearRect(0,0,that.person.canvasW,that.person.canvasH);
            if(that.person.status=="runImg"){
                that.person.state=num%10;
            }else if(that.person.status=="jumpImg"){
                that.person.state=0;
            }
            that.person.draw();
            that.person.update();
            that.canvas.style.backgroundPositionX=back+"px";
            if(num2%step==0){
                num2=0;
                step=5000+parseInt(5*Math.random())*1000;
                var hinderObj=new hinder(that.canvas,that.cobj,that.hinderImg);
                hinderObj.state=Math.floor(that.hinderImg.length*Math.random());
                that.hinderArr.push(hinderObj);
                //console.log(that.fruitArr.length)
                //console.log(that.hinderArr.length)
                if(that.hinderArr.length>5){
                    that.hinderArr.shift();
                    }
                }




           /* if(num2%step==0){
                num2=0;
                step=3000+parseInt(5*Math.random())*1000;
                var moneyObj=new moneys(that.canvas,that.cobj,that.moneyImg);
                that.moneyArr.push(moneyObj);
                if(that.moneyArr.length>5){
                    that.moneyArr.shift();
                }
            }*/

                num2+=50;
                 /*障碍物*/
            for(var i=0;i<that.hinderArr.length;i++){
                that.hinderArr[i].x-=that.speed;
                that.hinderArr[i].draw();
                if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                    if(!that.hinderArr[i].flag1) {
                        that.life--;
                        $(".menu ul li .lifenum").html(that.life);
                        stone(that.cobj, that.person.x + that.person.width / 2, that.person.y + that.person.height / 2,"red")
                    }
                    that.hinderArr[i].flag1=true;
                    if(that.life<=0){
                        $(".tank2").css({display:"block"});
                        clearInterval(t1);
                        //alert("game over");
                        //location.reload();
                    }

                }else if(that.hinderArr[i].x+that.hinderArr[i].width<that.person.x) {
                    if (!that.hinderArr[i].flag && !that.hinderArr[i].flag1) {
                       // document.title = ++that.score;
                        ++that.score;
                        $(".menu ul li .scorenum").html(that.score);
                        if(that.score>=that.guanka*5){
                            that.guanka++;
                            $(".menu ul li .guanka").html(that.guanka);
                        }
                        if (that.score % 3 == 0) {
                            that.speed += 1;
                        }
                    }
                    that.hinderArr[i].flag = true;
                }
                }

            /*金币*/
           /* for(var j=0;j<that.moneyArr.length;j++){
                that.moneyArr[j].x-=that.speed;
                that.moneyArr[j].draw();
                if(hitPix(that.canvas,that.cobj,that.person,that.moneyArr[j])){
                    if(!that.moneyArr[j].flag0) {
                        that.moneynum++;
                        $(".menu ul li .money").html(that.moneynum);
                        $(".menu ul li .jinbiss").css({display:"none"});
                    }
                    that.moneyArr[j].flag0=true;

                }
            }*/
        },60);

    },
    key:function(){/*起跳*/
        var that=this;
        var flag=true;
        document.onkeydown=function(e){
            if(!flag){
                return;
            }
            flag=false;
            if(e.keyCode==32){/*空格*/
                that.person.speedy=0;
                that.person.zhongli=0;
                that.person.status = "jumpImg";
                var angle=0;/*刚刚跳起的初始角度*/
                var speeda=10;/*角度变化的速度*/
                var r=100;/*跳起时的弧度看成一个圆*/
                var inity=that.person.y;
                var t=setInterval(function(){
                    angle+=speeda;
                    //console.log(angle)
                    if(angle>180){
                        //alert(1)
                        clearInterval(t);
                        that.person.y=inity;
                        that.person.status="runImg";
                        flag=true;
                    }else{
                        var len=Math.sin(angle*Math.PI/180)*r;
                        that.person.y=inity-len;
                    }

                },60)
            }
        }
    }
};