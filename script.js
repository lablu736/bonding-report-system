// Pre-defined Databases
const masterCustomers = ["OLD NAVY", "GAP INC", "NIKE", "ADIDAS", "PUMA", "H&M", "TARGET", "ZARA"];
const vendorNames = ["JAY MILLS (BANGLADESH) PRIVATE LTD", "APEX SPINNING", "VIYELLETEX GROUP", "PALMAL GROUP"];

const engineers = [
  { name: "Tanvir Ahmed", mobile: "+8801711001122", email: "tanvir@avery.com" },
  { name: "Rahim Chowdhury", mobile: "+8801819334455", email: "rahim@avery.com" },
  { name: "Kazi Sakib", mobile: "+8801912556677", email: "sakib@avery.com" }
];

// Helper Function: Match First 3, Last 3, or Any Letters
function filterMatches(query, list) {
  if (!query) return [];
  const q = query.toLowerCase();
  return list.filter(item => {
    const text = (typeof item === 'string' ? item : item.name).toLowerCase();
    const first3 = text.slice(0, 3);
    const last3 = text.slice(-3);
    return text.includes(q) || first3.includes(q) || last3.includes(q);
  });
}

// Setup Dynamic Autocomplete
function setupAutocomplete(inputId, listId, dataArray, onSelectCallback) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(listId);

  input.addEventListener("input", function () {
    const val = this.value.trim();
    dropdown.innerHTML = "";
    
    const matches = filterMatches(val, dataArray);

    if (matches.length > 0) {
      dropdown.style.display = "block";
      matches.forEach(match => {
        const li = document.createElement("li");
        const displayText = typeof match === 'string' ? match : match.name;
        li.textContent = displayText;
        
        li.onclick = () => {
          input.value = displayText;
          dropdown.style.display = "none";
          if (onSelectCallback) onSelectCallback(match);
        };
        dropdown.appendChild(li);
      });
    } else {
      dropdown.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target !== input) dropdown.style.display = "none";
  });
}

// Initialize Autocompletes on Load
document.addEventListener("DOMContentLoaded", () => {
  setupAutocomplete("customerInput", "customerList", masterCustomers);
  setupAutocomplete("vendorInput", "vendorList", vendorNames);
  
  // Engineer Selection Auto-fills Mobile and Email
  setupAutocomplete("engineerInput", "engineerList", engineers, (selectedEngineer) => {
    document.getElementById("mobileInput").value = selectedEngineer.mobile;
    document.getElementById("emailInput").value = selectedEngineer.email;
  });
});
