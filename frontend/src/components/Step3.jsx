import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVoices } from '../store/ttsSlice.js';

function Step3({ mode, script, uploadedFile, selectedLanguages, setSelectedLanguages, voiceId, setVoiceId, style, setStyle, selectedLanguage, setSelectedLanguage, selectedGender, setSelectedGender }) {

    const [voices, setVoices] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [genders, setGenders] = useState([]);
    const [styles, setStyles] = useState([]);
    const [voiceOptions, setVoiceOptions] = useState([]);

    const availableLanguages = [
        { name: 'Arabic', locale: 'ar_SA', flag: '🇸🇦' },
        { name: 'Bengali', locale: 'bn_IN', flag: '🇮🇳' },
        { name: 'Dutch', locale: 'nl_NL', flag: '🇳🇱' },
        { name: 'English (UK)', locale: 'en_UK', flag: '🇬🇧' },
        { name: 'English (US & Canada)', locale: 'en_US', flag: '🇺🇸' },
        { name: 'French', locale: 'fr_FR', flag: '🇫🇷' },
        { name: 'German', locale: 'de_DE', flag: '🇩🇪' },
        { name: 'Hindi', locale: 'hi_IN', flag: '🇮🇳' },
        { name: 'Hungarian', locale: 'hu_HU', flag: '🇭🇺' },
        { name: 'Italian', locale: 'it_IT', flag: '🇮🇹' },
        { name: 'Japanese', locale: 'ja_JP', flag: '🇯🇵' },
        { name: 'Korean', locale: 'ko_KR', flag: '🇰🇷' },
        { name: 'Mandarin (Chinese)', locale: 'zh_CN', flag: '🇨🇳' },
        { name: 'Norwegian', locale: 'nb_NO', flag: '🇳🇴' },
        { name: 'Polish', locale: 'pl_PL', flag: '🇵🇱' },
        { name: 'Portuguese', locale: 'pt_BR', flag: '🇧🇷' },
        { name: 'Spanish', locale: 'es_ES', flag: '🇪🇸' },
        { name: 'Tamil', locale: 'ta_IN', flag: '🇮🇳' },
        { name: 'Indonesian', locale: 'id_ID', flag: '🇮🇩' },
        { name: 'Romanian', locale: 'ro_RO', flag: '🇷🇴' },
        { name: 'Croatian', locale: 'hr_HR', flag: '🇭🇷' },
        { name: 'Greek ', locale: 'el_GR', flag: '🇬🇷' },
        { name: 'Slovak', locale: 'sk_SK', flag: '🇸🇰' },
        { name: 'Finnish', locale: 'fi_FI', flag: '🇫🇮' },
        { name: 'Russian', locale: 'ru_RU', flag: '🇷🇺' },
        { name: 'Turkish', locale: 'tr_TR', flag: '🇹🇷' }
    ];

    const toggleLanguage = (lang) => {
        setSelectedLanguages(prev =>
            prev.some(l => l.locale === lang.locale)
                ? prev.filter(l => l.locale !== lang.locale)
                : [...prev, lang]
        );
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVoices())
            .then((data) => {
                if (data) {
                    const fetchedVoices = data.payload;
                    setVoices(fetchedVoices);

                    const uniqueLanguages = [];
                    const seen = new Set();

                    fetchedVoices.forEach(voice => {
                        const key = `${voice.locale}-${voice.displayLanguage}`;
                        if (!seen.has(key)) {
                            seen.add(key);
                            uniqueLanguages.push({
                                label: `${voice.displayLanguage} (${voice.locale})`,
                                value: voice.locale
                            });
                        }
                    });

                    setLanguages(uniqueLanguages);
                }
            })
            .catch((error) => {
                console.error('Error loading voices:', error);
            });
    }, []);

    const handleLanguageChange = (locale) => {
        setSelectedLanguage(locale);
        setSelectedGender('');
        setVoiceId('');
        setStyle('');

        const filteredVoices = voices.filter(v => v.locale === locale);
        const uniqueGenders = [...new Set(filteredVoices.map(v => v.gender))];
        setGenders(uniqueGenders);
    };

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
        setVoiceId('');
        setStyle('');

        const filteredVoices = voices.filter(v => v.locale === selectedLanguage && v.gender === gender);
        const options = filteredVoices.map(v => ({
            label: `${v.displayName} (${v.accent} Accent)`,
            value: v.voiceId,
            styles: v.availableStyles
        }));
        setVoiceOptions(options);
    };

    const handleVoiceChange = (selectedVoiceId) => {
        setVoiceId(selectedVoiceId);
        setStyle('');

        const selectedVoice = voiceOptions.find(v => v.value === selectedVoiceId);
        setStyles(selectedVoice?.styles || []);
    };

    const handleStyleChange = (selectedStyle) => {
        setStyle(selectedStyle);
    };

    return (
        <div>
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
            <div className="mb-8">
                {mode === 'upload' && uploadedFile && (
                    <div className="text-gray-700 text-center">Selected file: <span className="font-semibold">{uploadedFile.name}</span></div>
                )}
                {mode === 'script' && script && (
                    <div className="text-gray-700 text-center">Script: <span className="font-semibold">{script.length > 100 ? script.slice(0, 100) + '...' : script}</span></div>
                )}
            </div>
            {mode === 'upload' && uploadedFile && (
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
                        {availableLanguages.map(lang => (
                            <button
                                key={lang.locale}
                                onClick={() => toggleLanguage(lang)}
                                className={`p-4 rounded-lg text-left font-semibold border-2 transition-all flex items-center gap-4 ${selectedLanguages.some(l => l.locale === lang.locale)
                                    ? 'bg-blue-50 border-vibrant-blue ring-2 ring-vibrant-blue'
                                    : 'bg-white hover:border-gray-400'
                                    }`}
                            >
                                <span className="text-3xl">{lang.flag}</span>
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {mode === 'script' && (
                <><div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                        Language
                    </label>
                    <select
                        className="border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-black"
                        value={selectedLanguage}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                    >
                        <option value="">Select Language</option>
                        {languages.map((lang) => (
                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                        ))}
                    </select>
                </div><div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                            Gender
                        </label>
                        <select
                            className="border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-black"
                            value={selectedGender}
                            onChange={(e) => handleGenderChange(e.target.value)}
                            disabled={!selectedLanguages}
                        >
                            <option value="">Select Gender</option>
                            {genders.map((gender) => (
                                <option key={gender} value={gender}>{gender}</option>
                            ))}
                        </select>
                    </div><div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                            Voice
                        </label>
                        <select
                            className="border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-black"
                            value={voiceId}
                            onChange={(e) => handleVoiceChange(e.target.value)}
                            disabled={!selectedGender}
                        >
                            <option value="">Select Voice</option>
                            {voiceOptions.map((voice) => (
                                <option key={voice.value} value={voice.value}>{voice.label}</option>
                            ))}
                        </select>
                    </div><div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                            Style
                        </label>
                        <select
                            className="border border-pink-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 text-black"
                            value={style}
                            onChange={(e) => handleStyleChange(e.target.value)}
                            disabled={!voiceId || styles.length === 0}
                        >
                            <option value="">Select Style</option>
                            {styles.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div></>
            )}
        </div>
    );
}

export default Step3;