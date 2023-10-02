import { makeObservable, observable, action } from 'mobx'

class Store {
    nota = 0;
    notasQ = [0];
    NPC = [];
    NPI = [];
    NTPC = [];

    constructor() {
        makeObservable(this, {
            nota: observable,
            notasQ: observable,
            NPC: observable,
            NPI: observable,
            NTPC: observable,
            calcula: action,
            reseta: action,
        })

    }
    calcula = (NP, gabaritoQ, gabaritoC) => {
        let NumeroPreposicoes = NP
        let gabaritoQuest = gabaritoQ
        let gabaritoCandi = gabaritoC
        let valorNPC = [];
        let valorNPI = [];
        let valorNTPC = [];
        let valorNota = [];
        let notasReunidas = 0;


        function decomporEmPotenciasDeDois(numero) { // Decompoe um numero em potencias de dois, ou seja, se recebermos o parametro (10), a funcao ira decompor o numero em 2 diferentes (08 e 02), pois 08 + 02 = 10
            let potencias = [64, 32, 16, 8, 4, 2, 1];
            let decomposicao = [];
        
            for (let potencia of potencias) {
                if (numero >= potencia) {
                    decomposicao.push(potencia);
                    numero -= potencia;
                }
            }
        
            return decomposicao;
        }

        function intersecaoDeArrays(array1, array2) { // Encontra numeros que PERTENCEM a duas arrays diferentes ao mesmo tempo
            return array1.filter(value => array2.includes(value));
        }
        
        function diferencaDeArrays(array1, array2) { // Encontra numeros que NÃO PERTENCEM a duas arrays diferentes ao mesmo tempo
            return array2.filter(value => !array1.includes(value));
        }

        function calcularNPCeNPIeNTPC(gabaritoQuestao, gabaritoCandidato) {
            for (let q = 0; q < gabaritoQuestao.length; q++) {
                const preposicoesQuestao = decomporEmPotenciasDeDois(gabaritoQuestao[q]);
                const preposicoesCandidato = decomporEmPotenciasDeDois(gabaritoCandidato[q]);
                valorNPC.push(intersecaoDeArrays(preposicoesQuestao, preposicoesCandidato).length)
                valorNPI.push(diferencaDeArrays(preposicoesQuestao, preposicoesCandidato).length)
                valorNTPC.push(decomporEmPotenciasDeDois(gabaritoQuestao[q]).length)
            } 
        }

        function calcularPontuacao(NP, NTPC, NPC, NPI) {

            const valorInicial = 0;

        
                for (let b = 0; b < NP.length; b++) {       
                    if(NPC[b] > NPI[b]) {
                        valorNota.push(parseFloat((((NP[b] - (NTPC[b] - (NPC[b] - NPI[b]))) / NP[b])).toFixed(2)))
                    } else {
                        valorNota.push(0)
                    }
            }
            notasReunidas = parseFloat(valorNota.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                valorInicial
            ));
        }

        // Calculos finais e de nota
        calcularNPCeNPIeNTPC(gabaritoQuest, gabaritoCandi)
        this.NPC = valorNPC;
        this.NPI = valorNPI;
        this.NTPC = valorNTPC;

        calcularPontuacao(NumeroPreposicoes, this.NTPC, this.NPC, this.NPI)
        this.notasQ = (valorNota);
        this.nota = parseFloat(notasReunidas).toFixed(2);
    }

    reseta = () => {
        this.calcula(0, 0, 0)

        this.nota = 0;
        this.notasQ = null;
        this.NPC = null;
        this.NPI = null;
        this.NTPC = null;
    }
}
export default new Store();