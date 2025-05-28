export const patients = [
  {
    id: "PAT-1x9A7",
    name: "Sarah Johnson",
    dob: "1983-07-15",
    gender: "Female",
    phone: "(555) 123-4567",
    email: "sarah.johnson@example.com",
    address: "123 Main St, Anytown, CA 94321",
    insurance: "HealthPlus Insurance",
    policyNumber: "HP-987654321",
    status: "Active",
    statusColor: "green",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "Asthma"],
    medications: ["Lisinopril 10mg", "Albuterol inhaler"],
    visits: [
      {
        id: "V-10045",
        date: "May 10, 2025",
        type: "Check-up",
        provider: "Dr. Emily Chen",
        department: "Primary Care",
        notes:
          "Patient reports feeling well. Blood pressure is 128/82, which is improved from last visit. Continue current medications."
      },
      {
        id: "V-10032",
        date: "Feb 22, 2025",
        type: "Follow-up",
        provider: "Dr. Emily Chen",
        department: "Primary Care",
        notes:
          "Blood pressure elevated at 142/90. Increased Lisinopril dosage from 5mg to 10mg daily. Schedule follow-up in 3 months."
      },
      {
        id: "V-10018",
        date: "Nov 15, 2024",
        type: "Urgent Care",
        provider: "Dr. James Wilson",
        department: "Urgent Care",
        notes:
          "Patient presented with acute asthma exacerbation. Administered nebulizer treatment. Prescribed prednisone 20mg for 5 days."
      }
    ]
  },
  {
    id: "PAT-8vf8g",
    name: "Michael Chen",
    dob: "1960-03-22",
    gender: "Male",
    phone: "(555) 987-6543",
    email: "michael.chen@example.com",
    address: "456 Oak Ave, Somewhere, NY 10001",
    insurance: "Medicare",
    policyNumber: "MED-123456789",
    status: "Follow-up",
    statusColor: "amber",
    allergies: ["Sulfa drugs", "Shellfish"],
    conditions: [
      "Type 2 Diabetes",
      "Coronary Artery Disease",
      "Hyperlipidemia"
    ],
    medications: ["Metformin 1000mg", "Atorvastatin 40mg", "Aspirin 81mg"],
    visits: [
      {
        id: "V-10044",
        date: "May 8, 2025",
        type: "Follow-up",
        provider: "Dr. Robert Lee",
        department: "Cardiology",
        notes:
          "Patient reports occasional chest discomfort. EKG shows no acute changes. Scheduled stress test for next week."
      },
      {
        id: "V-10037",
        date: "Mar 15, 2025",
        type: "Check-up",
        provider: "Dr. Sarah Miller",
        department: "Endocrinology",
        notes:
          "HbA1c improved to 7.1%. Continue current diabetes management. Discussed importance of regular exercise."
      },
      {
        id: "V-10025",
        date: "Jan 5, 2025",
        type: "Urgent Care",
        provider: "Dr. Thomas Brown",
        department: "Urgent Care",
        notes:
          "Patient presented with flu-like symptoms. Tested positive for influenza A. Prescribed Tamiflu 75mg BID for 5 days."
      }
    ]
  },
  {
    id: "PAT-7pxAd",
    name: "Robert Williams",
    dob: "1947-11-08",
    gender: "Male",
    phone: "(555) 456-7890",
    email: "robert.williams@example.com",
    address: "789 Pine St, Elsewhere, FL 33101",
    insurance: "Medicare",
    policyNumber: "MED-987654321",
    status: "Critical",
    statusColor: "red",
    allergies: ["Codeine", "Contrast dye"],
    conditions: ["Congestive Heart Failure", "COPD", "Chronic Kidney Disease"],
    medications: [
      "Furosemide 40mg",
      "Carvedilol 25mg",
      "Tiotropium inhaler",
      "Spironolactone 25mg"
    ],
    visits: [
      {
        id: "V-10043",
        date: "May 5, 2025",
        type: "Emergency",
        provider: "Dr. Jennifer Park",
        department: "Emergency Medicine",
        notes:
          "Patient admitted with acute exacerbation of CHF. Pulmonary edema present on chest X-ray. Started IV diuretics and oxygen therapy."
      },
      {
        id: "V-10039",
        date: "Apr 10, 2025",
        type: "Follow-up",
        provider: "Dr. Michael Johnson",
        department: "Cardiology",
        notes:
          "Patient reports increased shortness of breath and ankle edema. Increased Furosemide to 40mg BID. Scheduled echocardiogram."
      },
      {
        id: "V-10030",
        date: "Feb 15, 2025",
        type: "Follow-up",
        provider: "Dr. Lisa Wong",
        department: "Nephrology",
        notes:
          "eGFR decreased to 38 mL/min. Discussed dietary sodium restriction. Continue current medications with close monitoring."
      }
    ]
  },
  {
    id: "PAT-98xVs1",
    name: "Emily Rodriguez",
    dob: "1996-09-30",
    gender: "Female",
    phone: "(555) 789-0123",
    email: "emily.rodriguez@example.com",
    address: "321 Elm St, Nowhere, TX 75001",
    insurance: "BlueCross BlueShield",
    policyNumber: "BCBS-123789456",
    status: "Active",
    statusColor: "green",
    allergies: ["No known allergies"],
    conditions: ["Anxiety", "Migraine"],
    medications: ["Sertraline 50mg", "Sumatriptan 50mg as needed"],
    visits: [
      {
        id: "V-10042",
        date: "May 3, 2025",
        type: "Check-up",
        provider: "Dr. David Kim",
        department: "Primary Care",
        notes:
          "Patient reports improved anxiety symptoms with current medication. Discussed stress management techniques."
      },
      {
        id: "V-10035",
        date: "Mar 1, 2025",
        type: "Urgent Care",
        provider: "Dr. Rachel Green",
        department: "Urgent Care",
        notes:
          "Patient presented with severe migraine. Administered Toradol injection. Migraine resolved. Discussed trigger avoidance."
      },
      {
        id: "V-10022",
        date: "Dec 12, 2024",
        type: "Follow-up",
        provider: "Dr. David Kim",
        department: "Primary Care",
        notes:
          "Started on Sertraline 25mg for anxiety. Tolerated well, increased to 50mg. Follow up in 3 months."
      }
    ]
  },
  {
    id: "PAT-5ivDj",
    name: "David Kim",
    dob: "1974-05-17",
    gender: "Male",
    phone: "(555) 234-5678",
    email: "david.kim@example.com",
    address: "567 Maple Ave, Someplace, WA 98001",
    insurance: "Aetna",
    policyNumber: "AET-456123789",
    status: "Inactive",
    statusColor: "gray",
    allergies: ["Latex", "Ibuprofen"],
    conditions: ["Osteoarthritis", "Gastroesophageal Reflux Disease"],
    medications: ["Omeprazole 20mg", "Acetaminophen 500mg as needed"],
    visits: [
      {
        id: "V-10028",
        date: "Apr 28, 2025",
        type: "Follow-up",
        provider: "Dr. Susan Taylor",
        department: "Orthopedics",
        notes:
          "Patient reports continued knee pain. Discussed treatment options including physical therapy and possible knee injection."
      },
      {
        id: "V-10015",
        date: "Oct 15, 2024",
        type: "Procedure",
        provider: "Dr. James Anderson",
        department: "Gastroenterology",
        notes:
          "Underwent upper endoscopy. Findings consistent with GERD. Biopsy negative for H. pylori. Continue PPI therapy."
      },
      {
        id: "V-10005",
        date: "Jul 3, 2024",
        type: "Check-up",
        provider: "Dr. Maria Garcia",
        department: "Primary Care",
        notes:
          "Annual physical examination. All vitals within normal limits. Routine labs ordered. Encouraged regular exercise."
      }
    ]
  },
  {
    id: "",
    name: "Anon",
    dob: "1974-05-17",
    gender: "Male",
    phone: "(555) 234-5678",
    email: "david.kim@example.com",
    address: "567 Maple Ave, Someplace, WA 98001",
    insurance: "Aetna",
    policyNumber: "AET-456123789",
    status: "Inactive",
    statusColor: "gray",
    allergies: ["Latex", "Ibuprofen"],
    conditions: ["Osteoarthritis", "Gastroesophageal Reflux Disease"],
    medications: ["Omeprazole 20mg", "Acetaminophen 500mg as needed"],
    visits: [
      {
        id: "",
        date: "Apr 28, 2025",
        type: "Follow-up",
        provider: "Dr. Susan Taylor",
        department: "Orthopedics",
        notes:
          "Patient reports continued knee pain. Discussed treatment options including physical therapy and possible knee injection."
      },
      {
        id: "",
        date: "Oct 15, 2024",
        type: "Procedure",
        provider: "Dr. James Anderson",
        department: "Gastroenterology",
        notes:
          "Underwent upper endoscopy. Findings consistent with GERD. Biopsy negative for H. pylori. Continue PPI therapy."
      },
      {
        id: "",
        date: "Jul 3, 2024",
        type: "Check-up",
        provider: "Dr. Maria Garcia",
        department: "Primary Care",
        notes:
          "Annual physical examination. All vitals within normal limits. Routine labs ordered. Encouraged regular exercise."
      }
    ]
  }
]
