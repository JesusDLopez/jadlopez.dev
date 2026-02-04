// Methods Section - Analytical approach and statistical methods
import React, { useState } from 'react';
import { PipelineStepCard, MethodCard, TransitionCard } from '../../common';
import '../Styles/methods.css';

const MethodsSection = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [flippedPipelineCards, setFlippedPipelineCards] = useState({});

  const toggleCard = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const togglePipelineCard = (cardId) => {
    setFlippedPipelineCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  return (
    <div className="hl-section">
      <div className="hl-container">

        {/* Header with Portfolio Highlight */}
        <div className="hl-methods-header">
          <h2>My Analytical Approach</h2>
          <p className="hl-methods-subtitle">
            How I tackled this complex epidemiological question using advanced statistical methods and data visualization
          </p>

          <div className="hl-portfolio-highlight">
            <strong>Portfolio Highlight:</strong> I designed and executed a comprehensive analysis pipeline
            combining descriptive statistics, statistical testing, and multivariable modeling to investigate
            gestational diabetes as a risk factor for congenital hearing loss.
          </div>
        </div>

        {/* Analysis Pipeline Section */}
        <div className="hl-analysis-pipeline">
          <h3>My Analysis Strategy</h3>
          <p>I approached this research question systematically, building from exploratory analysis to sophisticated statistical modeling:</p>

          <div className="hl-pipeline-steps">

            {/* Step 1: Data Exploration */}
            <PipelineStepCard
              stepNumber="1"
              title="Data Exploration & Demographics"
              description="I examined population characteristics and created interactive visualizations to understand the data structure."
              techTerms={["interactive visualizations"]}
              backTitle="Interactive Visualizations"
              backContent="Interactive visualizations enable dynamic exploration of data through features like hover tooltips, animations, and responsive layouts. I used <em>D3.js</em> to create multiple chart types: <strong>donut charts</strong> for categorical distributions, <strong>bar charts</strong> for group comparisons, <strong>error bar charts</strong> with confidence intervals, <strong>horizontal bar charts</strong> for odds ratios, and <strong>forest plots</strong> for multivariable model results—making complex epidemiological data accessible and interpretable."
              isFlipped={flippedPipelineCards['step1']}
              onFlip={() => togglePipelineCard('step1')}
              className="hl-pipeline-step hl-step-1"
            />

            {/* Step 2: Risk Factor Analysis */}
            <PipelineStepCard
              stepNumber="2"
              title="Risk Factor Analysis"
              description="I calculated odds ratios for all potential risk factors to create a comprehensive risk landscape."
              techTerms={["odds ratios"]}
              backTitle="Odds Ratios"
              backContent="<strong>Odds ratio (OR):</strong> A measure of association between an exposure and outcome. <span class='hl-equation'>OR = 1</span> indicates no association; <span class='hl-equation'>OR > 1</span> indicates higher odds in exposed group; <span class='hl-equation'>OR < 1</span> indicates lower odds. For example, an <span class='hl-equation'>OR = 2.5</span> means the exposed group has <strong>2.5 times the odds</strong> of the outcome compared to the unexposed group. ORs help quantify the strength of risk factor associations."
              isFlipped={flippedPipelineCards['step2']}
              onFlip={() => togglePipelineCard('step2')}
              className="hl-pipeline-step hl-step-2"
            />

            {/* Step 3: Statistical Comparison */}
            <PipelineStepCard
              stepNumber="3"
              title="Primary Statistical Comparison"
              description="I performed chi-square testing to compare hearing loss rates and calculated confidence intervals."
              techTerms={["chi-square testing", "confidence intervals"]}
              backTitle="Chi-square & Confidence Intervals"
              backContent="<strong>Chi-square test (χ²):</strong> Assesses whether two categorical variables are independent by comparing <em>observed</em> vs. <em>expected</em> frequencies. <strong>Confidence intervals (CI):</strong> A range of plausible values for the true population parameter. A <span class='hl-equation'>95% CI</span> means if we repeated the study 100 times, approximately <strong>95 of those intervals</strong> would contain the true value. Together, these provide both <strong>significance testing</strong> and <strong>precision estimation</strong>."
              isFlipped={flippedPipelineCards['step3']}
              onFlip={() => togglePipelineCard('step3')}
              className="hl-pipeline-step hl-step-3"
            />

            {/* Step 4: Multivariable Modeling */}
            <PipelineStepCard
              stepNumber="4"
              title="Multivariable Modeling"
              description="I built logistic regression models to control for confounding variables and assess independent effects."
              techTerms={["logistic regression models"]}
              backTitle="Logistic Regression"
              backContent="<strong>Logistic regression:</strong> Models the probability of a binary outcome while controlling for multiple variables simultaneously using the <strong>logit link function</strong>: <div class='hl-equation-block'>ln(odds) = β₀ + β₁×exposure + β₂×confounders</div>Produces <strong>adjusted odds ratios</strong> that represent the independent effect of each variable after accounting for all other factors in the model. Essential for isolating true associations from confounded relationships."
              isFlipped={flippedPipelineCards['step4']}
              onFlip={() => togglePipelineCard('step4')}
              className="hl-pipeline-step hl-step-4"
            />

          </div>
        </div>

        {/* Statistical Methods Cards */}
        <div className="hl-methods-section">
          <h3>Statistical Methods I Used</h3>
          <div className="hl-method-cards">

            {/* Descriptive Analysis Card */}
            <MethodCard
              title="Descriptive Analysis"
              description="I calculated frequencies, proportions, and created interactive visualizations to explore the data structure."
              icon="📊"
              techTerms={["Proportions", "Cross-tabulation"]}
              libraries="pandas, numpy"
              code={`# Calculate proportions and frequencies
df.groupby(['gdm_status', 'hearing_loss'])
  .size().unstack(fill_value=0)
proportions = df.value_counts(normalize=True)

# Cross-tabulation analysis
pd.crosstab(df['gdm_status'],
           df['hearing_loss'],
           margins=True)`}
              isFlipped={flippedCards['descriptive']}
              onFlip={() => toggleCard('descriptive')}
              className="hl-method-card hl-descriptive-card"
            />

            {/* Statistical Testing Card */}
            <MethodCard
              title="Statistical Testing"
              description="I applied chi-square tests to assess associations and calculated confidence intervals for effect estimates."
              icon="🔬"
              techTerms={["Chi-square test", "Confidence Intervals"]}
              libraries="scipy.stats"
              code={`# Chi-square test for independence
from scipy.stats import chi2_contingency

contingency_table = pd.crosstab(
    df['gdm_status'], df['hearing_loss'])
chi2, p_value, dof, expected =
    chi2_contingency(contingency_table)

# Calculate 95% confidence intervals
from statsmodels.stats.proportion import \\
    proportion_confint
ci_lower, ci_upper = proportion_confint(
    count, nobs, alpha=0.05)`}
              isFlipped={flippedCards['testing']}
              onFlip={() => toggleCard('testing')}
              className="hl-method-card hl-testing-card"
            />

            {/* Effect Size Estimation Card */}
            <MethodCard
              title="Effect Size Estimation"
              description="I calculated odds ratios to quantify the strength of associations between risk factors and hearing loss."
              icon="⚖️"
              techTerms={["Odds Ratio (OR)", "Risk Estimation"]}
              libraries="pandas, numpy"
              code={`# Calculate odds ratios from 2x2 table
contingency = pd.crosstab(df['exposure'],
                         df['outcome'])
a, b = contingency.iloc[1, 1], contingency.iloc[1, 0]
c, d = contingency.iloc[0, 1], contingency.iloc[0, 0]

# OR = (a*d) / (b*c)
odds_ratio = (a * d) / (b * c)

# Using statsmodels for CI
from statsmodels.stats.contingency_tables import \\
    Table2x2
table = Table2x2(contingency)
or_ci = table.oddsratio_confint()`}
              isFlipped={flippedCards['odds']}
              onFlip={() => toggleCard('odds')}
              className="hl-method-card hl-odds-card"
            />

            {/* Multivariable Modeling Card */}
            <MethodCard
              title="Multivariable Modeling"
              description="I built logistic regression models to control for confounding variables and estimate adjusted effects."
              icon="🎯"
              techTerms={["Logistic Regression", "Confounders", "Adjusted OR"]}
              libraries="statsmodels, sklearn"
              code={`# Logistic regression modeling
from statsmodels.api import Logit
import statsmodels.api as sm

# Define model variables
X = df[['gdm_status', 'maternal_age', 'bmi',
       'delivery_complications']]
y = df['hearing_loss']
X = sm.add_constant(X)  # Add intercept

# Fit logistic regression
model = Logit(y, X).fit()
print(model.summary())

# Extract odds ratios and CIs
odds_ratios = np.exp(model.params)
conf_int = np.exp(model.conf_int())`}
              isFlipped={flippedCards['regression']}
              onFlip={() => toggleCard('regression')}
              className="hl-method-card hl-regression-card"
            />

            {/* Model Performance Card */}
            <MethodCard
              title="Model Performance"
              description="I evaluated model quality using discrimination measures and information criteria."
              icon="📈"
              techTerms={["C-statistic", "Pseudo R²", "AIC"]}
              libraries="sklearn.metrics"
              code={`# Model performance evaluation
from sklearn.metrics import roc_auc_score

# C-statistic (AUC-ROC)
y_pred_prob = model.predict(X)
c_stat = roc_auc_score(y, y_pred_prob)

# McFadden's Pseudo R-squared
null_deviance = model.null_deviance
resid_deviance = model.deviance
pseudo_r2 = 1 - (resid_deviance / null_deviance)

# AIC for model comparison
aic = model.aic
print(f"C-statistic: {c_stat:.3f}")
print(f"Pseudo R²: {pseudo_r2:.3f}")
print(f"AIC: {aic:.2f}")`}
              isFlipped={flippedCards['performance']}
              onFlip={() => toggleCard('performance')}
              className="hl-method-card hl-performance-card"
            />

          </div>
        </div>

        {/* Transition to Results */}
        <TransitionCard
          icon="🚀"
          title="From Analysis to Insights"
          description="With my analytical framework established, I now present the findings from my comprehensive investigation into gestational diabetes and hearing loss associations. Each visualization represents a different aspect of my statistical analysis pipeline."
        />

      </div>
    </div>
  );
};

export default MethodsSection;