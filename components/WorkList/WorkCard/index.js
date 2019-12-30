import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../Icon';
import styles from './WorkCard.module.css';

const bgColors = ['#4A2BAF', '#0F61C0', '#9E2B79', '#4146B5'];

const WorkCard = props => {
  const {
    index,
    document: {
      data: { title, year, services, tech }
    }
  } = props;

  return (
    <div className={styles.card} style={{ background: bgColors[index % 4] }}>
      <div className={styles.info}>
        <p className={styles.date}>{year}</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.services}>
          {services.split(', ').map((s, i) => (
            <li key={i} index={i}>
              {s}
            </li>
          ))}
        </div>
        <div className={styles.tech}>
          {tech.split(', ').map(t => (
            <div key={t} className={styles.techIcon}>
              <Icon white>{t}</Icon>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

WorkCard.propTypes = {
  index: PropTypes.number,
  document: PropTypes.shape({
    data: {
      title: PropTypes.string,
      year: PropTypes.string,
      services: PropTypes.string,
      tech: PropTypes.string
    }
  })
};

export default WorkCard;
