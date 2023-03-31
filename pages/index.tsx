import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link'
import { ApolloProvider } from '@apollo/client';
import { GET_TODOS, ADD_TODO } from '../lib/graphqlQueries';
import { initializeApollo } from '../lib/apolloClient';
import { PostItem } from '../components/features/post/PostItem';
import { Post } from '../types';

const Posts: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const apolloClient = initializeApollo();
  const fetchPosts = async () => {
    const { data } = await apolloClient.query({ query: GET_TODOS });
    setPosts(data.posts);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !body) return;
    const { data } = await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: { title, body },
    });
    setPosts([data.insert_posts_one, ...posts]);
    setTitle('');
    setBody('');
  };
  const handleDeletePost = async (id: string) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };
  const handleEditPost = (id: string, newTitle: string, newBody: string) => {
    const newPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, title: newTitle, body: newBody };
      }
      return post;
    });
    setPosts(newPosts);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <div>
        <h1>Posts</h1>
        <Link href="/auth/signin">ログイン</Link>
        <Link href="/auth/signup">会員登録</Link>
        <Link href="/posts">投稿してみる</Link>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit">Add Post</button>
        </form>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onDelete={handleDeletePost}
            onEdit={handleEditPost}
          />
        ))}
      </div>
    </ApolloProvider>
  );
};
export default Posts;
