export default function FloatingHearts() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div 
        className="absolute top-20 left-10 text-pink-200 text-2xl animate-gentle-float opacity-30"
        style={{ animationDelay: "0s" }}
      >
        💜
      </div>
      <div 
        className="absolute top-40 right-20 text-purple-200 text-xl animate-gentle-float opacity-30"
        style={{ animationDelay: "1s" }}
      >
        💕
      </div>
      <div 
        className="absolute bottom-40 left-20 text-pink-200 text-lg animate-gentle-float opacity-30"
        style={{ animationDelay: "2s" }}
      >
        💖
      </div>
      <div 
        className="absolute bottom-20 right-10 text-purple-200 text-2xl animate-gentle-float opacity-30"
        style={{ animationDelay: "0.5s" }}
      >
        💜
      </div>
    </div>
  );
}
