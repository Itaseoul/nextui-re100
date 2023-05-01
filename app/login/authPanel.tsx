'use client'

import React from 'react'
import { authPanelState } from '@/store/atoms'
import { useAtom } from 'jotai'
import LoginForm from './login-form'
import SignUpForm from './signup-form'
import PasswordChange from './password-change'
import UpdatePassword from './update-password'



export default function AuthPanel() {
  const [getAuthPanelState, setAuthPanelState] = useAtom(authPanelState)

  switch (getAuthPanelState) {
    case "login":
      return <LoginForm />

    case "signup":
      return <SignUpForm />

    case "forgot":
      return <PasswordChange />

    case "reset":
      return <UpdatePassword />

    default:
      return <LoginForm />
  }

}