let pathname = '/api';
let apiUrl = '';
// 开发环境
if (process.env.NODE_ENV === 'development') {
  apiUrl = `http://localhost:9090${pathname}`
} else {
  apiUrl = `http://book.bylove.vip${pathname}`
}
export default {
  apiUrl
};
