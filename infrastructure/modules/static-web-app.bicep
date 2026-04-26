param name     string
param location string
param tags     object

resource swa 'Microsoft.Web/staticSites@2023-01-01' = {
  name:     name
  location: location
  tags:     tags
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    enterpriseGradeCdnStatus: 'Disabled'
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
  }
}

output url            string = 'https://${swa.properties.defaultHostname}'
output deploymentToken string = swa.listSecrets().properties.apiKey
