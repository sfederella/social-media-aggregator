import {services} from '../variables/CustomVariables.jsx'

const PostService = {
  getPosts: (options) => {
    const {
      search,
      onSuccess = res => {},
      onError = res => {console.error(res);alert("Error")}
    } = options;

    fetch(`${services.posts.url}/posts/search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(search)
    })
    .then( res => {
      if ( res.status === 200 ) {
        onSuccess(res);
      } else {
        onError(res)
      }
    })
  },

  getEventSource: () => new EventSource(`${services.posts.url}/posts/stream`),

  feedPosts(eventSource, callback) {
    eventSource.onmessage = msg => {
      callback(JSON.parse(msg.data));
    }
  },

  closeFeed(eventSource) {
    eventSource.close()
  }
}

export default PostService;