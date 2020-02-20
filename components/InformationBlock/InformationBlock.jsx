import React from 'react';
import PropTypes from 'prop-types';
import styles from './InformationBlock.scss';

const InformationBlock = ({ children }) => (
  <div className={styles.informationBlock}>
    {children}
  </div>
);

InformationBlock.propsType = {
  title: PropTypes.string,
  subTitle: PropTypes.number,
  response: PropTypes.node,
};

export default InformationBlock;
