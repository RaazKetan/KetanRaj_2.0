
document.addEventListener('DOMContentLoaded', function() {
var initialized = false;
var engine, worldBodies;

function initializeMatterJs() {
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

  engine = Engine.create();
  var render = Render.create({
      element: document.getElementById('skillsbox'),
      engine: engine,
      options: {
          wireframes: false,
          height: 500
      }
  });

  // Image URLs    5figma   4illustrator 3photoshop  2sktech  1 Ae 
  var imageUrls = [
      'https://i.postimg.cc/KvRYXbSx/Group-1.png',
      'https://i.postimg.cc/BQZH7HQg/02.png',
      'https://i.postimg.cc/vHP9JT4d/03.png',
      'https://i.postimg.cc/XYpF4W5B/04.png',
      'https://i.postimg.cc/ryY8NHdb/5.png'
  ];

  var loadedImages = [];
  var loadCount = 0;

  function createImageBody(image, x, y, index) {
      var bodyOptions = {
          render: {
              sprite: {
                  texture: image.src,
                  xScale: 1,
                  yScale: 1
              }
          }
      };

      var isCircle = index === 0 || index === 1;
      var body;
      if (isCircle) {
          var radius = Math.min(image.width, image.height) / 2;
          body = Bodies.circle(x, y, radius, bodyOptions);
      } else {
          body = Bodies.rectangle(x, y, image.width, image.height, bodyOptions);
      }

      Matter.Body.setAngle(body, Math.random() * Math.PI);

      return body;
  }

  imageUrls.forEach(function(url, index) {
      var img = new Image();
      img.onload = function() {
          loadedImages[index] = img;
          loadCount++;
          if (loadCount === imageUrls.length) {
              createWorld();
          }
      };
      img.src = url;
  });

  function createWorld() {
      worldBodies = loadedImages.map((img, index) => {
          var x = Math.max(img.width / 2, Math.min(360 - img.width / 2, 180 + (Math.random() - 0.5) * 200));
          var y = 50 + index * 80;
          return createImageBody(img, x, y, index);
      });

      var wallOptions = { isStatic: true };
      var ground = Bodies.rectangle(180, 510, 400, 40, wallOptions);
      var leftWall = Bodies.rectangle(-10, 250, 40, 600, wallOptions);
      var rightWall = Bodies.rectangle(370, 250, 40, 600, wallOptions);
      var ceiling = Bodies.rectangle(180, -10, 400, 40, wallOptions);

      World.add(engine.world, worldBodies.concat([ground, leftWall, rightWall, ceiling]));

      var mouse = Mouse.create(render.canvas),
          mouseConstraint = MouseConstraint.create(engine, {
              mouse: mouse,
              constraint: {
                  stiffness: 0.2,
                  render: {
                      visible: false
                  }
              }
          });

      World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      Engine.run(engine);
      Render.run(render);
  }
}

// Intersection Observer to detect when the skillsbox is visible
var observer = new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting && !initialized) {
      initializeMatterJs();
      initialized = true;
      observer.unobserve(document.getElementById('skillsbox'));
  }
}, { threshold: 0.1 });

observer.observe(document.getElementById('skillsbox'));

// Scroll event listener
window.addEventListener('scroll', function() {
  if (initialized) {
      var forceMagnitude = 0.02;
      worldBodies.forEach(function(body) {
          var forceDirection = (window.scrollY > this.lastScrollY) ? 1 : -1;
          Matter.Body.applyForce(body, body.position, { x: 0, y: forceDirection * forceMagnitude });
      });
      this.lastScrollY = window.scrollY;
  }
});
});