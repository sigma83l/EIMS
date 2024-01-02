import React from 'react'
import styles from './styles.module.css'
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../../components/ELEMENTS/Nav/SideBar';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import { useTranslation } from 'react-i18next';
import Announcement from '../Announcement';

const Announcements = ({ sideBar, navbar }) => {

  const [t, i18n] = useTranslation('global');

  return (
    <>
        <Navbar />
        {sideBar}
        <main className={styles.main}>
          <HeaderTwo 
            text={t('announcements.title')}
            fontSize={'24px'}
            fontWeight={'700'}
            color={'#003679'}
            margin={'1rem 2rem'}
          />
          <div className={styles.announceCont}>
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
            <Announcement />
          </div>
        </main>
    </>
  )
}

export default Announcements;


