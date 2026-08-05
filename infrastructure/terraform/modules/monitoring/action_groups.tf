resource "azurerm_monitor_action_group" "operations" {
  name                = "operations"
  resource_group_name = var.resource_group_name
  short_name          = "ops"
  tags                = var.tags
}