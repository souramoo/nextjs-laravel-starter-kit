import Head from 'next/head'
import Loading from 'react-fullpage-custom-loader'
import LoaderProps from '@/components/LoaderProps'

const GuestLayout = ({ auth, children }) => {

    if(auth.isLoadingPage) {
        return (
            <div>
            <Loading  {...LoaderProps} />
            </div>
        )
    } else {
        return (
            <div>
                <Head>
                    <title>Laravel</title>
                </Head>

                <div className="font-sans text-gray-900 antialiased">
                    {children}
                </div>
            </div>
        )
    }
}

export default GuestLayout
