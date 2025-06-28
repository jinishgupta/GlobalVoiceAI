import { useState } from 'react';
import example from '../assets/example.avif';

const faqs = [
  {
    q: 'What are the supported input formats?',
    a: 'The API accepts the following input audio formats: WAV, MP3, ALAW, ULAW, FLAC.'
  },
  {
    q: 'What are the supported output formats?',
    a: 'WAV (Default), MP3, FLAC, ALAW, and ULAW. The endpoint offers the same range of sample rates and channel types as the Speech Synthesis endpoint.'
  },
  {
    q: 'What is the input file limit?',
    a: 'The maximum input file length is 1 minute. If "retain prosody" is set to true and "retain accent" is set to false, the limit is 35 seconds.'
  },
  {
    q: 'Can I get a transcript of the audio?',
    a: 'Yes! If you enable the "return transcription" option, a transcript will be generated for you.'
  },
  {
    q: 'Can I edit the transcription?',
    a: 'Yes, you can manually edit the transcription. However, manual transcription input will not work if both "retain prosody" and "retain accent" are set to true.'
  },
];

const accentGradient = "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400";
const accentText = "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 bg-clip-text text-transparent";

export default function Examples() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-vibrant-blue text-white py-20">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover opacity-30" 
            src={example} 
            alt="AI global network" 
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">GlobalVoice AI Examples</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">See real-world demos of Murf API features: voice changing, speech customization, and more.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Speech Customization Gallery */}
        <section>
          <h2 className={`text-3xl font-bold mb-6 ${accentText}`}>Speech Customization Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Styles Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-pink-200 p-6 flex flex-col gap-6">
              <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">Styles</span>
              <div>
                <p className="font-semibold mb-1">Sad</p>
                <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/styles/ken-sad-1.wav" />
              </div>
              <div>
                <p className="font-semibold mb-1">Angry</p>
                <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/styles/ken-angry-1.wav" />
              </div>
            </div>
            {/* Pronunciation Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-6 flex flex-col gap-6">
              <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">Pronunciation Correction</span>
              <div>
                <p className="font-semibold mb-1">wound (before)</p>
                <audio controls src="https://murf.ai/public-assets/Blog/2023/010223/SubBlock_Wound_before_P.mp3" />
                </div>
              <div>
                <p className="font-semibold mb-1">wound (after)</p>
                <audio controls src="https://murf.ai/public-assets/Blog/2023/010223/Block_Wound.mp3" />
              </div>
            </div>
            {/* MultiNative Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6 flex flex-col gap-6">
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">MultiNative Demo</span>
              <div>
                <p className="font-semibold mb-1">Without MultiNative Locale</p>
                <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/multi-native/natalie-croissant-en-US.wav" />
                  </div>
                  <div>
                <p className="font-semibold mb-1">With MultiNative Locale</p>
                <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/multi-native/natalie-croissant-fr-FR.wav" />
                  </div>
                </div>
            {/* Speed & Pitch Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6 flex flex-col gap-6">
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">Speed & Pitch</span>
              <div>
                <p className="font-semibold mb-1">Default Speed</p>
                <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/speed-pitch/speed-pitch-ken-normal.wav" />
              </div>
              <div>
                <p className="font-semibold mb-1">High Speed</p>
                <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/speed-pitch/speed-ken-fast.wav" />
              </div>
              <div>
                <p className="font-semibold mb-1">Low Pitch</p>
                <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/speed-pitch/pitch-ken-low.wav" />
              </div>
            </div>
          </div>
        </section>
        {/* Code Playground */}
        <section>
          <h2 className={`text-3xl font-bold mb-6 ${accentText}`}>Code Playground</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-200 p-6">
              <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">Python</span>
              <h3 className="font-semibold mb-2">Python Example</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto"><code>{`from murf import Murf\nclient = Murf()\nres = client.text_to_speech.generate(\n    text=\"What color is the sky?\",\n    voice_id=\"en-US-ariana\",\n)`}</code></pre>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-6">
              <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">Javascript</span>
              <h3 className="font-semibold mb-2">Javascript Example</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto"><code>{`import axios from \"axios\";\nconst data = {\n  text: \"¡Ay, mi amor! ¡Ay, mi amor!\",\n  voiceId: \"es-MX-valeria\",\n};\naxios.post(\"https://api.murf.ai/v1/speech/generate\", data, { headers: { \"Content-Type\": \"application/json\", Accept: \"application/json\", \"api-key\": process.env.MURF_API_KEY, }, }).then((response) => { console.log(response.data.audioFile); });`}</code></pre>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-pink-200 p-6 md:col-span-2">
              <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">cURL</span>
              <h3 className="font-semibold mb-2">cURL Example</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto"><code>{`curl -X POST https://api.murf.ai/v1/speech/generate \\\n     -H \"api-key: $MURF_API_KEY\" \\\n     -H \"Content-Type: application/json\" \\\n     -d '{\n  \"text\": \"du sagst mir, dass es rot ist\",\n  \"voiceId\": \"de-DE-matthias\"\n}'`}</code></pre>
        </div>
      </div>
        </section>
        {/* FAQ */}
        <section>
          <h2 className={`text-3xl font-bold mb-6 ${accentText}`}>FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.q} className="bg-white rounded-xl shadow p-4 border-l-4 border-indigo-300">
                <button className="w-full text-left font-semibold text-indigo-700 flex justify-between items-center" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  {faq.q}
                  <span>{openFaq === idx ? '-' : '+'}</span>
                </button>
                {openFaq === idx && <div className="mt-2 text-gray-700">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}