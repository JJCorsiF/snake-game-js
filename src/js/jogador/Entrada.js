import { Posicao } from '../Posicao.js';

const direcaoParaCima = new Posicao(0, -1);
const direcaoParaBaixo = new Posicao(0, 1);
const direcaoParaAEsquerda = new Posicao(-1, 0);
const direcaoParaADireita = new Posicao(1, 0);

const direcaoInicial = new Posicao(0, 0);

class Entrada {
	constructor(emissorDeEventos) {
		this.ultimaDirecao = direcaoInicial;
		this.direcao = this.ultimaDirecao;
		this.adicionarListener(window);
		
		this.emissorDeEventos = emissorDeEventos;
	}

	adicionarListener(elemento = window) {
		const eu = this;
		elemento.addEventListener('keydown', (evento) => {
			let novaDirecao = eu.getUltimaDirecao();
			
			switch (evento.key) {
				case 'ArrowUp':
					if (eu.verificarSePodeMoverVerticalmente()) {
						break;
					}

					novaDirecao = direcaoParaCima;
					this.emissorDeEventos.publish('jogador apertou um botão', {
						botaoApertado: evento.key,
						direcao: novaDirecao,
					});
					break;
				case 'ArrowDown':
					if (eu.verificarSePodeMoverVerticalmente()) {
						break;
					}

					novaDirecao = direcaoParaBaixo;
					this.emissorDeEventos.publish('jogador apertou um botão', {
						botaoApertado: evento.key,
						direcao: novaDirecao,
					});
					break;
				case 'ArrowLeft':
					if (eu.verificarSePodeMoverHorizontalmente()) {
						break;
					}

					novaDirecao = direcaoParaAEsquerda;
					this.emissorDeEventos.publish('jogador apertou um botão', {
						botaoApertado: evento.key,
						direcao: novaDirecao,
					});
					break;
				case 'ArrowRight':
					if (eu.verificarSePodeMoverHorizontalmente()) {
						break;
					}

					novaDirecao = direcaoParaADireita;
					this.emissorDeEventos.publish('jogador apertou um botão', {
						botaoApertado: evento.key,
						direcao: novaDirecao,
					});
					break;
				default:
					break;
			}

			eu.setUltimaDirecao(novaDirecao);
			eu.setDirecao(novaDirecao);
		});
	}

	verificarSePodeMoverHorizontalmente() {
		return this.ultimaDirecao.getX() !== 0;
	}

	verificarSePodeMoverVerticalmente() {
		return this.ultimaDirecao.getY() !== 0;
	}

	getDirecao() {
		return this.direcao;
	}

	getUltimaDirecao() {
		return this.ultimaDirecao;
	}

	setDirecao(novaDirecao) {
		this.novaDirecao = novaDirecao;
	}

	setUltimaDirecao(ultimaDirecao) {
		this.ultimaDirecao = ultimaDirecao;
	}
}

export { Entrada };