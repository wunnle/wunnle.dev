import styles from './Sidebar.module.css';

const Sidebar = ({ year, client, services, tech, website }) => (
  <div className={styles.sidebar}>
    {
      client
      &&
      <div className={styles.section}>
        <p className={styles.title}>Client</p>
        <p className={styles.item}>{client}</p>
      </div>
    }
    {
      services
      &&
      <div className={styles.section}>
        <p className={styles.title}>Services</p>
        <ul>
          {
            services.split(', ').map(s => <li className={styles.item} key={s}>{s}</li>)
          }
        </ul>
      </div>
    }
    <div className={styles.section}>
      <p className={styles.item}><a href={website} target='_blank'>Visit website</a></p>
    </div>
  </div>
)


export default Sidebar