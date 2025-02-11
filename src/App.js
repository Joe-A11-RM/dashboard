/* eslint-disable no-unused-vars */
import "./App.css";
import { useState } from "react";

import Header from "./Components/Header/Header";
import DashBoardMenu from "./Components/DashBoardMenu/DashBoardMenu";
import WidgetSettings from "./Components/WidgetSettings/WidgetSettings";
import Grid from "./Components/Grid/Grid";

function App() {
  let [data, setData] = useState([
    {
      id: 1,
      chartType: "LabelChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Revenue Growth",
      },
    },
    {
      id: 2,
      chartType: "LabelChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#F87171",
        number: Math.floor(Math.random() * 100),
        title: "Customer Satisfaction",
      },
    },
    {
      id: 3,
      chartType: "LabelChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#34D399",
        number: Math.floor(Math.random() * 100),
        title: "New Sign-Ups",
      },
    },
    {
      id: 4,
      chartType: "LabelChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#F59E0B",
        number: Math.floor(Math.random() * 100),
        title: "Total Website Visits",
      },
    },
    {
      id: 5,
      chartType: "PieChart",
      style: "col-lg-3",
      ChartData: {
        labels: ["Ahmed", "Mohamed", "Adham", "Foaad", "Shady"],
        data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Emplpyees Performance",
      },
    },
    {
      id: 6,
      chartType: "LineChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#9333EA",
        number: Math.floor(Math.random() * 100),
        title: "Profit Margin",
      },
    },
    {
      id: 7,
      chartType: "LineChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#F43F5E",
        number: Math.floor(Math.random() * 100),
        title: "Customer Retention",
      },
    },
    {
      id: 8,
      chartType: "LineChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#10B981",
        number: Math.floor(Math.random() * 100),
        title: "Marketing Spend",
      },
    },
  ]);
  const [mainData, setMainData] = useState([
    {
      id: 1,
      chartType: "LabelChart",
      style: "col-lg-3",
      img: "labelchart.png",
      type: "template",
    },
    {
      id: 2,
      chartType: "LineChart",
      style: "col-lg-3",
      img: "labelchart.png",
      type: "template",
    },
    {
      id: 3,
      chartType: "BarChart",
      style: "col-lg-3",
      img: "labelchart.png",
      type: "template",
    },
    {
      id: 4,
      chartType: "PieChart",
      style: "col-lg-3",
      img: "labelchart.png",
      type: "template",
    },
    {
      id: 5,
      chartType: "LabelChart",
      style: "col-lg-3",
      img: "chart.svg",
      type: "custom",
    },
    {
      id: 6,
      chartType: "LineChart",
      style: "col-lg-3",
      img: "chart.svg",
      type: "custom",
    },
    {
      id: 7,
      chartType: "BarChart",
      style: "col-lg-3",
      img: "chart.svg",
      type: "custom",
    },
    {
      id: 8,
      chartType: "PieChart",
      style: "col-lg-3",
      img: "chart.svg",
      type: "custom",
    },
  ]); //Side Menu Chart types
  const [widgetSettings, setWidgetSettings] = useState(false);
  const [choice, setChoice] = useState("ready");

  return (
    <div className="App container-fluid">
      <Header
        title={"Dynamic Dashboard"}
        subTitle={"Create Your customied dashboard now"}
      >
        <DashBoardMenu
          mainData={mainData}
          choice={choice}
          setChoice={setChoice}
        />
      </Header>

      <WidgetSettings
        show={widgetSettings}
        onHide={() => setWidgetSettings(false)}
      />
      <Grid />
    </div>
  );
}

export default App;
