<div align="center">

# 💈 Barber Shop UI — Sistema de Gestão e Agendamento para Barbearias

**Aplicação Single Page Application (SPA) moderna em Angular 19 com Standalone Components, Angular Material, validações reativas e simulação de backend via JSON Server**

[![Angular](https://img.shields.io/badge/Angular-19.2-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Angular Material](https://img.shields.io/badge/Angular%20Material-19.2-FFA000?style=for-the-badge&logo=angular&logoColor=white)](https://material.angular.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JSON Server](https://img.shields.io/badge/JSON%20Server-Mock%20API-000000?style=for-the-badge&logo=json&logoColor=white)](https://github.com/typicode/json-server)
[![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge)]()
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue?style=for-the-badge)](./LICENSE)

</div>

---

## 🔗 Ambiente de Execução Local

- **Frontend (Angular App):** `http://localhost:4200`
- **Backend Mock (JSON Server):** `http://localhost:3000`
- **Endpoints de Dados:**
  - Clientes: `http://localhost:3000/clients`
  - Agendamentos: `http://localhost:3000/schedules`

---

## 📖 Visão Geral

O **Barber Shop UI** é uma aplicação web completa desenvolvida como solução prática de desafio no ecossistema da **Digital Innovation One (DIO)**. O objetivo é fornecer uma interface fluida, intuitiva e de alta produtividade para o controle operacional diário de barbearias e salões masculinos.

Construído sobre a arquitetura moderna do **Angular 19**, o projeto adota o paradigma de **Standalone Components** (eliminando módulos intermediários), tipagem estrita com TypeScript, controle de formulários reativos (`ReactiveFormsModule`), máscaras dinâmicas de input com `ngx-mask` e interface estilizada com componentes do **Angular Material** integrados a utilitários responsivos do **Bootstrap 5**.

---

## ✨ Funcionalidades

- **Gestão Cadastral Completa de Clientes (CRUD):**
  - **Listagem Dinâmica:** Tabela interativa com visualização rápida de nome, e-mail e telefone formatado.
  - **Formulário Reativo com Validação:** Cadastro e edição de clientes com validação em tempo real de preenchimento obrigatório e formato de e-mail.
  - **Máscaras de Entrada:** Formatação automática do telefone para o padrão brasileiro celular (`(00) 00000-0000`) através do `ngx-mask`.
  - **Exclusão Segura:** Remoção de registros com sincronização imediata do estado da tabela.
- **Tabela de Dados com Paginação Localizada (PT-BR):** Implementação de `CustomPaginator` customizado para o Angular Material Paginator, traduzindo rótulos como *"Itens por página"*, *"Próxima página"* e faixa de registros exibidos.
- **Painel de Agendamentos Mensais (`schedules`):** Módulo para acompanhamento cronológico de compromissos categorizados por ano, mês, dia e horários de início e término (`startAt` / `endAt`).
- **Mock RESTful com Persistência em Disco:** Uso do `json-server` operando sobre `json-server/db.json` com suporte a todas as operações HTTP (`GET`, `POST`, `PUT`, `DELETE`).

---

## 🎯 Diferenciais e Destaques Técnicos

1. **Arquitetura 100% Standalone (Angular 19):**
   Adoção do modelo moderno de componentes autônomos sem a sobrecarga de arquivos `NgModule`, reduzindo o boilerplate e otimizando o carregamento dinâmico via *tree-shaking*.
2. **Localização e Acessibilidade do Paginator (`CustomPaginator`):**
   Customização do serviço `MatPaginatorIntl` para fornecer internacionalização nativa em português brasileiro diretamente na camada de renderização da tabela.
3. **Integração Visual Híbrida (Material + Bootstrap):**
   Combinação estratégica do tema `azure-blue` do Angular Material com o sistema de grids e utilitários responsivos do Bootstrap 5.3.
4. **Script de Automação de Inicialização (`setup.bat`):**
   Script em batch para automação do fluxo de instalação de dependências e configuração rápida no ambiente Windows.

---

## 🏗️ Arquitetura e Estrutura de Pastas

```text
DesafioBarbeariaDIO/
├── json-server/
│   └── db.json                         # Base de dados simulada para clientes e agendamentos
├── src/
│   ├── app/
│   │   ├── clients/                    # Módulo e componentes da gestão de clientes
│   │   │   ├── components/
│   │   │   │   ├── client-form/        # Formulário reativo reutilizável (criação e edição)
│   │   │   │   └── client-table/       # Tabela de clientes com MatTable e CustomPaginator
│   │   │   ├── edit-client/            # Página de edição de cliente por ID
│   │   │   ├── list-clients/           # Página de listagem e ações em lote
│   │   │   ├── new-client/             # Página de cadastro de novo cliente
│   │   │   ├── client.models.ts        # Interfaces TypeScript (Client, Schedule, Appointment)
│   │   │   └── custom-paginator.ts     # Internacionalização do paginador Angular Material
│   │   ├── schedules/                  # Componentes de visão mensal e agendamentos
│   │   ├── app.component.ts            # Componente raiz com navegação e barra de menu
│   │   ├── app.config.ts               # Configuração global de provedores e rotas
│   │   └── app.routes.ts               # Definição das rotas e navegação da SPA
│   ├── styles.css                      # Folha de estilo global e temas
│   └── main.ts                         # Bootstrap da aplicação Angular
├── angular.json                        # Configurações do Angular CLI e compilação de assets
├── package.json                        # Dependências do projeto e scripts de execução
├── setup.bat                           # Script de automação de ambiente para Windows
└── README.md                           # Documentação técnica consolidada do repositório
```

