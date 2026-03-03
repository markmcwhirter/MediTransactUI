import { useEffect, useMemo, useState } from 'react'
import { fetchInsurancePlans, searchInsuranceCompanies } from '../api/mockApi'

function InsuranceMaintenancePage() {
  const [query, setQuery] = useState('')
  const [companies, setCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('')
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState('')
  const [beginDate, setBeginDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      searchInsuranceCompanies(query).then(setCompanies)
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    fetchInsurancePlans(selectedCompany).then(setPlans)
    setSelectedPlan('')
  }, [selectedCompany])

  const selectedCompanyName = useMemo(
    () => companies.find((item) => item.id === selectedCompany)?.name ?? 'No company selected',
    [companies, selectedCompany]
  )

  return (
    <article className="card tenant-maintenance-card">
      <div className="section-head">
        <h3>Insurance Maintenance</h3>
        <a href="#">Payer Rules</a>
      </div>

      <div className="tenant-grid">
        <label>
          Insurance Company Lookup
          <input
            type="search"
            placeholder="Search insurance company"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label>
          Insurance Company
          <select value={selectedCompany} onChange={(event) => setSelectedCompany(event.target.value)}>
            <option value="">Select company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
        </label>

        <label>
          Plan
          <select value={selectedPlan} onChange={(event) => setSelectedPlan(event.target.value)}>
            <option value="">Select plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>{plan.name}</option>
            ))}
          </select>
        </label>

        <label>
          Begin Date
          <input type="date" value={beginDate} onChange={(event) => setBeginDate(event.target.value)} />
        </label>

        <label>
          End Date
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
      </div>

      <p className="card-muted selection-summary">
        Selected: {selectedCompanyName} · {selectedPlan || 'No plan selected'} · {beginDate || 'No begin date'} → {endDate || 'No end date'}
      </p>

      <div className="tenant-actions">
        <button type="button">Save Insurance</button>
        <button type="button" className="secondary">Deactivate Plan</button>
      </div>
    </article>
  )
}

export default InsuranceMaintenancePage
