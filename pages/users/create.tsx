import { GetStaticProps } from "next";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import smartcrop from "smartcrop";
import Cropper from "cropperjs";
import cropImage from "@/utils/imageCropper";
import Head from "next/head";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  const [message, setMessage] = useState({
    message: "",
    type: "",
  });

  const imageRef = useRef();

  function showMessage(message: string, type: string) {
    setMessage({ message, type });
    setTimeout(() => {
      setMessage({ message: "", type: "" });
    }, 3000);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (name === "" || password === "" || email === "") {
      showMessage("Name, password and email fields are mandatory", "danger");
      return;
    }

    if (image !== "") {
      cropImage(image, imageRef.current).then((bl) => {
        setCroppedImage(bl);
        formData.append("image", bl);
      });
    }

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image !== "") formData.append("image", image);

    const result = await fetch(`${process.env.API_URL}/users`, {
      method: "POST",
      body: formData,
    });

    console.log(await result.json());
    showMessage("User added", "success");
    clearFields();
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setImage("");
  };
  return (
    <>
      <Head>
        <title>Create users</title>
        <meta name="description" content="Create user in this app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {message.message !== "" && (
        <div className={`alert alert-${message.type}`}>{message.message}</div>
      )}

      <div className="row justify-content-center">
        <div className="col-6">
          <h3 className="text-center">Create a user</h3>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="form-group col-12 mb-3">
                <input
                  type="text"
                  placeholder="Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group col-12 mb-3">
                <input
                  type="email"
                  placeholder="Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group col-12 mb-3">
                <input
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3 col-12">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="btn col-3"
                  accept="image/*"
                />

                <input
                  type="submit"
                  className="btn btn-success col-8"
                  value="Add"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <img ref={imageRef} hidden />
    </>
  );
}

export default Create;
