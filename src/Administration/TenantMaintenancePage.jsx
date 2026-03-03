import { useEffect, useMemo, useState } from 'react'
import { fetchTenantStatuses, searchTenants } from '../api/mockApi'

function TenantMaintenancePage() {
  const [query, setQuery] = useState('')
  const [tenants, setTenants] = useState([])
  const [statuses, setStatuses] = useState([])
  const [selectedTenant, setSelectedTenant] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetchTenantStatuses().then(setStatuses)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchTenants(query).then(setTenants)
    }, 250)
    return () => clearTimeout(timer)
  }, [query])

  const tenantRecord = useMemo(() => tenants.find((item) => item.id === selectedTenant), [tenants, selectedTenant])

  return (
    <article className="card tenant-maintenance-card">
      <div className="section-head">
        <h3>Tenant Maintenance</h3>
        <a href="#">Tenant Policy</a>
      </div>

      <div className="tenant-grid">
        <label>
          Tenant Lookup
          <input
            type="search"
            placeholder="Search tenant"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label>
          Tenant Results
          <select value={selectedTenant} onChange={(event) => setSelectedTenant(event.target.value)}>
            <option value="">Select tenant</option>
            {tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>{tenant.name} · {tenant.code}</option>
            ))}
          </select>
        </label>

        <label>
          Tenant Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">Select status</option>
            {statuses.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="card-muted selection-summary">
        Selected: {tenantRecord?.name || 'No tenant'} · {tenantRecord?.region || 'No region'} · {status || 'No status selected'}
      </p>

      <div className="tenant-actions">
        <button type="button">Save Tenant</button>
        <button type="button" className="secondary">Deactivate Tenant</button>
      </div>
    </article>
  )
}

export default TenantMaintenancePage
