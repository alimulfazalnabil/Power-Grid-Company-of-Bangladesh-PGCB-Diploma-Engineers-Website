resource "azurerm_postgresql_flexible_server" "this" {
  name                   = var.server_name
  location               = var.location
  resource_group_name    = var.resource_group_name
  administrator_login    = var.administrator_login
  administrator_password = var.administrator_password
  delegated_subnet_id    = var.delegated_subnet_id
  private_dns_zone_id    = var.private_dns_zone_id
  version                = "16"
  sku_name               = var.sku_name
  storage_mb             = var.storage_mb
  backup_retention_days  = 14
  geo_redundant_backup_enabled = false
  zone                   = "1"
  public_network_access_enabled = false

  dynamic "high_availability" {
    for_each = var.enable_high_availability ? [1] : []

    content {
      mode = "ZoneRedundant"
    }
  }

  maintenance_window {
    day_of_week  = 0
    start_hour   = 3
    start_minute = 0
  }

  tags = var.tags
}
