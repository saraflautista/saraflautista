/**
* This is the default playground.
* You should see a bunny spinning in the right preview pane.
* Feel free to use this as a starting point for you own playground!
*/

let height_render = 0;
if(window.innerWidth >= 869 || window.innerHeight > $("#abstract").innerHeight() + $("#content").innerHeight() ){
	height_render = Math.max( window.innerHeight, $("#abstract").innerHeight(), $("#content").innerHeight() )
}else{
	height_render = $("#abstract").innerHeight() + $("#content").innerHeight()
}

// Create our application instance
class Vector{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vec){
        return new Vector(vec.x+x, vec.y+y)
    }
    multiply(alpha){
        return new Vector(vec.x*alpha, vec.y*alpha)
    }
}

function randomInt( num ){
	return Math.floor(Math.random() * num)
}

const textures = [
	// PIXI.Texture.from('note/claveDeSol.svg'),
	// PIXI.Texture.from('note/nota1.png'),
	// PIXI.Texture.from('note/nota2.png'),
	// PIXI.Texture.from('note/bass clef.png'),
	// PIXI.Texture.from('note/sharp.png'),
	PIXI.Texture.from('note/claveDeSol_white.svg'),
	PIXI.Texture.from('note/nota1_white.png'),
	PIXI.Texture.from('note/nota2_white.png'),
	PIXI.Texture.from('note/bass clef_white.png')
	// PIXI.Texture.from('note/sharp_white.png')
]

class MusicSymbol{
	constructor(texture, app, tam, velocity, acceleration){
		this.container = new PIXI.Container();
		app.stage.addChild(this.container);
		this.app = app;
		this.texture = texture;

		this.sprite = new PIXI.Sprite(this.texture);
		this.sprite.anchor.set(0.5);
		this.sprite.x = -app.renderer.width;
		//this.sprite.y = app.renderer.height / 2;
		this.sprite.height = this.sprite.height*tam/this.sprite.width;
		this.sprite.width = tam;
		this.container.addChild(this.sprite);
		
		// var _velocity = velocity / (app.renderer.height / 2);
		this.acceleration = acceleration;
		this._velocity = velocity / (app.renderer.height / 2);
		this.velocity = velocity / (app.renderer.height / 2);
		this.waiting = true;
		this.chance = 0.02;
		// this.container.x = app.renderer.width / 2;
		// this.container.y = app.renderer.height / 2;
	}
	draw(){
		if((this.waiting == true && this.chance >= Math.random()) || this.waiting==false){
			this.waiting = false;
		}else{
			return null;
		}
		
		this.sprite.alpha -= this.velocity;
		this.sprite.rotation += Math.PI * this.velocity;
		
		if(this.sprite.y<(this.app.renderer.height)/2){
			this.sprite.y = (this.app.renderer.height + this.sprite.height);
			this.sprite.alpha = 1;
			this.sprite.x = randomInt(this.app.renderer.width)
			this.waiting = true;
			// this.velocity += this.acceleration;
			this.velocity = this._velocity * (Math.random()*1.1+0.55);
		}else{
			this.sprite.y -= this.velocity * (this.sprite.height+this.app.renderer.height) / 2;
			this.sprite.tint = 0xFFFFFF;
		}
	}
}

  
var app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    // height: height_render,
    // backgroundColor: 0x8bc5ff//0x2c3e50
    backgroundColor: 0x1255B3
});
document.body.appendChild(app.view);

var notes = []
for(var i=0; i<30; i++){
	notes.push( new MusicSymbol(textures[ randomInt( textures.length ) ], app, 60, 5, -4) );
	// notes[i].sprite.tint = 0x00FF00;
	app.stage.addChild(notes[i].sprite);
}

app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    // clave.sprite.rotation -= 0.01 * delta;
	for(var i=0; i<notes.length; i++){
		notes[i].draw()
	}
});

/* Resize event */
// window.addEventListener("resize", function(){
	// $("canvas").height( $("#abstract").innerHeight() + $("#content").innerHeight() )
	// $("canvas").width( window.innerWidth )
// }, false);
