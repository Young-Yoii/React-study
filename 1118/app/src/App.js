import './App.css';

const Header = ({title , onChangeMode}) => {
  return <header>
    <h1><a href="index.html" onClick={(e) => {
      e.preventDefault()
      onChangeMode()
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
        onChangeMode()
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
  let mode = 'WELCOME';
  const topics = [
    {id:1, title:"html", body:"html is..."},
    {id:2, title:"css", body:"css is..."},
    {id:3, title:"js", body:"js is..."},
  ]
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello,Web!"/>
  }else if (mode === 'READ'){
    content = <Article title="Read" body="Hello,READ!"/>
  }
  return (
    <div className="App">
      <Header title="Web" onChangeMode={() => {
        alert('WELCOME')}}/>
      <Nav topics={topics} onChangeMode={() => {alert('READ')}}/>
      {content}
    </div>
  );
}

export default App;

