# ⚔️ Class-Kombat

> Um jogo de luta 2D desenvolvido como projeto final da disciplina de **Programação Orientada a Objetos**, com backend em Java e frontend em React + Vite.

---

## 🎮 Sobre o Projeto

**Class-Kombat** é um jogo de luta onde seis personagens únicos se enfrentam em batalhas estratégicas por turnos. Cada personagem possui atributos, habilidades especiais e status próprios, refletindo os princípios de herança, polimorfismo e encapsulamento da POO.

### Personagens disponíveis

| Personagem | Tipo |
|------------|------|
| Arkanis | Elemental Wizard |
| Nyxra | Werewolf |
| Korvus | Invoker |
| Cassian | Paladin |
| Draven | Vampire |
| Artemis | Archer |

### Modos de jogo

- **PVE** — Jogador vs. Computador
- **PVP** — Jogador vs. Jogador (mesmo teclado)
- **Torre** — Enfrente ondas de inimigos em sequência

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Backend | Java (HTTP Server nativo) |
| Frontend | React 19 + Vite 7 |
| Estilização | Tailwind CSS 4 |
| Comunicação | API REST via `fetch` + proxy Vite |

---

## 📋 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- **Java 17+** — [Download](https://adoptium.net/)
- **Node.js 18+** — [Download](https://nodejs.org/)
- **npm** (já vem com o Node.js)

Para verificar as versões instaladas:

```bash
java -version
node -v
npm -v
```

### Instalação no Linux

**Java:**

```bash
# Ubuntu / Debian
sudo apt update
sudo apt install openjdk-17-jdk

# Fedora / RHEL
sudo dnf install java-17-openjdk-devel

# Arch Linux
sudo pacman -S jdk17-openjdk
```

**Node.js:**

```bash
# Ubuntu / Debian (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Fedora / RHEL
sudo dnf install nodejs

# Arch Linux
sudo pacman -S nodejs npm

# Alternativa universal via nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 18
nvm use 18
```

### Instalação no macOS

**Java:**

```bash
# Via Homebrew (recomendado)
brew install openjdk@17

# Após instalar, adicione ao PATH:
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Node.js:**

```bash
# Via Homebrew
brew install node@18

# Alternativa via nvm (recomendado para gerenciar versões)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 18
nvm use 18
```

> Caso não tenha o Homebrew instalado: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

---

## 🚀 Como rodar o projeto

O jogo exige que **dois processos sejam iniciados**: o servidor Java (backend) e o servidor de desenvolvimento Vite (frontend). Siga os passos abaixo.

### 1. Clone o repositório

```bash
git clone https://github.com/edu-gouvea/Class-Kombat.git
cd Class-Kombat
```

### 2. Inicie o Backend (Java)

Abra um terminal na raiz do projeto e compile todos os arquivos Java:

```bash
javac -d out $(find Backend -name "*.java")
```

Em seguida, inicie o servidor:

```bash
java -cp out Backend.Servidor
```

> O servidor ficará escutando na porta **3001**. Você verá a mensagem `Servidor iniciado na porta 3001` no terminal.

Deixe esse terminal aberto.

<img width="738" height="119" alt="Captura de tela de 2026-04-06 21-20-52" src="https://github.com/user-attachments/assets/40575689-aa7e-4aa8-9475-85c76f490136" />

### 3. Inicie o Frontend (React + Vite)

Abra um **segundo terminal** na raiz do projeto:

<img width="1626" height="148" alt="Captura de tela de 2026-04-06 21-22-57" src="https://github.com/user-attachments/assets/52d64225-7def-4caa-9820-591041540c9b" />

---


```bash
cd Frontend
npm install  # necessário apenas na primeira execução
npm run dev
```

> O Vite iniciará na porta **5173** por padrão.

<img width="572" height="294" alt="Captura de tela de 2026-04-06 21-58-26" src="https://github.com/user-attachments/assets/abd8c3e8-786d-4766-99ea-da4f0f2fb0e2" />


### 4. Acesse o jogo

Abra o navegador em:

```
http://localhost:5173
```

---

## 📁 Estrutura do projeto

```
Class-Kombat/
├── Backend/                    # Lógica do jogo em Java
│   ├── Servidor.java           # HTTP Server na porta 3001
│   ├── Jogo.java               # Controlador da sessão de jogo
│   ├── FactoryPersonagem.java  # Criação dos personagens
│   ├── ENUM/                   # Enums de Status, Ação e Tipo
│   ├── Personagens/            # Classe base Lutador + 6 personagens
│   ├── Combates/               # Lógica de Combate (PVE, PVP, Torre)
│   └── dto/                    # Data Transfer Objects
│
├── Frontend/                   # Interface gráfica em React
│   ├── src/
│   │   ├── pages/              # Telas do jogo (menu, seleção, arena)
│   │   ├── services/api.js     # Funções de comunicação com o backend
│   │   ├── App.jsx             # Roteamento principal
│   │   └── main.jsx            # Entry point React
│   ├── public/                 # Imagens dos personagens
│   └── vite.config.js          # Configuração do Vite + proxy
│
└── out/                        # Bytecode Java compilado (gerado automaticamente)
    └── Backend/
```

---

## ⚙️ Como funciona a integração

O frontend React se comunica com o backend Java via **HTTP REST**. O Vite está configurado com um proxy que redireciona as chamadas da API para o servidor Java:

| Rota | Ação |
|------|------|
| `POST /iniciar` | Inicia um novo combate com os personagens selecionados |
| `POST /atacar` | Executa um ataque e retorna o novo estado do jogo |

O proxy no `vite.config.js` evita problemas de CORS durante o desenvolvimento:

```js
server: {
  proxy: {
    "/iniciar": "http://localhost:3001",
    "/atacar":  "http://localhost:3001",
  },
},
```

---

## 👥 Autores

Desenvolvido como projeto acadêmico para a disciplina de Programação Orientada a Objetos.

- **Eduardo Gouvêa** — [@edu-gouvea](https://github.com/edu-gouvea)
- **Pedro Menegon** — [@PMGmenegon](https://github.com/PMGmenegon)
- **Roberto Honorato** — [@RobertoHonoratoSF](https://github.com/RobertoHonoratoSF)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
