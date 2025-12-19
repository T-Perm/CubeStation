export const tutorialsData = {
    "beginner-guide": {
        title: "Beginner's Guide (Layer by Layer)",
        description: "The most popular method for solving the Rubik's Cube. Perfect for your first solve.",
        difficulty: "Easy",
        steps: [
            {
                title: "Step 1: The White Cross",
                content: "Find the white center piece. Hold the cube so the white center is on top. Locate the four edge pieces that have white on them. Your goal is to place them around the white center such that the other color on the edge piece matches the center piece of the adjacent face.",
                tips: ["Think of the white edges as petals of a daisy around the yellow center first, then rotate them down to the white center."]
            },
            {
                title: "Step 2: The White Corners",
                content: "Locate the corner pieces with white stickers. Place them into the bottom layer (white facing down) below their target position. Use the algorithm R U R' U' to insert them.",
                tips: ["Repeat R U R' U' until the corner is solved."]
            },
            {
                title: "Step 3: The Second Layer (F2L-lite)",
                content: "Flip the cube over so white is on the bottom. Find edge pieces in the top layer that do not have yellow. Match the side color to its center. Move it away from the target slot, then perform the algorithm to take the corner out and pair it.",
                tips: ["If moving to the right: U R U' R' U' F' U F", "If moving to the left: U' L' U L U F U' F'"]
            },
            {
                title: "Step 4: The Yellow Cross",
                content: "Look at the yellow patterns on top (Dot, L-shape, Line, or Cross).",
                tips: ["Algorithm: F R U R' U' F'", "Dot -> L-shape -> Line -> Cross"]
            },
            {
                title: "Step 5: Align Yellow Cross",
                content: "Rotate the top layer to match as many edge colors to side centers as possible. You want at least two matching.",
                tips: ["Swap algorithm: R U R' U R U2 R'"]
            },
            {
                title: "Step 6: Position Top Corners",
                content: "Find a corner that is in the correct spot (even if twisted wrong). Hold it on the front-right-top.",
                tips: ["Cycle algorithm: U R U' L' U R' U' L"]
            },
            {
                title: "Step 7: Orient Top Corners",
                content: "Hold the cube so an unsolved corner is at front-right-top. Repeat R' D' R D until it is solved. Then rotate ONLY the top face to bring the next unsolved corner to that position.",
                tips: ["Be careful not to rotate the whole cube, only the top layer (U moves)."]
            }
        ]
    },
    "cfop-guide": {
        title: "CFOP Method (Advanced)",
        description: "The method used by the fastest speedcubers. Cross, F2L, OLL, PLL.",
        difficulty: "Hard",
        steps: [
            {
                title: "Cross",
                content: "Solve the four cross pieces on the bottom layer directly, usually in 8 moves or less. Plan the entire cross during inspection.",
                tips: ["Solve cross on bottom.", "Color neutrality can help."]
            },
            {
                title: "F2L (First 2 Layers)",
                content: "Pair up corners and edges and insert them into their slots simultaneously, solving the first two layers at once.",
                tips: ["41 standard cases.", "Look ahead to the next pair while solving the current one."]
            },
            {
                title: "OLL (Orientation of Last Layer)",
                content: "Orient all top layer pieces so the top face is a solid color (usually yellow).",
                tips: ["57 algorithms for full OLL.", "2-Look OLL is recommended for intermediates."]
            },
            {
                title: "PLL (Permutation of Last Layer)",
                content: "Move the pieces of the top layer to their solved positions.",
                tips: ["21 algorithms for full PLL.", "Learn Aa, Ab, E, F, J, T, Y permutations first."]
            }
        ]
    },
    "roux-guide": {
        title: "Roux Method",
        description: "A block-building method that relies less on algorithms and more on intuition and M-slice moves.",
        difficulty: "Hard",
        steps: [
            {
                title: "First Block",
                content: "Build a 1x2x3 block on the left side (DL, L, and UL centers + edges/corners).",
                tips: ["Use inspection to plan at least the first square."]
            },
            {
                title: "Second Block",
                content: "Build a 1x2x3 block on the right side, leaving the M-slice and U-layer free.",
                tips: ["Use R, r, M, and U moves only."]
            },
            {
                title: "CMLL (Corners of Last Layer)",
                content: "Solve the 4 corners of the top layer in one step (orientation and permutation).",
                tips: ["42 algorithms for full CMLL.", "Can use 2-look CMLL initially."]
            },
            {
                title: "LSE (Last Six Edges)",
                content: "Solve the remaining 6 edges (4 on top, 2 in M-slice) using only M and U moves.",
                tips: ["Stages: Orient Edges (EO) -> Solve UL/UR edges -> Solve centers and last 4 edges (4c)."]
            }
        ]
    }
}
