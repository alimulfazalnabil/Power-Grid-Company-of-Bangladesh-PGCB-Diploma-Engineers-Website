resource "azurerm_monitor_diagnostic_setting" "storage" {
  count = var.log_analytics_workspace_id == null ? 0 : 1

  name                       = "storage-monitor"
  target_resource_id         = azurerm_storage_account.this.id
  log_analytics_workspace_id = var.log_analytics_workspace_id

  enabled_log {
    category = "StorageRead"
  }

  enabled_log {
    category = "StorageWrite"
  }

  metric {
    category = "Transaction"
  }
}