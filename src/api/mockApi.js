const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

const patients = [
  { id: 'p-100', name: 'Mia Richardson', dob: '1988-04-12' },
  { id: 'p-101', name: 'Ethan Garcia', dob: '1979-10-22' },
  { id: 'p-102', name: 'Ava Nguyen', dob: '2015-06-18' },
  { id: 'p-103', name: 'Noah Thompson', dob: '1967-02-03' },
  { id: 'p-104', name: 'Sophia Diaz', dob: '1992-09-30' }
]

const providers = [
  { id: 'dr-patel', label: 'Dr. Priya Patel' },
  { id: 'dr-lewis', label: 'Dr. Andrew Lewis' },
  { id: 'dr-chen', label: 'Dr. Mei Chen' }
]

const rooms = [
  { id: 'room-1', label: 'Exam Room 1' },
  { id: 'room-2', label: 'Exam Room 2' },
  { id: 'room-3', label: 'Procedure Room A' }
]

const slots = ['08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','01:00 PM','01:30 PM','02:00 PM']

const events = [
  { id: 'e1', title: 'Mia Richardson · Annual Physical', start: '2026-03-01T09:00:00', end: '2026-03-01T09:30:00' },
  { id: 'e2', title: 'Ethan Garcia · Diabetes Follow-up', start: '2026-03-02T10:00:00', end: '2026-03-02T10:30:00' },
  { id: 'e3', title: 'Ava Nguyen · Pediatric Wellness', start: '2026-03-03T13:00:00', end: '2026-03-03T13:30:00' },
  { id: 'e4', title: 'Noah Thompson · Lab Review', start: '2026-03-05T14:00:00', end: '2026-03-05T14:30:00' }
]

export async function searchPatients(query) {
  await wait()
  if (!query) return []
  return patients.filter((patient) => patient.name.toLowerCase().includes(query.toLowerCase()))
}
export async function fetchProviders() { await wait(); return providers }
export async function fetchRooms() { await wait(); return rooms }
export async function fetchTimeAvailability() { await wait(); return slots }
export async function fetchCalendarAvailability() { await wait(); return events }


const tenants = [
  { id: 't-01', name: 'Downtown Family Medicine', code: 'DFM', region: 'East' },
  { id: 't-02', name: 'Northside Pediatrics', code: 'NPD', region: 'North' },
  { id: 't-03', name: 'Lakeside Internal Care', code: 'LIC', region: 'West' }
]

const tenantStatuses = ['Active', 'Onboarding', 'Suspended', 'Archived']

export async function searchTenants(query) {
  await wait()
  if (!query) return []
  return tenants.filter((tenant) => tenant.name.toLowerCase().includes(query.toLowerCase()) || tenant.code.toLowerCase().includes(query.toLowerCase()))
}

export async function fetchTenantStatuses() {
  await wait()
  return tenantStatuses
}


const tenantLocations = [
  { id: 'loc-01', name: 'DFM Main Clinic', tenantCode: 'DFM', address: '101 Main St' },
  { id: 'loc-02', name: 'DFM West Annex', tenantCode: 'DFM', address: '25 West End Ave' },
  { id: 'loc-03', name: 'NPD Campus North', tenantCode: 'NPD', address: '890 Northlake Dr' }
]

const locationTypes = ['Primary Clinic', 'Satellite Office', 'Lab Site', 'Telehealth Hub']

export async function searchTenantLocations(query) {
  await wait()
  if (!query) return []
  return tenantLocations.filter((location) =>
    location.name.toLowerCase().includes(query.toLowerCase()) ||
    location.tenantCode.toLowerCase().includes(query.toLowerCase())
  )
}

export async function fetchLocationTypes() {
  await wait()
  return locationTypes
}


const insuranceCompanies = [
  { id: 'ins-aetna', name: 'Aetna' },
  { id: 'ins-anthem', name: 'Anthem Blue Cross' },
  { id: 'ins-cigna', name: 'Cigna' },
  { id: 'ins-uhc', name: 'UnitedHealthcare' }
]

const insurancePlans = {
  'ins-aetna': [
    { id: 'aetna-hmo', name: 'Aetna HMO Basic' },
    { id: 'aetna-ppo', name: 'Aetna PPO Plus' }
  ],
  'ins-anthem': [
    { id: 'anthem-premier', name: 'Anthem Premier PPO' },
    { id: 'anthem-choice', name: 'Anthem Choice HMO' }
  ],
  'ins-cigna': [
    { id: 'cigna-open', name: 'Cigna Open Access' }
  ],
  'ins-uhc': [
    { id: 'uhc-core', name: 'UHC Core Select' },
    { id: 'uhc-signature', name: 'UHC Signature PPO' }
  ]
}

