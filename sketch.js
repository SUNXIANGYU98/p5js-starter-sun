let copie = 300;
let cubi = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < copie; i++) {
    cubi.push({
      x: random(-1000, 1000),
      y: random(-1000, 1000),
      z: random(-1000, 1000),
      size: random(50, 150),
      col: random([
        "red",
        "blue",
        "yellow",
        "green",
        "purple",
        "orange",
        "pink",
        "black",
        "white",
      ]),
    });
  }
}

function draw() {
  background(350);
  orbitControl();
  ambientLight(100);
  directionalLight(255, 255, 255, 0.5, 1, -0.5);

  for (let cubo of cubi) {
    push();
    translate(cubo.x, cubo.y, cubo.z);

    // Rotate based on color
    let colLower = cubo.col.toLowerCase();
    if (["red", "blue", "yellow"].includes(colLower)) {
      rotateX(frameCount * 0.01);
    } else if (["green", "purple", "orange"].includes(colLower)) {
      rotateY(frameCount * 0.01);
    } else if (["pink", "black", "white"].includes(colLower)) {
      rotateZ(frameCount * 0.01);
    }

    // Glowing edge only
    noFill();
    let edgeColor = color(cubo.col);
    edgeColor.setAlpha(200);
    stroke(edgeColor);
    strokeWeight(3);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = edgeColor;
    box(cubo.size);
    drawingContext.shadowBlur = 0;
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
