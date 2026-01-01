import React, { useState } from 'react';

interface Track {
  id: string;
  name: string;
  instrument: string;
  color: string;
  muted: boolean;
  solo: boolean;
}

const GarageBand: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([
    { id: '1', name: 'Drums', instrument: '🥁', color: 'bg-orange-500', muted: false, solo: false },
    { id: '2', name: 'Bass', instrument: '🎸', color: 'bg-blue-500', muted: false, solo: false },
    { id: '3', name: 'Piano', instrument: '🎹', color: 'bg-purple-500', muted: false, solo: false },
    { id: '4', name: 'Synth', instrument: '🎛️', color: 'bg-green-500', muted: false, solo: false },
  ]);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const toggleMute = (id: string) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, muted: !t.muted } : t));
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Transport */}
      <div className="h-14 bg-gray-800 flex items-center px-4 gap-4 border-b border-gray-700">
        <button 
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
        >
          {playing ? '⏸️' : '▶️'}
        </button>
        <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
          ⏹️
        </button>
        <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500">
          ⏺️
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">BPM:</span>
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-16 bg-gray-700 px-2 py-1 rounded text-center"
          />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Library */}
        <div className="w-48 bg-gray-800 border-r border-gray-700 p-4">
          <div className="text-sm font-semibold text-gray-400 mb-3">INSTRUMENTS</div>
          {['🎹 Keyboard', '🎸 Guitar', '🥁 Drums', '🎷 Horns', '🎻 Strings', '🎛️ Synth'].map(inst => (
            <div key={inst} className="py-2 px-2 hover:bg-gray-700 rounded cursor-pointer text-sm">
              {inst}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="flex-1 flex flex-col">
          {/* Ruler */}
          <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-end px-32">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(bar => (
              <div key={bar} className="flex-1 text-xs text-gray-500 border-l border-gray-600 pl-1">
                {bar}
              </div>
            ))}
          </div>

          {/* Tracks */}
          <div className="flex-1 overflow-auto">
            {tracks.map(track => (
              <div key={track.id} className="flex h-20 border-b border-gray-700">
                {/* Track Header */}
                <div className="w-32 bg-gray-800 p-2 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span>{track.instrument}</span>
                    <span className="text-sm font-medium">{track.name}</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    <button 
                      onClick={() => toggleMute(track.id)}
                      className={`text-xs px-2 py-0.5 rounded ${track.muted ? 'bg-yellow-600' : 'bg-gray-600'}`}
                    >
                      M
                    </button>
                    <button className="text-xs px-2 py-0.5 rounded bg-gray-600">S</button>
                  </div>
                </div>
                {/* Track Lane */}
                <div className="flex-1 bg-gray-900 relative">
                  <div className={`absolute top-2 left-4 right-4 bottom-2 ${track.color} opacity-60 rounded`}>
                    {/* Audio waveform visualization */}
                    <div className="h-full flex items-center justify-center opacity-50">
                      ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁▂▃▄▅▆▇
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageBand;
