class Map_object {
    constructor(xpos, ypos, width, height) {
        this.width = width;
        this.height = height;
        this.pos = {
            left: xpos,
            top: ypos,
            right: xpos + width,
            bottom: ypos + height
        };
    }
}

class Player {
    // privite variables
    #speed;
    #junmpHeight;
    #blockRight;
    #blockLeft;
    #frameCounterLeft;
    #frameCounterRight;

    constructor(xpos, ypos, duckType) {
        this.#speed = percentOfScreenX(0.005);
        this.#junmpHeight = percentOfScreenY(-0.036);

        this.tempFrameCounter = 0;

        this.imagePath = '../media/characters/' + duckType;
        this.images = {
            'left': [
                new Image(), // -> standing
                new Image(), // -> walking frame number 1...
                new Image(),
                new Image(),
                new Image(),
                new Image(),
            ],
            'right': [
                new Image(),
                new Image(),
                new Image(),
                new Image(),
                new Image(),
                new Image(),
            ]
        };

        this.#frameCounterLeft = 1;
        this.#frameCounterRight = 1;

        this.#blockRight = false;
        this.#blockLeft

        this.onGround = true;
        this.direction = 'left';
        this.state = 'standing';

        this.width = percentOfScreenX(0.03);
        this.height = percentOfScreenY(0.07);
        this.pos = {
            left: xpos,
            top: ypos,
            right: xpos + this.width,
            bottom: ypos + this.height,
        };
        // velocity
        this.vel = {
            x: 0,
            y: 0,
        };
    }

    draw() {
        let image;
        if(!this.onGround) {
            image = this.images[this.direction][0];
            this.#frameCounterLeft = 1;
            this.#frameCounterRight = 1;
        } else {
            if (this.state === 'standing') {
                image = this.images[this.direction][0];
            }
            else if (this.direction === 'left') {
                image = this.images[this.direction][this.#frameCounterLeft];
            } else {
                image = this.images[this.direction][this.#frameCounterRight];
            }
        }
        ctx.drawImage(image, this.pos.left, this.pos.top, this.width, this.height);
    }

    junmp() {
        if(this.onGround) {
            this.vel.y = this.#junmpHeight;
        }
    }
    
    updatePos() {
        this.#checkCollitions();
        this.#updateOnGround();
        this.#gravity();
        this.#movePlayer();
    }

    #moveRight() {
        this.#frameCounterLeft = 1;
        if (this.tempFrameCounter++ > 2) {
            this.#frameCounterRight++;
            this.tempFrameCounter = 0;
        }
        if (this.#frameCounterRight === 5) this.#frameCounterRight = 1;
        this.direction = 'right';
        if (this.pos.right < canvas.width){
            if (this.#blockRight) {
                this.#blockRight = false;
            } else {
                this.vel.x = this.#speed;
            }
        }
    }

    #moveLeft() {
        this.#frameCounterRight = 1;
        if (this.tempFrameCounter++ > 2) {
            this.#frameCounterLeft++;
            this.tempFrameCounter = 0;
        }
        if (this.#frameCounterLeft === 5) this.#frameCounterLeft = 1;
        this.direction = 'left';
        if (this.pos.left > 0) {
            if (this.#blockLeft) {
                this.#blockLeft = false;
            } else {
                this.vel.x = this.#speed * -1;
            }
        }
    }

    #stop() {
        this.vel.x = 0;
    }

    #updateOnGround() {
        // if player is standing on one of the platforms
        // .some() takes a function, and excute that function on each one of the array elements
        // if at least one returns true, .some will return true
        this.onGround = selectedMap.platforms.some((platform) => {
            const xCollition = this.pos.right > platform.pos.left && this.pos.left < platform.pos.right;
            if ((this.pos.bottom >= platform.pos.top && this.pos.top < platform.pos.bottom) && xCollition) return true;
        });
    }

    #checkCollitions() {
        // boundries collition
        if (this.pos.top + this.vel.y < 0) {
            this.pos.top = 0;
            this.pos.bottom = this.pos.top + this.height;
            this.vel.y = 0;
        }

        if (this.pos.left + this.vel.x < 0) {
            this.pos.left = 0;
            this.pos.right = this.pos.left + this.width;
            this.vel.x = 0;
        }

        if (this.pos.right + this.vel.x > canvas.width) {
            this.pos.right = canvas.width;
            this.pos.left = this.pos.right - this.width;
            this.vel.x = 0;
        }

        // top collition
        selectedMap.platforms.forEach(platform => {
            const xCollition = this.pos.right + this.vel.x >= platform.pos.left && this.pos.left + this.vel.x <= platform.pos.right;
            const yAboutToCollide = this.pos.bottom < platform.pos.top;
            const yCollitionNextFrame = this.pos.bottom + this.vel.y >= platform.pos.top;
            if (xCollition && yAboutToCollide && yCollitionNextFrame) {
                this.pos.bottom = platform.pos.top;
                this.pos.top = this.pos.bottom - this.height;
            }
        });
        // bottom collition
        selectedMap.platforms.forEach(platform => {
            const xCollition = this.pos.right + this.vel.x >= platform.pos.left && this.pos.left + this.vel.x <= platform.pos.right;
            const yAboutToCollide = this.pos.top >= platform.pos.bottom;
            const yCollitionNextFrame = this.pos.top + this.vel.y < platform.pos.bottom;
            if (xCollition && yAboutToCollide && yCollitionNextFrame) {
                this.pos.top = platform.pos.bottom;
                this.pos.bottom = this.pos.top + this.height;
                this.vel.y = 0;
            }
        });

        // right collition
        selectedMap.platforms.forEach(platform => {
            const yCollision = this.pos.bottom + this.vel.y >= platform.pos.top && this.pos.top + this.vel.y <= platform.pos.bottom;
            const xAboutToCollide = this.pos.right <= platform.pos.left;
            const xCollisionNextFrame = this.pos.right + this.vel.x >= platform.pos.left;
            if (yCollision && xAboutToCollide && xCollisionNextFrame) {
                this.pos.right = platform.pos.left;
                this.pos.left = this.pos.right - this.width;
                this.vel.x = 0;
                this.#blockRight = true;
            }
        });

        // left collition
            selectedMap.platforms.forEach(platform => {
                const yCollision = this.pos.bottom + this.vel.y >= platform.pos.top && this.pos.top + this.vel.y <= platform.pos.bottom;
                const xAboutToCollide = this.pos.left >= platform.pos.right;
                const xCollisionNextFrame = this.pos.left + this.vel.x <= platform.pos.right;
                if (yCollision && xAboutToCollide && xCollisionNextFrame) {
                    this.pos.left = platform.pos.right;
                    this.pos.right = this.pos.left + this.width;
                    this.vel.x = 0;
                    this.#blockLeft = true;
                }
        });

    }

    #gravity() {
        const gravity = percentOfScreenY(0.002);
        const maxGravity = percentOfScreenY(0.02);
        if (this.onGround) {
            if (this.vel.y > 0) {
                this.vel.y = 0;
            }
        } else {
            this.vel.y += gravity;
            if (this.vel.y > maxGravity) {
                this.vel.y = maxGravity;
            }
        }
    }

    #movePlayer() {

        switch(this.state) {
            case 'standing':
                this.#stop();
                break;
            case 'moving-right':
                this.#moveRight();
                break;
            case 'moving-left':
                this.#moveLeft();
                break;
        }

        this.pos.left += this.vel.x;
        this.pos.top += this.vel.y;
        this.pos.right = this.pos.left + this.width;
        this.pos.bottom = this.pos.top + this.height;
    }
}