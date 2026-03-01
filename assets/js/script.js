const checklistConfig = [
  {
    key: "incomeProtection",
    label: "Income Protection",
    formula: "Annual Income x 20",
    inputType: "number",
    category: "Risk Protection",
    calcTarget: (b) => b.annualIncome * 20,
    direction: "higher",
  },
  {
    key: "emergencyFund",
    label: "Emergency Fund",
    formula: "Monthly Expenses x 3",
    inputType: "number",
    category: "Emergency & Debt",
    calcTarget: (b) => b.monthlyExpenses * 3,
    direction: "higher",
  },
  {
    key: "healthInsurance",
    label: "Health Insurance",
    formula: "Annual Income x 8",
    inputType: "number",
    category: "Risk Protection",
    calcTarget: (b) => b.annualIncome * 8,
    direction: "higher",
  },
  {
    key: "criticalIllness",
    label: "Critical Illness Cover",
    formula: "Annual Income x 3",
    inputType: "number",
    category: "Risk Protection",
    calcTarget: (b) => b.annualIncome * 3,
    direction: "higher",
  },
  {
    key: "disabilityInsurance",
    label: "Disability Insurance",
    formula: "Annual Income x 3",
    inputType: "number",
    category: "Risk Protection",
    calcTarget: (b) => b.annualIncome * 3,
    direction: "higher",
  },
  {
    key: "retirementGoals",
    label: "Retirement Goals",
    formula: "Monthly Expenses x 300",
    inputType: "number",
    category: "Goal Planning",
    calcTarget: (b) => b.monthlyExpenses * 300,
    direction: "higher",
  },
  {
    key: "childEducationFund",
    label: "Child Education Fund",
    formula: "Today Expenses + Future Inflation",
    inputType: "number",
    category: "Goal Planning",
    calcTarget: (b) => b.childGoal,
    direction: "higher",
  },
  {
    key: "marriageFund",
    label: "Marriage Fund",
    formula: "According to Inflation Adjusted",
    inputType: "number",
    category: "Goal Planning",
    calcTarget: (b) => b.marriageGoal,
    direction: "higher",
  },
  {
    key: "debtManagement",
    label: "Debt Management (Monthly EMI)",
    formula: "EMI Burden (Max 40% Income)",
    inputType: "number",
    category: "Emergency & Debt",
    calcTarget: (b) => (b.annualIncome / 12) * 0.4,
    direction: "lower",
  },
  {
    key: "wealthPlanning",
    label: "Wealth Planning (Monthly Investment)",
    formula: "Build Wealth (Save 20% or More)",
    inputType: "number",
    category: "Wealth & Investment",
    calcTarget: (b) => (b.annualIncome / 12) * 0.2,
    direction: "higher",
  },
  {
    key: "homeLoanRent",
    label: "Home Loan / Rent (Monthly)",
    formula: "Rent Affordability (Max 30% Income)",
    inputType: "number",
    category: "Emergency & Debt",
    calcTarget: (b) => (b.annualIncome / 12) * 0.3,
    direction: "lower",
  },
  {
    key: "cibilScore",
    label: "CIBIL Score",
    formula: "750+ Good, 800+ Very Good",
    inputType: "number",
    category: "Emergency & Debt",
    calcTarget: () => 750,
    direction: "special-cibil",
  },
  {
    key: "spouseCoverage",
    label: "Spouse Coverage",
    formula: "Annual Income x 10",
    inputType: "number",
    category: "Risk Protection",
    calcTarget: (b) => b.annualIncome * 10,
    direction: "higher",
  },
  {
    key: "taxPlanning",
    label: "Tax Planning",
    formula: "Up to Rs 1.5L-2L Deductions",
    inputType: "number",
    category: "Wealth & Investment",
    calcTarget: () => 200000,
    direction: "higher",
  },
  {
    key: "budgetPlanning",
    label: "Budget Planning",
    formula: "Do you plan your monthly or quarterly budget?",
    inputType: "boolean",
    category: "Financial Management",
    calcTarget: () => "Yes",
    direction: "special-boolean",
  },
  {
    key: "estatePlanning",
    label: "Estate Planning",
    formula: "Create Will For Property",
    inputType: "boolean",
    category: "Financial Management",
    calcTarget: () => "Yes",
    direction: "special-boolean",
  },
  {
    key: "legacyFund",
    label: "Legacy Fund",
    formula: "Give Donations and wealth successor",
    inputType: "boolean",
    category: "Goal Planning",
    calcTarget: () => "Yes",
    direction: "special-boolean",
  },
  {
    key: "hufAccount",
    label: "HUF Account",
    formula: "Open an HUF Account",
    inputType: "boolean",
    category: "Financial Management",
    calcTarget: () => "Yes",
    direction: "special-boolean",
  },
  {
    key: "familyGoals",
    label: "Family Goals",
    formula: "Identify major milestones",
    inputType: "boolean",
    category: "Goal Planning",
    calcTarget: () => "Yes",
    direction: "special-boolean",
  },
  {
    key: "investmentDiversification",
    label: "Investment Diversification",
    formula: "Balanced by age-based allocation",
    inputType: "dual-percent",
    category: "Wealth & Investment",
    calcTarget: (b) => getTargetAllocationByAge(Number(document.getElementById("age").value) || 0),
    direction: "special-diversification",
  },
];

