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
}

output.x.range = output.x.end -output.x.start;
output.y.range = output.y.end - output.y.start;


var handelMouseMove = function(event){
    // mouse x input
    input.mouseX.current = event.clientX;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start)/input.mouseX.range

    //mouse y input
    input.mouseY.current = event.clientY
    input.mouseY.fraction=(input.mouseY.current - input.mouseY.start)/input.mouseY.range
    
    // output x
    output.x.current = output.x.end - (input.mouseX.fraction * output.x.range)
    
    // output y
    output.y.current = output.y.end -(input.mouseY.fraction * output.y.range)
   
    // apply output to html
    itemsArray.forEach((item, i)=>{ 
        var depth = parseFloat(item.dataset.depth, 10);
        var itemOutput = {
            x: output.x.current - (output.x.current * depth),
            y: output.y.current - (output.y.current * depth),
            zIndex:10000 - (10000 * depth)
        }

        console.log(i, 'depth', depth)
        item.style.zIndex = itemOutput.zIndex;
        item.style.transform = 'translate('+itemOutput.x+'px, '+itemOutput.y+'px)'
    })


    console.log('output.x.current', output.x.current)
    //console.log('fraction Y', input.mouseY.fraction)
}




var handelResize = function(event){
    input.mouseX.end = window.innerWidth ;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;

    input.mouseY.end = window.innerHeight;
    input.mouseY.range = input.mouseY.end -input.mouseY.start
}


window.addEventListener('mousemove', handelMouseMove)
window.addEventListener('resize', handelResize)

