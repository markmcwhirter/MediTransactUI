import { useEffect, useMemo, useState } from 'react'
import { searchProvidersForMaintenance } from '../api/mockApi'

function ProviderMaintenancePage() {
  const [query, setQuery] = useState('')
  const [providers, setProviders] = useState([])
  const [selectedProvider, setSelectedProvider] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [effectiveDate, setEffectiveDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      searchProvidersForMaintenance(query).then(setProviders)
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  const providerRecord = useMemo(
    () => providers.find((item) => item.id === selectedProvider),
    [providers, selectedProvider]
  )

  useEffect(() => {
    if (providerRecord) {
      setLicenseNumber(providerRecord.license)
    }
  }, [providerRecord])

  return (
    <article className="card tenant-maintenance-card">
      <div className="section-head">
        <h3>Provider Maintenance</h3>
        <a href="#">Credentialing Policy</a>
      </div>

      <div className="tenant-grid">
        <label>
          Provider Lookup
          <input
            type="search"
            placeholder="Search provider"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label>
          Provider
          <select value={selectedProvider} onChange={(event) => setSelectedProvider(event.target.value)}>
            <option value="">Select provider</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>{provider.name}</option>
            ))}
          </select>
        </label>

        <label>
          Medical License Number
          <input
            type="text"
            value={licenseNumber}
            onChange={(event) => setLicenseNumber(event.target.value)}
            placeholder="Enter medical license"
          />
        </label>

        <label>
          Effective Date
          <input type="date" value={effectiveDate} onChange={(event) => setEffectiveDate(event.target.value)} />
        </label>

        <label>
          End Date
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
      </div>

      <p className="card-muted selection-summary">
        Selected: {providerRecord?.name || 'No provider'} · {providerRecord?.specialty || 'No specialty'} · {providerRecord?.phone || 'No contact'}
      </p>

      <div className="tenant-actions">
        <button type="button">Save Provider</button>
        <button type="button" className="secondary">Deactivate Provider</button>
      </div>
    </article>
  )
}

export default ProviderMaintenancePage
