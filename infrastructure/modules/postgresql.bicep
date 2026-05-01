param name         string
param location     string
param tags         object
param adminUser    string
@secure()
param adminPassword string
param databaseName string
param skuName      string = 'Standard_B1ms'
param skuTier      string = 'Burstable'

@description('Entra ID (Azure AD) principal name to set as PostgreSQL administrator (e.g. user@tenant.onmicrosoft.com)')
param entraAdminUser string = ''

@description('Entra ID (Azure AD) object ID of the administrator principal')
param entraAdminObjectId string = ''

resource postgres 'Microsoft.DBforPostgreSQL/flexibleServers@2023-06-01-preview' = {
  name:     name
  location: location
  tags:     tags
  sku: {
    name: skuName
    tier: skuTier
  }
  properties: {
    administratorLogin:         adminUser
    administratorLoginPassword: adminPassword
    version: '15'
    storage: { storageSizeGB: 32 }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    highAvailability: { mode: 'Disabled' }
    authConfig: {
      activeDirectoryAuth: 'Enabled'
      passwordAuth: 'Enabled'
      tenantId: tenant().tenantId
    }
  }
}

resource entraAdmin 'Microsoft.DBforPostgreSQL/flexibleServers/administrators@2023-06-01-preview' = if (!empty(entraAdminObjectId)) {
  parent: postgres
  name:   entraAdminObjectId
  properties: {
    principalName: entraAdminUser
    principalType: 'User'
    tenantId:      tenant().tenantId
  }
}

resource database 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2023-06-01-preview' = {
  parent: postgres
  name:   databaseName
  properties: {
    charset: 'UTF8'
    collation: 'en_US.UTF8'
  }
}

resource firewallAzure 'Microsoft.DBforPostgreSQL/flexibleServers/firewallRules@2023-06-01-preview' = {
  parent: postgres
  name:   'AllowAzureServices'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress:   '0.0.0.0'
  }
}

// Allowlist PostgreSQL extensions required by the application schema.
// Azure Database for PostgreSQL Flexible Server requires extensions to be listed
// in the 'azure.extensions' server parameter before CREATE EXTENSION can succeed.
// The migration (migrations/001_initial_schema.sql) uses uuid-ossp for UUID primary keys.
resource extensionConfig 'Microsoft.DBforPostgreSQL/flexibleServers/configurations@2023-06-01-preview' = {
  parent: postgres
  name: 'azure.extensions'
  properties: {
    value: 'uuid-ossp'
    source: 'user-override'
  }
}

output fullyQualifiedDomainName string = postgres.properties.fullyQualifiedDomainName
output serverId                  string = postgres.id
