let leads = JSON.parse(localStorage.getItem("leads")) || [];

// SAVE DATA
function saveData() {
  localStorage.setItem("leads", JSON.stringify(leads));
}

// ADD LEAD
function addLead() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let status = document.getElementById("status").value;

  if (!name || !email) return;

  leads.push({ name, email, status });

  saveData();
  renderLeads();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

// DELETE LEAD
function deleteLead(index) {
  leads.splice(index, 1);
  saveData();
  renderLeads();
}

// EDIT LEAD
function editLead(index) {
  let lead = leads[index];

  let name = prompt("Edit Name", lead.name);
  let email = prompt("Edit Email", lead.email);
  let status = prompt("Edit Status", lead.status);

  if (name && email && status) {
    leads[index] = { name, email, status };
    saveData();
    renderLeads();
  }
}

// DASHBOARD UPDATE
function updateDashboard() {
  document.getElementById("total").innerText = "Total: " + leads.length;
  document.getElementById("new").innerText =
    "New: " + leads.filter(l => l.status === "New").length;

  document.getElementById("working").innerText =
    "Working: " + leads.filter(l => l.status === "Working").length;

  document.getElementById("converted").innerText =
    "Converted: " + leads.filter(l => l.status === "Converted").length;
}

// RENDER + SEARCH
function renderLeads() {
  let table = document.getElementById("leadTable");
  let search = document.getElementById("search").value.toLowerCase();

  table.innerHTML = "";

  leads
    .filter(l =>
      l.name.toLowerCase().includes(search) ||
      l.email.toLowerCase().includes(search) ||
      l.status.toLowerCase().includes(search)
    )
    .forEach((lead, index) => {
      table.innerHTML += `
        <tr>
          <td>${lead.name}</td>
          <td>${lead.email}</td>
          <td>${lead.status}</td>
          <td>
            <button onclick="editLead(${index})">Edit</button>
            <button onclick="deleteLead(${index})">Delete</button>
          </td>
        </tr>
      `;
    });

  updateDashboard();
}

renderLeads();
