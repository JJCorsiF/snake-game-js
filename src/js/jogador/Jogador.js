// import { Posicao } from './Posicao.js';

const classeCSS = 'jogador';
// const direcaoInicial = new Posicao(0, 0);
// const posicaoInicial = new Posicao(11, 11);
// const velocidadeInicial = 5;

class Jogador {
	constructor(avatarDoJogador, corpo, direcao, velocidade) {
		this.avatarDoJogador = avatarDoJogador;
		this.corpo = corpo;
		this.direcao = direcao;
		this.velocidade = velocidade;
	}

	atualizar() {
		if (this.velocidade <= 0) {
			return;
		}

		for (let i = this.corpo.length - 2; i >= 0; i--) {
			this.corpo[i + 1] = this.corpo[i].criarCopia();
			// new Posicao(
			// 	this.corpo[i].getX(),
			// 	this.corpo[i].getY()
			// );
		}

		this.getPosicaoDaCabeca().adicionar(this.direcao);
	}

	estaNaPosicao(posicao, { ignorarACabeca = false } = {}) {
		const _posicao = posicao;
		return this.corpo.some((segmento, indice) => {
			if (ignorarACabeca && indice === 0) {
				return false;
			}
			
			return segmento.eIgualA(_posicao);
		});
	}

	verificarSeColidiuEmSiMesmo() {
		const opcoes = {
			ignorarACabeca: true,
		};
		return this.estaNaPosicao(this.getPosicaoDaCabeca(), opcoes);
	}

	expandir(numeroDeCelulas) {
		for (let i = 0; i < numeroDeCelulas; i++) {
			let copiaDaCauda = this.getPosicaoDaCauda().criarCopia();
			this.corpo.push(copiaDaCauda);
		}
	}

	getPosicaoDaCauda() {
		return this.corpo[this.corpo.length - 1];
	}

	getCorpo() {
		return this.corpo;
	}

	getDirecao() {
		return this.direcao;
	}

	getPosicaoDaCabeca() {
		return this.corpo[0];
	}

	getVelocidade() {
		return this.velocidade;
	}

	renderizar(tabuleiro) {
		this.corpo.forEach((segmento) => {
			const novaDiv = document.createElement('div'); //avatarDoJogador
			novaDiv.id = this.avatarDoJogador;
			novaDiv.style.gridRowStart = segmento.getY();
			novaDiv.style.gridColumnStart = segmento.getX();
			novaDiv.classList.add(classeCSS); //avatarDoJogador
			tabuleiro.appendChild(novaDiv);
		});
	}

	setDirecao(direcao) {
		this.direcao = direcao;
	}
}

export { Jogador };