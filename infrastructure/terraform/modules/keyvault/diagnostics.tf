resource "azurerm_monitor_diagnostic_setting" "kv" {
  count = var.log_analytics_workspace_id == null ? 0 : 1

  name                       = "keyvault-monitor"
  target_resource_id         = azurerm_key_vault.this.id
  log_analytics_workspace_id = var.log_analytics_workspace_id

  enabled_log {
    category = "AuditEvent"
  }

  metric {
    category = "AllMetrics"
  }
}