import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { friends, PAGE_OFFSET } from "./constants/friends";
import Pagination from "./components/Pagination";
import FriendsList from "./components/FriendsList";
import { cloneDeep, get, sortBy } from "lodash";
import { createFriend } from "./utils/globalUtils";

function App() {
  const [friendsList, setFriendsList] = useState(friends);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [isSortByFav, setIsSortByFav] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!/^[a-zA-Z ]*$/.test(searchTerm)) {
        setError("Please enter a valid name!");
        return;
      }
      const findIndex = friendsList.findIndex(
        (i) => get(i, "name", "") == searchTerm
      );
      if (findIndex > -1)
        // name is present
        setError("Name is already present!");
      else {
        const friend = createFriend(searchTerm);
        setFriendsList((list) => [...list, friend]);
        setSearchTerm("");
      }
    }
  };
  const handleFavorite = useCallback((id) => {
    setFriendsList((list) =>
      list.map((i) => {
        if (get(i, "id", "") == id)
          return {
            ...i,
            isFav: !i.isFav,
          };
        else return i;
      })
    );
  }, []);
  const handleDelete = useCallback((id) => {
    setFriendsList((list) => list.filter((i) => get(i, "id", "") != id));
    setCurrentPage(1);
  }, []);
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * PAGE_OFFSET;
    const endIndex = startIndex + PAGE_OFFSET;
    return data.slice(startIndex, endIndex);
  };
  useEffect(() => {
    error && setError(false);
  }, [searchTerm]);
  let filteredData =
    searchTerm != ""
      ? cloneDeep(friendsList).filter((friend) =>
          get(friend, "name", "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : cloneDeep(friendsList);
  if (isSortByFav) filteredData = sortBy(filteredData, (item) => !item.isFav);

  const finalData = getPaginatedData(filteredData);
  const paginationDataLength =
    searchTerm != "" ? filteredData.length : friendsList.length;
  const showPagination = paginationDataLength >= PAGE_OFFSET;
  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">Friend's List</div>
        <div className="searchBox">
          <Input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder={"Enter a friend's name"}
            onKeyPress={handleKeyPress}
            error={error}
          />
          <div
            className="sortBy"
            onClick={() => {
              setIsSortByFav(!isSortByFav);
              setCurrentPage(1);
            }}
          >
            {isSortByFav ? (
              <AiFillStar size={20} />
            ) : (
              <AiOutlineStar size={20} />
            )}
          </div>
        </div>
        <div
          className={`listWrapper ${showPagination ? "" : "increaseHeight"}`}
        >
          {finalData.length > 0 ? (
            <FriendsList
              data={finalData}
              handleDelete={handleDelete}
              handleFavorite={handleFavorite}
            />
          ) : (
            <div className="note">Press enter to add it in your list!</div>
          )}
        </div>
        {showPagination && (
          <Pagination
            currentPage={currentPage}
            totalCount={paginationDataLength}
            pageSize={PAGE_OFFSET}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
