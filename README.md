# 🧾 OpenFac

**OpenFac** est une plateforme de facturation **open source**, développée avec **Python, Django et PostgreSQL**, conçue comme une **alternative libre aux logiciels de facturation payants** tels que FreshBooks, QuickBooks ou Wave.

Le projet est pensé pour être **simple, auto-hébergé et extensible**, tout en étant **adapté au contexte canadien**, notamment grâce à la gestion de la TPS et de la TVQ.

---

## 🎯 Objectifs du projet

- Proposer une solution de facturation **100 % open source**
- Offrir une alternative gratuite et transparente aux solutions payantes
- Faciliter la gestion des clients et des factures
- Permettre un déploiement rapide grâce à **Docker**
- Fournir une base solide pour des améliorations futures par la communauté

---

## Adapté au contexte canadien

OpenFac intègre dès le départ :
- La devise **CAD**
- La gestion des taxes :
  - TPS (5 %)
  - TVQ (9,975 %)
- Une interface **en français**
- Une numérotation de factures claire et configurable  
  *(ex. : FAC-2026-0001)*

---

## 🚀 Fonctionnalités principales

- Authentification des utilisateurs
- Gestion des clients (CRUD)
- Création et gestion des factures
- Lignes de facturation détaillées
- Calcul automatique des taxes (TPS / TVQ)
- Génération de factures en **PDF**
- Statuts de facturation :
  - Brouillon
  - Envoyée
  - Payée
- Tableau de bord simple
- Déploiement rapide via **Docker**

---

## 🧱 Technologies utilisées

- **Backend** : Python 3, Django  
- **Base de données** : PostgreSQL  
- **Frontend** : Templates Django, Bootstrap  
- **Conteneurisation** : Docker, Docker Compose  
- **Licence** : MIT  

Toutes les bibliothèques utilisées sont sous **licence libre**, conformément aux règles du marathon de programmation.

---

## 📁 Structure du projet
```bash
    openfac/
    │
    ├── backend/
    │   ├── openfac/
    │   │   ├── __init__.py
    │   │   ├── settings.py
    │   │   ├── urls.py
    │   │   ├── asgi.py
    │   │   └── wsgi.py
    │   │
    │   ├── apps/
    │   │   ├── users/
    │   │   ├── clients/
    │   │   ├── invoices/
    │   │   └── taxes/
    │   │
    │   ├── templates/
    │   ├── static/
    │   ├── manage.py
    │   └── requirements.txt
    │
    ├── docker/
    │   └── backend/
    │       └── Dockerfile
    │
    ├── docker-compose.yml
    ├── .env.example
    ├── README.md
    ├── LICENSE.md
    ├── CONTRIBUTING.md
    └── ROADMAP.md
```

## 🐳 Installation et lancement avec Docker

### Prérequis
- Docker
- Docker Compose

### Étapes

1. Cloner le dépôt :
    ```bash
    git clone https://github.com/youmasther/OpenFac.git
    cd openfac
    ```

2. Créer le fichier .env à partir de l’exemple :
     ```bash
     cp .env.example .env
     ```
3. Lancer l’application :
   ```bash
   docker compose up --build -d
   ```
4. Créer les fichiers de migration :
   ```bash
   docker exec -it openfac_web python manage.py makemigrations
   ```

5. Créer les fichiers de migration :
   ```bash
   docker exec -it openfac_web python manage.py migrate
   ```

6. Collecter les fichiers statiques :
   ```bash
   docker exec -it openfac_web python manage.py collectstatic --noinput
    ```
7. Créer un superuser :
   ```bash
   docker exec -it openfac_web python manage.py createsuperuser
    ```
8. Accéder à l’application :
  http://localhost:8000   
