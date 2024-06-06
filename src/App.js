import { init } from 'commandbar';
import { useState, useEffect } from 'react';

const App = () => {
	const [isMounted, setMount] = useState(false);
    const [userTypes, setUserTypes] = useState('retailers');
    const [locale, setLocale] = useState('en');
    

    // Org ID: f5bf530d and ab576de6

    const componentWillUnmount = () => {
		setMount(false);
    };

    const componentDidMount = () => {
		if(!isMounted) {
			setMount(true);
            setUserTypes(getLocalStorage('userTypes'));
            setLocale(getLocalStorage('locale'));
		}
    }

	// Life Cycle
	useEffect(() => {
        componentDidMount();
        return componentWillUnmount;
    }, []);

    const handleUserTypes = (value) => {
        setUserTypes(value);
        setLocalStorage('userTypes', value);
        window.location.reload();
    }

    const handleLocale = (value) => {
        setLocale(value);
        setLocalStorage('locale', value);
        window.location.reload();
    }

    const setLocalStorage = (key, value) => {
        localStorage.setItem(`faire-sandbox.${key}`, value);
    }

    const getLocalStorage = (key) => {
        return localStorage.getItem(`faire-sandbox.${key}`);
    }

    const getAllFaireSandboxEntries = () => {
        let entries = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith('faire-sandbox.')) {
                let value = localStorage.getItem(key);
                entries.push(`${key}: ${value}`);
            }
        }
        return entries.join(', ');
    };

    useEffect(() => {
        if (isMounted) {
            const orgId = userTypes === 'brands' ? 'f5bf530d' : 'ab576de6';
            init(orgId);
            window.CommandBar.boot('sandbox-user', {});
            window.CommandBar.toggleHelpHub();
    
            console.log("Active User Types:", userTypes);
            console.log("Active Locale:", locale);
    
            const applyHelpHubFilter = () => {
                switch (locale) {
                    case 'fr':
                        window.CommandBar.setHelpHubFilter({ labels: ["fr", "locale__fr-fr"] });
                        console.log('Use French');
                        break;
                    case 'de':
                        window.CommandBar.setHelpHubFilter({ labels: ["de", "locale_de"] });
                        console.log('Use German');
                        break;
                    default:
                        window.CommandBar.clearHelpHubFilter();
                        console.log('Clear helphub');
                        break;
                }
            };
    
            applyHelpHubFilter();
        }
    }, [isMounted]);

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
                    <span>Local Storage Value</span>
                    <div className="form-row">
                        <code>{getAllFaireSandboxEntries()}</code>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default App;
