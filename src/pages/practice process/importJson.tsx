import React from "react";
import data from "./../../json/official.json"
import uuid from "react-uuid";

export const UsersDetails = () => {
    return (
        <>
            <div>
                {data.map((data, index) => {
                    return (
                        <div key={uuid()}>
                            {data.cn}
                        </div>
                    )
                })}
            </div>
        </>
    )
}