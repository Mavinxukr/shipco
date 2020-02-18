import React from 'react';
import PropTypes from 'prop-types';
import styles from './InformationBlock.scss';

const InformationBlock = ({ children, item }) => (
  <div className={styles.informationBlock}>
    <div className={styles.header}>
      <p>
        {item.title} {item.subTitle}
      </p>
    </div>
    <div className={styles.body}>{children}</div>
  </div>
);

InformationBlock.propsType = {
  title: PropTypes.string,
  subTitle: PropTypes.number,
  response: PropTypes.node,
};

export default InformationBlock;
