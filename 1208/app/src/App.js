import './App.css';
import {useEffect, useState} from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import darkSlice from './features/dark/darkSlice';
import Like from './features/like/Like';
import LikeServer from './features/like/LikeServer';
import { 
  useCreateTopicMutation, 
  useDeleteTopicMutation, 
  useGetTopicQuery, 
  useGetTopicsQuery, 
  useUpdateTopicMutation, 
  useGetLikesQuery 
} from './app/api';
//RTKquery는 서버와 통신할 때 사용하는 것이다.
//끝이 query 로 끝나면 데이터를 읽을 때 쓰는 훅 - 자동으로 실행
//mutation으로 끝나면 데이터를 수정할때 쓰는 훅 - 수동으로 실행
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const Header = ({title}) => {
  return <header>
      <h1><Link to="/">{title}</Link></h1>
    </header>
}
const Nav = ({topics}) => {
  const liTag = topics.map((t)=>{
    return <li key={t.id}>
      <Link 
        to={`/read/${t.id}`}
      >
        {t.title}
      </Link>
    </li>
  });
  return <nav>
    <ul>
      {liTag}
    </ul>
  </nav>
}
const Article = ({title, body})=>{
  return <article>
    <h2>{title}</h2>
    {body}
  </article>
}
function Control() {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const [deleteTopic, info] = useDeleteTopicMutation();
  let contextUI = null;
  if(id){
    contextUI = <>
      <li><Link to={`/update/${id}`}>Update</Link></li>
      <li><button onClick={async()=>{
        deleteTopic(id);
        navigate(`/`);
      }}>{info.isLoading ? 'Deleting...': 'Delete'}</button></li>
    </>
  }
  return <ul>
    <li><Link to="/create">Create</Link></li>
    {contextUI}
  </ul>
}
const Create = () => {
  const navigate = useNavigate();
  const [createTopic, createInfo] = useCreateTopicMutation();
  //mutation hook은 return 값이 배열이다.
  //첫번째 원소는 서버로 데이터를 보내는 함수
  const submitHandler = async (evt)=>{
    evt.preventDefault();
    const title = evt.target.title.value;
    const body = evt.target.body.value;

    //첫번째 원소에 서버쪽으로 보내고 싶은 데이터를 객체형식으로 주면 서버와 통신이 시작
    const result = await createTopic({title, body});
    navigate(`/read/${result.data.id}`);
  }
  if(createInfo.isLoading){
    return <>Creating....</>
  }
  return <form onSubmit={submitHandler}>
    <p><input type="text" name="title" placeholder="title" /></p>
    <p><textarea name="body" placeholder="body"></textarea></p>
    <p><input type="submit" value="Create" /></p>
  </form>
}
const Update = () => {
  const params = useParams();
  const id = Number(params.id);
  const navigate = useNavigate();
  const {data:topic, isLoading} = useGetTopicQuery(id);
  //query hook은 return값이 객체형식이다.
  //데이터를 가져오고
  const [updateTopic] = useUpdateTopicMutation();
  //수정하는 hook
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(()=>{
    if(topic !== undefined) {
      setTitle(topic.title);
      setBody(topic.body);
    }
  }, [topic]);
  //data와 form을 연결시키기위해 useEffect 사용
  //form의value에 바로 topic.title을 넣으면 값이 수정이되지 않기때문임!

  if(isLoading){
    return <>Loading...</>
  }

  const submitHandler = async (evt)=>{
    evt.preventDefault();
    const title = evt.target.title.value;
    const body = evt.target.body.value;
    const result = await updateTopic({id, title, body});
    navigate(`/read/${id}`);
  }
  const titleHandler = (evt)=>{
    setTitle(evt.target.value);
  }
  const bodyHandler = (evt)=>{
    setBody(evt.target.value);
  }
  return <form onSubmit={submitHandler}>
    <p><input type="text" name="title" placeholder="title" value={title} onChange={titleHandler} /></p>
    <p><textarea name="body" placeholder="body" value={body} onChange={bodyHandler}></textarea></p>
    <p><input type="submit" value="Update" /></p>
  </form>
}
const Read = ()=>{
  const params = useParams();
  const id = Number(params.id);
  const {data, isLoading} = useGetTopicQuery(id);
  if(isLoading){
    return <>Loading...</>
  }
  return <Article title={data.title} body={data.body}></Article>
}
const DarkMode = ()=>{
  const dispatch = useDispatch();
  const isDark = useSelector((state)=>{
    return state.darkmode.isDark;
  });
  return <div>
    <button onClick={()=>{
       //darkSlice의 actions func 사용
       //파라미터를 주는 방식
      dispatch(darkSlice.actions.change(!isDark))
      // dispatch({type:'darkmode/change', payload:!isDark})
      //데이터를 바꿀 때는 dispatch, dispatch로 전달하는 것은 action
      //action은 반드시 type이 있어야 하며 부가적인 것은 payload로 전달
    }}>{isDark ? 'Light' : 'Dark'}</button>
  </div>
}

function App() {
  const isDark = useSelector(state => state.darkmode.isDark);
  //state 의 값을 가져올때는 useSelector를 쓰면된다 ~!

  // const topicsQuery = useGetTopicsQuery();
  // const topics = topicsQuery.data;
  // const topicsIsLoading = topicsQuery.isLoading;
  const {data:topics, isLoading:topicsIsLoading} = useGetTopicsQuery();
  const {data:likes, isLoading:likesIsLoading} = useGetLikesQuery(undefined, {pollingInterval: 1000,});
  //hook 에서는 data, isLoading 으로 쓰지만 쉽게 알아보기위해 각각 변수 지정해줌
  //polingInterval : 해당시간에 한번 씩 데이터를 긁어오게함

  useEffect(()=>{
    document.querySelector('html').style.filter = `invert(${isDark ? 100 : 0}%)`;
  }, [isDark])

  return (
    <Container maxWidth="sm">
      <Header title="웹" />
      {likesIsLoading ? 'Loading...' : <>좋아요 수: {likes.count}</>}
      <DarkMode></DarkMode>
      <Grid container>
        <Grid xs={12} sm={3}>{topicsIsLoading ? 'Loading...' : <Nav topics={topics} />}</Grid>
        <Grid xs={12} sm={9}>
            <Routes>
          <Route path="/" element={<Article title="Hello" body="Welcome, WEB!" />}></Route>
          <Route path="/create" element={<Create></Create>}></Route>
          <Route path="/update/:id" element={<Update></Update>}></Route>
          <Route path="/read/:id" element={<Read />}></Route>
          </Routes>
          <Routes>
            <Route path="/" element={<Control></Control>} />
            <Route path="/read/:id" element={<Control></Control>} />
            <Route path="/create" element={<Control></Control>} />
            <Route path="/update/:id" element={<Control></Control>} />
          </Routes>
          <Like />
          <LikeServer />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
