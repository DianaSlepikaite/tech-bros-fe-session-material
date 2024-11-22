import React from 'react';
import { Clock } from 'lucide-react';
import { JokeCard } from './JokeCard';
import { Joke } from '../types';

interface JokeHistoryProps {
  randomJokes: Joke[];
  userJokes: Joke[];
  onDeleteJoke: (id: string) => void;
}

export function JokeHistory({ randomJokes, userJokes, onDeleteJoke }: JokeHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          Random Jokes History
        </h2>
        <div className="space-y-4">
          {randomJokes.length === 0 ? (
            <p className="text-gray-500">No random jokes fetched yet.</p>
          ) : (
            randomJokes.slice().reverse().map((joke) => (
              <div key={joke.id} className="space-y-1">
                <JokeCard 
                  content={joke.content}
                  author={joke.author}
                  onDelete={() => onDeleteJoke(joke.id)}
                />
                <div className="text-sm text-gray-500 pl-2">
                  {formatDate(joke.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          User Submitted History
        </h2>
        <div className="space-y-4">
          {userJokes.length === 0 ? (
            <p className="text-gray-500">No user jokes submitted yet.</p>
          ) : (
            userJokes.slice().reverse().map((joke) => (
              <div key={joke.id} className="space-y-1">
                <JokeCard 
                  content={joke.content}
                  author={joke.author}
                  isUserSubmitted 
                  onDelete={() => onDeleteJoke(joke.id)}
                />
                <div className="text-sm text-gray-500 pl-2">
                  {formatDate(joke.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}