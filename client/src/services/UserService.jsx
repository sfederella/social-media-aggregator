import {services} from '../variables/CustomVariables.jsx'
import AuthService from './AuthService'

const UserService = {
  getCurrentUser: (options) => {
    const {
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;
    
    UserService.onForbidden = () => {
      AuthService.doLogout();
    }

    fetch(`${services.users.url}/users/current`, {credentials: 'include'})
    .then( res => {
      if ( res.status === 200 ) {
        AuthService.doLogin();
        onSuccess(res);
      } else if ( res.status === 401 || res.status === 403 ) {
        console.log("No valid session");
        UserService.onForbidden();
      } else {
        onError(res)
      }
    });
  },

  addBoard: (options) => {
    const {
      username,
      boardname,
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.users.url}/users/${username}/boards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(boardname)
    })
    .then( res => {
      if ( res.status === 201 ) {
        onSuccess(res);
      } else if ( res.status === 401 || res.status === 403 ) {
        UserService.onForbidden();
      } else {
        onError(res)
      }
    });
  },

  deleteBoard: (options) => {
    const {
      username,
      boardname,
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.users.url}/users/${username}/boards/${boardname}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then( res => {
      if ( res.status === 200 ) {
        onSuccess(res);
      } else if ( res.status === 401 || res.status === 403 ) {
        UserService.onForbidden();
      } else {
        onError(res)
      }
    });
  },

  editBoard: (options) => {
    const {
      username,
      boardname,
      newBoardname,
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.users.url}/users/${username}/boards/${boardname}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(newBoardname)
    })
    .then( res => {
      if ( res.status === 200 ) {
        onSuccess(res);
      } else if ( res.status === 401 || res.status === 403 ) {
        UserService.onForbidden();
      } else {
        onError(res)
      }
    });
  },

  followUser: (options) => {
    const {
      username,
      boardname,
      twitterUser,
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.users.url}/users/${username}/boards/${boardname}/userfollowings`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(twitterUser)
    })
    .then( res => {
      if ( res.status === 201 ) {
        onSuccess(res);
      } else if ( res.status === 401 || res.status === 403 ) {
        UserService.onForbidden();
      } else {
        onError(res)
      }
    });
  },

  unfollowUser: (options) => {
    const {
      username,
      boardname,
      twitterUsername,
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.users.url}/users/${username}/boards/${boardname}/userfollowings/${twitterUsername}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then( res => {
      if ( res.status === 200 ) {
        onSuccess(res);
      } else if ( res.status === 401 || res.status === 403 ) {
        UserService.onForbidden();
      } else {
        onError(res)
      }
    });
  },

  followSubject: (options) => {
    const {
      username,
      boardname,
      subject,
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.users.url}/users/${username}/boards/${boardname}/subjectfollowings`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(subject)
    })
    .then( res => {
      if ( res.status === 201 ) {
        onSuccess(res);
      } else if ( res.status === 401 || res.status === 403 ) {
        UserService.onForbidden();
      } else {
        onError(res)
      }
    });
  },

  unfollowSubject: (options) => {
    const {
      username,
      boardname,
      subject,
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.users.url}/users/${username}/boards/${boardname}/subjectfollowings/${subject}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then( res => {
      if ( res.status === 200 ) {
        onSuccess(res);
      } else if ( res.status === 401 || res.status === 403 ) {
        UserService.onForbidden();
      } else {
        onError(res)
      }
    });
  },

  searchTwitterUsers: (options) => {
    const {
      query = "a",
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.users.url}/twitterusers?query=${query}`, {credentials: 'include'})
    .then( res => {
      if ( res.status === 200 ) {
        onSuccess(res);
      } else {
        onError(res)
      }
    });
  }
}

export default UserService;