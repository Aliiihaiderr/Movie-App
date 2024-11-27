import React from "react";
import { BrowserRouter, Route, Routes, Navigate , redirect } from 'react-router-dom';
import LoginForm from "./Login/Login.jsx";
import Movie from './Movie/Movie.jsx';
import { useRecoilValue , useSetRecoilState } from 'recoil';
import { userAtom } from './Login/atoms.jsx';
import userAuthPersist from "./persist.jsx";
import MovieDetail from "./Movie/Movie-Details/MovieDetails.jsx";
function App() {
  const auth = userAuthPersist();
  const setAuth = useSetRecoilState(userAtom)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            auth ? (
              <Navigate replace to="/Home" />
            ) : (
              <LoginForm />
            )
          }
        />
        <Route
          path="/Home"
          element={
            auth ? (
              <Movie />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/Home/Movie"
          element={
            auth ? (
              <MovieDetail />
            ) : (
              <Navigate replace to="/Home" />
            )
          }
        />
        <Route
          path="*"
          element={
            <Navigate replace to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App