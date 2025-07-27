let lineChartInstance = null;
let pieChartInstance = null;

const users = [
  { email: "admin@example.com", password: "admin123" },
  { email: "user@example.com", password: "user123" }
];

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("dashboardSection").classList.remove("hidden");
  document.getElementById("userRole").textContent = user.email;
}

function logout() {
  document.getElementById("dashboardSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  if (lineChartInstance) lineChartInstance.destroy();
  if (pieChartInstance) pieChartInstance.destroy();
}


function parseData(inputStr) {
  return inputStr
    .split(",")
    .map(v => parseFloat(v.trim()))
    .filter(v => !isNaN(v));
}

function renderCharts() {
  const lineInput = document.getElementById("lineInput").value;
  const pieInput = document.getElementById("pieInput").value;

  const lineData = parseData(lineInput);
  const pieData = parseData(pieInput);

  if (lineData.length !== 6) {
    alert("Please enter 6 values for line chart (one for each month).");
    return;
  }
  if (pieData.length !== 3) {
    alert("Please enter 3 values for pie chart (e.g., stocks, savings, investments).");
    return;
  }

  const lineCtx = document.getElementById("lineChart").getContext("2d");
  if (lineChartInstance) lineChartInstance.destroy();

  lineChartInstance = new Chart(lineCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{
        label: "Revenue",
        data: lineData,
        borderColor: "white",
        backgroundColor: "rgba(255,255,255,0.2)",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "white" } } },
      scales: {
        x: { ticks: { color: "white" } },
        y: { ticks: { color: "white" } }
      }
    }
  });

  const pieCtx = document.getElementById("pieChart").getContext("2d");
  if (pieChartInstance) pieChartInstance.destroy();

  pieChartInstance = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Stocks", "Savings", "Investments"],
      datasets: [{
        label: "Distribution",
        data: pieData,
        backgroundColor: ["#f44336", "#e91e63", "#9c27b0"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "white" } } }
    }
  });
}
