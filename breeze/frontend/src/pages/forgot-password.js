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
import { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const ForgotPassword = () => {
    const auth = useAuth({ middleware: 'guest' })
    const { forgotPassword } = auth

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus, setSubmitted })
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

                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                            disabled={submitted}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button disabled={submitted}><ClipLoader color={"#ffffff"} loading={submitted} size={15} css={{marginRight: "6px"}} /> Email Password Reset Link</Button>
                    </div>
                    
                    <div className="flex items-center justify-end mt-4">
                        <Link href="/login">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Back to login
                            </a>
                        </Link>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default ForgotPassword
