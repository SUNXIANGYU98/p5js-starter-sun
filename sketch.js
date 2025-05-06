/**
 * @typedef {import("./p5/types").Graphics} Graphics
 *
 * @typedef {Object} Cubo
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} size
 * @property {string} color
 * @property {function} rotationFunction
 */

//
let copie = 100;
let cubi = [];

/** @type {Graphics} */
let g;

//

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  g = createGraphics(100, 100);

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
  background(30);
  orbitControl();
  ambientLight(150);
  directionalLight(255, 255, 255, 0.5, 1, -0.5);

  g.background("white");
  g.text("ciao", 0, g.height);
  g.textSize(g.height);

  texture(g);

  for (let cubo of cubi) {
    push();
    translate(cubo.x, cubo.y, cubo.z);

    // 按颜色旋转
    let colLower = cubo.col.toLowerCase();
    if (["red", "blue", "yellow"].includes(colLower)) {
      rotateX(frameCount * 0.01);
    } else if (["green", "purple", "orange"].includes(colLower)) {
      rotateY(frameCount * 0.01);
    } else {
      rotateZ(frameCount * 0.01);
    }

    // 设置半透明填充
    let c = color(cubo.col);
    c.setAlpha(127); // 50% 透明度
    fill(c);

    // 发光边框
    stroke(cubo.col);
    strokeWeight(2);
    box(cubo.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
