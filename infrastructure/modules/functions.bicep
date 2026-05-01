param name               string
param location           string
param tags               object
param storageAccountName string
param postgresHost       string
param postgresDb         string
param postgresUser       string
@secure()
param postgresPassword   string
@secure()
param jwtSecret          string
param adminEmail         string
param adminUsername      string
@secure()
param adminPasswordHash  string
param smtpHost           string = ''
param smtpPort           string = '587'
param smtpUser           string = ''
@secure()
param smtpPass           string = ''

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name:     storageAccountName
  location: location
  tags:     tags
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}

resource hostingPlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name:     '${name}-plan'
  location: location
  tags:     tags
  sku: { name: 'Y1', tier: 'Dynamic' }
  properties: { reserved: false }
}

resource functionApp 'Microsoft.Web/sites@2023-01-01' = {
  name:     name
  location: location
  tags:     tags
  kind: 'functionapp'
  properties: {
    serverFarmId: hostingPlan.id
    siteConfig: {
      appSettings: [
        { name: 'AzureWebJobsStorage',       value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${storageAccount.listKeys().keys[0].value}' }
        { name: 'FUNCTIONS_WORKER_RUNTIME',  value: 'node' }
        { name: 'FUNCTIONS_EXTENSION_VERSION', value: '~4' }
        { name: 'WEBSITE_NODE_DEFAULT_VERSION', value: '~18' }
        { name: 'POSTGRES_HOST',     value: postgresHost }
        { name: 'POSTGRES_PORT',     value: '5432' }
        { name: 'POSTGRES_DB',       value: postgresDb }
        { name: 'POSTGRES_USER',     value: postgresUser }
        { name: 'POSTGRES_PASSWORD', value: postgresPassword }
        { name: 'POSTGRES_SSL',      value: 'true' }
        { name: 'JWT_SECRET',        value: jwtSecret }
        { name: 'ADMIN_EMAIL',       value: adminEmail }
        { name: 'EMAIL_FROM',        value: adminEmail }
        { name: 'ADMIN_USERNAME',    value: adminUsername }
        { name: 'ADMIN_PASSWORD_HASH', value: adminPasswordHash }
        { name: 'NODE_ENV',          value: 'production' }
        { name: 'SMTP_HOST',         value: smtpHost }
        { name: 'SMTP_PORT',         value: smtpPort }
        { name: 'SMTP_USER',         value: smtpUser }
        { name: 'SMTP_PASS',         value: smtpPass }
      ]
      cors: {
        allowedOrigins: [
          'https://natyatheerth.com'
          'https://www.natyatheerth.com'
        ]
        supportCredentials: true
      }
      nodeVersion: '~18'
    }
    httpsOnly: true
  }
}

output url     string = 'https://${functionApp.properties.defaultHostName}'
output appId   string = functionApp.id
