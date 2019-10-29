// AXIOS GLOBE
axios.defaults.headers.common["X-Auth-Token"] = "someToken";

//
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request send to ${
        config.url
      } at ${new Date().toLocaleTimeString()}`
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// axios 实例
// axios Instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/"
});
axiosInstance
  .get("/comments?_limit=3")
  .then(res => showOutput(res))
  .catch(err => console.log(err));

function showOutput(res) {
  console.log(res);
  document.getElementById("res").innerHTML = `
  <div class="card mt-3">
  <div class="card-body">
    status: ${res.status}
  </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">Headers</div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">data</div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">config</div>
    <div class="card-body">
    <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>`;
}

function getTodos() {
  // axios({
  //   method: "GET",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   params: {
  //     _limit: 5
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.log(err));
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {
      timeout: 3000
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}
function addTodos() {
  console.log("addTodos");
  axios({
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "New Todo",
      completed: true
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}
function updateTodos() {
  console.log("updateTodos");
  axios({
    // method: "put",
    method: "patch",
    url: "https://jsonplaceholder.typicode.com/todos/1",
    data: {
      title: "Update Todo",
      completed: true
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}
function deleteTodos() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

function simRequest() {
  console.log("simRequest");
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts")
    ])
    .then(
      //   res => {
      //   console.log(res[0]), console.log(res[1]), showOutput(res[1]);
      // }
      axios.spread((todos, posts) => {
        showOutput(posts);
      })
    );
}
// 自定义请求头
function costomHeader() {
  console.log("costomHeader");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "sometoken"
    }
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "new Todo",
        completed: false
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

function transformResponse() {
  console.log("transform");
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World"
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      console.log(data);
      data.title = data.title.toUpperCase();
      return data;
    })
  };
  axios(options)
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}
// 处理请求错误
function errorHandle() {
  console.log("errorHandle");
  axios
    .get("https://jsonplaceholder.typicode.com/todoso", {
      validateStatus: status => {
        // reject only if status is greater or equal to 500
        return status < 500;
      }
    })
    .then(res => {
      showOutput(res);
    })
    .catch(err => {
      console.log(err);
      if (err.response) {
        console.log(err.response.data);
        if (err.response.status === 404) {
          alert("Error: Page Not Found");
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// 取消请求
// Cancel TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=3", {
      cancelToken: source.token
    })
    .then(res => {
      showOutput(res);
    })
    .catch(err => {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      }
    });
  if (true) {
    source.cancel("Request canceled!");
  }
}

document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodos);
document.getElementById("update").addEventListener("click", updateTodos);
document.getElementById("delete").addEventListener("click", deleteTodos);
document.getElementById("sim").addEventListener("click", simRequest);
document.getElementById("costomHeader").addEventListener("click", costomHeader);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandle);
document.getElementById("cancel").addEventListener("click", cancelToken);
