import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery } from "../../redux/features/post/post.slice";
import PostItem from "./PostItem";


const PostsList = () => {
  const {
      isLoading,
      isSuccess,
      isError,
      error
  } = useGetPostsQuery()
console.log(useGetPostsQuery());
  const orderedPostIds = useSelector(selectPostIds)

  let content;
  if (isLoading) {
      content = <p>"Loading..."</p>;
  } else if (isSuccess) {
      content = orderedPostIds.map(postId => <PostItem key={postId} postId={postId} />)
  } else if (isError) {
      content = <p>{error}</p>;
  }

  return (
      <section>
          {content}
      </section>
  )
}
export default PostsList