output "vnet_id" {
  value = azurerm_virtual_network.this.id
}

output "aks_subnet_id" {
  value = azurerm_subnet.aks.id
}

output "postgres_subnet_id" {
  value = azurerm_subnet.postgres.id
}

output "redis_subnet_id" {
  value = azurerm_subnet.redis.id
}

output "private_endpoint_subnet_id" {
  value = azurerm_subnet.private.id
}

output "nsg_ids" {
  value = {
    aks      = azurerm_network_security_group.aks.id
    postgres = azurerm_network_security_group.postgres.id
    redis    = azurerm_network_security_group.redis.id
    private  = azurerm_network_security_group.private.id
  }
}

output "route_table_ids" {
  value = {
    aks      = azurerm_route_table.aks.id
    postgres = azurerm_route_table.postgres.id
    redis    = azurerm_route_table.redis.id
    private  = azurerm_route_table.private.id
  }
}

output "private_dns_zone_link_ids" {
  value = {
    for key, value in azurerm_private_dns_zone_virtual_network_link.this : key => value.id
  }
}