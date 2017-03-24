window.onload = function () {
    wave.waveInit();
}


var wave  = wave || (function( $ ){
    var waveStage;
    var aryIdx = 0;
    var easeCount = 0;
    var wheelIdx = 0;
    var thisTimeOut;
    var thisInterval;
    var wDelta;
    var sectionIndex;
    var waveSet = 
    { 
        canvasW:0,
        canvasH:200,
        waveW:2,
        waveGap:4,
        dataStart:300,
        dataMaxRange:250,
        minRange:0,
        maxRange:150,
        color:"#fff",
        isPlaying:false,
        waveMode:"line"
    },
    waveInit = function(){
        setStage();
        addEvent();
    },
    setStage = function(){
        var waveCon = document.getElementById("waveCv");
        waveStage = waveCon;

        setCanvasStyle(waveSet.canvasH);
        dot = waveStage.getContext('2d');   
        dot1 = waveStage.getContext('2d');   
        dot3 = waveStage.getContext('2d');   
        startWave();
        detectSection();
    },
    setCanvasStyle = function(h){
        if(waveStage.height != h){
            waveStage.height = waveSet.canvasH = h;
            waveStage.width = waveSet.canvasW = window.innerWidth;
            waveStage.style.backgroundColor = "#3b3b3b";
        }
    },
    addEvent = function(){
        $(window).on('resize',function(){
            waveStage.width = waveSet.canvasW = window.innerWidth;
        });
        $(window).on('scroll',function(){
            detectSection();
        });        
        $(window).on('mousewheel DOMMouseScroll',function(e){
            wDelta = e.wheelDelta < 0 ? 'down' : 'up';
            wheelIdx++
            clearTimeout(thisTimeOut);
            thisTimeOut = setTimeout(function(){easeCount = wheelIdx;wheelIdx = 0;},100);
        });
    },
    removeEvent = function(){
        //$(window).off('resize');        
        //$(window).off('scroll');        
        //$(window).off('mousewheel DOMMouseScroll');        
    },
    detectSection = function(){
        var windowScrollTop = $(window).scrollTop();
        var windowH = $(window).innerHeight();
        if(windowScrollTop >= 0 && windowScrollTop < parseInt($("#header").css("height"),10)){
            sectionIndex = 0;
            //console.log(sectionIndex);
        }        
        $("#contentWrap > section").each(function(idx,obj){
            var sectionTop = $(this).offset().top;
            var sectionHeight = parseInt($(this).css("height"),10);
            var sectionArea = sectionTop + sectionHeight;
            
            if(windowScrollTop > sectionTop && windowScrollTop < sectionArea){
                sectionIndex = $(this).index();
                switch(sectionIndex){
                    case 0:
                        //console.log(sectionArea - windowScrollTop);
                        //console.log("windowScrollTop = "+windowScrollTop+" , "+"sectionTop = "+sectionTop+" , "+"sectionArea = "+sectionArea);
                        waveSet.color = "#fff";
                        waveSet.waveMode = "line";  
                        waveSet.maxRange = 100;
                        //setCanvasStyle(waveSet.maxRange);
                        $("#waveContainer").removeAttr("style");
                        $("#waveContainer").stop().animate();
                        $("#waveContainer").css("top",sectionArea - windowScrollTop - waveSet.canvasH);
                    break;
                    case 1:
                        waveSet.color = "#000";
                        waveSet.waveMode = "line1";
                        waveSet.maxRange = 100;
                       // setCanvasStyle(waveSet.maxRange*2);
                        //$("#waveContainer").css("opacity",0.5);
                        //console.log("windowScrollTop = "+windowScrollTop+" , "+"sectionTop = "+sectionTop+" , "+"sectionArea = "+sectionArea);
                        $("#waveContainer").stop().animate({"top":(windowScrollTop - sectionTop)},500);
        //                        $("#waveContainer").stop().animate({"top":windowH/2},500);
                    break;
                    case 2:
                        waveSet.color = "#000";
                        waveSet.waveMode = "dot";
                        waveSet.maxRange = 250;
                        $("#waveContainer").stop();
                        $("#waveContainer").css("opacity",0.8);
                        $("#waveContainer").css({"position":"absolute","top":(sectionTop+sectionHeight/2)-waveSet.maxRange});
                        //$("#waveContainer").stop().animate({"top":windowH/2},500);
                    break;
                    case 3:
                        waveSet.color = "#000";
                        waveSet.waveMode = "dot2";
                        waveSet.maxRange = 100;
                        $("#waveContainer").css({"position":"absolute","top":(sectionTop+sectionHeight/2)-waveSet.maxRange});
                    break;    
                    case 4:
                        waveSet.color = "#000";
                        waveSet.waveMode = "dot3";
                        waveSet.maxRange = 80;
                        console.log($(this).index());
                        $("#waveContainer").css({"position":"absolute","top":(sectionTop+sectionHeight/2)-waveSet.maxRange});
                    break; 
                    case 5:
                        waveSet.color = "#000";
                        waveSet.waveMode = "line2";
                        waveSet.maxRange = 50;
                        //setCanvasStyle(waveSet.maxRange*2);
                        $("#waveContainer").css({"position":"absolute","top":(sectionTop+sectionHeight/2)-waveSet.maxRange});
                        console.log($(this).index());
                    break;  
                    default :
                        //console.log("sdf");
                        //$("#waveContainer").css("top",sectionArea - windowScrollTop - waveSet.canvasH);
                }
            }
            setCanvasStyle(waveSet.maxRange*2);
            
        });
        /*
        chk(sectionIndex);
        function chk(idx){
            var target = $("#contentWrap > section:eq("+idx+")");
            var sectionTop = target.offset().top;
            var sectionHeight = parseInt($(this).css("height"),10);
            var sectionArea = sectionTop + sectionHeight;            
            console.log(target);
            switch(idx){
                    
            }
        }
        */
             
    },
    startWave = function(){
        if(waveSet.isPlaying == false){
            waveSet.isPlaying = true;
            aryIdx = 0;
            moveLine();
        }        
    },
    moveLine = function(){
        var len = waveSet.canvasW/waveSet.waveGap;
        var repeatPoint = 0;
        var easeDist;
        var totalRange = waveSet.maxRange - waveSet.minRange;
        
        if(easeCount.toFixed(1) > 0){
            easeCount -= (easeCount - 0)/20;
        }  
        dot.clearRect(0, 0, waveSet.canvasW, waveSet.canvasH);
        dot1.clearRect(0, 0, waveSet.canvasW, waveSet.canvasH);
        //console.log(waveSet.canvasH);
        for(i = 0 ; i < len ; i++){
            dot.fillStyle = waveSet.color;
            var wPoint = (dataAry[aryIdx][waveSet.dataStart+repeatPoint]/waveSet.dataMaxRange*100)*totalRange/100;
            if(wDelta == "down"){
                //easeDist = easeCount*15;
                easeDist = easeCount*Math.random()*15;
            }else{
                //easeDist = easeCount*15;
                easeDist = easeCount*Math.random()*15;
            }
           
            if(waveSet.waveMode == "dot"){
                dot.fillRect(i * waveSet.waveGap, (-wPoint+(waveSet.canvasH-waveSet.maxRange/2))-easeDist, waveSet.waveW, waveSet.waveW);
                //dot.fillRect(i * waveSet.waveGap, (-wPoint+waveSet.canvasH)-easeDist, waveSet.waveW, waveSet.waveW);
            }else if(waveSet.waveMode == "line"){
                dot.fillRect(i * waveSet.waveGap, waveSet.canvasH, waveSet.waveW, (-wPoint)-easeDist);
            }else if(waveSet.waveMode == "line1"){
                dot.fillRect(i * waveSet.waveGap, waveSet.canvasH/2, waveSet.waveW, (-wPoint)-easeDist);
              //  dot1.fillStyle = "#4b4b4b";
                dot1.fillRect(i * waveSet.waveGap, waveSet.canvasH/2, waveSet.waveW, (wPoint)+easeDist);
            }else if(waveSet.waveMode == "line2"){
                dot.fillRect(i * waveSet.waveGap, waveSet.canvasH/2, waveSet.waveW, (-wPoint)-easeDist);
              //  dot1.fillStyle = "#4b4b4b";
                wPoint = (dataAry[aryIdx][(waveSet.dataStart+80)+repeatPoint]/waveSet.dataMaxRange*100)*totalRange/100;
                dot1.fillRect(i * waveSet.waveGap, waveSet.canvasH/2, waveSet.waveW, (wPoint)+easeDist);
            }else if(waveSet.waveMode == "dot2"){
                dot.fillRect(i * waveSet.waveGap, (-wPoint+(waveSet.canvasH-waveSet.maxRange/2))-easeDist, waveSet.waveW, waveSet.waveW);
                dot1.fillRect(i * waveSet.waveGap, (-wPoint+(waveSet.canvasH-waveSet.maxRange/2-15))+easeDist, waveSet.waveW, waveSet.waveW);
                dot3.fillRect(i * waveSet.waveGap, (-wPoint+(waveSet.canvasH-waveSet.maxRange/2-60))+easeDist, waveSet.waveW, waveSet.waveW);
            }else if(waveSet.waveMode == "dot3"){
                //dot1.fillStyle = "#fff";
                dot.fillRect(i * waveSet.waveGap, (-wPoint+(waveSet.canvasH-waveSet.maxRange/2))-easeDist, waveSet.waveW, waveSet.waveW);
                wPoint = (dataAry[aryIdx][(waveSet.dataStart+80)+repeatPoint]/waveSet.dataMaxRange*100)*totalRange/100;
                dot.fillRect(i * waveSet.waveGap, (-wPoint+(waveSet.canvasH-waveSet.maxRange/2))-easeDist, waveSet.waveW, waveSet.waveW);
            }
            repeatPoint++
            if(repeatPoint > 80){
                repeatPoint = 0;
            }
        }
        setTimeout(function(){readEnd()}, 1000/120);
    },  
    readEnd = function(){
        aryIdx++;  
        if(aryIdx > dataAry.length-1){
            aryIdx = 0;  
        }
        if(waveSet.isPlaying == true){
            moveLine(); 
        }else{
            waveSet.isPlaying == false;
            dot.clearRect(0, 0, waveSet.canvasW, waveSet.canvasH);
        }
    }
    
    return{waveSet: waveSet,waveInit: waveInit};
})(jQuery);



wave.waveSet.canvasW = 1024;
console.log(wave.waveSet.canvasW);
