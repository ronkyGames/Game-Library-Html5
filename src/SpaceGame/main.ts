// import libraries
import Texture from "./Texture";
import KeyControls from "./controls/KeyControls";
import Baddie from "./elements/Baddie";
import Bullet from "./elements/Bullet";
import Container from "./elements/Container";
import Ship from "./elements/Ship";
import Sprite from "./elements/Sprite";
import Text from "./elements/Text";
import CanvasRenderer from "./renderer/CanvasRenderer";

// TODO: Increase periodically the difficulty
// TODO: Adapt the game to the window size

// Game setup code
const gameWidth = 640;
const gameHeight = 300;
const renderer = new CanvasRenderer(gameWidth, gameHeight);
document.querySelector("#board")!.appendChild(renderer.view);

// Controls objects
const keyControls = new KeyControls();
// Game Objects
const scene = new Container();
// Bullets
const bullets = new Container<Bullet>();
// Bad guys
const baddies = new Container<Baddie>();
// Make a spaceship
const ship = new Ship(gameWidth, gameHeight, keyControls);
// Add the score game object
const score = new Text(
	"score: ",
	{
		font: "20px sans-serif",
		fill: "#8B8994",
		align: "center",
	},
	{ x: gameWidth / 2, y: gameHeight - 30 }
);

// Function game over
const doGameOver = () => {
	scene.add(
		new Text(
			"Game Over",
			{
				font: "30pt sans-serif",
				fill: "#8B8994",
				align: "center",
			},
			{ x: gameWidth / 2, y: 120 }
		)
	);
	scene.remove(ship);
	gameOver = true;
};

// Add everithing to the scene container
scene.add(new Sprite(new Texture("res/images/bg.png")));
scene.add(score);
scene.add(ship);
scene.add(bullets);
scene.add(baddies);

// Game state variables
let lastShot = 0;
let lastSpawn = 0;
let spawnSpeed = 1_000;
let scoreAmount = 0;
let gameOver = false;
//loop setup
let dt = 0;
let last = 0;

function loop(ms: number) {
	requestAnimationFrame(loop);
	// set time variables to use in game logic
	dt = ms - last;
	last = ms;
	// Game Logic Code Here
	if (!gameOver) {
		if (keyControls.action && ms - lastShot > 150) {
			lastShot = ms;
			bullets.add(new Bullet(gameWidth, { x: ship.pos.x + 24, y: ship.pos.y + 16 }));
		}
		if (ms - lastSpawn > spawnSpeed) {
			lastSpawn = ms;
			baddies.add(
				new Baddie(-50 - Math.random() * Math.random() * 100, {
					x: gameWidth,
					y: Math.random() * (gameHeight - 32),
				})
			);
			// Accelerating for the next spawn
			spawnSpeed = spawnSpeed < 100 ? 500 : spawnSpeed * 0.8;
		}
	}
	// Check for collisions
	for (const baddie of baddies.children) {
		for (const bullet of bullets.children) {
			// check distance between baddie and bullet
			if (
				Math.sqrt(
					(baddie.pos.x + 16 - (bullet.pos.x + 8)) ** 2 +
						(baddie.pos.y + 16 - (bullet.pos.y + 8)) ** 2
				) < 24
			) {
				// A hit
				baddie.dead = true;
				bullet.dead = true;
				scoreAmount += Math.floor(ms / 100);
			}
		}
		// check if out of the screen
		if (baddie.pos.x < -32) {
			if (!gameOver) doGameOver();
			baddie.dead = true;
		}
	}
	score.text = `Score: ${scoreAmount}`;
	scene.update(dt);
	// render the main container
	renderer.render(scene);
}
requestAnimationFrame(loop);
