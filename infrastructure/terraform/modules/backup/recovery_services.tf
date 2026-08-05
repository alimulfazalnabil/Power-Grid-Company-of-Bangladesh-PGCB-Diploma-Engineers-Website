resource "azurerm_recovery_services_vault" "this" {
  name                          = var.vault_name
  location                      = var.location
  resource_group_name           = var.resource_group_name
  sku                           = "Standard"
  storage_mode_type             = "GeoRedundant"
  soft_delete_enabled           = true
  public_network_access_enabled = false
  tags                          = var.tags
}