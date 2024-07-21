import { useState } from 'react';
const Todo = () => {
    const generateRandomString = () => {
        // Generate a random number between 1000 and 9999
        let randomNum = Math.floor(1000 + Math.random() * 9000);

        // Convert the number to a string and return it
        return randomNum.toString();
    }
    const [item, setItem] = useState([{ item: "Item 1" }, { item: "Item 2" }, { item: "Item 3" }]);
    const [text, setText] = useState("");
    const getItem = (e) => {
        e.preventDefault();
        // const temp=[...item];
        // setItem
    }
    const getText = (e) => {
        // console.log(e.target.value)
        setText(e.target.value);

    }

    return (
        <div className='todo-container'>
            <h1>Todo List</h1>
            <div className='todo-inputs'>
                <form>
                    <input type="text" onChange={getText} />
                    <select>
                        <option>add</option>
                        <option>remove</option>
                    </select>
                    <button onClick={getItem}>Add</button>
                </form>
            </div>
            <div className='todo-list'>
                {
                    item.map((ite) =>
                        <div className={`${generateRandomString()}`}>{ite.item}</div>
                    )
                }
            </div>
        </div>
    )
}
export default Todo;