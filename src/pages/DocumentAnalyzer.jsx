import React, { useState } from "react";

function DocumentAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      alert("Please select a document first.");
      return;
    }

    alert("Document analysis will be connected to the backend next.");
  };

  return (
    <div className="document-analyzer-page">
      <div className="document-analyzer-container">

        {/* Header */}
        <div className="document-analyzer-header">
          <span className="page-eyebrow">AI DOCUMENT ANALYSIS</span>

          <h1>Document Analyzer</h1>

          <p>
            Upload an intellectual property or regulatory document and
            analyze its key information with AI assistance.
          </p>
        </div>

        {/* Upload Card */}
        <div className="document-upload-card">

          <div
            className={`document-drop-zone ${
              isDragging ? "dragging" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="document-upload-icon">
              DOC
            </div>

            <h2>
              {selectedFile
                ? selectedFile.name
                : "Upload your document"}
            </h2>

            <p>
              {selectedFile
                ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                : "Drag and drop your file here, or choose a file from your device."}
            </p>

            <label className="document-file-button">
              Choose File

              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                hidden
              />
            </label>

            <span className="document-file-types">
              Supported formats: PDF, DOC, DOCX, TXT
            </span>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="selected-document">
              <div>
                <strong>{selectedFile.name}</strong>

                <span>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </button>
            </div>
          )}

          {/* Analyze */}
          <button
            type="button"
            className="primary-button document-analyze-button"
            onClick={handleAnalyze}
            disabled={!selectedFile}
          >
            Analyze Document
          </button>

        </div>

        {/* Information */}
        <div className="document-info-grid">

          <div className="document-info-card">
            <div className="document-info-number">01</div>

            <h3>Upload</h3>

            <p>
              Upload your IP, research, or regulatory document.
            </p>
          </div>

          <div className="document-info-card">
            <div className="document-info-number">02</div>

            <h3>Analyze</h3>

            <p>
              The system extracts relevant information from the document.
            </p>
          </div>

          <div className="document-info-card">
            <div className="document-info-number">03</div>

            <h3>Understand</h3>

            <p>
              Review potential IP considerations, important information,
              and relevant sources.
            </p>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="document-disclaimer">
          <strong>Important:</strong>

          <span>
            Document analysis provides informational assistance and does
            not constitute professional legal advice.
          </span>
        </div>

      </div>
    </div>
  );
}

export default DocumentAnalyzer;