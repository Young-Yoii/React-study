import './App.css';
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
      href={"/read/" + topic.id} 
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


function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:"html", body:"html is..."},
    {id:2, title:"css", body:"css is..."},
    {id:3, title:"js", body:"js is..."},
  ]

  const changeModeHandler = (mode, id) => {
    setMode(mode);
    if(id !== undefined){
      setId(id)
    }
  }
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello,Web!"/>
  }else if (mode === 'READ'){
    // let selected = null;
    // for(let i = 0; i <topics.length; i++){
    //   if(topics[i].id === id){
    //     selected = topics[i];
    //     break;
    //   }
    // }
    const selected = topics.find(t => t.id === id)
    content = <Article title={selected.title} body={selected.body}/>
  }
  return (
    <div className="App">
      <Header title="Web" onChangeMode={changeModeHandler}/>
      <Nav topics={topics} onChangeMode={changeModeHandler}/>
      {content}
    </div>
  );
}

export default App;

