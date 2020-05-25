class Game extends React.Component {

    render() {
        const myStyle = {
            marginTop: "10px",
        }
        return (<div className="game"
            style={myStyle}>

            <h1> {this.props.title} </h1>
            <p> {this.props.description}</p>
            <br></br>
            <img src={this.props.imageUrl} />
        </div>
        )

    }
}

class App extends React.Component {
    state = {
        data: [],
    }

    componentDidMount() {
        const url = "https://games-app-siit.herokuapp.com";

        fetch(url + "/games", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(response => response.json())
            .then(response => this.setState({ data: response }));

    }

    render() {
        const { data } = this.state;

        let divs = data.map(gameJson => {

            return (<Game title={gameJson.title} description={gameJson.description} imageUrl={gameJson.imageUrl} />);
        });

        console.log(divs)
        return (
            <div>
                {divs}
            </div>
        )
    }
}

const appDOM = document.getElementById('app');
ReactDOM.render(<App />, appDOM)