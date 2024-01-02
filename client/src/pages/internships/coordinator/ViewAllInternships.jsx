import React from 'react'
import styles from './styles.module.css'
import available from './available';
import ongoingInternships from './ongoing';
import Navbar from '../../../components/ELEMENTS/Nav/Navbar';
import CoodSidebar from '../../../components/ELEMENTS/Nav/CoodSidebar';
import { useTranslation } from 'react-i18next';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import { useNavigate } from 'react-router-dom';

const ViewAllInternships = () => {

    const [t, i18n] = useTranslation('global');
    const navigate = useNavigate('');

    const handleTableRowClick = (rowData) => {
        // Implement your logic here
        console.log('Row clicked:', rowData);
        navigate('/coordinator/view-all-internships')
    };

    // Available Internships
    const displayAvailableData = available.map((item, index) => 
        <tr key={index}>
                <td>{item.company}</td>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>{item.field}</td>
                <td>{item.duration}</td>
        </tr>
    )

    // ONGOING & COMPLETED INTERNSHIPS
    const displayOngoingAndCompleted = ongoingInternships.map((item, index) => 
        <tr key={index} onClick={() => handleTableRowClick(item)}>
            <td>{item.stdName}</td>
            <td>{item.company}</td>
            <td>{item.country}</td>
            <td>{item.city}</td>
            <td>{item.duration}</td>
            <td>{item.start}</td>
            <td>{item.end}</td>
        </tr>
    )


  return (
    <>
        <Navbar user={'Ertugrul Suleyman'} type={'Coordinator'} />
        <CoodSidebar />
        <section className={styles.main}>
            <HeaderTwo 
                text={'New Applications'}
                fontSize={'26px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            <div className={styles.availCont}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('nav.stu') + ' ' + t('profile.name')}</th>
                            <th>{t('internships.company')}</th>
                            <th>{t('internships.country')}</th>
                            <th>{t('internships.city')}</th>
                            <th>{t('internships.dur')}</th>
                            <th>{t('internships.start')}</th>
                            <th>{t('internships.end')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayOngoingAndCompleted}
                    </tbody>
                </table>
            </div>
            {/* AVAILABLE INTERNSHIPS */}
            <HeaderTwo 
                text={t('internships.avail')}
                fontSize={'26px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            
            <div className={styles.availCont}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('internships.company')}</th>
                            <th>{t('internships.country')}</th>
                            <th>{t('internships.city')}</th>
                            <th>{t('internships.field')}</th>
                            <th>{t('internships.dur')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayAvailableData}
                    </tbody>
                </table>
            </div>
            {/* ONGOING INTERNSHIPS */}
            <HeaderTwo 
                text={t('internships.ong')}
                fontSize={'24px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            <div className={styles.availCont}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('nav.stu') + ' ' + t('profile.name')}</th>
                            <th>{t('internships.company')}</th>
                            <th>{t('internships.country')}</th>
                            <th>{t('internships.city')}</th>
                            <th>{t('internships.dur')}</th>
                            <th>{t('internships.start')}</th>
                            <th>{t('internships.end')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayOngoingAndCompleted}
                    </tbody>
                </table>
            </div>
            {/* COMPLETED INTERNSHIPS */}
            <HeaderTwo 
                text={t('internships.compl')}
                fontSize={'24px'}
                fontWeight={'800'}
                color={'#003679'}
                width={'100%'}
                margin={'1.5rem 1.5rem'}
            />
            <div className={styles.availCont}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('nav.stu') + ' ' + t('profile.name')}</th>
                            <th>{t('internships.company')}</th>
                            <th>{t('internships.country')}</th>
                            <th>{t('internships.city')}</th>
                            <th>{t('internships.dur')}</th>
                            <th>{t('internships.start')}</th>
                            <th>{t('internships.end')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayOngoingAndCompleted}
                    </tbody>
                </table>
            </div>


        </section>
    </>
  )
}


export default ViewAllInternships;
