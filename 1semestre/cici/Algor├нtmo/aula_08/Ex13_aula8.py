print('algoritmo que recebe a idade de 1000 pessoas e exibe a quantidade de pessoas em cada classe eleitoral')
n_ele = 0
ele = 0
fac = 0
for i in range(1, 1001):
    idad = int(input(f'Digite a idade do {i}º pessoa: '))
    if idad < 16: n_ele += 1
    elif 18 <= idad < 65: ele += 1
    else: fac += 1
print(f'Nao eleitor:\t{n_ele}\nEleitor:\t{ele}\nFacultativo:\t{fac}')
