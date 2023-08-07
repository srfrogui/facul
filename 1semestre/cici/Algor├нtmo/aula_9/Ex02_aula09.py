print('algoritmo  que  simule  o  jogo  de  adivinhação')
tent = 0
j1 = int(input('(Jogador 1) Insira um numero de 1 a 10: '))
j2 = int(input('(jogador 2) Tente adivinhar o numero de 1 a 10 que o jogador 1 escolheu: '))
while j1 != j2:
    j2 = int(input('(jogador 2) Voce Errou! Tente novamente: '))
    tent += 1
print(f'Voce aertou!!\nEm apenas {tent} tentativas.')
