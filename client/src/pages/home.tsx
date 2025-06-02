import { Heart } from "lucide-react";
import EntryForm from "@/components/entry-form";
import EntriesTimeline from "@/components/entries-timeline";
import FloatingHearts from "@/components/floating-hearts";

export default function Home() {
  return (
    <div className="min-h-screen">
      <FloatingHearts />
      
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">
            <Heart className="inline-block text-pink-500 mr-3" size={36} />
            Our Hearts
          </h1>
          <p className="text-gray-600 text-lg">A safe space for your feelings</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-12">
        <EntryForm />
        <EntriesTimeline />
      </main>
    </div>
  );
}
