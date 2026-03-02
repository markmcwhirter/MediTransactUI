import { useEffect, useRef, useState } from 'react'
import AddPatientPage from './Patient/AddPatientPage'
import LoginPage from './LoginPage'
import { useAuth } from './auth/AuthContext'
import AppointmentMaintenancePage from './Appointment/AppointmentMaintenancePage'
import BillingMaintenancePage from './Billing/BillingMaintenancePage'
import TenantMaintenancePage from './Administration/TenantMaintenancePage'
import TenantLocationMaintenancePage from './Administration/TenantLocationMaintenancePage'
import InsuranceMaintenancePage from './Administration/InsuranceMaintenancePage'
import ProviderMaintenancePage from './Administration/ProviderMaintenancePage'
import UserMaintenancePage from './Administration/UserMaintenancePage'
import Icd10MaintenancePage from './Administration/Icd10MaintenancePage'
import CptMaintenancePage from './Administration/CptMaintenancePage'

const appointments = [
  { time: '08:30 AM', patient: 'Mia Richardson', reason: 'Annual Physical', provider: 'Dr. Patel', status: 'Checked In' },
  { time: '09:15 AM', patient: 'Ethan Garcia', reason: 'Diabetes Follow-up', provider: 'Dr. Lewis', status: 'In Room' },
  { time: '10:00 AM', patient: 'Ava Nguyen', reason: 'Pediatric Wellness', provider: 'Dr. Chen', status: 'Waiting' },
  { time: '10:45 AM', patient: 'Noah Thompson', reason: 'Lab Review', provider: 'Dr. Patel', status: 'Scheduled' }
]

const alerts = [
  { title: 'Prior authorization pending', detail: '2 imaging requests require payer response.' },
  { title: 'Vaccine inventory low', detail: 'Influenza doses are below the reorder threshold.' },
  { title: 'Claims at risk', detail: '4 claims have missing diagnosis modifiers.' }
]

const revenue = [
  { label: 'Today\'s Charges', value: '$14,260', trend: '+8.4%' },
  { label: 'Copays Collected', value: '$1,940', trend: '+3.1%' },
  { label: 'Outstanding A/R', value: '$47,120', trend: '-4.6%' }
]

const mainMenu = ['Dashboard', 'Appointments', 'Billing', 'Clinical Notes', 'Reports', 'Intake']

function StatusPill({ status }) {
  const map = {
    'Checked In': 'pill success',
    'In Room': 'pill info',
    Waiting: 'pill warning',
    Scheduled: 'pill neutral'
  }

  return <span className={map[status] ?? 'pill neutral'}>{status}</span>
}

