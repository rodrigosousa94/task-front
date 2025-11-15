# 📋 Gerenciador de Tarefas

Uma aplicação moderna e responsiva para gerenciamento de tarefas, desenvolvida com React, TypeScript e Tailwind CSS. O projeto oferece uma interface elegante e tecnológica com recursos completos de CRUD (Create, Read, Update, Delete) para gerenciar suas tarefas de forma eficiente.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite)

## ✨ Funcionalidades

### 🎯 Gerenciamento de Tarefas
- ✅ **Criar tarefas** - Adicione novas tarefas com título e descrição através de um modal elegante
- ✏️ **Editar tarefas** - Modifique título e descrição de tarefas existentes
- 🗑️ **Excluir tarefas** - Remova tarefas com confirmação através de modal
- 📊 **Visualizar tarefas** - Veja todas as suas tarefas em cards organizados

### 🎨 Status de Tarefas
- 🟡 **Pendente** - Tarefas que ainda não foram iniciadas
- 🔵 **Em andamento** - Tarefas que estão sendo trabalhadas
- 🟢 **Concluída** - Tarefas finalizadas (com data de conclusão)

### 🎭 Interface Moderna
- 🌙 **Design tecnológico** - Interface dark mode com gradientes e efeitos visuais
- 📱 **Totalmente responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Cards coloridos** - Cada status possui cores e gradientes únicos
- ⚡ **Animações suaves** - Transições e efeitos hover para melhor experiência
- 🔔 **Modais elegantes** - Interface de criação e edição através de modais modernos

### 🔄 Recursos Adicionais
- 🔄 **Atualização em tempo real** - Botão para recarregar a lista de tarefas
- 📅 **Datas formatadas** - Visualização de data de criação e conclusão
- ✅ **Validação de formulários** - Validação de campos obrigatórios
- 🎯 **Feedback visual** - Estados de loading e mensagens de erro

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset do JavaScript com tipagem estática
- **Tailwind CSS 4.1.17** - Framework CSS utility-first para estilização
- **Vite 7.2.2** - Build tool rápida e moderna
- **React Router DOM 7.9.6** - Roteamento para aplicações React

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para garantir qualidade do código
- **TypeScript ESLint** - Regras específicas para TypeScript

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Backend API** rodando em `http://localhost:5042/api/tasks`

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd task-manager
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure a API**
   
   Certifique-se de que sua API backend está rodando na porta `5042`. Se necessário, altere a URL base no arquivo `src/api/api.ts`:
   ```typescript
   const BASE = "http://localhost:5042/api/tasks";
   ```

## 🎮 Como Executar

### Modo de Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### Build para Produção
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview da Build
```bash
npm run preview
```
Visualize a build de produção localmente antes de fazer deploy.

### Linting
```bash
npm run lint
```
Execute o linter para verificar a qualidade do código.

## 📁 Estrutura do Projeto

```
task-manager/
├── public/                 # Arquivos estáticos públicos
│   └── vite.svg
├── src/
│   ├── api/               # Configuração da API
│   │   └── api.ts         # Funções de comunicação com backend
│   ├── assets/            # Recursos estáticos (imagens, etc)
│   ├── components/        # Componentes React
│   │   ├── ConfirmDialog.tsx    # Modal de confirmação de exclusão
│   │   ├── Modal.tsx            # Componente modal reutilizável
│   │   ├── TaskCard.tsx         # Card individual de tarefa
│   │   ├── TaskEditForm.tsx     # Formulário de edição
│   │   ├── TaskForm.tsx          # Formulário de criação
│   │   └── TaskList.tsx          # Lista de tarefas
│   ├── types/             # Definições de tipos TypeScript
│   │   └── types.ts       # Interfaces e tipos
│   ├── utils/             # Funções utilitárias
│   │   └── status.ts      # Utilitários de status
│   ├── App.tsx            # Componente principal
│   ├── index.css         # Estilos globais
│   └── main.tsx          # Ponto de entrada da aplicação
├── index.html            # HTML base
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
├── vite.config.ts        # Configuração Vite
└── README.md             # Este arquivo
```

