import React, { useState } from "react";
import { getRegulatoryChecklist } from "../services/api.js";

function RegulatoryChecklist() {
  const [formData, setFormData] = useState({
    sector: "Ayurveda",
    jurisdiction: "India",
    activity: "Product Development",
  });

  const [checklist, setChecklist] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sectors = [
    "Ayurveda",
    "Traditional Medicine",
    "Biotechnology",
    "Pharmaceuticals",
    "Food & Agriculture",
    "Cosmetics",
    "Software & Technology",
    "Other",
  ];

  const jurisdictions = [
    "India",
    "USA",
    "European Union",
    "United Kingdom",
    "Japan",
    "Australia",
    "Canada",
    "International",
  ];

  const activities = [
    "Product Development",
    "Research & Development",
    "Manufacturing",
    "Commercialization",
    "Export",
    "Import",
    "IP Registration",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleGenerate = async (event) => {
    event.preventDefault();

    setError("");
    setChecklist(null);
    setCheckedItems({});
    setLoading(true);

    try {
      const response = await getRegulatoryChecklist(formData);
      setChecklist(response);
    } catch (err) {
      console.error("Regulatory checklist error:", err);
      setError(
        "Unable to generate the regulatory checklist. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((previousItems) => ({
      ...previousItems,
      [id]: !previousItems[id],
    }));
  };

  const handleReset = () => {
    setChecklist(null);
    setCheckedItems({});
    setError("");
  };

  const getCompletedCount = () => {
    if (!checklist?.items) {
      return 0;
    }

    return checklist.items.filter(
      (item, index) => checkedItems[item.id || index]
    ).length;
  };

  const getTotalCount = () => {
    return checklist?.items?.length || 0;
  };

  return (
    <div className="regulatory-checklist-page">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-label">COMPLIANCE TOOL</span>

        <h1>Regulatory Checklist</h1>

        <p>
          Generate a structured checklist of regulatory and compliance
          considerations based on your sector, activity, and target
          jurisdiction.
        </p>
      </header>

      <main className="regulatory-container">
        {/* Configuration */}
        <section className="checklist-config">
          <div className="section-heading">
            <span>STEP 01</span>

            <h2>Configure your checklist</h2>

            <p>
              Select the information that best matches your project.
            </p>
          </div>

          <form onSubmit={handleGenerate}>
            <div className="form-row">
              {/* Sector */}
              <div className="form-group">
                <label htmlFor="sector">Sector / Industry</label>

                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                >
                  {sectors.map((sector) => (
                    <option value={sector} key={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              {/* Jurisdiction */}
              <div className="form-group">
                <label htmlFor="jurisdiction">Jurisdiction</label>

                <select
                  id="jurisdiction"
                  name="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={handleChange}
                >
                  {jurisdictions.map((jurisdiction) => (
                    <option value={jurisdiction} key={jurisdiction}>
                      {jurisdiction}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Activity */}
            <div className="form-group">
              <label htmlFor="activity">Activity</label>

              <select
                id="activity"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
              >
                {activities.map((activity) => (
                  <option value={activity} key={activity}>
                    {activity}
                  </option>
                ))}
              </select>
            </div>

            {/* Error */}
            {error && <div className="checklist-error">{error}</div>}

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Checklist"}
              </button>
            </div>
          </form>
        </section>

        {/* Loading */}
        {loading && (
          <section className="checklist-loading">
            <div className="loading-spinner"></div>

            <h2>Preparing your checklist...</h2>

            <p>
              Searching relevant regulatory and compliance information.
            </p>
          </section>
        )}

        {/* Empty State */}
        {!checklist && !loading && !error && (
          <section className="checklist-empty">
            <div className="empty-icon">✓</div>

            <h2>Your checklist will appear here</h2>

            <p>
              Configure the options above and generate a regulatory
              checklist for your project.
            </p>
          </section>
        )}

        {/* Checklist Results */}
        {checklist && !loading && (
          <section className="checklist-results">
            {/* Result Header */}
            <div className="result-header">
              <div>
                <span className="page-label">STEP 02</span>

                <h2>Regulatory Checklist</h2>

                <p>
                  {formData.sector} · {formData.activity} · {formData.jurisdiction}
                </p>
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={handleReset}
              >
                New Checklist
              </button>
            </div>

            {/* Progress */}
            <div className="checklist-progress">
              <div className="progress-info">
                <span>Progress</span>

                <strong>
                  {getCompletedCount()} / {getTotalCount()} completed
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width:
                      getTotalCount() > 0
                        ? `${(getCompletedCount() / getTotalCount()) * 100}%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>

            {/* Summary */}
            {checklist.summary && (
              <div className="result-card">
                <span className="result-card-label">OVERVIEW</span>

                <h3>Regulatory Overview</h3>

                <p>{checklist.summary}</p>
              </div>
            )}

            {/* Checklist Items */}
            <div className="checklist-card">
              <div className="checklist-card-header">
                <div>
                  <span className="result-card-label">REQUIREMENTS</span>

                  <h3>Compliance Checklist</h3>
                </div>
              </div>

              <div className="checklist-items">
                {checklist.items?.map((item, index) => {
                  const itemId = item.id || index;
                  const isChecked = Boolean(checkedItems[itemId]);

                  return (
                    <div
                      className={`checklist-item ${
                        isChecked ? "completed" : ""
                      }`}
                      key={itemId}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(itemId)}
                        />

                        <span className="custom-checkbox"></span>

                        <div className="checklist-item-content">
                          <div className="checklist-item-title">
                            <strong>
                              {item.title || `Requirement ${index + 1}`}
                            </strong>

                            {item.priority && (
                              <span
                                className={`priority priority-${item.priority.toLowerCase()}`}
                              >
                                {item.priority}
                              </span>
                            )}
                          </div>

                          {item.description && <p>{item.description}</p>}

                          {item.authority && (
                            <span className="authority">
                              Authority: {item.authority}
                            </span>
                          )}

                          {item.documents?.length > 0 && (
                            <div className="required-documents">
                              <strong>Possible documents:</strong>

                              <ul>
                                {item.documents.map((doc, docIndex) => (
                                  <li key={docIndex}>{doc}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {item.source && (
                            <a
                              href={item.source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View source
                            </a>
                          )}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Important Notes */}
            {checklist.notes?.length > 0 && (
              <div className="result-card result-warning">
                <span className="result-card-label">IMPORTANT NOTES</span>

                <h3>Things to Keep in Mind</h3>

                <ul className="result-list">
                  {checklist.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sources */}
            {checklist.sources?.length > 0 && (
              <div className="result-card">
                <span className="result-card-label">REFERENCES</span>

                <h3>Supporting Sources</h3>

                <div className="source-list">
                  {checklist.sources.map((src, index) => (
                    <div
                      className="source-item"
                      key={src.id || src.url || index}
                    >
                      <span className="source-number">[{index + 1}]</span>

                      <div>
                        <strong>{src.title || "Source"}</strong>

                        {src.jurisdiction && (
                          <span> — {src.jurisdiction}</span>
                        )}

                        {src.url && (
                          <a
                            href={src.url}
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
      </main>

      {/* Disclaimer */}
      <footer className="page-disclaimer">
        <p>
          This checklist is provided for informational purposes and should not
          be treated as legal or regulatory advice. Requirements may vary and
          regulations can change over time.
        </p>
      </footer>
    </div>
  );
}

export default RegulatoryChecklist;