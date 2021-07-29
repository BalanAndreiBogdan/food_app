import React,{useEffect, useState} from "react"
import './App.css';
import Recipe from './Recipe'

const App = () => {

  const APP_ID = "98b05659"
  const APP_KEY = "841dd65ffe7d6aa82433cb399d8f3b2a"

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(()=>{
    getRecipes()
  }, [query]) 

  const getRecipes = async() => {
    const response = await fetch(`http://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
  }

  const updateSearch = e =>{
    setSearch(e.target.value)
  }

  const getSearch = e =>{
    e.preventDefault()
    setQuery(search)
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input onChange={updateSearch} className="search-bar" value={search}/>
        <button className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => {
          return(<Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />)
        })}
      </div>
    </div>
  );
}

export default App;
