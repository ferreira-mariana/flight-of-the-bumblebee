let xoff1 = 0;
let xoff2 = 10000;
let started = false;
let song;

function preload() {
  soundFormats("mp3");
  song = loadSound("assets/flight_of_the_bumblebee");
}

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(controlFlow);
  textSize(width / 10);
}

function draw() {
  background(110, 180, 225);
  if (started) {
    const x = map(noise(xoff1), 0, 1, 0, width);
    const y = map(noise(xoff2), 0, 1, 0, height);

    xoff1 += 0.02;
    xoff2 += 0.02;

    drawBee(x, y);
  } else {
    fill(56, 111, 148);
    noStroke();
    text("click or press enter to play", 50, 50, width - 100, height - 100);
    drawPlayButton();
  }
}

function controlFlow() {
  started = !started;
  if (started) {
    song.play();
  } else {
    song.stop();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    controlFlow();
  }
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

function drawPlayButton() {
  const delta = width / 30;
  const baseH = height / 2;
  const baseW = width / 2;

  x1 = baseW - (2 / 3) * delta;
  x2 = x1;
  x3 = baseW + delta;
  y1 = baseH - delta;
  y2 = baseH + delta;
  y3 = baseH;

  noStroke();
  triangle(x1, y1, x2, y2, x3, y3);
}
