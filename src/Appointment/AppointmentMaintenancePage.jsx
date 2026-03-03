import { useEffect, useMemo, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import { fetchCalendarAvailability, fetchProviders, fetchRooms, fetchTimeAvailability, searchPatients } from '../api/mockApi'

function AppointmentMaintenancePage() {
  const [patientQuery, setPatientQuery] = useState('')
  const [patientMatches, setPatientMatches] = useState([])
  const [selectedPatient, setSelectedPatient] = useState('')
  const [providers, setProviders] = useState([])
  const [rooms, setRooms] = useState([])
  const [slots, setSlots] = useState([])
  const [events, setEvents] = useState([])
  const [provider, setProvider] = useState('')
  const [room, setRoom] = useState('')
  const [slot, setSlot] = useState('')
  const [calendarView, setCalendarView] = useState('timeGridDay')

  useEffect(() => {
    fetchProviders().then(setProviders)
    fetchRooms().then(setRooms)
    fetchTimeAvailability().then(setSlots)
    fetchCalendarAvailability().then(setEvents)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchPatients(patientQuery).then(setPatientMatches)
    }, 250)
    return () => clearTimeout(timer)
  }, [patientQuery])

  const selectedPatientDisplay = useMemo(
    () => patientMatches.find((patient) => patient.id === selectedPatient)?.name ?? '',
    [patientMatches, selectedPatient]
  )

  return (
    <article className="card appointment-maintenance-card">
      <div className="section-head">
        <h3>Appointment Maintenance</h3>
        <a href="#">Scheduling Rules</a>
      </div>

      <div className="appointment-form-grid">
        <label>
          Patient Lookup
          <input type="search" value={patientQuery} onChange={(event) => setPatientQuery(event.target.value)} placeholder="Search patient by name" />
        </label>
        <label>
          Patient Results
          <select value={selectedPatient} onChange={(event) => setSelectedPatient(event.target.value)}>
            <option value="">Select patient</option>
            {patientMatches.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.name} · DOB {patient.dob}</option>
            ))}
          </select>
        </label>
        <label>
          Provider
          <select value={provider} onChange={(event) => setProvider(event.target.value)}>
            <option value="">Select provider</option>
            {providers.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label>
          Room Assignment
          <select value={room} onChange={(event) => setRoom(event.target.value)}>
            <option value="">Select room</option>
            {rooms.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label>
          Time Availability (Dropdown)
          <select value={slot} onChange={(event) => setSlot(event.target.value)}>
            <option value="">Select time slot</option>
            {slots.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <p className="card-muted selection-summary">Selected: {selectedPatientDisplay || 'No patient'} · {provider || 'No provider'} · {room || 'No room'} · {slot || 'No slot'}</p>
      </div>

      <div className="calendar-view-controls">
        <span>Calendar Availability Views:</span>
        <button type="button" onClick={() => setCalendarView('timeGridDay')}>Current Date</button>
        <button type="button" onClick={() => setCalendarView('timeGridWeek')}>Week</button>
        <button type="button" onClick={() => setCalendarView('dayGridMonth')}>Month</button>
        <button type="button" onClick={() => setCalendarView('multiMonthYear')}>Year</button>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin]}
          initialView={calendarView}
          key={calendarView}
          events={events}
          headerToolbar={false}
          height={560}
          nowIndicator
        />
      </div>
    </article>
  )
}

export default AppointmentMaintenancePage