## 🔌 API Backend

A aplicação espera uma API REST com os seguintes endpoints:

### Base URL
```
http://localhost:5042/api/tasks
```

### Endpoints

#### GET `/api/tasks`
Retorna todas as tarefas.
```json
[
  {
    "id": 1,
    "title": "Tarefa exemplo",
    "description": "Descrição da tarefa",
    "createdAt": "2025-01-13T10:00:00",
    "completedAt": null,
    "status": "Pending"
  }
]
```

#### GET `/api/tasks/{id}`
Retorna uma tarefa específica.

#### POST `/api/tasks`
Cria uma nova tarefa.
**Body:**
```json
{
  "Title": "Nova tarefa",
  "Description": "Descrição opcional"
}
```

#### PUT `/api/tasks/{id}`
Atualiza uma tarefa existente.
**Body:**
```json
{
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "status": 2
}
```
**Status numéricos:**
- `0` = Pending (Pendente)
- `1` = InProgress (Em andamento)
- `2` = Completed (Concluída)

#### DELETE `/api/tasks/{id}`
Remove uma tarefa.

### Modelo de Tarefa
```typescript
interface Task {
  id: number;
  title: string;
  description?: string | null;
  createdAt: string;
  completedAt?: string | null;
  status: "Pending" | "InProgress" | "Completed";
}
```

## 🎨 Características de Design

### Paleta de Cores
- **Fundo**: Gradiente escuro (slate-950/900)
- **Acentos**: Ciano e azul para elementos interativos
- **Status Pendente**: Tons de amarelo/âmbar
- **Status Em Andamento**: Tons de azul/ciano
- **Status Concluída**: Tons de verde/esmeralda

### Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Componentes Visuais
- **Modais**: Backdrop blur e animações suaves
- **Cards**: Gradientes e bordas coloridas por status
- **Botões**: Efeitos hover e estados visuais claros
- **Formulários**: Inputs com focus states e validação

## 🧩 Componentes Principais

### `App.tsx`
Componente raiz que gerencia o estado global da aplicação, incluindo:
- Lista de tarefas
- Modais de criação e edição
- Modal de confirmação de exclusão
- Gerenciamento de erros

### `TaskCard.tsx`
Card individual que exibe:
- Título e descrição da tarefa
- Badge de status colorido
- Datas de criação e conclusão
- Botões de ação (mudar status, editar, excluir)

### `Modal.tsx`
Componente modal reutilizável com:
- Backdrop blur
- Animação de entrada/saída
- Botão de fechar
- Design responsivo

### `TaskForm.tsx` / `TaskEditForm.tsx`
Formulários para criar e editar tarefas com:
- Validação de campos
- Estados de loading
- Design consistente

## 🔧 Configuração

### Alterar URL da API
Edite o arquivo `src/api/api.ts`:
```typescript
const BASE = "http://sua-api-url:porta/api/tasks";
```

### Personalizar Cores
As cores podem ser personalizadas através das classes Tailwind CSS nos componentes. Os principais arquivos para editar:
- `src/index.css` - Estilos globais
- Componentes individuais - Classes Tailwind inline

## 📱 Compatibilidade

- ✅ Chrome/Edge (últimas versões)
- ✅ Firefox (últimas versões)
- ✅ Safari (últimas versões)
- ✅ Navegadores mobile (iOS Safari, Chrome Mobile)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS.

## 🐛 Problemas Conhecidos

- Certifique-se de que a API backend está rodando antes de iniciar a aplicação
- Em caso de erros de CORS, configure adequadamente o backend

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:
1. Verifique se a API backend está rodando
2. Verifique os logs do console do navegador
3. Abra uma issue no repositório

## 🚀 Próximas Melhorias

- [ ] Filtros por status
- [ ] Busca de tarefas
- [ ] Ordenação de tarefas
- [ ] Drag and drop para reordenar
- [ ] Notificações
- [ ] Modo claro/escuro toggle
- [ ] Exportação de tarefas
- [ ] Categorias/Tags
- [ ] Prazos e lembretes

---

**Desenvolvido com foco em experiência do usuário e performance** ⚡
