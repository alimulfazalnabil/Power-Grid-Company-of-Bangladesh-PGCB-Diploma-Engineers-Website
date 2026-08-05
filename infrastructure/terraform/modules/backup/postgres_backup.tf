resource "azurerm_monitor_diagnostic_setting" "postgres_backup_visibility" {
  name                       = "postgres-backup-visibility"
  target_resource_id         = var.postgres_server_id
  log_analytics_workspace_id = var.log_analytics_workspace_id

  enabled_log {
    category = "PostgreSQLLogs"
  }

  metric {
    category = "AllMetrics"
  }
}