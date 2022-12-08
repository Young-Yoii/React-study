
import { useSelector, useDispatch } from 'react-redux';
import {up} from './likeSlice'

const Like = () => {
    const count = useSelector(state => state.likes.count);
    const dispatch = useDispatch()
    return <div>
        <button onClick={() => {
            dispatch(up())
        }}>좋아요({count})</button>
    </div>
}

export default Like;