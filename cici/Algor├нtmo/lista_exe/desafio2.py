agenda = []

for _ in range(20):

    nome = input("Digite o nome da pessoa: ")

    telefone = input("Digite o telefone da pessoa: ")

    agenda.append((nome, telefone))

consulta = input("Digite o nome para consultar o telefone: ")

for pessoa in agenda:

    if pessoa[0].lower() == consulta.lower():

        print("Telefone de", pessoa[0] + ":", pessoa[1])

        break

else:

    print("Nome não encontrado na agenda.")

