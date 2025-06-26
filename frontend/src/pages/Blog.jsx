const blogPosts = [
  {
    title: 'The Future of AI in Content Creation',
    description: 'Explore how artificial intelligence is revolutionizing the way we create, translate, and distribute content globally.',
    author: 'Jane Doe',
    date: 'July 22, 2024',
    readTime: '6 min read',
    imageUrl: 'https://picsum.photos/seed/blog1/800/600',
    authorImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    title: '5 Tips for Effective Video Localization',
    description: 'Learn the best practices for adapting your video content for different cultures and languages to maximize engagement.',
    author: 'John Smith',
    date: 'July 15, 2024',
    readTime: '8 min read',
    imageUrl: 'https://picsum.photos/seed/blog2/800/600',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    title: 'Breaking Language Barriers with AI Dubbing',
    description: 'A deep dive into the technology behind AI-powered dubbing and how it is making content more accessible than ever.',
    author: 'Emily White',
    date: 'July 5, 2024',
    readTime: '5 min read',
    imageUrl: 'https://picsum.photos/seed/blog3/800/600',
    authorImageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
  }
];

function Blog() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 bg-gray-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          GlobalVoice AI Blog
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Insights on AI, content creation, and global marketing. Your expert resource for mastering localization.
        </p>
      </div>

      {/* Blog Posts Section */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {blogPosts.map((post) => (
            <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden group">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-vibrant-blue">
                    <a href="#" className="hover:underline">
                      {post.category}
                    </a>
                  </p>
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-vibrant-orange transition">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.summary}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    {/* Placeholder for author image */}
                    <span className="sr-only">{post.author}</span>
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                      {post.author.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog; 