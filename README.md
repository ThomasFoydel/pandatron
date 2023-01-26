<div align="center"><h1>pandatron</h1></div>

<div align="center"><h5>A synthesizer for the browser <a href="https://thomasfoydel.github.io/pandatron/">live demo here</a></h5></div>

<img src="./public/imgs/preview.jpg" width="100%" >

As soon as I heard about the webaudio API in a dev conference talk on youtube I knew I was going to have a hard time sleeping until I had finished building a synthesizer with it.

I got to apply a lot of prior knowledge from producing electronic music, so this project was a lot of fun. It was easy to get sounds going but it was challenging to think up a structure that would allow me to apply an envelope to the sound and to play multiple notes at the same time, because I was initially thinking of creating one to three oscillators per note, having them constantly running, and turning their gains on and off depending on which keys the user is currently pressing down on. I changed to an approach in which each note played is an instance of a class, a class which comes with functions that start and stop an oscillator, with timing based on envelope variable inputs. This was based on a web synth I came across that someone had built in Vue (will link if I find it again). From looking at other web synths I also came across an amazing package called qwerty-hancock which solved most of the challenges around creating a keyboard.

One of the other main questions I set out with was where in the react app to put the main logic concerning the webaudio audiocontext and the keyboard. If the component with the audiocontext logic or keyboard in it were to re-render, it would generate a new audiocontext, and its variable would not refer to the previous audiocontext, thus cutting off the keyboard from controlling them. The use of regular variables to store what should be state values felt very un-react-ish. The model I ended up running with was putting all the audiocontext and keyboard logic into one large logic component, which imported into it a ton of presentational components, passing down functions to all of the presentational components that allowed them to control different parts of the audiocontext. Each control component receives initial values based on the audiocontext and updates its own state values to display every time it updates the audiocontext. This pattern inspired my next project, fm-synth, where I took all of this logic and put it into a react context which essentially does the same thing but in a more centralized fashion, which feels much more 'react-ish' for some reason.

The next challenge I ran into was the chord analysis. I really wanted the panda's face to change expression based on the chord being played. Most search results gave me python algorithms that were way more intense than what I needed. I found a website called ChordFinder by Matt Rice, which had a working algorithm. And in JavaScript! Beautiful JavaScript! Adapting Matt's code to my project was basically just taking out the jquery dom manipulation and instead just returning a chord name, instead of setting the innerHTML of an element with it.

I made the distortion I effect using an algorithm from here http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

And I made the various kinds of noise using this method https://noisehack.com/generate-noise-web-audio-api/

I also used Pizzicato.js effects because it has a flanger (everyone loves flanger). Pizzicato was also used for the ping pong delay, reverb II, distortion II, quadrafuzz, ring modulator, and the low pass filter connected to the mousefield's y axis.

I used the wonderful react-spring animation library to make the color changes of the mousefield/lfo control component nice and smooth.

### Things I would like to implement in the future on this project or other synths:

- monophone option
- portmento
- an eq made of multiple filters
- fm synthesis
- different reverb impulses
- more reverb control in general
- bpm and synchronized LFOs
