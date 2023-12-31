import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import the axios library
import { UserAuth } from "@/app/context/AuthContext.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/firebase";
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
interface AddPostFormProps {
  triggerPostRefresh: () => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ triggerPostRefresh }) => {
  const { user } = UserAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState("");
  const [placePredictions, setPlacePredictions] = useState<
    AutocompletePrediction[]
  >([]);
  const [showMapModal, setShowMapModal] = useState(false); // State to control the map modal
  const [showFormModal, setShowFormModal] = useState(true); // State to control the map modal
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 }); // Store selected location
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [isLocationInputFocused, setIsLocationInputFocused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const inputRef = useRef(null);

  let autocompleteService: any;

  const handleSave = async () => {
    // You can perform any necessary validation here
    // and then save the data and close the form

    console.log(title, description, images, location, user, selectedLocation);

    const imageDownloadURLs = await Promise.all(
      images.map((image) => uploadImage(image))
    );

    const postId = uuidv4();

    setUpVotes(1);
    setDownVotes(0);
    // Create a new post object with the form data
    const newPost = {
      postId,
      title,
      description,
      price,
      images: imageDownloadURLs, // Assuming you want to save image URLs
      location,
      user: user.uid, // You may need to adjust this based on your user data structure
      coords: selectedLocation,
      createdAt: serverTimestamp(),
      upVotes,
      downVotes,
    };

    console.log({ newPost });
    // Add the new post to Firestore
    try {
      // Add the new post to Firestore
      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Post added with ID: ", docRef.id);

      // Update profile page
      triggerPostRefresh();

      setShowNotification(true);
      console.log("Before closing modal");
      setShowFormModal(false);
      console.log("After closing modal");
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  const uploadImage = async (imageFile: File) => {
    const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages(selectedImages);
    }
  };

  const getLatLngFromLocation = async (selectedLocation: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${selectedLocation}&key=${process.env.NEXT_PUBLIC_googlemapsapi}`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        // Do something with the latitude and longitude
        setSelectedLocation({ lat, lng });
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setIsLocationSelected(false);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
  };

  interface AutocompletePrediction {
    description: string;
    place_id: string;
    // You can include more properties as needed
  }

  const handlePlaceSelect = (prediction: AutocompletePrediction) => {
    setLocation(prediction.description);
    setPlacePredictions([]);

    // Call the function to get latitude and longitude
    getLatLngFromLocation(prediction.description);
    // Set the flag to indicate that a location has been selected
    setIsLocationSelected(true);

    setIsLocationInputFocused(false);
  };

  useEffect(() => {
    if (
      location &&
      inputRef.current &&
      !isLocationSelected &&
      isLocationInputFocused
    ) {
      if (window.google && window.google.maps) {
        autocompleteService =
          new window.google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
          { input: location },
          (predictions: AutocompletePrediction[]) => {
            setPlacePredictions(predictions);
          }
        );
      }
    } else {
      // If the input is not focused or empty, clear the predictions
      setPlacePredictions([]);
    }
  }, [location, isLocationSelected, isLocationInputFocused]);

  // const createDraggableMarker = (map: google.maps.Map) => {
  //   const marker = new window.google.maps.Marker({
  //     map,
  //     position: selectedLocation,
  //     draggable: true, // Make the marker draggable
  //   });

  //   // Add an event listener to the marker to capture the new position on dragend
  //   marker.addListener("dragend", (event) => {
  //     const lat = event.latLng.lat();
  //     const lng = event.latLng.lng();
  //     setSelectedLocation({ lat, lng });
  //     console.log({ lat, lng });
  //   });

  //   return marker;
  // };

  return (
    <div className="z-10000">
      {showFormModal && (
        <>
          <h2 className="text-lg font-semibold mb-4">Add a New Post</h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border rounded-lg p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full border rounded-lg p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full border rounded-lg p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-gray-700 font-medium mb-2"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full border rounded-lg p-2"
              ref={inputRef}
              value={location}
              onChange={handleLocationChange}
              onFocus={() => setIsLocationInputFocused(true)}
            />

            {placePredictions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-lg absolute z-10 mt-2">
                {placePredictions.map((prediction) => (
                  <li
                    key={prediction.place_id} // Use place_id as the key
                    onClick={() => handlePlaceSelect(prediction)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {prediction.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </>
      )}

      {/* Map modal */}
      {showMapModal && (
        <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 bg-white z-50">
          <div id="googleMap" className="w-full h-full"></div>
          <button
            onClick={closeMapModal}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 absolute top-4 right-4"
          >
            Close
          </button>
        </div>
      )}

      {showNotification && (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Account Information</p>
              <p className="text-sm">Post created successfully.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPostForm;
