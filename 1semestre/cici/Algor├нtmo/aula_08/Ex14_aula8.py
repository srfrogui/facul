print('algoritmo que mostre a tabuada no numero que receber')
num = int(input('Digite um numero: '))
for i in range(1, 11):
    print(f'{num} * {i} = {num*i}')
    i += 1
