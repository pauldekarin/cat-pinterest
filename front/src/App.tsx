import './App.css'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/Home/Home'
import FavouritePage from './pages/Favourites/Favourite'
import { Route,Routes } from 'react-router-dom'
import { FavouriteProvider } from './context/FavouritesContext'
import { LoadedProvider } from './context/LoadedContext'


function App() {
  return (
    <>
      <FavouriteProvider>
        <Navbar></Navbar>
        <div className='container'>
          <LoadedProvider>
            <Routes>
                <Route path='/' element = {<HomePage/>}/>
                <Route path='/favourites' element={<FavouritePage/>}/>
            </Routes>
          </LoadedProvider>
        </div>
      </FavouriteProvider>
    </>
  )
}

export default App
