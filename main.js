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
}

// Global Variables

// Reset Variables
let walls;
let triggers;
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

    // Camera Movement Triggers
    for (let i = 0; i < triggers.length; i++) {
        checkTriggers();
    }
    
    // Request Animation Frame
    requestAnimationFrame(animate);
}

function draw(shape, n) {
    ctx.fillStyle = `${shape[n].color}`;
    ctx.fillRect(shape[n].x, shape[n].y, shape[n].w, shape[n].h);
}

function playerMovement() {
   playercontrols();
   player[0].yV += player[0].yAccel;
   player[0].y += player[0].yV;

    if (player[0].yV > 10) {
        player[0].yV = 10;
    } else if (player[0].yV < -10) {
        player[0].yV = -10;
    }
}

function playercontrols() {
    if (player[0].up === true) {
        player[0].yV = -10;
    }
    if (player[0].left === true) {
        player[0].x -= player[0].xV;
    }
    if (player[0].right === true) {
        player[0].x += player[0].xV;
    }
}

function checkCollision(n) {
    // Wall Detection
    // Top Detection
    if (player[0].y < walls[n].y + walls[n].h && player[0].y > walls[n].y && player[0].x + player[0].xV < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].xV > walls[n].x) {
        player[0].y = walls[n].y - player[0].h;
    }
    // Bottom Detection
    if (player[0].y + player[0].h > walls[n].y && player[0].y + player[0].h < walls[n].y + walls[n].h && player[0].x + player[0].xV < walls[n].x + walls[n].w && player[0].x + player[0].w - player[0].xV > walls[n].x) {
        player[0].y = walls[n].y - player[0].h;
        player[0].yV = 0;
    }
    // Left Detection
    if (player[0].x < walls[n]. x + walls[n].w && player[0].x > walls[n].x && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x + walls[n].w;
    }
    // Right Detection
    if (player[0].x + player[0].w > walls[n]. x && player[0].x + player[0].w  < walls[n].x + walls[n].w && player[0].y < walls[n].y + walls[n].h && player[0].y + player[0].h > walls[n].y) {
        player[0].x = walls[n].x - player[0].w;
    }

    // Canvas Borders
    if (player[0].x < 0) {
        player[0].x = 0;
    }
    if (player[0].x + player[0].w > cnv.width) {
        player[0].x = cnv.width - player[0].w;
    }
}

function checkTriggers(n) {
    // Trigger Detection
    if (player[0].x + player[0].w > triggers[n].x) {
        triggers[n].state = true;
    }

    if (player[0].x + player[0].w / 2 > cnv.width / 2) {
        for (let i = 0; i < walls.length; i++) {
            walls[i].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
        }
        player[0].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
    }
    if (player[0].x + player[0].w / 2 < cnv.width / 2) {
        for (let i = 0; i < walls.length; i++) {
            walls[i].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
        }
        player[0].x += (cnv.width / 2) - (player[0].x + player[0].w / 2);
    }
}

function newPlayer(x1, y1, w1, h1, color1, up1, left1, right1, xV1, yV1, yAccel1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1,
            up: up1,
            left: left1,
            right: right1,
            xV: xV1,
            yV: yV1,
            yAccel: yAccel1
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

function newTrigger(x1, state1) {
    return {
        x: x1,
        state: state1
    }
}

function reset() {
    walls = [];
    walls.push(newWall(0, cnv.height - 20, 1950, 20, "grey"));
    walls.push(newWall(520, cnv.height / 2, 150, 20, "grey"));

    triggers = [];
    triggers.push(newTrigger(cnv.width / 2, false));

    player = [];
    player.push(newPlayer(50, cnv.height / 2, 20, 20, "blue", false, false, false, 5, 0, 1));
}