import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserJobs } from '../store/dubbingSlice';
import { getUserTTSJobs } from '../store/ttsSlice';
import { Clock, CheckCircle, AlertTriangle, Film, Plus, List, LayoutGrid, Search } from 'lucide-react';

const ProjectCard = ({ project }) => {
    const getStatusInfo = (status) => {
        switch (status) {
          case 'COMPLETED':
            return { text: 'Completed', color: 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white' };
          case 'PROCESSING':
            return { text: 'Processing', color: 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white' };
          case 'PENDING':
            return { text: 'Pending', color: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' };
            case 'QUEUED':
            return { text: 'Queued', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' };
          default:
            return { text: 'Failed', color: 'bg-gradient-to-r from-red-400 to-red-600 text-white' };
        }
    };
    const statusInfo = getStatusInfo(project.status);
    const progress = project.status === 'COMPLETED' ? 100 : (project.status === 'PROCESSING' ? 50 : 10);

    return (
        <div className="bg-white rounded-2xl shadow border-l-8 border-transparent hover:border-indigo-500 transition-all flex flex-col group overflow-hidden">
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 pr-2 group-hover:text-indigo-600 transition-colors">{project.projectName}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color} shadow`}>{statusInfo.text}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Last modified: {new Date(project.updatedAt).toLocaleDateString()}</p>
                <div className="flex-grow">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Target Languages:</p>
                    <div className="flex flex-wrap gap-2">
                        {project.targetLocales.map(lang => (
                        <span key={lang} className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">{lang}</span>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 h-2 rounded-full" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
                <Link to={`/project-editor/${project.jobId}`} className="block w-full text-center mt-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-2 rounded-lg font-semibold hover:from-violet-600 hover:to-indigo-500 transition-colors">
                    Open Project
                </Link>
            </div>
        </div>
    );
};

const TTSProjectCard = ({ job }) => {
    const getStatusInfo = (status) => {
        switch (status) {
          case 'COMPLETED':
            return { text: 'Completed', color: 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white' };
          case 'PROCESSING':
            return { text: 'Processing', color: 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white' };
          case 'PENDING':
            return { text: 'Pending', color: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' };
          default:
            return { text: 'Failed', color: 'bg-gradient-to-r from-red-400 to-red-600 text-white' };
        }
    };
    const statusInfo = getStatusInfo(job.status);
    const progress = job.status === 'COMPLETED' ? 100 : (job.status === 'PROCESSING' ? 50 : 10);
    return (
        <div className="bg-white rounded-2xl shadow border-l-8 border-transparent hover:border-indigo-500 transition-all flex flex-col group overflow-hidden">
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 pr-2 group-hover:text-indigo-600 transition-colors">{job.projectName}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color} shadow`}>{statusInfo.text}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Created: {new Date(job.createdAt).toLocaleDateString()}</p>
                <div className="flex-grow">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Source → Target:</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">{job.sourceLocale} → {job.targetLocale}</span>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 h-2 rounded-full" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
                <Link to={`/tts-project-editor/${job.jobId}`} className="block w-full text-center mt-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-2 rounded-lg font-semibold hover:from-violet-600 hover:to-indigo-500 transition-colors">
                    Open Project
                </Link>
            </div>
        </div>
    );
};

const Projects = () => {
    const dispatch = useDispatch();
    const { userJobs, isLoading, error } = useSelector((state) => state.dubbing);
    const { ttsJobs, ttsJobsLoading, ttsJobsError } = useSelector((state) => state.tts);
    const [view, setView] = useState('grid'); // 'grid' or 'list'
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchUserJobs());
        dispatch(getUserTTSJobs());
    }, [dispatch]);
    
    const getStatusIcon = (status) => {
        switch (status) {
          case 'COMPLETED':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
          case 'PENDING':
          case 'PROCESSING':
            return <Clock className="h-5 w-5 text-blue-500" />;
          default:
            return <AlertTriangle className="h-5 w-5 text-red-500" />;
        }
    };

    // Filtered projects based on search
    const filteredUserJobs = userJobs.filter(job => job.projectName.toLowerCase().includes(search.toLowerCase()));
    const filteredTTSJobs = ttsJobs.filter(job => job.projectName.toLowerCase().includes(search.toLowerCase()));

    const renderContent = () => {
        if (isLoading) return <p className="text-center py-12">Loading projects...</p>;
        if (error) return <p className="text-center py-12 text-red-500">Error: {error}</p>;
        if (userJobs.length === 0) return (
            <div className="text-center py-20 bg-white rounded-2xl shadow">
                <svg width="80" height="80" fill="none" viewBox="0 0 24 24" className="mx-auto mb-4 text-indigo-200"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">No Projects Found</h3>
            </div>
        );

        if (view === 'grid') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUserJobs.map((job) => <ProjectCard key={job._id} project={job} />)}
                </div>
            );
        }

        return (
             <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
                <ul className="divide-y divide-gray-200">
                    {filteredUserJobs.map((job) => (
                        <li key={job._id}>
                            <Link to={`/project-editor/${job.jobId}`} className="block hover:bg-gray-50 p-4">
                                <div className="grid grid-cols-10 items-center gap-4">
                                    <div className="col-span-4 flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-gray-100"><Film className="h-6 w-6 text-vibrant-blue"/></div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{job.projectName}</p>
                                            <p className="text-sm text-gray-500">{job.originalFile}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-sm text-gray-600">{job.targetLocales.join(', ')}</div>
                                    <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600 font-medium">
                                        {getStatusIcon(job.status)}
                                        <span>{job.status}</span>
                                    </div>
                                    <div className="col-span-2 text-sm text-gray-500 text-right">{new Date(job.updatedAt).toLocaleDateString()}</div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="p-8 min-h-screen bg-blue-50">
            <div className="max-w-7xl mx-auto">
                 <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
                        <p className="text-gray-600 mt-1">View, manage, and create new localization projects.</p>
                    </div>
                     <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        <div className="hidden md:flex items-center space-x-2 bg-white p-1 rounded-lg shadow-sm border">
                            <button onClick={() => setView('grid')} className={`px-3 py-1.5 rounded-md text-sm font-semibold ${view === 'grid' ? 'bg-vibrant-blue text-white' : 'text-gray-600 hover:bg-gray-100'} transition-all`}>
                                <LayoutGrid size={16} className="mr-2 inline-block"/>Grid
                            </button>
                            <button onClick={() => setView('list')} className={`px-3 py-1.5 rounded-md text-sm font-semibold ${view === 'list' ? 'bg-vibrant-blue text-white' : 'text-gray-600 hover:bg-gray-100'} transition-all`}>
                                <List size={16} className="mr-2 inline-block"/>List
                            </button>
                        </div>
                         <Link to="/new-project" className="bg-vibrant-blue text-white px-4 py-2.5 rounded-lg font-semibold flex items-center hover:bg-vibrant-orange transition-colors shadow-sm">
                            <Plus size={20} className="mr-2" /> New Project
                        </Link>
                    </div>
                </header>

                 <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                    </div>
                 </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">My Dubbed Projects</h2>
                    {isLoading ? <p className="text-center py-12">Loading projects...</p> :
                     error ? <p className="text-center py-12 text-red-500">Error: {error}</p> :
                     filteredUserJobs.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow">
                            <svg width="80" height="80" fill="none" viewBox="0 0 24 24" className="mx-auto mb-4 text-indigo-200"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">No Projects Found</h3>
                        </div>
                     ) : (
                        view === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredUserJobs.map((job) => <ProjectCard key={job._id} project={job} />)}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
                                <ul className="divide-y divide-gray-200">
                                    {filteredUserJobs.map((job) => (
                                        <li key={job._id}>
                                            <Link to={`/project-editor/${job.jobId}`} className="block hover:bg-gray-50 p-4">
                                                <div className="grid grid-cols-10 items-center gap-4">
                                                    <div className="col-span-4 flex items-center gap-4">
                                                        <div className="p-3 rounded-lg bg-gray-100"><Film className="h-6 w-6 text-vibrant-blue"/></div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{job.projectName}</p>
                                                            <p className="text-sm text-gray-500">{job.originalFile}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2 text-sm text-gray-600">{job.targetLocales.join(', ')}</div>
                                                    <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600 font-medium">
                                                        {getStatusIcon(job.status)}
                                                        <span>{job.status}</span>
                                                    </div>
                                                    <div className="col-span-2 text-sm text-gray-500 text-right">{new Date(job.updatedAt).toLocaleDateString()}</div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                     )
                    }
                </div>

                <div className="mt-12">
                    <h2 className="text-xl font-bold mb-4">My TTS Projects</h2>
                    {ttsJobsLoading ? (
                        <div>Loading TTS jobs...</div>
                    ) : ttsJobsError ? (
                        <div className="text-red-500">{ttsJobsError}</div>
                    ) : filteredTTSJobs.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow">
                            <svg width="80" height="80" fill="none" viewBox="0 0 24 24" className="mx-auto mb-4 text-indigo-200"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">No Projects Found</h3>
                        </div>
                    ) : (
                        view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTTSJobs.map(job => (
                                <TTSProjectCard key={job.jobId} job={job} />
                            ))}
                        </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
                                <ul className="divide-y divide-gray-200">
                                    {filteredTTSJobs.map((job) => (
                                        <li key={job.jobId}>
                                            <Link to={`/tts-project-editor/${job.jobId}`} className="block hover:bg-gray-50 p-4">
                                                <div className="grid grid-cols-10 items-center gap-4">
                                                    <div className="col-span-4 flex items-center gap-4">
                                                        <div className="p-3 rounded-lg bg-gray-100"><span role='img' aria-label='TTS'>🗣️</span></div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{job.projectName}</p>
                                                            <p className="text-sm text-gray-500">{job.sourceLocale} → {job.targetLocale}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2 text-sm text-gray-600"></div>
                                                    <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600 font-medium">
                                                        {getStatusIcon(job.status)}
                                                        <span>{job.status}</span>
                                                    </div>
                                                    <div className="col-span-2 text-sm text-gray-500 text-right">{new Date(job.createdAt).toLocaleDateString()}</div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects; 