import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import Comment from "../comments/Comment";
import CommentCreateForm from "../comments/CommentCreateForm";
import Asset from "../../components/Asset";
import Footer from "../../components/Footer";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// PostPage Component
function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  // PostPage Structure
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={12} lg={8} className="py-2 p-0 p-lg-2">
          <Post {...post.results[0]} setPosts={setPost} postPage />
        </Col>
        <Col xs={12} lg={4} className="p-0 p-lg-2">
          <Container className={appStyles.Content}>
            {currentUser ? (
              <CommentCreateForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setComments={setComments}
              />
            ) : comments.results.length ? (
              <div style={{ textAlign: "center" }}>
                <i className="fa-regular fa-comment fa-lg"></i>Comments
              </div>
            ) : null}
            {comments.results.length ? (
              <InfiniteScroll
                children={comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<Asset spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />
            ) : currentUser ? null : (
              <div style={{ textAlign: "center" }}>
                No comments... This section is empty.
              </div>
            )}
          </Container>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;