export async function searchInsuranceCompanies(query) {
  await wait()
  if (!query) return insuranceCompanies
  return insuranceCompanies.filter((company) => company.name.toLowerCase().includes(query.toLowerCase()))
}

export async function fetchInsurancePlans(companyId) {
  await wait()
  if (!companyId) return []
  return insurancePlans[companyId] ?? []
}


const providerDirectory = [
  { id: 'pr-001', name: 'Dr. Priya Patel', specialty: 'Family Medicine', phone: '(555) 210-1100', license: 'CA-A123456' },
  { id: 'pr-002', name: 'Dr. Andrew Lewis', specialty: 'Endocrinology', phone: '(555) 210-1101', license: 'CA-B981223' },
  { id: 'pr-003', name: 'Dr. Mei Chen', specialty: 'Pediatrics', phone: '(555) 210-1102', license: 'CA-C553001' }
]

export async function searchProvidersForMaintenance(query) {
  await wait()
  if (!query) return providerDirectory
  return providerDirectory.filter((provider) => provider.name.toLowerCase().includes(query.toLowerCase()))
}


const userRoleOptions = ['Provider', 'Scheduler', 'Billing', 'Administrator', 'Read Only']

export async function fetchRoleOptions() {
  await wait()
  return userRoleOptions
}

export async function fetchLocationsByTenant(tenantId) {
  await wait()
  if (!tenantId) return []
  return tenantLocations.filter((location) => {
    if (tenantId == 't-01') return location.tenantCode === 'DFM'
    if (tenantId == 't-02') return location.tenantCode === 'NPD'
    if (tenantId == 't-03') return location.tenantCode === 'LIC'
    return false
  })
}


const icd10Codes = [
  {
    id: 'icd-1',
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications',
    softDelete: false,
    beginDate: '2025-01-01',
    endDate: '2026-12-31'
  },
  {
    id: 'icd-2',
    code: 'I10',
    description: 'Essential (primary) hypertension',
    softDelete: false,
    beginDate: '2024-01-01',
    endDate: '2027-12-31'
  },
  {
    id: 'icd-3',
    code: 'J06.9',
    description: 'Acute upper respiratory infection, unspecified',
    softDelete: true,
    beginDate: '2023-01-01',
    endDate: '2025-12-31'
  }
]

export async function searchIcd10Codes(query) {
  await wait()
  if (!query) return icd10Codes
  const q = query.toLowerCase()
  return icd10Codes.filter((item) => item.code.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
}


const cptCodes = [
  {
    id: 'cpt-1',
    code: '99213',
    description: 'Office/outpatient established patient visit, low complexity',
    softDelete: false,
    beginDate: '2025-01-01',
    endDate: '2026-12-31'
  },
  {
    id: 'cpt-2',
    code: '93000',
    description: 'Electrocardiogram, routine ECG with interpretation and report',
    softDelete: false,
    beginDate: '2024-01-01',
    endDate: '2027-12-31'
  },
  {
    id: 'cpt-3',
    code: '90471',
    description: 'Immunization administration (1 vaccine)',
    softDelete: true,
    beginDate: '2023-01-01',
    endDate: '2025-12-31'
  }
]

export async function searchCptCodes(query) {
  await wait()
  if (!query) return cptCodes
  const q = query.toLowerCase()
  return cptCodes.filter((item) => item.code.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
}


const patientCases = {
  'p-100': [
    { id: 'case-1001', caseNumber: 'CASE-1001', reason: 'Annual Physical' },
    { id: 'case-1002', caseNumber: 'CASE-1002', reason: 'Preventive Follow-up' }
  ],
  'p-101': [{ id: 'case-1011', caseNumber: 'CASE-1011', reason: 'Diabetes Follow-up' }],
  'p-102': [{ id: 'case-1021', caseNumber: 'CASE-1021', reason: 'Pediatric Wellness' }],
  'p-103': [{ id: 'case-1031', caseNumber: 'CASE-1031', reason: 'Lab Review' }],
  'p-104': [{ id: 'case-1041', caseNumber: 'CASE-1041', reason: 'New Patient Consult' }]
}

const billingStatuses = ['Draft', 'Ready to Submit', 'Submitted', 'Paid', 'Denied']

export async function fetchCasesByPatient(patientId) {
  await wait()
  if (!patientId) return []
  return patientCases[patientId] ?? []
}

export async function fetchBillingStatuses() {
  await wait()
  return billingStatuses
}
