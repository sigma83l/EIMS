import React from 'react'
import styles from './coordinator/styles.module.css'
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import { useTranslation } from 'react-i18next';

const Announcement = () => {

    const [t, i18n] = useTranslation('global');

  return (
    <div className={styles.announcement}>
        <div className={styles.dateCont}>
            <HeaderTwo 
                text={'2023'}
                fontSize={'14px'}
                fontWeight={'600'}
                color={'#888888'}
                margin={'0 0 0 1rem'}

            />
            <HeaderTwo 
                text={'20 Jun'}
                fontSize={'14px'}
                fontWeight={'600'}
                color={'#888888'}
                margin={'0 0 0 1rem'}

            />
            <HeaderTwo 
                text={'Announcer Name'}
                fontSize={'13px'}
                fontWeight={'600'}
                color={'#888888'}
                margin={'0 0 0 1rem'}

                // margin={'auto'}
            />
        </div>
        <div className={styles.announceDiv}>
            <HeaderTwo 
                text={'Announcement Title'}
                fontSize={'18px'}
                fontWeight={'800'}
                color={'#003679'}
                // margin={'auto'}
            />
            <p>Announcement description, announcement description, announcement description, announcement description</p>

        </div>
    </div>
  )
}

export default Announcement;
