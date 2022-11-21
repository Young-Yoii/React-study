import './App.css';

const Header = ({title}) => {
  return <header>
    <h1><a href="index.html">{title}</a></h1>
  </header>;
}

const Nav = ({topics}) => {
  const liTag = topics.map((topic) => {
    <li key={topic.id}><a href={"/read/" + topic.id}>{topic.title}</a></li>
  })

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
  const topics = [
    {id:1, title:"html", body:"html is..."},
    {id:2, title:"css", body:"css is..."},
    {id:3, title:"js", body:"js is..."},
  ]
  return (
    <div className="App">
      <Header title="Web"/>
      <Nav topics={topics}/>
      <Article title="Welcome" body="Hello,Web"/>
    </div>
  );
}

export default App;

