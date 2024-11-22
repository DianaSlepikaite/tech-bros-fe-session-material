import React from 'react';
import { Quote, Trash2, User } from 'lucide-react';

interface JokeCardProps {
  content: string;
  author: string;
  isUserSubmitted?: boolean;
  onDelete?: () => void;
}

export function JokeCard({ content, author, isUserSubmitted, onDelete }: JokeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl group">
      <div className="flex items-start gap-4">
        <Quote className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="text-gray-800 text-lg leading-relaxed">{content}</p>
          <div className="mt-2 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{author}</span>
            {isUserSubmitted && (
              <span className="text-sm text-indigo-600 font-medium ml-2">
                User Submitted
              </span>
            )}
          </div>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Delete joke"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}