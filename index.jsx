class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {full: false};
    }

    render() {
        console.log(this.state.full);
        const myStyle = {
            marginTop: "10px",
        }
        
        const nonfull = (<div className="game"
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
            <button className="update-btn"
            onClick={() => {
                this.setState({full : true});
            }}
            >Update</button>
            </div >)

        let toDisplay = nonfull;
        if (this.state.full){
            let formUpdateDiv = (<UpdateForm id={this.props.id} />)  
            toDisplay = (<div>{nonfull}
                {formUpdateDiv}
        </div>)
        }

        return toDisplay;
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


class UpdateForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            imageUrl: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        // let urlencoded = {
        //     title: this.state.title,
        //     description: this.state.description,
        //     imageUrl: this.state.imageUrl
        // }

        let urlencoded = new URLSearchParams();
        urlencoded.append("title",this.state.title);
        urlencoded.append("description",this.state.description);
        urlencoded.append("imageUrl",this.state.imageUrl);

        const url=`'https://games-app-siit.herokuapp.com/games/${this.props.id}'`;
        console.log(urlencoded);

        fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: JSON.stringify(urlencoded)
            }).then(function(response) {
                var respJson = response
                console.log(respJson)
            })
            .catch(error => { console.log('request failed', error); });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
        <label >
            Title: 
        <input type="text" value={this.state.title} onChange={event => 
        this.setState({title: event.target.value})}/> 
        </label>
        <label>
            Description:
        <input type="text" value={this.state.description} onChange={(event) => {
        this.setState({description: event.target.value})}} />
        </label>

        <label>
            Image URL 
        <input type="text" value={this.state.imageUrl} onChange={(event) => {
        this.setState({imageUrl: event.target.value})}} />
        </label>
        <input type="submit" value="Submit" /> 

        <button className="cancelBtn" id="cancelBtn"
        onClick={() => {
            this.setState({full : false});
        }}
        >Cancel</button>
    </form> 
        )
    }
}

const appDOM = document.getElementById('app');
ReactDOM.render(<App />, appDOM)