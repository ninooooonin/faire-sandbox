import { useState } from 'react';


const App = () => {
    const [userTypes, setUserTypes] = useState('retailers');
    const [locale, setLocale] = useState('en');

    const handleUserTypes = (key) => {
        setUserTypes(key);
    }

    const handleLocale = (key) => {
        setLocale(key);
    }

    return (
        <div className="container">
            <div className="wrapper">
                <h1>Faire Sandbox</h1>
                <div className="form-field">
                    <span>User types</span>
                    <div className="form-row">
                        <button className={`${userTypes === 'retailers'? 'selected': ''}`}
                            onClick={() => handleUserTypes('retailers')}>Retailers</button>
                        <button className={`${userTypes === 'brands'? 'selected': ''}`}
                            onClick={() => handleUserTypes('brands')}>Brands</button>
                    </div>
                </div>
                <div className="form-field" style={{ marginTop: 24 }}>
                    <span>Locales</span>
                    <div className="form-row">
                        <button className={`${locale === 'en'? 'selected': ''}`}
                            onClick={() => handleLocale('en')}>en</button>
                        <button className={`${locale === 'fr'? 'selected': ''}`}
                            onClick={() => handleLocale('fr')}>fr</button>
                        <button className={`${locale === 'de'? 'selected': ''}`}
                            onClick={() => handleLocale('de')}>de</button>
                    </div>
                </div>

                <div className="form-field" style={{ marginTop: 24 }}>
                    <span style={{ paddingBottom: 0 }}>Local Storage Value</span>
                    <div className="form-row">
                        <p>English</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default App;
