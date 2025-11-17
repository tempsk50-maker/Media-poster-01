import React, { useRef } from 'react';

interface UploaderProps {
    onFileUpload: (base64: string) => void;
    imagePreview: string | null;
    onClear: () => void;
}

export const Uploader: React.FC<UploaderProps> = ({ onFileUpload, imagePreview, onClear }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onFileUpload(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening file dialog
        onClear();
    };

    return (
        <div 
            onClick={handleClick}
            className="relative w-full aspect-square bg-slate-50 rounded-xl border border-slate-300 flex items-center justify-center p-2 cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all duration-300 group"
            aria-label={`Upload Image`}
        >
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
                aria-hidden="true"
            />
            {imagePreview ? (
               <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-md" />
                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-colors duration-300 rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">পরিবর্তন করুন</span>
                    </div>
                    <button
                        onClick={handleClear}
                        className="absolute top-1 right-1 bg-white/70 hover:bg-white rounded-full p-1 text-slate-600 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="Clear image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
               </>
            ) : (
                <div className="text-center text-slate-400 group-hover:text-red-600 transition-colors duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="mt-2 text-xs font-semibold">ছবি যোগ করুন</p>
                </div>
            )}
        </div>
    );
};