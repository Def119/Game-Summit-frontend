import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import Gamespage from "./components/pages/Gamespage";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/signup";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AboutUs from "./components/pages/About";
import Contact from "./components/pages/Contact";
// import Signup from "./components/pages/Signup";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ligtPatt from "./assets/patt2.jpg"; // Adjust the path as necessary
import darkPatt from "./assets/patt.jpg"; // Adjust the path as necessary
import Dashboard from "./components/pages/Dashboard";
import ModeratorList from "./components/pages/ModeratorList";
import Game from "./components/pages/Game";
import AddGameForm from "./components/pages/AddGames";
import AddArticle from "./components/pages/AddArticle";
import ArticlesPage from "./components/pages/ArticlesPage";
import ReviewList from "./components/pages/ReviewList";
import ReviewForm from "./components/pages/AddReview";
// import ManageGames from "./components/pages/ManageGames";
import ManGame from "./components/pages/ManGames";


function App() {
  const theme = useTheme();
  const backgroundImage = theme.palette.mode === "light" ? ligtPatt : darkPatt;

  return (
    <Router>
      <Box
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          color: theme.palette.text.primary,
        }}
      >
        <ConditionalLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/*" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/moderators" element={<ModeratorList />} />
            <Route path="/games" element={<Gamespage />} />
            <Route path="/games/:id" element={<Game />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dash-board" element={<Dashboard />} />

            <Route path="/addgames" element={<AddGameForm />} />
            {/* <Route path="/games/manage-games" element={<ManageGames />} /> */}
            <Route path="/games/manage-games" element={<ManGame />} />

            <Route path="/add-articles" element={<AddArticle />} />
            <Route path="/articles" element={<ArticlesPage/>} /> {/* add manage game page */}

            {/* <Route path="/sign-up" element={<Signup />} /> */}

          {/* REVIEWS */}
            {/* <Route path="/review" element={<Review />} /> */}
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/add-review/:id" element ={<ReviewForm/>}/>

          </Routes>
        </ConditionalLayout>
      </Box>
    </Router>
  );
}

function ConditionalLayout({ children }) {
  const location = useLocation();
  const hideLayoutRoutes = ["/admin", "/moderators"]; // Add routes where you want to hide both Navbar and Footer

  return (
    <>
      {!hideLayoutRoutes.includes(location.pathname) && <Navbar />}
      {children}
      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
