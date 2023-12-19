// import gsap from "gsap";    
gsap.registerPlugin(ScrollTrigger);
function revealToSpan(){
    document.querySelectorAll(".reveal")
    .forEach((elem) => {
        //create two spans
        var parent = document.createElement("span");
        var child = document.createElement("span");
        
        //parent and child both gets theit respective classes
        
        parent.classList.add("parent");
        child.classList.add("child");   
        
        //span parents gets child and child gets elem detials
        child.innerHTML = elem.innerHTML;
        parent.appendChild(child); 
        
        //elem replaces its value with the parent span
        elem.innerHTML = "";    
        elem.appendChild(parent);  
    });
}

function loaderAnimation(){
var tl = gsap.timeline();


tl. 
from(".child span", {
    x: 100,
    delay: 1,
    stagger: 0.2,
    duration: 1.2,
    ease: Power3.easeInOut,
})
.to(".parent .child", {
    y: "-100%",
    duration: 0.5,
    ease: Power3.easeInOut,
})
    .to("#loader",{
    height: 0,
    duration:1,
    ease: Circ.easeInOut,
    })
    .to("#green-screen",{
    height: "100vh",
    duration:0.5,
    delay: -1,
    ease: Circ.easeInOut,
    })
    .to("#green-screen",{
        height: "0vh",
        top: 0,
        duration:0.5,
        delay: -0.6,
        ease: Circ.easeInOut,
    })
}

function animateSVG(){
    document.querySelectorAll("#Visual>g").forEach(function(e) {
        let character =  e.childNodes[1].childNodes[0]; 
        // Access the correct child node
      
        if (character instanceof SVGGeometryElement) {
            // The character object is an SVGGeometryElement, so we can call the getTotalLength() method.
            character.style.strokeDasharray = character.getTotalLength()+'px';
            character.style.strokeDashoffset = character.getTotalLength() + 'px';
        }
        
    })
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline ",{
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.2,
        ease: Expo.easeInOut,
        delay: 2.7,
    })
   
}
function locoIntialize(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true,
        // direction: 'vertical',
        // speed:-1,
        delay: 1,
    });
}

// function cardHoverEffect(){
//     document.querySelectorAll(".cnt").forEach(function(cnt){
//         var showingImage;
//         cnt.addEventListener("mousemove", function(dets){
//             // console.log(dets.target.dataset.index);
//             document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
//             showingImage = dets.target;

           
//                 document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;

//                 // console.log(dets.clientX, dets.clientY);
                
//             showingImage.style.filter = "grayscale(1)";
//             document.querySelector("#work").style.backgroundColor = "#"+dets.target.dataset.color;
//         })
//         cnt.addEventListener("mouseleave", function(dets){
//             document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity = 0;
//             showingImage.style.filter = "grayscale(0)";
//             document.querySelector("#work").style.backgroundColor = "#fff";
//         })
//     })
// }


revealToSpan();
// loaderAnimation();
animateSVG();
locoIntialize();
cardHoverEffect();