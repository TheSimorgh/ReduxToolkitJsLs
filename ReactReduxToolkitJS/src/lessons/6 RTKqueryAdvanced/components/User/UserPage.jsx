






import { useSelector } from 'react-redux'

import { Link, useParams } from 'react-router-dom'
import { useGetPostsByUserIdQuery } from '../../redux/features/post/post.slice'
import { selectUserById } from '../../redux/features/users/user.slice'


const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))
    console.log(user);
    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        const { ids, entities } = postsForUser
        content = ids.map(id => (
            <li key={id}>
                <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
        ))
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>{user?.name}</h2>

            <ol>{content}</ol>
        </section>
    )
}

export default UserPage


// import { useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { useGetPostsByUserIdQuery } from "../../redux/features/post/post.slice";
// // import {
// //   selectAllPosts,
// //   selectPostsByUser,
// //   useGetPostsByUserIdQuery,
// // } from "../../redux/features/post/post.slice";

// const UserPage = () => {
//   const { userId } = useParams();
//   const user = useSelector((state) => selectUserById(state, Number(userId)));
//   // const postsForUser2 = useSelector(state => {
//   //     const allPosts =selectAllPosts(state)
//   //     return allPosts.filter(post=>post.userId===Number(userId))
//   // })
//   // const postTitles2 = postsForUser2.map(post => (
//   //     <li key={post.id}>
//   //         <Link to={`/post/${post.id}`}>{post.title}</Link>
//   //     </li>
//   // ))

//   ///we are using memoized
// //   const postsForUser = useSelector((state) =>
// //     selectPostsByUser(state, Number(userId))
// //   );

// const {data:postsForUser,isLoading,isError,error,isSuccess}=useGetPostsByUserIdQuery(userId)
// //   const postTitles = postsForUser.map((post) => (
// //     <li key={post.id}>
// //       <Link to={`/post/${post.id}`}>{post.title}</Link>
// //     </li>
// //   ));

// let content;
// if (isLoading) {
//   content = <p>Loading....</p>;
// } else if (isSuccess) {
//    const{ids,entities}=postsForUser
//     content=ids.map(id=>(
//         <li key={id}>
//         <Link to={`/post/${id}`}>{entities[id].title}</Link>
//        </li>
//     ))
// } else if (isError) {
//   content = <p>{error}</p>;
// }


//   return (
//     <section>
//       <h2>{user?.name}</h2>

//       {/* <ol>{postTitles}</ol> */}
//       <ol>{content}</ol>
//       <br />
//       {/* <ol>{postTitles2}</ol> */}
//     </section>
//   );
// };

// export default UserPage;