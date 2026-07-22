import { useState } from "react";
import "./App.css";

function App() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState(null);

  const calculateFinance = () => {
    const incomeValue = Number(income);
    const expenseValue = Number(expenses);

    if (incomeValue <= 0 || expenseValue < 0) {
      alert("Please enter valid financial values.");
      return;
    }

    const savings = incomeValue - expenseValue;
    const savingsRate = (savings / incomeValue) * 100;

    setResult({
      income: incomeValue,
      expenses: expenseValue,
      savings,
      savingsRate,
    });
  };

  return (
    <div className="finance-app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">₹</div>
          <div>
            <h2>Smart<span>Finance</span></h2>
            <p>CALCULATOR</p>
          </div>
        </div>

        <nav>
          <a className="active">⌂ <span>Dashboard</span></a>
          <a>▣ <span>Calculator</span></a>
          <a>◈ <span>Reports</span></a>
          <a>💡 <span>Tips</span></a>
          <a>ⓘ <span>About</span></a>
        </nav>

        <div className="quote">
          <div className="quote-mark">“</div>
          <p>
            A budget is telling your money where to go instead of wondering
            where it went.
          </p>
          <strong>— Dave Ramsey</strong>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        <header className="top-header">
          <div>
            <h1>Smart Finance Calculator</h1>
            <p>Track your income, manage expenses and build your savings ✨</p>
          </div>

          <div className="date-badge">
            📅 {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <section className="summary-grid">

          <div className="summary-card income-card">
            <div className="card-icon">💰</div>
            <div>
              <p>Total Income</p>
              <h2>
                ₹{result ? result.income.toLocaleString("en-IN") : "0"}
              </h2>
              <span>This Month</span>
            </div>
            <div className="card-arrow">↗</div>
          </div>

          <div className="summary-card expense-card">
            <div className="card-icon">🛒</div>
            <div>
              <p>Total Expenses</p>
              <h2>
                ₹{result ? result.expenses.toLocaleString("en-IN") : "0"}
              </h2>
              <span>This Month</span>
            </div>
            <div className="card-arrow">↘</div>
          </div>

          <div className="summary-card saving-card">
            <div className="card-icon">🐷</div>
            <div>
              <p>Total Savings</p>
              <h2>
                ₹{result ? result.savings.toLocaleString("en-IN") : "0"}
              </h2>
              <span>This Month</span>
            </div>
            <div className="card-arrow">↗</div>
          </div>

        </section>

        {/* CALCULATOR + SUMMARY */}
        <section className="content-grid">

          {/* CALCULATOR */}
          <div className="panel calculator-panel">
            <div className="panel-title">
              <div className="title-icon purple">▣</div>
              <h2>Calculate Your Savings</h2>
            </div>

            <div className="form-group">
              <label>Monthly Income (₹)</label>

              <div className="input-wrapper income-input">
                <span>💰</span>
                <input
                  type="number"
                  placeholder="Enter your monthly income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Monthly Expenses (₹)</label>

              <div className="input-wrapper expense-input">
                <span>🛒</span>
                <input
                  type="number"
                  placeholder="Enter your monthly expenses"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                />
              </div>
            </div>

            <button className="calculate-btn" onClick={calculateFinance}>
              Calculate Savings
              <span>→</span>
            </button>

            <div className="secure-note">
              🛡️ Your financial data is processed locally and not stored.
            </div>
          </div>

          {/* FINANCIAL SUMMARY */}
          <div className="panel financial-panel">
            <div className="panel-title">
              <div className="title-icon purple">◈</div>
              <h2>Your Financial Summary</h2>
            </div>

            {result ? (
              <div className="summary-content">

                <div
                  className="donut"
                  style={{
                    "--progress": `${Math.max(
                      0,
                      Math.min(result.savingsRate, 100)
                    )}%`,
                  }}
                >
                  <div className="donut-center">
                    <strong>
                      {result.savingsRate.toFixed(1)}%
                    </strong>
                    <span>Savings Rate</span>
                  </div>
                </div>

                <div className="financial-values">

                  <div className="value-row">
                    <span>💰 Monthly Income</span>
                    <strong className="green">
                      ₹{result.income.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="value-row">
                    <span>🛒 Monthly Expenses</span>
                    <strong className="red">
                      ₹{result.expenses.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="value-row">
                    <span>🐷 Monthly Savings</span>
                    <strong className="blue">
                      ₹{result.savings.toLocaleString("en-IN")}
                    </strong>
                  </div>

                </div>
              </div>
            ) : (
              <div className="empty-summary">
                <div className="empty-icon">📊</div>
                <h3>Your financial summary will appear here</h3>
                <p>
                  Enter your income and expenses to see your savings analysis.
                </p>
              </div>
            )}

            {result && (
              <div
                className={`status-message ${
                  result.savings >= 0 ? "success" : "danger"
                }`}
              >
                <span className="status-icon">
                  {result.savings >= 0 ? "🏆" : "⚠️"}
                </span>

                <div>
                  <strong>
                    {result.savings >= 0
                      ? "Great Job! 🎉"
                      : "Attention Needed"}
                  </strong>

                  <p>
                    {result.savings >= 0
                      ? "You are saving money this month!"
                      : "Your expenses are higher than your income."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* TIPS */}
        <section className="tips-section">
          <div className="tips-heading">
            <span>💡</span>
            <h2>Smart Finance Tips</h2>
          </div>

          <div className="tips-grid">

            <div className="tip-card green-tip">
              <div className="tip-icon">🎯</div>
              <h3>Set Goals</h3>
              <p>Set clear financial goals and work towards them.</p>
            </div>

            <div className="tip-card blue-tip">
              <div className="tip-icon">📊</div>
              <h3>Track Expenses</h3>
              <p>Understand your spending habits by tracking expenses.</p>
            </div>

            <div className="tip-card orange-tip">
              <div className="tip-icon">🐷</div>
              <h3>Save Regularly</h3>
              <p>Save a portion of your income regularly for your future.</p>
            </div>

            <div className="tip-card purple-tip">
              <div className="tip-icon">🛡️</div>
              <h3>Invest Wisely</h3>
              <p>Make informed decisions to grow your wealth over time.</p>
            </div>

          </div>
        </section>

        <footer>
          © 2026 Smart Finance Calculator | Built with React 💜
        </footer>

      </main>
    </div>
  );
}

export default App;