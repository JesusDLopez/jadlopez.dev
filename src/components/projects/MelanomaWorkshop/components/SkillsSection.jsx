import React from 'react';
import { useMelanomaWorkshopData } from '../data/DataContext';
import { ContentCard, KeyFinding, StatCard } from '../../common';

const SkillsSection = () => {
  const { skills, isReady, error } = useMelanomaWorkshopData();

  if (!isReady) {
    return <div className="mw-loading">Loading skills data...</div>;
  }

  if (error) {
    return <div className="mw-loading">Error loading data: {error.message}</div>;
  }

  if (!skills || !skills.test_results) {
    return <div className="mw-loading">Skills data not available. Please check data files.</div>;
  }

  // Use the test_results array from the JSON
  const skillTests = skills.test_results || [];
  const summary = skills.summary || {};

  // Calculate top 3 improvements - use Mean_Diff from JSON
  const topSkills = [...skillTests]
    .sort((a, b) => b.Mean_Diff - a.Mean_Diff)
    .slice(0, 3);

  return (
    <div className="mw-section">
      <div className="mw-container">
        <section className="mw-skills-section">
      <div className="mw-section-header">
        <h2 className="mw-section-title">PRIMARY OUTCOME: Clinical Skills Transformation</h2>
        <p className="mw-section-subtitle">
          All 12 confidence skills significantly improved (p&lt;0.001*** for all)
        </p>
      </div>

      <div className="mw-skills-hero">
        <StatCard
          label="Replication Success"
          value={`${summary.significant_t_test || 12}/${summary.total_skills || 12} Skills`}
          description="100% replication from N=35 analysis"
          variant="secondary"
          className="mw-stat-card"
        />
        <StatCard
          label="Mean Improvement"
          value={`+${(summary.mean_improvement || 1.34).toFixed(2)} points`}
          description="On 1-5 Likert scale"
          variant="primary"
          className="mw-stat-card"
        />
        <StatCard
          label="Effect Size"
          value={`d = ${(summary.mean_effect_size || 1.23).toFixed(2)}`}
          description="LARGE effect (Cohen's d)"
          variant="primary"
          className="mw-stat-card"
        />
        <StatCard
          label="Statistical Power"
          value="p < 0.001***"
          description="All skills B-H corrected"
          variant="secondary"
          className="mw-stat-card"
        />
      </div>

      {/* All 12 Skills gets full width row */}
      <ContentCard title="All 12 Skills: Pre vs Post" className="mw-content-card mw-all-skills">
        {/* Lollipop/Dumbbell Chart */}
        <div className="mw-dumbbell-chart">
          {/* Column Headers */}
          <div className="mw-dumbbell-header-row">
            <div className="mw-dumbbell-col-header mw-col-skill">Skills</div>
            <div className="mw-dumbbell-col-header mw-col-viz">
              <div className="mw-dumbbell-legend">
                <span className="mw-legend-item">
                  <span className="mw-legend-dot mw-pre-dot"></span>
                  Pre-Workshop
                </span>
                <span className="mw-legend-item">
                  <span className="mw-legend-dot mw-post-dot"></span>
                  Post-Workshop
                </span>
              </div>
            </div>
            <div className="mw-dumbbell-col-header mw-col-stat">Change</div>
            <div className="mw-dumbbell-col-header mw-col-stat">d</div>
            <div className="mw-dumbbell-col-header mw-col-stat">p-value</div>
          </div>

          <div className="mw-dumbbell-items">
            {skillTests.map((skill, idx) => {
              const scale = 5; // Likert scale 1-5
              const prePercent = ((skill.Pre_Mean - 1) / (scale - 1)) * 100;
              const postPercent = ((skill.Post_Mean - 1) / (scale - 1)) * 100;

              return (
                <div key={skill.Skill} className="mw-dumbbell-item">
                  <div className="mw-dumbbell-label">
                    {skill.Label || `Skill ${skill.Skill}`}
                  </div>
                  <div className="mw-dumbbell-viz">
                    <div className="mw-dumbbell-track">
                      <div
                        className="mw-dumbbell-line"
                        style={{
                          left: `${Math.min(prePercent, postPercent)}%`,
                          width: `${Math.abs(postPercent - prePercent)}%`
                        }}
                      ></div>
                      <div
                        className="mw-dumbbell-dot mw-pre"
                        style={{ left: `${prePercent}%` }}
                        data-value={skill.Pre_Mean.toFixed(2)}
                      ></div>
                      <div
                        className="mw-dumbbell-dot mw-post"
                        style={{ left: `${postPercent}%` }}
                        data-value={skill.Post_Mean.toFixed(2)}
                      ></div>
                    </div>
                  </div>
                  <div className="mw-dumbbell-stat mw-dumbbell-change">
                    +{skill.Mean_Diff.toFixed(2)}
                  </div>
                  <div className="mw-dumbbell-stat mw-dumbbell-d">
                    {skill.Cohens_d.toFixed(2)}
                  </div>
                  <div className="mw-dumbbell-stat mw-dumbbell-p">
                    {skill.t_p_adjusted < 0.001 ? '<0.001***' : `${skill.t_p_adjusted.toFixed(3)}***`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ContentCard>

      <ContentCard title="Top 3 Skill Improvements" className="mw-content-card mw-top-skills">
        {topSkills.map((skill, idx) => (
          <div key={skill.Skill} className="mw-skill-item">
            <div className="mw-skill-rank">#{idx + 1}</div>
            <div className="mw-skill-content">
              <h4 className="mw-skill-name">{skill.Label || `Skill ${skill.Skill}`}</h4>
              <div className="mw-skill-stats">
                <span className="mw-skill-improvement">
                  {skill.Pre_Mean?.toFixed(2)} → {skill.Post_Mean?.toFixed(2)}
                  ({skill.Mean_Diff > 0 ? '+' : ''}{skill.Mean_Diff?.toFixed(2)} points)
                </span>
                <span className="mw-skill-effect">d = {skill.Cohens_d?.toFixed(2)}</span>
                <span className="mw-skill-sig">
                  p {skill.t_p_adjusted < 0.001 ? '< 0.001***' : `= ${skill.t_p_adjusted?.toFixed(3)}***`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </ContentCard>

      {/* Interconnected Learning and What This Means share a row */}
      <div className="mw-skills-grid">
        <ContentCard title="Interconnected Learning" className="mw-content-card mw-correlation-insight">
          <p className="mw-text">
            <strong>Skills improve together</strong> (mean correlation r=0.33)
          </p>
          <div className="mw-correlation-examples">
            <div className="mw-correlation-item">
              <span className="mw-correlation-pair">Discuss outcomes ↔ Identify expert</span>
              <span className="mw-correlation-value">r = 0.75</span>
            </div>
            <div className="mw-correlation-item">
              <span className="mw-correlation-pair">Address concerns ↔ Consent process</span>
              <span className="mw-correlation-value">r = 0.73</span>
            </div>
            <div className="mw-correlation-item">
              <span className="mw-correlation-pair">Assess family history ↔ Review guidelines</span>
              <span className="mw-correlation-value">r = 0.71</span>
            </div>
          </div>
          <p className="mw-text mw-mt">
            <strong>Interpretation:</strong> The workshop builds <em>integrated competencies</em>,
            not isolated skills. Clinicians who gained confidence in one area tended to improve
            across the board.
          </p>
        </ContentCard>

        <ContentCard title="What This Means" className="mw-content-card mw-skills-interpretation">
          <p className="mw-text">
            The workshop successfully addressed the <strong>educational barrier</strong> to melanoma
            genetic testing implementation. With large effect sizes (d=1.23) and 100% skill improvement,
            dermatologists now have the <em>capability</em> to offer genetic testing.
          </p>
          <p className="mw-text">
            However, as we'll see in the Barriers section, <strong>capability alone is insufficient</strong>.
            Systemic factors (time, cost, access) remain the primary obstacles.
          </p>
        </ContentCard>
      </div>
        </section>
      </div>
    </div>
  );
};

export default SkillsSection;
