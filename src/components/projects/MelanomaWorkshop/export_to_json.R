#!/usr/bin/env Rscript

# ============================================================================
# Melanoma Workshop Evaluation - Data Export to JSON
# ============================================================================
#
# PURPOSE:
# Extract analysis results from R and export to JSON for web visualization
#
# DATA SOURCE:
# ~/Library/Mobile Documents/com~apple~CloudDocs/Projects/Hearing Loss - Congenital Diabetes/
# Portfolio Showcase/analysis/AfterPerthWKS/Survey Responses 9 Jul 2024.xlsx
#
# OUTPUT:
# 5 JSON files in: public/data/melanoma-workshop/
# - demographics.json
# - baseline_attitudes.json
# - knowledge_change.json
# - statistical_tests.json
# - qualitative_responses.json (optional)
#
# CRITICAL: Use correct sample sizes!
# - Descriptive stats: N=51 pre, N=53 post (ALL participants)
# - Paired comparisons: N=48 (PAIRED participants only)
#
# ============================================================================

# Required packages
library(readxl)
library(dplyr)
library(jsonlite)
library(psych)

# ============================================================================
# CONFIGURATION
# ============================================================================

# Input file path (MASTER FILE - contains BOTH workshops)
DATA_FILE <- "~/Library/Mobile Documents/com~apple~CloudDocs/Projects/Hearing Loss - Congenital Diabetes/Portfolio Showcase/analysis/AfterPerthWKS/Survey Responses 9 Jul 2024.xlsx"

# Output directory
OUTPUT_DIR <- "./public/data/melanoma-workshop"

# Create output directory if it doesn't exist
if (!dir.exists(OUTPUT_DIR)) {
  dir.create(OUTPUT_DIR, recursive = TRUE)
  message("✓ Created output directory: ", OUTPUT_DIR)
}

# ============================================================================
# STEP 1: LOAD DATA
# ============================================================================

message("\n============================================")
message("STEP 1: Loading data from master Excel file")
message("============================================\n")

# Load pre-workshop data
pre_wks_data <- read_excel(
  DATA_FILE,
  sheet = "Pre_WKS_dataAnalysis"
)

# Load post-workshop data
post_wks_data <- read_excel(
  DATA_FILE,
  sheet = "Post_WKS_dataAnalysis"
)

message("✓ Pre-workshop data loaded: N=", nrow(pre_wks_data))
message("✓ Post-workshop data loaded: N=", nrow(post_wks_data))

# Identify paired participants (present in both pre and post)
pre_ids <- pre_wks_data$`Participant ID`
post_ids <- post_wks_data$`Participant ID`
paired_ids <- intersect(pre_ids, post_ids)

message("✓ Paired participants identified: N=", length(paired_ids))

# Verify expected sample sizes
stopifnot("Expected N=51 pre-workshop" = nrow(pre_wks_data) == 51)
stopifnot("Expected N=53 post-workshop" = nrow(post_wks_data) == 53)
stopifnot("Expected N=48 paired" = length(paired_ids) == 48)

message("\n✅ Sample sizes verified!")

# ============================================================================
# STEP 2: DEMOGRAPHICS
# ============================================================================

message("\n============================================")
message("STEP 2: Generating demographics.json")
message("============================================\n")

demographics <- list(
  totalPreWorkshop = nrow(pre_wks_data),
  totalPostWorkshop = nrow(post_wks_data),
  pairedParticipants = length(paired_ids),
  totalUniqueParticipants = length(unique(c(pre_ids, post_ids))),
  responseRate = round((length(paired_ids) / length(unique(c(pre_ids, post_ids)))) * 100, 1),
  workshopInfo = list(
    workshop1 = list(
      date = "2023",
      location = "Unknown",
      participantIDRange = "0015-0099"
    ),
    workshop2 = list(
      date = "July 2024",
      location = "Perth, Australia",
      participantIDRange = "0102-0113"
    )
  ),
  dataUsageStrategy = list(
    descriptiveStats = list(
      sample = "ALL participants",
      preN = nrow(pre_wks_data),
      postN = nrow(post_wks_data)
    ),
    pairedComparisons = list(
      sample = "PAIRED participants only",
      n = length(paired_ids)
    )
  )
)

# Write to JSON
write_json(
  demographics,
  file.path(OUTPUT_DIR, "demographics.json"),
  pretty = TRUE,
  auto_unbox = TRUE
)

message("✓ demographics.json exported")

# ============================================================================
# STEP 3: BASELINE ATTITUDES (Q1.1, Q1.2)
# ============================================================================

message("\n============================================")
message("STEP 3: Generating baseline_attitudes.json")
message("============================================\n")

# TODO: Replace these column names with actual question column names from your Excel file
# Example: pre_wks_data$`Q1.1_Attitude_Toward_Genetic_Testing`

baseline_attitudes <- list(
  q1_1 = data.frame(
    response = c("Very Positive", "Positive", "Neutral", "Negative"),
    count = c(20, 25, 5, 1),  # TODO: Calculate from actual data
    percentage = c(39.2, 49.0, 9.8, 2.0)  # TODO: Calculate from actual data
  ),
  q1_2 = data.frame(
    response = c("Very Confident", "Confident", "Somewhat Confident", "Not Confident"),
    count = c(8, 18, 20, 5),  # TODO: Calculate from actual data
    percentage = c(15.7, 35.3, 39.2, 9.8)  # TODO: Calculate from actual data
  )
)

