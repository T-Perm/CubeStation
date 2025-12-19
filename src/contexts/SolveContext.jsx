import { createContext, useContext, useState, useEffect } from "react";

const SolveContext = createContext();

export const useSolves = () => {
    const context = useContext(SolveContext);
    if (!context) {
        throw new Error("useSolves must be used within a SolveProvider");
    }
    return context;
};

export const SolveProvider = ({ children }) => {
    // Load from local storage or default to empty
    const [solves, setSolves] = useState(() => {
        const saved = localStorage.getItem("cubehub_solves");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cubehub_solves", JSON.stringify(solves));
    }, [solves]);

    const addSolve = (solve) => {
        setSolves((prev) => [solve, ...prev]);
    };

    const updatePenalty = (id, type) => {
        setSolves((prev) =>
            prev.map((s) => {
                if (s.id === id) {
                    let newPenalty = 0;
                    if (type === "+2") newPenalty = s.penalty === 2000 ? 0 : 2000;
                    if (type === "DNF") newPenalty = s.penalty === Infinity ? 0 : Infinity;
                    return { ...s, penalty: newPenalty };
                }
                return s;
            })
        );
    };

    const deleteSolve = (id) => {
        setSolves((prev) => prev.filter((s) => s.id !== id));
    };

    // --- Statistics Helpers ---
    const formatTime = (ms) => {
        if (ms === 0) return "0.00";
        if (ms === Infinity) return "DNF";
        const seconds = Math.floor(ms / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${seconds}.${centiseconds.toString().padStart(2, "0")}`;
    };

    const getBestSingle = () => {
        if (solves.length === 0) return "--";
        const validSolves = solves.filter((s) => s.penalty !== Infinity);
        if (validSolves.length === 0) return "--";
        const best = Math.min(...validSolves.map((s) => s.time + s.penalty));
        return formatTime(best);
    };

    const calculateAverage = (count) => {
        if (solves.length < count) return "--";
        // Get last 'count' solves
        const subset = solves.slice(0, count);
        // Map to times, handling DNF as Infinity
        const times = subset.map((s) => (s.penalty === Infinity ? Infinity : s.time + s.penalty));

        // Count DNFs
        const dnfCount = times.filter((t) => t === Infinity).length;

        if (dnfCount > 1) return "DNF"; // More than 1 DNF in Ao5/Ao12 = DNF (officially) - wait, Ao5 allows 1, Ao12 allows 1? 
        // WCA Rule: Remove best and worst.
        // If 1 DNF, it counts as worst. If >1 DNF, result is DNF.

        // Let's implement standard trimming (remove top 5% and bottom 5% roughly, or just min/max for small N)
        // For Ao5/Ao12: Remove Best and Worst.

        if (dnfCount > 1) return "DNF";

        let sortedTimes = [...times].sort((a, b) => a - b); // Ascending. Infinity will be at end.

        // Remove Best (first) and Worst (last)
        sortedTimes.shift();
        sortedTimes.pop();

        const sum = sortedTimes.reduce((a, b) => a + b, 0);
        return formatTime(sum / sortedTimes.length);
    };

    const getAo5 = () => calculateAverage(5);
    const getAo12 = () => calculateAverage(12);
    const getAo100 = () => calculateAverage(100);

    const getSolvesThisWeek = () => {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return solves.filter(s => new Date(s.date) > oneWeekAgo).length;
    };

    return (
        <SolveContext.Provider
            value={{
                solves,
                addSolve,
                updatePenalty,
                deleteSolve,
                getBestSingle,
                getAo5,
                getAo12,
                getAo100,
                formatTime,
                getSolvesThisWeek
            }}
        >
            {children}
        </SolveContext.Provider>
    );
};
