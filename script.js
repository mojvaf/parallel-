var input = {
    mouseX :{
        start:0,
        end:window.innerWidth ,
        current:0,
    },
    mouseY:{
        start: 100,
        end:window.innerHeight -100,
        current:0,
    }
};

// range
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range= input.mouseY.end - input.mouseY.start

var handelMouseMove = function(event){
    input.mouseX.current = event.clientX;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start)/input.mouseX.range

    input.mouseY.current = event.clientY
    input.mouseY.fraction=(input.mouseY.current - input.mouseY.start)/input.mouseY.range
    
    console.log('fraction X', input.mouseX.fraction)
    console.log('fraction Y', input.mouseY.fraction)
}




var handelResize = function(event){
    input.mouseX.end = window.innerWidth ;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;

    input.mouseY.end = window.innerHeight;
    input.mouseY.range = input.mouseY.end -input.mouseY.start
}


window.addEventListener('mousemove', handelMouseMove)
window.addEventListener('resize', handelResize)

