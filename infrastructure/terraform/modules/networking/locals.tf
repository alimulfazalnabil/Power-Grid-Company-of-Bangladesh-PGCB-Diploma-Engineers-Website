locals {
  subnets = {
    aks = {
      name   = "aks-subnet"
      prefix = "10.0.1.0/24"
    }

    postgres = {
      name   = "postgres-subnet"
      prefix = "10.0.2.0/24"
    }

    redis = {
      name   = "redis-subnet"
      prefix = "10.0.3.0/24"
    }

    private = {
      name   = "private-endpoints"
      prefix = "10.0.4.0/24"
    }
  }
}