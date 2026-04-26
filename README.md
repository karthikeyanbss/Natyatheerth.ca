# 🌸 Natya Theerth Kalai Koodam

> **நாட்ய தீர்த்த கலைக் கூடம்** — Where every step tells a story.  
> _"கலையின் தீர்த்தத்தில் நடனம்" (Dance in the sacred flow of art)_

Classical Bharatanatyam dance school based in **Halifax, Nova Scotia, Canada**, founded and led by **Guru Sruthi Ganesapandian**.

---

## 📂 Repository Structure

```
Natyatheerth.ca/
├── frontend-angular/        # Angular 17 web application
├── mobile-ionic/            # Ionic + Angular mobile app (Android/iOS)
├── api-functions/           # Azure Functions (TypeScript) REST API
├── infrastructure/          # Bicep templates for Azure deployment
├── .github/workflows/       # CI/CD pipelines
└── README.md
```

---

## 🌐 Frontend — Angular 17

Full-featured Angular 17 web app with standalone components, lazy-loaded modules, and reactive forms.

### Pages
| Route | Description |
|-------|-------------|
| `/` | Home — hero, about preview, video, classes |
| `/about-guru` | Full biography of Guru Sruthi Ganesapandian |
| `/bharatanatyam-levels` | Beginner → Margam learning path |
| `/adavus` | Adavu categories and descriptions |
| `/margam` | Classical margam structure |
| `/schedule` | Class schedule (fetched from API) |
| `/fees` | Fee structure table |
| `/register` | Multi-step registration form |
| `/contact` | Contact form + info |
| `/vision` | Mission, values, and the meaning of "Natya Theerth" |
| `/admin` | Protected admin dashboard (JWT-authenticated) |

### Prerequisites
- Node.js 18+
- Angular CLI 17: `npm install -g @angular/cli@17`

### Local Development
```bash
cd frontend-angular
npm install
ng serve
# Open http://localhost:4200
```

### Build for Production
```bash
cd frontend-angular
ng build --configuration production
# Output: dist/natya-theerth-web/browser/
```

### Brand Colours
| Token | Hex | Usage |
|-------|-----|-------|
| Primary (Maroon) | `#8B1A1A` | Headings, buttons, accents |
| Gold | `#D4AF37` | CTA buttons, highlights |
| Cream | `#FDF6E3` | Background |
| Dark | `#1A0A0A` | Navbar, footer |

---

## 📱 Mobile — Ionic + Angular

Ionic 7 Angular standalone app with Capacitor for native iOS and Android deployment.

### App ID
`ca.natyatheerth.app`

### Pages
- **Home** — Hero, class cards, contact strip
- **Schedule** — Live schedule from API
- **Book Class** — Registration form
- **My Bookings** — Student booking history
- **Profile** — Student profile
- **Login** — Authentication

### Local Development
```bash
cd mobile-ionic
npm install
npm start          # Web preview
npx cap sync       # Sync to native platforms
npx cap open android  # Open in Android Studio
npx cap open ios      # Open in Xcode
```

---

## ⚡ API — Azure Functions (TypeScript)

Serverless REST API built with Azure Functions v4 (Node model), TypeORM, and PostgreSQL.

### Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/auth/login` | Admin authentication (returns JWT) |
| `GET`  | `/api/students` | List all students (admin) |
| `POST` | `/api/students` | Create a student |
| `GET`  | `/api/students/{id}` | Get student by ID |
| `PUT`  | `/api/students/{id}` | Update student |
| `DELETE` | `/api/students/{id}` | Delete student |
| `GET`  | `/api/classes` | List all classes (public) |
| `POST` | `/api/classes` | Create a class (admin) |
| `GET`  | `/api/classes/{id}` | Get class by ID |
| `PUT`  | `/api/classes/{id}` | Update class (admin) |
| `DELETE` | `/api/classes/{id}` | Delete class (admin) |
| `GET`  | `/api/bookings` | List bookings (admin) |
| `POST` | `/api/bookings` | Create a booking |
| `PATCH` | `/api/bookings/{id}` | Update booking status |
| `POST` | `/api/register` | Student registration (public) |
| `POST` | `/api/contact` | Contact form submission |

### Prerequisites
- Node.js 18+
- Azure Functions Core Tools v4: `npm install -g azure-functions-core-tools@4`
- PostgreSQL 15+ (local or Azure)

