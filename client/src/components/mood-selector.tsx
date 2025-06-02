import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string, emoji: string) => void;
}

const moods = [
  { mood: "happy", emoji: "😊", color: "hover:bg-pink-100 focus:ring-pink-200" },
  { mood: "sad", emoji: "😢", color: "hover:bg-blue-100 focus:ring-blue-200" },
  { mood: "angry", emoji: "😠", color: "hover:bg-red-100 focus:ring-red-200" },
  { mood: "frustrated", emoji: "😤", color: "hover:bg-yellow-100 focus:ring-yellow-200" },
  { mood: "confused", emoji: "😕", color: "hover:bg-purple-100 focus:ring-purple-200" },
  { mood: "anxious", emoji: "😰", color: "hover:bg-green-100 focus:ring-green-200" },
  { mood: "hurt", emoji: "💔", color: "hover:bg-indigo-100 focus:ring-indigo-200" },
  { mood: "love", emoji: "💕", color: "hover:bg-pink-100 focus:ring-pink-200" },
];

export default function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-gray-700 font-medium mb-4 text-center">
        Choose your mood
      </label>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map(({ mood, emoji, color }) => (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood, emoji)}
            className={cn(
              "text-4xl p-4 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4",
              color,
              selectedMood === mood && "ring-4 bg-opacity-20"
            )}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
