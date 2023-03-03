import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, postAdded } from "../../redux/features/post/post.slice";
import {
  selectAllUsers,
  userAdded,
} from "../../redux/features/users/user.slice";
import ReactionButtons from "./ReactionButtons";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [addReqStatus, setAddReqStatus] = useState("idle");
  // const canSave = Boolean(title)&&Boolean(context)&&Boolean(userId)
  const canSave =
    [title, context, userId].every(Boolean) && addReqStatus === "idle";

  const users = useSelector(selectAllUsers);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContextChanged = (e) => setContext(e.target.value);
  const onNameChanged = (e) => setName(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const userOptions = users.map((user, i) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  ////1
  // const onSavedPostClicked=()=>{
  //     if(title && context){
  //         dispatch(postAdded({
  //             id:nanoid(),
  //             title,
  //             context
  //         }))
  //     }

  //     setTitle("")
  //     setContext("")
  // }
  // const onSavedPostClicked = () => {

  ////2
  //   if (title && context) {
  //     dispatch(postAdded(title, context,userId));
  //   }
  //   if(name){
  //       dispatch(userAdded(name))
  //   }

  //   setTitle("");
  //   setContext("");
  //   setName("")
  // };

  const onSavedPostClicked = () => {
    if(canSave){
      try {
        setAddReqStatus("pending");
        dispatch(addNewPost({ title, body: context, userId })).unwrap();
        setTitle("");
        setContext("");
        setUserId("");
      } catch (error) {
        console.log(`Failed to save the post`, error);
      }finally{
        setAddReqStatus("idle")
      }
    }
  };
  return (
    <section>
      <h4>AddPostForm</h4>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label htmlFor="postTitle">Post Title</label>
        <input
          id="postTitle"
          type="text"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContext">Post Context</label>

        <textarea
          id="postContext"
          type="text"
          value={context}
          onChange={onContextChanged}
        />
            <label htmlFor="userName">Author Name</label>

        <select value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>

        {/* <label htmlFor="userName">User Name</label>
        <input
          id="userName"
          type="text"
          value={name}
          onChange={onNameChanged}
        /> */}
        <button disabled={!canSave} type="button" onClick={onSavedPostClicked}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
