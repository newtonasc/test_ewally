# Teste Técnico - Ewally

## Descrição do projeto

Projeto desenvolvido para consultar linhas digitáveis de boleto de título bancário e pagamento de concessionárias, verificando se a mesma é válida ou não. 
Sendo válida e possuindo valor e/ou data de vencimento esses dados são retornados.

Aplicadas técnicas de TDD, DDD e Clean Code.


## Ambiente


1. NodeJS  v17.4.0
2. NPM 8.3.1


## Preparação do Ambiente


1. Clone o repositório 


```
git@github.com:newtonasc/test_ewally.git
```

2. Resolver as dependencias do projeto


```
npm install
```


3 - Inicializar o projeto


```
npm run server
```

4 - Para realizar a validação do boleto informe a linha de código na url do navegardor ou utilizando um tester de APIs como o <a href="https://insomnia.rest/" target="_blank">insomnia</a>

conforme abaixo:


```
http://localhost:8080/boleto/26090763087584449858654300000004389240000041807
```

O retorno para a consulta será:


```
{
  "barcode":"2609892400000418070763075844498585430000000",
  "amount":"418.07",
  "expirationDate":"2022-03-14"
}
```

Erros e validações negativas são tratados como exceptions como no exemplo abaixo que retorna um boleto expirado, cada exceção tem sua mensagem identificando o erro ocorrido:


```
Error: Expired due date!
    at new BoletoController (/home/developer/Projects/test_ewally/src/Controllers/BoletoController.ts:8:47)
```


5 - Testes unitários


```
npm run test
```

6 - Cobertura de código:

```
npm run coverage
```

O arquivo html da cobertura fica localizado no projeto, no seguinte caminho:

```
test_ewally\coverage\lcov-report\index.html
```
