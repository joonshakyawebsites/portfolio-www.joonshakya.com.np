var incident = 0;
var incidentSlider;
var rIndexSlider;
var refracted;
var texRefract;
var rIndex;
var cAngle;
var refrRefl;

function setup() {
  createCanvas(940, 600);
  rIndexSlider = createSlider(1, 5, 1, 0.005);
  rIndexSlider.style('width', '440px');
  rIndexSlider.position(width / 2, (height / 6) + 18);
  incidentSlider = createSlider(0, (PI / 2) - 0.001, 0, 0.0005);
  incidentSlider.style('width', '440px');
  incidentSlider.position(width / 2, (height / 6) + 178);
}

function draw() {
  background(51);
  incident = incidentSlider.value();
  rIndex = rIndexSlider.value();
  translate(width / 4, height / 2);
  noStroke();
  fill(120);
  arc(0, 0, height * 2 / 3, height * 2 / 3, PI, 2 * PI, OPEN);
  fill(90);
  arc(0, 0, height * 2 / 3, height * 2 / 3, 0, PI, OPEN);
  textSize(20);
  fill(255);
  text("Rarer Medium", -160, -20);
  text("Denser Medium", -168, 36);
  stroke(255);
  strokeWeight(4);
  stroke(255, 255, 255);
  line(0, 0, height / 3, 0);
  line(0, 0, -height / 3, 0);
  line(0, 0, 0, height / 3);
  line(0, 0, 0, -height / 3);
  cAngle = asin(1 / rIndex);
  rotate(cAngle);
  stroke(255, 120, 120);
  line(0, 0, 0, (height / 3));
  rotate(-cAngle);
  rotate(incident);
  stroke(160, 255, 80);
  line(0, 0, 0, height / 3);
  rotate(-incident);
  if (incident < cAngle) {
    refracted = asin(rIndex * sin(incident));
    texRefract = (refracted * 180 / PI);
    refrRefl = "Refraction";
  } else {
    refracted = (PI) - incident;
    texRefract = 180 - (refracted * 180 / PI);
    refrRefl = "Reflection";
  }
  rotate(refracted);
  stroke(255, 255, 80);
  line(0, 0, 0, -(height / 3));
  rotate(-refracted);
  translate(width / 4, -height / 3);
  noStroke();
  fill(255, 255, 255);
  textSize(28);
  text("Refractive Index (               ) :", 0, 0);
  textSize(14);
  text("rarer", 226, 0);
  textSize(36);
  text("μ", 264, 0);
  textSize(14);
  text("denser", 290, 0)
  textSize(28);
  fill(255);
  text((rIndex).toFixed(3), 372, 0);
  fill(255, 120, 120);
  text("Critical Angle:", 0, 100);
  fill(255, 255, 255);
  text((cAngle * 180 / PI).toFixed(3) + "°", 372, 100);
  fill(160, 255, 80);
  text("Angle of Incidence:", 0, 160);
  fill(255, 255, 255);
  text((incident * 180 / PI).toFixed(3) + "°", 372, 160);
  fill(255, 255, 80);
  text("Angle of " + refrRefl + ":", 0, 260);
  fill(255, 255, 255);
  text((texRefract).toFixed(3) + "°", 372, 260);
  textSize(24);
  text("Made by Joon Shakya", 96, 360);
}