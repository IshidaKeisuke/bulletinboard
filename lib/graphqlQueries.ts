import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetPosts {
    posts(order_by: { created_at: desc }) {
      id
      title
      body
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddPost($title: String!, $body: String) {
    insert_posts_one(object: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdatePost($id: Int!, $title: String!, $body: String!) {
    update_posts_by_pk(pk_columns: { id: $id }, _set: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeletePost($id: Int!) {
    delete_posts_by_pk(id: $id) {
      id
    }
  }
`;
