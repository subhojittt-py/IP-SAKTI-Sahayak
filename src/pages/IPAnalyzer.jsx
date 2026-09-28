import React from "react";
import { useState } from "react";
import { analyzeIP } from "../services/api";

function IPAnalyzer() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ipType: "Patent",
    jurisdiction: "India",
    industry: "",
    existingIP: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleAnalyze = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setError(
        "Please provide both a title and a description of your IP idea."
      );
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await analyzeIP(formData);

      setResult(response);
    } catch (err) {
      console.error("IP analysis error:", err);

      setError(
        "Unable to analyze the IP idea. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      ipType: "Patent",
      jurisdiction: "India",
      industry: "",
      existingIP: "",
    });

    setResult(null);
    setError("");
  };

  return (
    <div className="ip-analyzer-page">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-label">IP RESEARCH TOOL</span>

        <h1>IP Analyzer</h1>

        <p>
          Describe your invention, product, process, or creative work to
          explore possible intellectual property protection strategies.
        </p>
      </header>

      <main className="ip-analyzer-container">
        {/* Input Form */}
        <section className="analyzer-form-section">
          <div className="section-heading">
            <span>STEP 01</span>

            <h2>Tell us about your IP</h2>

            <p>
              Provide as much relevant information as possible for a more
              useful analysis.
            </p>
          </div>

          <form onSubmit={handleAnalyze}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">
                Title / Name
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Herbal formulation for skin care"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your invention, product, process, formulation, design, or creative work..."
                rows={7}
              />

              <small>
                Include what is new, how it works, and what makes it
                different from existing solutions.
              </small>
            </div>

            {/* IP Type + Jurisdiction */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ipType">
                  IP Type
                </label>

                <select
                  id="ipType"
                  name="ipType"
                  value={formData.ipType}
                  onChange={handleChange}
                >
                  <option value="Patent">Patent</option>
                  <option value="Trademark">Trademark</option>
                  <option value="Copyright">Copyright</option>
                  <option value="Design">Industrial Design</option>
                  <option value="Trade Secret">Trade Secret</option>
                  <option value="Traditional Knowledge">
                    Traditional Knowledge
                  </option>
                  <option value="Not Sure">
                    I'm not sure
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="jurisdiction">
                  Target Jurisdiction
                </label>

                <select
                  id="jurisdiction"
                  name="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={handleChange}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="European Union">
                    European Union
                  </option>
                  <option value="United Kingdom">
                    United Kingdom
                  </option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="International">
                    International
                  </option>
                </select>
              </div>
            </div>

            {/* Industry */}
            <div className="form-group">
              <label htmlFor="industry">
                Industry / Domain
              </label>

              <input
                id="industry"
                name="industry"
                type="text"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. Ayurveda, Biotechnology, Software, Agriculture"
              />
            </div>

            {/* Existing IP */}
            <div className="form-group">
              <label htmlFor="existingIP">
                Existing IP / Prior Art
              </label>

              <textarea
                id="existingIP"
                name="existingIP"
                value={formData.existingIP}
                onChange={handleChange}
                placeholder="If you know of similar patents, products, publications, trademarks, or other existing IP, describe them here..."
                rows={5}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="analyzer-error">
                {error}
              </div>
            )}

            {/* Buttons */}
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
                {loading ? "Analyzing..." : "Analyze IP"}
              </button>
            </div>
          </form>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="analysis-loading">
            <div className="loading-spinner"></div>

            <h2>Analyzing your IP idea...</h2>

            <p>
              Searching relevant intellectual property and regulatory
              information.
            </p>
          </section>
        )}

        {/* Results */}
        {result && !loading && (
          <section className="analysis-results">
            <div className="result-header">
              <div>
                <span className="page-label">
                  STEP 02
                </span>

                <h2>Analysis Results</h2>

                <p>
                  Analysis for{" "}
                  <strong>{formData.title}</strong>
                </p>
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={handleReset}
              >
                New Analysis
              </button>
            </div>

            {/* Summary */}
            {result.summary && (
              <div className="result-card">
                <span className="result-card-label">
                  SUMMARY
                </span>

                <h3>Initial Assessment</h3>

                <p>{result.summary}</p>
              </div>
            )}

            {/* Recommended Protection */}
            {result.recommended_protection && (
              <div className="result-card">
                <span className="result-card-label">
                  RECOMMENDED PROTECTION
                </span>

                <h3>
                  {result.recommended_protection.title ||
                    "Possible Protection Strategy"}
                </h3>

                <p>
                  {result.recommended_protection.description ||
                    result.recommended_protection}
                </p>
              </div>
            )}

            {/* Possible IP Types */}
            {result.possible_ip_types?.length > 0 && (
              <div className="result-card">
                <span className="result-card-label">
                  POSSIBLE IP RIGHTS
                </span>

                <h3>Potential Protection Options</h3>

                <div className="result-tags">
                  {result.possible_ip_types.map(
                    (type, index) => (
                      <span
                        className="result-tag"
                        key={index}
                      >
                        {type}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Key Considerations */}
            {result.key_considerations?.length > 0 && (
              <div className="result-card">
                <span className="result-card-label">
                  KEY CONSIDERATIONS
                </span>

                <h3>Important Factors</h3>

                <ul className="result-list">
                  {result.key_considerations.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {result.next_steps?.length > 0 && (
              <div className="result-card">
                <span className="result-card-label">
                  NEXT STEPS
                </span>

                <h3>Suggested Actions</h3>

                <ol className="result-list">
                  {result.next_steps.map(
                    (step, index) => (
                      <li key={index}>{step}</li>
                    )
                  )}
                </ol>
              </div>
            )}

            {/* Risks */}
            {result.risks?.length > 0 && (
              <div className="result-card result-warning">
                <span className="result-card-label">
                  RISKS / LIMITATIONS
                </span>

                <h3>Things to Consider</h3>

                <ul className="result-list">
                  {result.risks.map(
                    (risk, index) => (
                      <li key={index}>{risk}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Sources */}
            {result.sources?.length > 0 && (
              <div className="result-card">
                <span className="result-card-label">
                  SOURCES
                </span>

                <h3>Supporting References</h3>

                <div className="source-list">
                  {result.sources.map(
                    (source, index) => (
                      <div
                        className="source-item"
                        key={
                          source.id ||
                          source.url ||
                          index
                        }
                      >
                        <span className="source-number">
                          [{index + 1}]
                        </span>

                        <div>
                          <strong>
                            {source.title ||
                              "Source"}
                          </strong>

                          {source.jurisdiction && (
                            <span>
                              {" "}
                              —{" "}
                              {source.jurisdiction}
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
                    )
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Disclaimer */}
      <footer className="page-disclaimer">
        <p>
          IP-SAKTI-Sahayak provides AI-assisted informational
          analysis and does not constitute professional legal advice.
          IP rights and regulations may vary by jurisdiction and may
          change over time.
        </p>
      </footer>
    </div>
  );
}

export default IPAnalyzer;