import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomTable.scss';

const CustomTable = ({ title, children }) => (
  <>
    <h4 className={styles.title}>{title}</h4>
    <div className={styles.wrapperTable}>
      <div className={styles.scroll}>{children}</div>
    </div>
  </>
);

export default CustomTable;

CustomTable.propsType = {
  title: PropTypes.string,
  children: PropTypes.node,
};
