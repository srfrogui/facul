lista = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
linha = '-'*40
# exibir as seguintes lista, derivadas da lista acima:
print(linha)
# a) intervalo de 1 a 9
print('intervalo de 1 a 9')
print(lista[1:10])
print(linha)
# b) intervalo de 8 a 13
print('intervalo de 8 a 13')
print(lista[8:14])
print(linha)
# c) numero par
print('numeros pares')
print(lista[0:15:2])
print(linha)
# d) numero impares
print('numeros impares')
print(lista[1:15:2])
print(linha)
# e) todos os multiplos de 2, 3 e 4
print (' e) todos os multiplos de 2, 3 e 4')
for i in lista:
    if i % 2 == 0 and i % 3 == 0 and i % 4 == 0:
        print(i)
print(linha)

# f) lista reversa
print('lista reversa')
lista.sort(reverse=True)
print(lista)

#desfazendo reversidade
lista.sort(reverse=False)
print(linha)
      

print('Soma do intervalo de 10 a 15')
print(sum(lista[10:16]))
print(linha)
print('Uma lista com um novo elemento')
lista.append('sexo')
print(lista)
print(linha)
# Substituir o elemento com índice 6
print(f'print(antes do comando ) elemento 6: {lista[6]}')
lista[6] = 8
print(f'print(depois do comando ) elemento 6: {lista[6]}')
print(linha)