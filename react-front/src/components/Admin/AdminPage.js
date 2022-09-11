import React, {useEffect, useState} from 'react'
import postsApi from "../Api/postsApi";
import userApi from '../Api/userApi'
import {useNavigate} from "react-router-dom";

function AdminPage({cookie: cookie}) {
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {

        const _ = async () => {
            const answer = await userApi.getUsers({cookie: cookie})
            if (answer?.error || !answer) {
                navigate('/')
                setUsers([])
            } else {
                setUsers(answer)
            }
            console.log(answer)
        }
        _()
    }, [])

    return (

        <div className={"flex flex-col mt-20 bg-slate-700 bg-opacity-50"}>
            <table className={'border-4 border-t-teal-600 border-separate'}>
                <thead>
                <tr>
                    <th scope={"col"}>id</th>
                    <th scope={"col"}>username</th>
                    <th scope={"col"}>email</th>
                    <th scope={"col"}>name</th>
                    <th scope={"col"}>surname</th>
                    <th scope={"col"}>postsIds</th>
                    <th scope={"col"}>role</th>
                </tr>
                </thead>
                <tbody className={'text-center'}>
                {users?.map((user) => {
                    return (
                        <tr key={user?.id}>
                            <td className={'border border-slate-700'}>{user?.id}</td>
                            <td className={'border border-slate-700'}>{user?.username}</td>
                            <td className={'border border-slate-700'}>{user?.email}</td>
                            <td className={'border border-slate-700'}>{user?.name}</td>
                            <td className={'border border-slate-700'}>{user?.surname}</td>
                            <td className={'border border-slate-700'}>{user?.postsIds}</td>
                            <td className={'border border-slate-700'}>{user?.role}</td>

                        </tr>
                    )
                })}


                </tbody>


            </table>
        </div>
    )
}

export default AdminPage