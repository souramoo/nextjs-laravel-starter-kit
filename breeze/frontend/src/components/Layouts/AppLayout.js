import Navigation from '@/components/Layouts/Navigation'
import Loading from 'react-fullpage-custom-loader'
import LoaderProps from '@/components/LoaderProps'
  
const AppLayout = ({ header, auth, children }) => {

    if(auth.isLoadingPage) {
        return (
            <div>
                <Loading  {...LoaderProps} />
            </div>
        )
    } else {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navigation user={auth.user} />

                {/* Page Heading */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>

                {/* Page Content */}
                <main>{children}</main>
            </div>
            )
    }
}

export default AppLayout
