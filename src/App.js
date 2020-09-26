import React, { Component } from 'react';
import Plot  from 'react-plotly.js';
import styled from 'styled-components';
import Maps from './Maps';
import Loader from 'react-loader-spinner'


const AppWrapper =styled.div`
  display:flex;
  justify-content:center;
  margin-top:100px
`
const Container =styled.div`
`;

class App extends Component {
  constructor(props) {
    super()
  
    this.state = {
      items:[],
      isLoaded:false,      

      
  }
}


  componentDidMount(){
    fetch('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true')
      .then(response=>response.json())
      .then(json=>{
          this.setState({
            isLoaded:true,
            items:json,
          })
          console.log(json);
      })
  
  }


  render(){


    var date = new Date();

    var {isLoaded,items} = this.state
    var activeCases = items.activeCases
    
    if(!isLoaded){
      return   <Loader
      type="Rings"
      color="brown"
      height={100}
      width={100}
      timeout={3000} //3 secs

   />
    }
    else{
      return (
        <div>
          
          <h4>{date.getDate()}-{date.getMonth()}-{date.getFullYear()} </h4>
          <h4>{date.getHours()}:{date.getMinutes()}</h4>
          <h1>India Covid Case Report</h1>
          <h3>Confirmed - {items.totalCases}</h3>
          <h3>Active - {items.activeCases}</h3>
          <h3>Recovery - {items.recovered}</h3>
          <h3>Death  - {items.deaths}</h3>

               
                <table cellSpacing='10' >
                  <tbody>
                  <tr>
                    <th>Region</th>
                    <th>Recovered</th>
                    <th>Death</th>
                    <th>New Cases</th>
                  </tr>
            {items.regionData.map((item,index)=>(
                  <tr key={index}>
                    <td>{item.region}</td>
                    <td>{item.newRecovered}</td>
                    <td>{item.newDeceased}</td>
                    <td>{Math.abs(item.newInfected)}</td>

                  </tr>

            ))}
            </tbody>
          </table>

          <div>
        <Plot
        data={[

          {
            x: this.state.items.regionData.map((item)=>item.region),
            y: this.state.items.regionData.map((item)=>Math.abs(item.newInfected)),
            type: "bar",
            mode: "number+delta",
            marker: { color: "red" },
          },
        ]}
        layout={{ title: "Statewise New Cases"}}
      />

          </div>

        <div>

        <Plot
            data = {[
                {
                type: "pie",
                values: [activeCases, this.state.items.deaths, this.state.items.recovered],
                labels: ["Active Cases","Deceased", "Recovered"],
                textinfo: "label+value+percent",
                insidetextorientation: "radial"
                }
            ]}
              
              layout = {{

                title:'Status in India'
              }}
        
        />
        </div>
       
          <AppWrapper>
          <Container>
          {/* <Maps/> */}
          </Container>
          </AppWrapper>
        </div>
      );
    }

  }

  }
  

export default App;
