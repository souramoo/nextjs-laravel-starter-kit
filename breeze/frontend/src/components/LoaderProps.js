export default {
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
    wrapperBackgroundColor: 'rgb(243 244 246)', // any valid CSS background string works (gradients here!)
    counter: false, // We are going to show the counter below the text
    counterMax: 5, // Stop after 5 cycles
    counterDelay: 3000, // A cycle length in milliseconds
    counterChars: null, // if no chars are passed you get to see the counter number
    counterStyles: {
      color: 'white'
    }, // any text style to modify the counter
    fadeIn: false, // controlled on top level
    startFadeOut: false // controlled on top level
  }