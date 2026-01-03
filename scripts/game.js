// the game loop function
function startGame() {
    drawFrame();
    updateFrame();
    // This function is a 60 frame loop on a given function
    // it also returns an ID, we can use it to make it stop
    // animationFrameId = requestAnimationFrame(startGame);
    animationFrameId = requestAnimationFrame(startGame);
}

// initilize the cnavas
// canvas defined in maps.js
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;


// game state related variables
let selectedMap = Map1;
let animationFrameId;


// players
const players = [
    new Player(selectedMap.playersPosition[0].x, selectedMap.playersPosition[0].y, 'white_duck'),
    new Player(selectedMap.playersPosition[1].x, selectedMap.playersPosition[1].y, 'yellow_duck'),
];

const projectiles = [];


const weaponsImages = {
    sword: {
        'left': [
            new Image(),
            new Image(),
        ],
        'right': [
            new Image(),
            new Image(),
        ],
    },

    gun: {
        'left': new Image(),
        'right': new Image(),
    },

    AK: {
        'left': new Image(),
        'right': new Image(),
    }

};


const projectilesImages = {
    claw: {
        'left': [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
        ],
        'right':[
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
        ]
    },

    slash: {
        'left': new Image(),
        'right': new Image()
    },

    bulletGun: {
        'left': new Image(),
        'right': new Image()
    },

    bulletAK: {
        'left': new Image(),
        'right': new Image()
    }

};



// loaded assets
const assets = [
    // onload is a property, it accepts a function, it's going to excute the function one the image has loded
    // resolve is a function that tells the "Promise.all" that I finshed here
    // maps
    //map1
    new Promise((resolve, reject) => {
        Map1.backgroundImage.onload = resolve;
        Map1.backgroundImage.onerror = reject;
        Map1.backgroundImage.src = Map1.imagePath;
    }),

    // sword
    new Promise((resolve, reject) => {
        weaponsImages.sword['left'][0].onload = resolve;
        weaponsImages.sword['left'][0].onerror = reject;
        weaponsImages.sword['left'][0].src = '../media/weapons/sword/left/sword.png';
    }),

    new Promise((resolve, reject) => {
        weaponsImages.sword['left'][1].onload = resolve;
        weaponsImages.sword['left'][1].onerror = reject;
        weaponsImages.sword['left'][1].src = '../media/weapons/sword/left/sword2.png';
    }),

    new Promise((resolve, reject) => {
        weaponsImages.sword['right'][0].onload = resolve;
        weaponsImages.sword['right'][0].onerror = reject;
        weaponsImages.sword['right'][0].src = '../media/weapons/sword/right/sword.png';
    }),

    new Promise((resolve, reject) => {
        weaponsImages.sword['right'][1].onload = resolve;
        weaponsImages.sword['right'][1].onerror = reject;
        weaponsImages.sword['right'][1].src = '../media/weapons/sword/right/sword2.png';
    }),


    // AK
    new Promise((resolve, reject) => {
        weaponsImages.AK['left'].onload = resolve;
        weaponsImages.AK['left'].onerror = reject;
        weaponsImages.AK['left'].src = '../media/weapons/AK/left/AK.png';
    }),

    new Promise((resolve, reject) => {
        weaponsImages.AK['right'].onload = resolve;
        weaponsImages.AK['right'].onerror = reject;
        weaponsImages.AK['right'].src = '../media/weapons/AK/right/AK.png';
    }),

    // gun 
    new Promise((resolve, reject) => {
        weaponsImages.gun['left'].onload = resolve;
        weaponsImages.gun['left'].onerror = reject;
        weaponsImages.gun['left'].src = '../media/weapons/gun/left/gun.png';
    }),

    new Promise((resolve, reject) => {
        weaponsImages.gun['right'].onload = resolve;
        weaponsImages.gun['right'].onerror = reject;
        weaponsImages.gun['right'].src = '../media/weapons/gun/right/gun.png';
    }),

    // slash
    new Promise((resolve, reject) => {
        projectilesImages.slash['left'].onload = resolve;
        projectilesImages.slash['left'].onerror = reject;
        projectilesImages.slash['left'].src = '../media/projectiles/slash/left/slash.png';
    }),

    new Promise((resolve, reject) => {
        projectilesImages.slash['right'].onload = resolve;
        projectilesImages.slash['right'].onerror = reject;
        projectilesImages.slash['right'].src = '../media/projectiles/slash/right/slash.png';
    }),

    // AK bullet
    new Promise((resolve, reject) => {
        projectilesImages.bulletAK['left'].onload = resolve;
        projectilesImages.bulletAK['left'].onerror = reject;
        projectilesImages.bulletAK['left'].src = '../media/projectiles/bullet-AK/left/bullet-AK.png';
    }),

    new Promise((resolve, reject) => {
        projectilesImages.bulletAK['right'].onload = resolve;
        projectilesImages.bulletAK['right'].onerror = reject;
        projectilesImages.bulletAK['right'].src = '../media/projectiles/bullet-AK/right/bullet-AK.png';
    }),

    // bullet gun
    new Promise((resolve, reject) => {
        projectilesImages.bulletGun['left'].onload = resolve;
        projectilesImages.bulletGun['left'].onerror = reject;
        projectilesImages.bulletGun['left'].src = '../media/projectiles/bullet-gun/left/bullet-gun.png';
    }),

    new Promise((resolve, reject) => {
        projectilesImages.bulletGun['right'].onload = resolve;
        projectilesImages.bulletGun['right'].onerror = reject;
        projectilesImages.bulletGun['right'].src = '../media/projectiles/bullet-gun/right/bullet-gun.png';
    }),



];

