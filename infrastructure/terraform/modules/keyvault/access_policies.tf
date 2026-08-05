resource "azurerm_role_assignment" "aks" {
  count = var.aks_identity_object_id == null ? 0 : 1

  scope                = azurerm_key_vault.this.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = var.aks_identity_object_id
}