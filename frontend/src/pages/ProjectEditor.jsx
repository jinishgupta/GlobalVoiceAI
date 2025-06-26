import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById, getStatus } from '../store/dubbingSlice';
import { CheckCircle, XCircle, Clock, Download, AlertTriangle, FileText, Languages, Calendar, ArrowLeft } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

const StatusIcon = ({ status, size = "h-5 w-5" }) => {
    switch (status) {
        case 'COMPLETED': return <CheckCircle className={`${size} text-green-500`} />;
        case 'FAILED': return <XCircle className={`${size} text-red-500`} />;
        case 'PROCESSING': return <Clock className={`${size} text-blue-500 animate-spin`} />;
        case 'PENDING': return <Clock className={`${size} text-gray-500`} />;
        default: return <AlertTriangle className={`${size} text-yellow-500`} />;
    }
};

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

// Utility to convert SRT to plain text
function srtToPlainText(srt) {
    if (!srt) return '';
    return srt
        .replace(/\d+\n/g, '') // Remove line numbers
        .replace(/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/g, '') // Remove timestamps
        .replace(/\n{2,}/g, '\n') // Remove extra newlines
        .replace(/\n/g, ' ') // Replace newlines with space
        .replace(/ +/g, ' ') // Collapse multiple spaces
        .trim();
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

function ProjectEditor() {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const { jobDetails, jobDetailsLoading, jobDetailsError } = useSelector((state) => state.dubbing);
    
    useEffect(() => {
        if (jobId) {
            dispatch(fetchJobById(jobId));
        }
    }, [dispatch, jobId]);

    // Polling for job status
    useEffect(() => {
        if (!jobDetails || !jobDetails.status) return;
        if (jobDetails.status === 'COMPLETED' || jobDetails.status === 'FAILED') return;
        const interval = setInterval(() => {
            dispatch(getStatus(jobId)).then((res) => {
                // If job is completed or failed, fetch full job details and stop polling
                const status = res?.payload?.status;
                if (status === 'COMPLETED' || status === 'FAILED') {
                    dispatch(fetchJobById(jobId));
                    clearInterval(interval);
                }
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [dispatch, jobId, jobDetails?.status]);

    if (jobDetailsLoading) {
        return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">Loading project editor...</div>;
    }

    if (jobDetailsError) {
        return <div className="flex items-center justify-center h-screen bg-gray-100 text-red-500">Error: {jobDetailsError}</div>;
    }

    if (!jobDetails) {
        return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">Project not found.</div>;
    }

    const currentJob = jobDetails;

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-100 to-blue-50 font-sans">
            {/* Left Panel: Project Details */}
            <aside className="w-80 bg-white border-r p-6 flex flex-col space-y-6 sticky top-0 h-screen shadow-md z-10">
                <Link to="/projects" className="flex items-center text-sm font-semibold text-gray-500 hover:text-vibrant-blue">
                    <ArrowLeft size={16} className="mr-2" /> Back to Projects
                </Link>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 truncate">{currentJob.projectName}</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <StatusBadge status={currentJob.status} />
                    </div>
                </div>
                <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                        <FileText size={16} className="mr-3 mt-1 text-gray-400 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-600">Original File</p>
                            <p className="text-gray-500 break-all">{currentJob.originalFile}</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Languages size={16} className="mr-3 mt-1 text-gray-400 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-600">Source Language</p>
                            <p className="text-gray-500">{currentJob.sourceLocale}</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Calendar size={16} className="mr-3 mt-1 text-gray-400 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-gray-600">Created</p>
                            <p className="text-gray-500">{new Date(currentJob.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content: Dubbed Files */}
            <main className="flex-1 flex flex-col p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dubbing Results</h1>
                {currentJob.failureReason && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
                        <div className="flex">
                            <div className="py-1"><AlertTriangle className="h-5 w-5 text-red-400 mr-3" /></div>
                            <div>
                                <p className="font-bold text-red-800">Job Failed</p>
                                <p className="text-sm text-red-700">{currentJob.failureReason}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentJob.downloadDetails && currentJob.downloadDetails.length > 0 ? (
                        currentJob.downloadDetails.map((detail) => (
                            <div key={detail.locale} className="bg-white rounded-2xl shadow-lg border p-6 flex flex-col gap-4 relative group">
                                <div className="flex items-center gap-3 mb-2">
                                    <StatusBadge status={detail.status} />
                                    <span className="font-bold text-lg text-gray-800">{detail.locale}</span>
                                    <span className="ml-auto text-xs text-gray-400">{/* Placeholder for duration */}</span>
                                </div>
                                {/* Audio waveform placeholder */}
                                {detail.cloudinaryUrl && (
                                    <AudioWaveform audioUrl={detail.cloudinaryUrl} />
                                )}
                                {detail.cloudinaryUrl && (
                                    <audio controls src={detail.cloudinaryUrl} className="w-full max-w-xs mb-2" />
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {detail.downloadUrl && (
                                        <a href={detail.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 bg-vibrant-blue text-white rounded hover:bg-vibrant-orange transition-colors text-sm" title="Download original audio">
                                            <Download size={16} /> Original Audio
                                        </a>
                                    )}
                                    {detail.transcriptUrl && (
                                        <a href={detail.transcriptUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm" title="Download transcript">
                                            <FileText size={16} /> Download Transcript
                                        </a>
                                    )}
                                </div>
                                {detail.transcriptText && (
                                    <div className="mt-2 p-3 bg-gray-50 border rounded text-xs max-h-40 overflow-auto whitespace-pre-wrap relative">
                                        <strong className="block mb-1">Transcript Preview:</strong>
                                        <button
                                            className="absolute top-1 right-2 px-2 py-1 text-xs bg-vibrant-blue text-white rounded hover:bg-vibrant-orange transition-colors"
                                            onClick={() => copyToClipboard(srtToPlainText(detail.transcriptText))}
                                            title="Copy transcript to clipboard"
                                        >
                                        Copy
                                        </button>
                                        <pre className="whitespace-pre-wrap font-mono">{srtToPlainText(detail.transcriptText)}</pre>
                                    </div>
                                )}
                                {detail.status !== 'COMPLETED' && detail.errorMessage && (
                                    <p className="text-sm text-red-600">{detail.errorMessage}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-10">This job is processing and has no downloadable files yet.</p>
                    )}
                </div>
                {/* TTS Audio Section */}
                {currentJob.ttsAudioUrl && (
                  <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-bold text-blue-700 mb-2">Script TTS Audio</h2>
                    <AudioWaveform audioUrl={currentJob.ttsAudioUrl} />
                    <audio controls src={currentJob.ttsAudioUrl} className="w-full max-w-md mb-2" />
                    {currentJob.script && (
                      <div className="bg-white border rounded p-3 text-xs text-gray-700 max-w-md w-full">
                        <strong>Script:</strong>
                        <pre className="whitespace-pre-wrap font-mono mt-1">{currentJob.script}</pre>
                      </div>
                    )}
                  </div>
                )}
            </main>
        </div>
    );
};

export default ProjectEditor; 