export interface Consultation {
  id: string
  title: string
  date: string
  summary: string
}

export const initialConsultationsData: Consultation[] = [
  {
    id: "consult-1",
    title: "Primary Care – Initial Evaluation & Workup",
    date: "2025-01-10",
    summary: `* History: Patient with a long-standing history of hypertension and type 2 diabetes presents with new complaints of intermittent palpitations, occasional shortness of breath, and a non-productive cough.
  * Exam: Irregular heart rhythm noted on auscultation; mild wheezing on lung exam.
  * Plan:
	  * Ordered ECG and chest X-ray.
	  * Pending labs including CBC, CMP, and HbA1c.
	  * Advised patient to keep a symptom diary.`
  },
  {
    id: "consult-2",
    title: "Cardiology Clinic – AF Diagnosis and Initiation of Therapy",
    date: "2025-01-18",
    summary: `* Findings: ECG confirms new diagnosis of atrial fibrillation with rapid ventricular response.
  * Intervention: Started on apixaban for stroke prevention and initiated low-dose beta-blocker therapy.
  * Plan: Monitor for side effects; follow-up in 4 weeks.`
  },
  {
    id: "consult-3",
    title: "Pulmonology Clinic – COPD Diagnosis",
    date: "2025-01-22",
    summary: `* History: Referred for evaluation of persistent cough and dyspnea on exertion.
  * Tests: Spirometry performed showing an obstructive pattern; chest X-ray re-reviewed with hyperinflation noted.
  * Diagnosis: New diagnosis of COPD.
  * Plan:
	  * Initiated inhaled long-acting bronchodilator (LABA) combined with an inhaled corticosteroid.
	  * Reviewed proper inhaler technique.
	  * Advised smoking cessation (if applicable) and scheduled follow-up in 6 weeks.`
  },
  {
    id: "consult-4",
    title: "Endocrinology Clinic – Diabetes Management Adjustment",
    date: "2025-01-25",
    summary: `* Review: HbA1c at 8.0%; slightly above target.
  * Action: Adjusted metformin dose upward and added a low-dose GLP-1 receptor agonist to improve glycemic control given his increased cardiovascular risk.
  * Plan: Recheck HbA1c in 3 months.`
  },
  {
    id: "consult-5",
    title: "Hypertension Specialist – Blood Pressure Optimization",
    date: "2025-01-28",
    summary: `* History: Patient’s BP reading has risen to 150/90 mmHg, possibly related to stress and the new arrhythmia.
  * Intervention: Increased the ACE inhibitor dose and reinforced medication adherence.
  * Plan: Home BP monitoring advised; follow-up in 4 weeks.`
  },
  {
    id: "consult-6",
    title: "Primary Care – Follow-Up and Medication Reconciliation",
    date: "2025-02-02",
    summary: `* History: Patient reports occasional palpitations and mild dyspnea; no bleeding episodes on apixaban.
  * Review:
	  * AF and COPD diagnoses have been established.
	  * Noted slight improvement in blood pressure after ACE inhibitor adjustment, but still borderline.
  * Interventions:
	  * Added a low-dose diuretic to the antihypertensive regimen due to persistent elevation.
	  * Reinforced inhaler use and adherence to diabetes medications.
  * Plan:
	  * Repeat ECG and spirometry in 2 months.
	  * Close monitoring of side effects from the new diuretic.`
  },
  {
    id: "consult-7",
    title: "Clinical Pharmacy – Comprehensive Medication Review",
    date: "2025-02-05",
    summary: `Focus: Reviewed patient’s regimen including apixaban, beta-blocker, ACE inhibitor (with recent dose change), metformin, GLP-1 agonist, and new inhalers.
  Findings: No major drug–drug interactions noted; counseling provided on apixaban and inhaler technique.
  Plan: Follow-up medication review scheduled in 2 months.`
  },
  {
    id: "consult-8",
    title: "Pulmonary Rehabilitation – Initiation of COPD Exercise Program",
    date: "2025-02-10",
    summary: `* History: Patient with newly diagnosed COPD referred for pulmonary rehab due to reduced exercise tolerance.
  * Plan:
	  * Enrolled in a structured pulmonary rehabilitation program focusing on aerobic conditioning and breathing exercises.
	  * Oxygen saturation to be monitored during sessions.
	  * Follow-up planned after 8 weeks of participation.`
  },
  {
    id: "consult-9",
    title: "Nutrition Clinic – Dietary Counseling for Diabetes & Hypertension",
    date: "2025-02-15",
    summary: `* Review: Patient’s diet high in sodium and refined carbohydrates contributing to poor glycemic and blood pressure control.
  * Intervention: Developed a personalized meal plan emphasizing low-sodium options, whole grains, and lean proteins.
  * Plan: Follow-up in 6 weeks to assess dietary compliance and impact on labs.`
  },
  {
    id: "consult-10",
    title: "Primary Care – Consolidated Follow-Up and Longitudinal Management",
    date: "2025-02-22",
    summary: `* Review:
	  * AF remains controlled on apixaban and beta-blockers; no new arrhythmia episodes reported.
	  * COPD management appears effective with improved inhaler technique and ongoing pulmonary rehabilitation.
	  * Hypertension and diabetes continue to be managed with recent medication adjustments showing modest improvement.
  * Updates:
	  * Adjusted beta-blocker dose downward slightly due to occasional lightheadedness.
	  * Reiterated lifestyle modifications including exercise and diet adjustments.
  * Plan:
	  * Continue current regimen with scheduled repeat labs, ECG, and spirometry in 2–3 months.
	  * Emphasized the importance of adherence to all therapies and monitoring for any new symptoms.`
  }
]
