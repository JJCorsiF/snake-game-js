class Posicao {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	adicionar(posicao) {
		this.x += posicao.getX();
		this.y += posicao.getY();
		return this.criarCopia();
	}
	
	criarCopia() {
		return new this.constructor(this.x, this.y);
	}
	
	eIgualA(posicao) {
		return (this.x === posicao.x && this.y === posicao.y);
	}
	
	getX() {
		return this.x;
	}
	
	getY() {
		return this.y;
	}
	
	setX(x) {
		this.x = x;
	}
	
	setY(y) {
		this.y = y;
	}
}

export { Posicao };