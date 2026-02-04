import React, { useState } from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import { ContentCard, KeyFinding } from '../../common';


const BarriersSection = () => {
  const { qualitative, isReady } = useMelanomaWorkshopData();
  const [showResponses, setShowResponses] = useState(false);

  if (!isReady || !qualitative) {
    return <div className="mw-loading">Loading...</div>;
  }

  const barriers = qualitative.q10_barriers || {};
  const themes = barriers.themes || [];
  const wordFreq = barriers.word_frequency || [];
  const counselor = qualitative.q12_counselor || {};

  return (
    <div className="mw-section">
      <div className="mw-container">
        <section className="mw-barriers-section">
      <div className="mw-section-header">
        <h2 className="mw-section-title">Implementation Barriers: The Paradox</h2>
        <p className="mw-section-subtitle">
          95% of barriers are systemic, not educational
        </p>
      </div>

      <ContentCard className="mw-paradox-card">
        <h3>The Implementation Paradox</h3>
        <div className="mw-paradox-columns">
          <div className="mw-paradox-success">
            <h4 className="mw-success-title">✅ What the Workshop DID</h4>
            <ul className="mw-list">
              <li>Built ALL 12 clinical skills (large effects)</li>
              <li>Transformed knowledge (25%→95.5% moratorium awareness)</li>
              <li>Increased perceived relevance</li>
              <li>Achieved high satisfaction (9/10)</li>
              <li>Created motivated, capable clinicians</li>
            </ul>
          </div>
          <div className="mw-paradox-cannot">
            <h4 className="mw-cannot-title">❌ What the Workshop CANNOT Do</h4>
            <ul className="mw-list">
              <li>Give dermatologists more time in appointments</li>
              <li>Reduce cost barriers for patients</li>
              <li>Provide institutional funding/support</li>
              <li>Create genetic counselor access</li>
            </ul>
          </div>
        </div>
        <p className="mw-paradox-conclusion">
          <strong>The workshop didn't fail—it diagnosed the problem.</strong> Dermatologists are 
          now READY. The healthcare system is NOT READY.
        </p>
      </ContentCard>

      <div className="mw-barriers-hero">
        <KeyFinding
          title="Systemic Barriers"
          value="95%"
          description="Beyond workshop scope"
          icon="🚧"
          theme="warning"
        />
        <KeyFinding
          title="Top Barrier: TIME"
          value="57.1%"
          description="24 participants (time mentioned 21x)"
          icon="⏰"
          theme="danger"
        />
        <KeyFinding
          title="Second Barrier: COST"
          value="26.2%"
          description="11 participants (cost mentioned 8x)"
          icon="💰"
          theme="warning"
        />
        <KeyFinding
          title="Educational Barrier"
          value="4.8%"
          description="Already addressed by workshop"
          icon="✓"
          theme="success"
        />
      </div>

      <div className="mw-barriers-grid">
        <ContentCard title="Q10: Barriers to Implementation (Thematic Analysis)">
          <div className="mw-themes-list">
            {themes.map((theme, idx) => (
              <div key={idx} className="mw-theme-item">
                <div className="mw-theme-header">
                  <span className="mw-theme-name">{theme.Theme}</span>
                  <span className="mw-theme-pct">{theme.Percentage?.toFixed(1)}%</span>
                </div>
                <div className="mw-theme-bar">
                  <div 
                    className="mw-theme-fill" 
                    style={{ width: `${theme.Percentage || 0}%` }}
                  ></div>
                </div>
                <div className="mw-theme-count">n = {theme.Count} participants</div>
              </div>
            ))}
          </div>
        </ContentCard>

        <ContentCard title="Word Frequency Validation">
          <p className="mw-text">
            <strong>Top keywords</strong> align perfectly with thematic coding:
          </p>
          <div className="mw-word-freq-grid">
            {wordFreq.slice(0, 10).map((word, idx) => (
              <div key={idx} className="mw-word-item">
                <span className="mw-word-text">{word.word}</span>
                <span className="mw-word-count">×{word.n}</span>
              </div>
            ))}
          </div>
          <p className="mw-text mw-mt">
            "Time" mentioned <strong>21 times</strong>, "cost" mentioned <strong>8 times</strong> 
            - validates that these are the dominant barriers.
          </p>
        </ContentCard>
      </div>

      <ContentCard title="Sample Responses (Q10)" className="mw-responses-card">
        <button 
          className="mw-toggle-btn"
          onClick={() => setShowResponses(!showResponses)}
        >
          {showResponses ? '▼ Hide' : '▶ Show'} participant quotes
        </button>
        {showResponses && (
          <div className="mw-responses-list">
            {barriers.responses?.slice(0, 10).map((resp, idx) => (
              <div key={idx} className="mw-response-item">
                <span className="mw-response-id">{resp['Participant ID']}</span>
                <span className="mw-response-text">"{resp['10']}"</span>
              </div>
            ))}
          </div>
        )}
      </ContentCard>

      <div className="mw-barriers-interpretation">
        <ContentCard title="COM-B Framework Interpretation" className="mw-comb-card">
          <p className="mw-text">
            Using the <strong>COM-B model</strong> (Capability, Opportunity, Motivation):
          </p>
          <div className="mw-comb-grid">
            <div className="mw-comb-item mw-comb-success">
              <div className="mw-comb-icon">✅</div>
              <div className="mw-comb-label">Capability</div>
              <div className="mw-comb-desc">Workshop built all skills (d=1.23)</div>
            </div>
            <div className="mw-comb-item mw-comb-success">
              <div className="mw-comb-icon">✅</div>
              <div className="mw-comb-label">Motivation</div>
              <div className="mw-comb-desc">High satisfaction (9/10), increased relevance</div>
            </div>
            <div className="mw-comb-item mw-comb-fail">
              <div className="mw-comb-icon">❌</div>
              <div className="mw-comb-label">Opportunity</div>
              <div className="mw-comb-desc">Systemic barriers (time, cost, access)</div>
            </div>
          </div>
          <p className="mw-text mw-mt">
            <strong>Conclusion:</strong> Further training will not increase genetic testing uptake. 
            The bottleneck is <em>opportunity</em>, not capability or motivation.
          </p>
        </ContentCard>

        <ContentCard title="Q12: Proposed Solution" className="mw-counselor-card">
          <p className="mw-text">
            <strong>Would a genetic counselor in your practice help?</strong>
          </p>
          <div className="mw-counselor-responses">
            {counselor.responses?.map((resp, idx) => (
              <div key={idx} className={`mw-counselor-item mw-${resp.Response.toLowerCase()}`}>
                <span className="mw-counselor-response">{resp.Response}</span>
                <span className="mw-counselor-pct">{resp.Percentage?.toFixed(1)}%</span>
                <span className="mw-counselor-count">(n={resp.Count})</span>
              </div>
            ))}
          </div>
          <p className="mw-text mw-mt">
            <strong>79.4% say YES</strong> - strong demand signal for genetic counselor integration.
          </p>
          <p className="mw-text mw-highlight">
            <strong>Business case:</strong> A genetic counselor model addresses the #1 barrier 
            (time) via division of labor, freeing dermatologists to focus on clinical decisions.
          </p>
        </ContentCard>
      </div>
        </section>
      </div>
    </div>
  );
};

export default BarriersSection;
