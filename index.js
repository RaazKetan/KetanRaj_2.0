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
    child.textContent = elem.textContent;
    parent.appendChild(child); 

    //elem replaces its value with the parent span
    elem.innerHTML = "";    
    elem.appendChild(parent);  
});
}
revealToSpan();

gsap.to(".parent .child", {
    y: "-100%",
    duration: 1,
    delay: 0.4,
    ease: Expo.easeInOut,
})

tl
    .to("#loader",{
    height: 0,
    duration:2,
    ease: Expo.easeInOut,
    })
    .to("#green-screen",{
    height: "100vh",
    duration:2,
    delay: -2,
    ease: Expo.easeInOut,
    })
    .to("#white-screen",{
    height: "100vh",
    duration:2,
    delay: -1.8,
    ease: Expo.easeInOut,
    })