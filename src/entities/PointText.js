export default PointText extends Phaser.Text {
	constructor(game, opts) {
		super(10, 10, 50)
		this.kill()
		this.color = 0xffFF00FF
		this.timer = 40
	}

	update() {
		if (this.alive) {
			if (this.timer < 0) {
				this.kill()
				this.timer = 40
			}
			this.y -= 0.5
			this.timer--
		}
	}

	reset(x, y) {
		super(x, y)
		this.timer = 40
	}
}
