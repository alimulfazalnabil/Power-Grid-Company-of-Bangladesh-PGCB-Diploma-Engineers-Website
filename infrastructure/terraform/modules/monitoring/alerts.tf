resource "azurerm_monitor_metric_alert" "high_cpu" {
  count = var.aks_cluster_id == null ? 0 : 1

  name                = "aks-high-cpu"
  resource_group_name = var.resource_group_name
  scopes              = [var.aks_cluster_id]
  severity            = 2
  frequency           = "PT1M"
  window_size         = "PT5M"
  description         = "Alert when AKS node CPU average exceeds 80 percent."

  criteria {
    metric_namespace = "Microsoft.ContainerService/managedClusters"
    metric_name      = "node_cpu_usage_percentage"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 80
  }

  action {
    action_group_id = azurerm_monitor_action_group.operations.id
  }

  tags = var.tags
}