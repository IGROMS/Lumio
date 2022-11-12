import React, { useEffect, useState } from 'react';
import DashboardChart from '../../../../components/dashboard/DashboardChart/DashboardChart';
import { getBills } from '../../../../services/BillService';
import './Dashboard.scss'
import WeatherWidget from '../../../../components/weather/WeatherWidget';
import ContractSelect from '../../../../components/misc/contract-select/ContractSelect';
import { getCurrentUser } from '../../../../services/UserService';
import { getContract, getContracts } from '../../../../services/ContractService';
import { ProgressBar } from 'react-loader-spinner';
import { getAllTickets } from '../../../../services/TicketService';
import { getTickets } from '../../../../services/TicketService';
import { toast } from 'react-toastify';
import SoldChart from '../../../../components/dashboard/SoldChart/SoldChart';
import BoughtChart from '../../../../components/dashboard/BoughtChart/BoughtChart';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const toMonthName= (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
  }

  const [ contracts, setContracts] = useState([])
  const [ contractSelected, setContractSelected] = useState()
  const [ data, setData ] = useState([])
  const [ chartFilter, setChartFilter ] = useState(-12)
  const [ city, setCity] = useState()
  const [ sellerTickets, setSellerTickets ] = useState()
  const [ buyerTickets, setBuyerTickets ] = useState()
  const [ donutData, setDonutData] = useState([])

  
  
  const handleTotal = () =>{
    setChartFilter(0)
  }
  const handleYearly = () => {
    setChartFilter(-12)
  }
  
  const sortFunction = (a , b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  }

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        getContracts(user)
          .then(contractsFetched => {
            setContracts(contractsFetched)
						setContractSelected(contractsFetched[0].id);
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    getBills()
      .then(bills => {
        return bills.filter(bill => bill.contract.id === contractSelected).sort(sortFunction)
      })
      .then(filteredBills => {
        setData(filteredBills.slice(chartFilter))
      })
      .catch(err => console.error(err))
  }, [chartFilter, contractSelected])

  useEffect(() => {
    getAllTickets()
      .then(tickets => {
        return tickets.filter(ticket => ticket.sellingUserContract._id === contractSelected /* || ticket.buyingUserContract._id === contractSelected */)
      })
      .then(filteredTickets => {
        setSellerTickets(filteredTickets)
      })
      .catch(err => console.error(err))
  }, [contractSelected]);

  useEffect(() => {
    getAllTickets()
      .then(tickets => {
        console.log(tickets);
        return tickets.filter(ticket => ticket.buyingUserContract === contractSelected)
      })
      .then(filteredTickets => {
        setBuyerTickets(filteredTickets)
      })
      .catch(err => console.error(err))
  }, [contractSelected]);


  useEffect(() => {
    const powerPeerToPeer = data.map(bill => {
      return bill.powerPeerToPeer
    }).filter(data => data)
  
    const powerPTPDonut = powerPeerToPeer.reduce((e, b) => e + b, 0)
    const powerUsedDonut = powerUsed.reduce((e, b) => e + b, 0)
  
    const powerPeerToPeerData = [powerPTPDonut, powerUsedDonut-powerPTPDonut]
    setDonutData(powerPeerToPeerData)

  }, [data])

  const powerUsed = data.map(bill => {
    return bill.powerUsed
  })
  const powerGenerated = data.map(bill => {
    return bill.powerGenerated
  }).filter(data => data)

  const powerSold = data.map(bill => {
    return bill.powerSold
  }).filter(data => data)
  
  const powerSoldData = [powerSold, []]

  const powerPeerToPeer = data.map(bill => {
    return bill.powerPeerToPeer
  }).filter(data => data)

  const powerPTPDonut = powerPeerToPeer.reduce((e, b) => e + b, 0)
  const powerUsedDonut = powerUsed.reduce((e, b) => e + b, 0)

  
  const powerPeerToPeerData = [powerPTPDonut, powerUsedDonut-powerPTPDonut]
  

  const chartData = [powerUsed, powerGenerated]
  

  const month = data.map(bill => {
    return toMonthName(bill.createdAt.split('-').slice(1,-1).toString())
  })

  useEffect(() => {
    getContract(contractSelected)
    .then(contract => {
      setCity(contract.location.city)
    })
    .catch(err => console.error(err))
  }, [contractSelected])


  return data[0] ? (

    <div className='dashboard-container'>
      <h2 className='dashboard-title'>Dashboard</h2>
      <div className='dashboard-content'>
        <ContractSelect
          contracts={contracts}
          contractSelected={contractSelected}
          setContractSelected={setContractSelected}
        />
        <div className='first-row'>
          <div className="power-used-chart">
            <div className='title'>
              <h3 className='chart-title'>Consumption</h3>
              <div className='controls'>
                <button onClick={handleYearly}>Yearly</button>
                <button onClick={handleTotal}>Total</button>
              </div>
            </div>
            <DashboardChart 
              seriesName="Power Used"
              data={chartData}
              xName={month}
              chartType="area"
              contractSelected={contractSelected}
              height="300px"
            />
          </div>
        </div>
        {powerSoldData[0].length || donutData[0] ?
          <div className='is-ticket'>
            {powerSoldData[0].length ?
              <div className='second-row'>
                <div className='chart-container'>
                  <h3>Sold power</h3>
                
                  <SoldChart
                    seriesName="Power Sold"
                    data={powerSoldData}
                    xName={month}
                    chartType="area"
                    contractSelected={contractSelected}
                    height="300px"
                  />
                  
                </div>
                <div className='peer-to-peer-container'>
                  <h3>My tickets</h3>
                  <div className='ticket-list'>
                    {sellerTickets?.map(ticket => {
                      return <div key={ticket.id} to={""} className="dashboard-ticket-container">
                              <div>
                                <div className='dashboard-ticket-selling-user'><h4>{ticket.buyingUser.firstName} {ticket.sellingUser.lastName}</h4></div>
                                <h4>{ticket.startDate?.toString().substring(0, 10)} &#x2192; {ticket.endDate?.toString().substring(0, 10)}</h4>
                              </div>
                              <div className='dashboard-ticket-info'>
                                <p>{ticket.quantity} kWh</p>
                                <p>{ticket.price}€/kWh</p>
                              </div>
                            </div>
                    })}
                  </div>
                </div>
              </div>
            :
              <div className='second-row'>
                <div className='chart-container'> 
                <h3>Power sum-up</h3> 
                <BoughtChart
                    seriesName="Power Bought"
                    data={powerPeerToPeerData}
                    xName={month}
                    chartType="donut"
                    contractSelected={contractSelected}
                    height="260px"
                  />
                </div>
                <div className='peer-to-peer-container'>
                  <h3>My tickets</h3>
                  <div className='ticket-list'>
                    {buyerTickets?.map(ticket => {
                      return<div key={ticket.id} to={""} className="dashboard-ticket-container">
                              <div>
                                <div className='dashboard-ticket-selling-user'><h4>{ticket.sellingUser.firstName} {ticket.sellingUser.lastName}</h4></div>
                                <h4>{ticket.startDate?.toString().substring(0, 10)} &#x2192; {ticket.endDate?.toString().substring(0, 10)}</h4>
                              </div>
                              <div className='dashboard-ticket-info'>
                                <p>{ticket.quantity} kWh</p>
                                <p>{ticket.price}€/kWh</p>
                              </div>
                            </div> 
                    })}
                  </div>
                </div>
              </div>
            }
            <div className='ticket-weather'>
              <div className='weather-container'>
                <h3>Weather conditions</h3>
                <WeatherWidget city={city} contractSelected={contractSelected}/>
              </div>
            </div>
          </div>
          
        :
          <div className='second-row'>
            <div className='marketplace-add'>
              <h3>Take a look at our marketplace!</h3>
              <Link to="/market"><img alt="" src="marketplace.png"/></Link>
            </div>
            <div className='weather-container'>
              <h3>Weather conditions</h3>
              <WeatherWidget city={city} contractSelected={contractSelected}/>
            </div>
          </div>
        }
        {powerSoldData[0].length ?
          <div className='third-row'>

          </div>
        :
          <div></div>
        }
      </div>
    </div> ) : (
      <div className='loader-container'>

        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor = '#020E31'
          barColor = '#FF9600'
        />
      </div>
  );
};

export default Dashboard;