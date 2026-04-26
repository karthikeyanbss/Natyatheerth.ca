param name         string
param location     string
param tags         object
param adminUser    string
@secure()
param adminPassword string
param databaseName string
param skuName      string = 'Standard_B1ms'
param skuTier      string = 'Burstable'

@description('Object ID (principal ID) of the shared Entra ID administrator. Leave empty to skip AD admin creation.')
param entraAdminObjectId string = ''

@description('Tenant ID for Entra ID authentication. Required when entraAdminObjectId is provided.')
param entraAdminTenantId string = ''

@description('Display name of the shared Entra ID administrator principal.')
param entraAdminName string = ''

@description('Principal type of the Entra ID administrator: ServicePrincipal, User, or Group.')
param entraAdminPrincipalType string = 'ServicePrincipal'

var enableEntraAuth = !empty(entraAdminObjectId) && !empty(entraAdminTenantId) && !empty(entraAdminName)

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
      activeDirectoryAuth: enableEntraAuth ? 'Enabled' : 'Disabled'
      passwordAuth: 'Enabled'
      tenantId: enableEntraAuth ? entraAdminTenantId : null
    }
  }
}

resource pgEntraAdmin 'Microsoft.DBforPostgreSQL/flexibleServers/administrators@2023-06-01-preview' = if (enableEntraAuth) {
  parent: postgres
  name:   entraAdminObjectId
  properties: {
    principalName: entraAdminName
    principalType: entraAdminPrincipalType
    tenantId:      entraAdminTenantId
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

output fullyQualifiedDomainName string = postgres.properties.fullyQualifiedDomainName
output serverId                  string = postgres.id
