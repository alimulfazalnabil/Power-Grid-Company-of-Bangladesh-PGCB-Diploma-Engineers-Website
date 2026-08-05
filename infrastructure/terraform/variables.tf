variable "project_name" {
  description = "Project slug used in resource naming."
  type        = string
  default     = "enterprise-cms"
}

variable "environment" {
  description = "Environment name: dev, staging, production."
  type        = string
}

variable "location" {
  description = "Azure region for deployment."
  type        = string
}

variable "resource_group_name" {
  description = "Primary resource group name."
  type        = string
}

variable "acr_name" {
  description = "Azure Container Registry name."
  type        = string
}

variable "storage_account_name" {
  description = "Azure Storage Account name."
  type        = string
}

variable "workspace_name" {
  description = "Log Analytics workspace name."
  type        = string
}

variable "application_insights_name" {
  description = "Application Insights component name."
  type        = string
}

variable "key_vault_name" {
  description = "Azure Key Vault name."
  type        = string
}

variable "tenant_id" {
  description = "Microsoft Entra tenant ID."
  type        = string
}

variable "tags" {
  description = "Common tags applied to all resources."
  type        = map(string)
  default     = {}
}

variable "vnet_cidr" {
  description = "CIDR for primary VNet."
  type        = string
  default     = "10.0.0.0/16"
}

variable "aks_subnet_cidr" {
  description = "CIDR for AKS node subnet."
  type        = string
  default     = "10.0.1.0/24"
}

variable "db_subnet_cidr" {
  description = "CIDR for PostgreSQL delegated subnet."
  type        = string
  default     = "10.0.2.0/24"
}

variable "redis_subnet_cidr" {
  description = "CIDR for Redis subnet."
  type        = string
  default     = "10.0.3.0/24"
}

variable "private_endpoints_subnet_cidr" {
  description = "CIDR for private endpoint subnet."
  type        = string
  default     = "10.0.4.0/24"
}

variable "private_dns_zone_links" {
  description = "Optional private DNS zones to link with the VNet."
  type = map(object({
    zone_name           = string
    resource_group_name = string
  }))
  default = {}
}

variable "aks_kubernetes_version" {
  description = "AKS version."
  type        = string
  default     = "1.31"
}

variable "aks_cluster_name" {
  description = "Azure Kubernetes Service cluster name."
  type        = string
}

variable "aks_dns_prefix" {
  description = "DNS prefix for Azure Kubernetes Service cluster."
  type        = string
}

variable "aks_ssh_public_key" {
  description = "SSH public key for AKS Linux profile. Replace placeholder before deployment."
  type        = string
}

variable "aks_node_count" {
  description = "Default AKS node count for system pool."
  type        = number
  default     = 3
}

variable "aks_node_vm_size" {
  description = "VM size for AKS system nodes."
  type        = string
  default     = "Standard_D4s_v5"
}

variable "postgres_sku_name" {
  description = "PostgreSQL Flexible Server SKU."
  type        = string
  default     = "Standard_B2s"
}

variable "postgres_storage_mb" {
  description = "PostgreSQL storage in MB."
  type        = number
  default     = 32768
}

variable "postgres_server_name" {
  description = "Azure PostgreSQL Flexible Server name."
  type        = string
}

variable "postgres_password" {
  description = "Azure PostgreSQL administrator password. Provide securely during deployment."
  type        = string
  sensitive   = true
}

variable "redis_sku_name" {
  description = "Redis SKU family name."
  type        = string
  default     = "Standard"
}

variable "redis_family" {
  description = "Redis SKU family."
  type        = string
  default     = "C"
}

variable "redis_capacity" {
  description = "Redis cache capacity."
  type        = number
  default     = 1
}

variable "redis_name" {
  description = "Azure Cache for Redis name."
  type        = string
}

variable "storage_replication_type" {
  description = "Storage account replication type."
  type        = string
  default     = "LRS"
}

variable "monitoring_retention_days" {
  description = "Log Analytics retention in days."
  type        = number
  default     = 30
}

variable "aks_identity_object_id" {
  description = "Optional AKS managed identity object ID for Key Vault RBAC."
  type        = string
  default     = null
}

variable "aks_cluster_id" {
  description = "Optional AKS cluster ID for monitoring alerts."
  type        = string
  default     = null
}

variable "github_oidc_subject" {
  description = "GitHub OIDC subject used for Azure federated identity credential."
  type        = string
  default     = "repo:alimulfazalnabil/Power-Grid-Company-of-Bangladesh-PGCB-Diploma-Engineers-Website:ref:refs/heads/alimul-fazal-nabil/set-up-the-development-environment-fxHTwH"
}

variable "frontdoor_web_origin_host" {
  description = "Legacy Front Door web origin hostname."
  type        = string
  default     = ""
}

variable "frontdoor_api_origin_host" {
  description = "Legacy Front Door API origin hostname."
  type        = string
  default     = ""
}

variable "frontdoor_profile_name" {
  description = "Azure Front Door profile name."
  type        = string
}

variable "frontdoor_endpoint_name" {
  description = "Azure Front Door endpoint name."
  type        = string
}

variable "frontdoor_origin_hostname" {
  description = "Public hostname of the AKS ingress origin behind Front Door."
  type        = string
}

variable "backup_vault_name" {
  description = "Recovery Services Vault name for backup and disaster recovery."
  type        = string
}

variable "frontdoor_custom_domain" {
  description = "Optional custom domain for Front Door endpoint."
  type        = string
  default     = ""
}
