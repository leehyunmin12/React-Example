import {useState} from "react";

export default function ParentComponent() {

    const[count, setCount] = useState(0);

    const expensiveCalculation = () => {
        console.log("복잡한 계산 실행중...")

        let result=0
        for(let i=0; i<100000000; i++){
            result += i;
        }
        return result;
    }

    const calculateValue = expensiveCalculation();

    return(
        <>
            <h1>Count:{count}</h1>
            <button onClick={()=>setCount(count+1)}>승기</button>
            <p>계산 결과:{calculateValue}</p>
        </>
    )

}