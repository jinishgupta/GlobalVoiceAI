import React, { useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckCircle, XCircle, Clock, AlertTriangle, FileText, Languages, Calendar, ArrowLeft, Volume2 } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

const StatusBadge = ({ status }) => {
    let color = 'bg-gray-400';
    let text = status;
    if (status === 'COMPLETED') { color = 'bg-green-500'; text = 'Completed'; }
    else if (status === 'PROCESSING') { color = 'bg-blue-500'; text = 'Processing'; }
    else if (status === 'PENDING') { color = 'bg-gray-500'; text = 'Pending'; }
    else if (status === 'FAILED') { color = 'bg-red-500'; text = 'Failed'; }
    return <span className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${color}`}>{text}</span>;
};

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function AudioWaveform({ audioUrl }) {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    useEffect(() => {
        if (!audioUrl) return;
        if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
        }
        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#60a5fa',
            progressColor: '#2563eb',
            height: 48,
            barWidth: 2,
            responsive: true,
        });
        wavesurferRef.current.load(audioUrl);
        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy();
            }
        };
    }, [audioUrl]);
    return <div ref={waveformRef} className="w-full h-12 mb-2" />;
}

const TTSProjectEditor = () => {
  const { jobId } = useParams();
  const { ttsJobs, ttsJobsLoading } = useSelector((state) => state.tts);
  const job = ttsJobs.find(j => j.jobId === jobId);

  if (ttsJobsLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">Loading TTS project...</div>;
  }
  if (!job) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">TTS Project not found.</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-blue-50 font-sans">
      {/* Left Panel: Project Details */}
      <aside className="w-80 bg-white border-r p-6 flex flex-col space-y-6 sticky top-0 h-screen shadow-md z-10">
        <Link to="/projects" className="flex items-center text-sm font-semibold text-gray-500 hover:text-vibrant-blue">
          <ArrowLeft size={16} className="mr-2" /> Back to Projects
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-800 truncate">{job.projectName}</h2>
          <div className="flex items-center gap-2 mt-2">
            <StatusBadge status={job.status} />
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <div className="flex items-start">
            <Languages size={16} className="mr-3 mt-1 text-gray-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-600">Source Language</p>
              <p className="text-gray-500">{job.sourceLocale}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Languages size={16} className="mr-3 mt-1 text-gray-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-600">Target Language</p>
              <p className="text-gray-500">{job.targetLocale}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar size={16} className="mr-3 mt-1 text-gray-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-600">Created</p>
              <p className="text-gray-500">{new Date(job.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content: TTS Results */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">TTS Project Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border p-6 flex flex-col gap-4 relative group">
            <div className="flex items-center gap-3 mb-2">
              <StatusBadge status={job.status} />
              <span className="font-bold text-lg text-gray-800">{job.targetLocale}</span>
              <span className="ml-auto text-xs text-gray-400"><Volume2 size={16} /></span>
            </div>
            {job.ttsAudioUrl && <AudioWaveform audioUrl={job.ttsAudioUrl} />}
            {job.ttsAudioUrl && <audio controls src={job.ttsAudioUrl} className="w-full max-w-xs mb-2" />}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-gray-400" />
                <span className="font-semibold text-gray-700">Original Script</span>
                <button className="ml-auto px-2 py-1 text-xs bg-vibrant-blue text-white rounded hover:bg-vibrant-orange transition-colors" onClick={() => copyToClipboard(job.originalScript)}>Copy</button>
              </div>
              <pre className="bg-gray-50 border rounded p-3 text-xs text-gray-700 whitespace-pre-wrap">{job.originalScript}</pre>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-gray-400" />
                <span className="font-semibold text-gray-700">Translated Script</span>
                <button className="ml-auto px-2 py-1 text-xs bg-vibrant-blue text-white rounded hover:bg-vibrant-orange transition-colors" onClick={() => copyToClipboard(job.translatedScript)}>Copy</button>
              </div>
              <pre className="bg-gray-50 border rounded p-3 text-xs text-gray-700 whitespace-pre-wrap">{job.translatedScript}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TTSProjectEditor; 