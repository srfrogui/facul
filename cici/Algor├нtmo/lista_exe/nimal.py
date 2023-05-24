listaB = []
listaA = []
print('cpy lista a para lista b ao quadrado')
for loop in range(15):
    num = int(input(f'Digite {loop+1}/15 numeros: '))
    listaA.append(num)
for num in listaA:
    listaB.append(num*num)
print(listaA)
print(f'listaB: {listaB}')
