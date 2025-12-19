// Helper to reverse an algorithm string for setup generation
// e.g. "R U R'" -> "R' U' R"
export const reverseAlg = (alg) => {
    if (!alg) return "";
    return alg.split(/\s+/)
        .reverse()
        .map(move => {
            if (move.endsWith("'")) return move.slice(0, -1);
            if (move.endsWith("2")) return move;
            return move + "'";
        })
        .join(" ");
};

// Helper to generate VisualCube URL matching J Perm's style
export const getCubeImageUrl = (alg, type) => {
    if (!alg) return "";

    // Use the working visualcube API
    const baseUrl = "https://visualcube.api.cubing.net/visualcube.php";

    // Clean up non-standard notation
    let caseAlg = alg.replace(/\(([^)]+)\)/g, '$1');

    // Build parameters
    let params = new URLSearchParams({
        fmt: 'svg',
        size: '150',
        pzl: '3',
        case: caseAlg,
        bg: 't'
    });

    if (type === "OLL" || type === "PLL") {
        // Top view for OLL and PLL
        params.append('view', 'plan');
    }
    // F2L uses default 3D view (no view parameter needed)

    return `${baseUrl}?${params.toString()}`;
};
