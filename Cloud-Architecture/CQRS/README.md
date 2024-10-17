# CQRS

## O que é?

CQRS significa Command and Query Responsibility Segregation, ou seja, Segregação de Responsabilidade de Comando e Consulta. Este padrão é citado por [Greg Young](https://twitter.com/gregyoung) em um [post de 16/02/2010](http://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/) que já não está mais online, mas está arquivado [aqui](https://gist.github.com/andrzj/d75968e6899dabb8c1ed5c17bb6b14e9). 

Primeiramente, CQRS:

- NÃO é uma arquitetura
- NÃO é consistência eventual
- NÃO é "usar eventos"
- NÃO é mensageria
- NÃO é ter Modelos para leitura e escrita
- NÃO é usar Event Sourcing.

Em seu post o autor explica que CQRS é um padrão onde simplesmente se criam dois objetos onde previamente havia um, separando métodos de **comando** e **consulta** (a mesma definição usada no princípio de [CQS](https://martinfowler.com/bliki/CommandQuerySeparation.html) cunhado por Bertrand Meyer em seu livro "Object Oriented Software Construction").

CQRS se aplica no objeto que representa uma camada de serviço da aplicação. Por exemplo:

```
CustomerService

void MakeCustomerPreferred(CustomerId) 
Customer GetCustomer(CustomerId) 
CustomerSet GetCustomersWithName(Name) 
CustomerSet GetPreferredCustomers() 
void ChangeCustomerLocale(CustomerId, NewLocale) 
void CreateCustomer(Customer) 
void EditCustomerDetails(CustomerDetails)
```

Se transforme em dois serviços:

```
CustomerWriteService

void MakeCustomerPreferred(CustomerId) 
void ChangeCustomerLocale(CustomerId, NewLocale) 
void CreateCustomer(Customer) 
void EditCustomerDetails(CustomerDetails)

CustomerReadService

Customer GetCustomer(CustomerId) 
CustomerSet GetCustomersWithName(Name) 
CustomerSet GetPreferredCustomers()
```

## Para que serve?

Você vai aplicar CQRS em sua aplicação quando sua necessidade de escrita é diferente da necessidade de leitura em seu banco de dados. Ele permite que sua arquitetura desacople essas duas funções a fim de escalar seus serviços de forma independente.

## Instalação

## Referências

