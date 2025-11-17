import React, { forwardRef } from 'react';
import type { DesignTemplate } from '../types';

interface CanvasProps {
    candidateImage: string | null;
    logoImage: string | null;
    displayText: string;
    date: string;
    template: DesignTemplate;
}

const Placeholder = ({ text }: { text: string }) => (
    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 text-lg font-medium p-4 text-center">
        {text}
    </div>
);

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(({ 
    candidateImage, 
    logoImage, 
    displayText, 
    date,
    template 
}, ref) => {
    const aspectRatio = template === 'youtube' ? 'aspect-video' : 'aspect-square';
    const baseClasses = `relative w-full overflow-hidden shadow-2xl bg-white text-white`;

    // Facebook Design
    const facebookLayout = (
        <div className="relative w-full h-full bg-green-700 flex flex-col">
            {/* Image container - top 65% */}
            <div className="w-full h-[65%] overflow-hidden bg-slate-200">
                {candidateImage ? (
                    <img src={candidateImage} alt="Candidate" className="w-full h-full object-cover" />
                ) : (
                    <Placeholder text="প্রার্থীর ছবি" />
                )}
            </div>

            {/* Decorative separator */}
            <div className="absolute top-[65%] left-0 w-full h-16 -mt-8 pointer-events-none">
                <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0 50 C 360 100, 1080 0, 1440 50 L 1440 100 L 0 100 Z" fill="white"/>
                </svg>
            </div>
            
            <div className="relative w-full h-[35%] bg-white text-slate-800 flex flex-col justify-end items-center p-4 z-10">
                 {/* Text container */}
                <div className="w-full flex-grow flex items-center justify-center p-4">
                    <h2 
                        className="text-2xl lg:text-3xl font-bold text-center leading-tight text-green-800"
                        style={{ fontFamily: "'Noto Serif Bengali', serif" }}
                    >
                        “{displayText}”
                    </h2>
                </div>
                 {/* Footer with Logo and Date */}
                <div className="w-full flex items-center justify-between flex-shrink-0">
                    <div className="h-8 lg:h-10 flex items-center">
                        {logoImage && <img src={logoImage} alt="Logo" className="max-h-full w-auto object-contain" />}
                    </div>
                    <p 
                        className="text-lg font-bold text-green-900"
                        style={{ fontFamily: "'Tiro Bangla', serif" }}
                    >
                        {date}
                    </p>
                </div>
            </div>
        </div>
    );

    // YouTube Design
    const youtubeLayout = (
         <div className="relative flex h-full bg-green-900">
            {/* Text/Content side */}
            <div className="w-1/2 h-full flex flex-col p-8 md:p-10 text-white bg-gradient-to-br from-green-700 to-green-900">
                {/* Top: Logo */}
                <div className="h-12 flex-shrink-0">
                    {logoImage && <img src={logoImage} alt="Logo" className="max-h-full w-auto object-contain" />}
                </div>
                
                {/* Middle: Quote (takes up remaining space) */}
                <div className="flex-grow flex flex-col justify-center my-4">
                     <div className="w-16 h-1 bg-red-500 mb-4"></div>
                     <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                        <span className="text-red-500 text-6xl block -mb-4 -ml-2">“</span>
                        {displayText}
                    </h2>
                </div>

                {/* Bottom: Date */}
                <div className="flex-shrink-0">
                    <p className="text-lg font-bold" style={{ fontFamily: "'Tiro Bangla', serif" }}>{date}</p>
                </div>
            </div>
            
            {/* Image side */}
            <div className="w-1/2 h-full bg-slate-200" style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)'}}>
                 {candidateImage ? (
                    <img src={candidateImage} alt="Candidate" className="w-full h-full object-cover object-center" />
                ) : (
                    <Placeholder text="প্রার্থীর ছবি" />
                )}
            </div>
        </div>
    );

    // Instagram Design
    const instagramLayout = (
        <div className="relative w-full h-full bg-green-50 flex flex-col items-center justify-center p-8">
            {/* Top: Logo */}
            <div className="absolute top-6 left-6 h-10">
                {logoImage ? (
                    <img src={logoImage} alt="Logo" className="max-h-full w-auto object-contain" />
                ) : null}
            </div>
            
            {/* Date */}
            <div className="absolute top-6 right-6">
                <p 
                    className="text-lg font-bold text-green-800"
                    style={{ fontFamily: "'Tiro Bangla', serif" }}
                >
                    {date}
                </p>
            </div>

            {/* Candidate Image in Circle */}
            <div className="w-1/2 aspect-square rounded-full overflow-hidden shadow-lg border-4 border-white ring-4 ring-red-500 mb-6">
                {candidateImage ? (
                    <img src={candidateImage} alt="Candidate" className="w-full h-full object-cover" />
                ) : (
                    <Placeholder text="প্রার্থীর ছবি" />
                )}
            </div>
            
            {/* Quote */}
            <div className="w-full max-w-sm text-center">
                <h2 
                    className="text-2xl lg:text-3xl font-bold leading-tight text-slate-800"
                    style={{ fontFamily: "'Noto Serif Bengali', serif" }}
                >
                    <span className="text-red-500 text-5xl leading-[0] block">“</span>
                    {displayText}
                </h2>
            </div>
        </div>
    );
    
    // Quote Design
    const quoteLayout = (
        <div className="relative w-full h-full bg-white text-slate-800 p-10 flex flex-col justify-between">
            {/* Background Blob */}
            <div className="absolute bottom-0 right-0 w-[85%] h-[85%] overflow-hidden pointer-events-none">
                 <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor: '#15803d', stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: '#16a34a', stopOpacity: 1}} />
                        </linearGradient>
                    </defs>
                    <path d="M362.5 250.5Q350 301 300 339.5Q250 378 190.5 383Q131 388 88 350.5Q45 313 32.5 256.5Q20 200 62 153Q104 106 142.5 68Q181 30 230.5 27Q280 24 322 66.5Q364 109 374.5 154.5Q385 200 362.5 250.5Z" fill="url(#blobGradient)"/>
                 </svg>
            </div>

            {/* Candidate Image */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[90%] flex items-end justify-center">
                 {candidateImage ? (
                    <img src={candidateImage} alt="Candidate" className="w-full h-full object-contain object-bottom drop-shadow-2xl" style={{filter: 'grayscale(100%) brightness(1.1)'}} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Placeholder text="প্রার্থীর ছবি" />
                    </div>
                )}
            </div>

            {/* Quote Icon */}
            <div className="absolute bottom-[45%] right-[55%] w-20 h-20 text-red-600 opacity-80">
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M13.6,86.4c-4.4,0-8.2-1.5-11.4-4.5C-1,78.7-2.6,74.5-2.6,69.1c0-5.3,1.3-10.7,4-16.1c2.7-5.4,6-10.4,10-15 c4-4.6,8.2-8.5,12.6-11.7c4.4-3.2,8.4-5.4,12-6.6V35c-5.8,2.8-11.2,7-16.2,12.6c-5,5.6-8.9,12.1-11.7,19.5 C-1.1,72.4-0.4,78.2,2,82.8C4.5,87.5,8.7,89.8,13.6,89.8V86.4z M61.6,86.4c-4.4,0-8.2-1.5-11.4-4.5 c-3.2-3.2-4.8-7.4-4.8-12.8c0-5.3,1.3-10.7,4-16.1c2.7-5.4,6-10.4,10-15c4-4.6,8.2-8.5,12.6-11.7c4.4-3.2,8.4-5.4,12-6.6V35 c-5.8,2.8-11.2,7-16.2,12.6c-5,5.6-8.9,12.1-11.7,19.5c-2.2,5.3-2.9,11.1-1.5,15.7c2.5,4.7,6.7,7,11.6,7V86.4z"/>
                </svg>
            </div>
            
            {/* Top section: Date */}
            <div className="w-full">
                <div className="flex items-center gap-2">
                     <div className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-lg shadow">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                     </div>
                    <p className="text-lg font-bold text-slate-700" style={{ fontFamily: "'Tiro Bangla', serif" }}>{date}</p>
                </div>
            </div>

            {/* Middle Section: Quote */}
            <div className="absolute top-1/4 left-10 w-3/5">
                 <h2 
                    className="text-3xl lg:text-4xl font-extrabold leading-tight"
                    style={{ fontFamily: "'Noto Serif Bengali', serif" }}
                 >
                    {displayText}
                </h2>
            </div>
            
            {/* Bottom Section: Logo */}
            <div className="w-full z-10">
                <div className="h-10 lg:h-12 flex items-center">
                    {logoImage && <img src={logoImage} alt="Logo" className="max-h-full w-auto object-contain" />}
                </div>
            </div>
        </div>
    );
    
    // Speech Layout
    const speechLayout = (
        <div className="relative w-full h-full bg-red-800 text-white flex flex-col">
            <div className="w-full h-[60%] p-10 flex flex-col justify-center relative">
                 <div className="absolute top-8 left-10 w-16 h-16 text-white/20">
                    <svg viewBox="0 0 100 100" fill="currentColor">
                       <path d="M13.6,86.4c-4.4,0-8.2-1.5-11.4-4.5C-1,78.7-2.6,74.5-2.6,69.1c0-5.3,1.3-10.7,4-16.1c2.7-5.4,6-10.4,10-15 c4-4.6,8.2-8.5,12.6-11.7c4.4-3.2,8.4-5.4,12-6.6V35c-5.8,2.8-11.2,7-16.2,12.6c-5,5.6-8.9,12.1-11.7,19.5 C-1.1,72.4-0.4,78.2,2,82.8C4.5,87.5,8.7,89.8,13.6,89.8V86.4z M61.6,86.4c-4.4,0-8.2-1.5-11.4-4.5 c-3.2-3.2-4.8-7.4-4.8-12.8c0-5.3,1.3-10.7,4-16.1c2.7-5.4,6-10.4,10-15c4-4.6,8.2-8.5,12.6-11.7c4.4-3.2,8.4-5.4,12-6.6V35 c-5.8,2.8-11.2,7-16.2,12.6c-5,5.6-8.9,12.1-11.7,19.5c-2.2,5.3-2.9,11.1-1.5,15.7c2.5,4.7,6.7,7,11.6,7V86.4z"/>
                    </svg>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-justify relative z-10" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                    {displayText}
                </h2>
                <p className="text-right mt-4 text-white/80 font-semibold">-- প্রার্থীর নাম</p>
            </div>
            <div className="w-full h-[40%] bg-slate-200">
                {candidateImage ? (
                    <img src={candidateImage} alt="Candidate" className="w-full h-full object-cover object-top" />
                ) : (
                    <Placeholder text="প্রার্থীর ছবি" />
                )}
            </div>
        </div>
    );
    
    // Panel Layout
    const panelLayout = (
        <div className="w-full h-full bg-white flex flex-col text-slate-800">
            <div className="w-full h-[40%] flex flex-col items-center justify-center text-center p-8">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-red-600" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                    {displayText.split(':')[0]}
                </h1>
                <h2 className="text-2xl lg:text-3xl mt-2 text-slate-700" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                    {displayText.split(':')[1]}
                </h2>
                <div className="w-32 h-1 bg-green-700 my-4"></div>
                <p className="text-xl font-bold">-- বক্তার নাম</p>
            </div>
            <div className="w-full h-[60%] bg-green-800 p-8 flex justify-center items-center gap-4 -mt-4">
                {[...Array(4)].map((_, i) => (
                     <div key={i} className={`w-1/5 aspect-[3/4] bg-white rounded-lg shadow-lg border-4 border-white transform ${i % 2 === 0 ? '-rotate-3' : 'rotate-3'} hover:scale-105 hover:rotate-0 transition-transform duration-300`}>
                        {i === 0 && candidateImage ? (
                             <img src={candidateImage} alt="Panelist" className="w-full h-full object-cover rounded-sm" />
                        ) : (
                             <Placeholder text={`সদস্য ${i+1}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
    
    // Hadith Layout
    const hadithLayout = (
        <div className="relative w-full h-full bg-slate-50 flex flex-col justify-center items-center text-center p-12">
            <div className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none">
                 <div className="absolute bottom-0 left-0 w-full h-full opacity-80">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-4.5 213.5L237 92L500.5 190L773 92L1002.5 213.5V301H-4.5V213.5Z" fill="#15803d" fillOpacity="0.3"/>
                        <path d="M-4.5 243.5L237 122L500.5 220L773 122L1002.5 243.5V301H-4.5V243.5Z" fill="#16a34a" fillOpacity="0.4"/>
                        <path d="M600 200 L 600 250 L 630 250 L 630 220 L 660 220 L 660 250 L 690 250 L 690 200 Z" fill="#14532d" />
                        <path d="M610 180 L 610 200 L 620 200 L 620 190 L 670 190 L 670 200 L 680 200 L 680 180 Z" fill="#14532d" />
                    </svg>
                 </div>
                 <div className="absolute bottom-0 left-0 w-full">
                     <svg viewBox="0 0 1440 100" fill="#f8fafc" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1440 60C1200 120 720 0 0 60V100H1440V60Z"/>
                    </svg>
                 </div>
            </div>

            <div className="relative z-10">
                <p className="text-xl font-medium text-green-700" style={{ fontFamily: "'Tiro Bangla', serif" }}>রাসূলুল্লাহ (স:) বলেছেন,</p>
                <h2 className="text-4xl lg:text-5xl font-extrabold my-4" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                    <span className="text-slate-800">“আল্লাহর রাস্তায় কাজ করতে গিয়ে কোনো </span>
                    <span className="text-red-600">নিন্দুকের তিরস্কারকে</span>
                    <span className="text-slate-800"> ভয় করো না।”</span>
                </h2>
                <p className="text-lg font-semibold text-slate-600" style={{ fontFamily: "'Tiro Bangla', serif" }}>- শুআবুল ঈমান</p>
            </div>
            
            <div className="absolute bottom-8 h-10">
                {logoImage && <img src={logoImage} alt="Logo" className="max-h-full w-auto object-contain" />}
            </div>
        </div>
    );

    // News Layout
    const newsLayout = (
        <div className="w-full h-full bg-slate-100 flex flex-col text-slate-800 p-5 space-y-3">
            {/* Header */}
            <div className="flex justify-between items-center w-full flex-shrink-0">
                <div className="h-14 w-auto flex items-center">
                     {logoImage ? <img src={logoImage} alt="Logo" className="max-h-full w-auto object-contain" /> : <div className="w-24 h-full bg-slate-200 rounded-md"></div>}
                </div>
                <p className="text-lg font-bold text-slate-700" style={{ fontFamily: "'Tiro Bangla', serif" }}>{date}</p>
            </div>

            {/* Image */}
            <div className="w-full flex-grow rounded-2xl p-1 bg-red-600 shadow-md">
                 <div className="w-full h-full rounded-xl bg-slate-200">
                    {candidateImage ? (
                        <img src={candidateImage} alt="News" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                        <Placeholder text="মূল ছবি" />
                    )}
                 </div>
            </div>

            {/* Headline */}
            <div className="relative w-full flex-shrink-0 text-center py-3">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23475569'/%3E%3C/svg%3E")` }}></div>
                <h2 className="text-3xl font-extrabold text-red-700 relative leading-tight" style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                    {displayText}
                </h2>
            </div>

            {/* CTA */}
             <div className="w-3/4 max-w-xs mx-auto bg-red-700 text-white text-center py-2 rounded-lg font-semibold shadow-md flex-shrink-0">
                <p>বিস্তারিত কমেন্টে</p>
            </div>

        </div>
    );


    const renderContent = () => {
        switch (template) {
            case 'facebook': return facebookLayout;
            case 'youtube': return youtubeLayout;
            case 'instagram': return instagramLayout;
            case 'quote': return quoteLayout;
            case 'speech': return speechLayout;
            case 'panel': return panelLayout;
            case 'hadith': return hadithLayout;
            case 'news': return newsLayout;
            default: return facebookLayout;
        }
    };

    return (
        <div ref={ref} className={`${baseClasses} ${aspectRatio}`}>
            {renderContent()}
        </div>
    );
});