import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Props } from "@/app/types/Props";

const Post: React.FC<Props> = () => {
  const { user } = UserAuth();
  const [userPosts, setUserPosts] = useState<Props[]>([]);
  const [currentImages, setCurrentImages] = useState(
    Array(userPosts.length).fill(0)
  );

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user) {
        const q = query(collection(db, "posts"), where("user", "==", user.uid));

        try {
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.log("No posts found for the user");
          } else {
            const postsData: Props[] = [];
            querySnapshot.forEach((doc) => {
              const postData = doc.data() as Props;
              postsData.push(postData);
            });
            setUserPosts(postsData);
            setCurrentImages(Array(postsData.length).fill(0));
          }
        } catch (error) {
          console.log("Error fetching user posts:", error);
        }
      } else {
        console.log("Waiting for user");
      }
    };

    fetchUserPosts();
  }, [user]);

  useEffect(() => {}, [userPosts]);

  const nextImage = (index: number) => {
    setCurrentImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] =
        (newImages[index] + 1) % (userPosts[index]?.images?.length || 1);
      return newImages;
    });
  };

  const prevImage = (index: number) => {
    setCurrentImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] =
        (newImages[index] - 1 + (userPosts[index]?.images?.length || 1)) %
        (userPosts[index]?.images?.length || 1);
      return newImages;
    });
  };

  const handleDelete = async (postId: string) => {
    console.log("Deleting post with ID:", postId);

    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        // Query for the post
        const postsQuery = query(
          collection(db, "posts"),
          where("postId", "==", postId)
        );
        const querySnapshot = await getDocs(postsQuery);

        if (!querySnapshot.empty) {
          // Get the first document from the query (there should only be one)
          const postDoc = querySnapshot.docs[0];

          // Get the post data
          const postData = postDoc.data();

          // Add the post to the deletedPosts collection
          const deletedPostsRef = doc(db, "deletedPosts", postId);
          await setDoc(deletedPostsRef, postData);

          // Delete the post from the original collection
          await deleteDoc(postDoc.ref);

          // Remove the deleted post from the state
          setUserPosts((prevPosts) => {
            const newPosts = prevPosts.filter((post) => post.postId !== postId);
            return newPosts;
          });
        } else {
          console.error("Document does not exist");
        }
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-black mx-auto max-w-screen-lg px-8 pt-5 pb-3">
      {userPosts.map((post, index) => (
        <div
          key={index}
          className="bg-gray-500 shadow-md p-6 transition-transform transform hover:scale-105 border border-solid border-gray-500"
        >
          <button
            onClick={() => post.postId && handleDelete(post.postId)}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 float-right hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <p>Description: </p>
          <div
            className="bg-gray-400 rounded-sm p-2 mb-4"
            style={{ height: "100px", overflowY: "auto" }}
          >
            <p>{post.description}</p>
          </div>
          {post.images && post.images.length > 0 && (
            <div className="relative">
              <img
                className="w-full h-60 object-cover rounded-md"
                src={post.images[currentImages[index]]}
                alt={`Image ${currentImages[index]}`}
              />
              {post.images.length > 1 && (
                <div>
                  <button
                    onClick={() => prevImage(index)}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={() => nextImage(index)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <svg
              height="15pt"
              viewBox="0 0 512 512"
              width="15pt"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <path d="M256 0C156.125 0 76 80.125 76 180c0 39.625 13.875 67.5 38 112.25l141.875 219.75c2.125 3.25 6.125 5.5 10.125 5.5s8-2.25 10.125-5.5L398 292.25C422.125 247.5 436 219.625 436 180 436 80.125 355.875 0 256 0zm0 282.25c-31.875 0-57.5-25.625-57.5-57.5s25.625-57.5 57.5-57.5 57.5 25.625 57.5 57.5-25.625 57.5-57.5 57.5z" />
            </svg>
            <p style={{ marginLeft: "5px" }}>{post.location}</p>
          </div>
          <p
            className="text-green-500 font-semibold pt-4"
            style={{
              fontSize: "1.2rem",
            }}
          >
            ${post.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Post;
