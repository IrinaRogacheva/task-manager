import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import validator from 'validator'
import UsersDataService from "../../Services/users.service";
import './../Main/Main.css'

export default function Login(props: any) {
    const [isShowEmptyEmail, setIsShowEmptyEmail] = useState(false)
    const [isShowWrongEmail, setIsShowWrongEmail] = useState(false)
    const [isShowNotFoundEmail, setIsShowNotFoundEmail] = useState(false)
    const checkEmail = (value: string) => {
        setIsShowEmptyEmail(false)
        setIsShowWrongEmail(false)
        setIsShowNotFoundEmail(false)
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
                setIsShowNotFoundEmail(true)
            }
        }
        checkIfEmailBusy()
        if (isShowNotFoundEmail) return
    }

    const [isShowEmptyPassword, setIsShowEmptyPassword] = useState(false)
    const [isShowShortPassword, setIsShowShortPassword] = useState(false)
    const [isShowWrongPassword, setIsShowWrongPassword] = useState(false)
    const checkPassword = (value: string) => {
        setIsShowEmptyPassword(false)
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
        <p style={{display: (isShowNotFoundEmail?'block':'none')}} className='register_error sidebar__text'>Данный email адрес не зарегистрирован</p>
        <input onChange={(e)=>{checkPassword(e.target.value)}} type={"password"} className='register__input' placeholder='Пароль'/>
        <p style={{display: (isShowEmptyPassword?'block':'none')}} className='register_error sidebar__text'>Поле должно быть заполнено</p>
        <p style={{display: (isShowShortPassword?'block':'none')}} className='register_error sidebar__text'>Пароль должен содержать минимум 8 символов</p>
        <p style={{display: (isShowWrongPassword?'block':'none')}} className='register_error sidebar__text'>Пароль содержит недопустимый символ</p>
        <button className='register_button sidebar__text'>Войти</button>
        <p className='register_caption sidebar__text'>Еще не зарегистрированы?<Link to={"/register"} className='register_link'> Регистрация</Link></p>
    </div>
    </>
    );
}