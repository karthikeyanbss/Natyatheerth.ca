param name         string
param location     string
param tags         object
param adminUser    string
@secure()
param adminPassword string
param databaseName string
param skuName      string = 'Standard_B1ms'
param skuTier      string = 'Burstable'

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
      activeDirectoryAuth: 'Disabled'
      passwordAuth: 'Enabled'
    }
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
