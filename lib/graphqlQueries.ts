import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos {
    todos(order_by: { created_at: desc }) {
      id
      title
      body
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $body: String) {
    insert_todos_one(object: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $title: String!, $body: String!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;
