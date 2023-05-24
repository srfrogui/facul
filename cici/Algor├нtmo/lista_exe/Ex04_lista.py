lista = []

for loop in range(20):
    num = int(input(f'Digite {loop+1}º numero: '))
    lista.append(num)

print(f'maior: {max(lista)} menor: {min(lista)}')
