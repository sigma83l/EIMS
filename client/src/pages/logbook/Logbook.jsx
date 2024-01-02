import React from 'react'
import styles from './styles.module.css'
import SideBar from '../../components/ELEMENTS/Nav/SideBar';
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import Log from './Log';
import { FiEdit3 } from 'react-icons/fi'
import { useTranslation } from 'react-i18next';
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from 'react-router-dom';
import logs from './logs';
import { date } from 'yup';

const Logbook = () => {

    const [t, i18n] = useTranslation("global");
    const displayLogs = logs.map((item, index) => {
        return (
            <Log 
                to={"/student/view-log"}
                day={item.day} 
                date={item.date} 
                desc={item.desc} 
            />
        )
    })

  return (
    <>
        <Navbar user={'Ahmed Ibrahim'} type={'Student'} />
        <SideBar />
        <section className={styles.logbook}>
            <div className={styles.header}>
                <Link to={'/student/add/new/log'} className={styles.addLogBtn}><FiEdit3 style={{marginRight: '0.3rem'}} /> {t('logbook.add')}</Link>
                <button className={styles.downloadBtn}><MdOutlineFileDownload style={{marginRight: '0.3rem', fontSize: '20px'}}  /> {t('logbook.download')}</button>
            </div>
            <main className={styles.main}>
                {displayLogs}
            </main>

        </section>
    </>
  )
}

export default Logbook;