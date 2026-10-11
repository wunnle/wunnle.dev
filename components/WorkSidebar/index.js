import styles from './Sidebar.module.css'

const Sidebar = ({ client, role }) => (
  <div className={styles.sidebar}>
    {client && (
      <Section>
        <p className={styles.title}>Client</p>
        <p className={styles.item}>{client}</p>
      </Section>
    )}
    {role && (
      <Section>
        <p className={styles.title}>Role</p>
        <p className={styles.item}>{role}</p>
      </Section>
    )}
  </div>
)

const Section = ({ children }) => <div className={styles.section}>{children}</div>

export default Sidebar
