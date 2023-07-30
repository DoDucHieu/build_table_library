"use client";
import { TableComponent } from "../component/TableComponent";

export default function Home() {
    const columns = [
        {
            id: 1,
            name: "name",
            title: "Ho ten",
            render: (val) => {
                return <span>{val}</span>;
            },
        },
        {
            id: 2,
            name: "age",
            title: "Tuoi",
            render: (val) => {
                return <span>{val}</span>;
            },
        },
        {
            id: 3,
            name: "address",
            title: "Dia chi",
            render: (val) => {
                return <span>{val}</span>;
            },
        },
        {
            id: 4,
            name: "phone",
            title: "SDT",
            render: (val) => {
                return <span>{val}</span>;
            },
        },
    ];

    const data = [
        {
            id: 1,
            name: "Tran Duc Bo",
            age: 22,
            address: "Ha Noi",
            phone: 123123,
        },
        {
            id: 2,
            name: "Huan Hoa Hong",
            age: 40,
            address: "Ha Noi",
            phone: 123123,
        },
        {
            id: 3,
            name: "Ngo Ba Kha",
            age: 30,
            address: "Ha Noi",
            phone: 123123,
        },
    ];
    return (
        <>
            <TableComponent
                columns={columns}
                data={data}
                allowCheckBox={true}
                onRowSelected={(rows) => {
                    console.log(rows);
                }}
            />
        </>
    );
}
