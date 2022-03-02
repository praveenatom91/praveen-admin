import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Arts() {
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  var url = "";

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "praveen");

    axios
      .post("https://api.cloudinary.com/v1_1/dm6ecjtxm/upload", formData)
      .then((response) => {
        console.log(response);
        url = response.data.url;
        console.log(url);

        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/arts`, {
            image: url,
            category: category,
          })
          .then((res) => {
            console.log(res);
            toast.success("Uploaded Successfully");
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col justify-center items-center ">
        <div className="h-[50%] flex flex-col  justify-around items-center drop-shadow-gray-600 drop-shadow-2xl bg-gray-200 p-4">
          <input
            type="file"
            name="photo"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
          />
          <div className="flex justify-around items center">
            <div>Category</div>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Choose Category</option>
              <option value="Travel">Travel</option>
              <option value="Cinema">Cinema</option>
              <option value="Politics">Politics</option>
              <option value="Momentous">Momentous</option>
              <option value="Boosters">Boosters</option>
              <option value="Science & Technology">Science & Technology</option>
              <option value="Rewinderz">Rewinderz</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={uploadImage}
            className="py-2 px-4 shadow-2xl bg-gray-300 rounded-3xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Arts;
