import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
  selectPostIds,
  // selectPostIds,
} from "../../redux/features/post/post.slice";
import { fetchUsers, getUsersStatus, selectAllUsers } from "../../redux/features/users/user.slice";

const PostsList = () => {
  // const posts =useSelector(selectAllPosts)
  // const posts = useSelector((state) => state.posts.posts);
  //orderedPostsIds
   const posts = useSelector(selectPostIds)
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);
  const usersStatus = useSelector(getUsersStatus);
  const usersError = useSelector(getPostsError);
  const dispatch = useDispatch();
  // const {users}=useSelector(state=>state.users)
  const users = useSelector(selectAllUsers);
  // const orderedPosts =posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
  console.log(users);
  const posts2 = useSelector(selectAllPosts);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
    console.log(posts2);
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading....</p>;
  } else if (postsStatus === "succeeded") {
    // const orederdPosts=posts.slice().sort((a,b)=>b.localeCompare(a.date))
    // content = posts.map((post, i) => <PostItem post={post} key={i} />).reverse();
    content = posts.map(postId=> <PostItem postId={postId} key={postId} />);

  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }


  // let content2;
  // if (usersStatus === "loading") {
  //   content2 = <p>Loading....</p>;
  // } else if (usersStatus === "succeeded") {
  //   content2 = users.map((e, i) => (
  //     <div
  //       key={e.id}
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <span>ID: {e.id} ||</span>
  //       <p> Name: {e.name}</p>
  //     </div>
  //   ))
  // } else if (usersStatus === "failed") {
  //   content2 = <p>{usersError}</p>;
  // }
  return (
    <div
      // style={{ display: "flex", justifyContent: "space-between",flexWrap:"wrap", gap: "5px" }}
    >
      <div >
        <h1 style={{textAlign:"center"}}>POSTS</h1>
     <div style={{display:"flex",justifyContent:"center",alignContent:"center",flexWrap:"wrap"}}>
     {content}
     </div>

        {/* <h1>POSTS 2</h1>
           {posts2.map((post,i)=>(
            <PostItem post={post} key={i} />
        ))} */}
      </div>

    </div>
  );
};

export default PostsList;
