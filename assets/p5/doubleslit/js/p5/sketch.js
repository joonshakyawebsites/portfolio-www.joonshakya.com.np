let easycam;
let forthHeight;
let txtFont;
let txtStd;
let canvH = 200;
let canvW = 300;
let centerA = {x: -canvW/3, y: canvH};
let centerB = {x: canvW/3, y: canvH};
let centerM = {x: 0, y: canvH * 3};
let boxWidth = 10;
let angle;
let even = true;
let zA = 0;
let zB = 0;
let z = 0;
let pZ = 0;
let zMax = [];
let zMin = [];
let i = 0;
let pos;

var firstSlitCheckbox = document.getElementById("firstSlitCheckbox");
var secondSlitCheckbox = document.getElementById("secondSlitCheckbox");
var fpsCount = document.getElementById('fpsCount');

let firstSlit = true;
let secondSlit = true;
let pattern = true;

// function preload() {
//   txtFont = loadFont("SourceSansPro-Regular.otf");
// }

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', false);
  pixelDensity(pixelDensity() * 0.75);
  forthHeight = height / 4;
  txtStd = height / 18;

  easycam = createEasyCam();
  // easycam = new Dw.EasyCam(this._renderer, {
  //   distance: height,
  //   rotation: [0.793, 0.518, 0.200, -0.247]
  // });

  // textFont(txtFont);
  textSize(txtStd * 0.9);
  textAlign(CENTER, CENTER);

  calculateWaves();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0, 0, windowWidth, windowHeight]);
}

function draw() {
  if (frameCount % 10 == 0) {
    fpsCount.innerHTML = "FPS: " + frameRate().toFixed(2);
  }
  background(0);
  translate(0, -canvH, 0)

  // Initial Lights
  ambientLight(128, 128, 128);
  pointLight(155, 155, 155, 0, 0, height);

  // Draw the points
  if (pos[i]) {
    for (let j = 0; j < pos[i].length; j++) {
      beginShape(POINTS)
      for (let k = 0; k < pos[i][j].length; k++) {
        x = map(j, 0, pos[i].length -1, -canvW, canvW)
        y = map(k, 0, pos[i][j].length -1, -canvH, canvH*3)
        vertex(x, y, pos[i][j][k]);
      }
      endShape();
    }
  }

  if (i >= pos.length -2) {
    i = 0;
  } else {
    i++;
  }

  stroke(255, 255, 255, 200);
  strokeWeight(4);
  // Gun
  push();
  noStroke();
  translate(0, canvH * 3 + 25, 0);
  ambientMaterial(255, 144, 144);
  cylinder(10, 50);
  pop();
  
  // Slits
  push();
  noStroke();
  translate(0, canvH, 0);
  rotateX(HALF_PI);
  if (firstSlit && secondSlit) {
    push();
    translate(-canvW*2/3 - 5, 0, 0);
    plane(canvW*2/3 - 5, 100);
    pop();
    push();
    translate(0, 0, 0);
    plane(canvW*2/3 - 5, 100);
    pop();
    push();
    translate(canvW*2/3 + 5, 0, 0);
    plane(canvW*2/3 - 5, 100);
    pop();
  } else if (firstSlit) {
    push();
    translate(-canvW*2/3 - 5, 0, 0);
    plane(canvW*2/3 - 5, 100);
    pop();
    push();
    translate(canvW/3 + 2.5, 0, 0);
    plane(canvW*4/3 - 1.25, 100);
    pop();
  } else if (secondSlit) {
    push();
    translate(canvW*2/3 + 5, 0, 0);
    plane(canvW*2/3 - 5, 100);
    pop();
    push();
    translate(-canvW/3 - 2.5, 0, 0);
    plane(canvW*4/3 - 1.25, 100);
    pop();
  } else {
    plane(canvW*2, 100);
  }
  pop();

  if (pattern) {
    push();
    noStroke();
    translate(0, -canvH, 0);
    rotateX(HALF_PI);
    plane(canvW * 2, 100);
    pop();

    push();
    stroke(255, 0, 0);
    strokeWeight(1);
    beginShape();
    for(let x = -canvW; x <= canvW; x += boxWidth) {
      vertex(x, -canvH, zMax[x-canvW]);
    }
    endShape();
    beginShape();
    for(let x = canvW; x >= -canvW; x -= boxWidth) {
      vertex(x, -canvH, zMin[x-canvW]);
    } 
    endShape();
    pop();
  }
}

function calculateWaves() {
  firstSlit = firstSlitCheckbox.checked;
  secondSlit = secondSlitCheckbox.checked;
  pos = [];
  angle = 0;
  phaseA = dist(centerM.x, centerM.y, centerA.x, centerA.y)* -0.1
  phaseB = dist(centerM.x, centerM.y, centerB.x, centerB.y)* -0.1

  for(let x = -canvW; x <= canvW; x += boxWidth) {
    zMax[x - canvW] = 0;
    zMin[x - canvW] = 0;
  }

  for (let a = 0; angle < TWO_PI; a++) {
    pos[a] = [];
    b = 0;
    for(let x = -canvW; x <= canvW; x += boxWidth) {
      pos[a][b] = [];
      let c = 0;

      // After the slit
      for(let y = -canvH; y <= canvH; y += boxWidth) {
        if (firstSlit) {
          dA = dist(x, y, centerA.x, centerA.y) * -0.1
          zA = sin(angle + dA + phaseA) * 5;
        }
        if (secondSlit){
          dB = dist(x, y, centerB.x, centerB.y) * -0.1
          zB = sin(angle + dB + phaseA) * 5;
        } 
        z = zA + zB;
        pos[a][b][c] = z;
        c++;
      }

      // Before the slit
      for(let y = canvH; y <= canvH * 3; y += boxWidth) {
        dM = dist(x, y, centerM.x, centerM.y) * -0.1
        zM = sin(angle + dM) * 5;
        pos[a][b][c] = zM;
        c++;
      }
      b++;
    }

    for(let x = -canvW; x <= canvW; x += boxWidth) {
      if (pattern) {
        zA = 0;
        zB = 0;
        if (firstSlit) {
          dA = dist(x, -canvH, centerA.x, centerA.y) * -0.1
          zA = sin(angle + dA) * 5;
        }
        if (secondSlit) {
          dB = dist(x, -canvH, centerB.x, centerB.y) * -0.1
          zB = sin(angle + dB) * 5;
        }
        z = zA + zB;
        zMax[x-canvW] = max(z, zMax[x-canvW]);
        zMin[x-canvW] = min(z, zMin[x-canvW]);
      }
    }
    angle += 0.2;
  }
}