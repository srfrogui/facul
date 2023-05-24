listaB = []
listaA = []
i = 0
xis = int(input(f'Digite o valor X: '))
for loop in range(5):
    num = int(input(f'Digite {loop+1}/6 numeros: '))
    listaA.append(num)
    if num > xis: listaB.append(num)

print('lista B:')
for b in listaB:
    print(f'{b}')
