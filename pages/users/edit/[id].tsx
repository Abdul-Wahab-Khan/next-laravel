import { User } from "@/types";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import cropImage from "@/utils/imageCropper";
import Head from "next/head";

function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  const [message, setMessage] = useState({
    message: "",
    type: "",
  });

  const imageRef = useRef();

  useEffect(() => {
    if (id) {
      fetch(`${process.env.API_URL}/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
        });
    }
  }, [id]);

  function showMessage(message: string, type: string) {
    setMessage({ message, type });
    setTimeout(() => {
      setMessage({ message: "", type: "" });
    }, 3000);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (name === "" && password === "" && email === "" && image === "") {
      showMessage("Cannot submit empty fields", "danger");
      return;
    }

    const formData = new FormData();

    if (image !== "") {
      cropImage(image, imageRef.current).then((bl) => {
        setCroppedImage(bl);
        formData.append("image", bl);
      });
    }

    if (name !== "") formData.append("name", name);
    if (email !== "") formData.append("email", email);
    if (password !== "") formData.append("password", password);
    if (image !== "") formData.append("image", image);
    const result = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "POST",
      body: formData,
    });

    console.log(await result.json());
    showMessage("Updated", "success");
    router.push("/users");
  };

  return (
    <>
      <Head>
        <title>Edit users</title>
        <meta name="description" content="Edit user in this app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {message.message !== "" && (
        <div className={`alert alert-${message.type}`}>{message.message}</div>
      )}
      <div className="row justify-content-center">
        <div className="col-6">
          <h3 className="text-center">Update user</h3>
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
                  value="Update"
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

export default Edit;
