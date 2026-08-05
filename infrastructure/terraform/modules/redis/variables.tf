variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "redis_name" {
  type = string
}

variable "capacity" {
  type    = number
  default = 1
}

variable "family" {
  type    = string
  default = "C"
}

variable "sku_name" {
  type    = string
  default = "Standard"
}

variable "minimum_tls_version" {
  type    = string
  default = "1.2"
}

variable "private_endpoint_subnet_id" {
  type = string
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
