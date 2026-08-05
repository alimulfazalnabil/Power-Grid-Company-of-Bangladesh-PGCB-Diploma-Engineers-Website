resource "azurerm_key_vault" "this" {
  name                = var.key_vault_name
  location            = var.location
  resource_group_name = var.resource_group_name
  tenant_id           = var.tenant_id
  sku_name            = var.sku_name

  purge_protection_enabled         = true
  soft_delete_retention_days       = 90
  enabled_for_deployment           = false
  enabled_for_disk_encryption      = false
  enabled_for_template_deployment = false
  public_network_access_enabled    = false
  enable_rbac_authorization        = true

  tags = var.tags
}
