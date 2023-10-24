import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import CommunityComments from "../../components/CommunityComments";
import Footer from "../../components/Footer";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import WallPostsList from "../../pages/walls/WallPostsList";
import WallPostCreateForm from "../../pages/walls/WallPostCreateForm";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  // Function to create a wall pos on the Posts Page
  const id = "id";
  const createWallPost = async (wallPostData) => {
    try {
      await axiosReq.post("https://djangorestframework-api-38c4a098777a.herokuapp.com/walls/", wallPostData);
    } catch (error) {
      console.error("Error creating wall post:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="searchInput" className={appStyles['visually-hidden']}>
            Search
          </label>
          <Form.Control
            id="searchInput"
            type="text"
            className="mr-sm-2"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <WallPostsList profileId={id} currentUser={currentUser} />
        <WallPostCreateForm profileId={id} createWallPost={createWallPost} currentUser={currentUser} />
        <PopularProfiles />
        <CommunityComments />
        <Footer />
      </Col>
      <Col className="d-block d-md-none p-0 p-lg-2">
        <CommunityComments />
        <Footer />
      </Col>
    </Row>
  );
}

export default PostsPage;
