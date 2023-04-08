import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, MouseEventHandler } from "react";

const UserItemRow: FC<{
  user: User;
  userDelete: Function;
}> = ({ user, userDelete }) => {
  const router = useRouter();

  const handleDelete = async () => {
    userDelete(user.id);
  };

  const handleEdit = async () => {
    router.push(`/users/edit/${user.id}`);
  };

  return (
    <tr>
      <td>
        {user.image_url && (
          <Image
            src={`${process.env.ASSETS_URL}/images/${user.image_url}`}
            width={100}
            height={100}
            alt="User's image"
          />
        )}
      </td>
      <td>
        <Link href={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.email}</td>
      <td>
        <button className="btn btn-danger mx-2" onClick={(e) => handleDelete()}>
          X
        </button>
        <button className="btn btn-warning" onClick={(e) => handleEdit()}>
          Edit
        </button>
      </td>
    </tr>
  );
};

export default UserItemRow;
