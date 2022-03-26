import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const Friend = ({
  data: { id, name, isFav },
  handleDelete,
  handleFavorite,
}) => {
  return (
    <div className="friendWrapper">
      <div className="friendDetails">
        <div className="name" title={name}>
          {name}
        </div>
        <div className="text">is Your Friend</div>
      </div>
      <div className="actions">
        <div className="favorite icon" onClick={handleFavorite.bind(null, id)}>
          {isFav ? <AiFillStar /> : <AiOutlineStar />}
        </div>
        <div className="delete icon" onClick={handleDelete.bind(null, id)}>
          <RiDeleteBinLine />
        </div>
      </div>
    </div>
  );
};

export default Friend;
