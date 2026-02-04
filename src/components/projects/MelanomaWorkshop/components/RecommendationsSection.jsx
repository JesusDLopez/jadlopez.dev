import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import { ContentCard } from '../../common';

const RecommendationsSection = () => {
  const { isReady } = useMelanomaWorkshopData();

  if (!isReady) {
    return <div className="mw-loading">Loading...</div>;
  }

  return (
    <div className="mw-section">
      <div className="mw-container">
        <section className="mw-recommendations-section">
      <div className="mw-section-header">
        <h2 className="mw-section-title">Recommendations</h2>
        <p className="mw-section-subtitle">
          Actionable next steps for practice, research, and policy
        </p>
      </div>

      <ContentCard className="mw-key-message">
        <h3>Key Message</h3>
        <p className="mw-text mw-large">
          The workshop <strong>succeeded in its educational mission</strong>. Dermatologists are 
          now capable and motivated. The challenge is <strong>systemic</strong>—the healthcare 
          system lacks the <em>opportunity structures</em> for implementation.
        </p>
        <p className="mw-text mw-highlight">
          <strong>Next step:</strong> Pilot genetic counselor integration with quasi-experimental design.
        </p>
      </ContentCard>

      <div className="mw-recommendations-grid">
        <ContentCard title="For Practice" icon="🏥" className="mw-rec-practice">
          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-continue">✅ Continue</div>
            <div className="mw-rec-content">
              <h4>Workshop is Effective</h4>
              <p>Continue offering the workshop. All 12 skills improved with large effect sizes 
              (d=1.23). The educational component works.</p>
            </div>
          </div>

          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-continue">✅ Emphasize</div>
            <div className="mw-rec-content">
              <h4>Moratorium Education Critical</h4>
              <p>Maintain strong emphasis on the 2019 insurance moratorium. This single knowledge 
              change (25%→95.5%) removes a major psychological barrier for both clinicians and patients.</p>
            </div>
          </div>

          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-caution">⚠️ Manage Expectations</div>
            <div className="mw-rec-content">
              <h4>Training ≠ Implementation Capacity</h4>
              <p>Be transparent with participants that systemic barriers exist. Set realistic 
              expectations: training builds skills, but system change is needed for widespread implementation.</p>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="For Research" icon="🔬" className="mw-rec-research">
          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-priority">🎯 Priority #1</div>
            <div className="mw-rec-content">
              <h4>Pilot Genetic Counselor Integration</h4>
              <p><strong>Design:</strong> Quasi-experimental (counselor vs. no-counselor sites)</p>
              <p><strong>Outcome:</strong> Genetic testing uptake rate</p>
              <p><strong>Rationale:</strong> 79% clinician demand + addresses #1 barrier (time)</p>
              <p><strong>Timeline:</strong> 12-month pilot with 3-month follow-up</p>
            </div>
          </div>

          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-important">📊 Study #2</div>
            <div className="mw-rec-content">
              <h4>Longitudinal Follow-Up</h4>
              <p><strong>Questions:</strong></p>
              <ul className="mw-list mw-small">
                <li>Do skills persist at 6-month, 12-month follow-up?</li>
                <li>Do practices actually change?</li>
                <li>What predicts sustained implementation vs. skill decay?</li>
              </ul>
            </div>
          </div>

          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-important">💰 Study #3</div>
            <div className="mw-rec-content">
              <h4>Cost-Effectiveness Analysis</h4>
              <p>Model the ROI of genetic counselor integration:</p>
              <ul className="mw-list mw-small">
                <li>Cost per genetic test facilitated</li>
                <li>Cascade testing benefits (family members)</li>
                <li>Early detection value (prevent future melanomas)</li>
              </ul>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="For Policy" icon="📋" className="mw-rec-policy">
          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-barrier">🚧 Barrier #1: Time</div>
            <div className="mw-rec-content">
              <h4>Address Time Constraints (57% of clinicians)</h4>
              <p><strong>Recommendation:</strong> Reimburse genetic counseling time separately 
              from dermatology consultation. Allow billing for pre-test and post-test counseling.</p>
              <p><strong>Mechanism:</strong> Medicare/PBS rebate for genetic counseling services 
              (similar to lactation consultant model).</p>
            </div>
          </div>

          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-barrier">🚧 Barrier #2: Cost</div>
            <div className="mw-rec-content">
              <h4>Reduce Cost Barriers (26% of clinicians)</h4>
              <p><strong>Recommendation:</strong> Subsidize genetic testing for high-risk patients 
              meeting clinical criteria (≥3 melanomas, family history, young onset).</p>
              <p><strong>Mechanism:</strong> Expand Medicare coverage criteria for melanoma 
              genetic testing beyond current limitations.</p>
            </div>
          </div>

          <div className="mw-rec-item">
            <div className="mw-rec-status mw-rec-infrastructure">🏗️ Infrastructure</div>
            <div className="mw-rec-content">
              <h4>Build Genetic Counseling Infrastructure</h4>
              <p><strong>Recommendation:</strong> Establish telehealth genetic counseling networks 
              for regional/rural areas.</p>
              <p><strong>Model:</strong> Hub-and-spoke: Major cancer centers (hubs) provide 
              telehealth counseling to regional dermatology practices (spokes).</p>
            </div>
          </div>
        </ContentCard>
      </div>

      <ContentCard className="mw-final-message">
        <h3>Final Thoughts</h3>
        <p className="mw-text">
          This evaluation demonstrates that <strong>education alone is necessary but insufficient</strong> 
          for practice change. The workshop successfully built capability and motivation, but 
          <strong> opportunity requires system-level intervention</strong>.
        </p>
        <p className="mw-text">
          The path forward is clear: <strong>Pilot genetic counselor integration</strong>. With 79% 
          clinician support and strong evidence of educational readiness, the time is right to 
          test this model.
        </p>
        <p className="mw-text mw-large mw-highlight">
          <strong>The workshop didn't fail—it diagnosed the problem and illuminated the solution.</strong>
        </p>
      </ContentCard>
        </section>
      </div>
    </div>
  );
};

export default RecommendationsSection;