const investmentUniverse = {
  risky: [
    "Equity (Direct Stocks)",
    "Crypto Assets",
    "Real Estate / Property",
    "Own Business / Startups",
    "Equity Mutual Funds",
    "Derivatives (Futures & Options)",
    "Commodities & Forex Trading",
    "Peer-to-Peer Lending (P2P)",
  ],
  safe: [
    "Fixed Deposits (FDs) & Recurring Deposits (RDs)",
    "Public Provident Fund (PPF)",
    "Employees' Provident Fund (EPF)",
    "National Pension Scheme (NPS)",
    "Government Bonds & AAA-rated Corporate Bonds",
    "Post Office Savings Schemes",
    "Sukanya Samriddhi Yojana",
    "ULIP & Saving Insurance Plans",
    "Gold (Sovereign/Digital/Physical)",
    "Debt Mutual Funds & Index ETFs",
  ],
};

const investmentState = {
  riskySelected: new Set(),
  safeSelected: new Set(),
};

const checklistBody = document.getElementById("checklistBody");
const analysisBody = document.getElementById("analysisBody");
const categoryCards = document.getElementById("categoryCards");
const reportSection = document.getElementById("reportSection");
const calculateBtn = document.getElementById("calculateBtn");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const investmentModal = document.getElementById("investmentModal");
const riskyList = document.getElementById("riskyList");
const safeList = document.getElementById("safeList");
const closeInvestmentModal = document.getElementById("closeInvestmentModal");
const radarChart = document.getElementById("radarChart");
const scoreBarChart = document.getElementById("scoreBarChart");
const gapChart = document.getElementById("gapChart");
const chartTooltip = document.getElementById("chartTooltip");

const chartHitAreas = {
  radar: [],
  scores: [],
  gaps: [],
};

