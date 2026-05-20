# Configuration de Sécurité Spring Boot avec JWT

## 📋 Vue d'ensemble

Ce projet a été configuré avec une architecture de sécurité complète utilisant:
- **Spring Security** pour la gestion de l'authentification et l'autorisation
- **JWT (JSON Web Tokens)** pour l'authentification stateless
- **Deux rôles**: ADMIN et USER
- **Gestion des utilisateurs** avec mot de passe hashé (BCrypt)
- **CORS configuré** pour Angular (localhost:4200)

## 📁 Fichiers créés/modifiés

### Entités (Entities)
- `AppUser.java` - Entité utilisateur avec rôles
- `Role.java` - Entité pour les rôles
- `RoleEnum.java` - Énumération des rôles disponibles

### Sécurité (Security)
- `SecurityConfig.java` - Configuration principale de Spring Security
- `JwtTokenProvider.java` - Génération et validation des tokens JWT
- `JwtAuthenticationFilter.java` - Filtre pour intercepter et valider les tokens
- `CustomUserDetailsService.java` - Service pour charger les détails utilisateur

### Services
- `AuthenticationService.java` - Logique d'authentification et d'enregistrement

### Contrôleurs (Controllers)
- `AuthenticationController.java` - Endpoints pour login et register

### DTOs
- `AuthLoginRequest.java` - Requête pour le login
- `AuthRegisterRequest.java` - Requête pour l'enregistrement
- `AuthResponse.java` - Réponse avec token JWT

### Configuration
- `DataInitializer.java` - Initialise les rôles par défaut au démarrage

### Repositorys
- `AppUserRepository.java` - Accès aux utilisateurs
- `RoleRepository.java` - Accès aux rôles

### Configuration
- `application.properties` - Mise à jour avec les configurations JWT
- `pom.xml` - Ajout des dépendances Spring Security et JWT

## 🔑 Endpoints disponibles

### Authentification (Publics - sans authentification)
- `POST /auth/login` - Authentifier un utilisateur
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
  Réponse:
  ```json
  {
    "message": "User logged in successfully",
    "accessToken": "eyJhbGc...",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "username": "admin",
    "roles": ["ADMIN"]
  }
  ```

- `POST /auth/register` - Enregistrer un nouvel utilisateur
  ```json
  {
    "username": "newuser",
    "password": "password123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["USER"]
  }
  ```

- `GET /auth/health` - Vérifier que le service d'authentification fonctionne

### Endpoints protégés (nécessitent authentification)
- `GET /api/admin/**` - Accessible uniquement par les utilisateurs avec le rôle ADMIN
- `GET/POST /api/customers/**` - Accessible par ADMIN et USER
- `GET/POST /api/accounts/**` - Accessible par ADMIN et USER

## 🔒 Configuration de sécurité

### Rôles disponibles
1. **ADMIN** - Accès complet à l'administration
   - Peut gérer les utilisateurs
   - Peut créer/modifier/supprimer les comptes clients
   - Peut accéder à tous les endpoints admin

2. **USER** - Accès utilisateur standard
   - Peut consulter ses propres données
   - Accès limité aux opérations sur les comptes

### Processus d'authentification
1. L'utilisateur envoie ses identifiants (username + password) à `/auth/login`
2. Le serveur valide les identifiants contre la base de données
3. Un token JWT est généré contenant:
   - Le nom d'utilisateur (sub)
   - Les rôles de l'utilisateur (scope)
   - La date d'expiration (1 heure par défaut)
4. Le token est retourné au client
5. Le client inclut le token dans l'en-tête `Authorization: Bearer <token>` pour les requêtes suivantes
6. Le filtre JWT valide le token et authentifie la requête

### Configuration CORS
Les origines autorisées sont:
- http://localhost:4200 (Angular par défaut)
- http://localhost:3000
- http://127.0.0.1:4200
- http://127.0.0.1:3000

## 🛠️ Configuration de base de données

### Utilisateurs et Rôles
Les rôles (ADMIN, USER) sont initialisés automatiquement au démarrage de l'application.

