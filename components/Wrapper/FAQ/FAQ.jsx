import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '../../Button/Button';
import MainLayout from '../../Layout/Global/Global';
import { data } from './data';
import styles from './FAQ.scss';

const AccordionItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      classes={{
        root: styles.accordionWrapper,
        expanded: styles.accordionWrapperExpanded,
      }}
    >
      <ExpansionPanelSummary
        classes={{
          root: styles.accordion,
          content: styles.accordionSummaryContent,
        }}
      >
        <div className={styles.accordionTitleBlock}>
          <div>{item.title}</div>
          <Button customBtn={styles.btnFaq} type="button">
            {expanded ? '-' : '+'}
          </Button>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: styles.accordionContent }}>
        <p className={styles.accordionDesc}>{item.desc}</p>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const FAQ = () => (
  <MainLayout>
    <div className={styles.container}>
      <h4 className={styles.title}>FAQ: Car from USA</h4>
      <div>
        {data.map(item => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  </MainLayout>
);

AccordionItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
  }),
};

export default FAQ;
