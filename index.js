// import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);
function revealToSpan() {
  document.querySelectorAll(".reveal").forEach((elem) => {
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

function loaderAnimation() {
  var tl = gsap.timeline();

  tl.from(".child span", {
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
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#green-screen", {
      height: "100vh",
      duration: 0.5,
      delay: -1,
      ease: Circ.easeInOut,
    })
    .to("#green-screen", {
      height: "0vh",
      top: 0,
      duration: 0.5,
      delay: -0.6,
      ease: Circ.easeInOut,
    });
}

function animateSVG() {
  document.querySelectorAll("#Visual>g").forEach(function (e) {
    let character = e.childNodes[1].childNodes[0];
    // Access the correct child node

    if (character instanceof SVGGeometryElement) {
      // The character object is an SVGGeometryElement, so we can call the getTotalLength() method.
      character.style.strokeDasharray = character.getTotalLength() + "px";
      character.style.strokeDashoffset = character.getTotalLength() + "px";
    }
  });
  gsap.to("#Visual>g>g>path, #Visual>g>g>polyline ", {
    strokeDashoffset: 0,
    duration: 2,
    stagger: 0.2,
    ease: Expo.easeInOut,
    delay: 2.7,
  });
}
function locoIntialize() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    // direction: 'vertical',
    // speed:-1,
    delay: 1,
  });
}

function cardHoverEffect() {
  document.querySelectorAll(".cnt").forEach(function (cnt) {
    var showingImage;
    cnt.addEventListener("mousemove", function (dets) {
      // console.log(dets.target.dataset.index);
      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.opacity = 1;
      showingImage = dets.target;

      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;

      // console.log(dets.clientX, dets.clientY);

      showingImage.style.filter = "grayscale(1)";
      document.querySelector("#work").style.backgroundColor =
        "#" + dets.target.dataset.color;
    });
    cnt.addEventListener("mouseleave", function (dets) {
      document.querySelector("#cursor").children[
        showingImage.dataset.index
      ].style.opacity = 0;
      showingImage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#fff";
    });
  });
}

revealToSpan();
loaderAnimation();
animateSVG();
locoIntialize();
cardHoverEffect();

//
//
//
//
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
});

prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]);
});

document.addEventListener('DOMContentLoaded', function() {
  // Define a mapping of button IDs to external URLs
  const buttonIdToUrlMap = {
     'natours': 'https://natours-gtew21gm6-raazketan.vercel.app/',
     'reactai': 'https://main.dem3zfcd3o033.amplifyapp.com/',
     'brewnation': 'https://brewnation-4kv86keyu-raazketan.vercel.app/',
     'codee': 'https://main.d102a8a6ets1k8.amplifyapp.com/',
     'luxelens': 'https://main.d340y608n23ovs.amplifyapp.com/'
     // Add more mappings as needed
  };
 
  // Select all buttons within the document
  const buttons = document.querySelectorAll('button');
 
  // Attach a click event listener to each button
  buttons.forEach(function(button) {
     button.addEventListener('click', function() {
       // Get the URL associated with the button's ID
       const url = buttonIdToUrlMap[button.id];
 
       // Check if a URL is defined for the button's ID
       if (url) {
         // Open the external link in a new tab or window
         window.open(url);
       } else {
         console.error(`No URL defined for button with ID "${button.id}".`);
       }
     });
  });
 });
 