### Script SQL pour créer des utilisateurs manuellement (optionnel)
```sql
-- Insérer des rôles
INSERT INTO roles (id, name, description) VALUES (1, 'ADMIN', 'Administrator role');
INSERT INTO roles (id, name, description) VALUES (2, 'USER', 'User role');

-- Insérer un utilisateur ADMIN
INSERT INTO app_users (id, username, password, email, first_name, last_name, enabled, 
                       account_non_locked, account_non_expired, credentials_non_expired) 
VALUES (1, 'admin', 'motdepasse_hashé', 'admin@example.com', 'Admin', 'User', true, true, true, true);

-- Assigner le rôle ADMIN à l'utilisateur
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
```

**Note**: Le mot de passe doit être hashé avec BCrypt. Utilisez la classe `PasswordEncoder` fournie par Spring.

## 📡 Utilisation avec Angular

### Installation du token dans le localStorage
```typescript
// Dans le service d'authentification Angular
login(username: string, password: string) {
  return this.http.post<any>('/auth/login', {username, password})
    .subscribe(response => {
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('roles', JSON.stringify(response.roles));
    });
}
```

### Inclusion du token dans les requêtes
Le token doit être inclus dans l'en-tête Authorization:
```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

Cela est géré automatiquement par l'intercepteur HTTP créé dans le projet Angular.

## 🔐 Sécurité

### Points clés de sécurité
1. **CSRF désactivé** - JWT gère l'authentification (pas de sessions)
2. **Session stateless** - Pas de session serveur stockée
3. **CORS configuré** - Seules les origines autorisées peuvent accéder à l'API
4. **Mots de passe hashés** - BCrypt avec force 12
5. **Validation JWT** - Signature vérifiée pour chaque requête
6. **Rôles vérifiés** - Chaque endpoint vérifie les rôles de l'utilisateur

## ⚙️ Configuration JWT

Dans `application.properties`:
```properties
app.jwtSecret=mySecretKeyForJWTTokenGenerationThatMustBeLongEnoughForHS512Algorithm
app.jwtExpirationInMs=3600000
```

- **jwtSecret** - Clé secrète utilisée pour signer les tokens (doit être longue et sécurisée)
- **jwtExpirationInMs** - Durée d'expiration du token en millisecondes (3600000 = 1 heure)

## 🚀 Démarrage de l'application

1. **Compiler le projet**
   ```bash
   mvn clean install
   ```

2. **Démarrer l'application**
   ```bash
   mvn spring-boot:run
   ```

3. **Accéder aux endpoints**
   - Authentification: http://localhost:8085/auth/login
   - Swagger UI: http://localhost:8085/swagger-ui.html

## 📝 Exemple de test avec cURL

### 1. Enregistrer un nouvel utilisateur
```bash
curl -X POST http://localhost:8085/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "testuser@example.com",
    "firstName": "Test",
    "lastName": "User",
    "roles": ["USER"]
  }'
```

### 2. Authentifier l'utilisateur
```bash
curl -X POST http://localhost:8085/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Utiliser le token pour accéder aux endpoints protégés
```bash
curl -X GET http://localhost:8085/api/customers \
  -H "Authorization: Bearer <token_reçu>"
```

## 🐛 Dépannage

### Erreur: "User not found with username"
- Vérifiez que l'utilisateur existe dans la base de données
- Vérifiez que le username est correct (case-sensitive)

### Erreur: "Invalid username or password"
- Vérifiez les identifiants
- Vérifiez que l'utilisateur est activé (enabled = true)

### Erreur: "JWT validation failed"
- Vérifiez que le token n'a pas expiré
- Vérifiez que le format du token est correct (Bearer <token>)
- Vérifiez que le secret JWT correspond

### Erreur: "Access Denied"
- Vérifiez que l'utilisateur a le rôle nécessaire pour accéder à l'endpoint
- Vérifiez la configuration des rôles dans SecurityConfig

## 📚 Ressources utiles
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [JWT Documentation](https://jwt.io/)
- [jjwt GitHub](https://github.com/jwtk/jjwt)

---

**Date**: 20 mai 2026
**Version**: 1.0
