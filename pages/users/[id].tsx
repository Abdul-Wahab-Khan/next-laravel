import { User } from "@/types";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

const GetUser: NextPage<{ user: User }> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Read users</title>
        <meta name="description" content="Read user in this app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{user.email}</p>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.API_URL}/users`);
  const data = await res.json();

  const paths = data.map((user: User) => {
    return {
      params: {
        id: user.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`${process.env.API_URL}/users/${params.id}`);
    const user = await res.json();
    return {
      props: {
        user,
      },
    };
  } catch (err) {
    return {
      redirect: "/error",
    };
  }
};

export default GetUser;
