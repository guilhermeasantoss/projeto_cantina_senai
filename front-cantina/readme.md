# 🍔 Cantina Digital — Sistema de Gestão e Cardápio Online

Sistema web completo para cantinas escolares e institucionais desenvolvido com **Java 21**, **Spring Boot 3**, **Spring Data JPA**, **MySQL** e **Thymeleaf**, focado em agilidade no atendimento, redução de filas e controle administrativo de estoque e vendas.

---

## 📌 1. Visão Geral e Propósito

O sistema atende a duas frentes principais:
1. **Área do Cliente (Cardápio Digital)**: Uma interface moderna e rápida onde os clientes podem consultar os lanches disponíveis por categoria, pesquisar em tempo real, montar um carrinho de compras e finalizar pedidos sem filas.
2. **Área Administrativa (Painel Admin)**: Um dashboard gerencial com indicadores de desempenho (KPIs), histórico de vendas em tempo real e controle total do cardápio (cadastro, edição, ativação/desativação e controle de estoque).

---

## 🧠 2. Regras e Lógica de Negócio

### 🛍️ 2.1. Cardápio e Fluxo de Pedidos (Cliente)
* **Visualização Filtrada**: Apenas produtos com `ativo = true` são exibidos no cardápio do cliente.
* **Filtros e Busca**:
  * O cardápio permite navegação por categorias pré-definidas (`Salgados`, `Lanches`, `Bebidas`, `Doces`).
  * O campo de busca realiza filtragem em tempo real no cliente (JavaScript) e suporta busca integrada via backend com `LIKE %nome%`.
* **Indicador de Disponibilidade**:
  * Produtos com estoque `<= 10` exibem um alerta visual de estoque baixo.
  * Produtos com estoque `0` são marcados como esgotados.
* **Carrinho de Compras Interativo**:
  * O estado do carrinho é persistido no navegador (`localStorage`), permitindo que o cliente navegue sem perder os itens selecionados.
  * O cliente pode incrementar/decrementar quantidades ou remover itens.
* **Finalização do Pedido (Checkout)**:
  * Ao confirmar o pedido, o payload JSON do carrinho é enviado para o endpoint `POST /pedido/finalizar`.
  * Um código único de rastreamento do pedido é gerado no formato `PED-{timestamp}-{hash}` (ex.: `PED-20260817163000-A1B2`).

---

### 📦 2.2. Processamento Transacional e Baixa de Estoque
Toda a finalização de pedido é executada de forma **atômica (`@Transactional`)**:
1. **Validação de Estoque**: O sistema verifica se há unidades suficientes para cada produto solicitado. Caso o estoque seja insuficiente, a transação sofre rollback imediato e retorna um erro informativo.
2. **Criação do Pedido**: Cria a entidade `Pedidos` com status inicial `PENDENTE` e calcula o somatório `valorTotal = ∑ (precoUnitario * quantidade)`.
3. **Associação dos Itens**: Cada item é persistido em `ItemsPedidos` vinculado ao pedido e ao produto correspondente.
4. **Baixa no Estoque**: O campo `quantidadeEstoque` de cada produto é decrementado automaticamente no banco de dados.
5. **Registro de Venda**: Cria registros na entidade `Venda` para alimentar os relatórios financeiros e métricas históricas.

---

### 📊 2.3. Painel Administrativo e Métricas (KPIs)
O painel admin calcula indicadores em tempo real para tomada de decisão:
* **Faturamento Total (R$)**: Soma acumulada do valor de todas as vendas realizadas (`SUM(venda.valorTotal)`).
* **Total de Itens Vendidos**: Quantidade física agregada de itens que saíram da cantina (`SUM(venda.quantidade)`).
* **Total de Produtos Cadastrados**: Contagem de todos os itens cadastrados no cardápio.
* **Alerta de Baixo Estoque**: Quantidade de produtos ativos cujo estoque está em nível crítico (`quantidadeEstoque <= 10`).
* **CRUD de Produtos**:
  * **Cadastrar / Editar**: Permite definir nome, categoria, preço unitário, estoque inicial e URL de imagem.
  * **Alternar Status (Ativar / Desativar)**: Permite ocultar um item do cardápio sem excluí-lo do histórico financeiro.
  * **Exclusão**: Remove o produto do catálogo.
