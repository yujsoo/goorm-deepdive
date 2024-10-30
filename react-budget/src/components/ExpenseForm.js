import React from 'react'

const ExpenseForm = ({chargeInput , handleChargeFunc , amountInput, handleAmountFunc , handleSubmitFunc , editing}) => {
  return (
    <div>
        <form onSubmit={handleSubmitFunc}>
            <div>
                <div>
                    <label htmlFor="charge">지출항목</label>
                    <input type="text" id="charge" name="charge" value={chargeInput} onChange={handleChargeFunc} placeholder="예)렌트비"/>
                </div>
                <div>
                    <label htmlFor="amount">비용</label>
                    <input type="number" id="amount" name="amount" value={amountInput} onChange={handleAmountFunc} placeholder="예)100원"/>
                </div>
            </div>
            <button type="submit">{editing ? '수정' : '제출'}</button>
        </form>
      </div>
  )
}

export default ExpenseForm

