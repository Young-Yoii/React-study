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

const Read = ({topics}) => {
  const params = useParams();
  const id = Number(params.id);
  const topic = topics.find((t) =>t.id === id)
  return  <Article title={topic.title} body={topic.body}></Article>
}

function App() {
  const navgate = useNavigate()
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useImmer([]);
  //서버랑 통신하는 코드
  const fetchTopics = async() => {
    const topics = await axios.get('http://localhost:3333/topics');
    setTopics(topics.data);
  }

  useEffect(() => {
    fetchTopics()
  },[])
  
  const saveHandler = (title, body) => {
    setTopics(draft => {
      draft.push({id:nextId, title, body});
    })
    navgate(`/read/${nextId}`);
    setNextId(current => current + 1);
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
