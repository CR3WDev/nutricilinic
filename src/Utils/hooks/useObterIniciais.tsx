export const useObterIniciais = (nomeCompleto: string) => {
	let palavras = nomeCompleto.split(' ');
	let primeiroNome = palavras[0];
	let ultimoSobrenome = palavras[palavras.length - 1];
	let inicialPrimeiroNome = primeiroNome.charAt(0).toUpperCase();
	let inicialUltimoSobrenome = ultimoSobrenome.charAt(0).toUpperCase();
	if (palavras.length === 1) return inicialPrimeiroNome;
	return inicialPrimeiroNome + inicialUltimoSobrenome;
};
