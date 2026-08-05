package kubernetes.admission

default allow = false

approved_registry(image) {
  startswith(image, "enterprisecmsprodacr.azurecr.io/")
}

approved_registry(image) {
  startswith(image, "enterprisecmsstagingacr.azurecr.io/")
}

approved_registry(image) {
  startswith(image, "enterprisecmsdevacr.azurecr.io/")
}

allow {
  input.request.kind.kind == "Pod"
  every container in input.request.object.spec.containers {
    approved_registry(container.image)
  }
}
