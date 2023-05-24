print('algoritmo que imprimi umonte de coisa')
#loop 5x
for i in range(5):
    #entrada
    print('===================-=========================')
    puni = float(input('Digite o preco unitario: '))
    ori = int(input('-=-=-=-=-=-=-=-=-=-=-=-=-\n|\t1 - EUA\t\t|\n|\t2 - MEXICO\t|\n|\t3 - Outros\t|\n-=-=-=-=-=-=-=-=-=-=-=-=-\nDigite o pais de origem: '))
    tra = input('-=-=-=-=-=-=-=-=-=-=-=-=-\n|\tT - TERRESTRE\t|\n|\tF - FLUVIAL\t|\n|\tA - AEREO\t|\n-=-=-=-=-=-=-=-=-=-=-=-=-\nDigite o meio de transporte: ').upper()
    carp = input('-=-=-=-=-=-=-=-=-=-=-=-=-\n|\tS - SIM\t\t|\n|\tN - NAO\t\t|\n-=-=-=-=-=-=-=-=-=-=-=-=-\nDigite se a carga é perigosa: ').upper()
    #verificacao

    #processo
    imposto = (puni*0.05)+puni if puni <= 100 else puni*0.1
    trans = 50 if carp == 'S' and ori == 1 else 35 if ori == 2 else 24 if carp == 'S' and ori == 3 else 12 if carp == 'N' and ori == 1 else 60
    seguro = puni*0.5 if ori == 2 and tra == 'A' else 0
    #apresentacao
    print('----------------------------------------------')
    print(f'Preco UNITARIO: \tR${puni:.2f}')
    print(f'Valor do IMPOSTO: \tR${imposto+puni:.2f}')
    print(f'Valor do TRANSPORTE: \tR${trans:.2f}')
    print(f'Desconto do Seguro: \tR${seguro:.2f}')
    print(f'Preco final: \t\tR${puni+(imposto+puni)+trans-seguro:.2f}')