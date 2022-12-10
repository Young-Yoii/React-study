import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//createApi는 서버hook을 만드는 생성자이며, RTKquery의 핵심적인 interface
//createApi는 api 서버에 대응한다.

export const topicApi = createApi({
    reducerPath: 'topicApi', //서버캐시의 이름
    baseQuery: fetchBaseQuery({ baseUrl: '/' }), //baseUrl에 도메인을 넣는다. (지금은 proxy 사용이므로 '/', 원래는 기본이되는 'https://localhost:3000'입력)
    tagTypes:['Topics'],
    endpoints: (builder) => ({ //endpoints : get, post, patch, delete
      getTopics: builder.query({ //데이터를 가져올때 query
        query: () => `topics`, //return 값으로 baseUrl 이후의 주소를 줌 => 'https://localhost:3000/topics'
        providesTags: (result, error, arg) => {
            return ['Topics', ...result.map(topic=>({type:'Topics', id:topic.id}))]
        },
      }),
      getTopic: builder.query({
        query: (id) => `topics/${id}`,
        providesTags: (result, error, arg) => {
            return [{type:`Topics`, id:arg}] //데이터가 업데이트 되면 자동동기화 시켜서 렌더링 시켜주는 역할"Tags"
        },
      }),
      createTopic: builder.mutation({//데이터를 수정할때 mutation
        query: ({title, body})=>({
            url:`topics`,
            method: `POST`,
            body: {title, body}  
        }),
        invalidatesTags: ['Topics'],
      }),
      updateTopic: builder.mutation({
        query: ({id, title, body})=>({
            url:`topics/${id}`,
            method: `PATCH`,
            body: {title, body}  
        }),
        invalidatesTags: (result, error, arg)=>{
            // ['Topics']를 하지 않는 이유는 Topics를 하면 모든 캐쉬가 지워지기 때문입니다.
            return [{type:'Topics', id:arg.id}]; 
        }
      }),
      deleteTopic: builder.mutation({
        query: (id)=>({
            url:`topics/${id}`,
            method: `DELETE`,
        }),
        invalidatesTags: ['Topics']
      }),
    }),
  })
  
  export const { 
    useGetTopicsQuery, 
    useGetTopicQuery, 
    useCreateTopicMutation, 
    useUpdateTopicMutation, 
    useDeleteTopicMutation,
} = topicApi