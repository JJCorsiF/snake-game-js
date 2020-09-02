class Aleatorio {
	getNumeroAleatorioEntre(minimo, maximo) {
		return minimo + Math.floor(maximo * Math.random());
	}
}

export { Aleatorio };