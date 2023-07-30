"use client";
import "../assets/style/table-component.scss";
import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
export const TableComponent = ({
    className,
    columns,
    data,
    allowCheckBox,
    onRowSelected,
}) => {
    const [dataTable, setDataTable] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [objChecked, setObjChecked] = useState({});

    useEffect(() => {
        data && formatDataTable(data);
    }, [data]);

    const formatDataTable = (data) => {
        const obj = {};
        const newData = data?.map((item) => {
            const row_id = uuidv4();
            obj[row_id] = false;
            return {
                row_id,
                ...item,
            };
        });
        setObjChecked({ ...obj });
        setDataTable(newData);
    };
    const handleRowSelected = (row) => {
        const listRowSelected = [];
        let count = 0;
        const obj = { ...objChecked };
        obj[row?.row_id] = !obj[row?.row_id];
        setObjChecked(obj);
        dataTable?.forEach((item) => {
            if (obj[item?.row_id]) {
                count++;
                listRowSelected.push(item);
            }
        });
        if (count === dataTable.length) setIsCheckedAll(true);
        else setIsCheckedAll(false);
        onRowSelected(listRowSelected);
    };
    const handleCheckAll = () => {
        const obj = { ...objChecked };
        if (isCheckedAll) {
            dataTable?.forEach((item) => {
                obj[item?.row_id] = false;
            });
            onRowSelected([]);
        } else {
            dataTable?.forEach((item) => {
                obj[item?.row_id] = true;
            });
            onRowSelected(dataTable);
        }
        setObjChecked(obj);
        setIsCheckedAll(!isCheckedAll);
    };
    return (
        <>
            <div className={className ?? "table-component"}>
                <div className="table-header">
                    {allowCheckBox && (
                        <div className="cell">
                            <input
                                type="checkbox"
                                onChange={handleCheckAll}
                                checked={isCheckedAll}
                            />
                        </div>
                    )}
                    {columns?.map((item) => {
                        return <div className="cell">{item?.title}</div>;
                    })}
                </div>
                <div className="table-body">
                    {dataTable?.map((row) => {
                        return (
                            <div className="row">
                                {allowCheckBox && (
                                    <div className="cell">
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                handleRowSelected(row)
                                            }
                                            checked={objChecked[row?.row_id]}
                                        />
                                    </div>
                                )}
                                {columns?.map((cell) => {
                                    return (
                                        <div className="cell">
                                            {cell?.render
                                                ? cell.render(row[cell?.name])
                                                : row[cell?.name]}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
