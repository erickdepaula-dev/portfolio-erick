export type Lang = "en" | "pt";

const en = {
  nav: { home: "Home", about: "About", work: "Work", contact: "Contact", resume: "Resume", resumeSoon: "Resume coming soon" },
  hero: {
    hello: "Hi, I'm",
    role: "Software Developer",
    tagline: "I build real products from the first doc to the last deploy — typed, secure and made to last.",
    cta: "Get in touch",
    more: "Learn more",
    available: "Open to jobs & freelance projects",
    hint: "Press",
    hintAfter: "to explore",
  },
  about: {
    kicker: "About me",
    title: "Code with purpose,",
    titleAccent: "documentation first.",
    bio: [
      "I'm Erick — married, Christian, and passionate about turning real-world problems into software that people actually use.",
      "Today I work as a PHP developer at an ERP company, I hold a degree in Data Science and I'm starting a postgraduate program in Software Engineering.",
      "Outside office hours I build my own products with TypeScript, Next.js and Supabase — always with documentation before code, clean architecture, and data security (multi-tenancy and RLS) from the very first commit. Lately I've been exploring how to bring AI into real product flows.",
    ],
    stats: [
      { value: 3, suffix: "", label: "products live" },
      { value: 9, suffix: "+", label: "technologies in daily use" },
      { value: 100, suffix: "%", label: "documentation-first" },
    ],
    facts: [
      { k: "Now", v: "PHP Developer · ERP" },
      { k: "Degree", v: "Data Science" },
      { k: "Studying", v: "Postgrad in Software Engineering" },
      { k: "Based in", v: "Brazil" },
    ],
    processTitle: "How I work",
    process: [
      { t: "Document", d: "PRD, data modeling, architecture and technical decisions." },
      { t: "Architect", d: "Layer separation, structure and planning." },
      { t: "Protect", d: "RLS, tenant isolation and security best practices." },
      { t: "Build", d: "Clean, typed and testable code, guided by the docs." },
      { t: "Ship", d: "Deploy, monitor and evolve based on real usage." },
    ],
  },
  work: {
    kicker: "Selected work",
    title: "Products I built",
    titleAccent: "and use every day.",
    live: "Live site",
    code: "Code",
    status: { production: "In production", live: "Live", daily: "Daily use", soon: "Coming soon" },
    projects: {
      finance: {
        tagline: "Real financial control, battle-tested daily.",
        desc: "Born from my own need to organize money, it evolved into a full finance tool with AI-powered insights — clarity on where every cent goes.",
      },
      despesas: {
        tagline: "Go to the market with your list ready and budget in check.",
        desc: "Plan your shopping list before leaving home, track spending in real time and get AI-powered product suggestions. Budget, purchase history and spending insights included.",
      },
      board: {
        tagline: "From a Trello clone to my command center.",
        desc: "Started as a Kanban study and became the tool that organizes my projects and routines every day. Built it, used it, kept improving it.",
      },
      client: {
        tagline: "A client project is on the way.",
        desc: "I'm currently building a product for a client. It will show up here as soon as it ships.",
      },
    },
  },
  contact: {
    kicker: "Contact",
    title: "Let's build",
    titleAccent: "something great.",
    sub: "Got an opportunity, a project or just want to talk tech? Send a message — it goes straight to my WhatsApp.",
    name: "Your name",
    phone: "Phone",
    message: "What would you like to talk about?",
    send: "Send via WhatsApp",
    greeting: "Hi Erick! I came from your portfolio.",
    labels: { name: "Name", phone: "Phone", message: "Message" },
    errors: { name: "Tell me your name", phone: "Enter a valid phone", message: "Write a short message" },
    or: "or reach me directly",
    copied: "Email copied!",
  },
  footer: { made: "Designed & built by", rights: "All rights reserved." },
  palette: {
    placeholder: "Type a command or search…",
    empty: "Nothing found.",
    groups: { nav: "Navigate", actions: "Actions", links: "Links" },
    toggleLang: "Mudar para Português",
    copyEmail: "Copy email",
    terminal: "Open terminal",
    whatsapp: "Message on WhatsApp",
  },
  terminal: {
    welcome: "Welcome to erick.sh — type `help` to see commands.",
    help: "Available commands",
    notFound: "command not found",
  },
};

export type Dict = typeof en;

