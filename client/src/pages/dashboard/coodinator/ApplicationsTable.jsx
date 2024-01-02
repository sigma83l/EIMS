import React from 'react'
import styles from './styles.module.css'
import internships from './intApplications.js'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo.jsx';

const ApplicationsTable = () => {



    // FUNCTION TO DISPLAY STUDENT INTERNSHIP APPLICATIONS ON A TABLE
    const displayInternshipApplications = internships.map((item, index) => 
        <tr key={index}>
            <td>{item.name}</td>
            <td>{item.company}</td>
            <td>{item.country}</td>
            <td>{item.city}</td>
            <td>{item.fieldOfWork}</td>
            <td>{item.duration}</td>
            <td>{item.date}</td>
        </tr>
    )
  return (
    <section className={styles.intApps}>
        <HeaderTwo
            text={'Internship Applications'}
            fontSize={'18px'}
            fontWeight={'800'}
            color={'#003679'}
            margin={'1rem 0 1rem 1rem'}
        />
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Field</th>
                    <th>Duration</th>
                    <th>Date Created</th>
                </tr>
            </thead>
            <tbody>
                {displayInternshipApplications}
            </tbody>
        </table>
    </section>
  )
}


export default ApplicationsTable;
