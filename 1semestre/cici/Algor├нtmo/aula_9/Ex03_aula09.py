print('algoritmo que informa numero de pecas aprovados e reprovaods')
apr = 0
rep = 0
li = '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'
lin = '------------------'
for i in range(1, 401):
    print(f'{li}\n{i}º produto')
    cod = int(input('Digite o numero da peça: '))
    est = int(input("Digite se esta aprovado (1) ou reprovado (0): "))
    while est not in [1, 0]:
        est = int(input(f"{lin}\nTente novamente usando 1 para aprovado e 0 para reprovado\nDigite se esta (1 ou 0): "))
    if est == 1: apr += 1
    else: rep += 1
print(f'APROVADOS: {apr}\nREPROVADOS: {rep}')
