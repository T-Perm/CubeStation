export const quizzesData = [
    {
        id: "quiz-1",
        title: "Cube Basics",
        level: "Beginner",
        difficulty: 1,
        description: "Learn the fundamental parts and notation of a Rubik's Cube",
        questions: [
            {
                id: "q1-1",
                question: "How many center pieces does a standard 3x3 Rubik's Cube have?",
                options: ["4", "6", "8", "12"],
                correctAnswer: 1,
                explanation: "A 3x3 cube has 6 center pieces - one for each face of the cube."
            },
            {
                id: "q1-2",
                question: "What does the notation 'R' mean?",
                options: ["Rotate the right face clockwise", "Rotate the right face counter-clockwise", "Rotate the rear face clockwise", "Rotate the cube right"],
                correctAnswer: 0,
                explanation: "R means rotate the right face 90 degrees clockwise when looking at that face."
            },
            {
                id: "q1-3",
                question: "How many edge pieces are on a 3x3 cube?",
                options: ["8", "12", "16", "20"],
                correctAnswer: 1,
                explanation: "There are 12 edge pieces on a standard 3x3 Rubik's Cube."
            },
            {
                id: "q1-4",
                question: "What does the prime symbol (') mean in cube notation?",
                options: ["Turn twice", "Turn clockwise", "Turn counter-clockwise", "Turn the middle layer"],
                correctAnswer: 2,
                explanation: "The prime symbol (') indicates a counter-clockwise turn. For example, R' means turn the right face counter-clockwise."
            },
            {
                id: "q1-5",
                question: "How many corner pieces does a 3x3 cube have?",
                options: ["4", "6", "8", "12"],
                correctAnswer: 2,
                explanation: "A 3x3 cube has 8 corner pieces, one at each corner of the cube."
            }
        ]
    },
    {
        id: "quiz-2",
        title: "Move Notation",
        level: "Beginner",
        difficulty: 1,
        description: "Master basic cube notation and simple move sequences",
        questions: [
            {
                id: "q2-1",
                question: "What does 'U2' mean?",
                options: ["Turn upper face twice", "Turn upper face counter-clockwise", "Turn upper two layers", "Undo the last move"],
                correctAnswer: 0,
                explanation: "U2 means turn the upper face 180 degrees (two 90-degree turns)."
            },
            {
                id: "q2-2",
                question: "Which move is the opposite of 'F'?",
                options: ["B", "F2", "F'", "f"],
                correctAnswer: 2,
                explanation: "F' (F prime) is the opposite of F, undoing a front face clockwise turn."
            },
            {
                id: "q2-3",
                question: "What does lowercase 'r' typically mean?",
                options: ["Rotate right face slowly", "Rotate right face twice", "Rotate right face and middle layer", "Rotate rear face"],
                correctAnswer: 2,
                explanation: "Lowercase letters (like r) typically indicate a wide turn - the face plus the adjacent middle layer."
            },
            {
                id: "q2-4",
                question: "How many moves are in the sequence: R U R' U'?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 2,
                explanation: "There are 4 moves: R, U, R', and U'."
            },
            {
                id: "q2-5",
                question: "What does 'M' refer to?",
                options: ["Middle layer between L and R", "Move the cube", "Mirror the algorithm", "Multiple turns"],
                correctAnswer: 0,
                explanation: "M refers to the middle layer between the left and right faces, turning in the same direction as L."
            }
        ]
    },
    {
        id: "quiz-3",
        title: "Cross Fundamentals",
        level: "Beginner",
        difficulty: 2,
        description: "Understanding the first step of CFOP - solving the cross",
        questions: [
            {
                id: "q3-1",
                question: "On which face is the cross typically solved first in CFOP?",
                options: ["White", "Yellow", "Any color", "Green"],
                correctAnswer: 0,
                explanation: "Most cubers solve the white cross first, though any color works - white is convention."
            },
            {
                id: "q3-2",
                question: "How many edge pieces make up the cross?",
                options: ["2", "4", "6", "8"],
                correctAnswer: 1,
                explanation: "The cross consists of 4 edge pieces surrounding the center piece."
            },
            {
                id: "q3-3",
                question: "What should match when solving the cross correctly?",
                options: ["Only the cross color", "Cross color and center colors", "All edge colors", "Corner colors"],
                correctAnswer: 1,
                explanation: "The cross edges must match both the bottom center and the side centers they touch."
            },
            {
                id: "q3-4",
                question: "What is 'color neutrality' in cross solving?",
                options: ["Using any color for the cross", "Solving without looking", "Speed solving technique", "Advanced F2L method"],
                correctAnswer: 0,
                explanation: "Color neutrality means being able to solve the cross starting with any color, choosing the easiest."
            },
            {
                id: "q3-5",
                question: "What is the ideal number of moves for an efficient cross?",
                options: ["4-6 moves", "8-10 moves", "12-15 moves", "Any number"],
                correctAnswer: 0,
                explanation: "An efficient cross can typically be solved in 4-8 moves with practice and planning."
            }
        ]
    },
    {
        id: "quiz-4",
        title: "F2L Basics",
        level: "Intermediate",
        difficulty: 3,
        description: "Introduction to First Two Layers solving",
        questions: [
            {
                id: "q4-1",
                question: "What does F2L stand for?",
                options: ["Fast 2 Layers", "First 2 Layers", "Final 2 Layers", "Front 2 Layers"],
                correctAnswer: 1,
                explanation: "F2L stands for First 2 Layers - solving the first two layers simultaneously."
            },
            {
                id: "q4-2",
                question: "How many F2L pairs are there to solve?",
                options: ["2", "4", "6", "8"],
                correctAnswer: 1,
                explanation: "There are 4 F2L pairs (corner-edge pairs) to solve, one for each slot."
            },
            {
                id: "q4-3",
                question: "What two pieces make up an F2L pair?",
                options: ["Two edges", "Two corners", "Corner and edge", "Edge and center"],
                correctAnswer: 2,
                explanation: "Each F2L pair consists of one corner piece and one edge piece that belong together."
            },
            {
                id: "q4-4",
                question: "Where should F2L pairs be positioned before inserting?",
                options: ["Bottom layer", "Top layer", "Middle layer", "Any layer"],
                correctAnswer: 1,
                explanation: "F2L pairs are typically set up in the top layer before being inserted into their slot."
            },
            {
                id: "q4-5",
                question: "What is the main advantage of F2L over layer-by-layer?",
                options: ["Easier to learn", "Fewer moves", "Looks cooler", "Works on any cube"],
                correctAnswer: 1,
                explanation: "F2L is more efficient, requiring significantly fewer moves than solving corners and edges separately."
            }
        ]
    },
    {
        id: "quiz-5",
        title: "OLL Recognition",
        level: "Intermediate",
        difficulty: 4,
        description: "Learn to recognize OLL patterns and cases",
        questions: [
            {
                id: "q5-1",
                question: "What does OLL stand for?",
                options: ["Orient Last Layer", "Only Last Layer", "Optimal Last Layer", "Order Last Layer"],
                correctAnswer: 0,
                explanation: "OLL stands for Orientation of the Last Layer - making all top pieces face upward."
            },
            {
                id: "q5-2",
                question: "How many OLL cases are there in total?",
                options: ["21", "42", "57", "78"],
                correctAnswer: 2,
                explanation: "There are 57 different OLL cases to learn for full OLL."
            },
            {
                id: "q5-3",
                question: "What is a 'dot' case in OLL?",
                options: ["No edges oriented", "All edges oriented", "Two edges oriented", "One edge oriented"],
                correctAnswer: 0,
                explanation: "A dot case has no edges oriented correctly, showing only the center on top."
            },
            {
                id: "q5-4",
                question: "What is '2-look OLL'?",
                options: ["Looking at the cube twice", "Solving OLL in two steps", "Two algorithms only", "Advanced technique"],
                correctAnswer: 1,
                explanation: "2-look OLL solves orientation in two steps: first edges, then corners, using fewer algorithms."
            },
            {
                id: "q5-5",
                question: "What shape has all edges oriented but corners not?",
                options: ["Dot", "Cross", "Line", "L-shape"],
                correctAnswer: 1,
                explanation: "When all 4 edges are oriented, you have a cross shape on top."
            }
        ]
    },
    {
        id: "quiz-6",
        title: "PLL Recognition",
        level: "Intermediate",
        difficulty: 4,
        description: "Master PLL pattern recognition and solving",
        questions: [
            {
                id: "q6-1",
                question: "What does PLL stand for?",
                options: ["Permute Last Layer", "Perfect Last Layer", "Position Last Layer", "Place Last Layer"],
                correctAnswer: 0,
                explanation: "PLL stands for Permutation of the Last Layer - positioning all pieces correctly."
            },
            {
                id: "q6-2",
                question: "How many PLL cases are there?",
                options: ["13", "21", "32", "57"],
                correctAnswer: 1,
                explanation: "There are 21 different PLL cases in total."
            },
            {
                id: "q6-3",
                question: "What is a 'headlights' pattern?",
                options: ["Two adjacent matching colors", "Two opposite matching colors", "All colors matching", "No colors matching"],
                correctAnswer: 0,
                explanation: "Headlights refer to two adjacent pieces of the same color on one face."
            },
            {
                id: "q6-4",
                question: "Which PLL only swaps edges?",
                options: ["T perm", "Y perm", "Ua perm", "Aa perm"],
                correctAnswer: 2,
                explanation: "Ua and Ub perms only swap edges, leaving corners in place."
            },
            {
                id: "q6-5",
                question: "What is AUF in PLL?",
                options: ["Advanced Upper Face", "Adjust U Face", "After U Face", "Automatic Upper Fix"],
                correctAnswer: 1,
                explanation: "AUF means Adjust U Face - the final U turn(s) to align the solved cube."
            }
        ]
    },
    {
        id: "quiz-7",
        title: "CFOP Method Mastery",
        level: "Intermediate",
        difficulty: 5,
        description: "Test your complete understanding of the CFOP method",
        questions: [
            {
                id: "q7-1",
                question: "What does CFOP stand for?",
                options: ["Cross, F2L, OLL, PLL", "Center, Face, Orient, Permute", "Complete, Fast, Optimal, Perfect", "Cross, First, Orient, Position"],
                correctAnswer: 0,
                explanation: "CFOP stands for Cross, F2L (First 2 Layers), OLL (Orient Last Layer), PLL (Permute Last Layer)."
            },
            {
                id: "q7-2",
                question: "What is the typical solve order in CFOP?",
                options: ["Cross → OLL → F2L → PLL", "F2L → Cross → OLL → PLL", "Cross → F2L → OLL → PLL", "OLL → PLL → Cross → F2L"],
                correctAnswer: 2,
                explanation: "CFOP solves in order: Cross, then F2L, then OLL, finally PLL."
            },
            {
                id: "q7-3",
                question: "Approximately how many algorithms are in full CFOP?",
                options: ["20-30", "40-50", "78-80", "100+"],
                correctAnswer: 2,
                explanation: "Full CFOP includes 57 OLL + 21 PLL = 78 algorithms, plus F2L cases."
            },
            {
                id: "q7-4",
                question: "What is 'lookahead' in CFOP?",
                options: ["Looking at the solution", "Planning next moves while executing", "Checking the timer", "Memorizing algorithms"],
                correctAnswer: 1,
                explanation: "Lookahead is planning your next F2L pair or step while executing the current one."
            },
            {
                id: "q7-5",
                question: "Which step typically takes the most time for intermediate solvers?",
                options: ["Cross", "F2L", "OLL", "PLL"],
                correctAnswer: 1,
                explanation: "F2L typically takes 50-60% of solve time as it involves the most pieces and decisions."
            }
        ]
    },
    {
        id: "quiz-8",
        title: "Advanced F2L",
        level: "Advanced",
        difficulty: 6,
        description: "Master advanced F2L techniques and edge cases",
        questions: [
            {
                id: "q8-1",
                question: "What is a 'keyhole' solution in F2L?",
                options: ["Using an empty slot to solve pairs", "A specific algorithm", "Breaking and remaking pairs", "Advanced lookahead"],
                correctAnswer: 0,
                explanation: "Keyhole uses an empty F2L slot to manipulate pieces for easier pair solving."
            },
            {
                id: "q8-2",
                question: "What does 'multislotting' mean?",
                options: ["Solving multiple pairs at once", "Using multiple algorithms", "Solving in multiple steps", "Advanced cross technique"],
                correctAnswer: 0,
                explanation: "Multislotting is solving two or more F2L pairs in a single sequence of moves."
            },
            {
                id: "q8-3",
                question: "What is an 'empty slot' technique?",
                options: ["Leaving one F2L unsolved", "Using the last slot strategically", "Both A and B", "Neither A nor B"],
                correctAnswer: 2,
                explanation: "Empty slot technique involves strategically using an unsolved slot to manipulate pieces."
            },
            {
                id: "q8-4",
                question: "What is 'ZBLS'?",
                options: ["Zero-Block Last Slot", "Zborowski-Bruchem Last Slot", "Advanced OLL skip", "F2L variant"],
                correctAnswer: 1,
                explanation: "ZBLS (Zborowski-Bruchem Last Slot) is an advanced technique to force OLL skips."
            },
            {
                id: "q8-5",
                question: "How many basic F2L cases are there?",
                options: ["21", "41", "57", "78"],
                correctAnswer: 1,
                explanation: "There are 41 basic F2L cases (including mirrors and rotations)."
            }
        ]
    },
    {
        id: "quiz-9",
        title: "Algorithm Optimization",
        level: "Advanced",
        difficulty: 7,
        description: "Learn to optimize and fingertrick algorithms efficiently",
        questions: [
            {
                id: "q9-1",
                question: "What is a 'fingertrick'?",
                options: ["Magic trick with cube", "Efficient finger movement for turns", "Algorithm shortcut", "Speed solving method"],
                correctAnswer: 1,
                explanation: "Fingertricks are efficient finger movements that allow faster execution of algorithms."
            },
            {
                id: "q9-2",
                question: "What does 'TPS' stand for?",
                options: ["Total Per Second", "Turns Per Second", "Time Per Solve", "Technique Practice Session"],
                correctAnswer: 1,
                explanation: "TPS means Turns Per Second - a measure of solving speed."
            },
            {
                id: "q9-3",
                question: "What is 'regripping'?",
                options: ["Changing hand position", "Redoing an algorithm", "Adjusting cube grip", "Both A and C"],
                correctAnswer: 3,
                explanation: "Regripping is adjusting your hand position on the cube, which should be minimized for speed."
            },
            {
                id: "q9-4",
                question: "What is an 'OH' algorithm?",
                options: ["Optimal Handling", "One-Handed", "Overhead", "Original Hybrid"],
                correctAnswer: 1,
                explanation: "OH stands for One-Handed - algorithms optimized for one-handed solving."
            },
            {
                id: "q9-5",
                question: "What makes an algorithm 'ergonomic'?",
                options: ["Short length", "Easy to execute", "Few regrips", "All of the above"],
                correctAnswer: 3,
                explanation: "Ergonomic algorithms are short, easy to execute, and require minimal regripping."
            }
        ]
    },
    {
        id: "quiz-10",
        title: "Advanced Methods",
        level: "Advanced",
        difficulty: 7,
        description: "Explore alternative solving methods beyond CFOP",
        questions: [
            {
                id: "q10-1",
                question: "What is the Roux method?",
                options: ["French solving technique", "Block-building method", "Advanced CFOP variant", "One-handed method"],
                correctAnswer: 1,
                explanation: "Roux is a block-building method that uses fewer rotations than CFOP."
            },
            {
                id: "q10-2",
                question: "What does ZZ method stand for?",
                options: ["Zbigniew Zborowski", "Zero-Zone", "Zig-Zag", "Zesty-Zoom"],
                correctAnswer: 0,
                explanation: "ZZ method is named after its creator, Zbigniew Zborowski."
            },
            {
                id: "q10-3",
                question: "What is CMLL in Roux method?",
                options: ["Corners of Middle Last Layer", "Complete Middle Layer Last", "Corners of the Last Layer (M-slice fixed)", "Center Middle Layer Lock"],
                correctAnswer: 2,
                explanation: "CMLL stands for Corners of the Last Layer while keeping the M-slice fixed."
            },
            {
                id: "q10-4",
                question: "What is the main advantage of Roux over CFOP?",
                options: ["Easier to learn", "Fewer cube rotations", "Fewer algorithms", "Faster recognition"],
                correctAnswer: 1,
                explanation: "Roux uses significantly fewer cube rotations, making it more efficient in move count."
            },
            {
                id: "q10-5",
                question: "What is Petrus method known for?",
                options: ["Block building", "Fewest moves", "No algorithms needed", "One-handed solving"],
                correctAnswer: 0,
                explanation: "Petrus is a block-building method that creates a 2x2x3 block first."
            }
        ]
    },
    {
        id: "quiz-11",
        title: "Competition Knowledge",
        level: "Advanced",
        difficulty: 8,
        description: "WCA regulations and competition procedures",
        questions: [
            {
                id: "q11-1",
                question: "What does WCA stand for?",
                options: ["World Cubing Association", "World Championship Association", "Worldwide Cube Alliance", "World Competition Authority"],
                correctAnswer: 0,
                explanation: "WCA stands for World Cubing Association, the governing body for speedcubing competitions."
            },
            {
                id: "q11-2",
                question: "How long is inspection time in WCA competitions?",
                options: ["10 seconds", "15 seconds", "20 seconds", "30 seconds"],
                correctAnswer: 1,
                explanation: "Competitors get 15 seconds to inspect the cube before starting the solve."
            },
            {
                id: "q11-3",
                question: "What is a DNF?",
                options: ["Do Not Finish", "Did Not Finish", "Disqualified, Not Fair", "Dropped, Not Fixed"],
                correctAnswer: 1,
                explanation: "DNF means Did Not Finish - the solve doesn't count due to rules violation or incomplete solve."
            },
            {
                id: "q11-4",
                question: "What is a +2 penalty?",
                options: ["2 second penalty", "2 extra solves", "2 point deduction", "2 minute penalty"],
                correctAnswer: 0,
                explanation: "A +2 penalty adds 2 seconds to your time for minor infractions like starting early."
            },
            {
                id: "q11-5",
                question: "How many solves are in a standard 3x3 average?",
                options: ["3", "5", "10", "12"],
                correctAnswer: 1,
                explanation: "A standard average is calculated from 5 solves, removing the best and worst."
            }
        ]
    },
    {
        id: "quiz-12",
        title: "Speedcubing Theory",
        level: "Expert",
        difficulty: 9,
        description: "Deep understanding of cube theory and mathematics",
        questions: [
            {
                id: "q12-1",
                question: "How many possible positions can a 3x3 cube have?",
                options: ["43 million", "43 billion", "43 quintillion", "Infinite"],
                correctAnswer: 2,
                explanation: "A 3x3 cube has 43,252,003,274,489,856,000 (43 quintillion) possible positions."
            },
            {
                id: "q12-2",
                question: "What is God's Number for 3x3?",
                options: ["18", "20", "22", "26"],
                correctAnswer: 1,
                explanation: "God's Number is 20 - any 3x3 position can be solved in 20 moves or fewer."
            },
            {
                id: "q12-3",
                question: "What is a 'superflip'?",
                options: ["Advanced algorithm", "All edges flipped", "Competition move", "Cube modification"],
                correctAnswer: 1,
                explanation: "Superflip is a position where all edges are flipped but in correct positions."
            },
            {
                id: "q12-4",
                question: "What is cube parity?",
                options: ["Even/odd permutations", "Color matching", "Algorithm type", "Competition rule"],
                correctAnswer: 0,
                explanation: "Parity refers to whether the cube is in an even or odd permutation state."
            },
            {
                id: "q12-5",
                question: "Can you swap just two edges on a 3x3?",
                options: ["Yes, always", "Yes, with special algorithm", "No, impossible", "Only on certain cubes"],
                correctAnswer: 2,
                explanation: "It's mathematically impossible to swap only two edges on a 3x3 - you must swap pairs."
            }
        ]
    },
    {
        id: "quiz-13",
        title: "Master Cuber Challenge",
        level: "Expert",
        difficulty: 10,
        description: "Ultimate test of speedcubing knowledge",
        questions: [
            {
                id: "q13-1",
                question: "What is COLL?",
                options: ["Corners Oriented Last Layer", "Corners of Last Layer", "Complete OLL", "Corner Optimization Last Layer"],
                correctAnswer: 1,
                explanation: "COLL (Corners of Last Layer) solves corners while preserving edge orientation."
            },
            {
                id: "q13-2",
                question: "What is the current 3x3 world record single (as of 2024)?",
                options: ["3.13s", "3.47s", "4.22s", "4.69s"],
                correctAnswer: 1,
                explanation: "The world record single is 3.47 seconds by Yusheng Du (as of late 2024)."
            },
            {
                id: "q13-3",
                question: "What is ZBLL?",
                options: ["Zero-Block Last Layer", "Zborowski-Bruchem Last Layer", "Advanced PLL skip", "Expert F2L technique"],
                correctAnswer: 1,
                explanation: "ZBLL is an advanced last layer method with ~500 algorithms that solves LL in one step."
            },
            {
                id: "q13-4",
                question: "What is the maximum number of moves in optimal F2L?",
                options: ["8", "10", "12", "15"],
                correctAnswer: 0,
                explanation: "Any F2L pair can be solved optimally in 8 moves or fewer."
            },
            {
                id: "q13-5",
                question: "What is 'EO' in advanced methods?",
                options: ["Edge Orientation", "Efficient Optimization", "Expert Only", "Early OLL"],
                correctAnswer: 0,
                explanation: "EO (Edge Orientation) is orienting all edges before solving, used in ZZ and Roux methods."
            }
        ]
    }
];
