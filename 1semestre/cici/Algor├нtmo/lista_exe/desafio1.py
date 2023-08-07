alunos = []  # Lista para armazenar os dados dos alunos

while True:

    nome = input("Digite o nome do aluno (ou 'fim' para encerrar): ")

    if nome.lower() == 'fim':

        break

    

    nota = float(input("Digite a nota do aluno: "))

    alunos.append((nome, nota))

if alunos:

    media = sum(aluno[1] for aluno in alunos) / len(alunos)

    aluno_maior_nota = max(alunos, key=lambda x: x[1])[0]

    aluno_menor_nota = min(alunos, key=lambda x: x[1])[0]

    print("Média das notas:", media)

    print("Aluno com a maior nota:", aluno_maior_nota)

    print("Aluno com a menor nota:", aluno_menor_nota)

else:

    print("Nenhum aluno registrado.")
