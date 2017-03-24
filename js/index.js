






/*
var canvasW = 1920,canvasH = 300,lineW = 2,lineGap = 4,dataStart = 300;
var t;

window.onload = function () {
    t = new Wave();//.init();
    t.init();
    addEvent();
}
window.onresize = function (){

}
window.onscroll = function(){

}


function addEvent(){
    document.onclick = function(){
        t.mode =! t.mode;
        if(t.mode){
            t.color = "#000";
        }else{
            t.color = "#fff";
        }
        if(t.isPlaying == true){
            //t.isPlaying = false;
        }else{
            //t.startWave();
        }
        
    }
} 
 

var Wave = function() {
    this.aryIdx = 0;
    this.mode = true;
    this.color = "#fff";
    this.isPlaying = false;
    this.canvasStage;
};

Wave.prototype = {
    init: function(){
        var that = this;
        var waveCon = document.getElementById("waveCv");
        that.canvasStage = waveCon; 
        waveCon.height = canvasH;
        that.setWaveContainer();
        //waveCon.style.backgroundColor = "#676a79"
        dot = waveCon.getContext('2d');
        that.setEvent();
        that.startWave();
    },
    setEvent :function(){
        var that = this;
        window.onresize= function(){
            that.setWaveContainer();
        }
        window.onscroll = function(){
           
        }
    },
    setWaveContainer :function(){
        var that = this;
        var sw = window.innerWidth;
        that.canvasStage.width = canvasW = sw;        
    },
    startWave :function(){
        if(this.isPlaying == false){
            this.isPlaying = true;
            this.aryIdx = 0;
            this.moveLine();
        }
    },
    moveLine :function(){
        var that = this;
        var len = canvasW/lineGap;
        var repeatPoint = 0;
        dot.clearRect(0, 0, canvasW, canvasH);
        for(i = len ; i >= 0 ; i--){
            dot.fillStyle = that.color;
            if(that.mode == true){
                //dot.fillRect(i * lineGap, Math.random()*25, lineW, lineW);
                //console.log( (-dataAry[this.aryIdx][i])+canvasH);
                //console.log( (-dataAry[this.aryIdx][i]/4)+canvasH);
                dot.fillRect(i * lineGap, (-dataAry[this.aryIdx][dataStart+repeatPoint]/500*100)+canvasH, lineW, lineW);
                //dot.fillRect(i * lineGap, 0, lineW, lineW);
            }else{
                //dot.fillRect(i * lineGap, 30, lineW, -Math.random()*30);
                dot.fillRect(i * lineGap, canvasH, lineW, -dataAry[this.aryIdx][dataStart+repeatPoint]/500*100);
            }
            repeatPoint++
            if(repeatPoint > 120){
                repeatPoint = 0;
            }
        }
        setTimeout(function(){that.readEnd()}, 1000/120);
    },
    readEnd :function(){
        var that = this;
        that.aryIdx++;  
        if(that.aryIdx > dataAry.length-1){
            that.aryIdx = 0;  
        }
        if(that.isPlaying == true){
            that.moveLine(); 
        }else{
            that.isPlaying == false;
            dot.clearRect(0, 0, canvasW, canvasH);
        }
    },
    moveEnd :function(){
        this.status = 0;
    }
}

*/