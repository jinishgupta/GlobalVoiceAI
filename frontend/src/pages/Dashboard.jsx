import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserJobs } from '../store/dubbingSlice';
import { getUserTTSJobs } from '../store/ttsSlice';
import { Clock, CheckCircle, AlertTriangle, Film, Layers, Check, BarChart2 } from 'lucide-react';

const StatCard = ({ title, value, icon, color, unit }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
        <div className={`mr-4 p-3 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
            {icon}
        </div>
        <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">
                {value} <span className="text-base font-medium text-gray-500">{unit}</span>
            </p>
        </div>
    </div>
);

const ProjectCard = ({ project }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { icon: <CheckCircle className="h-5 w-5 text-green-500" />, text: 'Completed', color: 'bg-green-500' };
      case 'PROCESSING':
        return { icon: <Clock className="h-5 w-5 text-blue-500 animate-spin" />, text: 'Processing', color: 'bg-blue-500' };
      case 'PENDING':
        return { icon: <Clock className="h-5 w-5 text-gray-500" />, text: 'Pending', color: 'bg-gray-500' };
      default:
        return { icon: <AlertTriangle className="h-5 w-5 text-red-500" />, text: 'Failed', color: 'bg-red-500' };
    }
  };
  const statusInfo = getStatusInfo(project.status);

  return (
    <Link to={`/project-editor/${project.jobId}`} className="block group">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col h-full">
            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <div className="mr-4 p-3 rounded-lg bg-gray-100">
                        <Film className="h-6 w-6 text-vibrant-blue" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-vibrant-blue transition-colors">{project.projectName}</h4>
                        <p className="text-sm text-gray-500">Updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
                 <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${statusInfo.color} flex-shrink-0`}>
                    {statusInfo.text}
                </span>
            </div>

            <div className="mt-4 flex-grow">
                <p className="text-sm font-semibold text-gray-700 mb-2">Target Languages:</p>
                <div className="flex flex-wrap gap-2">
                {project.targetLocales.map(lang => (
                    <span key={lang} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{lang}</span>
                ))}
                </div>
            </div>
            
            <div className="text-right mt-4">
                <span className="text-sm font-semibold text-vibrant-blue group-hover:underline">View Project &rarr;</span>
            </div>
        </div>
    </Link>
  );
};

const TTSProjectCard = ({ job }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { icon: <CheckCircle className="h-5 w-5 text-green-500" />, text: 'Completed', color: 'bg-green-500' };
      case 'PROCESSING':
        return { icon: <Clock className="h-5 w-5 text-blue-500 animate-spin" />, text: 'Processing', color: 'bg-blue-500' };
      case 'PENDING':
        return { icon: <Clock className="h-5 w-5 text-gray-500" />, text: 'Pending', color: 'bg-gray-500' };
      default:
        return { icon: <AlertTriangle className="h-5 w-5 text-red-500" />, text: 'Failed', color: 'bg-red-500' };
    }
  };
  const statusInfo = getStatusInfo(job.status);
  return (
    <Link to={`/tts-project-editor/${job.jobId}`} className="block group">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="mr-4 p-3 rounded-lg bg-gray-100">
              <Layers className="h-6 w-6 text-vibrant-blue" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 group-hover:text-vibrant-blue transition-colors">{job.projectName}</h4>
              <p className="text-sm text-gray-500">Created: {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${statusInfo.color} flex-shrink-0`}>
            {statusInfo.text}
          </span>
        </div>
        <div className="mt-4 flex-grow">
          <p className="text-sm font-semibold text-gray-700 mb-2">Source → Target:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{job.sourceLocale} → {job.targetLocale}</span>
          </div>
        </div>
        <div className="text-right mt-4">
          <span className="text-sm font-semibold text-vibrant-blue group-hover:underline">View Project &rarr;</span>
        </div>
      </div>
    </Link>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userJobs, isLoading, error } = useSelector((state) => state.dubbing);
  const { ttsJobs, ttsJobsLoading, ttsJobsError } = useSelector((state) => state.tts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserJobs());
    dispatch(getUserTTSJobs());
  }, [dispatch]);

  // Get 2 latest dubbing and 2 latest TTS jobs, merge and sort by date
  const latestDub = [...userJobs].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 2).map(job => ({ ...job, _type: 'dub' }));
  const latestTTS = [...ttsJobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2).map(job => ({ ...job, _type: 'tts' }));
  const recentProjectsUnified = [...latestDub, ...latestTTS].sort((a, b) => {
    const dateA = a._type === 'dub' ? new Date(a.updatedAt) : new Date(a.createdAt);
    const dateB = b._type === 'dub' ? new Date(b.updatedAt) : new Date(b.createdAt);
    return dateB - dateA;
  });

  // Calculate stats from userJobs and ttsJobs
  const allProjects = [...userJobs, ...ttsJobs];
  const projectsInProgress = allProjects.filter(job => job.status === 'PROCESSING' || job.status === 'PENDING').length;
  const projectsCompleted = allProjects.filter(job => job.status === 'COMPLETED').length;

  const stats = [
    { name: 'Total Projects', value: allProjects.length, unit: 'Projects', icon: <Layers size={24} className="text-vibrant-blue" />, color: 'text-vibrant-blue' },
    { name: 'In Progress', value: projectsInProgress, unit: 'Projects', icon: <Clock size={24} className="text-vibrant-orange" />, color: 'text-vibrant-orange' },
    { name: 'Completed', value: projectsCompleted, unit: 'Projects', icon: <Check size={24} className="text-green-500" />, color: 'text-green-500' },
  ];

  return (
    <div className="p-8 min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.userName || 'User'}! Here's a snapshot of your activity.</p>
         </header>

        {/* Stats Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
             {stats.map(stat => (
                  <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow">
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                      <p className="text-2xl font-bold text-gray-800 mt-1">
                        {stat.value} <span className="text-base font-medium text-gray-500">{stat.unit}</span>
                      </p>
                    </div>
                  </div>
             ))}
         </div>

        {/* Recent Projects */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
            <Link to="/projects" className="text-sm font-semibold text-indigo-600 hover:underline">
              View All
            </Link>
          </div>
          {isLoading || ttsJobsLoading ? <p>Loading projects...</p> :
           error || ttsJobsError ? <p className="text-red-500">Error fetching projects: {error || ttsJobsError}</p> :
           recentProjectsUnified.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentProjectsUnified.map((item) =>
                  item._type === 'dub' ? (
                    <ProjectCard key={item._id} project={item} />
                  ) : (
                    <TTSProjectCard key={item.jobId} job={item} />
                  )
                )}
              </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow">
                    <svg width="80" height="80" fill="none" viewBox="0 0 24 24" className="mx-auto mb-4 text-indigo-200"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">No Projects Yet</h3>
                    <p className="mt-1 text-gray-500">Get started by creating your first project.</p>
                    <Link to="/new-project" className="mt-6 inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-semibold hover:from-violet-600 hover:to-indigo-500 transition-colors">
                        Create Project
                    </Link>
                </div>
            )
          }
        </section>
      </div>
    </div>
  );
};

export default Dashboard; 