# Digital Banking

Plateforme bancaire en ligne avec un **agent IA** dont les services dépendent du profil de l'utilisateur (Admin ou Client).

## Objectif

- gérer les comptes bancaires ;
- effectuer des opérations financières ;
- valider les transactions ;
- assister chaque profil grâce à un agent IA aux workflows distincts (Admin / Client).

## Technologies

| Domaine | Technologies |
|---|---|
| Backend | Java 21, Spring Boot, API REST |
| Sécurité | Spring Security, JWT, gestion des rôles |
| Agent IA | Spring AI / LangChain, OpenAI |
| Base de données | MySQL |
| Frontend | Angular |
| Build | Maven |

## Structure du projet

```
digital-banking/
├── banck/                 Backend Spring Boot
└── digital-banking-web/   Frontend Angular
```

## Lancer le projet

### Prérequis

- JDK 21
- Node.js et npm
- MySQL installé et démarré
- Une clé API OpenAI

### 1. Récupérer le projet

```bash
git clone https://github.com/omariabdelhadi/digital-banking.git
cd digital-banking
```

### 2. Créer la base de données

```sql
CREATE DATABASE digital_banking;
```

Les tables sont créées automatiquement par Hibernate au premier démarrage. Adapte le nom d'utilisateur et le mot de passe MySQL dans `banck/src/main/resources/application.properties`.

### 3. Démarrer le backend

La clé OpenAI se configure par variable d'environnement, elle n'est jamais écrite dans le code.

```bash
cd banck
```

Sous Windows (PowerShell) :

```powershell
$env:OPENAI_API_KEY="votre_cle_openai"
.\mvnw.cmd spring-boot:run
```

Sous Linux ou macOS :

```bash
export OPENAI_API_KEY="votre_cle_openai"
./mvnw spring-boot:run
```

L'API est disponible sur `http://localhost:8080`.

### 4. Démarrer le frontend

Dans un second terminal :

```bash
cd digital-banking-web
npm install
npm start
```

Ouvre `http://localhost:4200`.
