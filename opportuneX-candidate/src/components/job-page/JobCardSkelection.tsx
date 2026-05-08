import { Bookmark } from 'lucide-react';

// Utility function to generate dark mode-friendly random background color
const getRandomColor = () => {
    const lightColors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-teal-500',
        'bg-purple-500',
        'bg-indigo-500'
    ];
    const darkColors = [
        'bg-gray-700',
        'bg-blue-800',
        'bg-green-800',
        'bg-purple-800',
        'bg-teal-800'


        
    ];

    // Randomly select from light or dark color sets based on the theme
    if (document.documentElement.classList.contains('dark')) {
        return darkColors[Math.floor(Math.random() * darkColors.length)];
    }

    return lightColors[Math.floor(Math.random() * lightColors.length)];
};

export const JobCardSkeleton = () => {
    const randomBgColor = getRandomColor(); // Get a random background color based on theme

    return (
        <div className={`job-card ${randomBgColor} bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md animate-pulse`}>
            {/* Skeleton for date and bookmark */}
            <div className="flex justify-between mb-4">
                <div className="w-24 h-4 bg-gray-300 dark:bg-zinc-700 rounded"></div>
                <div className="w-8 h-8 bg-gray-300 dark:bg-zinc-700 rounded-full"></div>
            </div>

            {/* Skeleton for position and company */}
            <div className="mb-4">
                <div className="w-36 h-6 bg-gray-300 dark:bg-zinc-700 rounded mb-2"></div>
                <div className="w-24 h-4 bg-gray-300 dark:bg-zinc-700 rounded"></div>
            </div>

            {/* Skeleton for tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                <div className="w-20 h-6 bg-gray-300 dark:bg-zinc-700 rounded"></div>
                <div className="w-20 h-6 bg-gray-300 dark:bg-zinc-700 rounded"></div>
            </div>

            {/* Skeleton for location and salary */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="w-24 h-4 bg-gray-300 dark:bg-zinc-700 rounded mb-2"></div>
                    <div className="w-36 h-6 bg-gray-300 dark:bg-zinc-700 rounded"></div>
                </div>
                <div className="w-20 h-8 bg-gray-300 dark:bg-zinc-700 rounded"></div>
            </div>
        </div>
    );
};
