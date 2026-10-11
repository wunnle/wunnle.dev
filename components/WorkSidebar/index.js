import Icon from '../Icon'
import styles from './Sidebar.module.css'

const Sidebar = ({ client, role, tech }) => (
  <div className={styles.sidebar}>
    {client && (
      <Section>
        <p className={styles.title}>Client</p>
        <p className={styles.item}>{client}</p>
      </Section>
    )}
    {(role || tech) && (
      <Section>
        {role && <p className={styles.item}>{role}</p>}
        {tech && (
          <div className={styles.techs}>
            {tech.split(', ').map((t) => (
              <span key={t} className={styles.techIcon} data-label={t}>
                <Icon white>{t}</Icon>
              </span>
            ))}
          </div>
        )}
      </Section>
    )}
  </div>
)

const Section = ({ children }) => <div className={styles.section}>{children}</div>

export default Sidebar
