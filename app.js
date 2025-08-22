const data = {
  "Reliance": {
    score: 82,
    factors: { debt: -12, volatility: -8, sentiment: +2 },
    news: [
      { headline: "Reliance launches 5G services", sentiment: "positive" },
      { headline: "Reliance debt rises in Q2", sentiment: "negative" }
    ]
  },
  "Tata": {
    score: 75,
    factors: { debt: -10, volatility: -5, sentiment: +5 },
    news: [
      { headline: "Tata Motors sees growth in EV sales", sentiment: "positive" },
      { headline: "Tata Steel faces global slowdown", sentiment: "negative" }
    ]
  },
  "Infosys": {
    score: 88,
    factors: { debt: +5, volatility: -3, sentiment: +6 },
    news: [
      { headline: "Infosys secures new IT contracts", sentiment: "positive" },
      { headline: "IT sector facing attrition issues", sentiment: "negative" }
    ]
  },
  "Wipro": {
    score: 68,
    factors: { debt: -8, volatility: -7, sentiment: -2 },
    news: [
      { headline: "Wipro launches AI solutions", sentiment: "positive" },
      { headline: "Wipro revenue growth slows", sentiment: "negative" }
    ]
  },
  "HDFC": {
    score: 80,
    factors: { debt: -5, volatility: -4, sentiment: +3 },
    news: [
      { headline: "HDFC Bank posts strong quarterly results", sentiment: "positive" },
      { headline: "RBI policies impact loan margins", sentiment: "negative" }
    ]
  },
  "ICICI": {
    score: 77,
    factors: { debt: -6, volatility: -6, sentiment: +4 },
    news: [
      { headline: "ICICI expands digital banking services", sentiment: "positive" },
      { headline: "Banking stocks face market correction", sentiment: "negative" }
    ]
  },
  "Adani": {
    score: 60,
    factors: { debt: -20, volatility: -15, sentiment: -5 },
    news: [
      { headline: "Adani Group invests in green energy", sentiment: "positive" },
      { headline: "Adani faces scrutiny over debt levels", sentiment: "negative" }
    ]
  }
};

let chartInstance;

function getScore() {
  const company = document.getElementById("companyInput").value.trim();
  const resultDiv = document.getElementById("result");
  const companyName = document.getElementById("companyName");
  const creditScore = document.getElementById("creditScore");
  const newsList = document.getElementById("newsList");

  if (!data[company]) {
    alert("Company not found. Please try one from the list.");
    return;
  }

  const companyData = data[company];
  resultDiv.classList.remove("hidden");
  companyName.textContent = company;
  creditScore.textContent = companyData.score;

  // Update Chart
  const ctx = document.getElementById("factorChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(companyData.factors),
      datasets: [{
        label: "Factor Impact",
        data: Object.values(companyData.factors),
        backgroundColor: ["#007bff", "#ffc107", "#28a745"]
      }]
    }
  });

  // Update News
  newsList.innerHTML = "";
  companyData.news.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n.headline;
    li.classList.add(n.sentiment === "positive" ? "positive" : "negative");
    newsList.appendChild(li);
  });
}

