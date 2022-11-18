import './App.css';
// import ReactPlayer from 'react-player'

const Header = ({title}) => {
  return <header>
    <h1><a href="index.html">{title}</a></h1>
  </header>
}

const Nav = ()=> {
  return <nav>
    <ul>
      <li><a href="1.html">html</a></li>
      <li><a href="2.html">css</a></li>
      <li><a href="3.html">js</a></li>
    </ul>
  </nav>
}

// props를 쉽게? 알기 위해 구조분해할당으로 가져오기
const Article = ({title, body}) => {
  return <article>
    <h2>{title}</h2>
    {body}
  </article>
}

function App() {
  return (
    <div className="App">
      <Header title="웹"/>
      <Nav />
      <Article title="어서오세요" body="헬로월드~!"/>
      {/* <ReactPlayer url ="https://www.youtube.com/watch?v=kAPmMyEyl5k" width={500}/> 리액트 플레이어사용 */}
      {/* 컴포넌트를 만들기 전에 사용자에게 어떤 props를 제공할지 UX를 먼저 설계, 그 후 구현하는 것이 좋은 방법 */}
    </div>
  );
}

export default App;
