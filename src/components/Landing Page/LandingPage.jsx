import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      className="h-full flex flex-col items-center justify-center text-center"
      style={{ color: "var(--text-color)" }}
    >
      <h1
        className="text-4xl font-bold text-white-800 mb-4"
        style={{ color: "var(--text-color)" }}
      >
        Welcome to Smart Spend
      </h1>
      <p
        className="text-lg text-white-600 mb-8"
        style={{ color: "var(--text-color)" }}
      >
        Your all-in-one personal finance tracker, helping you manage expenses,
        investments, and budgets seamlessly.
      </p>

      <div className="mt-12">
        <h2
          className="text-2xl font-semibold text-white-800"
          style={{ color: "var(--text-color)" }}
        >
          Why Choose Smart Spend?
        </h2>
        <ul
          className="mt-4 text-left text-gray-700 space-y-3"
          style={{ color: "var(--text-color)" }}
        >
          <li>
            💰 <strong>Recurring Expenses Management</strong>: Keep track of
            monthly bills with ease to maintain a predictable budget.
          </li>

          <li>
            📈 <strong>Investment Portfolio Management</strong>: Track
            investments with detailed insights into your portfolio.
          </li>
          <li>
            🌐 <strong>Multi-Currency Support</strong>: Manage budgets in
            multiple currencies effortlessly.
          </li>
          <li>
            📊 <strong>Budget Allocation Ratios</strong>: Use custom ratios for
            budgeting needs, wants, and investments.
          </li>
          <li>
            💾 <strong>Export Financial Data</strong>: Download your financial
            data in .xlsx format for external use.
          </li>

          <li>
            📊 <strong>Dynamic Financial Visualization</strong>: View
            interactive charts and graphs for a clearer financial overview.
          </li>
          <li>
            🔒 <strong>Secure Data and Privacy Protection</strong>: Your data is
            safe with advanced encryption and privacy controls.
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <Link href="/login">
          <p
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
            style={{ backgroundColor: "var(--element-bg-color)" }}
          >
            Get Started
          </p>
        </Link>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Smart Spend. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
