import useScroll from '../../components/hooks/useScroll'
import styles from './test.module.css'

const Test = () => {
  useScroll()

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleShadow}>Title Shadow</div>
      test div
    </div>
  )
}

export default Test
