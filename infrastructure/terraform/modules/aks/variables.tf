variable "cluster_name" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "dns_prefix" {
  type = string
}

variable "kubernetes_version" {
  type    = string
  default = "1.31"
}

variable "subnet_id" {
  type = string
}

variable "acr_id" {
  type = string
}

variable "workspace_id" {
  type = string
}

variable "ssh_public_key" {
  type = string
}

variable "node_count" {
  type    = number
  default = 3
}

variable "node_vm_size" {
  type    = string
  default = "Standard_D4ds_v5"
}

variable "tags" {
  type = map(string)
}
