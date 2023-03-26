import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, UPDATE_TODO } from '../lib/graphqlQueries';
import { Todo } from '../types';
import TodoItemCss from '../styles/components/TodoItem.module.css';

type Props = {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, body: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo?.title || '');
  const [body, setBody] = useState(todo?.body || '');
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const handleUpdate = async () => {
    if (todo && (title !== todo.title || body !== todo.body)) {
      await updateTodo({
        variables: { id: todo.id, title, body },
      });
      onEdit(todo.id, title, body);
      setUpdateStatus(true);
    }
    setEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({
        variables: { id: todo?.id },
      });
      onDelete(todo?.id || "");
      setDeleteStatus(true); // 削除成功時にステータスを変更
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = async () => {
    setEditing(false);
  };

  if (!todo) {
    return <div>Todo is not found</div>;
  }

  return (
    <div>
      {editing ? (
        <>
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
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <div>
          <span onDoubleClick={() => setEditing(true)}>{todo.title}</span>
          <br />
          <span onDoubleClick={() => setEditing(true)}>{todo.body}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
          {updateStatus && (
            <p className={TodoItemCss.update_message}>更新が完了しました</p>
          )}
          {deleteStatus && (
            <p className={TodoItemCss.delete_message}>正常に削除しました</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