players.forEach(player => {
    assets.push(
        new Promise((resolve, reject) => {
            player.images['left'][0].onload = resolve;
            player.images['left'][0].onerror = reject;
            player.images['left'][0].src = player.imagePath + '/left/standing.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][1].onload = resolve;
            player.images['left'][1].onerror = reject;
            player.images['left'][1].src = player.imagePath + '/left/walking1.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][2].onload = resolve;
            player.images['left'][2].onerror = reject;
            player.images['left'][2].src = player.imagePath + '/left/walking2.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][3].onload = resolve;
            player.images['left'][3].onerror = reject;
            player.images['left'][3].src = player.imagePath + '/left/walking3.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][4].onload = resolve;
            player.images['left'][4].onerror = reject;
            player.images['left'][4].src = player.imagePath + '/left/walking4.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][5].onload = resolve;
            player.images['left'][5].onerror = reject;
            player.images['left'][5].src = player.imagePath + '/left/walking5.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][6].onload = resolve;
            player.images['left'][6].onerror = reject;
            player.images['left'][6].src = player.imagePath + '/left/dead.png';
        }),
    );
});


players.forEach(player => {
    assets.push(
        new Promise((resolve, reject) => {
            player.images['left'][7][0].onload = resolve;
            player.images['left'][7][0].onerror = reject;
            player.images['left'][7][0].src = player.imagePath + '/left/angry/standing.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][7][1].onload = resolve;
            player.images['left'][7][1].onerror = reject;
            player.images['left'][7][1].src = player.imagePath + '/left/angry/walking1.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][7][2].onload = resolve;
            player.images['left'][7][2].onerror = reject;
            player.images['left'][7][2].src = player.imagePath + '/left/angry/walking2.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][7][3].onload = resolve;
            player.images['left'][7][3].onerror = reject;
            player.images['left'][7][3].src = player.imagePath + '/left/angry/walking3.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][7][4].onload = resolve;
            player.images['left'][7][4].onerror = reject;
            player.images['left'][7][4].src = player.imagePath + '/left/angry/walking4.png';
        }),

        new Promise((resolve, reject) => {
            player.images['left'][7][5].onload = resolve;
            player.images['left'][7][5].onerror = reject;
            player.images['left'][7][5].src = player.imagePath + '/left/angry/walking5.png';
        }),
    );
});

