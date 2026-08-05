variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "profile_name" {
  type = string
}

variable "endpoint_name" {
  type = string
}

variable "origin_hostname" {
  type = string
}

variable "custom_domain" {
  type = string
  default = ""
}

variable "tags" {
  type = map(string)
}
