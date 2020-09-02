//const taxaDeUpdate = 1;

class GameLoop {
	constructor(jogo, emissorDeEventos) {
		this.jogo = jogo;
		this.comida = this.jogo.getComida();
		this.jogador = this.jogo.getJogador();
		this.tabuleiro = this.jogo.getTabuleiro();
		this.taxaDeUpdate = this.jogador.getVelocidade(); //taxaDeUpdate;
		this.ultimaRenderizacaoOcorreuEm = 0;

		this.emissorDeEventos = emissorDeEventos;

		this.emissorDeEventos.subscribe('jogador perdeu o jogo', (data) => {
			console.info('O jogador perdeu!');
			if (confirm('Game Over. Aperte OK para tentar novamente!')) {
				this.reiniciarLoop();
				return;
			}

			this.pararLoop(); //pauseGame();
		});
	}

	atualizar() {
		this.tabuleiro.atualizar();

		this.comida.atualizar();
		this.jogador.atualizar();

		this.jogo.verificarPorInteracoes();
	}

	pararLoop() {
		//throw new Error();
		this.taxaDeUpdate = 0.0000000000000000000000000000000000000000000000000000000000000000000000000000000000000001;
	}
	
	reiniciarLoop() {
		//window.location = '/';
		window.location.reload(false);
	}

	verificarPorAtualizacoes(milisegundosDesdeOInicio) {
		// if (this.jogo.verificarSeJogadorPerdeuOJogo(this.jogador)) {
		// 	return;
		// }

		const eu = this;
		window.requestAnimationFrame(function (milisegundosDesdeOInicio) {
			eu.verificarPorAtualizacoes(milisegundosDesdeOInicio);
		});

		const segundosDesdeAUltimaRenderizacao =
			(milisegundosDesdeOInicio - this.ultimaRenderizacaoOcorreuEm) / 1000;

		if (
			this.verificarSeDevoRenderizarNovamente(segundosDesdeAUltimaRenderizacao)
		) {
			return;
		}

		console.log(segundosDesdeAUltimaRenderizacao);
		this.ultimaRenderizacaoOcorreuEm = milisegundosDesdeOInicio;

		this.atualizar(); //regras do negócio (jogo)
		this.renderizar(); //renderizar os elementos visuais
	}

	verificarSeDevoRenderizarNovamente(segundosDesdeAUltimaRenderizacao) {
		return segundosDesdeAUltimaRenderizacao < 1 / this.taxaDeUpdate;
	}

	renderizar() {
		this.tabuleiro.renderizar();

		const avatarDoTabuleiro = this.tabuleiro.getAvatarDoTabuleiro();

		this.comida.renderizar(avatarDoTabuleiro);
		this.jogador.renderizar(avatarDoTabuleiro);
	}
}

export { GameLoop };