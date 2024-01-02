import React from 'react'
import styles from './styles.module.css'
import Image from '../Image/Image'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbNotes } from 'react-icons/tb'
import { FaRegUser } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'
import { BiSolidDashboard } from 'react-icons/bi'
import { MdInsertChartOutlined } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { IoIosLogOut } from "react-icons/io";
import { PiSpeakerHighDuotone } from "react-icons/pi"
import HeaderTwo from '../Header/HeaderTwo'

const SideBar = () => {

  const [t, i18n] = useTranslation("global")
  const location = useLocation();
  // console.log(location.pathname);
  const navigate = useNavigate('')



  // FUNCTION TO HANDLE LOGOUT
  const handleLogout = () => {
    setInterval(() => navigate('/student/login'), 1000)
    // const url = 'http://localhost:8080/v1/auth/logout'
    // fetch(url, {
    //       method: "GET",
		// 			headers: { "Content-Type": "application/json" },
		// 		})
		// 			.then((res) => {
		// 				console.log("Logged out", res);
		// 			})
		// 			.catch((error) => {
		// 				console.error(error);
		// 			});
  }

  return (
    <div className={styles.sideBar}>
        <Image 
            src={'https://res.cloudinary.com/dmyvdqjso/image/upload/v1700391819/navijje30m4wcf2epexl.png'}
            height={"100px"}
            width={"100px"}
            margin={"2rem auto 1rem auto"}
        />
        <div className='navDiv'>
            <Link to={'/student/dashboard'} className={styles.link}><BiSolidDashboard style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.home")}</Link>
            <Link to={'/student/profile'} className={styles.link}><FaRegUser style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.prof")}</Link>
            <Link to={'/student/internships'} className={styles.link}><FaChalkboardTeacher style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.internships")}</Link>
            <Link to={'/student/logbook'} className={styles.link}><TbNotes style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.logbook")}</Link>
            <Link to={'/student/announcements'} className={styles.link}><PiSpeakerHighDuotone style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("announcements.title")}</Link>
            <Link to={'/student/view-assessment'} className={styles.link}><MdInsertChartOutlined style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("eval.eval")}</Link>
            <Link to={'/user/settings'} className={styles.link}><CiSettings style={{fontSize: '22px', marginRight: '0.5rem'}} /> {t("sidebar.settings")}</Link>
        </div>
        <button className={styles.logout} onClick={handleLogout}>
          <IoIosLogOut style={{fontSize: '22px', fontWeight: '800', marginRight: '5px', color: '#003976'}} />
          <HeaderTwo 
            text={t("log.logout")} 
            fontSize={'18px'}
            margin={'0'}
            color={'#003976'}
          />
        </button>
    </div>
  )
}

export default SideBar;
