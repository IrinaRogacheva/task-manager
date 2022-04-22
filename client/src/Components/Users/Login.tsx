import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator'
import { setAuthorId } from '../../Actions/new-task';
import { loginUserByPassword } from '../../Actions/user';
import { RootState } from '../../store';
import './../Main/Main.css'

export default function Login(props: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [isShowEmptyEmail, setIsShowEmptyEmail] = useState(false)
    const [isShowWrongEmail, setIsShowWrongEmail] = useState(false)
    const checkEmail = (value: string): boolean => {
        setIsShowEmptyEmail(false)
        setIsShowWrongEmail(false)
        setIsLoginError(false)
        if(!value) {
            setIsShowEmptyEmail(true)
            return false
        }
        if (!validator.isEmail(value)) {
            setIsShowWrongEmail(true)
            return false
        }
        return true
    }

    const [isShowEmptyPassword, setIsShowEmptyPassword] = useState(false)
    const [isShowShortPassword, setIsShowShortPassword] = useState(false)
    const [isShowWrongPassword, setIsShowWrongPassword] = useState(false)
    const checkPassword = (value: string): boolean => {
        setIsShowEmptyPassword(false)
        setIsShowShortPassword(false)
        setIsShowWrongPassword(false)
        setIsLoginError(false)
        if(!value) {
            setIsShowEmptyPassword(true)
            return false
        }
        if(!checkPasswordsChars(value)) {
            setIsShowWrongPassword(true)
            return false
        }
        if (value.length < 8) {
            setIsShowShortPassword(true)
            return false
        }
        return true
    }

    const checkPasswordsChars = (password: string): boolean => {
        const specialCharacters = "!£$%^&*_@#~?";
        for (var i = 0; i < password.length; i++) 
        {
            if (!specialCharacters.includes(password.charAt(i)) && !/\d/.test(password.charAt(i)) && !/[a-z]/.test(password[i]) && !/[A-Z]/.test(password[i]))
            {
                return false
            }
        }
        return true
    }

    const [isLoginError, setIsLoginError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user)
    const login = () => {
        if (checkEmail(email) && checkPassword(password)) {
            dispatch(loginUserByPassword({email: email, password: password}))
        }
    }

    const firstUpdate = useRef(true)
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (user.loggedIn) {
           navigate("/")
           dispatch(setAuthorId(user.id_user))
        } else {
            setIsLoginError(true)
        }
      }, [user.loggedIn]);

  return (
      <>
    <div className='main_background'></div>
    <form autoComplete='on' className='register_window context-menu' onSubmit={(e)=>{e.preventDefault();login()}}>
        <input autoComplete="username email" name='email' value={email} onChange={(e)=>{setEmail(e.target.value);checkEmail(e.target.value)}} type={"email"} className='register__input' placeholder='E-mail'/>
        <p style={{display: (isShowEmptyEmail?'block':'none')}} className='register_error sidebar__text'>Поле должно быть заполнено</p>
        <p style={{display: (isShowWrongEmail?'block':'none')}} className='register_error sidebar__text'>Неправильный формат email</p>
        <p style={{display: (isLoginError?'block':'none')}} className='register_error sidebar__text'>Неправильный ввод имени пользователя или пароля</p>
        <input autoComplete="new-password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value);checkPassword(e.target.value)}} type={"password"} className='register__input' placeholder='Пароль'/>
        <p style={{display: (isShowEmptyPassword?'block':'none')}} className='register_error sidebar__text'>Поле должно быть заполнено</p>
        <p style={{display: (isShowShortPassword?'block':'none')}} className='register_error sidebar__text'>Пароль должен содержать минимум 8 символов</p>
        <p style={{display: (isShowWrongPassword?'block':'none')}} className='register_error sidebar__text'>Пароль содержит недопустимый символ</p>
        <input type='submit' className='register_button sidebar__text' value='Войти'/>
        <p className='register_caption sidebar__text'>Еще не зарегистрированы?<Link to={"/register"} className='register_link'> Регистрация</Link></p>
    </form>
    </>
    );
}