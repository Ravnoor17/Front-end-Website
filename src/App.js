import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Core/Home";
import ContactUs from "./Core/ContactUs";
import Categroies from "./Core/Categories";
import SingleCategory from "./Core/SingleCategoryPackages";
import PrivateRoute from "./Admin/PrivateRoute";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AllPackages from "./Admin/AllPacakges";
import AddPackage from "./Admin/AddPackage";
import AllEnquiries from "./Admin/AllEnquiries";
import CustomPackageRequests from "./Admin/CustomPackage";
import CustomPackage from "./Core/CustomPackage";
import ContactRequests from "./Admin/ContactRequests";
import GetInTouch from "./Admin/GetInTouch";
import EditUser from "./Auth/editUserDetails";
import Bookings from "./Components/Bookings";


import PackageGalleryImages from "./Admin/PackageGalleryImages";
import EditPackage from "./Admin/EditPackage";
import DateUpload from "./Admin/dateUpload";
import EditDate from "./Admin/editDate";

import SinglePackageDashboard from "./Admin/SinglePackageDashboard";
import UpdateGalleryImages from "./Admin/UpdateGalleryImages";
import UserDashboard from "./Core/UserDashboard";

//User Auth Pages
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import UserRegistration from "./Auth/UserRegistration";
import SinglePackageReviews from "./Admin/SinglePackageReviews";
import LoadingScreen from "./Components/LoadingScreen";

//DiffSinglePackageScreens
import Rock from "./Components/SinglePackagesdiff/Rockclimb";
import Skiing from "./Components/SinglePackagesdiff/Sking";
import Raft from "./Components/SinglePackagesdiff/Rafting";
import Camping from "./Components/SinglePackagesdiff/Camping";
import Snowboarding from "./Components/SinglePackagesdiff/Snowboarding";
import Cycling from "./Components/SinglePackagesdiff/Cycling";
import Biking from "./Components/SinglePackagesdiff/Biking";
import Expedition from "./Components/SinglePackagesdiff/Expedition";
import Spiritualtour from "./Components/SinglePackagesdiff/Spiritualtour";
import Trekking from "./Components/SinglePackagesdiff/Trekking";
import AllBookings from "./Admin/AllBookings";

import { AuthContextProvider } from "./utils/auth-hook";
import MyDocument from "./Components/PDF/Pdf";
import ResultPage from "./Core/ResultPage";

function App() {
  return (
    <div className="App" style={{ width: "100%", overflowX: "hidden" }}>
      <Router>
        <AuthContextProvider>
          <Switch>
            {/* Normal Routes */}
            <Route path="/" exact component={Home} />
            <Route path="/contactus" exact component={ContactUs} />
            <Route path="/categories" exact component={Categroies} />
            <Route path="/search/:destination/:duration/:budget" exact component={ResultPage} />
            
            <Route path="/custompackage" exact component={CustomPackage} />
            <Route path="/pdf/:bookingId" exact component={MyDocument} />
            <Route
              path="/categories/:categoryName"
              exact
              component={SingleCategory}
            />
            <Route path="/bookings/:userId" exact component={Bookings} />
            <Route
              path="/packages/Cycling/:packageId"
              exact
              component={Cycling}
            />
            <Route
              path="/packages/Bike Trips/:packageId"
              exact
              component={Biking}
            />
            <Route
              path="/packages/Spiritual Tours/:packageId"
              exact
              component={Spiritualtour}
            />
            <Route
              path="/packages/Expedition/:packageId"
              exact
              component={Expedition}
            />
            <Route
              path="/packages/Trekking/:packageId"
              exact
              component={Trekking}
            />
            <Route path="/packages/Rafting/:packageId" exact component={Raft} />
            <Route
              path="/packages/Camping/:packageId"
              exact
              component={Camping}
            />
            <Route
              path="/packages/Snowboarding/:packageId"
              exact
              component={Snowboarding}
            />
            <Route
              path="/packages/Skiing/:packageId"
              exact
              component={Skiing}
            />
            <Route
              path="/packages/Rock Climbing/:packageId"
              exact
              component={Rock}
            />
            {/* Admin Routes */}
            <Route path="/admin/login" exact component={AdminLogin} />
            <Route path="/signin" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/user/register" exact component={UserRegistration} />
            <Route path="/userDashboard" exact component={UserDashboard} />
            <Route path="/edituserdetails" exact component={EditUser} />
            <Route path="/loading" exact component={LoadingScreen} />
            <PrivateRoute
              path="/admin/dashboard"
              exact
              component={AdminDashboard}
            />
            <PrivateRoute
              path="/single/:packageType/:packageId"
              exact
              component={SinglePackageDashboard}
            />
            <PrivateRoute
              path="/admin/package/:packageType/:packageId/date"
              exact
              component={DateUpload}
            />
            <PrivateRoute
              path="/admin/allbookings"
              exact
              component={AllBookings}
            />
            <PrivateRoute
              path="/admin/package/:packageType/:packageId/editdate"
              exact
              component={EditDate}
            />
            <PrivateRoute
              path="/admin/allpackages"
              exact
              component={AllPackages}
            />
            <PrivateRoute
              path="/admin/addpackage"
              exact
              component={AddPackage}
            />
            <PrivateRoute
              path="/admin/customrequests"
              exact
              component={CustomPackageRequests}
            />
            <PrivateRoute
              path="/admin/allenquiries"
              exact
              component={AllEnquiries}
            />
            <PrivateRoute
              path="/admin/contactrequests"
              exact
              component={ContactRequests}
            />
            <PrivateRoute
              path="/admin/getintouch"
              exact
              component={GetInTouch}
            />
            <PrivateRoute
              path="/admin/allbookings"
              exact
              component={AllBookings}
            />
            <PrivateRoute
              path="/admin/package/:packageType/:packageId"
              exact
              component={PackageGalleryImages}
            />
            <PrivateRoute
              path="/admin/editpackage/:packageType/:packageId"
              exact
              component={EditPackage}
            />
            <PrivateRoute
              path="/admin/editpackage/updategallery/:packageType/:packageId"
              exact
              component={UpdateGalleryImages}
            />
            <PrivateRoute
              path="/admin/package/reviews/:packageType/:packageId"
              exact
              component={SinglePackageReviews}
            />
          </Switch>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