---

## 🎨 UX e Fluxo de Estados da Aplicação

O fluxo de navegação e integração com o mock server está estruturado da seguinte forma:

```text
[Usuário / Atendente]
        │
        ▼
[Navegação no Menu: /clients]
        │
        ├─► [MatTable: Carrega lista via GET /clients]
        │         │
        │         ├─► Paginação customizada em PT-BR (CustomPaginator)
        │         └─► Ação Excluir ──► DELETE /clients/:id ──► Recarrega tabela
        │
        ├─► [Botão "Novo Cliente" ──► Rota /clients/new]
        │         │
        │         └─► [ClientFormComponent: Validações + ngx-mask]
        │                   │
        │                   └─► Submit ──► POST /clients ──► Redireciona /clients
        │
        └─► [Botão "Editar" ──► Rota /clients/edit/:id]
                  │
                  └─► [Carrega dados via GET /clients/:id]
                            │
                            └─► Atualiza ──► PUT /clients/:id ──► Redireciona /clients
```

---

## 🧭 Passo a Passo de Uso para o Usuário

1. **Acessar a Listagem:** Abra a aplicação no navegador em `http://localhost:4200/clients` para visualizar a lista de clientes cadastrados.
2. **Cadastrar Novo Cliente:** Clique no botão de cadastro, preencha nome, e-mail e telefone celular (a máscara de DDD e dígitos será aplicada automaticamente) e confirme.
3. **Editar Registro:** Na tabela de clientes, selecione a opção de edição na linha do cliente desejado, altere as informações necessárias e salve as alterações.
4. **Visualizar Agendamentos:** Navegue até a seção de agendamentos para inspecionar os horários marcados por cliente em cada mês.

---

## ⚙️ Requisitos e Pré-requisitos

- **Node.js:** Versão 18.13 ou superior (LTS)
- **NPM:** Gerenciador de dependências
- **Angular CLI:** Versão 19.x (`npm install -g @angular/cli`)

---

## 🚀 Como Executar o Projeto

Para o funcionamento completo da interface e da camada de dados simulada, recomenda-se iniciar o backend mock e a aplicação Angular simultaneamente:

### 1. Clonagem do Repositório
```bash
git clone https://github.com/erickystn/DesafioBarbeariaDIO.git
cd DesafioBarbeariaDIO
```

### 2. Instalação das Dependências
```bash
npm install
```

### 3. Inicialização dos Serviços

#### Terminal 1 — Backend Mock (`json-server`):
```bash
npx json-server --watch json-server/db.json --port 3000
```
O servidor de dados estará ativo em `http://localhost:3000`.

#### Terminal 2 — Frontend Angular:
```bash
ng serve
# ou
npm start
```
Acesse `http://localhost:4200` no seu navegador.

> 💡 **Usuários Windows:** É possível executar o script `setup.bat` para automatizar a verificação do ambiente e instalação inicial.

---

## 💻 Exemplos de Código

### 1. Internacionalização do Paginador (`custom-paginator.ts`)
```typescript
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página:';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
```

### 2. Interface de Modelo de Dados (`client.models.ts`)
```typescript
export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  day: number;
  startAt: string;
  endAt: string;
}
```

---

## 🧪 Suíte de Testes

Os testes unitários de componentes e serviços são estruturados com Jasmine e executados via Karma:

```bash
# Execução dos testes automatizados
ng test
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade Técnica |
| :--- | :--- |
| **Angular 19** | Framework de frontend com arquitetura reativa e Standalone Components. |
| **TypeScript 5.7** | Tipagem estática, interfaces de modelo e contratos estritos. |
| **Angular Material 19** | Biblioteca de componentes de interface acessíveis (Tabelas, Paginators, Inputs). |
| **Bootstrap 5.3** | Sistema de grid flexível, utilitários de espaçamento e alinhamento responsivo. |
| **ngx-mask** | Máscaras reativas para entrada padronizada de telefones e documentos. |
| **JSON Server** | Emulação de API RESTful completa com persistência em arquivo JSON. |
| **RxJS** | Programação reativa para gerenciamento assíncrono de requisições HTTP e eventos de formulário. |

---

## 📈 Melhorias e Próximos Passos (Roadmap)

- [ ] Integração com backend persistente em nuvem (Node.js/NestJS ou Spring Boot).
- [ ] Implementação de calendário visual interativo com suporte a *drag-and-drop* para reagendamento de cortes.
- [ ] Sistema de autenticação com perfis diferenciados (Administrador, Barbeiro e Cliente).
- [ ] Envio automático de lembretes de agendamento via integração com WhatsApp API.

---

## 🤝 Como Contribuir

1. Realize um **Fork** do repositório.
2. Crie uma branch para sua funcionalidade: `git checkout -b feature/minha-melhoria`.
3. Faça o commit das suas alterações: `git commit -m "feat: adiciona filtro de busca por nome"`.
4. Envie a branch para o repositório remoto: `git push origin feature/minha-melhoria`.
5. Abra um **Pull Request**.

---

## 👤 Autor & 📄 Licença

Desenvolvido por **[Ericky Santana](https://github.com/erickystn)** como solução prática no bootcamp da **Digital Innovation One (DIO)**.

Este projeto é de código aberto e está licenciado sob os termos da licença **MIT** — consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.