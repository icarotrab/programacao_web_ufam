class IntegerSet {
    constructor(numMax) {
        this.numMax = numMax;
        this.lista = new Array(numMax + 1).fill(false);
    }

    insercao(num) {
        if (num >= 0 && num <= this.numMax) {
            this.lista[num] = true;
        }
    }

    exclusao(num) {
        if (num >= 0 && num <= this.numMax) {
            this.lista[num] = false;
        }
    }

    uniao(outroSet) {
        const resultado = new IntegerSet(this.numMax);
        for (let i = 0; i <= this.numMax; i++) {
            resultado.lista[i] = this.lista[i] || outroSet.lista[i];
        }
        return resultado;
    }

    intersecao(outroSet) {
        const resultado = new IntegerSet(this.numMax);
        for (let i = 0; i <= this.numMax; i++) {
            resultado.lista[i] = this.lista[i] && outroSet.lista[i];
        }
        return resultado;
    }

    diferenca(outroSet) {
        const resultado = new IntegerSet(this.numMax);
        for (let i = 0; i <= this.numMax; i++) {
            resultado.lista[i] = this.lista[i] && !outroSet.lista[i];
        }
        return resultado;
    }

    toString() {
        return this.lista
            .map((val, idx) => (val ? idx : null))
            .filter(val => val !== null)
            .toString();
    }
}



// Criando dois objetos
const set1 = new IntegerSet(10);
const set2 = new IntegerSet(10);

// Inserindo 
set1.insercao(1);
set1.insercao(3);
set1.insercao(5);

set2.insercao(3);
set2.insercao(4);
set2.insercao(5);

console.log("Set1:", set1.toString()); 
console.log("Set2:", set2.toString()); 

// União
const uniaoSet = set1.uniao(set2);
console.log("União:", uniaoSet.toString()); 

// Interseção
const intersecaoSet = set1.intersecao(set2);
console.log("Interseção:", intersecaoSet.toString()); 

// Diferença
const diferencaSet = set1.diferenca(set2);
console.log("Diferença (Set1 - Set2):", diferencaSet.toString()); 
