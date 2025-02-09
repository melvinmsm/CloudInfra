import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    cloudProvider: "",
    projectId: "",
    region: "",
    zone: "",
    machineType: "",
    instanceName: "",
    osImage: "",
    diskSize: 20,
    network: "default",
    subnetwork: "default",
    assignExternalIp: true,
    tags: "",
    startupScript: "",
    autoDeleteDisk: true,
    preemptible: false,
    serviceAccountEmail: "",
    serviceAccountScopes: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const sendRequest = (endpoint, method = "POST", body = null) => {
    console.log(`Sending request to ${endpoint} with method ${method}`);
    fetch(`http://localhost:5000/api/${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    })
      .then((response) => response.json())
      .then((data) => console.log(`${endpoint} Response:`, data))
      .catch((error) => console.error(`${endpoint} Error:`, error));
  };

  const handleConfigure = () => sendRequest("configure", "POST", formData);
  const handleDeploy = () => sendRequest("deploy");
  const handleGetStatus = () => {
    console.log("Get Status button clicked");
    sendRequest("status", "GET");
  };
  const handleDestroy = () => sendRequest("destroy");

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '10px' }}>CloudInfra</h1>
      <p style={{ fontSize: '1.2em', color: '#555' }}>
        Seamless automation for cloud infrastructure provisioning and management.
      </p>
    </div>
    
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          width: "100%",
          maxWidth: "1000px",
          justifyContent: "space-between",
        }}
      >
        <fieldset style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "45%" }}>
          <legend style={{ fontWeight: "bold" }}>Basic Configuration</legend>
          <label>
            Cloud Provider (GCP, AWS, Azure):
            <select
              name="cloudProvider"
              value={formData.cloudProvider}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">Select a Cloud Provider</option>
              <option value="gcp">Google Cloud Platform (GCP)</option>
              <option value="aws">Amazon Web Services (AWS)</option>
              <option value="azure">Microsoft Azure</option>
            </select>
          </label>
          <label>
            Project ID:
            <input
              type="text"
              name="projectId"
              value={formData.projectId}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Region (e.g., us-central1):
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Zone (e.g., us-central1-a):
            <input
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Instance Name:
            <input
              type="text"
              name="instanceName"
              value={formData.instanceName}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
        </fieldset>

        <fieldset style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "45%" }}>
          <legend style={{ fontWeight: "bold" }}>Advanced Configuration</legend>
          <label>
            Machine Type (e.g., e2-micro):
            <input
              type="text"
              name="machineType"
              value={formData.machineType}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            OS Image (e.g., debian-cloud/debian-11):
            <input
              type="text"
              name="osImage"
              value={formData.osImage}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Disk Size (GB):
            <input
              type="number"
              name="diskSize"
              value={formData.diskSize}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Network:
            <input
              type="text"
              name="network"
              value={formData.network}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
          <label>
            Subnetwork:
            <input
              type="text"
              name="subnetwork"
              value={formData.subnetwork}
              onChange={handleInputChange}
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0 15px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
        </fieldset>
      </form>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-around",
          width: "50%",
        }}
      >
        <button
          type="button"
          onClick={handleConfigure}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Configure
        </button>
        <button
          type="button"
          onClick={handleDeploy}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffc107",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Deploy
        </button>
        <button
          type="button"
          onClick={handleGetStatus}
          style={{
            padding: "10px 20px",
            backgroundColor: "#17a2b8",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Status
        </button>
        <button
          type="button"
          onClick={handleDestroy}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Destroy
        </button>
      </div>
    </div>
  );
};

export default App;
