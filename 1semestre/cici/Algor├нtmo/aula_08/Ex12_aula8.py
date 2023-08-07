print('algoritmo q recebe duas notas de 60 alunos e calcula a media para cala aluno e conta quantos estao aprovados, reprovados e de exame')
passou = 0
exame = 0
reprova = 0
linha = '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
for aluno in range(1, 5):
    print('===============================================')
    n1 = float(input(f'Digite a priteira nota do {aluno}º aluno: \t'))
    n2 = float(input(f'Digimemte a segunda nota do {aluno}º aluno: \t'))
    med = (n1+n2)/2
    print(f'{linha}\n\t\tMedia do {aluno}º aluno: \t{med}\n{linha}')
    if med >= 5: passou += 1
    elif med < 3: reprova += 1
    else: exame += 1
print(f'APROVADOS: {passou}\nREPROVADO: {reprova}\nEXAME: {exame}')
