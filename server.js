require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const TERRAFORM_FILE = "main.tf";

// API to generate Terraform file dynamically
app.post("/api/configure", (req, res) => {
  const { project_id, region, machine_type } = req.body;

  if (!project_id || !region || !machine_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Generate Terraform configuration
  const terraformConfig = `
provider "google" {
  project     = "${project_id}"
  region      = "${region}"
  credentials = file("~/.config/gcloud/application_default_credentials.json")
}

resource "google_compute_instance" "vm_instance" {
  name         = "my-instance"
  machine_type = "${machine_type}"
  zone         = "${region}-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
    access_config {}  # Assigns an external IP
  }
}
`;

  // Write to main.tf
  fs.writeFile(TERRAFORM_FILE, terraformConfig, (err) => {
    if (err) return res.status(500).json({ error: "Failed to write Terraform file" });
    res.json({ message: "Terraform configuration saved" });
  });
});

// API to deploy the Terraform configuration
app.post("/api/deploy", (req, res) => {
  exec(`terraform init && terraform apply -auto-approve`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ message: "Compute Engine instance created", output: stdout });
  });
});

// API to destroy the Compute Engine instance
app.post("/api/destroy", (req, res) => {
  exec(`terraform destroy -auto-approve`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ message: "Compute Engine instance destroyed", output: stdout });
  });
});

// API to check Terraform status
app.get("/api/status", (req, res) => {
  exec(`terraform show -no-color`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ status: stdout });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
