import React from 'react'
import './Alert.css'

// props - type : 어떤걸 삭제했는지에 따라
const Alert = ({text, type}) => {
  return (
    <div className={`alert alert-${type}`}>{text}</div>
  )
}

export default Alert
