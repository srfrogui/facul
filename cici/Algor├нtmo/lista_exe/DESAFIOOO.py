import os
sistema = input("\n\n\n\t\tSeu sistema é WINDOWS? S/N: ").upper()
limpa = 'cls' if sistema == 'S' else 'clear' #fiz esse programa usando linux 
os.system(limpa)
li = '~'*40
#se criar um def para fazer limpar a tela e escrever as linhas mas nao sei se melhora o desempenho ou coisa do tipo 

#agenda pre criada para agilizar os testes
agenda = [
    {'nome': 'João', 'telefone': '12345632', 'sexo': 'Masculino', 'endereco': 'Rua A'},
    {'nome': 'Maria', 'telefone': '78901232', 'sexo': 'Feminino', 'endereco': 'Rua B'},
    {'nome': 'João', 'telefone': '34567832', 'sexo': 'Masculino', 'endereco': 'Rua C'},
    {'nome': 'Ana', 'telefone': '90123423', 'sexo': 'Feminino', 'endereco': 'Rua D'},
    {'nome': 'Omar', 'telefone': '11231102450', 'sexo': 'Masculino', 'endereco': 'NaTuaMente'},
    {'nome': 'Fernando', 'telefone': '11221101152', 'sexo': 'Masculino', 'endereco': 'Japao'},
    {'nome': 'Arthur', 'telefone': '11231100847', 'sexo': 'Masculino', 'endereco': 'Youtube:Thurg_'},
    {'nome': 'Omar', 'telefone': '+55 11 92929-2929', 'sexo': 'Masculino', 'endereco': 'Purgatorio'}
]
print(f"\n{li}\n\n\t!!APGENDA PYTHON BOLADA!!\nTem uma agenda salva para facilitar testes <3\n\n{li}\n")

#inicio do loop para fazer perguntas
while True:
    #escolha da operacao da agenda
    opcao = input('Agenda Eletronica\nSelecione a opcao desejada:\n\n1 - Adicionar Contato\n2 - Excluir Contato\n3 - Listar todos os Contatos\n4 - Alterar Contato\n5 - Listar dados de um determinado contato\n6 - Sair\n\nDigite o numero da opcao desejada: ')
    
    if opcao == '1': #adiciona um novo contato
        os.system(limpa)
        nome = input('\nDigite o nome do contato: ')
        telefone = input(f'Digite o telefone do(a) {nome}: ')
        sexo = input(f'Digite o sexo do(a) {nome}: ')
        endereco = input(f'Digite o endereco do(a) {nome}: ')
        agenda.append({'nome': nome, 'telefone': telefone, 'sexo': sexo, 'endereco': endereco})
        os.system(limpa)
        print(f"\n{li}\n\nContato adicionado com sucesso!\n\n{li}\n")

    elif opcao == '2': #deleta o contado digitado caso varios contatos om o mesmo nome ele deleta tudo (pensei na solucao mas nao sei executar)
        os.system(limpa)
        nome = input("\nDigite o nome do contato que deseja deletar (nomes repetidos serao excluidos): ")
        #junta todos os resultados de nome igual o digitdo que existem na agenta
        contatos_encontrados = [contato for contato in agenda if contato['nome'] == nome]
        os.system(limpa)
        print('\n', li, '\n')
        #caso exista contatos com o nome digitado ele executa if[true]:
        if contatos_encontrados:   
            for contato in contatos_encontrados: agenda.remove(contato)
            print("\tContato removido com sucesso.")
        else: print("\tContato não encontrado.")
        print('\n', li, '\n')

    elif opcao == '3': #lista todos os contatos contidos na agenda
        os.system(limpa)
        print(f"\n{li}\n\t\tCONTATOS\t\t\n")
        for contato in agenda:
            print(f"\tNome: {contato['nome']}")
        print('\n', li, '\n')

    elif opcao == '4': #altera contato digitado (infelismente ele altera os contatos com o mesmo nome em sequencia por conta do for)
        os.system(limpa)
        nome = input("\nDigite o nome do contato que deseja alterar: ")
        contatos_encontrados = [contato for contato in agenda if contato['nome'] == nome]
        os.system(limpa)
        print('\n', li, '\n')
        if contatos_encontrados:
            for contato in contatos_encontrados:
                print(f"Nome: {contato['nome']}")
                novo_nome = input(f"Digite o novo nome (ou pressione Enter para manter '{contato['nome']}'): ")
                novo_telefone = input(f"Digite o novo telefone (ou pressione Enter para manter '{contato['telefone']}'): ")
                novo_sexo = input(f"Digite o novo sexo (ou pressione Enter para manter '{contato['sexo']}'): ")
                novo_endereco = input(f"Digite o novo endereco (ou pressione Enter para manter '{contato['endereco']}'): ")

                if novo_nome: contato['nome'] = novo_nome
                if novo_telefone: contato['telefone'] = novo_telefone
                if novo_sexo: contato['sexo'] = novo_sexo
                if novo_endereco: contato['endereco'] = novo_endereco
            print('Contato Atualizado com sucesso.')
        else: print("\tContato não encontrado!")
        print('\n', li, '\n')

    elif opcao == '5': #lista os dados do contato cuja o nome foi inserido (mostra os contatos com mesmo nome caso exista)
        os.system(limpa)
        nome = input('\nDigite o nome do contato que deseja listar os dados: ')
        contatos_encontrados = [contato for contato in agenda if contato['nome'] == nome]
        os.system(limpa)
        print('\n', li, '\n')
        if contatos_encontrados:
            for contato in contatos_encontrados:
                if contato['nome'] == nome:
                    print(f"\t*{'-='*11}-*\n\tNome: {contato['nome']}\n\tTelefone: {contato['telefone']}\n\tSexo: {contato['sexo']}\n\tEndereco: {contato['endereco']}")
        else: print('\tContato nao encontrado.')
        print('\n', li, '\n')

    elif opcao == '6': break #fecha o loop (while true)

    else: 
        os.system(limpa)
        print(f"\n{'#'*50}\nOpcao invalida! Por favor tente novamente.\n{'#'*50}\n")


#    SOLUCOES PARA PROBLEMAS AE
# se criasse um id para cada contado daria para ter varios contatos com o mesmo nome
# ou proibisse de ter contato com o mesmo nome (mais facil k)