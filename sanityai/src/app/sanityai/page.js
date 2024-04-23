'use client';
import React, { useState } from 'react';

const ImageGenerator = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [prompt, setPrompt] = useState(''); // State for the prompt

    const generateImage = async () => {
        const response = await fetch('http://localhost:5001/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }), // Send the prompt in the request body
        });
        const data = await response.json();
        setImageUrl(data.imageUrl);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">AI Image Generator</h1>
            <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                type="text"
                className="rounded-full py-2 px-4 w-full max-w-lg bg-gray-700 text-white placeholder-gray-400 mb-4"
                placeholder="Enter a prompt"
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={generateImage}
            >
                Generate Image
            </button>
            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Generated Image" className="max-w-full" />
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;