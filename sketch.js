const maxLevel = 10;
const states = {
  initial: 0,
  playing: 1,
  end: 2,
};

let bee;
let song;
let xoff1 = 0;
let xoff2 = 10000;
let state = states.initial;
let lvl = 1;

function preload() {
  soundFormats("mp3");
  song = loadSound("assets/flight_of_the_bumblebee");
}

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(startGame);
  textSize(24);
  bee = new Bee(windowWidth/2, windowHeight/2);
}

function draw() {
  background(110, 180, 225);

  if (lvl > maxLevel) {
    return endGame();
  }

  if (state === states.playing) {
    const x = map(noise(xoff1), 0, 1, 0, width);
    const y = map(noise(xoff2), 0, 1, 0, height);

    xoff1 += 0.002 * lvl;
    xoff2 += 0.002 * lvl;

    bee.draw(x, y);

    push();
    fill(56, 111, 148);
    noStroke();
    textSize(20);
    text(
      `level ${lvl} - click on the bee to level up`,
      30,
      30,
      width - 60,
      height - 60
    );
    text(`press esq to stop`, 30, height - 30, width - 60, height - 60);
    pop();
  } else if (state === states.end) {
    push();
    fill(56, 111, 148);
    noStroke();
    textSize(60);
    textAlign(CENTER, CENTER);
    text("YOU WON!", width / 2, height / 2);
    textSize(20);
    text(`press esq to restart`, width / 2, height - 60);
    pop();
  } else {
    push();
    fill(56, 111, 148);
    noStroke();
    text("click or press enter to play", 30, 30, width - 60, height - 60);
    drawPlayButton();
    pop();
  }
}

function startGame() {
  if (state === states.initial && !song.isPlaying()) {
    lvl = 1;
    state = states.playing;
    song.setLoop(true);
    song.play();
  }
}

function endGame() {
  song.stop();
  state = states.end;
  lvl = 1;
}

function resetGame() {
  song.stop();
  state = states.initial;
}

function mouseClicked() {
  if (state === states.playing) {
    if (bee.clicked(mouseX, mouseY)) {
      lvl++;
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    startGame();
  }
  if (keyCode === ESCAPE) {
    resetGame();
  }
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
