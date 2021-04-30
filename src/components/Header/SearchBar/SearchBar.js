import { Search, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { size } from "lodash";
import imageNotFound from "./../../../assets/img/avatar.png";

import "./Search.scss";
import { SEARCH } from "../../../graphql/user";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { loading, data } = useQuery(SEARCH, {
    variables: {
      search,
    },
  });

  const handleResultClick = () => {
    setSearch(null);
    setResults([]);
  };

  useEffect(() => {
    if (size(data?.search)) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  return (
    <Search
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      onSearchChange={(e) => {
        if (e.target.value) setSearch(e.target.value);
      }}
      loading={loading}
      value={search || ""}
      results={results}
      resultRenderer={(e) => <ResultSearch data={e} />}
      onResultSelect={handleResultClick}
    ></Search>
  );
};

export default SearchBar;

function ResultSearch({ data }) {
  return (
    <Link className="search-users-item" to={`/${data.username}`}>
      <Image src={data.avatar || imageNotFound} />
      <div>
        <p>{data.title}</p>
        <p>{data.username}</p>
      </div>
    </Link>
  );
}