function App() {
  const { claims, isAuthenticated, logout } = useAuth()
  const [hotkeyMessage, setHotkeyMessage] = useState('Ready')
  const [activePage, setActivePage] = useState('dashboard')
  const addAppointmentButtonRef = useRef(null)

  useEffect(() => {
    const handleHotkeys = (event) => {
      if (!event.altKey || event.ctrlKey || event.metaKey) return
      const key = event.key.toLowerCase()

      if (key === 'i') {
        event.preventDefault()
        window.location.hash = '#intake'
        setHotkeyMessage('Hotkey: Intake opened (Alt+I)')
      }

      if (key === 'a') {
        event.preventDefault()
        addAppointmentButtonRef.current?.click()
        setHotkeyMessage('Hotkey: New appointment started (Alt+A)')
      }
    }

    window.addEventListener('keydown', handleHotkeys)
    return () => window.removeEventListener('keydown', handleHotkeys)
  }, [])

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-top">
          <div>
            <p className="muted">Good morning, {claims.name}</p>
            <h1>MediTransact · Medical Office Portal</h1>
            <p className="hotkey-hint">Hotkeys: Alt+I (Intake), Alt+A (New Appointment) · {hotkeyMessage}</p>
          </div>
          <div className="header-actions">
            <span className="clinic-chip">Downtown Family Medicine · Open until 6:00 PM</span>
            <button ref={addAppointmentButtonRef} type="button" onClick={() => setHotkeyMessage('New appointment workflow opened')}>
              + Add Appointment
            </button>
          </div>
        </div>

        <div className="header-bottom">
          <nav className="header-menu" aria-label="Primary">
            <div className="menu-links">
              <a
                href="#"
                className={activePage === 'dashboard' ? 'active' : ''}
                onClick={(event) => {
                  event.preventDefault()
                  setActivePage('dashboard')
                }}
              >
                Dashboard
              </a>

              <div className="menu-dropdown" role="menuitem" aria-haspopup="true">
                <button type="button" className={activePage.startsWith('patient') ? 'active' : ''} onClick={() => setActivePage('patient-add')}>
                  Patients ▾
                </button>
                <div className="dropdown-menu">
                  <button type="button" onClick={() => setActivePage('patient-add')}>Add Patient</button>
                  <button type="button" onClick={() => setActivePage('patient-modify')}>Modify Patient</button>
                  <button type="button" onClick={() => setActivePage('patient-delete')}>Delete Patient</button>
                </div>
              </div>

              <div className="menu-dropdown" role="menuitem" aria-haspopup="true">
                <button type="button" className={activePage.startsWith('admin-') ? 'active' : ''} onClick={() => setActivePage('admin-tenants')}>
                  Administration ▾
                </button>
                <div className="dropdown-menu">
                  <button type="button" onClick={() => setActivePage('admin-tenants')}>Maintain Tenants</button>
                  <button type="button" onClick={() => setActivePage('admin-tenant-locations')}>Maintain Tenant Locations</button>
                  <button type="button" onClick={() => setActivePage('admin-insurance')}>Insurance Maintenance</button>
                  <button type="button" onClick={() => setActivePage('admin-providers')}>Provider Maintenance</button>
                  <button type="button" onClick={() => setActivePage('admin-users')}>User Maintenance</button>
                  <button type="button" onClick={() => setActivePage('admin-icd10')}>ICD-10 Maintenance</button>
                  <button type="button" onClick={() => setActivePage('admin-cpt')}>CPT Maintenance</button>
                </div>
              </div>

              {mainMenu.map((item) => (
                <a
                  key={item}
                  href={item === 'Intake' ? '#intake' : '#'}
                  onClick={(event) => {
                    if (item === 'Appointments') {
                      event.preventDefault()
                      setActivePage('appointments-maintenance')
                    }
                    if (item === 'Billing') {
                      event.preventDefault()
                      setActivePage('billing-maintenance')
                    }
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
            <button className="login-button" type="button" onClick={logout}>Logout</button>
          </nav>
        </div>
      </header>

      <main className="main-area">
        <section className="left-panel">
          {activePage === 'patient-add' ? (
            <AddPatientPage mode="add" />
          ) : activePage === 'patient-modify' ? (
            <AddPatientPage mode="modify" />
          ) : activePage === 'patient-delete' ? (
            <AddPatientPage mode="delete" />
          ) : activePage === 'appointments-maintenance' ? (
            <AppointmentMaintenancePage />
          ) : activePage === 'billing-maintenance' ? (
            <BillingMaintenancePage />
          ) : activePage === 'admin-tenants' ? (
            <TenantMaintenancePage />
          ) : activePage === 'admin-tenant-locations' ? (
            <TenantLocationMaintenancePage />
          ) : activePage === 'admin-insurance' ? (
            <InsuranceMaintenancePage />
          ) : activePage === 'admin-providers' ? (
            <ProviderMaintenancePage />
          ) : activePage === 'admin-users' ? (
            <UserMaintenancePage />
          ) : activePage === 'admin-icd10' ? (
            <Icd10MaintenancePage />
          ) : activePage === 'admin-cpt' ? (
            <CptMaintenancePage />
          ) : (
            <>
              <div className="grid stats">
                {revenue.map((item) => (
                  <article className="card" key={item.label}>
                    <p className="muted">{item.label}</p>
                    <h3>{item.value}</h3>
                    <p className="trend">{item.trend} vs last week</p>
                  </article>
                ))}
              </div>

              <article className="card large" id="appointments">
                <div className="section-head">
                  <h3>Today&apos;s Appointments</h3>
                  <a href="#">View full schedule</a>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Reason</th>
                      <th>Provider</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((visit) => (
                      <tr key={`${visit.time}-${visit.patient}`}>
                        <td>{visit.time}</td>
                        <td>{visit.patient}</td>
                        <td>{visit.reason}</td>
                        <td>{visit.provider}</td>
                        <td><StatusPill status={visit.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </>
          )}
        </section>

        <aside className="right-panel">
          <article className="card" id="intake">
            <div className="section-head">
              <h3>Action Alerts</h3>
              <a href="#">Resolve</a>
            </div>
            <ul>
              {alerts.map((alert) => (
                <li key={alert.title}>
                  <strong>{alert.title}</strong>
                  <p>{alert.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h3>Quick Tasks</h3>
            <div className="task-grid">
              <button type="button">Send Lab Orders</button>
              <button type="button">Collect Copay</button>
              <button type="button">Finalize Claims</button>
              <button type="button">Message Patient</button>
            </div>
          </article>
        </aside>
      </main>

      <footer className="app-footer">
        <p>© 2026 MediTransactUI · HIPAA-aware workflow sandbox · Last sync: 9:42 AM</p>
      </footer>
    </div>
  )
}

export default App
