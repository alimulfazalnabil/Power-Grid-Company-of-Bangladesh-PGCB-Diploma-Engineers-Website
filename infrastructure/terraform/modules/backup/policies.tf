resource "azurerm_data_protection_backup_vault" "aks" {
  name                = "${var.aks_cluster_name}-backup-vault"
  resource_group_name = var.resource_group_name
  location            = var.location
  datastore_type      = "VaultStore"
  redundancy          = "GeoRedundant"
  identity {
    type = "SystemAssigned"
  }

  tags = var.tags
}