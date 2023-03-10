import React, { useState } from "react";
import officialData from "../../json/official.json"
import uuid from "react-uuid";
import "./css/JsonDeleteKey.css"

// const modifiedOfficialData = officialData.map(person => {
//     const { position, sex, tag, race, class: string, camp, team, des, feature, str, flex, tolerance, plan, skill, adapt, moredes, icon, half, oriHp, oriAtk, oriDef, oriRes, oriDt, oriDc, oriBlock, oriCd, index, jp, birthplace, nation, group, ...rest } = person;
//     return rest;
// });


export const JsonDeleteKey = () => {

    const [keys, setKeys] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);

    const handleClick = () => {
        // const outputOfficial = JSON.stringify(modifiedOfficialData);
        // console.log(outputOfficial);
        // const blob = new Blob([outputOfficial], { type: "application/json" });
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = "filteredData.json";
        // document.body.appendChild(link);
        // link.click();
        // setTimeout(() => {
        //     URL.revokeObjectURL(url);
        //     document.body.removeChild(link);
        // }, 100);

        const selectedKeys = keys.filter(key => (document.getElementById(key) as HTMLInputElement).checked);
        const filteredData = data.map(item => {
            const filteredItem: any = {};
            selectedKeys.forEach(key => {
                filteredItem[key] = item[key];
            });
            return filteredItem;
        });

        const outputOfficial = JSON.stringify(filteredData);
        console.log(outputOfficial);
        const blob = new Blob([outputOfficial], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "filteredData.json";
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        }, 100);
    }

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = (evt) => {
                const data = JSON.parse(evt.target?.result as string)
                setData(data);
                const keys = new Set<string>();
                data.forEach((item: any) => {
                    Object.keys(item).forEach(key => keys.add(key));
                })
                setKeys(Array.from(keys));
                console.log(Array.from(keys));
            };
        }
    };

    // 1. ?????????button ????????? ??????????????????local???json???????????? (??????)
    // 2. ????????????json???????????? ??? key???????????? (??????)
    // 3. ???key???????????????????????????


    return (
        <>
            <div>

                <label htmlFor="chooseJsonFile" >??????Json??????</label>
                <input type="file" id="chooseJsonFile" onChange={handleFileInput} />

                {keys && keys.length > 0 && <h1>????????????????????????</h1> &&
                    <div className="checkboxList">
                        {keys.map((key, index) => (
                            <div key={uuid()}>
                                <input type="checkbox" value={key} id={key} />
                                <label htmlFor={key}>{key}</label>
                            </div>
                        ))}
                    </div>
                }




                <h1>??????Json</h1>
                <button onClick={handleClick}>Export json</button>
            </div>
        </>
    )
}