algoritmo "receba cargo"
// Função :
// Autor :    omar
// Data : 02/03/2023
// Seção de Declarações 
var
   
   num:inteiro
   
inicio

   escreva ("digite o numero correspondente ao seu cargo")
   leia (num)
   
    se (num = 1) entao
        escreva ("Escrituario")
        senao
        
        se (num = 2) entao
            escreva ("Secretaria")
            senao
            
            se (num = 3) entao
                escreva ("Caixa")
                senao
                
                se (num = 4) entao
                    escreva("Gerente")
                    senao
                    
                    se (num = 5) entao
                        escreva ("Diretor")
                        senao
                        escreva ("digite um numero valido")
                    fimse
                fimse
            fimse
        fimse
    fimse
fimalgoritmo