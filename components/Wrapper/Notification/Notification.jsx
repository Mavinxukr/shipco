import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { getNotifications } from '../../../redux/actions/notifications';
import {
  notificationsDataSelector,
  notificationDataReceivedSelector,
} from '../../../utils/selectors';
import { updateStatusNotificationsRequest } from '../../../services/notifications';
import styles from './Notification.scss';
import MainLayout from '../../Layout/Global/Global';
import Button from '../../Button/Button';
import IconFilter from '../../../assets/svg/Group (5).svg';
import IconArrow from '../../../assets/svg/Group (6).svg';
import IconAuto from '../../../assets/svg/Vector (2).svg';
import IconRepair from '../../../assets/svg/Group (1).svg';
import IconSetting from '../../../assets/svg/Group (2).svg';
import IconShipping from '../../../assets/svg/Group (3).svg';
import IconInvoices from '../../../assets/svg/Vector (3).svg';
import Loader from '../../Loader/Loader';

const arrOfIcons = [
  <IconAuto className={styles.iconTitle} />,
  <IconRepair className={styles.iconTitle} />,
  <IconSetting className={styles.iconTitle} />,
  <IconShipping className={styles.iconTitle} />,
  <IconInvoices className={styles.iconTitle} />,
];

const AccordionItem = ({ item, arrData, icon }) => {
  const [expanded, setExpanded] = useState(false);

  const classNameForAccordionTitle = cx(styles.titleBlock, {
    [styles.titleBlockNoBorder]:
      expanded
      || arrData.findIndex(itemArrData => itemArrData.id === item.id)
        === arrData.length - 1,
    [styles.titleBlockPadding]: expanded,
  });

  const classNameForIcon = cx(styles.arrowIcon, {
    [styles.arrowIconRotate]: expanded,
  });

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
        onClick={() => updateStatusNotificationsRequest({
          type: item.title,
        })}
      >
        <div className={classNameForAccordionTitle}>
          <div className={styles.mainInfo}>
            <p className={styles.accordionTitle}>
              {icon}
              {item.title.split('_').join(' ')}
            </p>
            {item.notifications.some(notification => notification.is_new) ? (
              <p
                className={styles.countOfNotification}
              >
                {
                  item.notifications.filter(notification => notification.is_new)
                    .length
                }{' '}
                new notification
              </p>
            ) : null}
          </div>
          <Button customBtn={styles.sliderButton} type="button">
            <IconArrow className={classNameForIcon} />
          </Button>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: styles.accordionContent }}>
        <ul className={styles.accordionContentList}>
          {item.notifications.map((notification) => {
            const classNameForItem = cx(styles.accordionContentItem, {
              [styles.accordionContentFullItem]: !notification.is_new,
            });

            const classNameForText = cx(styles.accordionContentText, {
              [styles.accordionContentTextAfter]: notification.is_new,
            });

            const classNameForWrapper = cx(styles.accordionContentItemWrapper, {
              [styles.accordionContentItemWrapperBorder]: notification.is_new,
            });

            return (
              <li className={classNameForItem} key={notification.id}>
                <div className={classNameForWrapper}>
                  <p className={classNameForText}>{notification.body}</p>
                  <p className={styles.accordionContentTime}>
                    {notification.created_at}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const Notification = () => {
  const allNotifications = useSelector(notificationsDataSelector);
  const isDataReceived = useSelector(notificationDataReceivedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  const arrTypes = [
    'auto',
    'auto_for_dismanting',
    'parts',
    'shipping',
    'invoices',
  ];

  const getArr = (items, arr) => items.map((item, index) => {
    const notifications = arr.filter(itemChild => itemChild.type === item);
    return {
      id: index + 1,
      title: item,
      notifications,
    };
  });

  const notificationData = getArr(arrTypes, allNotifications);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4 className={styles.title}>Notifications</h4>
          <p className={styles.filterText}>
            <IconFilter className={styles.filterIcon} />
            Filter
          </p>
        </div>
        <div className={styles.accordionsContainer}>
          {notificationData.map((item, index) => (
            <AccordionItem
              arrData={notificationData}
              key={item.id}
              item={item}
              icon={arrOfIcons[index]}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

AccordionItem.propTypes = {
  icon: PropTypes.object,
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    notifications: PropTypes.arrayOf(PropTypes.object),
  }),
  arrData: PropTypes.array,
};

export default Notification;
