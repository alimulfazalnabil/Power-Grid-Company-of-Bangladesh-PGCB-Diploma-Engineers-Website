resource "azurerm_storage_container" "velero" {
  name                  = "velero-backups"
  storage_account_name  = var.storage_account_name
  container_access_type = "private"
}