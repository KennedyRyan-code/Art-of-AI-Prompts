'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feeds = () => {
  const [searchText, setSearchText] = useState(''); // state to store the search text
  const [posts, setPosts] = useState([]); // state to store the posts


  // fetch data from the server
  const fetchPosts = async () => {
    const res = await fetch('/api/prompt');
    const data = await res.json();

    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="w-full border-2 font-satoshi text-gray-800 border-gray-200 rounded-lg p-2 peer focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
        />
        <button
          type="submit"
          onClick={handleSearchChange}
          className="absolute top-1 right-1 bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          Find
        </button>

      </form>
      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}

      />
    </section>
  )
}

export default Feeds