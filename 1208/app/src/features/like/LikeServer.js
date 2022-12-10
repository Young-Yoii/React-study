
import { useDispatch } from 'react-redux';
import { useGetLikesQuery, useSetLikesMutation } from '../../app/api';
import {up} from './likeSlice'

const LikeServer = () => {
    const {data, isLoading} = useGetLikesQuery();
    const [setLikes] = useSetLikesMutation();
    const dispatch = useDispatch();
    if(isLoading){
        return 'Loading...'
    }
    return <div>
        <button onClick={() => {
            setLikes({count: data.count+1})
        }}>좋아요({data.count})</button>
    </div>
}

export default LikeServer;