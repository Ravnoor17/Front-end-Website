import { reactLocalStorage } from "reactjs-localstorage";

function isAuth() {
  const admin = reactLocalStorage.getObject("pacauli-admin");
  if (admin.role === "admin") {
    return true;
  } else {
    return false;
  }
}

export default isAuth;
