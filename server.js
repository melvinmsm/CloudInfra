require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const TERRAFORM_FILE = "main.tf";

//generate Terraform file dynamically
app.post("/api/configure", (req, res) => {
  const terraformVars = `
project_id = "${req.body.project_id || ""}"
region = "${req.body.region || ""}"
zone = "${req.body.zone || ""}"
machine_type = "${req.body.machine_type || ""}"
instance_name = "${req.body.instance_name || ""}"
os_image = "${req.body.os_image || ""}"
disk_size = ${req.body.disk_size || 10}
network = "${req.body.network || "default"}"
subnetwork = "${req.body.subnetwork || "default"}"
assign_external_ip = ${req.body.assign_external_ip || false}
tags = ${JSON.stringify(req.body.tags || [])}
metadata = ${JSON.stringify(req.body.metadata || {})}
auto_delete_disk = ${req.body.auto_delete_disk || false}
preemptible = ${req.body.preemptible || false}
service_account = {
  email = "${req.body.service_account?.email || ""}"
  scopes = ${JSON.stringify(req.body.service_account?.scopes || [])}
}
`;

  fs.writeFile("terraform.tfvars", terraformVars, (err) => {
    if (err) {
      console.error("Error writing terraform.tfvars:", err);
      return res.status(500).json({ error: "Failed to write Terraform vars file" });
    }

    console.log("terraform.tfvars successfully written.");
    res.json({ message: "Terraform variables configured" });
  });
});

//deploy the Terraform configuration
app.post("/api/deploy", (req, res) => {
  exec(`terraform destroy -auto-approve -no-color`, (destroyErr, destroyStdout, destroyStderr) => {
    if (destroyErr) {
      console.error("Terraform Destroy Failed:", destroyStderr);
      return res.status(500).json({ error: "Terraform destroy failed. Check logs." });
    }

    console.log("Terraform Destroy Successful");

    // Adding a delay to ensure the instance is fully removed
    setTimeout(() => {
      exec(`terraform apply -auto-approve -var-file=terraform.tfvars -no-color`, (applyErr, applyStdout, applyStderr) => {
        if (applyErr) {
          console.error("Terraform Apply Failed:", applyStderr);
          return res.status(500).json({ error: applyStderr.trim() });
        }

        console.log("Terraform Apply Successful");
        res.json({
          message: "Compute Engine instance created successfully",
          output: applyStdout.trim()
        });
      });
    }, 5000); 
  });
});





//destroy the Compute Engine instance
app.post("/api/destroy", (req, res) => {
  exec(`terraform destroy -auto-approve`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ message: "Compute Engine instance destroyed", output: stdout });
  });
});

//check Terraform status
app.get("/api/status", (req, res) => {
  exec(`terraform show -no-color`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ status: stdout });
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
