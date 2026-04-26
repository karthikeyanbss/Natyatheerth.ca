param name          string
param location      string
param tags          object

@description('Apex custom domain (e.g. natyatheerth.ca). Leave empty to skip.')
param apexDomain string = ''

@description('www subdomain (e.g. www.natyatheerth.ca). Leave empty to skip.')
param wwwDomain string = ''

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

// Apex domain validation uses a TXT record containing the SWA validation token.
// Before deploying, create the following DNS record at your registrar:
//   Type: TXT  Name: @  Value: <token from portal or CLI>
// Then add an ALIAS/ANAME record (or Azure DNS alias) pointing @ → defaultHostname.
resource apexCustomDomain 'Microsoft.Web/staticSites/customDomains@2023-01-01' = if (!empty(apexDomain)) {
  parent: swa
  name:   apexDomain
  properties: {
    validationMethod: 'dns-txt-token'
  }
}

// www subdomain validation uses a CNAME record.
// Before deploying, create the following DNS record at your registrar:
//   Type: CNAME  Name: www  Value: <defaultHostname>
resource wwwCustomDomain 'Microsoft.Web/staticSites/customDomains@2023-01-01' = if (!empty(wwwDomain)) {
  parent: swa
  name:   wwwDomain
  properties: {
    validationMethod: 'cname-delegation'
  }
  dependsOn: [apexCustomDomain]
}

output url            string = 'https://${swa.properties.defaultHostname}'
output defaultHostname string = swa.properties.defaultHostname
