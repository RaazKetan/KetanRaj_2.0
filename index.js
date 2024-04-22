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


// Function to check if the device is a mobile device
// function isMobileDevice() {
//   return window.innerWidth <= 768; // Adjust the width as per your mobile device breakpoints
// }

// JavaScript for Testimonials Slider
document.addEventListener("DOMContentLoaded", (event) => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  function setActiveSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
    });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => setActiveSlide(index));
  });

  // Initialize the first slide and dot as active
  setActiveSlide(0);
});

let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides[currentSlideIndex].classList.remove("active");
  slides[index].classList.add("active");
  dots[currentSlideIndex].classList.remove("active");
  dots[index].classList.add("active");
  currentSlideIndex = index;
}

function slideLeft() {
  let newIndex = currentSlideIndex - 1;
  if (newIndex < 0) {
    newIndex = slides.length - 1;
  }
  showSlide(newIndex);
}

function slideRight() {
  let newIndex = currentSlideIndex + 1;
  if (newIndex >= slides.length) {
    newIndex = 0;
  }
  showSlide(newIndex);
}


function isMobileDevice() {
  return window.innerWidth <= 768; // Adjust the width as per your mobile device breakpoints
}

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const titles = document.querySelectorAll(".title-gsap");

  titles.forEach((title, index) => {
    gsap.fromTo(
      title,
      {
        opacity: 0,
        scale: 1.1,
        y: "8vh",
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      }
    );
  });
});


document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".grid");

  var msnry = new Masonry(grid, {
    itemSelector: ".content, .content1",
    columnWidth: ".content",
    percentPosition: true,
    gutter: 16,
  });

  // Ensure all images are loaded before applying the layout
  imagesLoaded(grid).on("always", function () {
    msnry.layout();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hoverButton = document.getElementById("hoverButton");
  const futureVideo = document.getElementById("futureVideo");

  hoverButton.addEventListener("mouseover", function () {
    gsap.to("#futureVideo", {
      opacity: 1,
      duration: 1.5,
      ease: Power4,
    });
    futureVideo.play();
  });

  hoverButton.addEventListener("mouseleave", function () {
    gsap.to("#futureVideo", {
      opacity: 0,
      duration: 1.5,
      ease: Power4,
    });
    futureVideo.pause();
    futureVideo.currentTime = 0; // Reset video to the beginning
  });
});

// images aniamtion

document.addEventListener("DOMContentLoaded", function () {
  // Function to initialize hover effect
  function initHoverEffect(sectionClass) {
    var sections = document.querySelectorAll(sectionClass);

    sections.forEach(function (section) {
      var images = section.querySelectorAll(
        ".image-wrapper img, .image-wrapper1 img"
      );
      var currentImage = 0;

      function nextImage() {
        images[currentImage].style.opacity = 1; // Hide current image
        currentImage = (currentImage + 1) % images.length; // Move to the next image
        images[currentImage].style.opacity = 1; // Show next image
      }

      section.addEventListener("mouseenter", function () {
        // Start the interval when hovering
        imageInterval = setInterval(nextImage, 1000); // Change image every 2 seconds
      });

      section.addEventListener("mouseleave", function () {
        // Clear the interval when not hovering
        clearInterval(imageInterval);
        // Hide all images except the first one
        images.forEach((img, index) => {
          img.style.opacity = index === 0 ? 1 : 0;
        });
        currentImage = 0; // Reset the counter to the first image
      });
    });
  }

  // Initialize hover effect for both sections
  initHoverEffect(".content1");
  initHoverEffect(".content1.featured");
});

// Function to initialize GSAP animations only on mobile
function initAnimationsOnMobile() {
  // Check if the screen width is less than or equal to 768px (considered as mobile view)
  if (window.innerWidth <= 768) {
    // Get all content containers
    const contentContainers = document.querySelectorAll(".content, .content1");

    // Loop through each container and define GSAP animations
    contentContainers.forEach((container, index) => {
      // Define the animation for each container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 95%", // Change the percentage value to adjust the start position
          end: "bottom 95%", // Change the percentage value to adjust the end position
          markers: false, // Optional: Shows markers for debugging
          toggleActions: "restart none none reverse", // Restart animation when reaching start, pause when leaving, no action when reaching end, reverse when scrolling up
        },
      });

      // Add animation properties to the timeline
      tl.from(container, { y: 100, duration: 1 }); // Example animation, change properties as needed
    });
  }
}
function initMarqueeAnimation() {
  const animationConfig = {
    duration: 5,
    x: "-125%",
    repeat: -1,
    ease: "linear",
  };

  const marqueeContainer = document.querySelector(".js-btn-loop");
  gsap.to(marqueeContainer, {
    ...animationConfig,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Other code ...

  // Call the function to initialize marquee animation
  initMarqueeAnimation();
});

revealToSpan();
loaderAnimation();
animateSVG();
locoIntialize();
cardHoverEffect();
initAnimationsOnMobile();

//
//
//
//
