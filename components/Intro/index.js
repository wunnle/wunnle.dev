import styles from './Intro.module.css'

const Intro = () => (
  <div className={styles.intro}>
    <div className={styles.shortOne}>
      <p className={styles.greeting}>Hi, I’m Sinan,</p>
      <p className={styles.myTitle}>
        a web developer <br />
        and UI/UX designer
      </p>
      <a target="_blank" rel="noopener noreferrer" href="mailto:me@wunnle.com">
        <button className={styles.helloButton}>Say hello</button>
      </a>
    </div>
    <div className={styles.longOne}>
      <p>
        I’m an Istanbul based Sr. front-end developer and designer, working with companies
        worldwide for over 10 years. I’m experienced in <strong>HTML5</strong>,{' '}
        <strong>JS</strong> and <strong>CSS3</strong> and modern libraries{' '}
        <strong>React</strong>, <strong>Gatsby </strong>
        and <strong>Next.js</strong>.
      </p>

      <p>
        Currently working as design lead &amp; front-end dev on SwayPay, a startup from
        San Francisco.
      </p>
    </div>
  </div>
)

export default Intro
