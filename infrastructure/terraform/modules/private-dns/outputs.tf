output "postgres_private_dns_zone_id" {
  value = azurerm_private_dns_zone.postgres.id
}

output "blob_private_dns_zone_id" {
  value = azurerm_private_dns_zone.blob.id
}

output "keyvault_private_dns_zone_id" {
  value = azurerm_private_dns_zone.keyvault.id
}

output "redis_private_dns_zone_id" {
  value = azurerm_private_dns_zone.redis.id
}

output "acr_private_dns_zone_id" {
  value = azurerm_private_dns_zone.acr.id
}