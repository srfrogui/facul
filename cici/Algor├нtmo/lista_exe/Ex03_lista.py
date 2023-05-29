lista = []
for loop in range(4):
    lista.append(float(input(f'Digite {loop+1}/4 numeros: ')))
print(f'numeros: {lista}\nmedia: {sum(lista)/len(lista):.2f}')
