// Sistema de pontuacao de questoes
//     P = {NP - [NTPC - (NPC - NPI)]}/NP
//         Onde:
//             P = Pontuação do candidato (NOTA FINAL)
//             NP = Numero de preposições da questão (TOTAL DE PREPOSIÇÕES DA QUESTÃO [EX: 5 PREPOSICOES AO TOTAL])
//             NTPC = Número total de preposições corretas da questão (TOTAL DE PREPOSIÇÕES CORRETA [EX: 2 PREPOSICOES DE 5 AO TOTAL])
//             NPC = Número de preposições corretas consideradas corretas pelo candidato (TOTAL DE PREPOSIÇÕES ASSINALADAS CORRETAS)
//             NPI = Número de preposições incorretas consideradas pelo candidato (TOTAL DE PREPOSIÇÕES NÃO ASSINALADAS)

            // Ou seja, para obter a pontuação final, deverá ser feito os seguintes cálculos matemáticos:
                // 1º - Subtrair o número de preposições corretas pelas incorretas