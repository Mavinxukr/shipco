import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './InformationBlock.scss';

const InformationBlock = ({ children, customInformationBlock }) => (
  <div className={cx(styles.informationBlock, customInformationBlock)}>
    {children}
  </div>
);

InformationBlock.propsType = {
  title: PropTypes.string,
  subTitle: PropTypes.number,
  response: PropTypes.node,
  customInformationBlock: PropTypes.string,
};

export default InformationBlock;
