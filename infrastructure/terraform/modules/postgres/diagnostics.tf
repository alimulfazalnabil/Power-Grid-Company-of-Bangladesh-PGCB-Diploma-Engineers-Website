resource "azurerm_monitor_diagnostic_setting" "postgres" {
  count = var.log_analytics_workspace_id == null ? 0 : 1

  name                       = "postgres-monitor"
  target_resource_id         = azurerm_postgresql_flexible_server.this.id
  log_analytics_workspace_id = var.log_analytics_workspace_id

  enabled_log {
    category = "PostgreSQLLogs"
  }

  metric {
    category = "AllMetrics"
  }
}