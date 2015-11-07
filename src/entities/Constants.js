export default {
  enemy: {
    skeleton: {
      heartType: 0,
      numJumps: 1,
      maxHealth: 10,
      minSpeed: 5,
      maxSpeed: 35
    },
    soldier: {
      heartType: 1,
      numJumps: 1,
      maxHealth: 20,
      minSpeed: 60,
      maxSpeed: 100
    },
    fly: {
      heartType: 2,
      numJumps: 1,
      maxHealth: 10,
      minSpeed: 135,
      maxSpeed: 305
    },
    helmet: {
      heartType: 3,
      numJumps: 2,
      maxHealth: 30,
      minSpeed: 5,
      maxSpeed: 45
    }
  },
  bow: {
    minMax: {
      power: [0.1, 10],
      radius: [0.5, 10],
      speed: [50, 1000],
      shell: [1, 30],
      slow: [1, 15],
      rate: [10, 3000],
      push: [0, 100],
      range: [5, 2000],
      pierce: [1, 100]
    },
    base: {
    	type: 'white', // color of arrow
    	size: 1.5, // the scale of the bullet
    	power: 1, // the amount of damage the bullets do
    	radius: 1, // the size of the explosion the arrow makes
    	speed: 200, // the speed that the bullets move
    	rate: 1000, // the amount milliseconds between firing
    	slow: 15, // the amount a hit devides the enemy speed
    	shell: 1, // the amount of bullets fired per shot
    	range: 200, // how far bullets will travel
    	pierce: 1, // the amount of enemies a bullet can hit before dying
    	push: 20,
    	spread: {
    		x:20,
    		y:20
    	}, // the amount that the bullets deviate up/down
    	size: 1,
    	callback: () => {}
    },
    red: (r) => {
      return {
      	type: 'red',
      	size: 0.28 * r,
      	power: 2 * r,
      	radius: 0.5 * r,
      	speed: -5 * r,
      	rate: 90 * r,
      	push: 10 * r,
      	range: 4 * r,
      	spread: {
      		x: 3 * r,
      		y: 0.2 * r
      	},
      	pierce: Math.floor(2 * r)+1
      }
    },
    yellow: (y) => {
      return {
    		type: 'yellow',
    		speed: 12 * y,
    		rate: 50 + Math.pow(16 - y, 2),
    		radius: 0.02 * y,
    		range: -7 * y,
    		slow: 1,
    		spread: {
    			x: 5 * y,
    			y: 0.1 * y
    	   }
      }
    },
    blue: (b) => {
      return {
    		type: 'blue',
    		power: b/2,
    		size: -0.07 * b,
    		radius: -0.01 * b,
    		speed: 5 * b,
    		shell: Math.ceil(1.2 * b),
    		rate: 15 * b,
    		range: -2 * b,
    		spread: {
    			x: 3 * b,
    			y: 10 * b
    		},
    		pierce: 2 * b
      }
  	},
    white: (r, y, b) => {
      return {
    		type: 'white',
    		size: r/4 - b/20,
    		power: r*4 - b + y*2,
    		radius: r/2.5 - y/2 - b/2,
    		speed: r*3 + y*20 - b,
    		shell: b/2,
    		slow: 1,
    		rate: r*4 - y*100 + b*4,
    		range: r*3 - y*10 - b*10,
    		spread: {
    			x: r*2 + b*2,
    			y: r*2 + b*1.5
    		},
  		  pierce: r*2 - b*2
      }
  	},
  	purple: {
  	  type: 'purple'
  	},
  	green: {
  	  type: 'green'
  	},
  	orange: (r, y) => {
      return {
        type: 'orange',
        power: 3 + r*2,
        radius: 0,
        slow: 1 + r*.2,
        speed: 200,
        rate: 50,
        spread: {
         x: 0,
         y: 0
        },
        size: {
         x: 60,
         y: 1 + r/3
        },
        range: 0,
        pierce: 100,
        callback: (bullet) => {
         bullet.body.width = 1000
         bullet.anchor.setTo(1, 0.5)
        }
      }
    }
  }
}
