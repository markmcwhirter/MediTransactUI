function AddPatientPage({ mode = 'add' }) {
  const config = {
    add: {
      title: 'Add New Patient',
      guide: 'Patient Intake Guide',
      primaryLabel: 'Save Patient',
      secondaryLabel: 'Save & Add Another',
      secondaryClassName: 'secondary'
    },
    modify: {
      title: 'Modify Patient',
      guide: 'Search Records',
      primaryLabel: 'Update Patient',
      secondaryLabel: 'Reset Changes',
      secondaryClassName: 'secondary'
    },
    delete: {
      title: 'Delete Patient',
      guide: 'Archive Policy',
      primaryLabel: 'Delete Patient',
      secondaryLabel: 'Cancel',
      secondaryClassName: 'danger-secondary'
    }
  }[mode]

  return (
    <article className="card patient-form-card" id={`${mode}-patient`}>
      <div className="section-head">
        <h3>{config.title}</h3>
        <a href="#">{config.guide}</a>
      </div>
      {mode === 'delete' && (
        <p className="muted card-muted">Deleting a patient will remove active scheduling access and mark records for compliance retention.</p>
      )}
      <form className="patient-form">
        <label>
          First Name
          <input type="text" name="firstName" placeholder="Enter first name" />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" placeholder="Enter last name" />
        </label>
        <label>
          Date of Birth
          <input type="date" name="dob" />
        </label>
        <label>
          Phone Number
          <input type="tel" name="phone" placeholder="(555) 123-4567" />
        </label>
        <label>
          Insurance Provider
          <div className="insurance-row">
            <select name="insurance" defaultValue="">
              <option value="" disabled>Select insurance provider</option>
              <option value="aetna">Aetna</option>
              <option value="anthem">Anthem Blue Cross</option>
              <option value="cigna">Cigna</option>
              <option value="medicare">Medicare</option>
              <option value="uhc">UnitedHealthcare</option>
            </select>
            <button type="button" className="secondary add-insurance">+ Add Insurance</button>
          </div>
        </label>
        <label>
          Primary Physician
          <input type="text" name="physician" placeholder="Assigned physician" />
        </label>
        <div className="patient-actions">
          <button type="button" className={mode === 'delete' ? 'danger' : ''}>{config.primaryLabel}</button>
          <button type="button" className={config.secondaryClassName}>{config.secondaryLabel}</button>
        </div>
      </form>
    </article>
  )
}

export default AddPatientPage
