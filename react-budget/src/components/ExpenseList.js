import React from 'react'
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({initialExpenses,handleDelete,handleEditFunc,handleClearFunc}) => {
    return (
        <>
            <ul>
                {
                    initialExpenses.map(expense => <ExpenseItem 
                        expense={expense} 
                        key={expense.id} 
                        handleDelete={handleDelete}
                        handleEdit={handleEditFunc}
                        ></ExpenseItem> )
                }
            </ul>
            <button onClick={() => handleClearFunc()}>목록 지우기</button>
        </>  
    )  
}

export default ExpenseList



// 구조분해할당 하는 법
//

/*
    handleEdit은 ExpenseItem 컴포넌트에서 넘겨받은 함수에 대해 새로 붙여준 prop 이름이에요. ExpenseList가 handleEditFunc이라는 이름으로 부모로부터 받은 함수를 ExpenseItem으로 전달할 때, prop 이름을 handleEdit으로 새로 지정해준 거죠.    
*/