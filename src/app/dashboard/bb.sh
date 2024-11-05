#!/bin/bash

# Define content for each page file
declare -A pages
pages=(
  ["prescriptions"]="export default function PrescriptionsPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Prescriptions</h1><p>Manage and review patient prescriptions here.</p></div>); }"
  ["inventory"]="export default function InventoryPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Inventory</h1><p>Check and manage pharmacy inventory here.</p></div>); }"
  ["patients"]="export default function PatientsPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Patients</h1><p>View and manage patient information and care plans.</p></div>); }"
  ["consultations"]="export default function ConsultationsPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Consultations</h1><p>Manage patient consultations and medication reviews.</p></div>); }"
  ["appointments"]="export default function AppointmentsPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Appointments</h1><p>Manage and schedule patient appointments here.</p></div>); }"
  ["calls"]="export default function CallsPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Calls</h1><p>Manage incoming calls and patient inquiries.</p></div>); }"
  ["check-ins"]="export default function CheckInsPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Check-ins</h1><p>Manage patient check-ins and waiting room status.</p></div>); }"
  ["history"]="export default function MedicalHistoryPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Medical History</h1><p>Access your medical history and past treatments.</p></div>); }"
  ["resources"]="export default function HealthResourcesPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Health Resources</h1><p>Access health information and educational resources.</p></div>); }"
  ["triage"]="export default function VirtualTriagePage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Virtual Triage</h1><p>Start a virtual triage session for immediate care assessment.</p></div>); }"
  ["schedules"]="export default function SchedulesPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Schedules</h1><p>Manage your work schedules and shifts here.</p></div>); }"
  ["care"]="export default function PatientCarePage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Patient Care</h1><p>Access and update patient care plans and treatments.</p></div>); }"
  ["vitals"]="export default function VitalsLogPage() { return (<div className=\"p-6\"><h1 className=\"text-2xl font-bold mb-4\">Vitals Log</h1><p>Record and monitor patient vital signs here.</p></div>); }"
)

# Loop through each entry in the associative array
for dir in "${!pages[@]}"; do
  # Write the content to the page.tsx file within each directory
  echo "${pages[$dir]}" > "$dir/page.tsx"
done

echo "All page.tsx files have been populated with the specified content."

