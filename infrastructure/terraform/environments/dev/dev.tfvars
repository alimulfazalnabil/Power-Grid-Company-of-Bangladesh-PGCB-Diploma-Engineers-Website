project_name              = "pgcb-cms"
environment               = "dev"
location                  = "southeastasia"
resource_group_name       = "rg-pgcb-cms-dev"
frontdoor_web_origin_host = "dev-web.pgcb.example.com"
frontdoor_api_origin_host = "dev-api.pgcb.example.com"

tags = {
  owner       = "platform-team"
  cost_center = "digital"
  criticality = "medium"
}
