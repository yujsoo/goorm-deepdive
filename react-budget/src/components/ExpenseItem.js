import React from 'react'
import { MdEdit , MdDelete } from 'react-icons/md'

const ExpenseItem = ({expense, handleDelete, handleEdit}) => {
  return (
    <li>
        <div>
          <span>{expense.charge}</span>
          <span>{expense.amount}원</span>
        </div>
        <div>
          <button onClick={() => handleEdit(expense.id)}><MdEdit></MdEdit></button>
          <button onClick={() => handleDelete(expense.id)}><MdDelete></MdDelete></button>
        </div>
      </li>
  )
}

export default ExpenseItem
