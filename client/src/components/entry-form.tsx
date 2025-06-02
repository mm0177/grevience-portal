import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MoodSelector from "./mood-selector";
import type { InsertEntry } from "@shared/schema";

export default function EntryForm() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [text, setText] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createEntryMutation = useMutation({
    mutationFn: async (entry: InsertEntry) => {
      const response = await apiRequest("POST", "/api/entries", entry);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Entry saved! 💜",
        description: "Your feelings have been saved safely.",
      });
      
      // Reset form
      setSelectedMood(null);
      setSelectedEmoji(null);
      setText("");
      
      // Invalidate entries query to refresh the timeline
      queryClient.invalidateQueries({ queryKey: ["/api/entries"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to save entry",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleMoodSelect = (mood: string, emoji: string) => {
    setSelectedMood(mood);
    setSelectedEmoji(emoji);
  };

  const handleSubmit = () => {
    if (!selectedMood || !text.trim()) return;
    
    createEntryMutation.mutate({
      mood: selectedEmoji!,
      text: text.trim(),
    });
  };

  const canSubmit = selectedMood && text.trim().length > 0 && !createEntryMutation.isPending;

  return (
    <section className="mb-12">
      <div className="glass-effect rounded-3xl p-8 shadow-xl mb-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">
          How are you feeling right now?
        </h2>
        
        <MoodSelector 
          selectedMood={selectedMood}
          onMoodSelect={handleMoodSelect}
        />

        <div className="mb-8">
          <label htmlFor="feelings-text" className="block text-gray-700 font-medium mb-3">
            Share what's on your heart
          </label>
          <Textarea
            id="feelings-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Take your time... write about what you're feeling, what happened, or anything you need to express. This is your safe space."
            className="w-full h-40 p-6 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none resize-none text-gray-700 leading-relaxed transition-all duration-200"
          />
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>{text.length} characters</span>
            <span className="text-xs opacity-70">Take all the time you need 💜</span>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createEntryMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Save My Feelings
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
