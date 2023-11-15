// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 720;
cnv.height = 480;

// EVENT STUFF
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    if (event.code === "ArrowUp") {
        player[0].up = true;
    }
    if (event.code === "ArrowLeft") {
        player[0].left = true;
    }
    if (event.code === "ArrowRight") {
        player[0].right = true;
    }
    if (event.code === "ArrowDown") {
        player[0].down = true;
    }
}

function keyupHandler(event) {
    if (event.code === "ArrowUp") {
        player[0].up = false;
    }
    if (event.code === "ArrowLeft") {
        player[0].left = false;
    }
    if (event.code === "ArrowRight") {
        player[0].right = false;
    }
    if (event.code === "ArrowDown") {
        player[0].down = false;
    }
}

// Global Variables

// Reset Variables
let walls;
let player;

reset();


// Animation
requestAnimationFrame(animate);
function animate() {
    // Fill Background
    ctx.clearRect(0, 0, cnv.width, cnv. height);

    // Food Helper Functions
    for (let i = 0; i < walls.length; i++) {
        draw(walls, i);
        checkCollision(i);
    }

    // Player Helper Functions
    draw(player, 0);
    playerMovement();

    // Request Animation Frame
    requestAnimationFrame(animate);
}

function draw(shape, n) {
    ctx.fillStyle = `${shape[n].color}`;
    ctx.fillRect(shape[n].x, shape[n].y, shape[n].w, shape[n].h);
}

function playerMovement() {

}

function checkCollision(n) {
    // Top Detection
    if (player[0].y < walls[n].y + walls[n].h && player[0].y > walls[n].y && player[0].x + player[0].v < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].v > walls[n].x) {
        player[0].y = walls[n].y;
    }
    // Bottom Detection
    if (player[0].y + player[0].h > walls[n].y && player[0].y + player[0].h < walls[n].y + walls[n].h && player[0].x + player[0].v < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].v > walls[n].x) {
        player[0].y = walls[n].y - player[0].h;
        player[0].canJump = true;
    }
    // Left Detection
    if (player[0].x < walls[n]. x + walls[n].w && player[0].x > walls[n].x && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x + walls[n].w;
    }
    // Right Detection
    if (player[0].x + player[0].w > walls[n]. x && player[0].x + player[0].w  < walls[n].x + walls[n].w && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x - player[0].w;
    }
}

function moveCircles(n) {
    if (circles[n].xVelocity === 0) {
        circles[n].xVelocity = randomInt(-5, 5);
    }
    if (circles[n].yVelocity === 0) {
        circles[n].yVelocity = randomInt(-5, 5);
    }

    circles[n].x += circles[n].xVelocity;
    circles[n].y += circles[n].yVelocity;

    if (circles[n].x + circles[n].r > cnv.width || circles[n].x - circles[n].r < 0) {
        circles[n].xVelocity = circles[n].xVelocity * -1;
    }
    if (circles[n].y + circles[n].r > cnv.height || circles[n].y - circles[n].r < 0) {
        circles[n].yVelocity = circles[n].yVelocity * -1;
    }
}

function newPlayer(x1, y1, w1, h1, color1, up1, left1, right1, down1, xV1, yV1, yAccel1, canJump1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1,
            up: up1,
            left: left1,
            right: right1,
            down: down1,
            xV: xV1,
            yV: yV1,
            yAccel: yAccel1,
            canJump: canJump1
        } 
}

function newWall(x1, y1, w1, h1, color1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1
        }
}

function reset() {
    walls = [];
    walls.push(newWall(0, cnv.height - 20, 1950, 20, "grey"));
    walls.push(newWall(520, cnv.height / 2, 150, 20, "grey"));

    player = [];
    player.push(newPlayer(50, cnv.height / 2, 20, 20, "blue", false, false, false, false, 5, 5, 1, false));
}