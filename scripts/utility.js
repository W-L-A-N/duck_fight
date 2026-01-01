function drawFrame() {
    //clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the map
    ctx.drawImage(selectedMap.backgroundImage, 0, 0, canvas.clientWidth, canvas.height);

    // draw the players
    players.forEach(player => {
        player.draw();
    });
}

function updateFrame() {
    players.forEach(player => {
        player.updatePos();
    });
}