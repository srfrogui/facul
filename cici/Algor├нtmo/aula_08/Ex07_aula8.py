print('algoritmo que exibe a somatoria dos numeros de 1 a N')
soma = 0
num = int(input('Digite ate que numero sera somado: '))
for i in range(1, num+1):
    soma += i
print(f'somatoria 1 a {num} = {soma}')
