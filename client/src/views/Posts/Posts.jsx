import React, { Component } from "react";
import { Grid, Row, Tab, Tabs} from "react-bootstrap";
import { TweetCard } from "components/TweetCard/TweetCard.jsx";
import { collect } from 'react-recollect';
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon.jsx";
import PostService from "../../services/PostService.jsx"
import InfiniteScroll from 'react-infinite-scroller';

class Posts extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      from: null,
      hasMorePosts: true,
      activeBoard: 0,
      loading: true
    }

    this.eventSource = PostService.getEventSource()
  }

  componentDidMount = () => {
    this.loadTweets(0);
    PostService.feedPosts(this.eventSource, data => {
      if (data instanceof Array) {
        const newPosts = data.filter(post => {
          const board = this.props.store.user.boards[this.state.activeBoard];
          return (
            !this.state.posts.some(p => p._id === post._id) &&
            ( board.userFollowings.some(u => u.username === post.username) ||
              board.subjectFollowings.some(s => post.subjects.includes(s)) )
          )
        });
        newPosts.forEach(p => p.animated = true);
        this.setState({
          posts: newPosts.concat(this.state.posts)
        });
      }
    });
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.activeBoard !== prevState.activeBoard
        || this.props.store.user !== prevProps.store.user) {
      this.loadTweets(this.state.activeBoard);
    }
  }

  componentWillUnmount() {
    PostService.closeFeed(this.eventSource);
  }

  loadTweets = (key) => {
    const user = this.props.store.user;
    if (user.boards.length) {
      const board =  user.boards[key];
      PostService.getPosts({
        search: {
          users: board.userFollowings.map(u => u.username),
          subjects: board.subjectFollowings,
          from: this.state.from
        },
        onSuccess: async res => {
          const newPosts = await res.json();
          console.log(newPosts)
          const posts = this.state.from === 0 ? newPosts : this.state.posts.concat(newPosts);
          const from = newPosts.length ? newPosts[newPosts.length-1]._id : null;
          this.setState({
            posts,
            hasMorePosts: !!newPosts.length,
            from,
            loading: false
          });
        }
      });
    }
  }

  handleOnSelectBoard = (key) => {
    if (key!==this.state.activeBoard) {
      this.setState({
        activeBoard: key,
        posts:[],
        from: null,
        hasMorePosts: true,
        loading: true
      });
    }
  }

  render() {
    const user = this.props.store.user;

    return user.boards.length ? (
      <div className="content content-tabs">
        <Tabs
          id="tabs-boards"
          className="tabs-container"
          activeKey={this.state.activeBoard}
          onSelect={this.handleOnSelectBoard}
        >
          {user.boards.map((board,key) => (
            <Tab eventKey={key} key={key} title={board.name.toUpperCase()}></Tab>
          ))}
        </Tabs>
        <div className="active-tab">
          {this.state.loading ? (
            <h4 className="text-center" key="bigLoader">
              <LoadingIcon width="1.5em" height="1.5em"/>
              <span>Loading</span>
            </h4>
          ) : (
            <Grid fluid>
              <Row>
                {this.state.posts.length ? (
                  <InfiniteScroll
                      pageStart={0}
                      loadMore={() => this.loadTweets(this.state.activeBoard)}
                      hasMore={this.state.hasMorePosts}
                      loader={
                        <LoadingIcon width="1.5em" height="1.5em" key="infiniteScrollLoader"/>
                      }>
                      {this.state.posts.map( tweet => (
                        <TweetCard lg={4} md={6} sm={12} key={tweet._id} data={tweet}/>
                      ))}
                  </InfiniteScroll>
                ) : (
                  <h4 className="text-center">No available posts</h4>
                )}
              </Row>
            </Grid>
          )}
        </div>
      </div>
    ): (
      <h4 className="text-center">No available boards</h4>
    );
  }
}

export default collect(Posts);
