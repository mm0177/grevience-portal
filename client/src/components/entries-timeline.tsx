import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import type { Entry } from "@shared/schema";

export default function EntriesTimeline() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: entries, isLoading } = useQuery<Entry[]>({
    queryKey: ["/api/entries"],
  });

  const deleteEntryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/entries/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Entry deleted",
        description: "The entry has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/entries"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete entry",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      deleteEntryMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Your Feelings Journey</h2>
          <p className="text-gray-600">A timeline of your heart</p>
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-effect rounded-2xl p-6 shadow-lg animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded mt-1"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Your Feelings Journey</h2>
          <p className="text-gray-600">A timeline of your heart</p>
        </div>
        <div className="text-center py-16">
          <div className="text-6xl mb-4 animate-gentle-float">💜</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No entries yet</h3>
          <p className="text-gray-500">Start by sharing how you're feeling above</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium text-gray-800 mb-2">Your Feelings Journey</h2>
        <p className="text-gray-600">A timeline of your heart</p>
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="glass-effect rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{entry.mood}</span>
                <div>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
                  </span>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(entry.id)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="text-gray-700 leading-relaxed">
              {entry.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
