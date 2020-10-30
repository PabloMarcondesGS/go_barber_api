# Projeto Gobaber
    -Backend do projeto go barber para gerenciamento de horarios de uma barbearia.
    -Não há interface, para teste usar a ferramenta INSOMINIA ou alguma outra ferramenta que simule uma requisição as rotas.

## Rodar a API
    -Necessario ter docker na maquina
    -Criar uma database e atualizar os dados de acesso a ela no arquivo ormconfig.
    -Usar comando yarn dev:server
    -As configurações do eslint não funcionão em qualquer editor de códigos, cuidado!

### Funcionalidades
    -Criação de usuarios para os barbeiros.
    -Criação de usuarios para os usuarios.
    -Agendamento de horarios.

### Testes unitarios
    -Testes criados com a ferramenta JEST
    -Para rodar os testes apenas rodar o comando 'yarn test'
    -Teste existentes
        *Criar um agendamento
        *Não deixar criar dois agendamentos na mesma data