LocomotiveScroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Animate first page
function firstpage(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y:-10,
        opacity:0,
        duration:2,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y:0,
            ease:Expo.easeInOut,
            duration:2,
            delay:-1,
            stagger:.2
        })
        .from("#homefooter",{
            y:-10,
            opacity:0,
            duration:1.5,
            delay:-1,
            ease: Expo.easeInOut
        })
}
// mouseskew
var timeout;
function mouseskew(){
    // define default xvalue and yvalue scale value
    var xvalue = 1;
    var yvalue = 1;
    // previous value of mouse will be stored in the below variable
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(details){

        clearTimeout(timeout);

        var xdiff = details.clientX - xprev;
        var ydiff = details.clientY - yprev;
        // present value of mouse will get stored in the previous values 
        xprev = details.clientX;
        yprev = details.clientY;

         var xscale = gsap.utils.clamp(0.8,1.2, xdiff);
         var yscale = gsap.utils.clamp(0.8,1.2, ydiff);

        circlefollow(xscale,yscale)
        
        timeout = setTimeout(function(){
            document.querySelector("#circle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`;
        },100)
    })
}
//  Circle moving with mouse 
function circlefollow(xscale,yscale){
    window.addEventListener("mousemove",function(details){
        var a = document.querySelector("#circle")
        a.style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale},${yscale})`;
    })
    
}

document.querySelectorAll(".element").forEach(function(element){
        var diffrot = 0;
        var rot = 0;

        element.addEventListener("mouseleave",function(details){
            gsap.to(element.querySelector("img"),{
                opacity: 0,
                ease: Power3,
                
            })
        })

    element.addEventListener("mousemove",function(details){
        
        diffrot = details.clientX - rot;
        rot = details.clientX;
        gsap.utils.clamp(-20,20,diffrot)
        // location of the mouse we got
        // console.log(details.clientX,details.clientY)

        // top sae element kitna duri par hai ushke liye hum use karte hai
        // elementKaNam.getBoundingClientrect()
        var diff = details.clientY - element.getBoundingClientRect().top;
        gsap.to(element.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot)
        })
    })
})

circlefollow()
firstpage()
mouseskew()