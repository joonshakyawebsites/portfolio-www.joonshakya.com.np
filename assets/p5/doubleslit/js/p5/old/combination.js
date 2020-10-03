var firstUp;
var secondUp;
var reverse;
var speed = document.getElementById("speedSelector");
var speedVal = 0;
var fpsCount = document.getElementById('fpsCount');
var bulge = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  forthHeight = height / 4;
  txtStd = height / 18;

  textSize(txtStd * 0.9);
  textAlign(CENTER, CENTER);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  firstUp = document.getElementById("firstUp").checked;
  secondUp = document.getElementById("secondUp").checked;
  reverse = document.getElementById("reverse").checked;
  if (frameCount % 10 == 0) {
    fpsCount.innerHTML = "FPS: " + frameRate().toFixed(2);
  }
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  speedVal += parseFloat(speed.value)
  for (let i = 0; i < width; i++) {
    begin = speedVal % width * (5 / 4) - width / 4;
    end = begin + width / 6;
    if (i >= begin && i <= end) {
      bulge[i] = - height / 12 * sin(map(i, begin, end, 0, PI))**2;
    } else {
      bulge[i] = 0;
    }
  }
  push();
  beginShape();
  for (let i = 0; i < width; i++) {
    zA = bulge[i]
    if (firstUp) {
      zA *= -1;
    }
    vertex(i, height / 6 + zA);
  }
  endShape();
  beginShape();
  for (let i = 0; i < width; i++) {
    if (!reverse) {
      zB = bulge[width - i];
    } else {
      zB = bulge[i];
    }
    if (secondUp) {
      zB *= -1;
    }
    vertex(i, height * 2 / 6 + 8 + zB);
  }
  endShape();
  beginShape();
  for (let i = 0; i < width; i++) {
    zA = bulge[i];
    if (firstUp) {
      zA *= -1;
    }
    if (!reverse) {
      zB = bulge[width - i];
    } else {
      zB = bulge[i];
    }
    if (secondUp) {
      zB *= -1;
    }
    zC = zA + zB;
    vertex(i, height * 2 / 3 + zC);
  }
  endShape();
  pop();
}