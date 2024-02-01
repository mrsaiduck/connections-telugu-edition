import { X } from "lucide-react";
import { STRING_TO_COLOR, STRING_TO_EMOJI } from "../constants/solutionInfo";
import Timer from "./timer";

const PopUp = ({ active, setActive, content, history, handleNotification }) => {

    // HELP POPUP
    if (content === "help") {
        return (
            <div 
                className={`flex absolute justify-center items-center ${active ? "w-full h-full z-10 pointer-events-auto" : "w-0 h-0 z-10 pointer-events-none"} backdrop-blur-sm transition-all duration-300`}
                onClick={() => {} /* TODO: make so it only activates when click is outside of inner box */}
            >
    
                <div className={`flex flex-col justify-items-center items-start ${active ? "w-full h-[35em] z-20 pointer-events-auto" : "w-0 h-0 z-0 pointer-events-none hidden"} z-20 p-3 bg-white rounded-lg drop-shadow-xl gap-2 sm:w-[30em] sm:p-8`}>
                    <X className="self-end cursor-pointer" color="black" size={30} onClick={() => setActive(false)} />
                    
                    <h1 className="text-black font-extrabold text-2xl">How to Play Connections</h1>
                    
                    <div>
                        <h2 className="text-black font-bold text-sm">Find groups of four words that have something in common.</h2>
                        <p>• Select four words and tap 'Submit' to check if your guess is correct.</p>
                        <p>• Find the groups without making 4 mistakes!</p>
                    </div>

                    <div>
                        <h2 className="text-black font-bold text-sm">Examples of Categories</h2>
                        <p>• FISH: Bass, Flounder, Salmon, Trout</p>
                        <p>• FIRE ___: Ant, Drill, Island, Opal</p>
                    </div>

                    <h3>Each puzzle has exactly one solution. Be careful with words that seem to belong to multiple categories!</h3>

                    <div className="flex flex-col justify-start items-start">
                        <h3>Each group is assigned a color, which will be revealed as you solve:</h3>
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-5 h-5 bg-yellow-100" />
                            <h1>Easy</h1>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-5 h-5 bg-green-200" />
                            <h1>Medium</h1>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-5 h-5 bg-blue-100" />
                            <h1>Hard</h1>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-5 h-5 bg-purple-200" />
                            <h1>Impossible</h1>
                        </div>
                    </div>
                </div>
    
            </div>
        )
    }

    // LOSE / WIN POPUP
    if (content === "lose" || content === "win") {

        function getPuzzleNumber() {
            // Specify the certain date in YYYY-MM-DD format
            const certainDate = '2023-11-6'; // date of the first official conexiones puzzle

            // Create a JavaScript Date object for the certain date and set its time zone offset to EST (UTC-5)
            const certainDateObj = new Date(certainDate);
            certainDateObj.setHours(0, 0, 0, 0);
            certainDateObj.setMinutes(certainDateObj.getMinutes() - certainDateObj.getTimezoneOffset() - 300); // 300 minutes = 5 hours

            // Get the current date and set its time zone offset to EST (UTC-5)
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset() - 300);

            // Calculate the time difference in milliseconds
            const timeDifference = currentDate - certainDateObj;

            // Convert milliseconds to days
            let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            // increment by one (puzzles 1-indexed)
            daysDifference++;

            return daysDifference
        }

        // pastable for user to copy and share
        function getPastable() {
            let resultPastable = "Connection\n";
            resultPastable += "Puzzle #" + getPuzzleNumber() + "\n"
            for (const answer of history) {
                for (const word of answer) {
                    resultPastable += STRING_TO_EMOJI[word.difficulty];
                }
                resultPastable += "\n";
            }

            return resultPastable;
        }

        return (
            <div 
                className={`flex absolute justify-center items-center ${active ? "w-full h-full z-10 pointer-events-auto" : "w-0 h-0 z-10 pointer-events-none"} backdrop-blur-sm transition-all duration-300`}
                onClick={() => {} /* TODO: make so it only activates when click is outside of inner box */}
            >
    
                <div className={`flex flex-col justify-items-center items-center ${active ? "w-[30em] h-[35em] z-20 pointer-events-auto" : "w-0 h-0 z-0 pointer-events-none hidden"} z-20 p-8 gap-3 bg-white rounded-lg drop-shadow-xl`}>
                    <X className="self-end cursor-pointer" color="black" size={30} onClick={() => setActive(false)} />

                    <h1 className="text-black font-extrabold text-2xl">{content === "lose" ? "Next time!" : "Well done!"}</h1>
                    <h2 className="text-black font-light text-lg">Connections</h2>
                    <h2 className="text-black font-semibold text-md">Puzzle #{getPuzzleNumber()}</h2>

                    <div className="grid grid-cols-4 gap-y-1">
                    {
                        history.map((answer, i) => (
                            answer.map((word, j) => (
                                <div key={i * 4 + j} className={`w-10 h-10 ${STRING_TO_COLOR[word.difficulty]} rounded-lg`}></div>
                            ))
                        ))
                    }
                    </div>

                    <Timer />

                    <button 
                        className="bg-black px-12 py-3 rounded-full"
                        onClick={() => {
                            handleNotification("copy");
                            navigator.clipboard.writeText(getPastable())
                        }}
                    >
                        <h1 className="text-white font-medium">Share</h1>
                    </button>
                </div>
    
            </div>
        )
    }
}

export default PopUp;