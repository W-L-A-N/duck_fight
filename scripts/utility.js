function drawFrame() {
    //clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the map
    ctx.drawImage(selectedMap.backgroundImage, 0, 0, canvas.clientWidth, canvas.height);

    // draw the players
    players.forEach(player => {
        player.draw();
    });

    projectiles.forEach((projectile, i) => {
        if (projectile.animationActive) {
            projectile.draw();
        } else {
            projectiles.splice(i, 1);
        }
    });
}

function updateFrame() {
    players.forEach(player => {
        player.updatePos();
    });

    projectiles.forEach(projectile => {
        projectile.collisionUpdate();
    });
}



