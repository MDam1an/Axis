# Axis — Painel de Vida Pessoal

Sistema completo de controle pessoal com vícios, hábitos, metas, desejos e finanças.
Construído com HTML + CSS + JavaScript puro e Firebase.

---

## 📁 Estrutura de arquivos

```
axis/
├── index.html          → Login e Registro
├── dashboard.html      → Visão geral
├── vicios.html         → Controle de vícios e streaks
├── habitos.html        → Hábitos diários com check-in
├── metas.html          → Metas e objetivos com progresso
├── desejos.html        → Lista de desejos por categoria
├── financas.html       → Controle financeiro mensal
├── nos.html            → Área compartilhada entre dois usuários
├── css/
│   └── main.css        → Estilos globais
├── js/
│   ├── firebase-config.js  → ⚠️ CONFIGURAR AQUI
│   ├── auth.js         → Login / Registro / Logout
│   ├── sidebar.js      → Sidebar compartilhada
│   └── utils.js        → Funções utilitárias
└── README.md
```

---

## 🔧 Como configurar o Firebase

### 1. Crie um projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"**
3. Dê um nome (ex: `axis-app`) e conclua a criação

### 2. Ative o Authentication

1. No menu lateral, clique em **Authentication**
2. Clique em **"Primeiros passos"**
3. Na aba **"Sign-in method"**, ative **E-mail/senha**

### 3. Ative o Firestore

1. No menu lateral, clique em **Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Escolha **"Começar no modo de teste"** (você pode restringir depois)
4. Selecione a região mais próxima (ex: `southamerica-east1`)

### 4. Copie as credenciais

1. Vá em **Configurações do projeto** (ícone de engrenagem)
2. Desça até **"Seus apps"** → clique em **"</>  Web"**
3. Registre o app e copie o objeto `firebaseConfig`

### 5. Cole no projeto

Abra o arquivo `js/firebase-config.js` e substitua:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

---

## 🚀 Como publicar no GitHub Pages

1. Crie um repositório no GitHub (pode ser público ou privado)
2. Faça upload de todos os arquivos para a branch `main`
3. Vá em **Settings → Pages**
4. Em **Source**, selecione `Deploy from a branch` → `main` → `/root`
5. Aguarde alguns minutos e acesse o link gerado

> ⚠️ GitHub Pages serve arquivos estáticos — funciona perfeitamente com este projeto!

---

## 🔐 Regras do Firestore (recomendado após testar)

No Firebase Console → Firestore → **Regras**, substitua por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📋 Funcionalidades

| Módulo | Funcionalidades |
|---|---|
| **Vícios** | Cadastrar vícios, contador de dias sem recaída, registrar recaída, histórico |
| **Hábitos** | Hábitos diários, check-in com clique, calendário de consistência 28 dias |
| **Metas** | Metas por categoria, barra de progresso ajustável, prazo, status |
| **Desejos** | Lista por categoria (filmes, lugares, compras...), marcar como feito |
| **Finanças** | Entradas/saídas, resumo por categoria, navegação por mês, meta de economia |
| **Nós dois** | Conectar por ID, comparar streaks, desafios compartilhados, feed de conquistas |
| **Dashboard** | Resumo do dia com todos os módulos integrados |

---

## 🛠 Tecnologias

- **HTML5 + CSS3 + JavaScript ES Modules** — sem frameworks pesados
- **Firebase Authentication** — login seguro por e-mail/senha
- **Firebase Firestore** — banco de dados em tempo real por usuário
- **Google Fonts** — DM Sans + DM Serif Display
- **GitHub Pages** — hospedagem gratuita

---

Feito com 🖤
