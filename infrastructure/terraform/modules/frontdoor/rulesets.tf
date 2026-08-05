resource "azurerm_cdn_frontdoor_rule_set" "this" {
  name                     = "enterprisecmsrules"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.this.id
}