export interface ICommentReaction {
  id: string;
  userId: string;
  avatar: string;
  fullname: string;
  reaction: string;
}

export interface IComment {
  id: string;
  userId: string;
  avatar: string;
  fullname: string;
  content: string;
  createdAt?: {
    nanoseconds: number;
    seconds: number;
  };
  categoryId: string;
  movieId: string;
  episodeId: string | number;
  reactions: ICommentReaction[];
}
