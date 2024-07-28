import React, { useState } from 'react';

const DiscussionForum = () => {
  const [queries, setQueries] = useState([
    { id: 1, text: 'What is React?', comments: ['React is a JavaScript library for building user interfaces.'], views: 120, date: '2 days ago', isFavorite: false, user: { name: 'John Doe', online: true } },
    { id: 2, text: 'How to use useState hook?', comments: ['useState is a Hook that lets you add React state to function components.'], views: 85, date: '5 days ago', isFavorite: false, user: { name: 'Jane Smith', online: false } },
  ]);
  const [newQuery, setNewQuery] = useState('');
  const [editingQueryId, setEditingQueryId] = useState(null);
  const [marks, setMarks] = useState(85); // Example marks
  const [comments, setComments] = useState('Good work!');
  const [hoveredQuery, setHoveredQuery] = useState(null);

  const handlePostQuery = () => {
    if (newQuery.trim()) {
      setQueries([...queries, { id: Date.now(), text: newQuery, comments: [], views: 0, date: 'Just now', isFavorite: false, user: { name: 'New User', online: true } }]);
      setNewQuery('');
    }
  };

  const handleEditQuery = (id) => {
    const query = queries.find(q => q.id === id);
    if (query) {
      setNewQuery(query.text);
      setEditingQueryId(id);
    }
  };

  const handleUpdateQuery = () => {
    setQueries(queries.map(q => q.id === editingQueryId ? { ...q, text: newQuery } : q));
    setNewQuery('');
    setEditingQueryId(null);
  };

  const handleDeleteQuery = (id) => {
    setQueries(queries.filter(q => q.id !== id));
  };

  const handleAddComment = (queryId, comment) => {
    setQueries(queries.map(q => 
      q.id === queryId ? { ...q, comments: [...q.comments, comment] } : q
    ));
  };

  const toggleFavorite = (id) => {
    setQueries(queries.map(q => q.id === id ? { ...q, isFavorite: !q.isFavorite } : q));
  };

  return (
    <div style={styles.forum}>
      <h2>Discussion Forum</h2>
      <div style={styles.querySection}>
        <textarea 
          style={styles.textarea}
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          placeholder="Post a new query or edit an existing one..."
        />
        {editingQueryId ? (
          <button onClick={handleUpdateQuery} style={styles.button}>Update Query</button>
        ) : (
          <button onClick={handlePostQuery} style={styles.button}>Post Query</button>
        )}
      </div>
      <div style={styles.queryList}>
        {queries.map(query => (
          <div 
            key={query.id} 
            style={styles.query}
            onMouseEnter={() => setHoveredQuery(query.id)}
            onMouseLeave={() => setHoveredQuery(null)}
          >
            <div style={styles.queryHeader}>
              <div style={styles.userProfile}>
                <div style={{ ...styles.onlineStatus, backgroundColor: query.user.online ? '#4caf50' : '#f44336' }}></div>
                <span>{query.user.name}</span>
              </div>
              <span>{query.date}</span>
            </div>
            <p>{query.text}</p>
            <div style={styles.queryActions}>
              <span>{query.views} views</span>
              <button onClick={() => toggleFavorite(query.id)} style={styles.favoriteButton}>
                {query.isFavorite ? 'Unfavorite' : 'Favorite'}
              </button>
              <button style={styles.shareButton}>Share</button>
            </div>
            {hoveredQuery === query.id && (
              <div style={styles.queryEditActions}>
                <button onClick={() => handleEditQuery(query.id)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDeleteQuery(query.id)} style={styles.deleteButton}>Delete</button>
              </div>
            )}
            <div style={styles.comments}>
              {query.comments.map((comment, index) => (
                <div key={index} style={styles.comment}>
                  <div style={styles.commentProfile}>
                    <div style={{ ...styles.onlineStatus, backgroundColor: '#4caf50' }}></div>
                    <span>Commenter</span>
                  </div>
                  <p>{comment}</p>
                </div>
              ))}
              <input 
                type="text" 
                style={styles.commentInput}
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAddComment(query.id, e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={styles.marksSection}>
        <h3>Marks and Comments</h3>
        <p>Marks: {marks}</p>
        <p>Comments: {comments}</p>
      </div>
    </div>
  );
};

const styles = {
  forum: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  querySection: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  queryList: {
    marginBottom: '20px',
  },
  query: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
  queryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
  },
  onlineStatus: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: '5px',
  },
  queryActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  queryEditActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  favoriteButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ffc107',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '5px',
  },
  shareButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  editButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  },
  comments: {
    marginTop: '10px',
  },
  comment: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    padding: '5px',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
  },
  commentProfile: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
  },
  commentInput: {
    width: '100%',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  marksSection: {
    marginTop: '20px',
  },
};

export default DiscussionForum;