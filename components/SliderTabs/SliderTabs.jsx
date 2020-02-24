import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ThumbSlider from '../ThumbSlider/ThumbSlider';
import '../../public/slick/slick.css';
import styles from './SliderTabs.scss';
import { sliderItems } from './data';

const TabPanel = ({
  children, value, index, ...other
}) => (
  <Typography
    component="div"
    className={styles.tabsItems}
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </Typography>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = index => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '15px',
    width: '100%',
    maxWidth: '736px',
  },
  tabs: {
    backgroundColor: '#f8bebe',
    color: '#d73e3e',
    textTransform: 'uppercase',
  },
  items: {
    padding: '0',
  },
}));

const AntTabs = withStyles({
  indicator: {
    backgroundColor: '#d73e3e',
    color: '#fff',
    width: '100%',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    fontWeight: 'bold',
    maxWidth: '33,4%',
    opacity: 1,
    textTransform: 'uppercase',
    '&:hover': {
      color: '#fff',
      opacity: 1,
      backgroundColor: '#d73e3e',
    },
    '&$selected': {
      color: '#fff',
      backgroundColor: '#d73e3e',
    },
    '&:focus': {
      color: '#fff',
      backgroundColor: '#d73e3e',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const SliderTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <AntTabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="simple tabs example"
          className={classes.tabs}
        >
          <AntTab label="auction pictures" {...a11yProps(0)} />
          <AntTab label="warehouse pictures" {...a11yProps(1)} />
          <AntTab label="Container pictures" {...a11yProps(2)} />
        </AntTabs>
      </AppBar>
      <TabPanel className={styles.itemTabs} value={value} index={0}>
        <ThumbSlider initialSlide={0}>
          {sliderItems.map(item => (
            <div key={item.id} className={styles.slid}>
              <img src={item.src} alt="a" />
            </div>
          ))}
        </ThumbSlider>
      </TabPanel>
      <TabPanel className={styles.itemTabs} value={value} index={1}>
        <ThumbSlider initialSlide={0}>
          {sliderItems.map(item => (
            <div key={item.id} className={styles.slid}>
              <img src={item.src} alt="a" />
            </div>
          ))}
        </ThumbSlider>
      </TabPanel>
      <TabPanel className={styles.itemTabs} value={value} index={2}>
        <ThumbSlider initialSlide={0}>
          {sliderItems.map(item => (
            <div key={item.id} className={styles.slid}>
              <img src={item.src} alt="a" />
            </div>
          ))}
        </ThumbSlider>
      </TabPanel>
    </div>
  );
};

export default SliderTabs;
