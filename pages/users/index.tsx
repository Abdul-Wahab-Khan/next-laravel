import UserItemRow from "@/src/components/users/UserItemRow";
import { User } from "@/types";
import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const Users: NextPage<{ userss: User[] }> = ({ userss }) => {
  const [users, setUsers] = useState(userss);
  const handleDelete = async (id: number) => {
    const result = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: "DELETE",
    });
    const data = await result.json();
    const updatedUsers: User[] = users.filter((user) => user.id !== id);
    setUsers([...updatedUsers]);
  };

  let contnet;

  if (users) {
    contnet = (
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <UserItemRow key={index} user={user} userDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    );
  } else contnet = <p>No users yet</p>;

  return (
    <>
      <Head>
        <title>All users</title>
        <meta name="description" content="All user in this app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {contnet}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await fetch(`${process.env.API_URL}/users`);
  const userss = await result.json();
  return {
    props: {
      userss,
    },
  };
};

export default Users;
