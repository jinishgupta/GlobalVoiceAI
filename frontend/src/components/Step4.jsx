import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Step4({ mode, script, uploadedFile, selectedLanguages, projectName, originalLang, handleSubmit, selectedLanguage, voiceId, style, rate, pitch, variation, multiNativeLocale, pronunciationDictionary }) {
    return (
        <div>
            {/* Locked mode display */}
            <div className="flex justify-center mb-8 gap-4">
                <button
                    className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all ${mode === 'upload' ? 'bg-vibrant-blue text-white border-vibrant-blue' : 'bg-white text-gray-700 border-gray-300'} cursor-not-allowed`}
                    type="button"
                    disabled
                >
                    Upload File
                </button>
                <button
                    className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all ${mode === 'script' ? 'bg-vibrant-blue text-white border-vibrant-blue' : 'bg-white text-gray-700 border-gray-300'} cursor-not-allowed`}
                    type="button"
                    disabled
                >
                    Enter Script
                </button>
            </div>
            {/* Review Content */}
            <div className="space-y-6 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-center text-gray-800">Review Your Project</h3>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Project Name:</p>
                        <p className="text-gray-800">{projectName || <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Original Language:</p>
                        <p className="text-gray-800">{originalLang || <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                    {mode === "upload" && (<>
                    <div className="flex justify-between items-center pb-4 border-b">
                            <p className="font-semibold text-gray-700">Content File:</p>
                            <div className="flex items-center gap-2 text-gray-800">
                                {mode === 'upload' && uploadedFile ? (
                                    <span>{uploadedFile.name}</span>
                                ) : (
                                    <span className='italic text-gray-400'>No file uploaded</span>
                                )}
                            </div>
                        </div><div>
                            <p className="font-semibold text-gray-700 mb-2">Target Languages ({selectedLanguages.length}):</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedLanguages.length > 0 ? selectedLanguages.map(l => (
                                    <span key={l.locale} className="px-3 py-1 text-sm bg-vibrant-blue text-white rounded-full flex items-center gap-2">{l.flag} {l.name} <span className='ml-1 text-xs text-white/70'>({l.locale})</span></span>
                                )) : <p className="text-sm text-gray-500">No languages selected.</p>}
                            </div>
                        </div></>
                    )}
                    {mode === "script" && (<>
                        <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Script:</p>
                        <p className="text-gray-800">{script || <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                        <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Target Language:</p>
                        <p className="text-gray-800">{selectedLanguage || <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                        <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Voice ID:</p>
                        <p className="text-gray-800">{voiceId || <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                        <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Style:</p>
                        <p className="text-gray-800">{style || <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                        <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Rate (Speed):</p>
                        <p className="text-gray-800">{rate !== undefined ? rate : <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                        <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Pitch:</p>
                        <p className="text-gray-800">{pitch !== undefined ? pitch : <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                        <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">Variation:</p>
                        <p className="text-gray-800">{variation !== undefined ? variation : <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                        <div className="flex justify-between items-center pb-4 border-b">
                        <p className="font-semibold text-gray-700">MultiNative Locale:</p>
                        <p className="text-gray-800">{multiNativeLocale || <span className='italic text-gray-400'>Not set</span>}</p>
                    </div>
                        <div className="flex flex-col pb-4 border-b">
                        <p className="font-semibold text-gray-700">Pronunciation Dictionary:</p>
                        <pre className="bg-gray-100 rounded p-2 text-xs text-gray-700 whitespace-pre-wrap">{pronunciationDictionary || <span className='italic text-gray-400'>Not set</span>}</pre>
                    </div>
                        </>)}
                </div>
            </div>
        </div>
    );
}

export default Step4;