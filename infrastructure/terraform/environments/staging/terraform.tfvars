environment         = "staging"
location            = "Germany West Central"
resource_group_name = "enterprise-cms-staging-rg"
acr_name            = "enterprisecmsstagingacr"
storage_account_name = "enterprisecmsstagingst"
key_vault_name      = "enterprise-cms-staging-kv"
tenant_id           = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
workspace_name              = "enterprise-cms-staging-law"
application_insights_name   = "enterprise-cms-staging-ai"
postgres_server_name        = "enterprise-cms-staging-db"
postgres_password           = "stored-in-key-vault"
redis_name                  = "enterprise-cms-staging-redis"
aks_cluster_name            = "enterprise-cms-staging"
aks_dns_prefix              = "enterprise-cms-staging"
aks_ssh_public_key          = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0enterprisecmsstagingplaceholderkey enterprise-cms"
frontdoor_profile_name      = "enterprise-cms-staging-frontdoor"
frontdoor_endpoint_name     = "enterprise-cms-staging"
frontdoor_origin_hostname   = "ingress.enterprise-cms-staging.internal"
backup_vault_name           = "enterprise-cms-staging-rsv"






