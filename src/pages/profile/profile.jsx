import { useState, useEffect } from "react";
import NavBarList from "../../config/NavbarList";
import Cookies from "js-cookie";

import Avatar from '@mui/material/Avatar';


export const Profile = () => {

    const [newImage, setNewImage] = useState('')
    useEffect(() => {
        setNewImage(Cookies.get('image'))
        if (newImage === undefined || newImage === null || newImage === "") {
        setNewImage("https://firebasestorage.googleapis.com/v0/b/mini-project-alterra-c451b.appspot.com/o/Capstone_Vaccine%20Booking%20System%2F1603039115321.jpg?alt=media&token=087b0f22-5e82-4695-a8d7-71205a72df67")
        } else {
        setNewImage(newImage)
        }
    }, []);

    return (
    <NavBarList>
      <div className="m-10">
        <div className="grid md:grid-cols-3">
            <div className="">
                <div className="mx-auto w-fit">
                    <Avatar alt={Cookies.get('nama')} src={newImage} sx={{ width: 215, height: 215 }}/>
                </div>
            </div>
            <div className="md:col-span-2 flex item-center">
                <div className="h-fit my-auto mx-auto md:mx-10">
                    <p className="text-24 font-600 md:text-left text-center">{Cookies.get("nama")}</p>
                    <p className="text-12 md:text-left text-center">{Cookies.get("kota")}</p>
                </div>
            </div>
        </div>
        <div className="mt-10 border-t-1 pt-8">
            <table className="table-fixed w-full mx-10">
                <thead>
                    <tr className="w-80">
                        <th className="w-1/4"></th>
                        <th className="w-3/4"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-24">
                        <td>Nama</td>
                        <td>{Cookies.get('nama')}</td>
                    </tr>
                    <tr className="h-24">
                        <td>Username</td>
                        <td>{Cookies.get('username')}</td>
                    </tr>
                    <tr className="h-24">
                        <td>Email</td>
                        <td>{Cookies.get('email')}</td>
                    </tr>
                    <tr className="h-24">
                        <td>Alamat</td>
                        <td>{Cookies.get('address')}</td>
                    </tr>
                    <tr className="h-24">
                        <td>Kota</td>
                        <td>{Cookies.get('kota')}</td>
                    </tr>
                    <tr className="h-24">
                        <td>No Telepon</td>
                        <td>{Cookies.get('noHp')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </NavBarList>
    )
  };