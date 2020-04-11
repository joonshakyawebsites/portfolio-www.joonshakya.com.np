var incident = 0;
var incidentSlider;
var rIndexSlider;
var refracted;
var texRefract;
var rIndex;
var cAngle;
var refrRefl;
var landS;
var translateMiddle = false;

function setup() {
  if (windowWidth > windowHeight * 1.3) {
    landS = true;
    createCanvas(windowWidth, windowHeight);
  } else if (windowHeight > windowWidth * 1.3) {
    landS = false;
    createCanvas(windowWidth, windowHeight);
  } else {
    translateMiddle = true;
    createCanvas(windowHeight / 1.4, windowHeight);
  }

  rIndexSlider = createSlider(1, 5, 1, 0.005);
  incidentSlider = createSlider(0, (PI / 2) - 0.001, 0, 0.0005);

  if (landS) {
    txtStd = height / 25;
    landS = true;
    rightTxtPos = txtStd * 13;
    cirDiam = width * 0.25 + txtStd * 4.5;
    cirRadi = cirDiam / 2;
    rIndexSlider.position(width / 2, txtStd * 9.5);
    incidentSlider.position(width / 2, txtStd * 15);
  } else {
    txtStd = width / 20;
    landS = false;
    rightTxtPos = txtStd * 13;
    cirDiam = height * 0.25 + txtStd * 4.5;
    cirRadi = cirDiam / 2;
    rIndexSlider.position(width / 10, height / 1.7 + txtStd * 0.5);
    incidentSlider.position(width / 10, height / 1.7 + txtStd * 5.75);
  }

  rIndexSlider.style('width', txtStd * 25 * 0.65 + 'px');
  incidentSlider.style('width', txtStd * 25 * 0.65 + 'px');
}

function draw() {
  incident = incidentSlider.value();
  rIndex = rIndexSlider.value();
  background(51);

  push();
  fill(255);
  translate(width / 2, txtStd * 2);
  textSize(txtStd * 1.125);
  textAlign(CENTER, CENTER);
  text("Total Internal Reflection Calculator", 0, 0);
  pop();

  push();
  noStroke();
  if (landS) {
    translate(width / 4, height / 2 + txtStd);
  } else {
    translate(width / 2, height / 3);
  }

  fill(120);
  arc(0, 0, cirDiam, cirDiam, PI, TWO_PI, OPEN);
  fill(90);
  arc(0, 0, cirDiam, cirDiam, 0, PI, OPEN);

  fill(255);
  textSize(cirRadi * .1);
  text("Rarer Medium", -cirRadi * 0.8, -cirRadi * .1);
  text("Denser Medium", -cirRadi * 0.85, cirRadi * .175);
  stroke(255);
  strokeWeight(4);
  line(0, 0, cirRadi, 0);
  line(0, 0, -cirRadi, 0);
  line(0, 0, 0, cirRadi);
  line(0, 0, 0, -cirRadi);
  cAngle = asin(1 / rIndex);
  rotate(cAngle);
  stroke(255, 120, 120);
  line(0, 0, 0, cirRadi);
  rotate(-cAngle);
  rotate(incident);
  stroke(160, 255, 80);
  line(0, 0, 0, cirRadi);
  rotate(-incident);
  if (incident < cAngle) {
    refracted = asin(rIndex * sin(incident));
    texRefract = refracted * 180 / PI;
    refrRefl = "Refraction";
  } else {
    refracted = PI - incident;
    texRefract = 180 - refracted * 180 / PI;
    refrRefl = "Reflection";
  }
  rotate(refracted);
  stroke(255, 255, 80);
  line(0, 0, 0, -cirRadi);
  pop();

  push();
  if (landS) {
    translate(width / 2, height / 2.8);
  } else {
    translate(width / 10, height / 1.7);
  }
  noStroke();
  fill(255);
  textSize(txtStd);
  text("Refractive Index (    μ      ) :", 0, 0);
  textSize(txtStd * 0.4);
  text("rarer        denser", txtStd * 8, 0);

  textSize(txtStd);
  text((rIndex).toFixed(3), rightTxtPos, 0);
  fill(255, 120, 120);
  text("Critical Angle:", 0, txtStd * 3.3);
  fill(255);
  text((cAngle * 180 / PI).toFixed(3) + "°", rightTxtPos, txtStd * 3.3);
  fill(160, 255, 80);
  text("Angle of Incidence:", 0, txtStd * 3.3 + txtStd * 2);
  fill(255);
  text((incident * 180 / PI).toFixed(3) + "°", rightTxtPos, txtStd * (3.3 + 2));
  fill(255, 255, 80);
  text("Angle of " + refrRefl + ":", 0, txtStd * (3.3 * 2 + 2));
  fill(255);
  text((texRefract).toFixed(3) + "°", rightTxtPos, txtStd * (3.3 * 2 + 2));
  textSize(txtStd * 0.8);
  text("V1.0.3 Coded by Joon Shakya", txtStd * 3, txtStd * (3.3 * 3 + .5));
  pop();
}