const pt: Dict = {
  nav: { home: "Início", about: "Sobre", work: "Projetos", contact: "Contato", resume: "Currículo", resumeSoon: "Currículo em breve" },
  hero: {
    hello: "Olá, eu sou",
    role: "Software Developer",
    tagline: "Construo produtos reais do primeiro documento ao último deploy — tipados, seguros e feitos para durar.",
    cta: "Fale comigo",
    more: "Saiba mais",
    available: "Disponível para vagas e projetos freelance",
    hint: "Pressione",
    hintAfter: "para explorar",
  },
  about: {
    kicker: "Sobre mim",
    title: "Código com propósito,",
    titleAccent: "documentação primeiro.",
    bio: [
      "Sou o Erick — casado, cristão e apaixonado por transformar problemas reais em software que as pessoas de fato usam.",
      "Hoje atuo como desenvolvedor PHP em uma empresa de ERP, sou graduado em Ciência de Dados e estou iniciando uma pós-graduação em Engenharia de Software.",
      "Fora do expediente, construo produtos próprios com TypeScript, Next.js e Supabase — sempre com documentação antes do código, arquitetura limpa e segurança de dados (multi-tenancy e RLS) desde o primeiro commit. Ultimamente venho explorando como levar IA para fluxos reais de produto.",
    ],
    stats: [
      { value: 3, suffix: "", label: "produtos no ar" },
      { value: 9, suffix: "+", label: "tecnologias no dia a dia" },
      { value: 100, suffix: "%", label: "documentation-first" },
    ],
    facts: [
      { k: "Agora", v: "Dev PHP · ERP" },
      { k: "Formação", v: "Ciência de Dados" },
      { k: "Estudando", v: "Pós em Engenharia de Software" },
      { k: "Onde", v: "Brasil" },
    ],
    processTitle: "Como eu trabalho",
    process: [
      { t: "Documentar", d: "PRD, modelagem de dados, arquitetura e decisões técnicas." },
      { t: "Arquitetar", d: "Separação de camadas, organização e planejamento." },
      { t: "Proteger", d: "RLS, isolamento por tenant e boas práticas de segurança." },
      { t: "Implementar", d: "Código limpo, tipado e testável, guiado pela documentação." },
      { t: "Entregar", d: "Deploy, acompanhamento e evolução com base no uso real." },
    ],
  },
  work: {
    kicker: "Projetos",
    title: "Produtos que construí",
    titleAccent: "e uso todos os dias.",
    live: "Ver online",
    code: "Código",
    status: { production: "Em produção", live: "No ar", daily: "Uso diário", soon: "Em breve" },
    projects: {
      finance: {
        tagline: "Controle financeiro de verdade, testado no dia a dia.",
        desc: "Nasceu da minha própria necessidade de organizar o dinheiro e evoluiu para uma solução completa com insights por IA — clareza sobre para onde cada centavo vai.",
      },
      despesas: {
        tagline: "Vá ao mercado com a lista pronta e o orçamento sob controle.",
        desc: "Monte a lista de compras antes de sair de casa, acompanhe os gastos em tempo real e receba sugestões de produtos com IA. Orçamento, histórico de compras e indicadores de gastos inclusos.",
      },
      board: {
        tagline: "Do clone do Trello ao meu centro de comando.",
        desc: "Começou como um estudo de Kanban e virou a ferramenta que organiza meus projetos e rotinas todos os dias. Construí, usei e fui melhorando.",
      },
      client: {
        tagline: "Um projeto de cliente está a caminho.",
        desc: "Estou desenvolvendo um produto para um cliente. Ele aparece aqui assim que for entregue.",
      },
    },
  },
  contact: {
    kicker: "Contato",
    title: "Vamos construir",
    titleAccent: "algo incrível.",
    sub: "Tem uma oportunidade, um projeto ou só quer conversar sobre tecnologia? Mande uma mensagem — ela chega direto no meu WhatsApp.",
    name: "Seu nome",
    phone: "Telefone",
    message: "Sobre o que você quer conversar?",
    send: "Enviar pelo WhatsApp",
    greeting: "Olá Erick! Vim pelo seu portfólio.",
    labels: { name: "Nome", phone: "Telefone", message: "Mensagem" },
    errors: { name: "Diga seu nome", phone: "Informe um telefone válido", message: "Escreva uma mensagem curta" },
    or: "ou fale direto comigo",
    copied: "E-mail copiado!",
  },
  footer: { made: "Desenhado e desenvolvido por", rights: "Todos os direitos reservados." },
  palette: {
    placeholder: "Digite um comando ou busque…",
    empty: "Nada encontrado.",
    groups: { nav: "Navegar", actions: "Ações", links: "Links" },
    toggleLang: "Switch to English",
    copyEmail: "Copiar e-mail",
    terminal: "Abrir terminal",
    whatsapp: "Conversar no WhatsApp",
  },
  terminal: {
    welcome: "Bem-vindo ao erick.sh — digite `help` para ver os comandos.",
    help: "Comandos disponíveis",
    notFound: "comando não encontrado",
  },
};

export const dictionaries: Record<Lang, Dict> = { en, pt };
