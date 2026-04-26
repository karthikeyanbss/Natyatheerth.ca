param name     string
param location string
param tags     object

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name:     name
  location: location
  tags:     tags
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    accessTier:             'Hot'
    allowBlobPublicAccess:  false
    minimumTlsVersion:      'TLS1_2'
    supportsHttpsTrafficOnly: true
    allowSharedKeyAccess:   true
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccount
  name:   'default'
}

resource mediaContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name:   'media'
  properties: { publicAccess: 'None' }
}

output storageAccountId   string = storageAccount.id
output storageAccountName string = storageAccount.name
output primaryEndpoint    string = storageAccount.properties.primaryEndpoints.blob
