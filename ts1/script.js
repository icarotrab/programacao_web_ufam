function calcula() {
    var raioInput = document.getElementById('raio');
    var areaInput = document.getElementById('area');
    var compInput = document.getElementById('circle');
    var raio = parseFloat(raioInput.value);
    if (!isNaN(raio)) {
        var area = Math.PI * Math.pow(raio, 2);
        var comp = 2 * Math.PI * raio;
        areaInput.value = area.toFixed(2);
        compInput.value = comp.toFixed(2);
    }
    else {
        alert('Por favor, insira um número válido.');
    }
}
