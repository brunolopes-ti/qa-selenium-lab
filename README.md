# QA Selenium Lab

![Selenium](https://img.shields.io/badge/Selenium-WebDriver-green)
![JavaScript](https://img.shields.io/badge/JavaScript-Test%20Automation-yellow)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-green)
![Mocha](https://img.shields.io/badge/Mocha-Test%20Runner-brown)
![E2E Testing](https://img.shields.io/badge/E2E-Web%20Automation-blue)

Projeto de portfólio desenvolvido para praticar, organizar e documentar **testes automatizados end-to-end com Selenium WebDriver e JavaScript**.

O projeto demonstra uma suíte de automação Web cobrindo fluxos funcionais do SauceDemo, com validações, cenários positivos e negativos, evidências e execução completa via terminal utilizando **Mocha** como test runner.

---

## Tecnologias utilizadas

- Selenium WebDriver;
- JavaScript;
- Node.js;
- Mocha;
- SauceDemo;
- Git;
- GitHub;
- Markdown;
- Visual Studio Code.

---

## Sistema utilizado para teste

Aplicação: [SauceDemo](https://www.saucedemo.com/)

O SauceDemo é uma aplicação Web utilizada para estudos e práticas de QA, permitindo validar fluxos como autenticação, carrinho e checkout.

---

## Escopo da automação

A suíte automatizada cobre os seguintes fluxos:

- Login com usuário válido;
- Login com usuário inválido;
- Login com usuário bloqueado;
- Adição de produto ao carrinho;
- Validação de produto no carrinho;
- Checkout completo;
- Execução da suíte completa via terminal.

---

## Estrutura do projeto

```text
qa-selenium-lab/
├── docs/
│   └── evidencias/
│       └── selenium/
│           ├── login-valido-teste-passando.png
│           ├── login-valido-saucedemo.png
│           ├── login-invalido-teste-passando.png
│           ├── login-invalido-saucedemo.png
│           ├── login-usuario-bloqueado-teste-passando.png
│           ├── login-usuario-bloqueado-saucedemo.png
│           ├── produto-adicionado-carrinho-teste-passando.png
│           ├── produto-adicionado-carrinho-saucedemo.png
│           ├── validacao-carrinho-teste-passando.png
│           ├── validacao-carrinho-saucedemo.png
│           ├── checkout-completo-teste-passando.png
│           ├── checkout-completo-saucedemo.png
│           └── suite-completa-selenium-passando.png
├── tests/
│   ├── saucedemo-login.test.js
│   ├── saucedemo-cart.test.js
│   └── saucedemo-checkout.test.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Como executar o projeto

Instale as dependências:

```bash
npm install
```

Execute toda a suíte:

```bash
npm test
```

Execute apenas os testes de login:

```bash
npx mocha tests/saucedemo-login.test.js --timeout 30000
```

Execute os testes de carrinho:

```bash
npx mocha tests/saucedemo-cart.test.js --timeout 30000
```

Execute os testes de checkout:

```bash
npx mocha tests/saucedemo-checkout.test.js --timeout 30000
```

---

## Arquivos de teste

### Login

Arquivo:

```text
tests/saucedemo-login.test.js
```

Cenários cobertos:

- Login válido;
- Login inválido;
- Login com usuário bloqueado.

### Carrinho

Arquivo:

```text
tests/saucedemo-cart.test.js
```

Cenários cobertos:

- Adicionar produto ao carrinho;
- Validar produto, preço e botão de checkout na página do carrinho.

### Checkout

Arquivo:

```text
tests/saucedemo-checkout.test.js
```

Cenário coberto:

- Realizar checkout completo com sucesso.

---

## Cenários automatizados

### CT-01 - Login válido

**Objetivo:** validar que um usuário com credenciais corretas consegue acessar a página de produtos.

**Dados utilizados:**

| Campo | Valor |
|---|---|
| Usuário | `standard_user` |
| Senha | `secret_sauce` |

**Validações realizadas:**

- Redirecionamento para `/inventory.html`;
- Exibição do título `Products`;
- Exibição da lista de produtos.

**Evidências:**

```text
docs/evidencias/selenium/login-valido-teste-passando.png
docs/evidencias/selenium/login-valido-saucedemo.png
```

---

### CT-02 - Login inválido

**Objetivo:** validar que o sistema exibe mensagem de erro ao tentar login com credenciais inválidas.

**Dados utilizados:**

| Campo | Valor |
|---|---|
| Usuário | `usuario_invalido` |
| Senha | `senha_invalida` |

**Validações realizadas:**

- Exibição da mensagem de erro;
- Permanência do usuário na tela de login.

**Evidências:**

```text
docs/evidencias/selenium/login-invalido-teste-passando.png
docs/evidencias/selenium/login-invalido-saucedemo.png
```

---

### CT-03 - Login com usuário bloqueado

**Objetivo:** validar que o sistema bloqueia o acesso de um usuário impedido de realizar login.

**Dados utilizados:**

| Campo | Valor |
|---|---|
| Usuário | `locked_out_user` |
| Senha | `secret_sauce` |

**Validações realizadas:**

- Exibição da mensagem de usuário bloqueado;
- Permanência do usuário na tela de login.

**Evidências:**

```text
docs/evidencias/selenium/login-usuario-bloqueado-teste-passando.png
docs/evidencias/selenium/login-usuario-bloqueado-saucedemo.png
```

---

### CT-04 - Adicionar produto ao carrinho

**Objetivo:** validar que um produto pode ser adicionado ao carrinho com sucesso.

**Produto utilizado:**

| Produto | Valor |
|---|---|
| Sauce Labs Backpack | `$29.99` |

**Validações realizadas:**

- Clique no botão `Add to cart`;
- Exibição do contador do carrinho com valor `1`;
- Alteração do botão para `Remove`.

**Evidências:**

```text
docs/evidencias/selenium/produto-adicionado-carrinho-teste-passando.png
docs/evidencias/selenium/produto-adicionado-carrinho-saucedemo.png
```

---

### CT-05 - Validar produto na página do carrinho

**Objetivo:** validar que o produto adicionado aparece corretamente na página do carrinho.

**Validações realizadas:**

- Redirecionamento para `/cart.html`;
- Exibição do título `Your Cart`;
- Exibição do produto `Sauce Labs Backpack`;
- Exibição do preço `$29.99`;
- Exibição do botão `Checkout`.

**Evidências:**

```text
docs/evidencias/selenium/validacao-carrinho-teste-passando.png
docs/evidencias/selenium/validacao-carrinho-saucedemo.png
```

---

### CT-06 - Checkout completo

**Objetivo:** validar o fluxo completo de compra, desde o carrinho até a finalização do pedido.

**Dados utilizados:**

| Campo | Valor |
|---|---|
| Nome | `Bruno` |
| Sobrenome | `Ramos` |
| CEP | `72000-000` |

**Validações realizadas:**

- Acesso à etapa de informações do checkout;
- Preenchimento dos dados do comprador;
- Acesso à tela de resumo da compra;
- Validação do produto no resumo;
- Validação do preço;
- Finalização da compra;
- Exibição da mensagem `Thank you for your order!`.

**Evidências:**

```text
docs/evidencias/selenium/checkout-completo-teste-passando.png
docs/evidencias/selenium/checkout-completo-saucedemo.png
```

---

## Resultado da suíte completa

A suíte foi executada via terminal com:

```bash
npm test
```

Resultado:

```text
saucedemo-login.test.js       3 testes passando
saucedemo-cart.test.js        2 testes passando
saucedemo-checkout.test.js    1 teste passando

Total: 6 testes passando
```

### Evidência

![Suíte completa Selenium passando](docs/evidencias/selenium/suite-completa-selenium-passando.png)

---

## Evidências visuais

### Login válido

![Login válido passando](docs/evidencias/selenium/login-valido-teste-passando.png)

![Página de produtos após login válido](docs/evidencias/selenium/login-valido-saucedemo.png)

### Login inválido

![Login inválido passando](docs/evidencias/selenium/login-invalido-teste-passando.png)

![Mensagem de erro no login inválido](docs/evidencias/selenium/login-invalido-saucedemo.png)

### Usuário bloqueado

![Usuário bloqueado passando](docs/evidencias/selenium/login-usuario-bloqueado-teste-passando.png)

![Mensagem de usuário bloqueado](docs/evidencias/selenium/login-usuario-bloqueado-saucedemo.png)

### Carrinho

![Produto adicionado ao carrinho passando](docs/evidencias/selenium/produto-adicionado-carrinho-teste-passando.png)

![Produto adicionado ao carrinho](docs/evidencias/selenium/produto-adicionado-carrinho-saucedemo.png)

![Validação do carrinho passando](docs/evidencias/selenium/validacao-carrinho-teste-passando.png)

![Produto validado na página do carrinho](docs/evidencias/selenium/validacao-carrinho-saucedemo.png)

### Checkout

![Checkout completo passando](docs/evidencias/selenium/checkout-completo-teste-passando.png)

![Checkout finalizado com sucesso](docs/evidencias/selenium/checkout-completo-saucedemo.png)

---

## Boas práticas aplicadas

- Separação dos testes por fluxo funcional;
- Uso de seletores estáveis com `data-test`;
- Validações de URL, textos, elementos visíveis e fluxo de navegação;
- Uso de `async/await` para controle das ações automatizadas;
- Uso de waits explícitos com `until`;
- Organização dos testes em arquivos separados por funcionalidade;
- Geração de evidências com screenshots;
- Organização das evidências em pasta específica;
- Execução da suíte completa via terminal;
- Controle de arquivos temporários com `.gitignore`.

---

## Competências demonstradas

Este projeto demonstra conhecimentos práticos em:

- Automação de testes Web;
- Testes end-to-end;
- Selenium WebDriver;
- JavaScript;
- Node.js;
- Mocha;
- Testes funcionais automatizados;
- Cenários positivos e negativos;
- Seletores Web;
- Esperas explícitas;
- `async/await`;
- Automação de login, carrinho e checkout;
- Execução via terminal;
- Git e GitHub;
- Evidências de execução;
- Documentação técnica.

---

## Observações

As evidências geradas pelos testes estão armazenadas em:

```text
docs/evidencias/selenium
```

A pasta `node_modules` foi adicionada ao `.gitignore`, evitando versionar dependências instaladas localmente.

---

## Status do projeto

**Concluído nesta etapa.**

Suíte automatizada com Selenium WebDriver criada, organizada, executada e documentada com sucesso.

---

## Próximas melhorias possíveis

- Aplicar Page Object Model;
- Utilizar massa de dados externa;
- Adicionar cenários negativos no checkout;
- Criar funções auxiliares reutilizáveis;
- Executar testes em pipeline de CI/CD;
- Explorar relatórios automatizados.

---

## Autor

**Bruno Ramos Lopes**

LinkedIn: [linkedin.com/in/brunolopes-ti](https://linkedin.com/in/brunolopes-ti)  
GitHub: [github.com/brunolopes-ti](https://github.com/brunolopes-ti)
