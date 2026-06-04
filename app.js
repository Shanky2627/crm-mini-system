let leads = JSON.parse(localStorage.getItem("leads")) || [];

function addLead() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let status = document.getElementById("status").value;

  let lead = { name, email, status };
  leads.push(lead);

  localStorage.setItem("leads", JSON.stringify(leads));

  renderLeads();
}

function deleteLead(index) {
  leads.splice(index, 1);
  localStorage.setItem("leads", JSON.stringify(leads));
  renderLeads();
}

function renderLeads() {
  let table = document.getElementById("leadTable");
  table.innerHTML = "";

  leads.forEach((lead, index) => {
    table.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.status}</td>
        <td>
          <button onclick="deleteLead(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

renderLeads();