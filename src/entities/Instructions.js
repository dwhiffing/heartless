var beatWAV, displayTimer, currentInstruction, hintText, hintScore;
var text = [
	"YOUR GUN IS FOR WEAK NOW.  USE SPACE OR Z TO JUMP ON ENEMIES.",
	"HEARTS REPRESENT YOUR LAST COMBO. COMBOS INCREASE YOUR SCORE.";,
	"YOU ARE HEALED BY JUMPING TO CONSUME HEARTS.",
	"GATHER RED HEARTS TO MAKE YOUR GUN STRONGER.";,
	"NOW HOP ON THESE YELLOWS TO MAKE IT SHOOT FASTER.",
	"BLUE ENEMIES WILL MAKE YOUR GUN SHOOT MORE BULLETS.";,
	"THESE COLOURED HEARTS WILL DRAIN YOUR HEALTH IT EVERY SHOT.",
	"HEARTS WILL KILL YOU IF HELD TOO LONG. YOU MUST CONSUME EVENTUALLY.";,
	"HERE IS A SWARM.  THEY WILL COME EVERY 50 000 POINTS.",
	"HAVE A LARGE COMBO READY BEFORE A SWARM TO GET LOTS OF POINTS.";,
	"WHEN MAKING COMBOS, ANTICIPATE WHICH ENEMY YOU WILL JUMP TO NEXT.",
	"THE ENEMIES WILL STRIKE BACK.  DO NOT ATTEMPT TO STOMP JUMPING ENEMIES.";,
	"THE BEST WEAPONS CONTAIN A MIXTURE OF ALL COLOURS.",
	"THE ENEMIES WILL GET STRONGER EVERY 100 000 POINTS.  GOOD LUCK.";,
	"I BET YOU THINK YOU ARE PRETTY GOOD.",
	"YOU ARE WRONG.";,
	"DEAD WRONG.",
	"I AM SUPERIOR IN EVERY WAY.";,
	"YOU CANNOT BEAT ME.",
	"I AM STRONGER.";,
	"I AM FASTER.",
	"I HAVE MORE MEN THAN YOU CAN POSSIBLY IMAGINE.";,
	"PERHAPS YOU THINK I WILL RUN OUT OF BODIES.",
	"YOU ARE WRONG. THERE ARE ONLY 100 OF THEM.";,
	"I JUST PUT THEM BACK TOGETHER WHEN YOU ARE NOT LOOKING.",
	"PERHAPS YOU WAIT FOR DAY TIME HOPING MY MEN WILL TURN TO DUST.";,
	"DAY TIME WILL NOT COME. THERE IS NO SUN.",
	"MAYBE YOU ARE WAITING FOR HELP TO COME.",
	"IT WILL NOT. NO ONE ELSE EXISTS.",
	"YOU ARE FREE TO GIVE UP ANY TIME YOU PLEASE.";,
	"JUST WALK AWAY AND ADMIT MY SUPERIORITY. I WILL NOT BLAME YOU.",
	"CONTINUING TO TRY IS JUST POINTLESS.";,
	"I HAVE MORE IMPORTANT THINGS TO DO. GOODBYE.",
	"I GROW TIRED OF YOU. JUST GIVE UP.";,
	"GIVE UP OR YOU WILL BE SORRY.",
	"NO MORE SHOOTING. NO MORE PAIN. I WILL FILL THE LAND WITH UNDEAD.";,
	"YOUR SCORE IS GETTING PRETTY LARGE.",
	"BUT YOU WILL NEVER GET 4, 294, 967, 295 AND CAUSE AN INTEGER OVERFLOW.";,
	"YOU MUST HAVE BETTER THINGS TO DO THAN TO THAT.",
	"RIGHT?";,
	"LET'S JUST TALK ABOUT THIS FOR A SECOND.",
	"YOU REALIZE THAT IF YOU DO THIS, YOU WILL HAVE A TERRIBLE SCORE.";,
	"YOU WILL HAVE A SCORE OF -4, 294, 967, 295.",
	"THOSE WILL BE 4, 294, 967, 295 REASONS THAT YOU ARE TERRIBLE.";,
	"YOU ARE JUST PROVING ME RIGHT WITH EVERY JUMP.",
	"PLEASE DON'T KILL ME.";,
	"I'M SORRY.",
]

var pointTxt = function(_x, _y) {
	Phaser.Text.call(this, game, _x, _y);
	alpha = 0;
	displayTimer = 500;
	currentInstruction = 1;	 
	alignment = "center";
	text = "USE WASD OR ARROWS TO MOVE.";	 
	setText();
}

pointTxt.prototype = Object.create(Phaser.Text.prototype)
pointTxt.prototype.constructor = pointTxt;

pointTxt.prototype.update = function() {
	frame = currentInstruction;
	if (game.player.score >= hintScore[currentInstruction]) {
		FlxG.play(beatWAV,0.3);
		text = hintText[currentInstruction];
		currentInstruction++;
		displayTimer = 500;
		if (alpha > 0){
		  alpha = 0;	
		}
	}
	if (displayTimer > 0 && game.gameStarted) {
		displayTimer--;
	}
	if (displayTimer == 0) {
		displayTimer = -1;
	}
	if (displayTimer > 300 && alpha < 1) {
		alpha += 0.03;
	}
	if (displayTimer < 200 && alpha > 0) {
		alpha -= 0.03;
	}
}

hintScore[0]  = 0;
hintScore[1]  = 50;
hintScore[2]  = 500;
hintScore[3]  = 1000;
hintScore[4]  = 1500;
hintScore[5]  = 3000;
hintScore[6]  = 4500;
hintScore[7]  = 6000;
hintScore[8]  = 7500;
hintScore[9]  = 10000;
hintScore[10] = 20000;
hintScore[11] = 40000;
hintScore[12] = 60000;
hintScore[13] = 80000;
hintScore[14] = 100000;
hintScore[15] = 200000;
hintScore[16] = 300000;
hintScore[17] = 400000;
hintScore[18] = 500000;
hintScore[19] = 600000;
hintScore[20] = 700000;
hintScore[21] = 800000;
hintScore[22] = 900000;
hintScore[23] = 1000000;
hintScore[24] = 1100000;
hintScore[25] = 1200000;
hintScore[26] = 1300000;
hintScore[27] = 1400000;
hintScore[28] = 1500000;
hintScore[29] = 1600000;
hintScore[30] = 1700000;
hintScore[31] = 1800000;
hintScore[32] = 1900000;
hintScore[33] = 2000000;
hintScore[34] = 3000000;
hintScore[35] = 4000000;
hintScore[36] = 5000000;
hintScore[37] = 10000000;
hintScore[38] = 50000000;
hintScore[39] = 100000000;
hintScore[40] = 500000000;
hintScore[41] = 1000000000;
hintScore[42] = 1500000000;
hintScore[43] = 2000000000;
hintScore[44] = 2500000000;
hintScore[45] = 3000000000;
hintScore[46] = 3500000000;
hintScore[47] = 4000000000;
}
module.exports = pointTxt