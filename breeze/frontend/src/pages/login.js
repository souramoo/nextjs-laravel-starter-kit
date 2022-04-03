import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ClipLoader from "react-spinners/ClipLoader";


const Login = () => {
    const router = useRouter()

    const auth = useAuth({ middleware: 'guest' })
    const { login } = auth

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({ email, password, setErrors, setStatus, setSubmitted })
    }

    return (
        <GuestLayout auth={auth}>
            <div className="fixed top-0 right-0 px-6 py-4">
                <Link href="/">
                    <a className="ml-4 text-sm text-gray-700 underline">
                        Back to main page
                    </a>
                </Link>
            </div>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </a>
                    </Link>
                }>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <form onSubmit={submitForm}
                            disabled={submitted}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full disabled:opacity-50"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                            disabled={submitted}
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full disabled:opacity-50"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                            disabled={submitted}
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:opacity-50"
                                disabled={submitted}
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>


                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-3" disabled={submitted}>
                            <ClipLoader  color={"#ffffff"} loading={submitted} size={15} css={{marginRight: "6px"}} /> Login
                        </Button>
                    </div>

                    
                    <div className="flex items-center justify-start mt-4">
                        <div className="flex-1 ml-3">
                            <Link href="/register">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Create a new account?
                                </a>
                            </Link>
                        </div>  
                        <div className="flex-1">
                            <Link href="/forgot-password">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Forgot your password?
                                </a>
                            </Link>
                        </div>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
