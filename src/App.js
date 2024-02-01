import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./Mediaqueries.css"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRoute from "./components/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Myprofile from "./components/Myprofile";
import Mylistings from "./components/Mylistings";
import ListProperty from "./components/ListProperty";
import Settings from "./components/Settings";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import Properties from "./pages/Properties";
import DetailProperty from "./pages/DetailProperty";
import Plan from "./pages/Plan";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        ></Route>
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<Myprofile />} />

          <Route path="/dashboard/my-listings" element={<Mylistings />} />

          <Route path="/dashboard/add-listings" element={<ListProperty />} />

          <Route path="/dashboard/settings" element={<Settings />} />

          <Route path="/dashboard/edit" element={<EditProfile />} />

          <Route path="/dashboard/change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:propertyId" element={<DetailProperty /> } /> 
        <Route path="/plan" element={<Plan />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
