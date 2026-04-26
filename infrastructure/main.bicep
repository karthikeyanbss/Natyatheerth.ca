// ============================================================
// Natya Theerth Kalai Koodam – Azure Infrastructure
// ============================================================

targetScope = 'resourceGroup'

@description('Environment name (dev, staging, prod)')
@allowed(['dev', 'staging', 'prod'])
param environment string = 'prod'

@description('Azure region')
param location string = resourceGroup().location

@description('Application name prefix')
param appName string = 'natyatheerth'

@description('PostgreSQL admin username')
param postgresAdminUser string = 'natyaadmin'

@secure()
@description('PostgreSQL admin password')
param postgresAdminPassword string

@secure()
@description('JWT Secret for API authentication')
param jwtSecret string

@description('Admin email address')
param adminEmail string = 'sruthig@natyatheerth.com'

@description('Apex custom domain for the Static Web App (e.g. natyatheerth.ca). Leave empty to skip custom domain registration.')
param apexDomain string = ''

@description('www subdomain for the Static Web App (e.g. www.natyatheerth.ca). Leave empty to skip.')
param wwwDomain string = ''

var prefix = '${appName}-${environment}'
var tags = {
  project: 'Natya Theerth Kalai Koodam'
  environment: environment
  managedBy: 'Bicep'
}

// Storage account names: max 24 chars, lowercase letters and numbers only
// e.g. 'natyatheerth' (12) + 'prod' (4) + 'stor' (4) = 20 chars — safe
var storageAccountName = take(replace('${appName}${environment}stor', '-', ''), 24)

// Static Web App (Angular frontend)
// Note: Microsoft.Web/staticSites is not available in canadaeast; eastus2 is used instead.
module staticWebApp 'modules/static-web-app.bicep' = {
  name: 'staticWebApp'
  params: {
    name:       '${prefix}-web'
    location:   'eastus2'
    tags:       tags
    apexDomain: apexDomain
    wwwDomain:  wwwDomain
  }
}

// Azure Functions (TypeScript API)
module functions 'modules/functions.bicep' = {
  name: 'functions'
  params: {
    name: '${prefix}-functions'
    location: location
    tags: tags
    storageAccountName: storageAccountName
    postgresHost: postgresql.outputs.fullyQualifiedDomainName
    postgresDb: 'natyatheerth'
    postgresUser: postgresAdminUser
    postgresPassword: postgresAdminPassword
    jwtSecret: jwtSecret
    adminEmail: adminEmail
  }
}

// PostgreSQL Flexible Server
// Note: Microsoft.DBforPostgreSQL/flexibleServers is offer-restricted in canadaeast; canadacentral is used instead.
// Note: Using 'psql' suffix to avoid name conflict from previously failed canadaeast deployment reservation.
module postgresql 'modules/postgresql.bicep' = {
  name: 'postgresql'
  params: {
    name: '${prefix}-psql'
    location: 'canadacentral'
    tags: tags
    adminUser: postgresAdminUser
    adminPassword: postgresAdminPassword
    databaseName: 'natyatheerth'
  }
}

// Storage Account
module storage 'modules/storage.bicep' = {
  name: 'storage'
  params: {
    name: storageAccountName
    location: location
    tags: tags
  }
}

output staticWebAppUrl      string = staticWebApp.outputs.url
output staticWebAppHostname string = staticWebApp.outputs.defaultHostname
output functionsUrl         string = functions.outputs.url
output postgresHost         string = postgresql.outputs.fullyQualifiedDomainName
