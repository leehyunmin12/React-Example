export default function Badge({ state = "" }){

    // if문과 early return -- 조건이 맞지 않으면 컴포넌트 자체를 렌더링하지 않는다.

    if(score<0 || score > 100){
        return <span>잘못된 점수</span>
    }

    //복잡한 분기를 jsx안에서 억지로 표현하지 않는다.
    //일찍 잘라내서 가독성을 높일 수 있다.

    //삼항연산자(?:) -- 텍스트 분기
    
    const label=score>90?"우수":score>=70?"보통":"노력"
    const color = score>90?"green":score>=70?"blue":"red"
    //짧은 조건 분기를 jsx안에서 한 줄로 표현할 수 있다.
    //간단한 값을 바굴 때 적합하다.

    //조건이 많아지면 가독성이 떨어진다.
    //"짧을때, 조건이 많지 않을 때"만 사용하자 -- 규칙

    //조건부 UI는 단순 텍스트 뿐 아니라, 스타일 변경에도 쓸 수 있다.
    return (
        <span style={{background:color, color: "white",
        padding: "4px 8px", borderRadius: 8}}>

            {label}
            {/* 
            3. &&연산자 -- 보조 요소 달기
                단순히 보조 요소를 붙이거나 뺄 때 가장 간편하기 때문이다.
                0 : falsy
            */}
            {score === 100 && <span style={{marginLeft: 8}}>😄</span>}

        </span>
    )
}