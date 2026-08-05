variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "workspace_name" {
  type = string
}

variable "application_insights_name" {
  type = string
}

variable "retention_days" {
  type    = number
  default = 30
}

variable "aks_cluster_id" {
  type    = string
  default = null
}

variable "tags" {
  type = map(string)
}
