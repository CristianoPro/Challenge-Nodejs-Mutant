# Challenge - Nodejs

## Objetivos

- [x] Carregar a rota `https://jsonplaceholder.typicode.com/users`, que retorna um JSON 

## Rotas
Nas rotas utilizei query params como filtro para retornar cada um dos items separadamente em cada requisição 

- [x] Os websites de todos os usuários `http://localhost:8080/app/users?filters=websites`

      ```[{ "web": "hildegard.org"}]```

- [x] O Nome, email e a empresa em que trabalha (em ordem alfabética). `http://localhost:8080/app/users?filters=users`

      ```[{"name": "Chelsey Dietrich", "email": "Lucio_Hettinger@annie.ca", "companyName": "Keebler LLC"}]```

- [x] Mostrar todos os usuários que no endereço contem a palavra suite `http://localhost:8080/app/users?filters=suite`

      ```[{"name": "Ervin Howell", "address": "Suite 879"}]```

- [x] Salvar logs de todas interações no elasticsearchq

# Testes
Para os testes eu utilizei o `jest`, criei alguns scripts especificos para os testes

- [x] Testes unitários - Para os teste unitários arquivos com a extensão `.spec.ts` 
  você pode rodar o seguinte comando: `npm run test:unit`

- [x] Testes de integração - Arquivos com a extensão `.test.ts` 
  você pode utilizar o seguinte comando: `npm run test:intagration`

- [x] Testes de CI - Este comando roda todos os testes tanto unitários como os de integração e gera uma pasta com arquivos státicos
  contendo informções sobre a cobertura de testes no código basta rodar o comando `npm run test:ci`  