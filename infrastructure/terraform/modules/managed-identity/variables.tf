variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "identity_name" {
  type = string
}

variable "key_vault_id" {
  type = string
}

variable "storage_account_id" {
  type = string
}

variable "acr_id" {
  type = string
}

variable "github_oidc_subject" {
  type = string
}

variable "tags" {
  type = map(string)
}