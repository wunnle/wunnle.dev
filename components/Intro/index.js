import styles from './Intro.module.css'

const Intro = () => (
  <>
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
          I’m an Istanbul based Sr. front-end developer and designer, working with
          companies worldwide for over 10 years. I’m experienced in <strong>HTML5</strong>
          , <strong>JS</strong> and <strong>CSS3</strong> and modern libraries{' '}
          <strong>React</strong>, <strong>Gatsby </strong>
          and <strong>Next.js</strong>.
        </p>
        <p>
          I’m also the organizer of{' '}
          <a
            href="https://kommunity.com/reactjs-istanbul"
            target="_blank"
            rel="noreferrer"
          >
            ReactJS Istanbul
          </a>
          , a community for React developers in Istanbul.
        </p>
        <p>
          Currently working for full-time as design lead &amp; front-end dev on SwayPay, a
          startup from San Francisco.
        </p>
      </div>
    </div>
    <div className={styles.br}></div>
  </>
)

export default Intro
