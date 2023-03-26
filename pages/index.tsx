import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link'
import { ApolloProvider } from '@apollo/client';
import { GET_TODOS, ADD_TODO } from '../lib/graphqlQueries';
import { initializeApollo } from '../lib/apolloClient';
import TodoItem from '../components/TodoItem';
import { Todo } from '../types';

const Todos: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const apolloClient = initializeApollo();
  const fetchTodos = async () => {
    const { data } = await apolloClient.query({ query: GET_TODOS });
    setTodos(data.todos);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !body) return;
    const { data } = await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: { title, body },
    });
    setTodos([data.insert_todos_one, ...todos]);
    setTitle('');
    setBody('');
  };
  const handleDeleteTodo = async (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const handleEditTodo = (id: string, newTitle: string, newBody: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle, body: newBody };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <div>
        <h1>Todos</h1>
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
          <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </div>
    </ApolloProvider>
  );
};
export default Todos;
