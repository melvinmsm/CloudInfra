variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
}

variable "zone" {
  description = "GCP Zone"
  type        = string
}

variable "machine_type" {
  description = "Compute Engine machine type"
  type        = string
}

variable "instance_name" {
  description = "Name of the Compute Engine instance"
  type        = string
}

variable "os_image" {
  description = "OS Image for the instance"
  type        = string
}

variable "disk_size" {
  description = "Size of the boot disk (GB)"
  type        = number
}

variable "network" {
  description = "VPC Network Name"
  type        = string
}

variable "subnetwork" {
  description = "Subnetwork Name"
  type        = string
}

variable "assign_external_ip" {
  description = "Whether to assign an external IP"
  type        = bool
}

variable "tags" {
  description = "List of network tags"
  type        = list(string)
  default     = []
}

variable "metadata" {
  description = "Metadata for instance configuration"
  type        = map(any)  # Changed from map(string) to map(any) to support scripts
  default     = {}
}

variable "firewall_rules" {
  description = "Firewall rules"
  type        = list(object({
    name     = string
    protocol = string
    ports    = list(string)
  }))
  default = []
}

variable "auto_delete_disk" {
  description = "Whether the disk should be auto-deleted"
  type        = bool
}

variable "preemptible" {
  description = "Whether the instance should be preemptible"
  type        = bool
}

variable "service_account" {
  description = "Service account configuration"
  type        = object({
    email  = string
    scopes = list(string)
  })
}
