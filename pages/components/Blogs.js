import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Blogs() {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  var url = "";

  const uploadBlog = () => {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "praveen");

    axios
      .post("https://api.cloudinary.com/v1_1/di6pzmxin/upload", formData)
      .then((response) => {
        console.log(response);
        url = response.data.url;
        console.log(url);

        axios
          .post("https://praveen-api.herokuapp.com/blogs", {
            image: url,
            title: title,
            content: content,
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
          <input
            type="text"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-96 outline-none p-2 m-2"
            placeholder="Title..."
          />
          <textarea
            type="text"
            name="content"
            onChange={(e) => setContent(e.target.value)}
            className="w-96 h-48 outline-none p-4 resize-none"
            placeholder="Have something to write ...."
          />
          <button
            type="submit"
            onClick={uploadBlog}
            className="py-2 px-4 shadow-2xl bg-gray-300 rounded-3xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
