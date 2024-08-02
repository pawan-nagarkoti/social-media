import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Loading, PostContainer } from "../../components";
import { _get, _delete } from "../../services/api";
import { useToast } from "../../services/hook";

export default function GetAllPost() {
  const navigate = useNavigate();
  const [isLoadingGetAllPostData, setIsLoadingGetAllPostData] = useState(false);
  const [postData, setPostData] = useState([]);
  const [isLoadingUsername, setIsLoadingUsername] = useState(false);
  const { showToast } = useToast();
  const [usernameValue, setUsernameValue] = useState("");
  const [specificUsernameData, setSpecificUsernameData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasRemovedTag, setHasRemovedTag] = useState(false);
  const [tagName, setTagName] = useState("");
  const [specificTagName, setSpecificTagName] = useState([]);
  const [isLoadingTagname, setIsLoadingTagname] = useState(false);
  const [deletedPostId, setDeletedPostId] = useState(null);

  const getAllPostData = async () => {
    setIsLoadingGetAllPostData(true);
    try {
      const response = await _get(`social-media/posts?page=1&limit=10`);
      if (response?.status === 200) {
        setPostData(response?.data?.data?.posts);
        showToast(response.data.message, "success");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error Status Code:", error.response.status);
        console.error("Error Message:", error.response.data.message);
        showToast(error.response.data.message, "error");
      } else {
        console.error("An unknown error occurred.");
      }
    } finally {
      setIsLoadingGetAllPostData(false);
    }
  };

  useMemo(() => {
    getAllPostData();
  }, []);

  // search for username
  const handleSearchByUsername = async () => {
    setIsLoadingUsername(true);
    setHasSearched(true);
    try {
      const response = await _get(`social-media/posts/get/u/${usernameValue}?page=1&limit=3`);
      if (response?.status === 200) {
        setSpecificUsernameData(response?.data?.data?.posts);
        showToast(response.data.message, "success");
      } else {
        setSpecificUsernameData([]); // Clear data if status is not 200
      }
    } catch (error) {
      setSpecificUsernameData([]); // Clear data on error
      if (error.response && error.response.data) {
        console.error("Error Status Code:", error.response.status);
        console.error("Error Message:", error.response.data.message);
        showToast(error.response.data.message, "error");
      } else {
        console.error("An unknown error occurred.");
      }
    } finally {
      setIsLoadingUsername(false);
    }
  };

  // search for tag name
  const handleSearchByTagName = async () => {
    setIsLoadingTagname(true);
    setHasRemovedTag(true);
    try {
      const tagResponse = await _get(`social-media/posts/get/t/${tagName}?page=1&limit=3`);
      console.log("tagResponse", tagResponse.data.data.posts);
      if (tagResponse?.status === 200) {
        setSpecificTagName(tagResponse.data.data.posts);
        showToast(tagResponse.data.message, "success");
      } else {
        setSpecificTagName([]);
      }
    } catch (error) {
      setSpecificTagName([]);
      if (error.response && error.response.data) {
        console.error("Error Status Code:", error.response.status);
        console.error("Error Message:", error.response.data.message);
        showToast(error.response.data.message, "error");
      } else {
        console.error("An unknown error occurred.");
      }
    } finally {
      setIsLoadingTagname(false);
    }
  };

  // This is used for search box for username
  const handleInputSearchByUsername = (e) => {
    if (e.target.value) {
      setUsernameValue(e.target.value);
    } else {
      setHasSearched(false);
      setUsernameValue("");
      getAllPostData();
    }
  };

  // This is used for search box for tagname
  const handleInputSearchByTagname = (e) => {
    if (e.target.value) {
      setTagName(e.target.value);
    } else {
      setHasRemovedTag(false);
      getAllPostData();
      setTagName("");
    }
  };

  const getDeletedPostId = (deletedId) => {
    setDeletedPostId(deletedId);
  };

  // This function is used for delte post
  const handleDeletePost = async () => {
    try {
      const response = await _delete(`social-media/posts/${deletedPostId}`);
      if (response?.status === 200) {
        showToast(response.data.message, "success");
        getAllPostData();
        // This hook is used for filter the un removed post
        setSpecificUsernameData((pre) => pre.filter(({ _id }) => _id !== deletedPostId));
        setSpecificTagName((pre) => pre.filter(({ _id }) => _id !== deletedPostId));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error Status Code:", error.response.status);
        console.error("Error Message:", error.response.data.message);
        showToast(error.response.data.message, "error");
      } else {
        console.error("An unknown error occurred.");
      }
    } finally {
    }
  };

  // used for delete the post if delte post id is available
  useEffect(() => {
    if (deletedPostId) {
      handleDeletePost();
    }
  }, [deletedPostId]);

  // After username search when we delete all post related to the username then its redirect to the get all post page.
  useEffect(() => {
    if (specificUsernameData.length === 0) {
      setHasSearched(false);
      setUsernameValue("");
    }

    if (specificTagName.length === 0) {
      setHasRemovedTag(false);
      setTagName("");
    }
  }, [specificUsernameData, specificTagName]);

  return (
    <>
      <div className="d-flex gap-2 align-items-center">
        <Button className="btn-primary top-position" onClick={() => navigate("/create-post")}>
          Create Post
        </Button>

        {/* search for username */}
        <div className="d-flex align-items-center">
          <Input placeholder="search username" value={usernameValue} onChange={(e) => handleInputSearchByUsername(e)} />
          <Button className="btn-primary top-position" onClick={handleSearchByUsername} disabled={!usernameValue}>
            search
          </Button>
        </div>

        {/* search for tag name */}
        <div className="d-flex align-items-center">
          <Input placeholder="search by tag name" value={tagName} onChange={(e) => handleInputSearchByTagname(e)} />
          <Button className="btn-primary top-position" onClick={handleSearchByTagName} disabled={!tagName}>
            search
          </Button>
        </div>
      </div>

      {postData.length <= 0 && <div>No Post data available.</div>}

      {(isLoadingGetAllPostData || isLoadingUsername || isLoadingTagname) && <Loading />}

      {hasSearched && !isLoadingUsername && specificUsernameData.length === 0 && <div>No username found</div>}
      {hasRemovedTag && !isLoadingTagname && specificTagName.length === 0 && <div>No Tagname found</div>}

      {!hasSearched && !hasRemovedTag && postData.length > 0 && (
        <div className="postcontainer-flex-box">
          {postData.map((item, index) => (
            <PostContainer item={item} key={index} getDeletedPostId={getDeletedPostId} />
          ))}
        </div>
      )}

      {hasSearched && specificUsernameData.length > 0 && (
        <div className="postcontainer-flex-box">
          {specificUsernameData.map((item, index) => (
            <PostContainer item={item} key={index} getDeletedPostId={getDeletedPostId} />
          ))}
        </div>
      )}

      {hasRemovedTag && specificTagName.length > 0 && (
        <div className="postcontainer-flex-box">
          {specificTagName.map((item, index) => (
            <PostContainer item={item} key={index} getDeletedPostId={getDeletedPostId} />
          ))}
        </div>
      )}
    </>
  );
}
