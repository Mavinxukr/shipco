import React, { useState } from 'react';
import MainLayout from '../../Layout/Global/Global';
import Popup from '../../Popup/Popup';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import styles from './Parts.scss';
import Button from '../../Button/Button';
import IconPlus from '../../../assets/svg/Plus.svg';
import IconFilter from '../../../assets/svg/Group (5).svg';
import Search from '../../Search/Search';


const Parts = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <MainLayout>
      <SubHeader />
      <div className={styles.container}>
        <div className={styles.flex}>
          <Button customBtn={styles.btnIcon} onClick={() => setIsPopupOpen(true)}>
            <IconPlus className={styles.plus} />
            Add New Part
          </Button>
          <div className={styles.rightBlock}>
            <Button customBtn={styles.filterText}>
              <IconFilter className={styles.filterIcon} />
              Filter
            </Button>
            <Search />
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <Popup
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          title="Bob Hudson "
          subTitle="(ID 000011)"
        >
          <div>31231</div>
        </Popup>
      )}
    </MainLayout>
  );
};

export default Parts;
