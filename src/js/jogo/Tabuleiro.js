import { Aleatorio } from './Aleatorio.js';
import { Posicao } from '../Posicao.js';

class Tabuleiro {
	constructor(avatarDoTabuleiro, largura, altura) {
		this.avatarDoTabuleiro = avatarDoTabuleiro;
		this.largura = largura;
		this.altura = altura;
	}
	
	atualizar() {
		
	}
	
	renderizar() {
		this.avatarDoTabuleiro.innerHTML = '';
	}
	
	estaForaDoTabuleiro(posicao) {
		return (
			(posicao.getX() < 1 || posicao.getX() > this.largura) ||
			(posicao.getY() < 1 || posicao.getY() > this.altura)
		);
	}
	
	getPosicaoAleatoria() {
		const aleatorio = new Aleatorio();
		const xAleatorio = aleatorio.getNumeroAleatorioEntre(1, this.largura);
		const yAleatorio = aleatorio.getNumeroAleatorioEntre(1, this.altura);
		return new Posicao(xAleatorio, yAleatorio);
	}
	
	getAvatarDoTabuleiro() {
		return this.avatarDoTabuleiro;
	}

	getAltura() {
		return this.altura;
	}

	getLargura() {
		return this.largura;
	}
}

export { Tabuleiro };