import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { DELETE_TODO, UPDATE_TODO } from '../../../lib/graphqlQueries';
import { Post } from '../../../types';
import PostItemCss from '../../../styles/components/PostItem.module.css';

type Props = {
  post: Post;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, body: string) => void;
};

export const PostItem: React.FC<Props> = ({ post, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');
  const [updatePost] = useMutation(UPDATE_TODO);
  const [deletePost] = useMutation(DELETE_TODO);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const handleUpdate = async () => {
    if (post && (title !== post.title || body !== post.body)) {
      await updatePost({
        variables: { id: post.id, title, body },
      });
      onEdit(post.id, title, body);
      setUpdateStatus(true);
    }
    setEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deletePost({
        variables: { id: post?.id },
      });
      onDelete(post?.id || "");
      setDeleteStatus(true); // 削除成功時にステータスを変更
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = async () => {
    setEditing(false);
  };

  if (!post) {
    return <div>Post is not found</div>;
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
          <span onDoubleClick={() => setEditing(true)}>{post.title}</span>
          <br />
          <span onDoubleClick={() => setEditing(true)}>{post.body}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
          {updateStatus && (
            <p className={PostItemCss.update_message}>更新が完了しました</p>
          )}
          {deleteStatus && (
            <p className={PostItemCss.delete_message}>正常に削除しました</p>
          )}
        </div>
      )}
    </div>
  );
};
