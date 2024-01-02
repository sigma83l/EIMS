import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Image from '../../../components/ELEMENTS/Image/Image'
import HeaderTwo from '../../../components/ELEMENTS/Header/HeaderTwo'
import Paragraph from '../../../components/ELEMENTS/Paragraph/Paragraph'
import { Link, useNavigate } from 'react-router-dom'
import SignupSuccess from '../SignupSuccess';
import Cookies from 'js-cookie'

const StudentSignup = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '05338353123',
        userType: 'Student',
        studentNumber: '',
        passwordConfirm: '',
        otp: ''
    })
    // console.log(user)
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [signupSuccesfull, setSignupSuccesfull] = useState(false)
    const navigate = useNavigate('');

    // handle form fields change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    // FUNCTION TO HANDLE FORM SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            user.firstname === '' || 
            user.lastname  === '' || 
            user.email === '' || 
            user.password  === '' ||
            user.studentNumber === '') {
                alert('please fill all form fields');
        }
        if(user.password === user.passwordConfirm){
            setPasswordMatch(true)
            setSignupSuccesfull(true)
            // !user.otp && submitOTP();
            if(user.otp) {
                // fetch("http://localhost:8080/v1/auth/signup", {
				// 	method: "POST",
				// 	headers: { "Content-Type": "application/json" },
				// 	body: JSON.stringify(user),
				// })
				// .then((res) => {
                //     saveTokensToCookies(res.accessToken,res.refreshToken);
				// 	console.log("Form Data Sent!", res);
				// })
				// .catch((error) => {
				// 	console.error(error.response.data);
				// });
                alert('Signup Success');
                navigate('/student/dashboard')
            
            }
        } 
        
    }

    const saveTokensToCookies = (accessToken, refreshToken) => {
        // Set cookies with a secure flag if your application uses HTTPS
        Cookies.set('access_token', accessToken, { expires: 7, secure: true });
        Cookies.set('refresh_token', refreshToken, { expires: 14, secure: true });
    };

    // FUNTION TO HANDLE OTP SUBMIT
    const submitOTP = () => {
        let url = `http://localhost:8080/v1/auth/send-code`
        fetch(url, {
            method: "POST",
            headers:{ "Content-type": "application/json" },
            body: JSON.stringify({email : user.email, userType: 'Student'})
        }).then((res) => {
            console.log('OTP Sent! ' + res);
        }).catch((e) => {
            console.log(e);
        })
    }

    // const signupSuccessful = (bool) => {
    //     bool ? <SignupSuccess /> : <></>
    // } http://localhost:3000/v1/auth/signup

  return (
    <main className={styles.main}>
        <section>
            <Image 
                src={'https://res.cloudinary.com/dmyvdqjso/image/upload/v1700391819/navijje30m4wcf2epexl.png'}
                height={"80px"}
                width={"80px"}
                margin={"0.8rem auto 0.8rem auto"}
            />
            <HeaderTwo 
                text={"Create Account"} 
                color={'#003976'} 
                fontSize={'22px'} 
                margin={'0'}
            />
            <form className={styles.form}>
                <label htmlFor={'firstname'}>First Name:</label>
                <input type={'text'} name={'firstname'} value={user.firstname} onChange={handleChange} placeholder={'First Name'} className={styles.inp} />

                <label htmlFor={'lastname'}>Last Name:</label>
                <input type={'text'} name={'lastname'} value={user.lastname} onChange={handleChange} placeholder={'Last Name'} className={styles.inp} />

                <label htmlFor={'email'}>Email:</label>
                <input type={'email'} name={'email'} value={user.email} onChange={handleChange} placeholder={'Email'} className={styles.inp} />

                <label htmlFor={'studentNumber'}>Student Number:</label>
                <input type={'text'} name={'studentNumber'} value={user.studentNumber} onChange={handleChange} placeholder={'20****69'} className={styles.inp} />

                <label htmlFor={'password'}>Password:</label>
                <input type={'password'} name={'password'} value={user.password} onChange={handleChange} placeholder={'Password'} className={styles.inp} />

                <label htmlFor={'passwordConfirm'}>Confirm Password:</label>
                <input type={'password'} name={'passwordConfirm'} value={user.passwordConfirm} onChange={handleChange} placeholder={'Confirm Password'} className={styles.inp} />
                { !passwordMatch && <Paragraph text={'*Passwords do not match'} fontSize={'12px'} fontWeight={'400'} color={'#ff1a2f'} margin={'0 0.5rem'} /> }

                {
                    signupSuccesfull &&
                    <>
                        <label htmlFor={'lastname'}>One-Time Password:</label>
                        <input 
                            type={'text'} 
                            name={'otp'} 
                            value={user.otp} 
                            onChange={e => setUser({...user, otp:e.target.value})} 
                            placeholder={'Enter OTP'} 
                            className={styles.inp} />
                    </>
                    
                }


                <input type='submit' value={'Sign up'} onClick={handleSubmit} onKeyDown={handleSubmit} className={styles.btn} />
            </form>
            <Paragraph text={'By creating an account, you are agreeing to our terms of service and privacy policy'} fontSize={'13px'} fontWeight={'500'} textAlign={'center'} width={'50%'} margin={'0.5rem auto'} />
            <Paragraph text={'Already have an account?'} fontSize={'13px'} fontWeight={'500'} textAlign={'center'} width={'50%'} margin={'0 auto 0.5rem auto'}  />
            <Link to={'/student/login'} style={{textDecoration: 'none', color: '#406A98', fontSize: '16px', fontWeight: '600', marginBottom: '2rem'}}>Sign in</Link>
        </section>
    </main>
  )
}

export default StudentSignup;
