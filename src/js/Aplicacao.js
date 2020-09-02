import { BarramentoDeEventos } from './eventos/BarramentoDeEventos.js';
import { GameLoop } from './jogo/GameLoop.js';
import { Entrada } from './jogador/Entrada.js';
import { Jogo } from './jogo/Jogo.js';
import { Posicao } from './Posicao.js';
import { Jogador } from './jogador/Jogador.js';
import { Tabuleiro } from './jogo/Tabuleiro.js';

class Aplicacao {
	constructor() {
		
	}

	iniciarAplicacao() {
		const avatarDoTabuleiro = document.getElementById('tabuleiro');
		const larguraPadrao = 21;
		const alturaPadrao = 21;

		const tabuleiro = new Tabuleiro(
			avatarDoTabuleiro,
			larguraPadrao,
			alturaPadrao
		);

		const avatarDoJogador = 'jogador'; //document.getElementById('jogador');
		const direcaoInicial = new Posicao(0, 0);
		const posicaoInicial = new Posicao(11, 11);
		const velocidadeInicial = 5;

		const jogador = new Jogador(
			avatarDoJogador,
			[posicaoInicial],
			direcaoInicial,
			velocidadeInicial
		);

		const emissorDeEventos = new BarramentoDeEventos();

		const input = new Entrada(emissorDeEventos);
		const jogo = new Jogo(tabuleiro, jogador, input, emissorDeEventos);
		const gameLoop = new GameLoop(jogo, emissorDeEventos);

		try {
			window.requestAnimationFrame(function (milisegundosDesdeOInicio) {
				gameLoop.verificarPorAtualizacoes(milisegundosDesdeOInicio);
			});
		} catch (ex) {
			//console.error('An error occurred');
			//throw new Error('An error occurred');
		}
	}
	
	finalizarAplicacao() {
		
	}
}

const aplicacao = new Aplicacao();
aplicacao.iniciarAplicacao();