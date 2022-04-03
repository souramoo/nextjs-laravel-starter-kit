import Navigation from '@/components/Layouts/Navigation'
import Loading from 'react-fullpage-custom-loader'

const defaultPropsLoader  = {
    sentences: [ ],
    loaderType: 'ball-scale-multiple', // a nice one
    loaderSize: 'big', // small, medium or big?
    color: '#a0aaae', // your default color for the loader
    textStyles: { // Any CSS style!
      fontSize: 16,
      fontWeight: 'bold',
      height: '3em',
      color: '#a0aaae'
    },
    wrapperBackgroundColor: 'white', // any valid CSS background string works (gradients here!)
    counter: false, // We are going to show the counter below the text
    counterMax: 5, // Stop after 5 cycles
    counterDelay: 3000, // A cycle length in milliseconds
    counterChars: null, // if no chars are passed you get to see the counter number
    counterStyles: {
      color: 'white'
    }, // any text style to modify the counter
    fadeIn: true, // controlled on top level
    startFadeOut: false // controlled on top level
  }
  
const AppLayout = ({ header, auth, children }) => {

    if(auth.isLoadingPage) {
        return (
            <div>
                <Loading  {...defaultPropsLoader} />
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
