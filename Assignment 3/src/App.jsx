import './App.css'
import { useState } from 'react'
function App() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [contacts, setContacts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    function handleSubmit(event) {
      event.preventDefault()

      const newContact = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
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
        <section>
          <h2>Add a Contact</h2>
        </section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
            id ="name"
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
            <button type="submit">Add Contact</button>
          </div>
        </form>
        <section>
      <h2>My Contacts</h2>
  <input
  type="text"
  placeholder="Search by name or email"
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
/>
  {contacts.length === 0 ? (
  <p>No Contacts yet. Add One!</p>
) : filteredContacts.length === 0 ? (
    <p>No contacts match your search</p>
) : (
  filteredContacts.map((contact) => (
    <div key={contact.id}>
      <p>{contact.name}</p>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <button onClick={() => handleDelete(contact.id)}>
          Delete
      </button>
    </div>
  ))
)}
    </section>
      </main>
    </>
  )
}

export default App
