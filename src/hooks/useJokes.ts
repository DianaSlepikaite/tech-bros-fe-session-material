import { useState, useEffect } from 'react';
import { Joke, JokeHistory } from '../types';

const STORAGE_KEY = 'jokeHistory';

export function useJokes() {
  const [jokeHistory, setJokeHistory] = useState<JokeHistory>({
    randomJokes: [],
    userJokes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      setJokeHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveHistory = (history: JokeHistory) => {
    setJokeHistory(history);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  };

  const getRandomJokeFromCollection = () => {
    const allJokes = [...jokeHistory.randomJokes, ...jokeHistory.userJokes];
    if (allJokes.length === 0) return null;
    return allJokes[Math.floor(Math.random() * allJokes.length)];
  };

  const fetchRandomJoke = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // First, try to get a random joke from our collection
      const localJoke = getRandomJokeFromCollection();
      if (localJoke && Math.random() < 0.3) { // 30% chance to use a local joke
        return localJoke;
      }

      // Otherwise, fetch a new joke from the API
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
      const data = await response.json();
      
      if (!response.ok) throw new Error('Failed to fetch joke');
      
      const newJoke: Joke = {
        id: crypto.randomUUID(),
        content: data.joke,
        author: 'JokeAPI',
        isUserSubmitted: false,
        createdAt: new Date().toISOString(),
      };

      const updatedHistory = {
        ...jokeHistory,
        randomJokes: [...jokeHistory.randomJokes, newJoke],
      };
      saveHistory(updatedHistory);
      
      return newJoke;
    } catch (err) {
      // If API fetch fails, fall back to local collection
      const localJoke = getRandomJokeFromCollection();
      if (localJoke) {
        return localJoke;
      }
      setError('Failed to fetch joke. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addUserJoke = (content: string, author: string) => {
    const newJoke: Joke = {
      id: crypto.randomUUID(),
      content,
      author: author.trim() || 'Anonymous',
      isUserSubmitted: true,
      createdAt: new Date().toISOString(),
    };
    
    const updatedHistory = {
      ...jokeHistory,
      userJokes: [...jokeHistory.userJokes, newJoke],
    };
    saveHistory(updatedHistory);
    return newJoke;
  };

  const deleteJoke = (id: string) => {
    try {
      // Remove from both collections to ensure complete deletion
      const updatedHistory = {
        randomJokes: jokeHistory.randomJokes.filter(joke => joke.id !== id),
        userJokes: jokeHistory.userJokes.filter(joke => joke.id !== id),
      };
      saveHistory(updatedHistory);
    } catch (err) {
      setError('Failed to delete joke. Please try again.');
    }
  };

  return {
    jokeHistory,
    isLoading,
    error,
    fetchRandomJoke,
    addUserJoke,
    deleteJoke,
  };
}