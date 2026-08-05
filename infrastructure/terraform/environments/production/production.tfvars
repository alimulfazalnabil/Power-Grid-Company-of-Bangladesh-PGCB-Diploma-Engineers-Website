project_name              = "pgcb-cms"
environment               = "production"
location                  = "germanywestcentral"
resource_group_name       = "cms-prod-rg"
frontdoor_web_origin_host = "web.pgcb.gov.bd"
frontdoor_api_origin_host = "api.pgcb.gov.bd"

aks_node_count   = 5
aks_node_vm_size = "Standard_D8s_v5"

postgres_sku_name   = "MO_Standard_E8ds_v5"
postgres_storage_mb = 524288

redis_sku_name = "Premium"
redis_family   = "P"
redis_capacity = 2

tags = {
  Project     = "Enterprise CMS"
  Environment = "Production"
  Owner       = "IT"
  ManagedBy   = "Terraform"
}
