import { useEffect, useState } from 'react'
import { fetchLocationsByTenant, fetchRoleOptions, searchTenants } from '../api/mockApi'

function UserMaintenancePage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [tenantQuery, setTenantQuery] = useState('')
  const [tenants, setTenants] = useState([])
  const [tenant, setTenant] = useState('')
  const [locations, setLocations] = useState([])
  const [location, setLocation] = useState('')
  const [roles, setRoles] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
  const [passwordReset, setPasswordReset] = useState(false)
  const [invalidate, setInvalidate] = useState(false)
  const [beginDate, setBeginDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    fetchRoleOptions().then(setRoles)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchTenants(tenantQuery).then(setTenants)
    }, 250)
    return () => clearTimeout(timer)
  }, [tenantQuery])

  useEffect(() => {
    fetchLocationsByTenant(tenant).then((items) => {
      setLocations(items)
      setLocation('')
    })
  }, [tenant])

  const toggleRole = (role) => {
    setSelectedRoles((current) =>
      current.includes(role) ? current.filter((item) => item !== role) : [...current, role]
    )
  }

  return (
    <article className="card tenant-maintenance-card">
      <div className="section-head">
        <h3>User Maintenance</h3>
        <a href="#">Access Policy</a>
      </div>

      <div className="tenant-grid user-grid">
        <label>
          Username
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
        </label>

        <label>
          Password Again
          <input type="password" value={passwordAgain} onChange={(event) => setPasswordAgain(event.target.value)} placeholder="Re-enter password" />
        </label>

        <label>
          Tenant Lookup
          <input type="search" value={tenantQuery} onChange={(event) => setTenantQuery(event.target.value)} placeholder="Search tenant" />
        </label>

        <label>
          Tenant
          <select value={tenant} onChange={(event) => setTenant(event.target.value)}>
            <option value="">Select tenant</option>
            {tenants.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>

        <label>
          Location
          <select value={location} onChange={(event) => setLocation(event.target.value)}>
            <option value="">Select location</option>
            {locations.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
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

      <section className="role-panel">
        <h4>Roles</h4>
        <div className="role-checkboxes">
          {roles.map((role) => (
            <label key={role} className="checkbox-line">
              <input type="checkbox" checked={selectedRoles.includes(role)} onChange={() => toggleRole(role)} />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="flag-panel">
        <label className="checkbox-line">
          <input type="checkbox" checked={passwordReset} onChange={(event) => setPasswordReset(event.target.checked)} />
          <span>Password Reset Required</span>
        </label>
        <label className="checkbox-line">
          <input type="checkbox" checked={invalidate} onChange={(event) => setInvalidate(event.target.checked)} />
          <span>Invalidate Active Sessions</span>
        </label>
      </section>

      <div className="tenant-actions">
        <button type="button">Save User</button>
        <button type="button" className="secondary">Disable User</button>
      </div>
    </article>
  )
}

export default UserMaintenancePage
