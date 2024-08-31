import React, {useState, useEffect} from 'react';

const data = [
    {
        id: 1,
        title: "test 1"
    },
    {
        id: 2,
        title: "Test 2"
    },
    {
        id: 3,
        title: "deneme 1"
    },
    {
        id: 4,
        title: "Deneme 2"
    }
]


function App() {

    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])

    useEffect(() => {
        if (search) {
            setResult(data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())))
        }
        else {
            setResult([])
        }
    },[search])

    return (
        <div className="search">
            <input type="text" placeholder="Bir şeyler ara..." onChange={(e) => setSearch(e.target.value)}/>
            {result && (
                <div className="search-result">
                    {result.map(item => (
                    <div key={item.id} className="search-result-item">{item.title}</div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
