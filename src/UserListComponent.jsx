import { useState, useMemo } from "react";

export default function UserListComponent() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice', age: 25, active: true },
        { id: 2, name: 'Bob', age: 30, active: false },
        { id: 3, name: 'Charlie', age: 35, active: true },
        { id: 4, name: 'David', age: 28, active: true }
        //... 수천명의 사용자
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [showActiveOnly, setShowActiveOnly] = useState(false)
    const [theme, setTheme] = useState('light')

    const filteredUsers = useMemo(() => {
        console.log('필터링중...')

        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesActive = showActiveOnly ? user.active : true
            return matchesSearch && matchesActive
        })
    }, [users, searchTerm, showActiveOnly]) //3가지 값 바뀔 때만 재 필터링

    return (
        <div className={theme}>
            <input value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="이름검색" />

            <label>
                <input type="checkbox"
                    checked={showActiveOnly}
                    onChange={(e) => setShowActiveOnly(e.target.checked)} />
                활성 사용자만 보기
            </label>

            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                테마 변경
            </button>

            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>{user.name} ({user.age}세)</li>
                ))}
            </ul>
        </div>
    )

}