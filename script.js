// html setup
 var itemsHTMLCollection = document.getElementsByClassName('parallax-item')
 var itemsArray = Array.from(itemsHTMLCollection)



// input setup
var input = {
    mouseX :{
        start:0,
        end:window.innerWidth ,
        current:0,
    },
    mouseY:{
        start: 0,
        end:window.innerHeight ,
        current:0,
    }
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range= input.mouseY.end - input.mouseY.start


//output setup
var output = {
    x:{
        start: -150,
        end: 150,
        current:0,
    },
    y:{
        start: -150,
        end: 150,
        current:0,
    },
    zIndex: { 
      range:1000
    },
    scale:{
        start: 1,
        end: 0.2,

    },
    blur:{
        statingDepth: .1,
        range: 40,
    }
}
output.scale.range = output.scale.end - output.scale.start
output.x.range = output.x.end -output.x.start;
output.y.range = output.y.end - output.y.start;

var mouse = {
    x:window.innerWidth * .5,
    y:window.innerHeight * .5
}

var updateInput = function (){
 // mouse x input
 input.mouseX.current = mouse.x;
 input.mouseX.fraction = (input.mouseX.current - input.mouseX.start)/input.mouseX.range
 //mouse y input
 input.mouseY.current = mouse.y
 input.mouseY.fraction=(input.mouseY.current - input.mouseY.start)/input.mouseY.range
 
}

var updateOutputs = function(){
// output x and y
output.x.current = output.x.end - (input.mouseX.fraction * output.x.range)
output.y.current = output.y.end -(input.mouseY.fraction * output.y.range)

}

var updateEachParallaxItem = function(){

// apply output to html
itemsArray.forEach((item, i)=>{ 
    var depth = parseFloat(item.dataset.depth, 10);
    var itemOutput = {
        x: output.x.current - (output.x.current * depth),
        y: output.y.current - (output.y.current * depth),
        zIndex:output.zIndex.range - (output.zIndex.range * depth),
        scale: output.scale.start + (output.scale.range * depth),
        blur: (depth - output.blur.statingDepth) * output.blur.range
    }

    console.log(i, 'depth', depth)
    item.style.filter = 'blur('+itemOutput.blur+'px)'
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = 'scale('+itemOutput.scale+') translate('+itemOutput.x+'px, '+itemOutput.y+'px)'
    
})
}

var handelMouseMove = function(event){
    mouse.x = event.clientX;
    mouse.y= event.clientY; 

    updateInput();
    updateOutputs();
    updateEachParallaxItem();
}




var handelResize = function(event){
    input.mouseX.end = window.innerWidth ;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;

    input.mouseY.end = window.innerHeight;
    input.mouseY.range = input.mouseY.end -input.mouseY.start
}


window.addEventListener('mousemove', handelMouseMove)
window.addEventListener('resize', handelResize)

updateInput();
updateOutputs();
updateEachParallaxItem();