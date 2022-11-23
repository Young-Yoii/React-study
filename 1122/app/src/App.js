import { useState } from 'react';

const Header = ({title , onChangeMode}) => {
  return <header>
    <h1><a href="index.html" onClick={(e) => {
      e.preventDefault()
      onChangeMode('WELCOME')
    }}>{title}</a></h1>
  </header>;
}

const Nav = ({topics , onChangeMode}) => {
  const liTag = topics.map(topic => 
  <li key={topic.id}>
    <a 
      href={`/read/${topic.id}`} 
      onClick={(e) => {
        e.preventDefault()
        onChangeMode('READ', topic.id)
      }}
    >
      {topic.title}
    </a>
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

const Control = ({onChangeMode}) => {
  return <ul>
  <li><a href="/create" onClick={(e) => {
  e.preventDefault()
  onChangeMode('CREATE')}}>Create</a></li>
  <li><a href="/update" onClick={(e) => {
  e.preventDefault()
  onChangeMode('update')}}>update</a></li>
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

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:"html", body:"html is..."},
    {id:2, title:"css", body:"css is..."},
    {id:3, title:"js", body:"js is..."},
  ])

  const changeModeHandler = (mode, id) => {
    setMode(mode);
    if(id !== undefined){
      setId(id)
    }
  }
  const saveHandler = (title, body) => {
    // add title and body to topics
    let newTopics = [...topics];
    newTopics.push({id:nextId, title, body})
    setTopics(newTopics);
    setId(nextId);
    setNextId(current => current + 1);
    setMode('READ');
  }

  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello,Web!"/>
  }else if (mode === 'READ'){
    const selected = topics.find(t => t.id === id)
    content = <Article title={selected.title} body={selected.body}/>
  }else if(mode === 'CREATE') {
    content = <Create onSave={saveHandler}/>
  }else if(mode === 'update') {
    content = <Article title="update" body="update"/>
  }
  return (
    <div className="App">
      <Header title="Web" onChangeMode={changeModeHandler}/>
      <Nav topics={topics} onChangeMode={changeModeHandler}/>
      {content}
      <Control onChangeMode={changeModeHandler}/>
    </div>
  );
}

export default App;
