import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "store/action/project";
import { Table, Progress } from "antd";

function Home() {
  const dispatch = useDispatch();
  const selector = useSelector((root) => root);

  const id = selector.Auth.user._id;
  const project = selector.project.data;

  console.log();

  const percent = (arr, sta) => {
    let count = 0;
    if (sta) {
      arr.map((item) =>
        item.status === sta ? (count = count + 1) : (count = count + 0)
      );
      count = (count / arr.length) * 100;
      return count | 0;
    } else {
      arr.map((item) =>
        item.progress === 100 ? (count = count + 1) : (count = count + 0)
      );
      count = (count / arr.length) * 100;
      return count | 0;
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Parameter",
      dataIndex: "progress",
      key: "progress",
    },
  ];

  const data = [
    {
      key: "1",
      project: "Total Project",
      progress: <div>{project.length} project</div>,
    },
    {
      key: "2",
      project: "Percent of project's activating",
      progress: (
        <>
          <Progress
            strokeColor={{
              "0%": "#00FFFF",
              "100%": "#1E90FF",
            }}
            percent={percent(project, "active")}
          />
        </>
      ),
    },
    {
      key: "3",
      project: "Percent of project has done",
      progress: (
        <>
          <Progress
            strokeColor={{
              "0%": "#00FFFF",
              "100%": "#1E90FF",
            }}
            percent={percent(project)}
          />
        </>
      ),
    },
    {
      key: "4",
      project: "Percent of excepted project",
      progress: (
        <>
          <Progress
            strokeColor={{
              "0%": "#00FFFF",
              "100%": "#1E90FF",
            }}
            percent={percent(project, "exception")}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    if (id !== null && id !== undefined && id !== "") {
      dispatch(fetchProject(id));
    }
  }, [id]);

  return (
    <div>
      <>
        <Table columns={columns} dataSource={data} pagination={false} />
      </>
    </div>
  );
}

export default Home;
