resource "azurerm_redis_cache" "this" {
  name                = var.redis_name
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = var.capacity
  family              = var.family
  sku_name            = var.sku_name

  minimum_tls_version           = var.minimum_tls_version
  enable_non_ssl_port           = false
  public_network_access_enabled = false
  redis_version                 = "6"

  redis_configuration {
    maxmemory_policy   = "allkeys-lru"
    notify_keyspace_events = "KEA"
  }

  tags = var.tags
}
