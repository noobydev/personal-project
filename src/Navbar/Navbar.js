import react from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className = 'navbar navbar-default'>
                    <div className = 'navbar-header'>
                        <button type = 'button' className = 'navbar-toggle collapsed' data-toggle = 'collapse' data-target = '#nav-collapse'>
                            <span className = 'icon-bar'></span>
                            <span className = 'icon-bar'></span>
                            <span className = 'icon-bar'></span>
                        </button>
                        <a className = 'navbar-brand' href="#">Tents</a>
                    </div>
                </nav>
            </div>
        );
    }
}