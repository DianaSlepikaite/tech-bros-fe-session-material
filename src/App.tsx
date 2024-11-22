import React, { useState } from 'react';
import { Laugh, Users, Loader2, History } from 'lucide-react';
import { JokeCard } from './components/JokeCard';
import { JokeForm } from './components/JokeForm';
import { JokeHistory } from './components/JokeHistory';
import { useJokes } from './hooks/useJokes';
import { Joke } from './types';

function App() {
  const { jokeHistory, isLoading, error, fetchRandomJoke, addUserJoke, deleteJoke } = useJokes();
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [showUserJokes, setShowUserJokes] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleGetJoke = async () => {
    const joke = await fetchRandomJoke();
    if (joke) setCurrentJoke(joke);
  };

  const handleDeleteJoke = (id: string) => {
    deleteJoke(id);
    if (currentJoke?.id === id) {
      setCurrentJoke(null);
    }
  };

  const handleAddJoke = (content: string, author: string) => {
    const newJoke = addUserJoke(content, author);
    setCurrentJoke(newJoke);
    setShowUserJokes(false); // Switch to random jokes view to show the new joke
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Joke Generator
          </h1>
          <p className="text-gray-600">Get your daily dose of humor!</p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setShowUserJokes(false);
                setShowHistory(false);
              }}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                !showUserJokes && !showHistory
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Laugh className="w-5 h-5" />
              <span>Random Jokes</span>
            </button>
            <button
              onClick={() => {
                setShowUserJokes(true);
                setShowHistory(false);
              }}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                showUserJokes && !showHistory
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Submit Joke</span>
            </button>
            <button
              onClick={() => {
                setShowHistory(true);
              }}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                showHistory
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <History className="w-5 h-5" />
              <span>History</span>
            </button>
          </div>

          {showHistory ? (
            <JokeHistory
              randomJokes={jokeHistory.randomJokes}
              userJokes={jokeHistory.userJokes}
              onDeleteJoke={handleDeleteJoke}
            />
          ) : !showUserJokes ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <button
                  onClick={handleGetJoke}
                  disabled={isLoading}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>Get Random Joke</span>
                </button>
              </div>

              {error && (
                <div className="text-red-500 text-center animate-fade-in">
                  {error}
                </div>
              )}

              {currentJoke && (
                <div className="animate-fade-in">
                  <JokeCard 
                    content={currentJoke.content}
                    author={currentJoke.author}
                    isUserSubmitted={currentJoke.isUserSubmitted}
                    onDelete={() => handleDeleteJoke(currentJoke.id)}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <JokeForm onSubmit={handleAddJoke} />
              </div>
              
              <div className="space-y-4">
                {jokeHistory.userJokes.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No user-submitted jokes yet. Be the first to share one!
                  </p>
                ) : (
                  jokeHistory.userJokes
                    .slice()
                    .reverse()
                    .map((joke) => (
                      <div key={joke.id} className="animate-fade-in">
                        <JokeCard
                          content={joke.content}
                          author={joke.author}
                          isUserSubmitted
                          onDelete={() => handleDeleteJoke(joke.id)}
                        />
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;