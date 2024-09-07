import { React, useState } from "react";
import "./Dashboard.css";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Sidebar from "../Sidebar";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineGames,
  MdArticle,
} from "react-icons/md";

function Dashboard() {
  const data = [
    {
      name: "Jan",
      Games: 4000,
      Articles: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      Games: 3000,
      Articles: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      Games: 2000,
      Articles: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      Games: 2780,
      Articles: 3908,
      amt: 2000,
    },
    {
      name: "May",
      Games: 1890,
      Articles: 4800,
      amt: 2181,
    },
    {
      name: "June",
      Games: 2390,
      Articles: 3800,
      amt: 2500,
    },
    {
      name: "July",
      Games: 3490,
      Articles: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      Games: 3490,
      Articles: 4300,
      amt: 2100,
    },
    {
      name: "Sept",
      Games: 3490,
      Articles: 4300,
      amt: 2100,
    },
    {
      name: "Oct",
      Games: 3490,
      Articles: 4300,
      amt: 2100,
    },
    {
      name: "Nov",
      Games: 3490,
      Articles: 4300,
      amt: 2100,
    },
    {
      name: "Dec",
      Games: 3490,
      Articles: 4300,
      amt: 2100,
    },
  ];

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  var userCount = 1000;
  var modCount = 14;
  var gameCount = 130;
  var articleCount = 163;

  return (
    <div className="grid-container">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <main className="main-container">
        <div className="main-title">
          <h3>Admin Dashboard</h3>
        </div>

        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>Games</h3>
              <MdOutlineGames className="card_icon" />
            </div>
            <h1>{gameCount}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Articles</h3>
              <MdArticle className="card_icon" />
            </div>
            <h1>{articleCount}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Users</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>{userCount}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Moderators</h3>
              <MdOutlineAdminPanelSettings className="card_icon" />
            </div>
            <h1>{modCount}</h1>
          </div>
        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Games" fill="#3a2d80" />
              <Bar dataKey="Articles" fill="#a1a662" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
