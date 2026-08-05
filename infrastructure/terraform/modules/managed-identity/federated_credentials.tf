resource "azurerm_federated_identity_credential" "github" {
  name                = "github-actions"
  resource_group_name = var.resource_group_name
  parent_id           = azurerm_user_assigned_identity.this.id
  issuer              = "https://token.actions.githubusercontent.com"
  audience            = ["api://AzureADTokenExchange"]
  subject             = var.github_oidc_subject
}