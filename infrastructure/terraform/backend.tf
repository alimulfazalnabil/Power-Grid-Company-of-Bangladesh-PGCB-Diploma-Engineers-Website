terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-rg"
    storage_account_name = "tfstateprod"
    container_name       = "tfstate"
    key                  = "enterprise-cms.tfstate"
  }
}