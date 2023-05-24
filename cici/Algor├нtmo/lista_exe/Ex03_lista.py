lista = []
for loop in range(4):
    num = float(input(f'Digite {loop+1}/4 numeros: '))
    lista.append(num)
print(f'numeros: {lista}\nmedia: {sum(lista)/len(lista):.2f}')
