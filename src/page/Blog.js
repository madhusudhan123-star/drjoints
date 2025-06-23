import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ post, featured = false }) => (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${featured ? 'md:col-span-2' : ''}`}>        
        <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-3">
                    <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">{post.date}</span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                    </span>
                </div>
                {post.focusKeyword && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {post.focusKeyword}
                    </span>
                )}
            </div>
            
            <h2 className={`font-bold text-gray-800 mb-4 leading-tight hover:text-blue-600 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            
            <p className={`text-gray-600 mb-6 leading-relaxed ${featured ? 'text-lg' : ''}`}>
                {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        Ayurvedic
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        Pain Relief
                    </span>
                </div>
                
                <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                >
                    Read More
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    </div>
);

const Blog = ({ currentLang, translations, blogPosts }) => {
    const blogText = translations[currentLang].blog;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{blogText.title}</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">{blogText.subtitle}</p>
                    
                    {/* Search and Categories */}
                    {/* <div className="mt-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search articles..." 
                                className="w-80 px-4 py-3 pl-10 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        <div className="flex space-x-2">
                            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-white/30 transition-colors">
                                All Articles
                            </span>
                            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-white/30 transition-colors">
                                Pain Relief
                            </span>
                            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-white/30 transition-colors">
                                Ayurvedic Tips
                            </span>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Featured Post */}
                <div className="mb-12">
                    <div className="flex items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
                        <div className="ml-3 h-1 flex-1 bg-gradient-to-r from-blue-500 to-transparent rounded"></div>
                    </div>
                    <BlogPost post={blogPosts[0]} featured={true} />
                </div>

                {/* Recent Posts Grid */}
                <div className="mb-12">
                    <div className="flex items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
                        <div className="ml-3 h-1 flex-1 bg-gradient-to-r from-green-500 to-transparent rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.slice(1).map(post => (
                            <BlogPost key={post.id} post={post} />
                        ))}
                    </div>
                </div>

                {/* Newsletter Section */}
                {/* <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 border border-blue-100">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{blogText.newsletter.title}</h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{blogText.newsletter.description}</p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-md mx-auto">
                            <input 
                                type="email" 
                                placeholder={blogText.newsletter.placeholder}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
                                {blogText.newsletter.button}
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Blog;
