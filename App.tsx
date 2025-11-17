import React, { useState, useCallback, useRef } from 'react';
import { Controls } from './components/Controls';
import { Canvas } from './components/Canvas';
import { useLocalStorage } from './hooks/useLocalStorage';
import { extractMainQuote } from './services/geminiService';
import { getBengaliDate } from './utils/dateUtils';
import type { DesignTemplate } from './types';

const App: React.FC = () => {
    const [candidateImage, setCandidateImage] = useLocalStorage<string | null>('savedCandidateImage', null);
    const [logoImage, setLogoImage] = useLocalStorage<string | null>('savedLogo', null);
    const [rawText, setRawText] = useState<string>('');
    const [displayText, setDisplayText] = useState<string>('আপনার প্রার্থীর সুন্দর উক্তি এখানে প্রদর্শিত হবে।');
    const [template, setTemplate] = useState<DesignTemplate>('facebook');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDesignGenerated, setIsDesignGenerated] = useState<boolean>(false);

    const canvasRef = useRef<HTMLDivElement>(null);
    const date = getBengaliDate();

    const handleGenerateQuote = useCallback(async () => {
        if (!rawText.trim()) {
            setError('অনুগ্রহ করে টেক্সট বক্সে কিছু লিখুন।');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const quote = await extractMainQuote(rawText);
            setDisplayText(quote);
            setIsDesignGenerated(true);
        } catch (err) {
            setError('উক্তি তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [rawText]);

    const handleDownload = useCallback(() => {
        if (canvasRef.current === null) {
            return;
        }

        // @ts-ignore - htmlToImage is loaded from CDN
        htmlToImage.toJpeg(canvasRef.current, { quality: 1.0, pixelRatio: 2 }) // Increased pixelRatio for better quality
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `social-post-${template}-${Date.now()}.jpeg`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('oops, something wrong!', err);
                setError('ডিজাইন ডাউনলোড করা যায়নি।');
            });
    }, [template]);

    const placeholderAspectRatio = template === 'youtube' ? 'aspect-video' : 'aspect-square';

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-slate-800">সোশ্যাল মিডিয়া পোস্ট <span className="text-red-600">ডিজাইনার</span></h1>
                </div>
            </header>
            
            <main className="container mx-auto p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 bg-white rounded-xl p-5 shadow-lg border border-slate-200">
                        <Controls
                            onCandidateImageUpload={setCandidateImage}
                            candidateImagePreview={candidateImage}
                            onClearCandidateImage={() => setCandidateImage(null)}
                            onLogoUpload={setLogoImage}
                            logoImagePreview={logoImage}
                            onClearLogo={() => setLogoImage(null)}
                            onTextChange={setRawText}
                            onGenerate={handleGenerateQuote}
                            onDownload={handleDownload}
                            setTemplate={setTemplate}
                            currentTemplate={template}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="lg:col-span-8 flex flex-col items-center justify-start">
                         {error && <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4 w-full text-center">{error}</div>}
                        
                        {!isDesignGenerated ? (
                             <div className={`w-full ${placeholderAspectRatio} bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col items-center justify-center text-center p-8 transition-all duration-300`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h2 className="text-xl font-bold text-slate-600">ডিজাইন তৈরি করতে প্রস্তুত</h2>
                                <p className="text-slate-500 mt-2 max-w-md">বাম পাশের কন্ট্রোল প্যানেল ব্যবহার করে ছবি, লোগো এবং টেক্সট যোগ করুন, তারপর <span className="font-semibold text-red-600">"ডিজাইন তৈরি করুন"</span> বাটনে ক্লিক করুন।</p>
                            </div>
                        ) : (
                            <Canvas
                                ref={canvasRef}
                                candidateImage={candidateImage}
                                logoImage={logoImage}
                                displayText={displayText}
                                date={date}
                                template={template}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;