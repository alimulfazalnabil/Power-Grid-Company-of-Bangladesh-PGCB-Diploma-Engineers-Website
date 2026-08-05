variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "vnet_name" {
  type = string
}

variable "address_space" {
  type = list(string)
}

variable "private_dns_zone_links" {
  type = map(object({
    zone_name           = string
    resource_group_name = string
  }))
  default = {}
}

variable "tags" {
  type    = map(string)
  default = {}
}