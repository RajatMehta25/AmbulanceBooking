import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";



// Dashboard
import Dashboard from "../pages/Dashboard/index";
import UserManagement from "../pages/UserManagement/UserManagement";
import AccountManagement from "../pages/AccountManagement/Account_Management";
import AccountDetails from "../pages/AccountManagement/Account_Details";
import changePassword from "../pages/Authentication/changePasword";
import AddEditUser from "../pages/UserManagement/AddEditUser";
import JobManagement from "../pages/JobManagement/JobManagement";
import AddEditJob from "../pages/JobManagement/AddEditJob";
import ViewInspectionForm from "../pages/UserManagement/ViewInspectionForm";
import Form2 from "../pages/JobManagement/Form2";
import Form3 from "../pages/JobManagement/Form3";
import Form4 from "../pages/JobManagement/Form4";
import Form5 from "../pages/JobManagement/Form5";
import Notification_Management from "../pages/Notification_Management/Notification_Management";
import Content_Management from "../pages/Content_Management/Content_Management";
import C2 from "../pages/JobManagement/C2";
import C3 from "../pages/JobManagement/C3";
import C4 from "../pages/JobManagement/C4";
import C5 from "../pages/JobManagement/C5";
import V1 from '../pages/JobManagement/V1'

const adminToken = Cookies.get("admin_access_token");


const authProtectedRoutes = [
  { path: "/adminPanel/dashboard", component: Dashboard },

  //new routes
  { path: "/adminPanel/user-management", component: UserManagement },
  { path: "/adminPanel/account-management", component: AccountManagement },
  { path: "/adminPanel/account-details", component: AccountDetails },
  { path: "/adminPanel/changePassword", component: changePassword },
  { path: "/adminPanel/AddEditUser", component: AddEditUser },
  { path: "/adminPanel/job-management", component: JobManagement },
  { path: "/adminPanel/AddEditJob", component: AddEditJob },
  { path: "/adminPanel/ViewInspectionForm", component: ViewInspectionForm },
  { path: "/adminPanel/Form2", component: Form2 },
  { path: "/adminPanel/Form3", component: Form3 },
  { path: "/adminPanel/Form4", component: Form4 },
  { path: "/adminPanel/Form5", component: Form5 },
  {
    path: "/adminPanel/Notification_Management",
    component: Notification_Management,
  },
  { path: "/adminPanel/Content_Management", component: Content_Management },

{path:"/adminPanel/V1",component:V1},
  { path: "/adminPanel/C2", component: C2 },
  { path: "/adminPanel/C3", component: C3 },
  { path: "/adminPanel/C4", component: C4 },
  { path: "/adminPanel/C5", component: C5 },

  { path: "*", component: Dashboard },
  // {
  //   path: "/",
  //   exact: true,
  //   component: () =>
  //     adminToken && adminToken !== "" ? (
  //       <Redirect to="/adminPanel/dashboard" />
  //     ) : (
  //       <Redirect to="/adminPanel/login" />
  //     ),
  // },
];



const publicRoutes = [
	{ path: "/adminPanel/login", component: Login },
	{ path: "/adminPanel/logout", component: Logout },
	{ path: "/adminPanel/forgot-password", component: ForgetPwd },
	{ path: "/adminPanel/register", component: Register },
	{ path: "/adminPanel/auth-lock-screen", component: AuthLockScreen },
	
	
];

export { authProtectedRoutes, publicRoutes };