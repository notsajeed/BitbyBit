const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const log = document.getElementById("log");

let queue = [];
const boxHeight = 100;
let rearIndex = -1;
let frontIndex = -1;
const maxQueueSize = 11;

function drawQueue() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let barWidth = 110;
    let gap = 2;
    canvas.width = queue.length * (barWidth + gap) + 40;

    queue.forEach((value, i) => {
        let x = i * (barWidth + gap) + 20;
        let y = canvas.height - 150;

        // Coloring logic
        if (i < frontIndex) {
            ctx.fillStyle = "red";  // Deleted
        } else if (i === frontIndex) {
            ctx.fillStyle = "yellow"; // Front
        } else if (i === rearIndex) {
            ctx.fillStyle = "green"; // Rear
        } else {
            ctx.fillStyle = "blue";  // Normal queue element
        }

        ctx.fillRect(x, y, barWidth, boxHeight);

        // Set text style
        ctx.fillStyle = "white";
        ctx.font = "600 16px Poppins";  // Bigger font
        ctx.textAlign = "center";
        ctx.fillText(value, x + barWidth / 2, y- 55 + boxHeight / 2);  // Centered value
        ctx.fillText(i, x + barWidth / 2, canvas.height - 55); // Centered index
    });

    // Logging the front and rear index positions
    if (frontIndex === -1 && rearIndex === -1) {
        log.innerHTML = "Queue is empty. <br>";
    } else {
       log.innerHTML = log.innerHTML +`Front is at index: ${frontIndex}, Rear is at index: ${rearIndex} <br>`;
    }
}

function enQueue() {
    const value = document.getElementById("enqueue-input").value;
    if (value === "") {
        alert("Enter a number");
    } else if (rearIndex < maxQueueSize - 1) {
        rearIndex++;
        queue[rearIndex] = value;  // Directly inserting instead of push()
        if (frontIndex === -1) frontIndex = 0; // Ensure front starts at 0 if queue was empty
        drawQueue();
    } else {
        alert("Queue Overflow");
        log.innerHTML += "Queue Overflow <br>";
    }
}

function deQueue() {
    if (frontIndex > rearIndex || frontIndex === -1) {
        alert("Queue Underflow");
        log.innerHTML += "Queue Underflow <br>";
        deleteQueue();
    } else {
        frontIndex++;
        drawQueue();
    }
}

function deleteQueue() {
    queue = [];
    frontIndex = -1;
    rearIndex = -1;
    drawQueue();
}

function generateRandomNumber() {
    let randomNum = Math.floor(Math.random() * 100); // Generates a number between 0-99
    document.getElementById("enqueue-input").value = randomNum; // Sets the value in input
}

drawQueue();
