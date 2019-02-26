let apiUrl = "";
let pathname = "";
// 开发环境
if (process.env.NODE_ENV === "development") {
  // pathname = "/api";
  apiUrl = `http://localhost:9090${pathname}`;
  // apiUrl = `http://book.bylove.vip${pathname}`;
} else {
  pathname = "/api";
  apiUrl = `http://book.bylove.vip${pathname}`;
}
export default {
  apiUrl
};