* **Tabela de Vendas Recentes**: Exibe as últimas 20 vendas realizadas com data/hora, produto, quantidade e valor gerado.

---

## 🗄️ 3. Modelo de Dados e Entidades

```
   ┌──────────────┐          ┌────────────────┐          ┌──────────────┐
   │   Usuario    │ 1      N │    Pedidos     │ 1      N │ ItemsPedidos │
   │──────────────│─────────<│────────────────│─────────<│──────────────│
   │ id           │          │ id             │          │ id           │
   │ nome         │          │ codigoPedido   │          │ quantidade   │
   │ email        │          │ valorTotal     │          │ precoUnitario│
   │ senha        │          │ statusPedido   │          └──────┬───────┘
   └──────────────┘          │ dataCriacao    │                 │ N
                             └────────────────┘                 │
                                                                │ 1
   ┌──────────────┐          ┌────────────────┐          ┌──────┴───────┐
   │ Funcionario  │ 1      N │  AreaReserva   │          │   Produto    │
   │──────────────│─────────<│────────────────│          │──────────────│
   │ id           │          │ id             │          │ id           │
   │ nome         │          │ nomeArea       │          │ nome         │
   │ email        │          └────────────────┘          │ descricao    │
   │ credenciais  │                                      │ preco        │
   └──────────────┘                                      │ categoria    │
                                                         │ estoque      │
                                                         │ imagemUrl    │
                                                         │ ativo        │
                                                         └──────┬───────┘
                                                                │ 1
                                                                │
                                                         ┌──────┴───────┐
                                                         │    Venda     │
                                                         │──────────────│
                                                         │ id           │
                                                         │ quantidade   │
                                                         │ valorTotal   │
                                                         │ dataVenda    │
                                                         └──────────────┘
```

---

## 🌐 4. Rotas e Endpoints da Aplicação

| Método | Endpoint | Descrição | Acesso |
|---|---|---|---|
| `GET` | `/` | Página inicial com Cardápio Digital interativo | Público |
| `POST` | `/pedido/finalizar` | Endpoint REST para checkout e baixa no estoque | Público |
| `GET` | `/painel` | Dashboard administrativo com KPIs e gestão de cardápio | Público / Admin |
| `POST` | `/painel/produtos/salvar` | Salvar novo produto ou atualizar existente | Admin |
| `GET` | `/painel/produtos/alternar-status/{id}` | Alternar status do produto (Ativo/Inativo) | Admin |
| `GET` | `/painel/produtos/excluir/{id}` | Excluir produto do cardápio | Admin |
| `GET` | `/login` | Página de autenticação | Público |

---

## 🚀 5. Como Executar o Projeto

### Pré-requisitos
* **Java 21** ou superior instalado
* **MySQL Server** rodando na porta `3306`
* **Maven** (utilizar o `./mvnw` incluso no projeto)

### 1. Configurar o Banco de Dados
Por padrão, o sistema tenta conectar em:
* **Host**: `localhost:3306`
* **Database**: `cantina` (criado automaticamente se não existir)
* **Usuário**: `root`
* **Senha padrão**: `senai@126` (ou definida via variável de ambiente `DB_PASSWORD`)

### 2. Compilar e Iniciar a Aplicação
No terminal do projeto, execute:
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux / macOS
./mvnw spring-boot:run
```

### 3. Acessar no Navegador
* **Cardápio do Cliente**: [http://localhost:8080/](http://localhost:8080/)
* **Painel Administrativo**: [http://localhost:8080/painel](http://localhost:8080/painel)
