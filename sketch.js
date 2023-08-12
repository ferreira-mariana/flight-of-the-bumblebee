let xoff1 = 0;
let xoff2 = 10000;
let started = false;
let song;

function preload() {
  soundFormats("mp3");
  song = loadSound("assets/flight_of_the_bumblebee");
}

function setup() {
  const cnv = createCanvas(displayWidth, displayHeight);
  cnv.mousePressed(canvasPressed);
  background(110, 180, 225);
  fill(56, 111, 148);
  textSize(24);
  text("tap here to play", 30, 50);
}

function draw() {
  if (started) {
    background(109, 179, 225);

    const x = map(noise(xoff1), 0, 1, 0, width);
    const y = map(noise(xoff2), 0, 1, 0, height);

    xoff1 += 0.02;
    xoff2 += 0.02;

    drawBee(x, y);
  }
}

function canvasPressed() {
  started = true;
  song.play();
}

function drawBee(x, y) {
  fill(255, 255, 204);
  stroke(185, 185, 134);
  ellipse(x - 15, y + 8, 15, 10); // left bottom wing
  ellipse(x + 15, y + 8, 15, 10); // right bottom wing
  ellipse(x - 15, y - 2, 25, 20); // left top wing
  ellipse(x + 15, y - 2, 25, 20); // right top wing

  noStroke();
  fill(250, 205, 70);
  ellipse(x, y, 24, 34); // bee's body
  fill(70);
  rect(x - 13, y - 5, 26, 8, 6);
  arc(x, y + 12, 16, 16, 0, PI, OPEN);

  stroke(70);
  line(x - 5, y - 12, x - 10, y - 20); // right antenna
  ellipse(x - 10, y - 20, 3);
  line(x + 5, y - 12, x + 10, y - 20); // left antenna
  ellipse(x + 10, y - 20, 3);
}