### Local Development
```bash
cd api-functions

# 1. Install dependencies
npm install

# 2. Copy the example settings and fill in your local values
cp local.settings.json.example local.settings.json
#    Edit local.settings.json with your PostgreSQL credentials and other secrets

# 3. Create the database and run migrations
psql -U postgres -c "CREATE DATABASE natyatheerth;"
psql -U postgres -d natyatheerth -f migrations/001_initial_schema.sql

# 4. Start the Functions host
npm start
# API available at http://localhost:7071/api
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `POSTGRES_HOST` | PostgreSQL server hostname |
| `POSTGRES_PORT` | PostgreSQL port (default: 5432) |
| `POSTGRES_DB` | Database name |
| `POSTGRES_USER` | Database username |
| `POSTGRES_PASSWORD` | Database password |
| `POSTGRES_SSL` | Enable SSL (`true` in production) |
| `JWT_SECRET` | Secret for signing JWTs |
| `ADMIN_EMAIL` | Admin email for notifications |
| `SMTP_HOST` | SMTP server for email |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |

---

## ☁️ Infrastructure — Azure (Bicep)

### Resources Deployed
| Resource | Purpose |
|----------|---------|
| Azure Static Web Apps | Hosts the Angular frontend |
| Azure Functions (Consumption) | Serverless API |
| Azure Database for PostgreSQL Flexible Server | Database (v15, Burstable B1ms) |
| Azure Storage Account | Function app storage + media |

### Deploy to Azure

```bash
# 1. Login to Azure (tenant: pringa.onmicrosoft.com)
az login --tenant pringa.onmicrosoft.com

# 2. Set the target subscription
az account set --subscription c7db7efa-b163-448a-8af0-23062dc21f5a

# 3. Create resource group
az group create --name natya-theerth-prod-rg --location canadaeast

# 4. Create Key Vault and store secrets (first-time setup)
az keyvault create \
  --name natyatheerth-prod-kv \
  --resource-group natya-theerth-prod-rg \
  --location canadaeast

az keyvault secret set --vault-name natyatheerth-prod-kv --name postgres-admin-password --value "<YOUR_PASSWORD>"
az keyvault secret set --vault-name natyatheerth-prod-kv --name jwt-secret --value "<YOUR_SECRET>"

# 5. Look up the Entra ID object ID of the PostgreSQL admin user and update parameters.json
ENTRA_OBJECT_ID=$(az ad user show --id karthik@pringa.onmicrosoft.com --query id -o tsv)
# Set the value of "postgresEntraAdminObjectId" in infrastructure/parameters.json to $ENTRA_OBJECT_ID

# 6. Deploy infrastructure
az deployment group create \
  --subscription c7db7efa-b163-448a-8af0-23062dc21f5a \
  --resource-group natya-theerth-prod-rg \
  --template-file infrastructure/main.bicep \
  --parameters infrastructure/parameters.json
```

> **Azure Portal:** https://portal.azure.com/#@pringa.onmicrosoft.com/resource/subscriptions/c7db7efa-b163-448a-8af0-23062dc21f5a/overview

---

## 🚀 CI/CD — GitHub Actions

| Workflow | Trigger | Action |
|----------|---------|--------|
| `deploy-frontend-angular.yml` | Push to `main`, `frontend-angular/**` | Build Angular + deploy to Azure SWA |
| `deploy-api-functions.yml` | Push to `main`, `api-functions/**` | Build TypeScript + deploy to Azure Functions |
| `build-mobile-ionic.yml` | Push to `main`, `mobile-ionic/**` | Build Ionic + produce Android APK artifact |
| `deploy-infrastructure.yml` | Manual (`workflow_dispatch`) | Validate and deploy Bicep templates |

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `AZURE_CREDENTIALS` | Azure service principal JSON (tenant: `pringa.onmicrosoft.com`) |
| `AZURE_SUBSCRIPTION_ID` | Azure subscription ID: `c7db7efa-b163-448a-8af0-23062dc21f5a` |
| `POSTGRES_ADMIN_PASSWORD` | PostgreSQL admin password |
| `JWT_SECRET` | JWT signing secret |

> **Note:** `AZURE_STATIC_WEB_APPS_API_TOKEN` is **no longer required** as a GitHub secret.  
> The `deploy-frontend-angular.yml` workflow logs in via `azure/login@v2` using `AZURE_CREDENTIALS` and then fetches the SWA deployment token automatically with:
> ```bash
> az staticwebapp secrets list --name natyatheerth-prod-web --resource-group natya-theerth-prod-rg --query "properties.apiKey" -o tsv
> ```

---

## 📞 Contact

| | |
|-|-|
| **Guru** | Sruthi Ganesapandian |
| **Email** | sruthi@natyatheerth.com |
| **Phone** | +1 902-441-8675 |
| **Location** | Halifax, NS, Canada |
| **Website** | https://natyatheerth.ca |

---

> _Bharatanatyam • Halifax, NS • Est. 2018_  
> _கலையின் தீர்த்தத்தில் நடனம்_
