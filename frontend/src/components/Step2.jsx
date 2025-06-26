import React, { useState } from 'react';

function Step2({ script, setScript, uploadedFile, setUploadedFile, mode: controlledMode, setMode: controlledSetMode }) {
    const [internalMode, setInternalMode] = useState('upload');
    const mode = controlledMode !== undefined ? controlledMode : internalMode;
    const setMode = controlledSetMode !== undefined ? controlledSetMode : setInternalMode;
    return (
        <div>
            <div className="flex justify-center mb-8 gap-4">
                <button
                    className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all ${mode === 'upload' ? 'bg-vibrant-blue text-white border-vibrant-blue' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    onClick={() => setMode('upload')}
                    type="button"
                >
                    Upload File
                </button>
                <button
                    className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all ${mode === 'script' ? 'bg-vibrant-blue text-white border-vibrant-blue' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    onClick={() => setMode('script')}
                    type="button"
                >
                    Enter Script
                </button>
            </div>

            {mode === 'upload' ? (
                <div className="w-full p-12 border-2Helloff border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-vibrant-blue bg-gray-50 hover:bg-white transition-colors">
                    <input
                        type="file"
                        className="mt-4"
                        accept=".mp4,.mov,.mp3,.wav,.txt"
                        onChange={e => setUploadedFile(e.target.files[0] || null)}
                    />
                    {uploadedFile && (
                        <div className="mt-2 text-sm text-gray-700">Selected file: <span className="font-semibold">{uploadedFile.name}</span></div>
                    )}
                </div>
            ) : (
                <div className="space-y-6 max-w-lg mx-auto">
                    <div>
                        <label htmlFor="script" className="block text-sm font-medium text-gray-700 mb-2">Paste script text</label>
                        <textarea
                            id="script"
                            rows="5"
                            placeholder="Enter your script here..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                            value={script}
                            onChange={e => setScript(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Step2;