import {services} from '../variables/CustomVariables.jsx'

const AuthService = {
  getOauthToken: () => {
    window.location = `${services.security.url}/authenticate`
  },
  checkOauthRedirect: () => {
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("redirect")) {
      window.location = searchParams.get("redirect");
    }
  },
  doLogin: () => {
    localStorage.setItem("sfederella.socialMediaAggregator.isLoggedIn","true");
  },
  isLoggedIn: () => {
    return localStorage.getItem("sfederella.socialMediaAggregator.isLoggedIn") === "true";
  },
  doLogout: () => {
    localStorage.removeItem("sfederella.socialMediaAggregator.isLoggedIn")
    window.location = `${services.security.url}/unauthenticate`
  }
}

export default AuthService