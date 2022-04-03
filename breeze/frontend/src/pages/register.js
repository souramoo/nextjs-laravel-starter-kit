import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
    const auth = useAuth({
        middleware: 'guest'
    })
    const { register } = auth

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    const submitForm = event => {
        event.preventDefault()

        register({ name, email, password, password_confirmation, setErrors, setSubmitted })
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

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <form onSubmit={submitForm}
                            disabled={submitted}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full disabled:opacity-50"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                            disabled={submitted}
                        />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full disabled:opacity-50"
                            onChange={event => setEmail(event.target.value)}
                            required
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
                            autoComplete="new-password"
                            disabled={submitted}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            className="block mt-1 w-full disabled:opacity-50"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                            disabled={submitted}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">

                        <Button className="ml-4" disabled={submitted}>
                                <ClipLoader color={"#ffffff"} loading={submitted} size={15} css={{marginRight: "6px"}} /> Register
                        </Button>
                    </div>

                    
                    <div className="flex items-center justify-start mt-4">
                        <div className="flex-1">
                            <Link href="/login">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Already registered?
                                </a>
                            </Link>
                        </div> 
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Register
