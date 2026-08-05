resource "azurerm_storage_management_policy" "velero_retention" {
  storage_account_id = var.storage_account_id

  rule {
    name    = "velero-retention"
    enabled = true

    filters {
      blob_types   = ["blockBlob"]
      prefix_match = ["velero-backups/"]
    }

    actions {
      base_blob {
        tier_to_cool_after_days_since_modification_greater_than    = 30
        tier_to_archive_after_days_since_modification_greater_than = 180
        delete_after_days_since_modification_greater_than          = 365
      }
    }
  }
}