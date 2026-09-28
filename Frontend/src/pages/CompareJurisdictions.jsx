import React from "react";
import { useState } from "react";

function CompareJurisdictions() {
  const [jurisdiction1, setJurisdiction1] = useState("India");
  const [jurisdiction2, setJurisdiction2] = useState("USA");
  const [ipType, setIpType] = useState("Patent");

  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jurisdictions = [
    "India",
    "USA",
    "European Union",
    "United Kingdom",
    "Japan",
    "Australia",
    "Canada",
    "WIPO",
  ];

  const ipTypes = [
    "Patent",
    "Trademark",
    "Copyright",
    "Traditional Knowledge",
  ];

  const handleCompare = async () => {
    if (jurisdiction1 === jurisdiction2) {
      setError("Please select two different jurisdictions.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await compareJurisdictions({
        jurisdiction1,
        jurisdiction2,
        ipType,
      });

      setComparison(response);
    } catch (err) {
      console.error("Comparison API error:", err);

      setError(
        "Unable to retrieve the comparison. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const comparisonRows = [
    {
      label: "IP Protection",
      key: "protection",
    },
    {
      label: "Application Process",
      key: "application_process",
    },
    {
      label: "Protection Duration",
      key: "duration",
    },
    {
      label: "Registration / Filing",
      key: "filing",
    },
    {
      label: "Key Requirements",
      key: "requirements",
    },
    {
      label: "Regulatory Considerations",
      key: "regulatory",
    },
  ];

  return (
    <div className="comparison-page">
      {/* Header */}
      <header className="page-header">
        <div>
          <span className="page-label">IP RESEARCH TOOL</span>

          <h1>Compare Jurisdictions</h1>

          <p>
            Compare intellectual property protection, filing requirements,
            regulations, and other important considerations across
            jurisdictions.
          </p>
        </div>
      </header>

      {/* Selection Panel */}
      <section className="comparison-selector">
        <div className="selector-header">
          <div>
            <h2>Comparison Settings</h2>

            <p>
              Select the jurisdictions and intellectual property category
              you want to compare.
            </p>
          </div>
        </div>

        <div className="selector-grid">
          {/* Jurisdiction 1 */}
          <div className="form-group">
            <label htmlFor="jurisdiction1">
              Jurisdiction 1
            </label>

            <select
              id="jurisdiction1"
              value={jurisdiction1}
              onChange={(event) =>
                setJurisdiction1(event.target.value)
              }
            >
              {jurisdictions.map((jurisdiction) => (
                <option
                  value={jurisdiction}
                  key={jurisdiction}
                >
                  {jurisdiction}
                </option>
              ))}
            </select>
          </div>

          {/* VS */}
          <div className="comparison-vs">
            <span>VS</span>
          </div>

          {/* Jurisdiction 2 */}
          <div className="form-group">
            <label htmlFor="jurisdiction2">
              Jurisdiction 2
            </label>

            <select
              id="jurisdiction2"
              value={jurisdiction2}
              onChange={(event) =>
                setJurisdiction2(event.target.value)
              }
            >
              {jurisdictions.map((jurisdiction) => (
                <option
                  value={jurisdiction}
                  key={jurisdiction}
                >
                  {jurisdiction}
                </option>
              ))}
            </select>
          </div>

          {/* IP Type */}
          <div className="form-group ip-type-group">
            <label htmlFor="ipType">
              IP Category
            </label>

            <select
              id="ipType"
              value={ipType}
              onChange={(event) =>
                setIpType(event.target.value)
              }
            >
              {ipTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="comparison-error">
            {error}
          </div>
        )}

        <button
          type="button"
          className="primary-button compare-button"
          onClick={handleCompare}
          disabled={loading}
        >
          {loading ? "Comparing..." : "Compare Jurisdictions"}
        </button>
      </section>

      {/* Empty State */}
      {!comparison && !loading && !error && (
        <section className="comparison-empty">
          <div className="empty-icon">VS</div>

          <h2>Ready to compare</h2>

          <p>
            Select two jurisdictions and an IP category above to
            generate a detailed comparison.
          </p>
        </section>
      )}

      {/* Loading */}
      {loading && (
        <section className="comparison-loading">
          <div className="loading-spinner"></div>

          <h2>Preparing comparison...</h2>

          <p>
            Searching relevant intellectual property and
            regulatory information.
          </p>
        </section>
      )}

      {/* Comparison Result */}
      {comparison && !loading && (
        <section className="comparison-results">
          {/* Result Header */}
          <div className="result-header">
            <div>
              <span className="page-label">
                COMPARISON RESULT
              </span>

              <h2>
                {ipType} — {jurisdiction1} vs {jurisdiction2}
              </h2>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={() => setComparison(null)}
            >
              New Comparison
            </button>
          </div>

          {/* Jurisdiction Cards */}
          <div className="jurisdiction-cards">
            <div className="jurisdiction-card">
              <span>JURISDICTION 1</span>
              <h3>{jurisdiction1}</h3>
            </div>

            <div className="jurisdiction-card vs-card">
              <span>COMPARING</span>
              <strong>VS</strong>
            </div>

            <div className="jurisdiction-card">
              <span>JURISDICTION 2</span>
              <h3>{jurisdiction2}</h3>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Criteria</th>

                  <th>{jurisdiction1}</th>

                  <th>{jurisdiction2}</th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.key}>
                    <td className="criteria-cell">
                      {row.label}
                    </td>

                    <td>
                      {comparison?.[jurisdiction1]?.[row.key] ||
                        "Information unavailable."}
                    </td>

                    <td>
                      {comparison?.[jurisdiction2]?.[row.key] ||
                        "Information unavailable."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key Differences */}
          {comparison.key_differences && (
            <div className="key-differences">
              <div className="section-heading">
                <span>KEY DIFFERENCES</span>

                <h2>What stands out?</h2>
              </div>

              <ul>
                {comparison.key_differences.map(
                  (difference, index) => (
                    <li key={index}>{difference}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Recommendation */}
          {comparison.recommendation && (
            <div className="comparison-recommendation">
              <span>AI-ASSISTED INSIGHT</span>

              <h2>Considerations</h2>

              <p>{comparison.recommendation}</p>
            </div>
          )}

          {/* Sources */}
          {comparison.sources?.length > 0 && (
            <div className="comparison-sources">
              <div className="section-heading">
                <span>REFERENCES</span>

                <h2>Sources</h2>
              </div>

              <div className="source-list">
                {comparison.sources.map((source, index) => (
                  <div
                    className="source-item"
                    key={source.id || source.url || index}
                  >
                    <span className="source-number">
                      [{index + 1}]
                    </span>

                    <div>
                      <strong>
                        {source.title || "Source"}
                      </strong>

                      {source.jurisdiction && (
                        <span>
                          {" "}
                          — {source.jurisdiction}
                        </span>
                      )}

                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Source
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Disclaimer */}
      <footer className="page-disclaimer">
        <p>
          The comparison is provided for informational and research
          purposes. Laws and regulations may change. Consult a
          qualified IP professional for legal advice.
        </p>
      </footer>
    </div>
  );
}

export default CompareJurisdictions;