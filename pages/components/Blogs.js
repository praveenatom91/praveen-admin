import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import slugify from "react-slugify";

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
      .post("https://api.cloudinary.com/v1_1/dm6ecjtxm/upload", formData)
      .then((response) => {
        console.log(response);
        url = response.data.url;
        console.log(url);

        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
            image: url,
            title: title,
            content: content,
            slug: slugify(title),
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
        <div className="flex flex-col  justify-around items-center drop-shadow-gray-600 drop-shadow-2xl bg-gray-200 p-4">
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

          <Editor
            textareaName="content"
            initialValue="Write your content here...."
            className="w-10/12"
            onEditorChange={(newText) => setContent(newText)}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <button
            type="submit"
            onClick={uploadBlog}
            className="py-2 px-4 shadow-2xl bg-gray-300 rounded-3xl "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
