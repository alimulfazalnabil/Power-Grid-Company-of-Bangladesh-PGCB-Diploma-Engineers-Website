locals {
  common_tags = merge({
    Project     = "Enterprise CMS"
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "Infrastructure Team"
  }, var.tags)
}

module "resource_group" {
  source = "./modules/resource-group"

  name     = var.resource_group_name
  location = var.location
  tags     = local.common_tags
}

module "networking" {
  source = "./modules/networking"

  resource_group_name = module.resource_group.name
  location            = var.location
  vnet_name           = "enterprise-cms-vnet"
  address_space       = ["10.0.0.0/16"]
  tags                = local.common_tags
}

module "private_dns" {
  source = "./modules/private-dns"

  resource_group_name = module.resource_group.name
  vnet_id             = module.networking.vnet_id
  tags                = local.common_tags
}

module "monitoring" {
  source = "./modules/monitoring"

  resource_group_name       = module.resource_group.name
  location                  = var.location
  workspace_name            = var.workspace_name
  application_insights_name = var.application_insights_name
  retention_days            = var.monitoring_retention_days
  aks_cluster_id            = var.aks_cluster_id
  tags                      = local.common_tags
}

module "acr" {
  source = "./modules/acr"

  resource_group_name = module.resource_group.name
  location            = var.location
  acr_name            = var.acr_name
  sku                 = "Standard"
  tags                = local.common_tags
}

module "storage" {
  source = "./modules/storage"

  resource_group_name        = module.resource_group.name
  location                   = var.location
  storage_account_name       = var.storage_account_name
  replication_type           = var.storage_replication_type
  log_analytics_workspace_id = module.monitoring.workspace_id
  tags                       = local.common_tags
}

module "keyvault" {
  source = "./modules/keyvault"

  resource_group_name        = module.resource_group.name
  location                   = var.location
  tenant_id                  = var.tenant_id
  key_vault_name             = var.key_vault_name
  private_endpoint_subnet_id = module.networking.private_endpoint_subnet_id
  private_dns_zone_id        = module.private_dns.keyvault_private_dns_zone_id
  aks_identity_object_id     = var.aks_identity_object_id
  log_analytics_workspace_id = module.monitoring.workspace_id
  tags                       = local.common_tags
}

module "managed_identity" {
  source = "./modules/managed-identity"

  resource_group_name = module.resource_group.name
  location            = var.location
  identity_name       = "enterprise-cms-identity"
  key_vault_id        = module.keyvault.key_vault_id
  storage_account_id  = module.storage.storage_account_id
  acr_id              = module.acr.id
  github_oidc_subject = var.github_oidc_subject
  tags                = local.common_tags
}

module "postgres" {
  source = "./modules/postgres"

  resource_group_name         = module.resource_group.name
  location                    = var.location
  server_name                 = var.postgres_server_name
  database_name               = "enterprise_cms"
  administrator_login         = "postgresadmin"
  administrator_password      = var.postgres_password
  delegated_subnet_id         = module.networking.postgres_subnet_id
  private_dns_zone_id         = module.private_dns.postgres_private_dns_zone_id
  log_analytics_workspace_id  = module.monitoring.workspace_id
  sku_name                    = var.postgres_sku_name
  storage_mb                  = var.postgres_storage_mb
  enable_high_availability    = var.environment == "production"
  tags                        = local.common_tags
}

module "redis" {
  source = "./modules/redis"

  resource_group_name        = module.resource_group.name
  location                   = var.location
  redis_name                 = var.redis_name
  sku_name                   = var.redis_sku_name
  family                     = var.redis_family
  capacity                   = var.redis_capacity
  private_endpoint_subnet_id = module.networking.private_endpoint_subnet_id
  private_dns_zone_id        = module.private_dns.redis_private_dns_zone_id
  log_analytics_workspace_id = module.monitoring.workspace_id
  tags                       = local.common_tags
}

module "aks" {
  source = "./modules/aks"

  cluster_name        = var.aks_cluster_name
  location            = var.location
  resource_group_name = module.resource_group.name
  dns_prefix          = var.aks_dns_prefix
  kubernetes_version  = var.aks_kubernetes_version
  subnet_id           = module.networking.aks_subnet_id
  acr_id              = module.acr.id
  workspace_id        = module.monitoring.workspace_id
  ssh_public_key      = var.aks_ssh_public_key
  node_count          = var.aks_node_count
  node_vm_size        = var.aks_node_vm_size
  tags                = local.common_tags
}

module "frontdoor" {
  source = "./modules/frontdoor"

  resource_group_name = module.resource_group.name
  location            = var.location
  profile_name        = var.frontdoor_profile_name
  endpoint_name       = var.frontdoor_endpoint_name
  origin_hostname     = var.frontdoor_origin_hostname
  custom_domain       = var.frontdoor_custom_domain
  tags                = local.common_tags
}

module "backup" {
  source = "./modules/backup"

  resource_group_name      = module.resource_group.name
  location                 = var.location
  vault_name               = var.backup_vault_name
  storage_account_id       = module.storage.storage_account_id
  storage_account_name     = module.storage.storage_account_name
  postgres_server_id       = module.postgres.server_id
  aks_cluster_name         = module.aks.cluster_name
  aks_cluster_id           = module.aks.cluster_id
  log_analytics_workspace_id = module.monitoring.workspace_id
  action_group_id          = module.monitoring.action_group_id
  tags                     = local.common_tags
}
