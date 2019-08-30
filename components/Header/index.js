import logo from './logo.svg'
import styles from './style.css'
import Link from 'next/link';

const Header = () => (
  <header className={styles.header}>
    <Link href='/'>
      <a>
        <img src={logo} width='150' alt="" />
      </a>
    </Link>
  </header>
)


export default Header