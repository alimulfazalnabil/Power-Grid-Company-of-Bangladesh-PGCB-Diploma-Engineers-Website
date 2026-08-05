resource "azurerm_cdn_frontdoor_origin_group" "this" {
  name                     = "aks-origin-group"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.this.id
  session_affinity_enabled = false

  load_balancing {}

  health_probe {
    interval_in_seconds = 30
    path                = "/health"
    protocol            = "Https"
    request_type        = "GET"
  }
}

resource "azurerm_cdn_frontdoor_origin" "aks" {
  name                           = "aks"
  cdn_frontdoor_origin_group_id  = azurerm_cdn_frontdoor_origin_group.this.id
  host_name                      = var.origin_hostname
  http_port                      = 80
  https_port                     = 443
  certificate_name_check_enabled = true
  enabled                        = true
  origin_host_header             = var.origin_hostname
}