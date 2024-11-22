import React, { useState } from 'react';
import { Send, User } from 'lucide-react';

interface JokeFormProps {
  onSubmit: (joke: string, author: string) => void;
}

export function JokeForm({ onSubmit }: JokeFormProps) {
  const [joke, setJoke] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (joke.trim()) {
      onSubmit(joke, author);
      setJoke('');
      // Keep the author name for the next submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
            aria-label="Author name"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={joke}
          onChange={(e) => setJoke(e.target.value)}
          placeholder="Share your joke..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
          minLength={3}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </form>
  );
}