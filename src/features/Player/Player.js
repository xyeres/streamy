import { useEffect, useState } from 'react';
import sound from '../../media/music/song.mp3'


export default function Player() {
  // use Audio constructor to create HTMLAudioElement
  const audioTune = new Audio(sound);

  // variable to play audio in loop
  const [playInLoop, setPlayInLoop] = useState(false);

  // load audio file on component load
  useEffect(() => {
    audioTune.load();
    return () => {
      audioTune.pause()
    }
  }, [])

  // set the loop of audio tune
  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop])

  // play audio sound
  const playSound = () => {
    if (audioTune.HAVE_FUTURE_DATA) {
      audioTune.play();
    }
    
  }

  // pause audio sound
  const pauseSound = () => {
    audioTune.pause();
  }

  // stop audio sound
  const stopSound = () => {
    audioTune.pause();
    audioTune.currentTime = 0;
  }

  return (
    <div className="p-10">
      <h3 className="mb-4">Play an mp3 file - <a href="https://www.cluemediator.com">Clue Mediator</a></h3>

      <button type="button" className="border border-red-200 bg-blue-600 text-white rounded-lg px-2 mr-4 " value="Play" onClick={playSound}>Play</button>
      <button type="button" className="border border-red-200 bg-blue-600 text-white rounded-lg px-2 mr-4 " value="Pause" onClick={pauseSound}>Pause</button>
      <button type="button" className="border border-red-200 bg-blue-600 text-white rounded-lg px-2 mr-4 " value="Stop" onClick={stopSound}>Stop</button>

      <label><input type="checkbox" checked={playInLoop} onChange={e => setPlayInLoop(e.target.checked)} /> Play in Loop</label>
    </div>
  );
}
