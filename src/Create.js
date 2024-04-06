import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Matthew');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  // Timestamp
  const timestamp = new Date().toISOString();
  const dateObj = new Date(timestamp);
  const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = dateObj.toLocaleString('en-US', options);


  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, body, formattedDate, author };

    setIsPending(true);

    fetch('http://localhost:8000/blogs',{
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(blog) 
    }).then(()=>{
        console.log('new blog added')
        setIsPending(false);
        // direct to home after adding blog
        history.push('/');
    })

    
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Matthew">Matthew</option>
          <option value="Zealandrio">Zealandrio</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
}
 
export default Create;