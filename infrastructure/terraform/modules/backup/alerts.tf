resource "azurerm_monitor_metric_alert" "backup_failed" {
  name                = "backup-failed"
  resource_group_name = var.resource_group_name
  scopes              = [azurerm_recovery_services_vault.this.id]
  severity            = 2
  frequency           = "PT5M"
  window_size         = "PT15M"
  description         = "Alert when backup vault health metrics indicate failures."

  criteria {
    metric_namespace = "Microsoft.RecoveryServices/vaults"
    metric_name      = "BackupHealthEvent"
    aggregation      = "Count"
    operator         = "GreaterThan"
    threshold        = 0
  }

  action {
    action_group_id = var.action_group_id
  }

  tags = var.tags
}