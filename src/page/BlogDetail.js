import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = ({ translations, currentLang, blogPosts }) => {
    const { id } = useParams();
    const post = blogPosts.find(post => post.id === parseInt(id));
    const [showShareMenu, setShowShareMenu] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: post.title,
            text: post.excerpt,
            url: window.location.href,
        };

        // Check if Web Share API is supported
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: show share menu
            setShowShareMenu(!showShareMenu);
        }
    };

    const shareToSocial = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post.title);
        const text = encodeURIComponent(post.excerpt);

        let shareUrl = '';
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
                setShowShareMenu(false);
                return;
            default:
                return;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShowShareMenu(false);
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
                    <Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                </Link>
                
                <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 md:p-10">
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                            <div className="flex items-center space-x-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                    {post.date}
                                </span>
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {post.readTime}
                                </span>
                            </div>
                            {post.focusKeyword && (
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                    {post.focusKeyword}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="prose prose-lg max-w-none">
                            {post.content.split('\n').map((paragraph, index) => {
                                const trimmedParagraph = paragraph.trim();
                                
                                // Handle H1 (Main content heading) - Add image after first H1
                                if (trimmedParagraph.startsWith('# ')) {
                                    return (
                                        <div key={index}>
                                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-8 border-b-2 border-blue-500 pb-2">
                                                {trimmedParagraph.substring(2)}
                                            </h1>
                                            <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                                                <img 
                                                    src={post.image} 
                                                    alt={post.title} 
                                                    className="w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                                
                                // Handle H2
                                if (trimmedParagraph.startsWith('## ')) {
                                    return (
                                        <h2 key={index} className="text-xl md:text-2xl font-bold text-gray-800 mb-4 mt-8 text-blue-700">
                                            {trimmedParagraph.substring(3)}
                                        </h2>
                                    );
                                }
                                
                                // Handle H3
                                if (trimmedParagraph.startsWith('### ')) {
                                    return (
                                        <h3 key={index} className="text-lg md:text-xl font-semibold text-gray-800 mb-3 mt-6 text-green-700">
                                            {trimmedParagraph.substring(4)}
                                        </h3>
                                    );
                                }
                                
                                // Handle bullet points with improved styling
                                if (trimmedParagraph.startsWith('- ')) {
                                    return (
                                        <div key={index} className="flex items-start mb-2">
                                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            <span className="text-gray-700 leading-relaxed">{trimmedParagraph.substring(2)}</span>
                                        </div>
                                    );
                                }
                                
                                // Handle bold text starting with **
                                if (trimmedParagraph.startsWith('**') && trimmedParagraph.endsWith('**')) {
                                    return (
                                        <p key={index} className="font-bold text-gray-800 mb-3 text-lg bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500">
                                            {trimmedParagraph.slice(2, -2)}
                                        </p>
                                    );
                                }
                                
                                // Handle links and regular paragraphs
                                if (trimmedParagraph) {
                                    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                                    const extLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
                                    
                                    let processedParagraph = trimmedParagraph;
                                    
                                    // Replace external links
                                    processedParagraph = processedParagraph.replace(extLinkRegex, (match, text, url) => {
                                        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors">${text}</a>`;
                                    });
                                    
                                    // Replace internal links
                                    processedParagraph = processedParagraph.replace(linkRegex, (match, text, url) => {
                                        if (!url.startsWith('http')) {
                                            return `<a href="${url}" class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors">${text}</a>`;
                                        }
                                        return match;
                                    });
                                    
                                    return (
                                        <p key={index} className="mb-5 text-gray-700 leading-relaxed text-lg" 
                                           dangerouslySetInnerHTML={{__html: processedParagraph}} />
                                    );
                                }
                                
                                return null;
                            })}
                        </div>

                        {/* Tags and Meta Info */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-wrap items-center justify-between">
                                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                    {post.focusKeyword && (
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            #{post.focusKeyword.replace(/\s+/g, '')}
                                        </span>
                                    )}
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        #AyurvedicOil
                                    </span>
                                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                        #NaturalPainRelief
                                    </span>
                                </div>
                                
                                <div className="flex items-center space-x-4 relative">
                                    <button 
                                        onClick={handleShare}
                                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                        <span>Share</span>
                                    </button>

                                    {/* Share Menu */}
                                    {showShareMenu && (
                                        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10 min-w-[200px]">
                                            <button
                                                onClick={() => shareToSocial('facebook')}
                                                className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                                            >
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                </svg>
                                                <span>Share on Facebook</span>
                                            </button>
                                            
                                            <button
                                                onClick={() => shareToSocial('twitter')}
                                                className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                                            >
                                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                </svg>
                                                <span>Share on Twitter</span>
                                            </button>
                                            
                                            <button
                                                onClick={() => shareToSocial('linkedin')}
                                                className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                                            >
                                                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                                <span>Share on LinkedIn</span>
                                            </button>
                                            
                                            <button
                                                onClick={() => shareToSocial('whatsapp')}
                                                className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                                            >
                                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.488"/>
                                                </svg>
                                                <span>Share on WhatsApp</span>
                                            </button>
                                            
                                            <button
                                                onClick={() => shareToSocial('copy')}
                                                className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-50 rounded transition-colors"
                                            >
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                <span>Copy Link</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Experience Natural Pain Relief?</h3>
                            <p className="text-gray-700 mb-4">Try DR. Joints Ayurvedic Pain Relief Oil and discover the power of natural healing.</p>
                            <Link to="/product/dr-joints-pain-relief-oil" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Shop Now
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map(relatedPost => (
                            <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform group-hover:scale-105">
                                    <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
