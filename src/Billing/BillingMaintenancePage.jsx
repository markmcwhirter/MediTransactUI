import { useEffect, useMemo, useState } from 'react'
import { fetchBillingStatuses, fetchCasesByPatient, searchPatients } from '../api/mockApi'

function BillingMaintenancePage() {
  const [patientQuery, setPatientQuery] = useState('')
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState('')
  const [cases, setCases] = useState([])
  const [selectedCase, setSelectedCase] = useState('')
  const [chargeCode, setChargeCode] = useState('')
  const [units, setUnits] = useState('1')
  const [dateOfService, setDateOfService] = useState('')
  const [billingStatus, setBillingStatus] = useState('')
  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    fetchBillingStatuses().then(setStatuses)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchPatients(patientQuery).then(setPatients)
    }, 250)

    return () => clearTimeout(timer)
  }, [patientQuery])

  useEffect(() => {
    fetchCasesByPatient(selectedPatient).then((items) => {
      setCases(items)
      setSelectedCase('')
    })
  }, [selectedPatient])

  const selectedPatientRecord = useMemo(
    () => patients.find((patient) => patient.id === selectedPatient),
    [patients, selectedPatient]
  )

  return (
    <article className="card billing-maintenance-card">
      <div className="section-head">
        <h3>Billing by Patient Case</h3>
        <a href="#">Billing Rules</a>
      </div>

      <div className="tenant-grid user-grid">
        <label>
          Patient Lookup
          <input
            type="search"
            placeholder="Search patient"
            value={patientQuery}
            onChange={(event) => setPatientQuery(event.target.value)}
          />
        </label>

        <label>
          Patient
          <select value={selectedPatient} onChange={(event) => setSelectedPatient(event.target.value)}>
            <option value="">Select patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </label>

        <label>
          Case
          <select value={selectedCase} onChange={(event) => setSelectedCase(event.target.value)}>
            <option value="">Select case</option>
            {cases.map((item) => (
              <option key={item.id} value={item.id}>{item.caseNumber} · {item.reason}</option>
            ))}
          </select>
        </label>

        <label>
          Charge Code
          <input type="text" value={chargeCode} onChange={(event) => setChargeCode(event.target.value)} placeholder="e.g. 99213" />
        </label>

        <label>
          Units
          <input type="number" min="1" value={units} onChange={(event) => setUnits(event.target.value)} />
        </label>

        <label>
          Date of Service
          <input type="date" value={dateOfService} onChange={(event) => setDateOfService(event.target.value)} />
        </label>

        <label>
          Billing Status
          <select value={billingStatus} onChange={(event) => setBillingStatus(event.target.value)}>
            <option value="">Select status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="card-muted selection-summary">
        Selected: {selectedPatientRecord?.name || 'No patient'} · {selectedCase || 'No case'} · {chargeCode || 'No charge code'} · {units || '0'} units · {billingStatus || 'No status'}
      </p>

      <div className="tenant-actions">
        <button type="button">Save Charge</button>
        <button type="button" className="secondary">Submit to Payer</button>
      </div>
    </article>
  )
}

export default BillingMaintenancePage
