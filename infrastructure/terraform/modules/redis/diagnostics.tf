resource "azurerm_monitor_diagnostic_setting" "redis" {
  count = var.log_analytics_workspace_id == null ? 0 : 1

  name                       = "redis-monitor"
  target_resource_id         = azurerm_redis_cache.this.id
  log_analytics_workspace_id = var.log_analytics_workspace_id

  enabled_log {
    category = "ConnectedClientList"
  }

  metric {
    category = "AllMetrics"
  }
}