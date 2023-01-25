import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  Search,
  SearchOutlined,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";

const Header = () => {
  return (
    <div className="header">
      {[
        { icon: HomeOutlined, iconSelected: Home, adress: "/home" },
        { icon: AddOutlined, iconSelected: Add, adress: "/addPost" },
        { icon: SearchOutlined, iconSelected: Search, adress: "/search" },
        {
          icon: AccountCircleOutlined,
          iconSelected: AccountCircle,
          adress: "/account",
        },
      ].map((item) => {
        return <Link to={item.adress}>
          {item.icon}
        </Link>;
      })}
    </div>
  );
};

export default Header;
