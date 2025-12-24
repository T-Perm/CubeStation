import { useState, useEffect } from 'react';
import { ACHIEVEMENTS_DATA } from '../data/achievements';

/**
 * Hook to manage and fetch achievements data.
 * @returns {Object} Achievements state and utility functions.
 */
export function useAchievements() {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const timer = setTimeout(() => {
            // TODO: Replace with real API data in the future
            setAchievements(ACHIEVEMENTS_DATA);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const getStats = () => {
        const total = achievements.length;
        const unlocked = achievements.filter(a => a.unlocked).length;
        const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;

        return {
            total,
            unlocked,
            percentage
        };
    };

    return {
        achievements,
        loading,
        stats: getStats(),
        // Future: Add methods like claimAchievement, updateProgress, etc.
    };
}
