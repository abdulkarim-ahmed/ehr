import PatientPage from "./components/Patient-page"

export default function App() {
  // ADD ACCESS TOKEN HERE
  const ACCESS_TOKEN = "ADD_ACCESS_TOKEN"

  const APP_URL = "https://sahl.ai/iframe?access_token="
  const iframeUrl = `${APP_URL}${ACCESS_TOKEN}`

  return <PatientPage iframeUrl={iframeUrl} />
}
