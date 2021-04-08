const courses_url = "http://127.0.0.1:8000/api/personal/courses/";
const my_courses_url = "http://127.0.0.1:8000/api/personal/allowed-courses/";
const info_url = "http://127.0.0.1:8000/api/account/info/";

function sendRequest(method, request_url, body = null, header) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, request_url);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", "application/json");
    if (localStorage.getItem("token")) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("token")
      );
    }
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => reject(xhr.response);
    xhr.send(JSON.stringify(body));
  });
}
sendRequest("GET", courses_url)
  .then((data) =>
    data.map(
      (d) =>
        (document.getElementById("Courses").innerHTML +=
          ' <a class="all_courses" href="CourseDetail.html">\n' +
          "              <h3>" +
          d.title +
          "</h3>\n" +
          "              <h5>" +
          d.date_of_creation +
          "</h5>\n" +
          "              <hr />\n" +
          "              <p>" +
          d.description +
          "</p>\n" +
          "            </a>")
    )
  )
  .catch((err) => console.log(err));
if (localStorage.getItem("token")) {
  sendRequest("GET", my_courses_url)
    .then((data) =>
      data.map(
        (d) =>
          (document.getElementById("Course").innerHTML +=
            '<a href="MyCourseDetail.html">\n' +
            '                <div class="my_course">' +
            d.title +
            "</div>\n" +
            "              </a>")
      )
    )
    .catch((err) => console.log(err));
} else {
  document.getElementById("Course").innerHTML =
    "<h3>Log in to see your courses</h3>";
}

if (localStorage.getItem("token")) {
  sendRequest("GET", info_url)
    .then(
      (data) =>
        (document.getElementById("header_user").innerHTML =
          "Hi, " +
          data.username +
          "<button\n" +
          "          onclick=\"localStorage.setItem('token', ''), window.location = '/home.html'\"\n" +
          "        >\n" +
          "          Logout\n" +
          "        </button>")
    )
    .catch((err) => console.log(err));
} else {
  document.getElementById("header_user").innerHTML =
    '<a href="Login.html">Login</a>';
}

