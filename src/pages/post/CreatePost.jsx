import { useNavigate } from "react-router-dom";
import { Button, Input, Loading, Textarea } from "../../components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { multiplPreviewImage, multipleCleanupImage } from "../../utils/helper";
import { _delete, _get, _patch, _post } from "../../services/api";
import { useToast } from "../../services/hook";

export default function CreatePost() {
  const navigate = useNavigate();
  const [previewImagebox, setPreviewImagebox] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [tag, setTag] = useState([]);
  const { showToast } = useToast();
  const [isLoadingPostData, setIsLoadingPostData] = useState(false);
  const [hasPostUpdatedData, setHasPostUpdatedData] = useState(false);
  const [hasUpdatedPreviewImages, setHasUpdatedPreviewImages] = useState([]);
  const getUpdatedPostIdFromLocalStorage = localStorage.getItem("updatedPostId");

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      images: "",
      content: "",
      tags: "",
    },
  });

  const imageContainer = watch("images");
  const tagContainer = watch("tags");

  // This useEffect is used for stored previous image and add next upcomming selected images.
  useEffect(() => {
    if (imageContainer && imageContainer.length > 0) {
      const newImages = Array.from(imageContainer);
      setAllImages((prevImages) => [...prevImages, ...newImages]);
    }
  }, [imageContainer]);

  // This useEffect is used for send multiple preview images.
  useEffect(() => {
    multiplPreviewImage(allImages, setPreviewImagebox);
    return () => {
      multipleCleanupImage(previewImagebox);
    };
  }, [allImages]);

  // This is used for delete image from preview and inside allImages hook.
  const handleDeleteImage = (index) => {
    setAllImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      return newImages;
    });
    setPreviewImagebox((prevPreviews) => {
      const newPreviews = prevPreviews.filter((_, i) => i !== index);
      return newPreviews;
    });
  };

  // This function is used for delete updated images
  const handleUpdatedPreviewImages = async (index, deletedImageId) => {
    try {
      const response = await _patch(
        `social-media/posts/remove/image/${getUpdatedPostIdFromLocalStorage}/${deletedImageId}`
      );
      if (response?.status === 200) {
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
    }
    setHasUpdatedPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // this is used for creat post
  const handleCreatePostForm = async (data) => {
    data.tags = tag;
    const formData = new FormData();
    formData.append("content", data.content);

    // this form data is handling tags in the api
    data.tags.forEach(({ label }, index) => {
      formData.append(`tags[${index}]`, label);
    });

    // this form data is handling images in the api
    allImages.forEach((image) => {
      formData.append(`images`, image);
    });

    hasUpdatedPreviewImages.forEach((image) => formData.append(`images`, image));

    setIsLoadingPostData(true);
    try {
      const response = getUpdatedPostIdFromLocalStorage
        ? await _patch(`social-media/posts/${getUpdatedPostIdFromLocalStorage}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await _post("social-media/posts", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      if (response?.status === 200 || response?.status === 201) {
        showToast(response.data.message, "success");
        localStorage.removeItem("updatedPostId");
        reset();
        navigate("/get-post");
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
      setIsLoadingPostData(false);
    }
  };

  // when we click on create tag
  const handleCreateTag = () => {
    const tagObjectContainer = {
      id: Date.now(),
      label: tagContainer,
    };
    setTag((prevTag) => [...prevTag, tagObjectContainer]);
    setValue("tags", "");
  };

  // This funtion is used for delete tags
  const handleDeleteTags = (id) => {
    setTag((getAllTag) => getAllTag.filter((tag) => tag.id != id));
  };

  // this function is used for get update the post detail
  const getUpdatedPostDetail = async () => {
    setHasPostUpdatedData(true);
    try {
      const response = await _get(`social-media/posts/${getUpdatedPostIdFromLocalStorage}`);
      if (response?.status === 200) {
        // set value of content
        setValue("content", response?.data?.data?.content);

        // set value of tags
        const getTagsValue = response?.data?.data?.tags?.map((tagValue, index) => {
          const tagObjectContainer = {
            id: index,
            label: tagValue,
          };
          return tagObjectContainer;
        });

        setTag(getTagsValue);

        // set the value of images preview
        setHasUpdatedPreviewImages(
          response?.data?.data?.images?.map((item) => ({
            id: item._id,
            url: item.url,
          }))
        );

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
      setHasPostUpdatedData(false);
    }
  };

  useEffect(() => {
    if (getUpdatedPostIdFromLocalStorage) {
      getUpdatedPostDetail();
    }
  }, [getUpdatedPostIdFromLocalStorage]);

  const handleNavigateToBackPage = () => {
    navigate(-1);
    localStorage.removeItem("updatedPostId");
  };

  if (hasPostUpdatedData) {
    return <Loading />;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <Button className="btn-primary" onClick={handleNavigateToBackPage}>
            Back
          </Button>
          <h5 className="mt-3">Create Post</h5>

          <form onSubmit={handleSubmit(handleCreatePostForm)}>
            <Input type="file" label="Image" {...register("images")} multiple accept="image/*" />

            {/* when we select images from input box */}
            {previewImagebox.length > 0 && (
              <>
                <div className="multiple-preview-image-container mb-3">
                  {previewImagebox.map((item, index) => (
                    <div className="d-flex flex-column" key={index}>
                      <img src={item} alt="" className="img-thumbnail img-fluid preview-img" />
                      <Button className="btn-danger mt-2" onClick={() => handleDeleteImage(index)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* These images are get from updated post */}
            {hasUpdatedPreviewImages?.length > 0 && (
              <>
                <div className="multiple-preview-image-container mb-3">
                  {hasUpdatedPreviewImages.map(({ url, id }, index) => (
                    <div className="d-flex flex-column" key={index}>
                      <img src={url} alt="" className="img-thumbnail img-fluid preview-img" />
                      <Button className="btn-danger mt-2" onClick={() => handleUpdatedPreviewImages(index, id)}>
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Textarea label="Content" {...register("content")} />

            <div className="mb-5">
              <div className="d-flex align-items-center">
                <Input label="Tag" {...register("tags")} value={tag.label} />
                <Button className="btn-primary mt-3 mx-2" onClick={handleCreateTag} disabled={!tagContainer}>
                  Create Tag
                </Button>
              </div>
              {tag?.map(({ label, id }, index) => (
                <div className="d-flex align-items-center gap-2 mt-2" key={index}>
                  <p className="mb-0">{label}</p>
                  <Button className="btn-danger" onClick={() => handleDeleteTags(id)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>

            <Button className="btn-primary" type="submit">
              {isLoadingPostData ? <Loading /> : "submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
