var raindrops = [];
var numOfDrops;

function setup() {
  numOfDrops = windowWidth / 2;
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < numOfDrops; i++) {
    raindrops[i] = new Raindrop();
  }
}

function draw() {
  background(0, 10);

  for (var i = 0; i < numOfDrops; i++) {
    raindrops[i].fall();
    raindrops[i].show();
    if (raindrops[i].reachedBottom()) {
      raindrops[i].splash();
      raindrops[i].y = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numOfDrops = windowWidth / 2;
  raindrops = [];
  for (var i = 0; i < numOfDrops; i++) {
    raindrops[i] = new Raindrop();
  }
}

function Raindrop(x, y) {
  this.x = random(windowWidth);
  this.y = random(-100, -600);

  this.z = random(1, 3);
  this.speed = random(1, 3);
  this.gravity = random(1, 2);
  this.len = random(3, 10);
  this.rgb = [random(255), random(255), random(255)];

  this.fall = function () {
    this.y += this.speed;
    this.y += this.gravity;
  };

  this.reachedBottom = function () {
    return this.y > windowHeight;
  };

  this.splash = function () {
    strokeWeight(this.z);

    line(this.x, this.y, this.x + 10, this.y - 10); // Sağ
    line(this.x, this.y, this.x + 10, this.y - 20);

    line(this.x, this.y, this.x, this.y - 10); // Orta

    line(this.x, this.y, this.x - 10, this.y - 20);
    line(this.x, this.y, this.x - 10, this.y - 10); // Sol
  };

  this.show = function () {
    strokeWeight(this.z);
    stroke(this.rgb[0], this.rgb[1], this.rgb[2]);
    line(this.x, this.y, this.x, this.y + this.len);
  };
}
