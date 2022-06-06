import { MovieDataModel } from "../../data/models/movie";

/**
 * Domain level Movie defition
 */
export type Movie = {
  id: string;
  title: string;
  rating: number;
  category: number;
  categoryName: string;
  imageUrl: string;
}

export const movieConverter = {
  /**
   * Converts a Domain model to a Data model
   * @param movie 
   * @returns 
   */
  toDataModel: (movie: Movie) => {
    return {
      id: movie.id,
      title: movie.title,
      rating: movie.rating,
      category: movie.category,
    };
  },

  /**
   * Converts a Data model to a Domain model
   * @param movie 
   * @returns 
   */
  fromDataModel: (movie: MovieDataModel) => {
    const result: Movie = {
      id: movie.id || '',
      title: movie.title,
      rating: movie.rating,
      category: movie.category,
      categoryName: getCategoryName(movie.category),
      imageUrl: getImageUrl(movie.title),
    }
    return result;
  }
};

/**
 * Returns the Category name based on its id
 * @param category 
 * @returns 
 */
export function getCategoryName(category: number): string {
  switch (category) {
    case 1: {
      return "Horror";
    }
    case 2: {
      return "Fiction";
    }
    default: {
      return "";
    }
  }
};

/**
 * Returns the url of the movie image from the movie title
 * @param title 
 * @returns 
 */
function getImageUrl(title: string): string {
  const imageBasePath = process.env.REACT_IMAGE_BASE_PATH;
  return imageBasePath + title.trim();
};

