// Dummy data
const dummyData = {
  "Reliance": {
    "company": "Reliance",
    "score": 82,
    "factors": { "Debt": -12, "Volatility": -8, "Sentiment": 2 },
    "news": [
      {"headline": "Reliance launches 5G", "sentiment": "positive"},
      {"headline": "Reliance debt rises", "sentiment": "negative"}
    ]
  },
  "Tata": {
    "company": "Tata",
    "score": 70,
    "factors": { "Debt": -5, "Volatility": -10, "Sentiment": 15 },
    "news": [
      {"headline": "Tata invests in EVs", "sentiment": "positive"},
      {"headline": "Tata steel demand drops", "sentiment": "negative"}
    ]
  }
};

let chartInstance;

function fetchScore() {
  const company = document.getElementById("companyInput").value.trim();
  const data = dummyData[company];

  if (!data) {
    alert("No data found. Try 'Reliance' or 'Tata'");
    return;
  }

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("companyName").innerText = data.company;
  document.getElementById("score").innerText = data.score;

  // Score card color
  const scoreCard = document.getElementById("scoreCard");
  if (data.score >= 75) scoreCard.style.background = "#c8f7c5";
  else if (data.score >= 50) scoreCard.style.background = "#fff6a5";
  else scoreCard.style.background = "#f7c5c5";

  // Chart
  const ctx = document.getElementById("factorsChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(data.factors),
      datasets: [{
        label: "Factor Impact",
        data: Object.values(data.factors),
        backgroundColor: ["#ff9999", "#9999ff", "#99ff99"]
      }]
    }
  });

  // News list
  const newsList = document.getElementById("newsList");
  newsList.innerHTML = "";
  data.news.forEach(n => {
    const li = document.createElement("li");
    li.innerText = n.headline;
    li.className = n.sentiment === "positive" ? "positive" : "negative";
    newsList.appendChild(li);
  });
}
