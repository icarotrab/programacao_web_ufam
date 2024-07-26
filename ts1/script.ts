function calcula(): void {
    const raioInput = document.getElementById('raio') as HTMLInputElement;
    const areaInput = document.getElementById('area') as HTMLInputElement;
    const compInput = document.getElementById('circle') as HTMLInputElement;

    const raio = parseFloat(raioInput.value);

    if (!isNaN(raio)) {
        const area = Math.PI * Math.pow(raio, 2);
        const comp = 2 * Math.PI * raio;

        areaInput.value = area.toFixed(2);
        compInput.value = comp.toFixed(2);
    } else {
        alert('Por favor, insira um número válido.');
    }
}
