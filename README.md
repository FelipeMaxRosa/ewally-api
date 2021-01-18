# API Ewally

## Objetivo
Este projeto tem o objetivo que desenvolver uma API para converter as linhas digitáveis de boletos e concessionárias para código de barras e apresentar possíveis erros de digitação ou digitos de verificação inválidos.

## API
Esta API pode ser consumida pela seguinte URL:
http://localhost:8080/boleto/{linhaDigital}

Substituindo o campo {linhaDigital} pelos números da linha digitável do boleto.

Em caso de sucesso a API retornará o seguinte resultado:

GET
http://localhost:8080/boleto/42296011355000100343858017510015289780000098506

### Boletos
* Código de Status: 200
* response: {
  "barCode": "42292897800000985066011350001003435801751001",
  "amount": "985.06",
  "expirationDate": "2022-05-07"
}

### Concessionárias
* Código de status: 200
* response: {
  "barCode": "82620000001249700971494209320896181518821022",
  "amount": "124.97",
  "expirationDate": null
}

Obs.: Aqui no campo "expirationDate" aparece o valor null, pois a linha digitável não consta data de vencimento.

### Erros
Caso haja algum erro nos códigos verificadores, a API retornará erros especificando qual código verificador está errado como:

{
  "message": "Digito verificador 1 não confere, por favor verifique!"
}

ou

{
  "message": "Digito verificador 2 não confere, por favor verifique!"
}