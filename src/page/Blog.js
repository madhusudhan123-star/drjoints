import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
        <img src={post.image} alt={post.title} className="w-full" />
        <div className="p-6">
            <div className="flex items-center text-gray-600 text-sm mb-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center">
                <div className="flex-1">
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-gray-600 text-sm">{post.authorRole}</p>
                </div>
                <Link 
                    to={`/blog/${post.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Read More
                </Link>
            </div>
        </div>
    </div>
);

const Blog = ({ currentLang, translations, blogPosts }) => {
    const blogText = translations[currentLang].blog;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{blogText.title}</h1>
                    <p className="text-xl text-gray-600">{blogText.subtitle}</p>
                </div>

                {/* Featured Post */}
                <div className="mb-12">
                    <BlogPost post={blogPosts[0]} />
                </div>

                {/* Recent Posts Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {blogPosts.slice(1).map(post => (
                        <BlogPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
