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

output url    string = 'https://${swa.properties.defaultHostname}'

@description('Deployment token used as AZURE_STATIC_WEB_APPS_API_TOKEN in GitHub Actions')
@secure()
output apiKey string = swa.listSecrets().properties.apiKey
