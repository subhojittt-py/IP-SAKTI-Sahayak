import React from "react";
import { useEffect, useState } from "react";
import { getSources } from "../services/api";
function Sources() {
  const [sources, setSources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jurisdiction, setJurisdiction] = useState("All");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const jurisdictions = [
    "All",
    "India",
    "USA",
    "European Union",
    "United Kingdom",
    "Japan",
    "Australia",
    "Canada",
    "International",
  ];

  const categories = [
    "All",
    "Patent",
    "Trademark",
    "Copyright",
    "Traditional Knowledge",
    "Regulatory",
    "Ayurveda",
  ];

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getSources();

      setSources(response?.sources || response || []);
    } catch (err) {
      console.error("Sources API error:", err);

      setError(
        "Unable to load sources. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredSources = sources.filter((source) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      !search ||
      source.title?.toLowerCase().includes(search) ||
      source.description?.toLowerCase().includes(search) ||
      source.organization?.toLowerCase().includes(search) ||
      source.category?.toLowerCase().includes(search);

    const matchesJurisdiction =
      jurisdiction === "All" ||
      source.jurisdiction === jurisdiction;

    const matchesCategory =
      category === "All" ||
      source.category === category;

    return (
      matchesSearch &&
      matchesJurisdiction &&
      matchesCategory
    );
  });

  const clearFilters = () => {
    setSearchTerm("");
    setJurisdiction("All");
    setCategory("All");
  };

  return (
    <div className="sources-page">
      {/* Page Header */}
      <header className="page-header">
        <span className="page-label">
          KNOWLEDGE BASE
        </span>

        <h1>Sources & References</h1>

        <p>
          Explore the sources used by IP-SAKTI-Sahayak for
          intellectual property, regulatory, and traditional knowledge
          information.
        </p>
      </header>

      <main className="sources-container">
        {/* Search & Filters */}
        <section className="sources-controls">
          <div className="search-box">
            <label htmlFor="source-search">
              Search Sources
            </label>

            <input
              id="source-search"
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search patents, regulations, organizations..."
            />
          </div>

          <div className="filters-row">
            <div className="form-group">
              <label htmlFor="source-jurisdiction">
                Jurisdiction
              </label>

              <select
                id="source-jurisdiction"
                value={jurisdiction}
                onChange={(event) =>
                  setJurisdiction(event.target.value)
                }
              >
                {jurisdictions.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="source-category">
                Category
              </label>

              <select
                id="source-category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                {categories.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </section>

        {/* Error */}
        {error && (
          <section className="sources-error">
            <p>{error}</p>

            <button
              type="button"
              className="primary-button"
              onClick={loadSources}
            >
              Try Again
            </button>
          </section>
        )}

        {/* Loading */}
        {loading && !error && (
          <section className="sources-loading">
            <div className="loading-spinner"></div>

            <h2>Loading sources...</h2>

            <p>
              Retrieving the available knowledge sources.
            </p>
          </section>
        )}

        {/* Results */}
        {!loading && !error && (
          <section className="sources-results">
            <div className="sources-results-header">
              <div>
                <span className="page-label">
                  REFERENCES
                </span>

                <h2>
                  {filteredSources.length}{" "}
                  {filteredSources.length === 1
                    ? "Source"
                    : "Sources"}
                </h2>
              </div>
            </div>

            {filteredSources.length === 0 ? (
              <div className="sources-empty">
                <div className="empty-icon">?</div>

                <h2>No sources found</h2>

                <p>
                  Try changing your search term or filters.
                </p>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="sources-grid">
                {filteredSources.map(
                  (source, index) => (
                    <article
                      className="source-card"
                      key={
                        source.id ||
                        source.url ||
                        index
                      }
                    >
                      {/* Source Header */}
                      <div className="source-card-header">
                        <div className="source-type">
                          {source.category ||
                            "Reference"}
                        </div>

                        {source.jurisdiction && (
                          <span className="source-jurisdiction">
                            {source.jurisdiction}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3>
                        {source.title ||
                          "Untitled Source"}
                      </h3>

                      {/* Organization */}
                      {source.organization && (
                        <p className="source-organization">
                          {source.organization}
                        </p>
                      )}

                      {/* Description */}
                      {source.description && (
                        <p className="source-description">
                          {source.description}
                        </p>
                      )}

                      {/* Metadata */}
                      <div className="source-metadata">
                        {source.source_type && (
                          <span>
                            Type:{" "}
                            {source.source_type}
                          </span>
                        )}

                        {source.year && (
                          <span>
                            Year: {source.year}
                          </span>
                        )}
                      </div>

                      {/* Open Source */}
                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-open-button"
                        >
                          Open Source →
                        </a>
                      )}
                    </article>
                  )
                )}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="page-disclaimer">
        <p>
          Sources are provided for informational and research
          purposes. Always verify current legal and regulatory
          requirements with the relevant official authority.
        </p>
      </footer>
    </div>
  );
}

export default Sources;