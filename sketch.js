/** @typedef {import("./p5/types/index")} Graphics */

/**
 * @typedef {Object} Cubo
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} size
 * @property {string} color
 * @property {function} rotationFunction
 */

//
/** @type{Cubo[]} */
let cubi = [];
let copie = 400;

let g;

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
  background(100);
  orbitControl();
  ambientLight(100);
  directionalLight(255, 255, 255, 0.5, 1, -0.5);

  for (let cubo of cubi) {
    push();
    translate(cubo.x, cubo.y, cubo.z);

    let colLower = cubo.col.toLowerCase();
    if (["red", "blue", "yellow"].includes(colLower)) {
      rotateX(frameCount * 0.01);
    } else if (["green", "purple", "orange"].includes(colLower)) {
      rotateY(frameCount * 0.01);
    } else if (["pink", "black", "white"].includes(colLower)) {
      rotateZ(frameCount * 0.01);
    }

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
