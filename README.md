# Products Parser 20230105

- Desafio Coodesh

## Descrição

Este é um projeto de exemplo criado como parte do desafio proposto pela Coodesh.

## Tecnologias Utilizadas
```
- Linguagem: TYPESCRIPT     - HUSKY
- Framework: EXPRESS        - PRETTIER
- Banco de Dados: MONGODB   - TS_NODE_DEV
- NODEJS                    - DOTENV 
- BABEL                     - AXIOS 
- SWAGGER                   - MOMENT_TIMEZONE 
- NODE_CRON                 - TSYRINGE 
- JEST                      - Docker 
- SUPERTEST
- CORS
- DATE_FNS
- UUID
- ESLINT
- 
```
## Clene Projeto

1. Clone este repositório para o seu ambiente local:

```sh
git clone: git@github.com:SilasEduardo/ProductsParser20230105.git

cd ProductsParser20230105
```

## Instalção

npm i ou yarn

## Configuração

Defina as ENV segue o Exemple.env

_Setup ENV_

```
PORT= Porta do servidor exemplo :3333

APP_URL = URL do servidor ou do app em produção exemplo'http://localhost:3333'

DATABASE_URL_TEST = URL do Banco de dados de teste

DATABASE_URL = URL Banco de dados de produção

CRON_TIME = horario em que o cron vai ser execultado  #`*/1 * * * *` every one minute

```

## Inicializar projeto

é necessario enviar a RANDOM_NUMBER nas Hears

Crie um Rquivo .gitignore e coloque .env  node_modules etc...

executando com Docker: _docker-compode up -d_

Executando em Ambiente de test: _npm run dev_ ou _yarn dev_

Execultando em  Ambiente de Produção: _npm build_ ou _yarn build_

Em seguida executa: _npm run start_ ou _yarn start_


Caso esteja rodando na porta :3333 veja a documentação [Documentação](http://localhost:3333/api-docs/)

## Executar TESTS

_npm test_  ou _yarn test_

## Rotas 


(GET / )
---------------------

_201

{
  Status da API
}

(GET / /api-docs/ )
---------------------

{
  Retorna da documentação
}

(GET / Products )
---------------------

_201


{
  Lista Todos do produtos
}

(GET / Product / id )
---------------------

  201


 {
  Pega Produto específico
 }

 (DELETE / Product / id )
---------------------
_204

{
  Muda os Statu para trash
}


 (PUT / Product / id )
---------------------

_200

{
  Atualiza os Dados de um Produto
}


Este é um desafio de [Coodesh]("https://coodesh.com/") 