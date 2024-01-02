import React from 'react'
import supervisors from './supervisors'
import styles from './styles.module.css'
import CoodSidebar from '../../components/ELEMENTS/Nav/CoodSidebar';
import Navbar from '../../components/ELEMENTS/Nav/Navbar';
import { useTranslation } from 'react-i18next';
import HeaderTwo from '../../components/ELEMENTS/Header/HeaderTwo';
import { Link } from 'react-router-dom';

const ViewSupervisors = () => {

  const [t, i18n] = useTranslation('global');
  const displaySupervisors = supervisors.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.company}</td>
        <td>{item.email}</td>
        <td>{item.status}</td>
        <td>{item.students}</td>
      </tr>
    )
  })
  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
          <HeaderTwo 
                text={t('nav.supe') + 's'}
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
                <th>{t('internships.company')}</th>
                <th>{t('profile.email')}</th>
                <th>{t('internships.stat')}</th>
                <th>{`${t('nav.stu')}s`}</th>
              </tr>
            </thead>
            <tbody>
              {displaySupervisors}
            </tbody>
          </table>
          <Link to={'/coordinator/createsupervisor'} className={styles.addSupe}>{`${t('main.add')} ${t('nav.supe')}`}</Link>

        </section>
    </>
  )
}


export default ViewSupervisors;