players.forEach(player => {
    assets.push(
        new Promise((resolve, reject) => {
            player.images['right'][0].onload = resolve;
            player.images['right'][0].onerror = reject;
            player.images['right'][0].src = player.imagePath + '/right/standing.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][1].onload = resolve;
            player.images['right'][1].onerror = reject;
            player.images['right'][1].src = player.imagePath + '/right/walking1.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][2].onload = resolve;
            player.images['right'][2].onerror = reject;
            player.images['right'][2].src = player.imagePath + '/right/walking2.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][3].onload = resolve;
            player.images['right'][3].onerror = reject;
            player.images['right'][3].src = player.imagePath + '/right/walking3.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][4].onload = resolve;
            player.images['right'][4].onerror = reject;
            player.images['right'][4].src = player.imagePath + '/right/walking4.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][5].onload = resolve;
            player.images['right'][5].onerror = reject;
            player.images['right'][5].src = player.imagePath + '/right/walking5.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][6].onload = resolve;
            player.images['right'][6].onerror = reject;
            player.images['right'][6].src = player.imagePath + '/right/dead.png';
        }),

    );
});


players.forEach(player => {
    assets.push(
        new Promise((resolve, reject) => {
            player.images['right'][7][0].onload = resolve;
            player.images['right'][7][0].onerror = reject;
            player.images['right'][7][0].src = player.imagePath + '/right/angry/standing.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][7][1].onload = resolve;
            player.images['right'][7][1].onerror = reject;
            player.images['right'][7][1].src = player.imagePath + '/right/angry/walking1.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][7][2].onload = resolve;
            player.images['right'][7][2].onerror = reject;
            player.images['right'][7][2].src = player.imagePath + '/right/angry/walking2.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][7][3].onload = resolve;
            player.images['right'][7][3].onerror = reject;
            player.images['right'][7][3].src = player.imagePath + '/right/angry/walking3.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][7][4].onload = resolve;
            player.images['right'][7][4].onerror = reject;
            player.images['right'][7][4].src = player.imagePath + '/right/angry/walking4.png';
        }),

        new Promise((resolve, reject) => {
            player.images['right'][7][5].onload = resolve;
            player.images['right'][7][5].onerror = reject;
            player.images['right'][7][5].src = player.imagePath + '/right/angry/walking5.png';
        }),

    );
});

projectilesImages.claw['left'].forEach((image, i) => {
    assets.push(
        new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
            image.src = `../media/projectiles/claw/left/${i + 1}.png`;
        })
    );
});

projectilesImages.claw['right'].forEach((image, i) => {
    assets.push(
        new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
            image.src = `../media/projectiles/claw/right/${i + 1}.png`;
        })
    );
});

// This promis is going to wait for all the media in the assets array to load, then satrt excuting what's 
//  inside the brackets. If the game started without waiting for assets to properly load it may not draw or play
//  some media
Promise.all(assets).then(() => {
    startGame();
});

// user input
window.addEventListener('keydown', ({ key }) => {
    // player1
    switch(key) {
        case 'ArrowUp':
            players[0].junmp();
            break;
        case 'ArrowLeft':
            players[0].state = 'moving-left';
            break;
        case 'ArrowRight':
            players[0].state = 'moving-right';
            break;
        case '\\':
            players[0].attack();
            break;
    }
    // player2
    switch(key) {
        case 'w':
            players[1].junmp();
            break;
        case 'a':
            players[1].state = 'moving-left';
            break;
        case 'd':
            players[1].state = 'moving-right';
            break;
        case '`':
            players[1].attack();
            break;
    }
});

window.addEventListener('keyup', ({ key }) => {
    // player1
        switch(key) {
            case 'ArrowLeft':
                if(players[0].state == 'moving-left') {
                    players[0].state = 'standing';
                }
                break;

            case 'ArrowRight':
                if(players[0].state == 'moving-right') {
                    players[0].state = 'standing';
                }    
                break;
        }

    // player2
        switch(key) {
            case 'a':
                if(players[1].state == 'moving-left') {
                    players[1].state = 'standing';
                }
                break;

            case 'd':
                if(players[1].state == 'moving-right') {
                    players[1].state = 'standing';
                }    
                break;
        }
});


