lista = []
i = 0

for loop in range(5):
    num = int(input(f'Digite {loop+1}/6 numeros: '))
    # num = 0 if num < 0 else num #------- ou -------
    lista.append(num)

for valore in lista:
    i += 1
    valore = 0 if valore < 0 else valore #------ ou -------
    print(f'{i}º numero: {valore}')
    