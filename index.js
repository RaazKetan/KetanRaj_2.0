// import gsap from "gsap";    
var tl = gsap.timeline();


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
revealToSpan();



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
    