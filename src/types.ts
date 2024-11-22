export interface Joke {
  id: string;
  content: string;
  author: string;
  isUserSubmitted: boolean;
  createdAt: string;
}

export interface JokeResponse {
  joke: string;
}

export interface JokeHistory {
  randomJokes: Joke[];
  userJokes: Joke[];
}