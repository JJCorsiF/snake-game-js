import { Comida } from './Comida.js';

class Jogo {
	constructor(tabuleiro, jogador, input, emissorDeEventos) {
		this.input = input;
		this.jogador = jogador;
		this.tabuleiro = tabuleiro;
		
		const posicaoInicialDaComida = this.gerarNovaPosicaoAleatoriaParaAComida(
			this.jogador,
			this.tabuleiro
		);
		this.comida = new Comida(posicaoInicialDaComida);
		
		this.emissorDeEventos = emissorDeEventos;
		
		const eu = this;
		this.emissorDeEventos.subscribe('jogador alcançou a comida', (data) => {
			console.info('jogador alcançou a comida!');
			const jogador = data.jogador;
			const comida = data.comida;

			jogador.expandir(comida.getCalorias());

			const novaPosicaoDaComida = this.gerarNovaPosicaoAleatoriaParaAComida(
				jogador,
				eu.tabuleiro
			);

			comida.setPosicao(novaPosicaoDaComida);
		});

		this.emissorDeEventos.subscribe('jogador apertou um botão', (data) => {
			const botaoApertado = data.botaoApertado;
			const direcao = data.direcao;
			console.info('jogador apertou o botão ' + botaoApertado + '!');

			this.jogador.setDirecao(direcao);
		});
	}
	
	verificarPorInteracoes() {
		if (this.verificarSeJogadorAlcancouAComida(this.jogador, this.comida)) {
			this.emissorDeEventos.publish('jogador alcançou a comida', {
				jogador: this.jogador,
				comida: this.comida,
			});
			return;
		}
		
		if (this.verificarSeJogadorPerdeuOJogo(this.jogador)) {
			this.emissorDeEventos.publish('jogador perdeu o jogo', {
				jogador: this.jogador,
				comida: this.comida,
			});
		}
	}
	
	verificarSeJogadorAlcancouAComida(jogador, comida) {
		return jogador.estaNaPosicao(comida.getPosicao());
	}
	
	// verificarSeOJogadorColidiuComAParede(jogador) {
	// 	const cabecaDoJogador = jogador.getPosicaoDaCabeca();
		
	// 	return this.tabuleiro.estaForaDoTabuleiro(cabecaDoJogador);
	// }
	
	verificarSeJogadorPerdeuOJogo(jogador) {
		const cabecaDoJogador = jogador.getPosicaoDaCabeca();
		
		return (
			this.tabuleiro.estaForaDoTabuleiro(cabecaDoJogador) ||
			jogador.verificarSeColidiuEmSiMesmo()
		);
	}
	
	getComida() {
		return this.comida;
	}
	
	getJogador() {
		return this.jogador;
	}
	
	gerarNovaPosicaoAleatoriaParaAComida(jogador, tabuleiro) {
		let novaPosicaoDaComida = tabuleiro.getPosicaoAleatoria();

		while (jogador.estaNaPosicao(novaPosicaoDaComida)) {
			novaPosicaoDaComida = tabuleiro.getPosicaoAleatoria();
		}
		
		return novaPosicaoDaComida;
	}
	
	getTabuleiro() {
		return this.tabuleiro;
	}
}

export { Jogo };