project_name              = "pgcb-cms"
environment               = "staging"
location                  = "southeastasia"
resource_group_name       = "rg-pgcb-cms-staging"
frontdoor_web_origin_host = "staging-web.pgcb.example.com"
frontdoor_api_origin_host = "staging-api.pgcb.example.com"

aks_node_vm_size = "Standard_D8s_v5"

postgres_sku_name   = "GP_Standard_D8ds_v5"
postgres_storage_mb = 262144

redis_capacity = 2

tags = {
  owner       = "platform-team"
  cost_center = "digital"
  criticality = "high"
}
