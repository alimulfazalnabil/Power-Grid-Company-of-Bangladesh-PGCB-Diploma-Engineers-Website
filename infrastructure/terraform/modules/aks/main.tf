resource "azurerm_kubernetes_cluster" "this" {
  name                = var.cluster_name
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = var.dns_prefix
  kubernetes_version  = var.kubernetes_version
  private_cluster_enabled = true
  oidc_issuer_enabled     = true
  workload_identity_enabled = true
  role_based_access_control_enabled = true
  local_account_disabled = true
  sku_tier               = "Standard"
  automatic_upgrade_channel = "stable"
  image_cleaner_enabled      = true
  image_cleaner_interval_hours = 48
  azure_policy_enabled       = true
  node_resource_group        = "${var.cluster_name}-nodes"

  default_node_pool {
    name                         = "system"
    vm_size                      = var.node_vm_size
    node_count                   = var.node_count
    enable_auto_scaling          = true
    min_count                    = 3
    max_count                    = 10
    vnet_subnet_id               = var.subnet_id
    only_critical_addons_enabled = true
  }

  linux_profile {
    admin_username = "azureadmin"

    ssh_key {
      key_data = var.ssh_public_key
    }
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin      = "azure"
    network_plugin_mode = "overlay"
    network_policy      = "azure"
    load_balancer_sku   = "standard"
    outbound_type       = "loadBalancer"
  }

  oms_agent {
    log_analytics_workspace_id = var.workspace_id
  }

  tags = var.tags
}
