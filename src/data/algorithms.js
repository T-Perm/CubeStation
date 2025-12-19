export const algorithmsData = {
    OLL: {
        title: "OLL (Orientation of Last Layer)",
        count: 57,
        cases: [
            // Dot Shapes
            { id: "OLL1", name: "Runway", alg: "R U2 R2 F R F' U2 R' F R F'", group: "Dot" },
            { id: "OLL2", name: "Zamboni", alg: "r U r' U2 r U2 R' U2 R U' r'", group: "Dot" },
            { id: "OLL3", name: "Anti-Sune (Dot)", alg: "r' R2 U R' U r U2 r' U M'", group: "Dot" },
            { id: "OLL4", name: "Sune (Dot)", alg: "M U' r U2 r' U' R U' R' M'", group: "Dot" },
            { id: "OLL17", name: "Diagonal", alg: "R U R' U R' F R F' U2 R' F R F'", group: "Dot" },
            { id: "OLL18", name: "Crown", alg: "r U R' U R U2 r2 U' R U' R' U2 r", group: "Dot" },
            { id: "OLL19", name: "Bunny", alg: "r' R U R U R' U' M' R' F R F'", group: "Dot" },
            { id: "OLL20", name: "Checkers", alg: "r U R' U' M2 U R U' R' U' M'", group: "Dot" },

            // Square Shapes
            { id: "OLL5", name: "Right Square", alg: "r' U2 R U R' U r", group: "Square" },
            { id: "OLL6", name: "Left Square", alg: "r U2 R' U' R U' r'", group: "Square" },

            // Small Lightning
            { id: "OLL7", name: "Wide Sune", alg: "r U R' U R U2 r'", group: "Small Lightning" },
            { id: "OLL8", name: "Wide Anti-Sune", alg: "r' U' R U' R' U2 r", group: "Small Lightning" },
            { id: "OLL11", name: "Lightning", alg: "r U R' U R' F R F' R U2 r'", group: "Small Lightning" },
            { id: "OLL12", name: "Inverted Lightning", alg: "M' R' U' R U' R' U2 R U' M", group: "Small Lightning" },

            // Fish Shapes
            { id: "OLL9", name: "Kite", alg: "R U R' U' R' F R2 U R' U' F'", group: "Fish" },
            { id: "OLL10", name: "Inverted Kite", alg: "R U R' U R' F R F' R U2 R'", group: "Fish" },

            // Knight Moves
            { id: "OLL13", name: "Gun", alg: "F U R U' R2 F' R U R U' R'", group: "Knight" },
            { id: "OLL14", name: "Anti-Gun", alg: "R' F R U R' F' R F U' F'", group: "Knight" },
            { id: "OLL15", name: "Souse", alg: "r' U' r R' U' R U r' U r", group: "Knight" },
            { id: "OLL16", name: "Anti-Souse", alg: "r U r' R U R' U' r U' r'", group: "Knight" },

            // Cross Shapes
            { id: "OLL21", name: "Double H", alg: "R U2 R' U' R U R' U' R U' R'", group: "Cross" },
            { id: "OLL22", name: "Pi", alg: "R U2 R2 U' R2 U' R2 U2 R", group: "Cross" },
            { id: "OLL23", name: "Headlights", alg: "R2 D R' U2 R D' R' U2 R'", group: "Cross" },
            { id: "OLL24", name: "Chameleon", alg: "r U R' U' r' F R F'", group: "Cross" },
            { id: "OLL25", name: "Bowtie", alg: "F' r U R' U' r' F R", group: "Cross" },
            { id: "OLL26", name: "Anti-Sune", alg: "R U2 R' U' R U' R'", group: "Cross" },
            { id: "OLL27", name: "Sune", alg: "R U R' U R U2 R'", group: "Cross" },

            // Corners Oriented
            { id: "OLL28", name: "Arrowhead", alg: "r U R' U' r' R U R U' R'", group: "Corners Oriented" },

            // Awkward Shapes
            { id: "OLL29", name: "Awkward 1", alg: "R U R' U' R U' R' F' U' F R U R'", group: "Awkward" },
            { id: "OLL30", name: "Awkward 2", alg: "F R' F R2 U' R' U' R U R' F2", group: "Awkward" },
            { id: "OLL41", name: "Awkward 3", alg: "R U R' U R U2 R' F R U R' U' F'", group: "Awkward" },
            { id: "OLL42", name: "Awkward 4", alg: "R' U' R U' R' U2 R F R U R' U' F'", group: "Awkward" },

            // P Shapes
            { id: "OLL31", name: "Couch", alg: "R' U' F U R U' R' F' R", group: "P-Shape" },
            { id: "OLL32", name: "Anti-Couch", alg: "L U F' U' L' U L F L'", group: "P-Shape" },
            { id: "OLL33", name: "T-Shape P", alg: "R U R' U' R' F R F'", group: "P-Shape" },
            { id: "OLL34", name: "C-Shape P", alg: "R U R2 U' R' F R U R U' F'", group: "P-Shape" },
            { id: "OLL43", name: "P-Shape 1", alg: "F' U' L' U L F", group: "P-Shape" },
            { id: "OLL44", name: "P-Shape 2", alg: "F U R U' R' F'", group: "P-Shape" },

            // T Shapes
            { id: "OLL45", name: "T-Shape 2", alg: "F R U R' U' F'", group: "T-Shape" },

            // W Shapes
            { id: "OLL36", name: "W-Shape 1", alg: "L' U' L U' L' U L U L F' L' F", group: "W-Shape" },
            { id: "OLL38", name: "W-Shape 2", alg: "R U R' U R U' R' U' R' F R F'", group: "W-Shape" },

            // C Shapes
            { id: "OLL34", name: "C-Shape 1", alg: "R U R' U' B' R' F R F' B", group: "C-Shape" },
            { id: "OLL46", name: "C-Shape 2", alg: "R' U' R' F R F' U R", group: "C-Shape" },

            // L Shapes (Big)
            { id: "OLL47", name: "Small L-Shape 1", alg: "F' L' U' L U F", group: "L-Shape" },
            { id: "OLL48", name: "Small L-Shape 2", alg: "F R U R' U' F'", group: "L-Shape" },
            { id: "OLL49", name: "Big L-Shape 1", alg: "r U' r2 U r2 U r2 U' r", group: "L-Shape" },
            { id: "OLL50", name: "Big L-Shape 2", alg: "r' U r2 U' r2 U' r2 U r'", group: "L-Shape" },
            { id: "OLL53", name: "Wide L 1", alg: "r' U' R U' R' U R U' R' U2 r", group: "L-Shape" },
            { id: "OLL54", name: "Wide L 2", alg: "r U R' U R U' R' U R U2 r'", group: "L-Shape" },

            // I Shapes
            { id: "OLL51", name: "I-Shape 1", alg: "F U R U' R' U R U' R' F'", group: "I-Shape" },
            { id: "OLL52", name: "I-Shape 2", alg: "R U R' U R U' B U' B' R'", group: "I-Shape" },
            { id: "OLL55", name: "I-Shape 3", alg: "R U2 R2 U' R U' R' U2 F R F'", group: "I-Shape" },
            { id: "OLL56", name: "I-Shape 4", alg: "F R U R' U' R F' r U R' U' r'", group: "I-Shape" },

            // Remaining
            { id: "OLL57", name: "H-Shape", alg: "R U R' U' M' U R U' r'", group: "H-Shape" }
        ].sort((a, b) => parseInt(a.id.slice(3)) - parseInt(b.id.slice(3)))
    },
    PLL: {
        title: "PLL (Permutation of Last Layer)",
        count: 21,
        cases: [
            { id: "Aa", name: "Aa Perm", alg: "x L2 D2 L' U' L D2 L' U L'", imgAlg: "R' F R' B2 R F' R' B2 R2", group: "Adjacent Corner Swap" },
            { id: "Ab", name: "Ab Perm", alg: "x L D' L U2 L' D L U2 L2", imgAlg: "R2 B2 R F R' B2 R F' R", group: "Adjacent Corner Swap" },
            { id: "F", name: "F Perm", alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", group: "Adjacent Corner Swap" },
            { id: "Ga", name: "Ga Perm", alg: "R2 U R' U R' U' R U' R2 U' D R' U R D'", group: "Adjacent Corner Swap" },
            { id: "Gb", name: "Gb Perm", alg: "R' U' R U D' R2 U R' U R U' R U' R2 D", group: "Adjacent Corner Swap" },
            { id: "Gc", name: "Gc Perm", alg: "R2 U' R U' R U R' U R2 U D' R U' R' D", group: "Adjacent Corner Swap" },
            { id: "Gd", name: "Gd Perm", alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'", group: "Adjacent Corner Swap" },
            { id: "Ja", name: "Ja Perm", alg: "x R2 F R F' R U2 r' U r U2", imgAlg: "L' U' L F L' U' L U L F' L2 U L", group: "Adjacent Corner Swap" },
            { id: "Jb", name: "Jb Perm", alg: "R U R' F' R U R' U' R' F R2 U' R'", group: "Adjacent Corner Swap" },
            { id: "Ra", name: "Ra Perm", alg: "R U' R' U' R U R D R' U' R D' R' U2 R'", group: "Adjacent Corner Swap" },
            { id: "Rb", name: "Rb Perm", alg: "R2 F R U R U' R' F' R U2 R' U2 R", group: "Adjacent Corner Swap" },
            { id: "T", name: "T Perm", alg: "R U R' U' R' F R2 U' R' U' R U R' F'", group: "Adjacent Corner Swap" },
            { id: "E", name: "E Perm", alg: "x' R U' R' D R U R' D' R U R' D R U' R' D'", imgAlg: "R B' R' F R B R' F' R B R' F R B' R' F'", group: "Diagonal Corner Swap" },
            { id: "Na", name: "Na Perm", alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", group: "Diagonal Corner Swap" },
            { id: "Nb", name: "Nb Perm", alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R", group: "Diagonal Corner Swap" },
            { id: "V", name: "V Perm", alg: "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2", group: "Diagonal Corner Swap" },
            { id: "Y", name: "Y Perm", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'", group: "Diagonal Corner Swap" },
            { id: "H", name: "H Perm", alg: "M2 U M2 U2 M2 U M2", group: "Edges Only" },
            { id: "Ua", name: "Ua Perm", alg: "M2 U M U2 M' U M2", group: "Edges Only" },
            { id: "Ub", name: "Ub Perm", alg: "M2 U' M U2 M' U' M2", group: "Edges Only" },
            { id: "Z", name: "Z Perm", alg: "M' U M2 U M2 U M' U2 M2", group: "Edges Only" }
        ]
    },
    F2L: {
        title: "F2L (First 2 Layers)",
        count: 41,
        cases: [
            // Basic Inserts
            { id: "F2L1", name: "Basic Right Insert", alg: "U R U' R'", group: "Basic" },
            { id: "F2L2", name: "Basic Left Insert", alg: "U' L' U L", group: "Basic" },
            { id: "F2L3", name: "Basic Right Insert (Pair)", alg: "R U R'", group: "Basic" },
            { id: "F2L4", name: "Basic Left Insert (Pair)", alg: "L' U' L", group: "Basic" },

            // Split Pairs
            { id: "F2L5", name: "Split Pair 1", alg: "y U' R U R' U R U R'", group: "Split Pair" },
            { id: "F2L6", name: "Split Pair 2", alg: "y U' R' U R", group: "Split Pair" },
            { id: "F2L7", name: "Split Pair 3", alg: "U' R U R' U2 R U' R'", group: "Split Pair" },
            { id: "F2L8", name: "Split Pair 4", alg: "d R' U' R U(2) R' U R", group: "Split Pair" },

            // Connected Pairs
            { id: "F2L9", name: "Connected Pair 1", alg: "U' R U' R' U y' R' U R", group: "Connected" },
            { id: "F2L10", name: "Connected Pair 2", alg: "U R U R' U' F R' F' R", group: "Connected" },
            { id: "F2L11", name: "Connected Pair 3", alg: "U' R U2 R' U y' R' U' R", group: "Connected" },

            // Corner in Slot
            { id: "F2L12", name: "Corner in Slot 1", alg: "R U R' U' R U R'", group: "Corner in Slot" },
            { id: "F2L13", name: "Corner in Slot 2", alg: "R U' R' U R U' R'", group: "Corner in Slot" },
            { id: "F2L14", name: "Corner in Slot 3", alg: "R U' R' U y' R' U R", group: "Corner in Slot" },

            // Advanced Cases (Selection of Standard 41)
            { id: "F2L15", name: "Keyhole 1", alg: "R U R' U2 R U' R' U R U' R'", group: "Advanced" },
            { id: "F2L16", name: "Keyhole 2", alg: "R U' R' U2 y' R' U' R", group: "Advanced" },
            { id: "F2L17", name: "F2L 17", alg: "R U2 R' U' R U R'", group: "Advanced" },
            { id: "F2L18", name: "F2L 18", alg: "y' R' U2 R U R' U' R", group: "Advanced" },
            { id: "F2L19", name: "F2L 19", alg: "U R U2 R' U R U' R'", group: "Advanced" },
            { id: "F2L20", name: "F2L 20", alg: "y' U' R' U2 R U' R' U R", group: "Advanced" },
            { id: "F2L21", name: "F2L 21", alg: "U2 R U R' U R U' R'", group: "Advanced" },
            { id: "F2L22", name: "F2L 22", alg: "y' U2 R' U' R U' R' U R", group: "Advanced" },
            { id: "F2L23", name: "F2L 23", alg: "U2 R2 U2 R' U' R U' R2", group: "Advanced" },
            { id: "F2L24", name: "F2L 24", alg: "y' U2 R2 U2 R U R' U R2", group: "Advanced" },
            { id: "F2L25", name: "F2L 25", alg: "y U' R' U R U' R' U R", group: "Advanced" },
            { id: "F2L26", name: "F2L 26", alg: "U' R U' R' U R U R'", group: "Advanced" },
            { id: "F2L27", name: "F2L 27", alg: "y' R' U R U' R' U R", group: "Advanced" },
            { id: "F2L28", name: "F2L 28", alg: "R U' R' U R U' R'", group: "Advanced" },
            { id: "F2L29", name: "F2L 29", alg: "y R' U' R U R' U' R", group: "Advanced" },
            { id: "F2L30", name: "F2L 30", alg: "R U R' U' R U R'", group: "Advanced" },
            { id: "F2L31", name: "F2L 31", alg: "U' R U R' U y' R' U' R", group: "Advanced" },
            { id: "F2L32", name: "F2L 32", alg: "U R U' R' U' F R' F' R", group: "Advanced" },
            { id: "F2L33", name: "F2L 33", alg: "U R U' R' U' R U R'", group: "Advanced" },
            { id: "F2L34", name: "F2L 34", alg: "y U' R' U R U R' U' R", group: "Advanced" },
            { id: "F2L35", name: "F2L 35", alg: "U' R U2 R' U2 R U' R'", group: "Advanced" },
            { id: "F2L36", name: "F2L 36", alg: "y U R' U2 R U2 R' U R", group: "Advanced" },
            { id: "F2L37", name: "F2L 37", alg: "R U2 R' U' R U R' U2 R U' R'", group: "Advanced" },
            { id: "F2L38", name: "F2L 38", alg: "R U R' U2 R U' R' U R U R'", group: "Advanced" },
            { id: "F2L39", name: "F2L 39", alg: "R U' R' U2 R U R' U2 R U' R'", group: "Advanced" },
            { id: "F2L40", name: "F2L 40", alg: "R U R' U' R U2 R' U' R U R'", group: "Advanced" },
            { id: "F2L41", name: "F2L 41", alg: "R U' R' U y' R' U2 R U R' U' R", group: "Advanced" }
        ]
    },
    CMLL: {
        title: "CMLL (Corners of Last Layer)",
        count: 42,
        cases: [
            // O Set
            { id: "CMLL1", name: "O 1", alg: "R U R' U R U2 R'", group: "O Set" },
            { id: "CMLL2", name: "O 2", alg: "R U2 R' U' R U' R'", group: "O Set" },
            // H Set
            { id: "CMLL3", name: "H 1", alg: "R U R' U R U' R' U R U2 R'", group: "H Set" },
            { id: "CMLL4", name: "H 2", alg: "F R U R' U' R U R' U' R U R' U' F'", group: "H Set" },
            // Pi Set
            { id: "CMLL5", name: "Pi 1", alg: "R U2 R2 U' R2 U' R2 U2 R", group: "Pi Set" },
            { id: "CMLL6", name: "Pi 2", alg: "F R U R' U' F'", group: "Pi Set" },
            // U Set
            { id: "CMLL7", name: "U 1", alg: "R2 D R' U2 R D' R' U2 R'", group: "U Set" },
            { id: "CMLL8", name: "U 2", alg: "R U R' U R U2 R2 U' R U' R' U2 R", group: "U Set" },
            // T Set
            { id: "CMLL9", name: "T 1", alg: "R U R' U' R' F R F'", group: "T Set" },
            { id: "CMLL10", name: "T 2", alg: "L' U' L U L F' L' F", group: "T Set" },
            // S Set
            { id: "CMLL11", name: "S 1", alg: "R U R' U R U2 R'", group: "S Set" },
            { id: "CMLL12", name: "S 2", alg: "R U2 R' U' R U' R'", group: "S Set" },
            // As Set
            { id: "CMLL13", name: "As 1", alg: "R U2 R2 U' R2 U' R2 U2 R", group: "As Set" },
            { id: "CMLL14", name: "As 2", alg: "F R U R' U' F'", group: "As Set" },
            // L Set
            { id: "CMLL15", name: "L 1", alg: "R U R' U R U2 R'", group: "L Set" },
            { id: "CMLL16", name: "L 2", alg: "R U2 R' U' R U' R'", group: "L Set" },
        ]
    }
}