function formatINR(value) {
  const num = Number(value || 0);
  return `Rs ${num.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function getTargetAllocationByAge(age) {
  if (age <= 0) return { risk: 70, safe: 30 };
  if (age <= 30) return { risk: 75, safe: 25 };
  if (age <= 40) return { risk: 71, safe: 29 };
  if (age <= 50) return { risk: 60, safe: 40 };
  return { risk: 45, safe: 55 };
}

function getInvestmentAllocation() {
  const riskyCount = investmentState.riskySelected.size;
  const safeCount = investmentState.safeSelected.size;
  const total = riskyCount + safeCount;
  if (total <= 0) return { risk: 0, safe: 0 };
  const risk = Math.round((riskyCount / total) * 100);
  return { risk, safe: 100 - risk };
}

function syncInvestmentUi() {
  const { risk, safe } = getInvestmentAllocation();
  const age = Number(document.getElementById("age").value) || 0;
  const target = getTargetAllocationByAge(age);

  document.getElementById("riskPctText").textContent = `Risk Allocation: ${risk}%`;
  document.getElementById("safePctText").textContent = `Safe Allocation: ${safe}%`;
  document.getElementById("riskBar").style.width = `${risk}%`;
  document.getElementById("safeBar").style.width = `${safe}%`;
  document.getElementById(
    "targetMixText"
  ).textContent = `Target (based on age): Balanced (Risk: ${target.risk}%, Safe: ${target.safe}%)`;

  const inTable = document.getElementById("invCurrentMix");
  if (inTable) inTable.textContent = `Risk: ${risk}%, Safe: ${safe}%`;
}

function buildInvestmentLists() {
  riskyList.innerHTML = investmentUniverse.risky
    .map(
      (item) => `
      <label class="choice-item">
        <input type="checkbox" data-investment-group="risky" value="${item}" />
        <span>${item}</span>
      </label>`
    )
    .join("");

  safeList.innerHTML = investmentUniverse.safe
    .map(
      (item) => `
      <label class="choice-item">
        <input type="checkbox" data-investment-group="safe" value="${item}" />
        <span>${item}</span>
      </label>`
    )
    .join("");
}

function getBaseInputs() {
  return {
    plannerName: document.getElementById("plannerName").value.trim(),
    clientName: document.getElementById("clientName").value.trim(),
    annualIncome: Number(document.getElementById("annualIncome").value) || 0,
    monthlyExpenses:
      Number(document.getElementById("monthlyExpenses").value) || 0,
    childGoal: Number(document.getElementById("childGoal").value) || 0,
    marriageGoal: Number(document.getElementById("marriageGoal").value) || 0,
    wealthTarget: Number(document.getElementById("wealthTarget").value) || 0,
    assessmentDate: document.getElementById("assessmentDate").value,
  };
}

function createRow(item) {
  const row = document.createElement("tr");
  row.dataset.key = item.key;

  const formulaCell =
    item.direction === "special-diversification"
      ? `<div class="formula-with-btn">
          <span>${item.formula}</span>
          <button type="button" class="manage-btn" data-open-investment>Manage Investments</button>
        </div>`
      : item.formula;

  const currentInput =
    item.inputType === "boolean"
      ? `<select data-input="${item.key}">
          <option value="">Select</option>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>`
      : item.inputType === "dual-percent"
        ? `<div class="allocation-summary">
            <p id="invCurrentMix">Risk: 0%, Safe: 0%</p>
          </div>`
        : `<input type="number" data-input="${item.key}" min="0" value="0" placeholder="Enter value" />`;

  row.innerHTML = `
    <td>${item.label}</td>
    <td>${formulaCell}</td>
    <td data-target="${item.key}">-</td>
    <td>${currentInput}</td>
    <td data-gap="${item.key}">-</td>
    <td><span class="pill neutral" data-score="${item.key}">-</span></td>
  `;
  checklistBody.appendChild(row);
}

function buildChecklistTable() {
  checklistBody.innerHTML = "";
  checklistConfig.forEach(createRow);
}

function scoreToStatus(score) {
  if (score <= 0) return "Not Started";
  if (score >= 4.5) return "Excellent";
  if (score >= 3.5) return "Good";
  if (score >= 2.5) return "Average";
  if (score >= 1.5) return "Needs Improvement";
  return "Critical Attention Needed";
}

function scoreNumericHigher(target, current) {
  if (target <= 0 || current <= 0) return 0;
  const ratio = current / target;
  if (ratio >= 1) return 5;
  if (ratio >= 0.75) return 4;
  if (ratio >= 0.5) return 3;
  if (ratio >= 0.25) return 2;
  if (ratio >= 0.2) return 1;
  return 1;
}

function scoreNumericLower(target, current) {
  if (target <= 0 || current <= 0) return 0;
  const ratio = current / target;
  if (ratio <= 1) return 5;
  if (ratio <= 1.2) return 4;
  if (ratio <= 1.5) return 3;
  if (ratio <= 2) return 2;
  return 1;
}

function scoreCibil(value) {
  if (value <= 0) return 0;
  if (value >= 800) return 5;
  if (value >= 750) return 4;
  if (value >= 700) return 3;
  if (value >= 650) return 2;
  return 1;
}

function scoreBoolean(isYes) {
  if (isYes === null) return 0;
  return isYes ? 5 : 1;
}

function scoreDiversification(risk, safe) {
  if (risk <= 0 && safe <= 0) return 0;
  const age = Number(document.getElementById("age").value) || 0;
  const target = getTargetAllocationByAge(age);
  const riskDelta = Math.abs(risk - target.risk);
  const safeDelta = Math.abs(safe - target.safe);
  const totalDelta = riskDelta + safeDelta;
  if (totalDelta <= 10) return 5;
  if (totalDelta <= 20) return 4;
  if (totalDelta <= 30) return 3;
  if (totalDelta <= 40) return 2;
  return 1;
}

function scoreClass(score) {
  if (score <= 0) return "neutral";
  if (score >= 4) return "good";
  if (score >= 2.5) return "warn";
  return "bad";
}

function computeChecklist() {
  const base = getBaseInputs();
  const results = checklistConfig.map((item) => {
    const target = item.calcTarget(base);
    const targetEl = document.querySelector(`[data-target="${item.key}"]`);
    const gapEl = document.querySelector(`[data-gap="${item.key}"]`);
    const scoreEl = document.querySelector(`[data-score="${item.key}"]`);

    let currentValue = 0;
    let gap = 0;
    let score = 0;
    let currentText = "";
    let targetText = "";
    let gapText = "";

    if (item.inputType === "boolean") {
      const v = document.querySelector(`[data-input="${item.key}"]`).value;
      const isYes = v === "" ? null : v === "yes";
      score = scoreBoolean(isYes);
      currentText = isYes === null ? "0" : isYes ? "Yes" : "No";
      targetText = "Yes";
      gapText = isYes === null ? "0" : "N/A";
    } else if (item.inputType === "dual-percent") {
      const allocation = getInvestmentAllocation();
      const risk = allocation.risk;
      const safe = allocation.safe;
      const targetMix = item.calcTarget(base);
      currentValue = { risk, safe };
      score = scoreDiversification(risk, safe);
      currentText = `Risk ${risk}% / Safe ${safe}%`;
      targetText = `Risk ${targetMix.risk}% / Safe ${targetMix.safe}%`;
      gapText = risk <= 0 && safe <= 0 ? "0" : "N/A";
    } else {
      const inputEl = document.querySelector(`[data-input="${item.key}"]`);
      currentValue = Number(inputEl.value) || 0;
      gap = target - currentValue;
      if (item.direction === "higher") score = scoreNumericHigher(target, currentValue);
      if (item.direction === "lower") score = scoreNumericLower(target, currentValue);
      if (item.direction === "special-cibil") {
        score = scoreCibil(currentValue);
        gap = 750 - currentValue;
      }
      targetText = formatINR(target);
      currentText = formatINR(currentValue);
      gapText = formatINR(gap);
      if (item.direction === "special-cibil") {
        targetText = "750";
        currentText = String(currentValue);
        gapText = String(gap);
      }
    }

    targetEl.textContent = targetText;
    gapEl.textContent = gapText;
    scoreEl.textContent = `${score}/5`;
    scoreEl.className = `pill ${scoreClass(score)}`;

    return {
      ...item,
      target,
      currentValue,
      targetText,
      currentText,
      gapText,
      score,
      status: scoreToStatus(score),
    };
  });

  return { base, results };
}

function getGrade(percent) {
  if (percent >= 90) return "A+ (Financially Strong)";
  if (percent >= 80) return "A (Very Healthy)";
  if (percent >= 70) return "B (Stable)";
  if (percent >= 60) return "C (Moderate Risk)";
  if (percent >= 50) return "D (Needs Improvement)";
  return "F (Critical Attention Needed)";
}

function buildInsights(percent, weakItems) {
  const insights = [];
  insights.push(
    `Overall score is ${percent.toFixed(0)}%. Current health grade: ${getGrade(percent)}.`
  );
  if (weakItems.length > 0) {
    insights.push(
      `Most critical gaps: ${weakItems
        .slice(0, 4)
        .map((x) => x.label)
        .join(", ")}.`
    );
  }
  insights.push(
    "Focus first on risk cover + emergency stability before long-term wealth acceleration."
  );
  insights.push(
    "Recalculate this report quarterly to track progress against the same scorecard."
  );
  return insights;
}

function buildRecommendations(weakItems, base) {
  const recs = [];
  weakItems.slice(0, 6).forEach((item) => {
    if (item.key === "emergencyFund") {
      recs.push(
        "Build emergency corpus to at least 3 months of expenses; automate a monthly transfer."
      );
    } else if (item.key === "incomeProtection") {
      recs.push(
        "Increase term cover closer to 20x annual income to protect dependents."
      );
    } else if (item.key === "healthInsurance") {
      recs.push("Upgrade health insurance sum insured to reduce catastrophic risk.");
    } else if (item.key === "debtManagement") {
      recs.push(
        "Lower total EMI burden below 40% of monthly income using prepayment / refinance."
      );
    } else if (item.key === "wealthPlanning") {
      recs.push(
        "Raise monthly investments to at least 20% of income and review asset allocation."
      );
    } else if (item.key === "cibilScore") {
      recs.push("Improve CIBIL by paying dues on time and reducing credit utilization.");
    } else {
      recs.push(`Improve ${item.label.toLowerCase()} to close current gap quickly.`);
    }
  });

  if (base.wealthTarget > 0) {
    recs.push(
      `Map investments to wealth target (${formatINR(
        base.wealthTarget
      )}) using yearly milestone checkpoints.`
    );
  }
  return Array.from(new Set(recs)).slice(0, 8);
}

function renderCategoryCards(results) {
  categoryCards.innerHTML = "";
  const grouped = {};
  results.forEach((r) => {
    grouped[r.category] = grouped[r.category] || [];
    grouped[r.category].push(r.score);
  });
  Object.entries(grouped).forEach(([category, scores]) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const percent = (avg / 5) * 100;
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <p>${category}</p>
      <h4>${avg.toFixed(1)}/5</h4>
      <div class="mini-bar"><span style="width:${percent}%"></span></div>
      <small>${scoreToStatus(avg)}</small>
    `;
    categoryCards.appendChild(card);
  });
}