# Write to JSON
write_json(
  baseline_attitudes,
  file.path(OUTPUT_DIR, "baseline_attitudes.json"),
  pretty = TRUE,
  dataframe = "rows"
)

message("✓ baseline_attitudes.json exported")
message("⚠️  TODO: Replace placeholder data with actual calculations")

# ============================================================================
# STEP 4: KNOWLEDGE CHANGE (ALL QUESTIONS)
# ============================================================================

message("\n============================================")
message("STEP 4: Generating knowledge_change.json")
message("============================================\n")

# Filter to paired participants only
paired_pre <- pre_wks_data %>% filter(`Participant ID` %in% paired_ids)
paired_post <- post_wks_data %>% filter(`Participant ID` %in% paired_ids)

# TODO: Replace with actual question column names
question_columns <- c(
  "Q1.1", "Q1.2",
  "Q2.1", "Q2.2", "Q2.3", "Q2.4", "Q2.5", "Q2.6",
  "Q3.1", "Q3.2", "Q3.3"
)

question_titles <- c(
  "Attitude Toward Genetic Testing",
  "Confidence in Discussing Genetics",
  "Understanding Melanoma Genetics",
  "Knowledge of Genetic Testing Options",
  "Interpretation of Genetic Results",
  "Risk Communication Skills",
  "Identifying Appropriate Candidates",
  "Ethical Considerations",
  "Intent to Use Testing in Practice",
  "Intent to Refer to Genetic Counselor",
  "Intent to Discuss Genetics with Patients"
)

# TODO: Calculate actual means, SDs, and changes for each question
knowledge_change <- list(
  questions = lapply(1:length(question_columns), function(i) {
    # Example calculation structure (replace with actual data)
    list(
      id = question_columns[i],
      title = question_titles[i],
      preMean = 3.0,  # TODO: mean(paired_pre[[question_columns[i]]], na.rm = TRUE)
      preSD = 0.8,    # TODO: sd(paired_pre[[question_columns[i]]], na.rm = TRUE)
      postMean = 4.0, # TODO: mean(paired_post[[question_columns[i]]], na.rm = TRUE)
      postSD = 0.6,   # TODO: sd(paired_post[[question_columns[i]]], na.rm = TRUE)
      change = 1.0,   # TODO: postMean - preMean
      changePercentage = 33.3  # TODO: ((postMean - preMean) / preMean) * 100
    )
  })
)

# Write to JSON
write_json(
  knowledge_change,
  file.path(OUTPUT_DIR, "knowledge_change.json"),
  pretty = TRUE,
  auto_unbox = TRUE
)

message("✓ knowledge_change.json exported")
message("⚠️  TODO: Replace placeholder data with actual calculations")

# ============================================================================
# STEP 5: STATISTICAL TESTS (PAIRED T-TESTS)
# ============================================================================

message("\n============================================")
message("STEP 5: Generating statistical_tests.json")
message("============================================\n")

# TODO: Run actual paired t-tests for each question
statistical_tests <- list(
  pairedTTests = lapply(1:length(question_columns), function(i) {
    # Example structure (replace with actual t-test results)
    # t_result <- t.test(paired_post[[question_columns[i]]],
    #                     paired_pre[[question_columns[i]]],
    #                     paired = TRUE)

    # Calculate Cohen's d
    # cohens_d <- cohen.d(paired_post[[question_columns[i]]],
    #                     paired_pre[[question_columns[i]]])$estimate

    list(
      question = paste0(question_columns[i], ": ", question_titles[i]),
      tStatistic = 5.234,  # TODO: t_result$statistic
      pValue = 0.000012,   # TODO: t_result$p.value
      cohensD = 1.25,      # TODO: cohens_d
      confidenceInterval = list(
        lower = 0.65,      # TODO: t_result$conf.int[1]
        upper = 1.15       # TODO: t_result$conf.int[2]
      )
    )
  })
)

# Write to JSON
write_json(
  statistical_tests,
  file.path(OUTPUT_DIR, "statistical_tests.json"),
  pretty = TRUE,
  auto_unbox = TRUE
)

message("✓ statistical_tests.json exported")
message("⚠️  TODO: Replace placeholder data with actual paired t-tests")

# ============================================================================
# STEP 6: QUALITATIVE RESPONSES (OPTIONAL)
# ============================================================================

message("\n============================================")
message("STEP 6: Generating qualitative_responses.json (optional)")
message("============================================\n")

# TODO: Extract qualitative feedback if available in your data
qualitative_responses <- list(
  responses = list(
    list(
      participantID = "0015",
      feedback = "Example feedback text",
      category = "positive"
    )
  )
)

# Write to JSON
write_json(
  qualitative_responses,
  file.path(OUTPUT_DIR, "qualitative_responses.json"),
  pretty = TRUE,
  auto_unbox = TRUE
)

message("✓ qualitative_responses.json exported")
message("⚠️  TODO: Add actual qualitative responses if available")

# ============================================================================
# SUMMARY
# ============================================================================

message("\n============================================")
message("EXPORT COMPLETE!")
message("============================================\n")
message("✅ All JSON files exported to: ", OUTPUT_DIR)
message("\n📋 TODO CHECKLIST:")
message("  [ ] Replace Q1.1, Q1.2, etc. with actual column names from Excel")
message("  [ ] Calculate actual means, SDs, and changes")
message("  [ ] Run paired t-tests and calculate effect sizes")
message("  [ ] Add qualitative responses if available")
message("  [ ] Verify all values in CALCULATIONS.md")
message("\n🎯 NEXT STEP: Run analyses in R and replace placeholder data")
