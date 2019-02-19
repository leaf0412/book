let apiUrl = "";
let pathname = "";
// 开发环境
if (process.env.NODE_ENV === "development") {
  apiUrl = `http://localhost:9090${pathname}`;
} else {
  pathname = "/api";
  apiUrl = `http://book.bylove.vip${pathname}`;
}
export default {
  apiUrl
};
