// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// const cookieAuth = {
//   setAccessTokenToCookie(access_token) {
//     cookies.set("access_token", access_token, { sameSite: "strict" });
//   },
//   logout() {
//     console.log("localstorage set logout ~!");
//     cookies.remove("access_token");
//   },
//   getAccessToken() {
//     const access_token = cookies.get("access_token");
//     if (access_token) {
//       return access_token;
//     } else {
//       return undefined;
//     }
//   },
// };

const localStorageAuth = {
  setTokenToLocalstorage(access_token) {
    localStorage.setItem("Auth", access_token);
  },
  logout() {
    localStorage.removeItem("Auth");
    console.log(localStorage.getItem("Auth"));
    localStorage.clear();
  },
  getAccessToken() {
    return localStorage.getItem("Auth");
  },
};

export default localStorageAuth;
