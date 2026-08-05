resource "azurerm_kubernetes_cluster_node_pool" "applications" {
  name                  = "apps"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.this.id
  vm_size               = var.node_vm_size
  enable_auto_scaling   = true
  min_count             = 2
  max_count             = 20
  mode                  = "User"
  vnet_subnet_id        = var.subnet_id
}