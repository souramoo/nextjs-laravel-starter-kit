import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware } = {}) => {
    const router = useRouter()
    const [isLoadingPage, setIsLoadingPage] = useState(true)

    const { data: user, error, revalidate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then((res) => res.data)
            .catch(error => {
                if (error.response.status === 401) {
                    setIsLoadingPage(false)
                }
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, setSubmitted, ...props }) => {
        setSubmitted(true)
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => revalidate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
            .finally(() => setSubmitted(false))
    }

    const login = async ({ setErrors, setStatus, setSubmitted, ...props }) => {
        setSubmitted(true)
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => revalidate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
            .finally(() => setSubmitted(false))
    }

    const forgotPassword = async ({ setErrors, setStatus, setSubmitted, email }) => {
        setSubmitted(true)
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
            .finally(() => setSubmitted(false))
    }

    const resetPassword = async ({ setErrors, setStatus, setSubmitted, ...props }) => {
        setSubmitted(true)
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response => router.push('/login?reset=' + btoa(response.data.status)))
            .catch(error => {
                if (error.response.status != 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
            .finally(() => setSubmitted(false))
    }

    const resendEmailVerification = ({ setStatus, setSubmitted }) => {
        setSubmitted(true)
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
            .finally(() => setSubmitted(false))
    }

    const logout = async () => {
        if (! error) {
            await axios.post('/logout')

            revalidate()
        }

        window.location.pathname = '/'
    }

    useEffect(() => {
        if (middleware === 'guest' && user) {
            router.push("/launch")
        } else if (middleware === 'auth' && error) {
            logout()
        } else {
            if(user)
                setIsLoadingPage(false)
            console.log(user, middleware)
        }
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        isLoadingPage
    }
}
