import React, { Suspense, lazy } from "react";
import classes from "./Dashboard.module.css";
import TwoColUI from "../../components/UI/Structure/TwoColUI";
import { IoCreateOutline } from "react-icons/io5";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiNews } from "react-icons/bi";
import { TiContacts } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { essentialAction } from "../../store/slice/essential";
import { AuthActions } from "../../store/slice/auth";

import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";

// Helper Component
const BlogCreate = lazy(() => import("./Helper/BlogCreate"));
const AuthorCreate = lazy(() => import("./Helper/AuthorCreate"));
const CategoryCreate = lazy(() => import("./Helper/CategoryCreate"));
const Newsletter = lazy(() => import("./Helper/Newsletter"));
const Contact = lazy(() => import("./Helper/Contact"));

const controller = [
  {
    icon: IoCreateOutline,
    heading: "Create Blog",
    link: "blog/new",
    component: BlogCreate,
  },
  {
    icon: BsFillPersonPlusFill,
    heading: "Create Author",
    link: "author/new",
    component: AuthorCreate,
  },
  {
    icon: AiOutlineAppstoreAdd,
    heading: "Create Category",
    link: "category/new",
    component: CategoryCreate,
  },
  {
    icon: BiNews,
    heading: "Newsletter",
    link: "newsletter",
    component: Newsletter,
  },
  {
    icon: TiContacts,
    heading: "Contact Response",
    component: Contact,
    link: "contact/data",
  },
];

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    dispatch(essentialAction.toggleSpinner());
    dispatch(AuthActions.logout());
    dispatch(essentialAction.toggleSpinner());
  };
  const { url } = useRouteMatch();
  return (
    <TwoColUI className={classes.main}>
      <div className={classes.controller}>
        {controller.map((item, index) => {
          return (
            <div className={classes.controlGrp} key={index}>
              <Link to={`${url}/${item.link}`}>
                <div className={classes.icon}>
                  <item.icon />
                </div>
              </Link>
              <h2>{item.heading}</h2>
            </div>
          );
        })}
        <div onClick={logoutHandler} className={classes.controlGrp}>
          <div className={classes.icon} onClick={logoutHandler}>
            <RiLogoutCircleRLine />
          </div>
          <h2>Logout</h2>
        </div>
      </div>
      <div className={classes.box}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {controller.map((item, index) => {
              return (
                <Route key={index} path={`${url}/${item.link}`} exact>
                  <h2 className={classes.mainHead}>{item.heading}</h2>
                  <div className={classes.line}></div>
                  <item.component />
                </Route>
              );
            })}
          </Switch>
        </Suspense>
      </div>
    </TwoColUI>
  );
};

export default Dashboard;
