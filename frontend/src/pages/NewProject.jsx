import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faCloudUploadAlt, faLanguage, faCheckCircle, faArrowRight, faArrowLeft, faFileAudio, faFileVideo, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { dubWithJob } from '../store/dubbingSlice';
import { useDispatch, useSelector } from 'react-redux';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import { getTTS, saveTTSProject } from '../store/ttsSlice';
import { getTranslate } from '../store/translateSlice';

const steps = [
  { name: 'Project Details', icon: faProjectDiagram },
  { name: 'Upload Content', icon: faCloudUploadAlt },
  { name: 'Target Languages', icon: faLanguage },
  { name: 'Review & Create', icon: faCheckCircle },
];

const sourceLanguages = [
  { name: 'Auto-Detect', locale: '' },
  { name: 'English (US & Canada)', locale: 'en_US' },
  { name: 'English (UK)', locale: 'en_UK' },
  { name: 'French', locale: 'fr_FR' },
  { name: 'German', locale: 'de_DE' },
  { name: 'Spanish', locale: 'es_ES' },
  { name: 'Italian', locale: 'it_IT' },
  { name: 'Portuguese', locale: 'pt_BR' },
  { name: 'Polish', locale: 'pl_PL' },
  { name: 'Hindi', locale: 'hi_IN' },
  { name: 'Korean', locale: 'ko_KR' },
  { name: 'Japanese', locale: 'ja_JP' },
  { name: 'Mandarin (Chinese)', locale: 'zh_CN' },
  { name: 'Dutch', locale: 'nl_NL' },
  { name: 'Finnish', locale: 'fi_FI' },
  { name: 'Russian', locale: 'ru_RU' },
  { name: 'Turkish', locale: 'tr_TR' },
  { name: 'Ukrainian', locale: 'uk_UA' },
];

function NewProject() {
  const [step, setStep] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [originalLang, setOriginalLang] = useState("");
  const [script, setScript] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [ttsResult, setTtsResult] = useState(null);
  const [mode, setMode] = useState('upload');
  const [voiceId, setVoiceId] = useState('');
  const [style, setStyle] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsError, setTtsError] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleSubmit = async () => {
    if (mode === "upload" && uploadedFile) {
      if (!projectName.trim()) {
        alert('Please enter a project name');
        return;
      }
      if (!uploadedFile && !script) {
        alert('Please upload a file or enter a script');
        return;
      }
      if (selectedLanguages.length === 0) {
        alert('Please select at least one target language');
        return;
      }

      const targetLocales = selectedLanguages.map(l => l.locale);

      try {
        const response = await dispatch(dubWithJob({
          file: uploadedFile,
          projectName,
          target_locales: targetLocales,
          source_locale: originalLang,
          priority: 'NORMAL',
        }));
        if (response && response.payload && response.payload.success) {
          console.log('Dubbing job created successfully:', response.payload.data);
          // Navigate to project editor or show success message
          navigate('/project-editor/' + response.payload.data.job_id);

        } else {
          const errorMessage = response?.payload?.message || response?.payload?.error || 'Unknown error occurred';
          console.error("Error creating dubbing job:", errorMessage);
          alert('Failed to create dubbing job: ' + errorMessage);
        }
      } catch (error) {
        console.error("Error creating dubbing job:", error);
        alert('Failed to create dubbing job. Please try again.');
      }
    } else if (mode === "script" && script) {
      console.log("script mode ");
      setTtsLoading(true);
      setTtsError('');
      setAudioUrl(null);
      try {
        const data = await dispatch(getTTS({ text: script, voiceId, style }));
        console.log("TTS data received:", data);
        const response = await dispatch(getTranslate({ text: script, targetLanguage: selectedLanguage }));
        console.log("Translation data received:", response);
        setTtsLoading(false);
        if (data && data.payload && data.payload.audioFile) {
          const safeSourceLocale = originalLang ? originalLang : 'Auto-Detect';
          dispatch(saveTTSProject({ projectName, script, sourceLocale: safeSourceLocale, targetLocale: selectedLanguage, transcript: response.payload.translations[0].translated_text, audioUrl: data.payload.audioFile }))
          .then((res) => {
            console.log('Project saved successfully:', res);
            navigate('/dashboard')});
        } else {
          setTtsError('Failed to generate audio. Please try again.');
        }
      } catch (error) {
        setTtsLoading(false);
        setTtsError('Failed to generate audio. Please try again.');
      }
    }
  }

  const renderContent = () => {
    switch (step) {
      case 0: // Project Details
        return (
          <div className="space-y-6 max-w-lg mx-auto">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input
                id="projectName"
                type="text"
                placeholder="e.g. Q4 Marketing Videos"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="originalLang" className="block text-sm font-medium text-gray-700 mb-2">Original Language</label>
              <select
                id="originalLang"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                value={originalLang}
                onChange={e => setOriginalLang(e.target.value)}
              >
                {sourceLanguages.map(lang => (
                  <option key={lang.locale} value={lang.locale}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        );
      case 1: // Upload Content
        return (
          <Step2
            script={script}
            setScript={setScript}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            ttsResult={ttsResult}
            setTtsResult={setTtsResult}
            mode={mode}
            setMode={setMode}
          />
        );
      case 2: // Target Languages
        return (
          <Step3
            mode={mode}
            script={script}
            uploadedFile={uploadedFile}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            voiceId={voiceId}
            setVoiceId={setVoiceId}
            style={style}
            setStyle={setStyle}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
        );
      case 3: // Review & Create
        return (
          <Step4
            mode={mode}
            script={script}
            uploadedFile={uploadedFile}
            selectedLanguages={selectedLanguages}
            projectName={projectName}
            originalLang={originalLang}
            handleSubmit={handleSubmit}
            selectedLanguage={selectedLanguage}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Create a New Localization Project</h1>
        <p className="text-gray-600 mt-1">Follow these simple steps to get started.</p>
      </header>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <div className="flex justify-between items-start mb-12">
          {steps.map((s, i) => (
            <>
              <div key={s.name} className="flex flex-col items-center w-1/4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all z-10 ${step >= i ? 'bg-vibrant-blue text-white border-vibrant-blue' : 'bg-white text-gray-400 border-gray-300'}`}>
                  <FontAwesomeIcon icon={s.icon} />
                </div>
                <p className={`mt-2 text-sm text-center font-semibold ${step >= i ? 'text-vibrant-blue' : 'text-gray-500'}`}>{s.name}</p>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-1 mt-6 -mx-4 ${step > i ? 'bg-vibrant-blue' : 'bg-gray-300'}`}></div>}
            </>
          ))}
        </div>
        <div className="min-h-[300px]">
          {renderContent()}
        </div>
        <div className="flex justify-between mt-10 pt-6 border-t">
          <button
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Previous
          </button>
          {step < steps.length - 1 ? (
            <button
              className="bg-vibrant-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-vibrant-orange transition-colors flex items-center"
              onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            >
              Next <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-vibrant-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-vibrant-blue transition-colors flex items-center"
            >
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              Create Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewProject; 