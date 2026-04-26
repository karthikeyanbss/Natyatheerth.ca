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

var prefix = '${appName}-${environment}'
var tags = {
  project: 'Natya Theerth Kalai Koodam'
  environment: environment
  managedBy: 'Bicep'
}

// Static Web App (Angular frontend)
module staticWebApp 'modules/static-web-app.bicep' = {
  name: 'staticWebApp'
  params: {
    name: '${prefix}-web'
    location: location
    tags: tags
  }
}

// Azure Functions (TypeScript API)
module functions 'modules/functions.bicep' = {
  name: 'functions'
  params: {
    name: '${prefix}-functions'
    location: location
    tags: tags
    storageAccountName: replace('${prefix}stor', '-', '')
    postgresHost: postgresql.outputs.fullyQualifiedDomainName
    postgresDb: 'natyatheerth'
    postgresUser: postgresAdminUser
    postgresPassword: postgresAdminPassword
    jwtSecret: jwtSecret
    adminEmail: adminEmail
  }
}

// PostgreSQL Flexible Server
module postgresql 'modules/postgresql.bicep' = {
  name: 'postgresql'
  params: {
    name: '${prefix}-pg'
    location: location
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
    name: replace('${prefix}stor', '-', '')
    location: location
    tags: tags
  }
}

output staticWebAppUrl    string = staticWebApp.outputs.url
output functionsUrl       string = functions.outputs.url
output postgresHost       string = postgresql.outputs.fullyQualifiedDomainName
