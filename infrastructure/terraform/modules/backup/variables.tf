variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "vault_name" {
  type = string
}

variable "storage_account_id" {
  type = string
}

variable "storage_account_name" {
  type = string
}

variable "postgres_server_id" {
  type = string
}

variable "aks_cluster_name" {
  type = string
}

variable "aks_cluster_id" {
  type = string
}

variable "log_analytics_workspace_id" {
  type = string
}

variable "action_group_id" {
  type = string
}

variable "tags" {
  type = map(string)
}