[![Build Status](https://travis-ci.org/CristianoPro/Challenge-Nodejs-Mutant.svg?branch=master)](https://travis-ci.org/CristianoPro/Challenge-Nodejs-Mutant)
[![Coverage Status](https://coveralls.io/repos/github/CristianoPro/Challenge-Nodejs-Mutant/badge.svg?branch=master)](https://coveralls.io/github/CristianoPro/Challenge-Nodejs-Mutant?branch=master)

# Challenge - Nodejs

## Objetivos

- [x] Carregar a rota `https://jsonplaceholder.typicode.com/users`, que retorna um JSON 

## Rotas
Nas rotas utilizei query params como filtro para retornar cada um dos items separadamente em cada requisição 

- [x] Os websites de todos os usuários // `http://localhost:8080/app/users?filters=websites`

      ```[{ "web": "hildegard.org"}]```

- [x] O Nome, email e a empresa em que trabalha (em ordem alfabética). // `http://localhost:8080/app/users?filters=users`

      ```[{"name": "Chelsey Dietrich", "email": "Lucio_Hettinger@annie.ca", "companyName": "Keebler LLC"}]```

- [x] Mostrar os usuários que no endereço contem a palavra suite // `http://localhost:8080/app/users?filters=suite`

      ```[{"name": "Ervin Howell", "address": "Suite 879"}]```

- [x] Salvar logs de todas interações no elasticsearchq
  

## Testes
Para os testes eu utilizei o `jest`, criei alguns scripts especificos para os testes

- [x] Testes unitários - Para os teste unitários (arquivos com a extensão `.spec.ts`) 
  você pode rodar o seguinte comando: `npm run test:unit`

- [x] Testes de integração (arquivos com a extensão `.test.ts`) 
  você pode utilizar o seguinte comando: `npm run test:intagration`

- [x] Testes de CI - Este comando roda todos os testes tanto unitários como os de integração e gera uma pasta com arquivos státicos
  contendo informções sobre a cobertura de testes no código basta rodar o comando `npm run test:ci` 
  após rodar este comando será gerada uma pasta na raiz do projeto chamada `converage` para acessar a pagina static com as informações da coberturad de testes acesse `coverage/lcov-report/index.html`

## Inicializar a aplicação

- Para inicializar a aplicação é nescesário ter instalado o `Docker` e o `Docker-compose`
- Tendo as duas ferramentas instaladas basta rodar o comando `npm run up` 
- Este script vai gerar a build da aplicação e depois inicializar os containers do Docker 
- Se tudo ocorrer sem problemas a aplicação estará rodando na `porta 8080` e o elasticsearchq na `porta 9200`
- Se possuir o Insomnia ou o postman instalado você pode utilizar o arquivo `insomniaImport.json` que está na raiz do projeto para importar as rotas
- Fiz o deploy da api no Heroku que pode ser acessada nesse url `https://mutant-challenge.herokuapp.com/app/users?filters=users`

## Ferramentas de lint e Algumas práticas que tentei aplicar neste projeto

- Utilizei o `husky` em conjunto com o `lintstaged` e `eslint` 
- Que juntas me permitem rondar todos os testes verificar o padrão do código e padrão de commit e só após passar por essas verificações o commit é aceito.
- Tetei aplicar um pouco dos padrões do Clean architecture e princípios do SOLID para deixa a aplicação mais desacoplada o póssivel

### Considerações finais 
- Vou ficar devendo a implementação do vagrant pois devido ao prazo e por ser uma ferramenta que nunca utilizei me faltou um pouco de conhecimento de DevOps :)