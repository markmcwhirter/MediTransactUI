import { useEffect, useMemo, useState } from 'react'
import { fetchLocationTypes, searchTenantLocations } from '../api/mockApi'

function TenantLocationMaintenancePage() {
  const [query, setQuery] = useState('')
  const [locations, setLocations] = useState([])
  const [locationTypes, setLocationTypes] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [locationType, setLocationType] = useState('')

  useEffect(() => {
    fetchLocationTypes().then(setLocationTypes)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchTenantLocations(query).then(setLocations)
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  const locationRecord = useMemo(
    () => locations.find((item) => item.id === selectedLocation),
    [locations, selectedLocation]
  )

  return (
    <article className="card tenant-maintenance-card">
      <div className="section-head">
        <h3>Tenant Location Maintenance</h3>
        <a href="#">Location Policy</a>
      </div>

      <div className="tenant-grid">
        <label>
          Location Lookup
          <input
            type="search"
            placeholder="Search location"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label>
          Location Results
          <select value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>{location.name} · {location.tenantCode}</option>
            ))}
          </select>
        </label>

        <label>
          Location Type
          <select value={locationType} onChange={(event) => setLocationType(event.target.value)}>
            <option value="">Select type</option>
            {locationTypes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="card-muted selection-summary">
        Selected: {locationRecord?.name || 'No location'} · {locationRecord?.address || 'No address'} · {locationType || 'No type selected'}
      </p>

      <div className="tenant-actions">
        <button type="button">Save Location</button>
        <button type="button" className="secondary">Deactivate Location</button>
      </div>
    </article>
  )
}

export default TenantLocationMaintenancePage
