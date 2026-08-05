variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "key_vault_name" {
  type = string
}

variable "tenant_id" {
  type = string
}

variable "sku_name" {
  type    = string
  default = "standard"
}

variable "private_endpoint_subnet_id" {
  type = string
}

variable "aks_identity_object_id" {
  type    = string
  default = null
}

variable "log_analytics_workspace_id" {
  type    = string
  default = null
}

variable "private_dns_zone_id" {
  type = string
}

variable "tags" {
  type = map(string)
}
