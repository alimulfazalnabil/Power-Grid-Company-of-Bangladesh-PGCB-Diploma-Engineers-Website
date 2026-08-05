output "resource_group_name" {
  value = module.resource_group.name
}

output "vnet_id" {
  value = module.networking.vnet_id
}

output "aks_subnet_id" {
  value = module.networking.aks_subnet_id
}

output "postgres_subnet_id" {
  value = module.networking.postgres_subnet_id
}

output "redis_subnet_id" {
  value = module.networking.redis_subnet_id
}

output "private_endpoint_subnet_id" {
  value = module.networking.private_endpoint_subnet_id
}

output "private_dns_postgres_zone_id" {
  value = module.private_dns.postgres_private_dns_zone_id
}

output "private_dns_storage_zone_id" {
  value = module.private_dns.blob_private_dns_zone_id
}

output "private_dns_keyvault_zone_id" {
  value = module.private_dns.keyvault_private_dns_zone_id
}

output "private_dns_redis_zone_id" {
  value = module.private_dns.redis_private_dns_zone_id
}

output "private_dns_acr_zone_id" {
  value = module.private_dns.acr_private_dns_zone_id
}

output "log_analytics_workspace_id" {
  value = module.monitoring.workspace_id
}

output "application_insights_connection_string" {
  value     = module.monitoring.connection_string
  sensitive = true
}

output "acr_id" {
  value = module.acr.id
}

output "acr_login_server" {
  value = module.acr.login_server
}

output "acr_name" {
  value = module.acr.name
}

output "storage_account_id" {
  value = module.storage.storage_account_id
}

output "storage_account_name" {
  value = module.storage.storage_account_name
}

output "storage_primary_blob_endpoint" {
  value = module.storage.primary_blob_endpoint
}

output "storage_media_container" {
  value = module.storage.media_container
}

output "key_vault_id" {
  value = module.keyvault.key_vault_id
}

output "key_vault_uri" {
  value = module.keyvault.vault_uri
}

output "managed_identity_id" {
  value = module.managed_identity.identity_id
}

output "managed_identity_client_id" {
  value = module.managed_identity.client_id
}

output "managed_identity_principal_id" {
  value = module.managed_identity.principal_id
}

output "postgres_server_id" {
  value = module.postgres.server_id
}

output "postgres_fqdn" {
  value = module.postgres.fqdn
}

output "postgres_database_name" {
  value = module.postgres.database_name
}

output "redis_id" {
  value = module.redis.redis_id
}

output "redis_hostname" {
  value = module.redis.hostname
}

output "redis_ssl_port" {
  value = module.redis.ssl_port
}

output "aks_cluster_name" {
  value = module.aks.cluster_name
}

output "aks_cluster_id" {
  value = module.aks.cluster_id
}

output "aks_oidc_issuer_url" {
  value = module.aks.oidc_issuer_url
}

output "aks_kubelet_identity" {
  value = module.aks.kubelet_identity
}

output "frontdoor_endpoint_hostname" {
  value = module.frontdoor.endpoint_hostname
}

output "frontdoor_profile_id" {
  value = module.frontdoor.profile_id
}

output "recovery_vault_id" {
  value = module.backup.recovery_vault_id
}
