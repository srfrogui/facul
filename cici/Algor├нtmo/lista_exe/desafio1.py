alunos = []  

while True:

    nome = input("Digite o nome do aluno (ou 'fim' para encerrar): ")

    if nome.lower() == 'fim':

        break

    

    nota = float(input("Digite a nota do aluno: "))

    alunos.append((nome, nota))

if alunos:


    soma = 0

    for aluno in alunos:

        soma += aluno[1]

    media = soma / len(alunos)

    maior_nota = alunos[0][1]

    aluno_maior_nota = alunos[0][0]

    for aluno in alunos:

        if aluno[1] > maior_nota:

            maior_nota = aluno[1]

            aluno_maior_nota = aluno[0]


    menor_nota = alunos[0][1]

    aluno_menor_nota = alunos[0][0]

    for aluno in alunos:

        if aluno[1] < menor_nota:

            menor_nota = aluno[1]

            aluno_menor_nota = aluno[0]

    # Mostra os resultados

    print("Média das notas:", media)

    print("Aluno com a maior nota:", aluno_maior_nota)

    print("Aluno com a menor nota:", aluno_menor_nota)

else:

    print("Nenhum aluno registrado.")

