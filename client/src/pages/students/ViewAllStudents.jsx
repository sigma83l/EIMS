import React from 'react'
import students from './students'
import styles from './styles.module.css'
import CoodSidebar from '../../components/ELEMENTS/Nav/CoodSidebar'
import Navbar from '../../components/ELEMENTS/Nav/Navbar'
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo'
import { useTranslation } from 'react-i18next'

export default function ViewAllStudents() {


    const [t, i18n] = useTranslation('global');
    const displayStudents = students.map((item, index) => 
        <tr key={index}>
            <td>{item.name}</td>
            <td>{item.stdNo}</td>
            <td>{item.email}</td>
            <td>{item.company}</td>
            <td>{item.supervisor}</td>
            <td>{item.status}</td>
        </tr>
    )
  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
            {/* ALL STUDENTS TABLE */}
            <HeaderTwo 
                text={t('nav.stu') + 's'}
                fontSize={'26px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            <table>
                <thead>
                    <tr>
                        <th>{t('profile.name')}</th>
                        <th>{t('profile.stdNo')}</th>
                        <th>{t('profile.email')}</th>
                        <th>{t('profile.companyName')}</th>
                        <th>{t('nav.supe')}</th>
                        <th>{t('internships.stat')}</th>
                    </tr>
                </thead>
                <tbody>
                    {displayStudents}
                </tbody>
            </table>

        </section>
    </>
  )
}
