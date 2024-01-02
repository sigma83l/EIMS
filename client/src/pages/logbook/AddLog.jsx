import React, { useState } from 'react'
import styles from './styles.module.css'
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import SideBar from '../../components/ELEMENTS/Nav/SideBar';
import Header from '../../components/ELEMENTS/Header/Header';
import { useTranslation } from 'react-i18next';
import CoodSidebar from '../../components/ELEMENTS/Nav/CoodSidebar';
// import * as fs from 'fs' 

const AddLog = () => {

    const [t, i18n] = useTranslation("global");
    const [id, setId] = useState(1);
    const [logData, setLogData] = useState({
        id: id,
        day: '',
        date: '',
        dept: '',
        desc: ''
    })

    // FUNCTION TO HANDLE FORM INPUT STATE CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // FUNCTION TO HANDLE FORM SUBMIT
    const handleLogSubmit = (e) => {
        e.preventDefault();
        console.log(logData);
        // const readStream = fs.createReadStream('logs.js');
        // const writeStream = fs.createWriteStream('logs.js');
        // const res = writeStream.write(logData)
        // writeStream.on('finish', () => {
        //     console.log(res)
        // })
    }


  return (
    <>
        <Navbar user={'Ahmed Ibrahim'} type={'Student'} />
        <SideBar />
        <main className={styles.addCont}>
            <Header text={t('logbook.add')} fontSize={'28px'} color={'#003976'} margin={'1rem 2rem'} />
            <section className={styles.addContMain}>
                <div className={styles.formCont}>
                    <form className={styles.form}>
                        <label htmlFor='day'>{`${t('logbook.day')}:`}</label>
                        <input type='number' name='day' value={logData.day} onChange={handleInputChange} min={1} max={40} />

                        <label htmlFor='date'>{`${t('logbook.date')}:`}</label>
                        <input type='date' name='date' value={logData.date} onChange={handleInputChange} />

                        <label htmlFor='dept'>{`${t('logbook.department')}:`}</label>
                        <input type='text' name='dept' value={logData.dept} onChange={handleInputChange} placeholder={'Department'} />

                        <label htmlFor='desc'>{`${t('logbook.description')}:`}</label>
                        <textarea name='desc' value={logData.desc} onChange={handleInputChange} placeholder={'Description of work done'} />

                        <button onClick={handleLogSubmit}>{t('logbook.add')}</button>
                    </form>
                </div>
                <div className={styles.calendar}>
                    <div>

                    </div>
                </div>
            </section>
        </main>
    </>
  )
}

export default AddLog;  
