import { useEffect, useMemo, useState } from 'react'
import { searchCptCodes } from '../api/mockApi'

function CptMaintenancePage() {
  const [query, setQuery] = useState('')
  const [codes, setCodes] = useState([])
  const [selectedCodeId, setSelectedCodeId] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [softDelete, setSoftDelete] = useState(false)
  const [beginDate, setBeginDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      searchCptCodes(query).then(setCodes)
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  const selectedCode = useMemo(() => codes.find((item) => item.id === selectedCodeId), [codes, selectedCodeId])

  useEffect(() => {
    if (!selectedCode) return
    setCode(selectedCode.code)
    setDescription(selectedCode.description)
    setSoftDelete(Boolean(selectedCode.softDelete))
    setBeginDate(selectedCode.beginDate)
    setEndDate(selectedCode.endDate)
  }, [selectedCode])

  return (
    <article className="card tenant-maintenance-card">
      <div className="section-head">
        <h3>CPT Maintenance</h3>
        <a href="#">Coding Policy</a>
      </div>

      <div className="tenant-grid user-grid">
        <label>
          CPT Lookup
          <input
            type="search"
            placeholder="Search code or description"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label>
          Select CPT
          <select value={selectedCodeId} onChange={(event) => setSelectedCodeId(event.target.value)}>
            <option value="">Select code</option>
            {codes.map((item) => (
              <option key={item.id} value={item.id}>{item.code} · {item.description}</option>
            ))}
          </select>
        </label>

        <label>
          Code
          <input type="text" value={code} onChange={(event) => setCode(event.target.value)} placeholder="e.g. 99213" />
        </label>

        <label>
          Description
          <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="CPT description" />
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

      <section className="flag-panel">
        <label className="checkbox-line">
          <input type="checkbox" checked={softDelete} onChange={(event) => setSoftDelete(event.target.checked)} />
          <span>Soft Delete</span>
        </label>
      </section>

      <div className="tenant-actions">
        <button type="button">Save CPT Code</button>
        <button type="button" className="secondary">Archive Code</button>
      </div>
    </article>
  )
}

export default CptMaintenancePage
