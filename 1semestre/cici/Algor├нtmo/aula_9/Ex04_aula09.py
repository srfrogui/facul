print('calc de totacom com cardapio de lanchonete')
op = None
tot = 0
while op != 'fim':
    op = input("====================-=================\nDigite 'fim' para calcular o total\nDigite o codigo do lanche: ")
    if op == '100': tot += 2.5
    elif op in ['101', '105']: tot += 2
    elif op == '102': tot += 3.5
    elif op == '103': tot += 5.1
    elif op == '104': tot += 3.3
    elif op == 'fim': break
    else: print('isso nao esta no cardapio, burro!')
print(f'Total: R${tot:.2f}')
