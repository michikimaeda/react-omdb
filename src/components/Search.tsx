import React, { useState } from 'react';

type SearchProps = {
  search: (searchValue: string) => void;
};
const Search: React.FC<SearchProps> = ({ search }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const handleSearchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };
  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  return (
    <form className="search" onSubmit={callSearchFunction}>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChanges}
      />
      <input type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
