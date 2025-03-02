import React, { useEffect, useState } from "react"
import { SummaryData } from "@/types/ICDAutomation"

type ORFormProps = {
  summaryData: SummaryData
}

interface FormData {
  patientName: string
  mrNumber: string
  gender: string
  age: string
  nationality: string
  department: string
  ward: string
  room: string
  date: string
  procedureTime: string
  consultantName: string
  surgeonName: string
  asstSurgeon: string
  admissionCategory: string
  anesthetist: string
  anesthesiaType: string
  specimens: string
  specimensDetails: string
  bloodLoss: string
  transfusion: string
  unitsUsed: string
  mlUsed: string
  preOperativeDiagnosis: string
  postOperativeDiagnosis: string
  operationTitle: string
  surgicalProcedure: string
  complications: string
  complicationsDetails: string
  surgeonNameSign: string
  surgeonID: string
  signDate: string
  signTime: string
}

const hardcodedSampleData: Partial<FormData> = {
  patientName: "Mohammed Ali",
  mrNumber: "SA-000123",
  gender: "Male",
  age: "45",
  nationality: "Saudi",
  department: "General Surgery",
  ward: "Ward B",
  room: "202",
  date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  procedureTime: "14:30", // 24-hour format
  consultantName: "Dr. Ahmed Al-Farsi",
  surgeonName: "Dr. Khalid Al-Mutairi",
  asstSurgeon: "Dr. Youssef Al-Qahtani",
  anesthetist: "Dr. Faisal Al-Dossary",
  specimens: "None",
  mlUsed: "0",
  complicationsDetails: "None",
  surgeonNameSign: "Dr. Khalid Al-Mutairi",
  surgeonID: "KM-56789",
  signDate: new Date().toISOString().split("T")[0], // Current date
  signTime: new Date().toLocaleTimeString("en-SA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
}

const ORForm = ({ summaryData }: ORFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    mrNumber: "",
    gender: "",
    age: "",
    nationality: "",
    department: "",
    ward: "",
    room: "",
    date: "",
    procedureTime: "",
    consultantName: "",
    surgeonName: "",
    asstSurgeon: "",
    admissionCategory: "",
    anesthetist: "",
    anesthesiaType: "",
    specimens: "",
    specimensDetails: "",
    bloodLoss: "",
    transfusion: "",
    unitsUsed: "",
    mlUsed: "",
    preOperativeDiagnosis: "",
    postOperativeDiagnosis: "",
    operationTitle: "",
    surgicalProcedure: "",
    complications: "",
    complicationsDetails: "",
    surgeonNameSign: "",
    surgeonID: "",
    signDate: "",
    signTime: ""
  })

  useEffect(() => {
    if (
      summaryData.surgicalSpecimens ||
      summaryData.bloodLoss ||
      summaryData.transfusion ||
      summaryData.preOperativeDiagnosis ||
      summaryData.postOperativeDiagnosis ||
      summaryData.operativeTitle ||
      summaryData.surgicalProcedureAndFindings ||
      summaryData.complications
    ) {
      setFormData((prevState) => ({
        ...prevState,
        ...hardcodedSampleData,
        unitsUsed: summaryData.unitsUsed || "",
        mlUsed: summaryData.unitsUsed || "",
        preOperativeDiagnosis: summaryData.preOperativeDiagnosis || "",
        postOperativeDiagnosis: summaryData.postOperativeDiagnosis || "",
        admissionCategory: summaryData.admissionCategory || "",
        anesthesiaType: summaryData.anesthesiaType || "",
        operationTitle: summaryData.operativeTitle || "",
        surgicalProcedure: summaryData.surgicalProcedureAndFindings || "",
        complications: summaryData.complications || ""
      }))
    }
  }, [summaryData])

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className="container mx-auto p-4">
      <div
        id="operation-report"
        className="bg-white p-6 border border-gray-300 rounded-lg"
      >
        <div className="flex justify-between items-center mb-5 border-b border-gray-800 pb-2">
          <div className="text-xl font-bold">DH MD 099</div>
        </div>

        <div className="text-center font-bold text-xl mb-6">
          Operation Report
        </div>

        {/* Patient Information */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
            <div>
              <label className="block font-bold mb-1">Patient's Name:</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">MR#:</label>
              <input
                type="text"
                name="mrNumber"
                value={formData.mrNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Age:</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block font-bold mb-1">Nationality:</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Department and Location */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <div>
              <label className="block font-bold mb-1">Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Ward:</label>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Room:</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Procedure Time:</label>
              <input
                type="text"
                name="procedureTime"
                value={formData.procedureTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Medical Personnel */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block font-bold mb-1">Consultant Name:</label>
              <input
                type="text"
                name="consultantName"
                value={formData.consultantName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Surgeon Name:</label>
              <input
                type="text"
                name="surgeonName"
                value={formData.surgeonName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block font-bold mb-1">Asst. Surgeon:</label>
            <input
              type="text"
              name="asstSurgeon"
              value={formData.asstSurgeon}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Admission Category */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Admission Category:</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="elective"
              name="admissionCategory"
              value="Elective"
              checked={formData.admissionCategory
                .toLowerCase()
                .includes("elective")}
              onChange={handleChange}
              className="mr-1"
            />
            <label htmlFor="elective" className="mr-4">
              Elective
            </label>
            <input
              type="radio"
              id="emergency"
              name="admissionCategory"
              value="Emergency"
              checked={formData.admissionCategory
                .toLowerCase()
                .includes("emergency")}
              onChange={handleChange}
              className="mr-1"
            />
            <label htmlFor="emergency">Emergency</label>
          </div>
        </div>

        {/* Anesthesia */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Anesthetist(s):</label>
              <input
                type="text"
                name="anesthetist"
                value={formData.anesthetist}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Anesthesia Type:</label>
              <input
                type="text"
                name="anesthesiaType"
                value={formData.anesthesiaType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Surgical Specimens */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Surgical Specimens:</label>
          <div className="mb-2">
            <select
              name="specimens"
              value={formData.specimens}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-1">
              If Yes, please mention:
            </label>
            <input
              type="text"
              name="specimensDetails"
              value={formData.specimensDetails}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Blood Loss */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Blood Loss (ml):</label>
          <input
            type="text"
            name="bloodLoss"
            value={formData.bloodLoss}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Transfusion */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Transfusion:</label>
          <div className="mb-2">
            <select
              name="transfusion"
              value={formData.transfusion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-1">Units Used:</label>
              <input
                type="text"
                name="unitsUsed"
                value={formData.unitsUsed}
                onChange={handleChange}
                placeholder="Unit"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Amount (ml):</label>
              <input
                type="text"
                name="mlUsed"
                value={formData.mlUsed}
                onChange={handleChange}
                placeholder="ml"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Diagnoses */}
        <div className="mb-4">
          <label className="block font-bold mb-1">
            Pre-operative Diagnosis:
          </label>
          <textarea
            name="preOperativeDiagnosis"
            value={formData.preOperativeDiagnosis}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-24"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1">
            Post-operative Diagnosis:
          </label>
          <textarea
            name="postOperativeDiagnosis"
            value={formData.postOperativeDiagnosis}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-24"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1">
            Operation Title / Procedure(s):
          </label>
          <textarea
            name="operationTitle"
            value={formData.operationTitle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-24"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1">
            Surgical Procedure & Findings:
          </label>
          <textarea
            name="surgicalProcedure"
            value={formData.surgicalProcedure}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-32"
          ></textarea>
        </div>

        {/* Complications */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Complications:</label>
          <select
            name="complications"
            value={formData.complications}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option
              value="No"
              selected={formData.complications
                .toLowerCase()
                .includes("no intraoperative")}
            >
              No
            </option>
          </select>
          <div>
            <label className="block font-bold mb-1">
              If Yes, please mention:
            </label>
            <input
              type="text"
              name="complicationsDetails"
              value={formData.complicationsDetails}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Signature Section */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2">
                <label className="block font-bold mb-1">Surgeon Name:</label>
                <input
                  type="text"
                  name="surgeonNameSign"
                  value={formData.surgeonNameSign}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block font-bold mb-1">ID No:</label>
                  <input
                    type="text"
                    name="surgeonID"
                    value={formData.surgeonID}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Date:</label>
                  <input
                    type="date"
                    name="signDate"
                    value={formData.signDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="border-t border-dotted border-gray-800 pt-1 text-center mt-8 mb-4">
                Signature & Stamp
              </div>
              <div>
                <label className="block font-bold mb-1">Time:</label>
                <input
                  type="time"
                  name="signTime"
                  value={formData.signTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ORForm
