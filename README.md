# ARC São Lourenço do Douro — Dossier do Treinador

Aplicação web de gestão desportiva para o A.R.C.S. Lourenço do Douro.

## Perfis de acesso

| Perfil | Acesso |
|--------|--------|
| **Treinador** | Acesso total — plantel, treinos, jogos, stats, saúde, pais, avisos |
| **Encarregado** | Avisos, jogos do filho, agenda, contactar treinador, FAQ |
| **Atleta** | Os seus dados, convocatórias, presenças, avisos, agenda |

## Credenciais padrão

- **Treinador:** palavra-passe `treinador2526` (pode ser alterada nas Configurações)
- **Atletas/Pais:** PIN de 4 dígitos definido pelo treinador na ficha do atleta

## Como publicar no Vercel

1. Faz login em [vercel.com](https://vercel.com) com a tua conta GitHub
2. Clica em **"Add New Project"**
3. Clica em **"Import Third-Party Git Repository"** → ou usa **"Upload"** (arrasta a pasta do projeto)
4. Clica em **Deploy**
5. Em ~2 minutos tens um link do tipo `arc-sld.vercel.app`

## Como fazer upload para o GitHub (alternativa)

1. Vai a [github.com/new](https://github.com/new)
2. Cria um repositório chamado `arc-sld`
3. Faz upload de todos os ficheiros desta pasta
4. No Vercel, importa esse repositório

## Estrutura do projeto

```
arc-sld/
├── public/
│   └── index.html
├── src/
│   ├── App.js              ← Ponto de entrada + gestão de dados
│   ├── theme.js            ← Cores, estilos, dados iniciais
│   ├── index.js
│   └── components/
│       ├── UI.jsx          ← Componentes partilhados
│       ├── Login.jsx       ← Ecrã de login com seleção de perfil
│       ├── CoachDashboard.jsx  ← Painel do treinador (acesso total)
│       ├── ParentPortal.jsx    ← Portal do encarregado
│       └── AthletePortal.jsx   ← Portal do atleta
└── package.json
```

## Tecnologias

- React 18
- localStorage (dados persistentes no browser)
- CSS-in-JS (sem dependências externas de UI)

## Notas

- Os dados são guardados localmente no browser de cada utilizador.
- Para partilha de dados em tempo real entre utilizadores, seria necessário adicionar uma base de dados (ex: Supabase).
- Para produção real, recomenda-se alterar todas as palavras-passe e PINs padrão.
