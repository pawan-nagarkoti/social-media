import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCircleXmark, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

export const LikeIcon = () => <FontAwesomeIcon icon={faHeart} style={{ color: "wheat" }} />;
export const UnlikeIcon = () => <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />;
export const BookmarkIcon = () => <FontAwesomeIcon icon={faBookmark} style={{ color: "wheat" }} />;
export const SelectectedBookmarkIcon = () => <FontAwesomeIcon icon={faBookmark} style={{ color: "black" }} />;
export const Comment = () => <FontAwesomeIcon icon={faComment} />;
export const Close = () => <FontAwesomeIcon icon={faCircleXmark} />;
