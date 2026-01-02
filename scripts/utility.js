function drawFrame() {
    //clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the map
    ctx.drawImage(selectedMap.backgroundImage, 0, 0, canvas.clientWidth, canvas.height);

    // draw the players
    players.forEach(player => {
        player.draw();
    });

    trajectories.forEach((trajectorie, i) => {
        if (trajectorie.animationActive) {
            trajectorie.draw();
        } else {
            trajectories.splice(i, 1);
        }
    });
}

function updateFrame() {
    players.forEach(player => {
        player.updatePos();
    });

    trajectories.forEach(trajectorie => {
        trajectorie.collisionUpdate();
    });
}



