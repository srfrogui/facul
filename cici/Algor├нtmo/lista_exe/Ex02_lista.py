lista = []
i = 0

for loop in range(6):
    num = int(input(f'Digite {loop+1}/6 numeros: '))
    lista.append(num)

for nume in lista:
    i+=1
    print(f'em {i}º posicao: {nume}')
    