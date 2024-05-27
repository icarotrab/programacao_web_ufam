(function (){
    const pontos = [];
    const maxPontos = 8;
    window.addEventListener("mousemove", (e) => {
        const ponto = document.createElement("div");
        ponto.className = "ponto";
        ponto.style.left = `${e.pageX}px`;
        ponto.style.top = `${e.pageY}px`
        document.body.appendChild(ponto);

        pontos.push(ponto);

        if (pontos.length > maxPontos) {
            const oldPonto = pontos.shift();
            document.body.removeChild(oldPonto);
        }

    });
})();