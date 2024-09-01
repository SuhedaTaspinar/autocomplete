import { useEffect, useRef, useState } from 'react';
import ContentLoader from "react-content-loader";

const AutocompleteLoader = () => (
    <ContentLoader
        speed={2}
        width={500}
        height={60}
        viewBox="0 0 500 60"
        backgroundColor="#f3f3f3"
        foregroundColor="#dedede"
    >
        <rect x="15" y="10" rx="4" ry="4" width="60" height="40" />
        <rect x="90" y="20" rx="4" ry="4" width="160" height="10" />
        <rect x="90" y="35" rx="4" ry="4" width="120" height="8" />
    </ContentLoader>
);

function App() {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef();

    const isTyping = search.replace(/\s+/, '').length > 0;

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setSearch('');
        }
    };

    const getResultItem = (item) => {
        window.location.href = item.url;
    };

    useEffect(() => {
        if (isTyping) {
            setLoading(true);
            const getData = setTimeout(() => {
                fetch(`https://jsonplaceholder.typicode.com/photos`)
                    .then((res) => res.json())
                    .then((data) => {
                        const filteredResult = data.filter((item) =>
                            item.title.toLowerCase().includes(search.toLowerCase())
                        );
                        setResult(filteredResult.length > 0 ? filteredResult : false);
                        setLoading(false);
                    });
            }, 500);

            return () => {
                clearTimeout(getData);
                setLoading(false);
            };
        } else {
            setResult(false);
        }
    }, [search]);

    return (
        <div className="search" ref={searchRef}>
            <input
                type="text"
                value={search}
                className={isTyping ? 'typing' : null}
                placeholder="Bir şeyler ara..."
                onChange={(e) => setSearch(e.target.value)}
            />
            {isTyping && (
                <div className="search-result">
                    {result && loading === false &&
                        result.map((item) => (
                            <div
                                onClick={() => getResultItem(item)}
                                key={item.id}
                                className="search-result-item"
                            >
                                <img src={item.thumbnailUrl} alt="" className="thumbnail" />
                                <div className="title">{item.title}</div>
                            </div>
                        ))
                    }
                    {loading && new Array(3).fill().map((_, index) => <AutocompleteLoader key={index} />)}
                    {!result && loading === false && (
                        <div className="result-not-found">
                            "{search}" ile ilgili bir şey bulamadık!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