function renderAnalysisTable(results) {
  analysisBody.innerHTML = "";
  results.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.label}</td>
      <td>${r.targetText}</td>
      <td>${r.currentText}</td>
      <td>${r.gapText}</td>
      <td><span class="pill ${scoreClass(r.score)}">${r.score}/5</span></td>
      <td>${r.status}</td>
    `;
    analysisBody.appendChild(tr);
  });
}

function getCategoryAverages(results) {
  const grouped = {};
  results.forEach((r) => {
    grouped[r.category] = grouped[r.category] || [];
    grouped[r.category].push(r.score);
  });
  return Object.entries(grouped).map(([category, scores]) => ({
    category,
    avg: scores.reduce((a, b) => a + b, 0) / scores.length,
  }));
}

function drawRadarChart(results) {
  if (!radarChart) return;
  const ctx = radarChart.getContext("2d");
  const width = radarChart.width;
  const height = radarChart.height;
  ctx.clearRect(0, 0, width, height);

  const categories = getCategoryAverages(results);
  if (categories.length === 0) return;
  chartHitAreas.radar = [];

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.32;
  const levels = 5;

  ctx.strokeStyle = "#d1dbe7";
  ctx.lineWidth = 1;
  for (let l = 1; l <= levels; l += 1) {
    const r = (radius * l) / levels;
    ctx.beginPath();
    categories.forEach((_, i) => {
      const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  }

  categories.forEach((item, i) => {
    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
    const ax = cx + radius * Math.cos(angle);
    const ay = cy + radius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ax, ay);
    ctx.stroke();

    ctx.fillStyle = "#475569";
    ctx.font = "12px Plus Jakarta Sans";
    const lx = cx + (radius + 16) * Math.cos(angle);
    const ly = cy + (radius + 16) * Math.sin(angle);
    ctx.fillText(item.category, lx - 28, ly);
  });

  ctx.beginPath();
  categories.forEach((item, i) => {
    const r = (item.avg / 5) * radius;
    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
    chartHitAreas.radar.push({
      x,
      y,
      r: 8,
      text: `${item.category}: ${item.avg.toFixed(1)}/5`,
    });
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(9, 133, 198, 0.28)";
  ctx.strokeStyle = "#0985c6";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  chartHitAreas.radar.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#0b5f8c";
    ctx.fill();
  });
}

function drawScoreBars(results) {
  if (!scoreBarChart) return;
  const ctx = scoreBarChart.getContext("2d");
  const width = scoreBarChart.width;
  const height = scoreBarChart.height;
  ctx.clearRect(0, 0, width, height);

  const items = results.slice(0, 10);
  chartHitAreas.scores = [];
  const left = 130;
  const right = width - 20;
  const top = 22;
  const row = 24;

  ctx.font = "11px Plus Jakarta Sans";
  items.forEach((item, i) => {
    const y = top + i * row;
    const barWidth = ((right - left) * item.score) / 5;
    ctx.fillStyle = "#64748b";
    ctx.fillText(item.label.slice(0, 20), 8, y + 10);
    ctx.fillStyle = "#53aee0";
    ctx.fillRect(left, y, barWidth, 12);
    ctx.fillStyle = "#334155";
    ctx.fillText(`${item.score}/5`, left + barWidth + 6, y + 10);
    chartHitAreas.scores.push({
      x: left,
      y,
      w: Math.max(barWidth, 6),
      h: 12,
      text: `${item.label}: ${item.score}/5`,
    });
  });
}

function drawGapBars(results) {
  if (!gapChart) return;
  const ctx = gapChart.getContext("2d");
  const width = gapChart.width;
  const height = gapChart.height;
  ctx.clearRect(0, 0, width, height);

  const numeric = results
    .filter((r) => typeof r.target === "number" && Number.isFinite(r.target))
    .map((r) => ({ ...r, gapNumber: Number(r.target) - Number(r.currentValue || 0) }));

  const items = numeric
    .sort((a, b) => Math.abs(b.gapNumber) - Math.abs(a.gapNumber))
    .slice(0, 8);
  chartHitAreas.gaps = [];

  const maxAbs = Math.max(...items.map((i) => Math.abs(i.gapNumber)), 1);
  const left = 210;
  const right = width - 20;
  const top = 18;
  const row = 28;

  ctx.font = "12px Plus Jakarta Sans";
  items.forEach((item, i) => {
    const y = top + i * row;
    const w = ((right - left) * Math.abs(item.gapNumber)) / maxAbs;
    ctx.fillStyle = "#475569";
    ctx.fillText(item.label.slice(0, 28), 8, y + 11);
    ctx.fillStyle = item.gapNumber >= 0 ? "#ef4444" : "#22c55e";
    ctx.fillRect(left, y, w, 12);
    ctx.fillStyle = "#334155";
    ctx.fillText(formatINR(item.gapNumber), left + w + 8, y + 11);
    chartHitAreas.gaps.push({
      x: left,
      y,
      w: Math.max(w, 6),
      h: 12,
      text: `${item.label} gap: ${formatINR(item.gapNumber)}`,
    });
  });
}

function renderCharts(results) {
  drawRadarChart(results);
  drawScoreBars(results);
  drawGapBars(results);
}

function downloadPdfReport() {
  document.body.classList.add("print-report-mode");
  window.print();
}

function isPointInRect(px, py, rect) {
  return px >= rect.x && px <= rect.x + rect.w && py >= rect.y && py <= rect.y + rect.h;
}

function showTooltip(text, event) {
  chartTooltip.textContent = text;
  chartTooltip.classList.remove("hidden");
  chartTooltip.style.left = `${event.clientX + 12}px`;
  chartTooltip.style.top = `${event.clientY + 12}px`;
}

function hideTooltip() {
  chartTooltip.classList.add("hidden");
}

function bindChartTooltip(canvas, key) {
  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * sx;
    const y = (event.clientY - rect.top) * sy;
    const hitList = chartHitAreas[key] || [];
    let found = null;

    if (key === "radar") {
      found = hitList.find((p) => (x - p.x) ** 2 + (y - p.y) ** 2 <= p.r ** 2) || null;
    } else {
      found = hitList.find((b) => isPointInRect(x, y, b)) || null;
    }

    if (found) {
      showTooltip(found.text, event);
      canvas.style.cursor = "pointer";
    } else {
      hideTooltip();
      canvas.style.cursor = "default";
    }
  });

  canvas.addEventListener("mouseleave", () => {
    hideTooltip();
    canvas.style.cursor = "default";
  });
}

function renderReport() {
  const { base, results } = computeChecklist();
  const totalScore = results.reduce((sum, x) => sum + x.score, 0);
  const maxScore = results.length * 5;
  const percent = (totalScore / maxScore) * 100;
  const weakItems = [...results].sort((a, b) => a.score - b.score);
  const insights = buildInsights(percent, weakItems);
  const recommendations = buildRecommendations(weakItems, base);

  document.getElementById("reportClientName").textContent = base.clientName || "Client";
  document.getElementById("reportPlanner").textContent = `Planner: ${base.plannerName || "-"}`;
  document.getElementById("reportDate").textContent = `Date: ${base.assessmentDate || "-"}`;
  document.getElementById("overallPercent").textContent = `${percent.toFixed(0)}%`;
  document.getElementById("overallGrade").textContent = getGrade(percent);

  const ringColor = percent >= 75 ? "#16a34a" : percent >= 55 ? "#ea580c" : "#dc2626";
  document.documentElement.style.setProperty("--ring-color", ringColor);
  document.documentElement.style.setProperty("--ring-fill", `${percent.toFixed(0)}%`);

  const insightsList = document.getElementById("insightsList");
  const recommendationsList = document.getElementById("recommendationsList");
  insightsList.innerHTML = insights.map((x) => `<li>${x}</li>`).join("");
  recommendationsList.innerHTML = recommendations.map((x) => `<li>${x}</li>`).join("");

  renderCategoryCards(results);
  renderCharts(results);
  renderAnalysisTable(results);
  reportSection.classList.remove("hidden");
  reportSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function refreshChecklist() {
  computeChecklist();
}

function calculateAgeFromDob(dobValue) {
  if (!dobValue) return 0;
  const dob = new Date(dobValue);
  if (Number.isNaN(dob.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }
  return Math.max(age, 0);
}

function refreshAge() {
  const dobValue = document.getElementById("dob").value;
  document.getElementById("age").value = calculateAgeFromDob(dobValue);
  syncInvestmentUi();
  refreshChecklist();
}

function setToday() {
  const dateInput = document.getElementById("assessmentDate");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}

buildChecklistTable();
buildInvestmentLists();
setToday();
refreshAge();
refreshChecklist();
calculateBtn.addEventListener("click", renderReport);
downloadPdfBtn.addEventListener("click", downloadPdfReport);
window.addEventListener("afterprint", () => {
  document.body.classList.remove("print-report-mode");
});
bindChartTooltip(radarChart, "radar");
bindChartTooltip(scoreBarChart, "scores");
bindChartTooltip(gapChart, "gaps");

document.querySelector(".form-grid").addEventListener("input", refreshChecklist);
checklistBody.addEventListener("input", refreshChecklist);
checklistBody.addEventListener("change", refreshChecklist);
document.getElementById("dob").addEventListener("input", refreshAge);

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-open-investment]")) {
    investmentModal.classList.remove("hidden");
    syncInvestmentUi();
  }
  if (event.target === investmentModal) {
    investmentModal.classList.add("hidden");
  }
});

closeInvestmentModal.addEventListener("click", () => {
  investmentModal.classList.add("hidden");
});

investmentModal.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") return;
  const group = target.dataset.investmentGroup;
  const value = target.value;
  if (group === "risky") {
    if (target.checked) investmentState.riskySelected.add(value);
    else investmentState.riskySelected.delete(value);
  }
  if (group === "safe") {
    if (target.checked) investmentState.safeSelected.add(value);
    else investmentState.safeSelected.delete(value);
  }
  syncInvestmentUi();
  refreshChecklist();
});
