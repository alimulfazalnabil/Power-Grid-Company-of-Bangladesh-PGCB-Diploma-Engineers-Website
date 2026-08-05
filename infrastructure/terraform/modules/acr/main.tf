resource "azurerm_container_registry" "this" {
  name                = var.acr_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = var.sku
  admin_enabled       = var.admin_enabled
  tags                = var.tags
}

resource "azurerm_container_registry_scope_map" "pull" {
  name                    = "pull-access"
  container_registry_name = azurerm_container_registry.this.name
  resource_group_name     = var.resource_group_name

  actions = [
    "repositories/*/content/read",
    "repositories/*/metadata/read",
  ]
}

resource "azurerm_container_registry_replication" "west_europe" {
  count = var.sku == "Premium" ? 1 : 0

  name                  = "westeurope"
  location              = "West Europe"
  container_registry_id = azurerm_container_registry.this.id
}
