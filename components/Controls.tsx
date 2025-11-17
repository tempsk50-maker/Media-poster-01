import React from 'react';
import { Uploader } from './Uploader';
import type { DesignTemplate } from '../types';

interface ControlsProps {
    onCandidateImageUpload: (base64: string) => void;
    candidateImagePreview: string | null;
    onClearCandidateImage: () => void;
    onLogoUpload: (base64: string) => void;
    logoImagePreview: string | null;
    onClearLogo: () => void;
    onTextChange: (text: string) => void;
    onGenerate: () => void;
    onDownload: () => void;
    setTemplate: (template: DesignTemplate) => void;
    currentTemplate: DesignTemplate;
    isLoading: boolean;
}

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
    <h2 className="flex items-center gap-2.5 text-md font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">
        {icon}
        <span>{title}</span>
    </h2>
);

export const Controls: React.FC<ControlsProps> = ({
    onCandidateImageUpload,
    candidateImagePreview,
    onClearCandidateImage,
    onLogoUpload,
    logoImagePreview,
    onClearLogo,
    onTextChange,
    onGenerate,
    onDownload,
    setTemplate,
    currentTemplate,
    isLoading
}) => {
    const templateButtonClasses = (template: DesignTemplate) =>
        `w-full py-2.5 px-4 rounded-lg transition duration-200 text-sm font-bold border ${
            currentTemplate === template
                ? 'bg-red-600 text-white shadow border-red-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
        }`;


    return (
        <div className="space-y-6">
            <div>
                <SectionHeader 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>}
                    title="ছবি ও লোগো"
                />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5 text-center">প্রার্থীর ছবি</label>
                        <Uploader onFileUpload={onCandidateImageUpload} imagePreview={candidateImagePreview} onClear={onClearCandidateImage} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1.5 text-center">লোগো</label>
                        <Uploader onFileUpload={onLogoUpload} imagePreview={logoImagePreview} onClear={onClearLogo} />
                    </div>
                </div>
            </div>

            <div>
                 <SectionHeader 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>}
                    title="উদ্ধৃতি বা টেক্সট"
                />
                 <textarea
                    className="w-full h-24 p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 text-slate-900 placeholder-slate-400"
                    placeholder="এখানে প্রার্থীর সম্পূর্ণ উক্তি বা কথা লিখুন... আমরা মূল অংশটি বের করে নেব।"
                    onChange={(e) => onTextChange(e.target.value)}
                    aria-label="Quote input"
                ></textarea>
            </div>

            <div>
                 <SectionHeader 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>}
                    title="প্ল্যাটফর্ম বাছাই করুন"
                />
                <div className="grid grid-cols-4 gap-3">
                    <button onClick={() => setTemplate('facebook')} className={templateButtonClasses('facebook')}>Facebook</button>
                    <button onClick={() => setTemplate('youtube')} className={templateButtonClasses('youtube')}>YouTube</button>
                    <button onClick={() => setTemplate('instagram')} className={templateButtonClasses('instagram')}>Instagram</button>
                    <button onClick={() => setTemplate('quote')} className={templateButtonClasses('quote')}>উক্তি পোস্ট</button>
                    <button onClick={() => setTemplate('speech')} className={templateButtonClasses('speech')}>বক্তব্য পোস্ট</button>
                    <button onClick={() => setTemplate('panel')} className={templateButtonClasses('panel')}>প্যানেল পোস্ট</button>
                    <button onClick={() => setTemplate('hadith')} className={templateButtonClasses('hadith')}>হাদিস পোস্ট</button>
                    <button onClick={() => setTemplate('news')} className={templateButtonClasses('news')}>সংবাদ পোস্ট</button>
                </div>
            </div>

            <div className="flex flex-col space-y-3 pt-4">
                 <button 
                    onClick={onGenerate} 
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:bg-red-400 disabled:cursor-not-allowed disabled:transform-none shadow hover:shadow-lg"
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    )}
                    <span>{isLoading ? 'জেনারেট হচ্ছে...' : 'ডিজাইন তৈরি করুন'}</span>
                </button>
                <button 
                    onClick={onDownload}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out border border-green-700 shadow hover:shadow-lg transform hover:scale-[1.02]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>ডাউনলোড করুন (JPG)</span>
                </button>
            </div>
        </div>
    );
};