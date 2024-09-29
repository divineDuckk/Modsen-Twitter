import { TweetInfo } from '@/interfaces/tweet';
import { sortByCreatedAt } from '@/utils/functions/sortArrayByDate';

describe('sortByCreatedAt', () => {
  it('should sort tweets by createdAt in descending order', () => {
    const tweets: TweetInfo[] = [
      {
        id: '1',
        createdAt: '2024-09-01T12:00:00Z',
        imageUrl: 'image1.jpg',
        likes: 5,
        text: 'Tweet 1',
        userId: 'user1',
        userLikes: ['user2'],
        authorName: 'User One',
        authorPhoto: 'photo1.jpg',
      },
      {
        id: '2',
        createdAt: '2024-09-03T12:00:00Z',
        imageUrl: 'image2.jpg',
        likes: 10,
        text: 'Tweet 2',
        userId: 'user2',
        userLikes: ['user1'],
        authorName: 'User Two',
        authorPhoto: 'photo2.jpg',
      },
      {
        id: '3',
        createdAt: '2024-09-02T12:00:00Z',
        imageUrl: 'image3.jpg',
        likes: 3,
        text: 'Tweet 3',
        userId: 'user3',
        userLikes: [],
        authorName: 'User Three',
        authorPhoto: 'photo3.jpg',
      },
    ];

    const sortedTweets = sortByCreatedAt(tweets);

    expect(sortedTweets).toEqual([
      {
        id: '2',
        createdAt: '2024-09-03T12:00:00Z',
        imageUrl: 'image2.jpg',
        likes: 10,
        text: 'Tweet 2',
        userId: 'user2',
        userLikes: ['user1'],
        authorName: 'User Two',
        authorPhoto: 'photo2.jpg',
      },
      {
        id: '3',
        createdAt: '2024-09-02T12:00:00Z',
        imageUrl: 'image3.jpg',
        likes: 3,
        text: 'Tweet 3',
        userId: 'user3',
        userLikes: [],
        authorName: 'User Three',
        authorPhoto: 'photo3.jpg',
      },
      {
        id: '1',
        createdAt: '2024-09-01T12:00:00Z',
        imageUrl: 'image1.jpg',
        likes: 5,
        text: 'Tweet 1',
        userId: 'user1',
        userLikes: ['user2'],
        authorName: 'User One',
        authorPhoto: 'photo1.jpg',
      },
    ]);
  });

  it('should handle an empty array', () => {
    const tweets: TweetInfo[] = [];

    const result = sortByCreatedAt(tweets);

    expect(result).toEqual([]);
  });

  it('should handle an array with a single tweet', () => {
    const tweets: TweetInfo[] = [
      {
        id: '1',
        createdAt: '2024-09-01T12:00:00Z',
        imageUrl: 'image1.jpg',
        likes: 5,
        text: 'Tweet 1',
        userId: 'user1',
        userLikes: ['user2'],
        authorName: 'User One',
        authorPhoto: 'photo1.jpg',
      },
    ];

    const result = sortByCreatedAt(tweets);

    expect(result).toEqual([
      {
        id: '1',
        createdAt: '2024-09-01T12:00:00Z',
        imageUrl: 'image1.jpg',
        likes: 5,
        text: 'Tweet 1',
        userId: 'user1',
        userLikes: ['user2'],
        authorName: 'User One',
        authorPhoto: 'photo1.jpg',
      },
    ]);
  });
});
