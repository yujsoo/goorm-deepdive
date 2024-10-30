import React , { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const App = () => {
    // Alert
    const [alert,setAlert] = useState({show:false, type:'success', text:''})

    const [isEditing, setIsEditing] = useState(false);
    const [id, setId] = useState('');

    // 검색하는것을 업데이트 해주고싶다. 검색 초기를 기억하기위해 state를 만든다.
    const [charge,setCharge] = useState(''); // 지출항목 입력
    const [amount,setAmount] = useState(0); // 그 아래 비용 부분

    const [expenses,setExpenses] = useState([
        { id:1, charge:"렌트비", amount:1600 },
        { id:2, charge:"교통비", amount:400 },
        { id:3, charge:"식비", amount:1200 },
    ])

    // 편집 버튼 클릭시 호출할 함수
    const handleEdit = (id) => {
        // 편집 클릭시 해당 클릭 내용이 위로 올라가도록
        const expense = expenses.find(item => item.id === id);
        console.log(expense)
        const { charge , amount } = expense;
        setCharge(charge);
        setAmount(amount);

        // 어떤걸 수정해야하는지 알아야하기때문에 id받아와야 함
        setIsEditing(true)
        setId(id);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(charge !== "" & amount > 0) {
            if (isEditing) {
                // 수정하는 부분
                const newExpense = expenses.map(item => {
                    return item.id === id ? {...item,charge:charge, amount:amount} : item
                    // ...item -> 원래꺼 얕은 복사후 덮어씌우기
                })
                setExpenses(newExpense);
                setIsEditing(false)
                
            }else{
                // 새로 생성하는 부분
                const newExpense = {
                    id: crypto.randomUUID(), // crypto.randomUUI 유니크한 값이 생성된다.
                    charge: charge,
                    amount: amount // 둘이 같으면 생략도 가능
                }
    
                // expenses state 불변성 지켜줘야함.
                const newExpenses = [...expenses,newExpense]
                setExpenses(newExpenses);
            }
            
            handleAlert({type:'success', text:'아이템이 생성되었습니다 :)'})
            setCharge("");
            setAmount(0);
        }else{
            console.log("error")
            handleAlert({type:'danger', text:'빈 값입니다.'})
        }
    }

    const handleAmount = (e) => {
        setAmount(Number(e.target.value));
    }

    const handleCharge = (e) => {
        setCharge(e.target.value);
    }

    const handleDelete = (id) => {
        // console.log(id)
        const newExpenses = expenses.filter(item => 
            item.id !== id
        )
        setExpenses(newExpenses);
        handleAlert({type:'danger', text:'아이템이 삭제되었습니다:)'})
    }

    // 모든 리스트 삭제
    const handleClear = () => {
        setExpenses([]);
    }

    //Alert 컨트롤 함수
    const handleAlert = ({type, text}) => {
        //ref?로도 컨트롤 할수있음.
        let a;
        clearTimeout(a);
        setAlert({show:true, type:type, text:text})
        a = setTimeout(() => {
            setAlert({show:false})
        },7000)
    }

    return (
        <main>
            {alert.show ? <Alert text={alert.text} type={alert.type}></Alert> : null}
            <h1>예산 계산기</h1>
            
            <div style={Astyle}> {/* { {Astyle} } => style={} (기본의 형태) / style={ {객체가 들어감} } */}
                <ExpenseForm 
                handleAmountFunc={handleAmount}
                handleChargeFunc={handleCharge} 
                amountInput={amount}
                chargeInput={charge}
                handleSubmitFunc={handleSubmit}
                editing={isEditing}></ExpenseForm>
            </div>
            <div style={Astyle}>
                <ExpenseList 
                    initialExpenses={expenses} 
                    handleDelete={handleDelete} 
                    handleEditFunc={handleEdit}
                    handleClearFunc={handleClear}></ExpenseList>
                {/*handleEditFunc라는 prop이름으로 handleEdit 함수를 넘겨줬음*/}
            </div>
            <div>
                <p>
                    총 지출: {expenses.reduce((acc,curr) =>{
                        return (acc += curr.amount)
                    },0)}
                    <span>원</span>
                </p>
            </div>
        </main>
    )
}

export default App



const Astyle = {
    width: "100%",
    backColor: 'white',
    padding: '1rem'
}




// export 파일을 내보낸다.
// import 내보내진 파일을 가져다 사용한다.


// export default는 import할때 아무이름으로 작성해서 가져와도 된다. 예) import 작명 from "./파일경로";

// export (앞에 default 안 붙음)- 는 import할때 반드시 정해진 이름으로 똑같이 작성해서 가져와야 한다. 
// 예) import { export 파일명 맞추기 } from "./파일경로";