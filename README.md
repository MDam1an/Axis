# Axis — Painel de Vida Pessoal v2

Sistema completo de controle pessoal com vícios, hábitos, metas, desejos, finanças e grupo de amigos.

---

## 📁 Estrutura

```
axis/
├── index.html          → Login e Registro
├── dashboard.html      → Visão geral do dia
├── vicios.html         → Controle de vícios e streaks
├── habitos.html        → Hábitos diários com check-in
├── metas.html          → Metas com barra de progresso
├── desejos.html        → Lista de desejos por categoria
├── financas.html       → Controle financeiro mensal
├── nos.html            → Grupo de amigos com comparação
├── css/
│   └── main.css
└── js/
    ├── firebase-config.js  ← suas credenciais já estão aqui
    ├── auth.js
    ├── sidebar.js
    ├── page-shell.js
    └── utils.js
```

---

## 🔧 Firebase — já configurado

As credenciais já estão em `js/firebase-config.js`.

**Regras do Firestore recomendadas** (Firebase Console → Firestore → Regras):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      match /{sub=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

## 🚀 GitHub Pages

1. Faça upload de todos os arquivos para o repositório
2. **Settings → Pages → Deploy from branch → main → / (root)**
3. Aguarde 1–2 minutos e acesse o link

> **Importante:** No GitHub Pages, os links usam `/pagina.html`.
> Se o seu site ficou em `https://usuario.github.io/axis/`, as páginas estarão em `https://usuario.github.io/axis/dashboard.html`.
> Edite os links `href` da sidebar em `js/sidebar.js` se necessário (ex: `href="/axis/dashboard.html"`).

---

## ✅ O que foi corrigido nesta versão

- **Sidebar responsiva** com menu hamburger em telas menores que 900px
- **Overlay escuro** ao abrir a sidebar no mobile com botão de fechar
- **Todos os botões e modais** funcionando corretamente
- **Nós dois → Grupo**: sistema de múltiplos amigos via ID, com cards de comparação para cada membro
- **Finanças**: tipo de transação (Entrada/Saída) funcionando corretamente
- **Hábitos**: toggle de check-in corrigido com arrayUnion/arrayRemove
- **Metas**: slider de progresso salva ao soltar
- **Responsividade** diferenciada entre PC, tablet e mobile
