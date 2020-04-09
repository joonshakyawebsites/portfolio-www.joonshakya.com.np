var rColorSlider;
var gColorSlider;
var bColorSlider;
var pxWSlider;

function setup() {
  createCanvas(940, 600);
  rColorSlider = createSlider(0, 100, 100, 1);
  rColorSlider.style('width', '364px');
  rColorSlider.position(width / 2 + 76, 12 + 65);
  gColorSlider = createSlider(0, 100, 100, 1);
  gColorSlider.style('width', '364px');
  gColorSlider.position(width / 2 + 76, 44 + 65);
  bColorSlider = createSlider(0, 100, 100, 1);
  bColorSlider.style('width', '364px');
  bColorSlider.position(width / 2 + 76, 76 + 65);
  pxWSlider = createSlider(3, 120, 6, .1);
  pxWSlider.style('width', '370px');
  pxWSlider.position(150, 175);
}

function draw() {
  background(51);
  noStroke();

  rColor = rColorSlider.value() * 2.55;
  gColor = gColorSlider.value() * 2.55;
  bColor = bColorSlider.value() * 2.55;
  pxW = pxWSlider.value();
  pxGap = pxW / 3;
  refPxW = 24;
  refPxGap = 5;

  fill(255);
  textSize(48);
  text("Pixels", width / 2.5, 52);
  translate(68, 68);
  textSize(24);
  text("Made by: Joon Shakya", width / 1.6, -24);
  text("Red", width / 3, 32);
  text("Green", width / 3, 64);
  text("Blue", width / 3, 96);
  fill(255, 0, 0);
  rect(width / 3.4, 10, 24, 24);
  fill(0, 255, 0);
  rect(width / 3.4, 42, 24, 24);
  fill(0, 0, 255);
  rect(width / 3.4, 74, 24, 24);
  fill(255);
  text(rColorSlider.value() + "%", width / 3 + 84, 32);
  text(gColorSlider.value() + "%", width / 3 + 84, 64);
  text(bColorSlider.value() + "%", width / 3 + 84, 96);
  translate(-68, -68);

  translate(32, 208);
  fill(0);
  rect(0, 0, refPxW * 3 + refPxGap * 4, refPxW * 3 + refPxGap * 4);
  fill(rColor, 0, 0);
  rect(refPxGap + (refPxW + refPxGap) * 0, refPxGap, refPxW, refPxW * 3 + refPxGap * 2);
  fill(0, gColor, 0);
  rect(refPxGap + (refPxW + refPxGap) * 1, refPxGap, refPxW, refPxW * 3 + refPxGap * 2);
  fill(0, 0, bColor);
  rect(refPxGap + (refPxW + refPxGap) * 2, refPxGap, refPxW, refPxW * 3 + refPxGap * 2);
  stroke(255);
  line(92 - 5, 5, 92 + 32, 0);
  line(92 - 5, 92 - 5, 92 + 32, pxW * 3);
  noStroke();
  translate(516, 0);
  fill(rColor, gColor, bColor);
  rect(0, 0, 360, 360);
  translate(-360 - 32, 0);
  fill(0);
  rect(0, 0, 360, 360);
  for (var x = 0; x < 361 - pxW * 3; x = x + pxW * 3 + pxGap) {
    for (var y = 0; y < 361 - pxW * 3; y = y + pxW * 3 + pxGap) {
      fill(rColor, 0, 0);
      rect(0, 0, pxW, pxW * 3);
      fill(0, gColor, 0);
      rect(pxW, 0, pxW, pxW * 3);
      fill(0, 0, bColor);
      rect((pxW) * 2, 0, pxW, pxW * 3);
      translate(0, pxW * 3 + pxGap);
    }
    translate(pxW * 3 + pxGap, -y);
  }
  // end of draw()
}