import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const data = [
  { keyCode: 81, id: 'Heater 1', letter: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { keyCode: 87, id: 'Heater 2', letter: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { keyCode: 69, id: 'Heater 4', letter: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { id: 'Heater 3', letter: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { id: 'Clap', letter: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { id: 'Open Hi-Hat', letter: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { id: 'hKick n Hat', letter: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { id: 'Kick', letter: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { id: 'Closed Hi-Hat', letter: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
]

function App() {
  const [display, setDisplay] = useState("Click a button!")

  const handleClick = event => {
    const audio = event.target.querySelector('audio')
    let playPromise = audio.play()
    if(playPromise !== 'undefined') {
          playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
    }
    audio.currentTime = 0
    setDisplay(audio.id)
  }

  useEffect (() => {
    document.addEventListener('keydown', handler);
    return () => {
    document.removeEventListener('keydown', handler)
  }});

  const handler = (event) => {
    let letters = data.map(button => {
      return button.letter
    })
    for(const letter of letters) {
      if(event.keyCode === letter.charCodeAt()) {
        handleClick(event)
      }
    }
  }

  return (
    <div className="App">
      <Container id="drum-machine" style={{ display: 'flex', justifyContent: 'center', fontSize: 30, marginTop: '25vh' }}>
        <div id="display">
          {display}
          <div id="drum-pads">
            {data.map((button, index) => (
              <Button 
              name={button.id} 
              className="drum-pad" 
              key={index} 
              id={button.id} 
              size="lg" 
              variant="secondary"
              onClick={handleClick}>
                {button.letter}
                <audio src={button.src} id={button.letter} className="clip"></audio>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
