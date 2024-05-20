let jogo = {
    '1': '2',
    '2': '3',
    '3': '1'
}

function jogar(escolhaUsuario, escolhaComputador) {
    if (escolhaUsuario === escolhaComputador) {
        return 'Empate!';
    } else if (jogo[escolhaUsuario] === escolhaComputador) {
        return 'Você venceu!';
    } else {
        return 'Você perdeu!';
    }
}

function traduzirEscolha(escolha) {
    switch (escolha) {
        case 1:
            return 'papel';
        case 2:
            return 'pedra';
        case 3:
            return 'tesoura';
        default:
            return 'inválido';
    }
}

// INICIANDO JOGO

resultado = '';

while(resultado != 'Você perdeu!'){
    console.log("Escolha sua jogada: ");
    console.log("1 - papel");
    console.log("2 - pedra");
    console.log("3 - tesoura");

    var jogador = parseInt(prompt());
    var cpu = Math.floor(Math.random() * 3) + 1;

    console.log(`Você escolheu: ${traduzirEscolha(jogador)}`);
    console.log(`Computador escolheu: ${traduzirEscolha(cpu)}`);
    
    resultado = jogar(jogador.toString(),cpu.toString());
    console.log(resultado);
}

