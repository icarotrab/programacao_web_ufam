function calcula(){
    let raioInput = document.getElementById('raio');
    let areaI = document.getElementById('area');
    let compI = document.getElementById('circle');

    let raio = parseFloat(raioInput.value);

    let area = Math.PI * Math.pow(raio,2);
    let comp = 2 * Math.PI * raio;

    areaI.value = area.toFixed(2);
    compI.value = comp.toFixed(2)
}

