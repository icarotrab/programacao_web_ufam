function desenhar() {
    const alturas = [
        parseFloat(document.getElementById('b1').value),
        parseFloat(document.getElementById('b2').value),
        parseFloat(document.getElementById('b3').value),
        parseFloat(document.getElementById('b4').value),
        parseFloat(document.getElementById('b5').value)
    ];

    const largura = parseFloat(document.getElementById('largura').value);
    const grafico = document.getElementById('grafico');

    grafico.innerHTML = '';

    if (isNaN(largura) || largura <= 0) {
        alert('Por favor, informe uma largura válida.');
        return;
    }

    for (let altura of alturas) {
        if (isNaN(altura) || altura <= 0) {
            alert('Por favor, informe alturas válidas para todas as barras.');
            return;
        }
    }

    alturas.forEach(altura => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = `${largura}px`;
        bar.style.height = `${altura}px`;
        grafico.appendChild(bar);
    });
}
