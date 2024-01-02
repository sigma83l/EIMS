import React, { useState } from 'react'
import styles from  './styles.module.css'
import { FiBell } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import Image from '../Image/Image';
import HeaderTwo from '../Header/HeaderTwo';
import Paragraph from '../Paragraph/Paragraph';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../CONTAINERS/Language/LanguageDropdown';

const Navbar = ({ user, type }) => {

    const [search, setSearch] = useState({keyword: ''});
    const [t, i18n] = useTranslation("global")

    // SEARCH INPUT CONTROLLER
    const handleSearchChange = (e) => {
        setSearch({...search, keyword: e.target.value})
    }

    const handleChange = (event) => {
      handleLangChange(event.target.value);
    }

    // FUNCTIONT OT HANDLE LANGUAGE CHANGE
    const handleLangChange = (lang) => {
      i18n.changeLanguage(lang);
    }

    // FUNCTION TO HANDLE SEARCH
    const handleSearch = (e) => {
      console.log(search.keyword);
      e.preventDefault();
      setSearch(prev => {
        return {
          ...prev,
          keyword: ''
        }
      })
    }
  return (
    <nav className={styles.nav}>
        <form>
            <input type='text' name='searchBox' value={search.keyword} onChange={handleSearchChange} placeholder={t("nav.searchBox")}/>
            <button type='submit' className={styles.searchBtn} onClick={handleSearch}><IoMdSearch style={{fontSize: '23px'}}/></button>
        </form>
        <FiBell style={{fontSize: '24px'}} />
        <div className={styles.cont}>
          <Image 
            src={'https://res.cloudinary.com/dmyvdqjso/image/upload/v1700391819/navijje30m4wcf2epexl.png'} 
            height={'50px'} 
            width={'50px'} 
            borderRadius={'50%'} 
            alt={'Profile Avatar'} 
            margin={'0 0.5rem 0 0'}
          />
          <div>
            <HeaderTwo text={user} color={'#003976'} fontSize={'16px'} margin={'0 0 0.3rem 0'} fontWeight={'500'} />
            <Paragraph text={type} fontSize={'12px'} color={'#003976'} margin={'0 0 0 0'} fontWeight={'700'} />
          </div>
        </div>
        <LanguageDropdown handleChange={handleChange} />
    </nav>
  )
}

export default Navbar;

