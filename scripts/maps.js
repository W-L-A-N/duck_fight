const canvas = document.getElementById('game-screen');
canvas.height = innerHeight;
canvas.width = innerWidth;


function percentOfScreenX(num) {
    return canvas.width * num;
}

function percentOfScreenY(num) {
    return canvas.height * num;
}



const Map1 = {
    imagePath: '../media/maps/map1.jpeg',
    backgroundImage: new Image(),
    platforms: [
        new Map_object(percentOfScreenX(0.066) , percentOfScreenY(0.35), percentOfScreenX(0.1675), percentOfScreenY(0.05)),
        new Map_object(percentOfScreenX(0), percentOfScreenY(0.703), percentOfScreenX(0.3), percentOfScreenX(0.2)),
        new Map_object(percentOfScreenX(0.3673), percentOfScreenY(0.453), percentOfScreenX(0.332), percentOfScreenY(0.6)),
        new Map_object(percentOfScreenX(0.6), percentOfScreenY(0.251), percentOfScreenX(0.1665), percentOfScreenX(0.027)),
        new Map_object(percentOfScreenX(0.768), percentOfScreenY(0.502), percentOfScreenX(0.3), percentOfScreenX(0.5)),
    ],

    playersPosition: [
        {x: percentOfScreenX(0.8), y: percentOfScreenY(0.4)},
        {x: percentOfScreenX(0.2), y: percentOfScreenY(0.2)},
    ],
}