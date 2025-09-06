//1. 검색입력으로 search 바꾸고
//2. todos + search + statusFilter 조합해서 보이는 목록 계산
//3. 추가 폼으로 새 할일을 부모 콜백 호출로 등록

import { useState, useMemo } from "react";

export default function App() {

  const [todos, setTodos] = useState([
    { id: 1, title: "리액트 설치 하기", done: false },
    { id: 2, title: "컴포넌트 구조 복습", done: true },
  ])

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newTitle, setNewTitle] = useState("")

  const visibleTodos = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return todos.filter((t) => {
      const matchKeyword = keyword === "" ||
        t.title.toLowerCase().includes(keyword)
      const matchStatus =
        statusFilter === "all" ? true :
          statusFilter === "active" ? !t.done :
            t.done //"done"
      return matchKeyword && matchStatus
    })

  }, [todos, search, statusFilter])

  const addTodo = (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newItem = { id: Date.now(), title: trimmed, done: false }
    setTodos((prev) => [newItem, ...prev])
    setNewTitle("")
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const onDelete = (id) => {
    setTodos((prev) =>
      prev.filter((todos) => todos.id !== id))
  }
  const onDeleteAll = () => {
    setTodos((prev) =>
      prev.filter(todos => todos.done != true))
  }

  return (
    <>
      <div>
        <h1>폼관리 : 검색 + 필터 + 추가</h1>

        <div>
          <input
            placeholder="검색어 입력"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)}>
            <option value="all">전체</option>
            <option value="active">미완료</option>
            <option value="done">완료</option>
          </select>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault()
          addTodo(newTitle)
        }}
        >
          <label htmlFor="newTodo">새 할일</label>
          <input id="newTodo"
            placeholder="할 일을 입력하세요"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" disabled=
            {newTitle.trim().length < 1}>추가</button>
        </form>

        <TodoList items={visibleTodos} onToggle={toggleTodo} onDelete={onDelete} />

        <p>
          전체 {todos.length}개 / 미완료 {todos.filter((t) =>
            !t.done).length}개
        </p>
        <button onClick={onDeleteAll}>완료 항목 모두 삭제</button>

      </div>
    </>
  )
}

function TodoList({ items, onToggle, onDelete }) {
  if (items.length === 0) return <p>조건에 맞는 항목이 없습니다.</p>
  return (
    <ul>
      {items.map((t) => (
        <li key={t.id}>
          <label>
            <input type="checkbox"
              checked={t.done}
              onChange={() => onToggle(t.id)} />
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.title}
            </span>
          </label>
          <button onClick={() => onDelete(t.id)} style={{ margin: 5 }}>삭제</button>
        </li>
      ))}
    </ul>
  )
}

