import styles from './Sidebar.module.css';
import Icon from '../Icon';

const Sidebar = ({ year, client, services, tech, website }) => (
  <div className={styles.sidebar}>
    {
      client
      &&
      <Section>
        <p className={styles.title}>Client</p>
        <p className={styles.item}>{client}</p>
      </Section>
    }
    {
      services
      &&
      <Section>
        <p className={styles.title}>Services</p>
        <ul>
          {
            services.split(', ').map(s => <li className={styles.item} key={s}>{s}</li>)
          }
        </ul>
      </Section>
    }
    {
      tech
      &&
      <Section className={styles.techs}>
        {
          tech.split(', ').map(t => <Icon>{t}</Icon>)
        }
      </Section>
    }
    {
      website
      &&
      <Section>
        <p className={styles.item}><a href={website} target='_blank'>Visit website</a></p>
      </Section>
    }

  </div>
)

const Section = ({ children, className }) => (
  <div className={[styles.section, className].join(' ')}>
    {children}
  </div>
)


export default Sidebar