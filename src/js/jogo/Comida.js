const classeCSS = 'comida';
const numeroDeCaloriasInicial = 1;

class Comida {
	constructor(posicao, calorias = numeroDeCaloriasInicial) {
		this.posicao = posicao;
		this.calorias = calorias;
	}
	
	atualizar() {
		
	}

	renderizar(tabuleiro) {
		const novaDiv = document.createElement('div'); //avatarDaComida
		novaDiv.id = this.avatarDoJogador;
		novaDiv.style.gridRowStart = this.posicao.getY();
		novaDiv.style.gridColumnStart = this.posicao.getX();
		novaDiv.classList.add(classeCSS); //avatarDaComida
		tabuleiro.appendChild(novaDiv);
	}
	
	getCalorias() {
		return this.calorias;
	}
	
	getPosicao() {
		return this.posicao;
	}
	
	setPosicao(posicao) {
		this.posicao = posicao;
	}
}

export { Comida };