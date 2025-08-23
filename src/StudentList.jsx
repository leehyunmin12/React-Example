//배열을 map()으로 화면에 뿌린다.

// React에서 배열을 map()을 싸서 jsx로 바꿈 --> key가 꼭 필요하다.
// 왜?????? -> 어떤 항목이 어떤DOM인지를 추적하려면 항목의 정체성이 있어야함.

import {useState} from "react"
import { jsx } from "react/jsx-runtime"

export default function StudentList() {

    const [students, setStudents] = useState([
        {id:"s1",name:"추다율", present:true},
        {id:"s2",name:"전유림", present:true},
        {id:"s3",name:"이재훈", present:true},
    ])

    const toggle=(id) =>{
        setStudents((prev) =>
        prev.map((s) => (s.id==id? {...s, present: !s.present}:s)))
    }

    const [search, setSearch] = useState("")
    const filtered = students.filter((s) => s.name.includes(search))

    return(
        <div>
            <h1>학생 리스트</h1>

            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="검색"
            />

            <ul style={{paddingLeft: 16}}>
                {filtered.map((s) => {
                    <li key={s.id}>{s.name}</li>
                })}
            </ul>

        </div>
    )
}