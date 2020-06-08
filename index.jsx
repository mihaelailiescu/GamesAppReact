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
            <button className="delete-btn"
                onClick={() =>{
                    //console.log('this is', this) --> era undefined - ce se intampla in spate cu obiectele Game?
                    const url="https://games-app-siit.herokuapp.com";

                    fetch(url + "/games/" + this.props.id, {
                        method: "DELETE"
                    }).then(r => r.text())
                    .then(apiresponse => console.log(apiresponse));}
                }
            >Delete</button>
            <button className="update-btn">Update</button>
        </div >
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
            console.log(gameJson._id)
            return (<Game id={gameJson._id} title={gameJson.title} description={gameJson.description} imageUrl={gameJson.imageUrl} />);
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