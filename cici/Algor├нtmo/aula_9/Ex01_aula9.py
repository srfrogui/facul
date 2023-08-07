popuA = 98000000
txa_crescA = 0.035
popuB = 200000000
taxa_crescB = 0.015
anos = 0

while popuA < popuB:
    popuA *= 1 + txa_crescA
    popuB *= 1+ taxa_crescB
    anos += 1

print(f'Serao necessarios {anos} anos para a populacao do pais A ultrapassar ou igualar a populacao do pais B.')