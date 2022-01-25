import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import validator from 'validator'
import UsersDataService from "../../Services/users.service";
import './../Main/Main.css'

export default function Register(props: any) {
    const [isShowEmptyEmail, setIsShowEmptyEmail] = useState(false)
    const [isShowWrongEmail, setIsShowWrongEmail] = useState(false)
    const [isShowBusyEmail, setIsShowBusyEmail] = useState(false)
    const checkEmail = (value: string) => {
        setIsShowEmptyEmail(false)
        setIsShowWrongEmail(false)
        setIsShowBusyEmail(false)
        if(!value) {
            setIsShowEmptyEmail(true)
            return
        }
        if (!validator.isEmail(value)) {
            setIsShowWrongEmail(true)
            return
        }
        async function checkIfEmailBusy() {
            const res = await UsersDataService.getByEmail(value)
            if (res.data) {
                setIsShowBusyEmail(true)
            }
        }
        checkIfEmailBusy()
        if (isShowBusyEmail) return
    }

    const [isShowEmptyPassword, setIsShowEmptyPassword] = useState(false)
    const [isShowShortPassword, setIsShowShortPassword] = useState(false)
    const [isShowWeakPassword, setIsShowWeakPassword] = useState(false)
    const [isShowWrongPassword, setIsShowWrongPassword] = useState(false)
    const checkPassword = (value: string) => {
        setIsShowEmptyPassword(false)
        setIsShowWeakPassword(false)
        setIsShowShortPassword(false)
        setIsShowWrongPassword(false)
        if(!value) {
            setIsShowEmptyPassword(true)
            return
        }
        if(!checkPasswordsChars(value)) {
            setIsShowWrongPassword(true)
            return
        }
        if (value.length < 8) {
            setIsShowShortPassword(true)
            return
        }
        if (checkPasswordStrength(value) < 80) {
            setIsShowWeakPassword(true)
            return
        }
    }

    const checkPasswordStrength = (password: string): number => {
        const specialCharacters = "!£$%^&*_@#~?";
        let passwordScore = 0;
        for (var i = 0; i < password.length; i++) 
        {
            if (specialCharacters.includes(password.charAt(i)))
            {
                passwordScore += 20;
                break;
            }
        }
        if (/\d/.test(password))
            passwordScore += 20;
        if (/[a-z]/.test(password))
            passwordScore += 20;
        if (/[A-Z]/.test(password))
            passwordScore += 20;
        if (password.length >= 8)
            passwordScore += 20;

        return passwordScore
    }

    const checkPasswordsChars = (password: string): boolean => {
        const specialCharacters = "!£$%^&*_@#~?";
        for (var i = 0; i < password.length; i++) 
        {
            console.log("specialCharacters.includes(password.charAt(i) "+specialCharacters.includes(password.charAt(i)))
            if (!specialCharacters.includes(password.charAt(i)) && !/\d/.test(password.charAt(i)) && !/[a-z]/.test(password[i]) && !/[A-Z]/.test(password[i]))
            {
                return false
            }
        }
        return true
    }

  return (
      <>
    <div className='main_background'></div>
    <div className='register_window context-menu'>
        <input onChange={(e)=>{checkEmail(e.target.value)}} type={"email"} className='register__input' placeholder='E-mail'/>
        <p style={{display: (isShowEmptyEmail?'block':'none')}} className='register_error sidebar__text'>Поле должно быть заполнено</p>
        <p style={{display: (isShowWrongEmail?'block':'none')}} className='register_error sidebar__text'>Неправильный формат email</p>
        <p style={{display: (isShowBusyEmail?'block':'none')}} className='register_error sidebar__text'>Данный email адрес уже зарегистрирован</p>
        <input onChange={(e)=>{checkPassword(e.target.value)}} type={"password"} className='register__input' placeholder='Пароль'/>
        <p style={{display: (isShowEmptyPassword?'block':'none')}} className='register_error sidebar__text'>Поле должно быть заполнено</p>
        <p style={{display: (isShowWeakPassword?'block':'none')}} className='register_error sidebar__text'>Слабый пароль</p>
        <p style={{display: (isShowShortPassword?'block':'none')}} className='register_error sidebar__text'>Пароль должен содержать минимум 8 символов</p>
        <p style={{display: (isShowWrongPassword?'block':'none')}} className='register_error sidebar__text'>Пароль содержит недопустимый символ</p>
        <button className='register_button sidebar__text'>Зарегистрироваться</button>
        <p className='register_caption sidebar__text'>Уже зарегистрированы? <Link to={"/login"} className='register_link'>Войти</Link></p>
    </div>
    </>
    );
}