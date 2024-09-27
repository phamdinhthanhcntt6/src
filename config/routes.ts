export default [
  {
    path: '/user',
    component: "../layouts/AuthenLayout",
    routes: [
      {
        name: "login",
        path: "/user/login",
        component: "./Login",
      },
      {
        path: "*",
        redirect: '/user/login'
      },
    ],
  },
  {
    component: "../layouts/SecurityLayout",
    routes: [
      {
        component: "../layouts/BasicLayout",
        routes: [
          {
            path: "/",
            name: "dashboard",
            icon: "DashboardOutlined",
            component: "./Dashboard",
          },
          {
            path: "/news",
            name: "news",
            icon: "FormOutlined",
            component: "./News",
          },
          {
            path: "/news/create",
            name: "news.create",
            component: "./News/DetailPage",
            hideInMenu: true
          },
          {
            path: "/news/edit/:id",
            name: "news.edit",
            component: "./News/DetailPage",
            hideInMenu: true
          },
        ],
      },
    ],
  },
];
