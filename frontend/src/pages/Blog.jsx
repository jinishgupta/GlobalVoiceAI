import { useState } from 'react';
import blog from '../assets/blog.avif';

const accentGradient = "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400";
const accentText = "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 bg-clip-text text-transparent";

const blogPosts = [
  {
    title: 'Speech Customization',
    subtitle: 'Discover how to adjust voice settings to create a distinctive and expressive voice for your application.',
    excerpt: "Murf's AI models not only generate natural-sounding speech quickly but also give you powerful customization controls to shape the output with precision and personality...",
    category: 'How-To Guide',
    author: 'Murf API',
    date: 'June 2025',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    borderColor: 'border-indigo-200',
    content: (
      <div className="prose max-w-none">
        <h2>Voices</h2>
        <p>Murf offers a diverse collection of <b>150+ AI voices</b> across different accents, genders, and speaking styles—designed to suit a wide range of use cases from narration and marketing to training and conversation...</p>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto"><code>{`from murf import Murf
client = Murf()
res = client.text_to_speech.generate(
    text="What color is the sky?",
    voice_id="en-US-ariana",
)`}</code></pre>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto"><code>{`import axios from "axios";
const data = {
  text: "¡Ay, mi amor! ¡Ay, mi amor!",
  voiceId: "es-MX-valeria",
};
axios.post("https://api.murf.ai/v1/speech/generate", data, { headers: { "Content-Type": "application/json", Accept: "application/json", "api-key": process.env.MURF_API_KEY, }, }).then((response) => { console.log(response.data.audioFile); });`}</code></pre>
        <h3>Styles</h3>
        <p>Murf Styles enable developers to fine-tune voice output for different contexts. Each voice supports multiple predefined styles that modify tone, emotional inflection, and delivery patterns...</p>
        <div className="flex gap-6 my-4">
          <div>
            <p className="font-semibold mb-1">Sad</p>
            <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/styles/ken-sad-1.wav" />
          </div>
          <div>
            <p className="font-semibold mb-1">Angry</p>
            <audio controls src="httpsurf.ai/public-assets/misc/example_audio/voices/styles/ken-angry-1.wav" />
          </div>
        </div>
        <h3>Pronunciations</h3>
        <p>Our custom pronunciation feature lets you adjust how words are spoken to perfectly match your context or accent preferences...</p>
        <div className="flex gap-6 my-4">
          <div>
            <p className="font-semibold mb-1">wound (before)</p>
            <audio controls src="https://murf.ai/public-assets/Blog/2023/010223/SubBlock_Wound_before_P.mp3" />
          </div>
          <div>
            <p className="font-semibold mb-1">wound (after)</p>
            <audio controls src="https://murf.ai/public-assets/Blog/2023/010223/Block_Wound.mp3" />
          </div>
        </div>
        <h3>MultiNative</h3>
        <div className="flex gap-6 my-4">
          <div>
            <p className="font-semibold mb-1">Without MultiNative Locale</p>
            <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/multi-native/natalie-croissant-en-US.wav" />
          </div>
          <div>
            <p className="font-semibold mb-1">With MultiNative Locale</p>
            <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/multi-native/natalie-croissant-fr-FR.wav" />
          </div>
        </div>
        <h3>Pauses</h3>
        <audio controls src="https://murf.ai/public-assets/misc/example_audio/voices/pause/pause-1s-terrell.wav" />
        <h3>Speed & Pitch</h3>
        <div className="flex gap-6 my-4">
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
    ),
  },
  {
    title: 'Voice Changer',
    subtitle: 'Transform any voice recording with a new voice using our voice conversion technology.',
    excerpt: "Murf's Voice Changer API lets you transform your existing audio into high-quality, lifelike AI voices from Murf. You can change who's speaking, adjust the speed, pitch, and tone, and even apply different speaking styles...",
    category: 'Product Feature',
    author: 'Murf API',
    date: 'June 2025',
    badgeColor: 'bg-pink-100 text-pink-700',
    borderColor: 'border-pink-200',
    content: (
      <div className="prose max-w-none">
        <h2>Quickstart</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto"><code>{`from murf import Murf
client = Murf(api_key="YOUR_API_KEY")
file_path = "PATH_TO_YOUR_FILE"
response = client.voice_changer.convert(
  voice_id="en-US-terrell",
  file=open(file_path, "rb"),
  retain_prosody=True,
  retain_accent=True
)
print(response.audio_file)`}</code></pre>
        <h3>Retain Prosody</h3>
        <div className="flex gap-6 my-4">
          <div>
            <p className="font-semibold mb-1">Input Sample</p>
            <audio controls src="https://murf.ai/public-assets/misc/example_audio/voice_changer/women_original_voice.mp3" />
          </div>
          <div>
            <p className="font-semibold mb-1">With Retain Prosody</p>
            <audio controls src="https://murf.ai/public-assets/misc/example_audio/voice_changer/women_simw_voice.mp3" />
          </div>
        </div>
        <h3>Retain Accent</h3>
        <div className="flex gap-6 my-4">
          <div>
            <p className="font-semibold mb-1">Input Sample</p>
            <audio controls src="https://murf.ai/public-assets/misc/example_audio/voice_changer/man_original_voice.mp3" />
          </div>
          <div>
            <p className="font-semibold mb-1">With Retain Prosody & Accent</p>
            <audio controls src="https://murf.ai/public-assets/misc/example_audio/voice_changer/man_VC.mp3" />
          </div>
        </div>
        <h3>FAQ</h3>
        <ul className="list-disc ml-6">
          <li><b>Supported input formats:</b> WAV, MP3, ALAW, ULAW, FLAC.</li>
          <li><b>Supported output formats:</b> WAV (Default), MP3, FLAC, ALAW, ULAW.</li>
          <li><b>Input file limit:</b> 1 minute (or 35s with only accent transfer).</li>
          <li><b>Transcription:</b> Enable "return transcription" to get a transcript of the audio.</li>
        </ul>
      </div>
    ),
  },
];

export default function Blog() {
  const [open, setOpen] = useState(null);
  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-vibrant-blue text-white py-20">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover opacity-30" 
            src={blog}
            alt="Modern AI blog background" 
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">GlobalVoice AI Blog</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">Insights on AI, content creation, and global marketing. Your expert resource for mastering localization.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold mb-10 ${accentText}`}>Featured Articles</h2>
        <div className="grid gap-12 md:grid-cols-2">
          {blogPosts.map((post, idx) => (
            <div key={post.title} className={`flex flex-col rounded-2xl shadow-lg bg-white overflow-hidden group border-2 ${post.borderColor}`}>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <span className={`inline-block ${post.badgeColor} px-3 py-1 rounded-full text-xs font-semibold mb-2`}>{post.category}</span>
                  <h2 className="text-2xl font-bold mb-1 text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">{post.title}</h2>
                  <p className="text-gray-600 mb-2">{post.subtitle}</p>
                  <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
                  <button onClick={() => setOpen(idx)} className="text-indigo-600 font-semibold hover:underline">Read More →</button>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-200 via-pink-200 to-purple-200 flex items-center justify-center font-bold text-indigo-600">{post.author[0]}</div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for full article */}
      {open !== null && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg p-8 overflow-y-auto max-h-[90vh] relative border-2 border-indigo-200">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600 text-2xl" onClick={() => setOpen(null)}>&times;</button>
            <h2 className={`text-3xl font-bold mb-2 ${accentText}`}>{blogPosts[open].title}</h2>
            <p className="text-lg text-gray-600 mb-6">{blogPosts[open].subtitle}</p>
            {blogPosts[open].content}
          </div>
        </div>
      )}
    </div>
  );
}