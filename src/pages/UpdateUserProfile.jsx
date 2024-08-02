import { Input, Textarea, Dropdown, Button, Loading } from "../components";
import { dropdownValuesForCountryCodes } from "../utils/constant";
import { useForm } from "react-hook-form";
import { useToast } from "../services/hook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { _patch } from "../services/api";
import { previewImage, cleanupImage } from "../utils/helper";

export default function UpdateUserProfile() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState(false);
  const [hasAvatarImage, setHasAvatarImage] = useState(null);
  const [hasCoverImage, setCoverImage] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      countryCode: "",
      dob: "",
      location: "",
      phoneNumber: "",
      avatar: "",
      coverImage: "",
    },
  });

  const avatarValue = watch("avatar");
  const coverImageValue = watch("coverImage");

  useEffect(() => {
    previewImage(avatarValue, setHasAvatarImage);
    previewImage(coverImageValue, setCoverImage);
    // Clean up the object URL to avoid memory leaks
    return () => {
      cleanupImage(hasAvatarImage);
      cleanupImage(hasCoverImage);
    };
  }, [avatarValue, coverImageValue]);

  const handleUpdateUserProfileForm = async (data) => {
    setIsLoadingUpdateProfile(true);
    const profileData = {
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio,
      countryCode: data.countryCode,
      dob: data.dob,
      location: data.location,
      phoneNumber: data.phoneNumber,
    };

    const avatarFormData = new FormData();
    avatarFormData.append("avatar", data.avatar[0]);

    const coverImageFormData = new FormData();
    coverImageFormData.append("coverImage", data.coverImage[0]);

    try {
      // Update profile, avatar, and cover image in parallel
      const [profileApiResponse, avatarApiResponse, coverImageApiResponse] = await Promise.all([
        _patch("social-media/profile", profileData),
        _patch("users/avatar", avatarFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        _patch("social-media/profile/cover-image", coverImageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      ]);

      // Check responses for each request
      if (
        profileApiResponse?.status === 200 &&
        avatarApiResponse?.status === 200 &&
        coverImageApiResponse?.status === 200
      ) {
        showToast(profileApiResponse.data.message, "success");
        reset();
        navigate("/profile");
      } else {
        // Handle different possible errors
        if (profileApiResponse?.status !== 200) {
          showToast(profileApiResponse.data.message, "error");
        }
        if (avatarApiResponse?.status !== 200) {
          showToast(avatarApiResponse.data.message, "error");
        }
        if (coverImageApiResponse?.status !== 200) {
          showToast(coverImageApiResponse.data.message, "error");
        }
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
      setIsLoadingUpdateProfile(false);
    }
  };

  return (
    <>
      <h5 className="mb-3">Update Complete Profile</h5>

      <form onSubmit={handleSubmit(handleUpdateUserProfileForm)}>
        <Input label="First Name" type="text" {...register("firstName")} />
        <Input label="Last Name" type="text" {...register("lastName")} />
        <Textarea label="Bio" {...register("bio")} />
        <Dropdown options={dropdownValuesForCountryCodes} label="Country Code" {...register("countryCode")} />
        <Input label="DOB" type="date" {...register("dob")} />
        <Input label="Location" type="text" {...register("location")} />
        <Input label="Phone Number" type="number" {...register("phoneNumber")} />

        <Input label="Avatar" type="file" {...register("avatar")} />
        {hasAvatarImage && (
          <>
            <img src={hasAvatarImage} alt="" className="img-thumbnail img-fluid preview-img mb-3" />
          </>
        )}

        <Input label="Cover Image" type="file" {...register("coverImage")} />
        {hasCoverImage && (
          <>
            <img src={hasCoverImage} alt="" className="img-thumbnail img-fluid preview-img mb-3" /> <br />
          </>
        )}

        <Button type="submit" className="btn-primary">
          {isLoadingUpdateProfile ? <Loading /> : "submit"}
        </Button>
      </form>
    </>
  );
}
