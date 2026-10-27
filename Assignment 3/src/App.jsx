import './App.css'
import { useState } from 'react'

function ContactForm({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  error,
  handleSubmit,
}) {
  return (
    <>
      <section>
        <h2>Add a Contact</h2>
      </section>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tel">Phone Number</label>
          <input
            id="tel"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Add Contact</button>
        </div>
      </form>
    </>
  )
}

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search by name or email"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  )
}

function ContactItem({ contact, handleDelete }) {
  return (
    <div className="contact-card">
      <p><strong>{contact.name}</strong></p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone || 'Not provided'}</p>
      <button onClick={() => handleDelete(contact.id)}>
        Delete
      </button>
    </div>
  )
}

function ContactList({
  contacts,
  filteredContacts,
  handleDelete,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <section>
      <h2>My Contacts</h2>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {contacts.length === 0 ? (
        <p>No Contacts yet. Add One!</p>
      ) : filteredContacts.length === 0 ? (
        <p>No matches found for "{searchTerm}".</p>
      ) : (
        <div className="contacts-grid">
          {filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function App() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [contacts, setContacts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(event) {
      event.preventDefault()

      setError('')

      const duplicateEmail = contacts.some(
        (contact) => contact.email.toLowerCase() === email.trim().toLowerCase()
      )

     const duplicatePhone = phone.trim() !== '' && contacts.some(
  (contact) => contact.phone.trim() === phone.trim()
      )


      if (duplicateEmail || duplicatePhone) {
        setError(
          duplicateEmail && duplicatePhone
          ? 'Email and phone number is already in contact book'
          : duplicateEmail
            ? 'Email is already in contact book'
            : 'Phone number is already in contact book'
        )
        return
      }

      const newContact = {
        id: Date.now(),
        name,
        email,
        phone,
      }

      setContacts((previousContacts) => [...previousContacts, newContact])
      setName('')
      setEmail('')
      setPhone('')
    }

    function handleDelete(id) {
      setContacts((previousContacts) =>
      previousContacts.filter((contact) => contact.id !== id)
    )
    }

    const filteredContacts = contacts.filter((contact) => {
      const search = searchTerm.toLowerCase()
      return (
        contact.name.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search)
      )
    })
  return (
    <>
      <h1>My Contact Book</h1>
      <main>
      <ContactForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        error={error}
        handleSubmit={handleSubmit}
      />

 <ContactList
  contacts={contacts}
  filteredContacts={filteredContacts}
  handleDelete={handleDelete}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
      </main>
    </>
  )
}

export default App
