import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/index";
import Home from "../pages/Home/Home";
import RegisterProvider from "../pages/Register/register_provider/RegisterProvider";
import LoginProvider from "../pages/login/login_provider/LoginProvider";
import LoginUser from "../pages/login/login_user/LoginUser";
import RegisterUser from "../pages/Register/register_users/RegisterUser";
import Register from "../pages/Register/Register";
import About from "../pages/AboutUs/About";
import Login from "../pages/login/Login";
import Categories from "../components/categories/Categories";
import Provider from "../components/providers/Provider";
import Information_UserSide from "../components/information/Information_UserSide";
import MyServices from "../pages/ProviderUI/Myservices/MyServices";
import Feadback_reviwes from "../components/feedback_review/Feadback_reviwes";
import MySchedule from "../pages/ProviderUI/mySchedule/MySchedule";
import ProviderMain from "../pages/ProviderUI/providerMain/ProviderMain";
import UserProfile from "../components/UserProfile/UserProfile";
import ProviderProfile from "../pages/ProviderUI/provider_profile/ProviderProfile";
import NewOrders from "../components/orders/NewOrders";
import Note from "../pages/ProviderUI/provider_notes/Note";
import OldOrder from "../components/orders/OldOrder";
import ContactUs from "../pages/ContactUs/ContactUs";
import Map from "../components/Map/Map";
import Admin from "../components/AdminPanel/Admin";
import LoginAdmin from "../components/AdminPanel/LoginAdmin";
import AdminNavBar from "../components/AdminPanel/AdminNavBar";
import Addcategory from "../components/AdminPanel/Addcategory";
import MyOrders from "../pages/ProviderUI/my orders/MyOrders";
import ProviderAndOrder from "../components/AdminPanel/ProviderAndOrder";
import Analytics from "../components/AdminPanel/Analytics";
import PageNotFound from "../pages/not found/PageNotFound";

export const router = createBrowserRouter([
  {
    path:"*",
element:<PageNotFound/>
  },
  {
    path: "/cureApp/login",
    element: <LoginAdmin />,
  },
  {
    path: "/cureApp/admin",
    element: <Admin />,

    children: [ {path:"",element:<Analytics/>},{ path: "addCategory", element: <Addcategory /> },
    {path:"providerAndOrders",element:<ProviderAndOrder/>},
   ],
  },
  

  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "/aboutUs",
            element: <About />,
          },
        ],
      },

      {
        path: "/aboutUs",
        element: <About />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/provider",
        element: <RegisterProvider />,
      },
      {
        path: "/user",
        element: <RegisterUser />,
      },
      { path: "/login", element: <Login /> },
      { path: "/loginUser", element: <LoginUser /> },
      { path: "/loginProvider", element: <LoginProvider /> },
      ,
      { path: "/providerMain", element: <ProviderMain /> },

      { path: "/services", element: <MyServices /> },
      ,
      {
        path: "/myOrders",
        element: <MyOrders />,
      },

      { path: "/category", element: <Categories /> },
      { path: "/provider/:id", element: <Provider /> },
      {
        path: "/provider_Information/:id",
        element: <Information_UserSide />,
      },
      {
        path: "/reveiws/:id",
        element: <Feadback_reviwes />,
      },

      { path: "/mySchedule", element: <MySchedule /> },

      {
        path: "/myProfile",
        element: <UserProfile />,
      },
      { path: "/My_profile", element: <ProviderProfile /> },
      {
        path: "/orders",
        element: <NewOrders />,
      },
      { path: "/notes", element: <Note /> },

      {
        path: "/previousOrder",
        element: <OldOrder />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },

      {
        path: "/map",
        element: <Map  />,
      },
    ],
  },
]);
