import React from 'react'
import styles from './styles.module.css'
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph';
import Header from '../../../components/ELEMENTS/Header/Header';
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Internship = () => {

    const [t, i18n] = useTranslation('global')

  return (
    <div className={styles.internshipCont}>
        <div className={styles.titleCont}>
            <Header 
                text={'Software Development'}
                fontSize={'18px'}
                fontWeight={'500'}
                color={'#003679'}  
                // margin={'2rem 0 1rem 0.5remrem'}
            />
            <HeaderTwo 
                text={'Apple Inc'}
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#406A98'}  
            />
        </div>
        <Paragraph 
            text={'A description of the internship details and requirements goes here..'}
            fontSize={'15px'}
            width={'95%'}
            color={'#fff'}
            margin={'0.25rem 0 0.25rem 0.25rem'}
        />
        <Link to={"/student/internship/application-form"} className={styles.btn}>{t('internships.apply')}</Link>
    </div>
  )
}

export default Internship;
