function JobCard() {
  return (
    <section className="job-card-section">
      <div className="section-header">
        <h2>Featured Opportunities</h2>
      </div>
      <div className="companies-grid">
        <div className="job-card">
          <h1>Software Engineering</h1>
          <div className="info-row">
            <span className="info-icon">🏢</span>
            <span>Google</span>
          </div>
          <div className="info-row">
            <span className="info-icon">📍</span>
            <span>Bangalore</span>
          </div>
          <div className="job-meta">
            <span className="job-tag">💰 5 LPA</span>
            <span className="job-tag">🕐 Full-time</span>
            <span className="job-tag">🌿 On-site</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobCard;