import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import axios from 'axios';
import './App.css'

const Header = ({title}) => {
  return <header>
    <h1><Link to="/">{title}</Link></h1>
  </header>;
}
const Nav = ({topics}) => {
  const liTag = topics.map(topic => 
  <li key={topic.id}>
    <Link to={`/read/${topic.id}`}>{topic.title}</Link>
  </li>
  )
  return <nav>
    {liTag}
  </nav>;
}

const Article = ({title, body}) => {
  return <article>
    <h2>{title}</h2>
    {body}
  </article>;
}

const Control = () => {
  return <ul>
    <li><Link to="/create">Create</Link></li>
    <li><Link to="/update">update</Link></li>
  </ul>
}

const Create = ({onSave}) => {
  const submitHandler = (e) => {
    e.preventDefault()
    const title = e.target.title.value;
    const body = e.target.body.value;
    onSave(title, body);
  }

  return <form onSubmit={submitHandler}>
  <p><input type="text" name="title" placeholder='title' /></p>
  <p><textarea name="body" placeholder='body'></textarea></p>
  <p><input type="submit" value="Create" /></p>
</form>
}

const Read = () => {
  const params = useParams();
  const id = Number(params.id);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    axios.get(`/topics/${id}`).then(res => {
      setTitle(res.data.title);
      setBody(res.data.body);
    })
  }, [id])
  return  <Article title={title} body={body}></Article>
}

function App() {
  const navgate = useNavigate();
  const [topics, setTopics] = useImmer([]);
  
  //서버랑 통신하는 코드
  const fetchTopics = async() => {
    const _topics = await axios.get('/topics');
    setTopics(_topics.data);
  }

  useEffect(() => {
    fetchTopics()
  },[])
  
  const saveHandler = (title, body) => {
    axios.post(`/topics/`, {title, body}).then(result => {
      setTopics(draft => {
        draft.push(result.data);
      })
      navgate(`/read/${result.data.id}`);
    })
  }

  return (
    <div className="App">
      <Header title="Web"/>
      <Nav topics={topics}/>
      <Routes>
        <Route path='/' element={<Article title="Welcome" body="Hello,Web!"/>} />
        <Route path='/create' element={<Create onSave={saveHandler} />} />
        <Route path='/read/:id' element={<Read topics={topics}/>} />
      </Routes>
      <Control/>
    </div>
  );
}

export default App;
