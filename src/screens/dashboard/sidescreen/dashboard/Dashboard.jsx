import React, { useEffect, useState } from 'react';
import DashboardChart from '../../../../components/dashboard/DashboardChart/DashboardChart';
import { getBills } from '../../../../services/BillService';
import './Dashboard.scss'
import WeatherWidget from '../../../../components/weather/WeatherWidget';
import ContractSelect from '../../../../components/misc/contract-select/ContractSelect';
import { getCurrentUser } from '../../../../services/UserService';
import { getContract, getContracts } from '../../../../services/ContractService';
import { ProgressBar } from 'react-loader-spinner';
import { getTickets } from '../../../../services/TicketService';
import SoldChart from '../../../../components/dashboard/SoldChart/SoldChart';

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
  const [ tickets, setTickets ] = useState()

  console.log(tickets);

  
  
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
    getTickets()
      .then(tickets => {
        console.log(tickets);
        console.log("CONTRACT",contractSelected);
        return tickets.filter(ticket => ticket.sellingUserContract.id === contractSelected)
      })
      .then(filteredTickets => {
        setTickets(filteredTickets)
      })
      .catch(err => console.error(err))
  }, [contractSelected]);

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
        {powerSoldData[0].length ?
          <div className='second-row'>
            <div className='chart-container'>
              <SoldChart
                seriesName="Power Sold"
                data={powerSoldData}
                xName={month}
                chartType="area"
                contractSelected={contractSelected}
                width="500px"
                height="300px"
              />
            </div>
            <div className='weather-container'>
              <p>Algo</p>
              {tickets?.map(ticket => {
                return <div key={ticket.id}>ALGO{ticket.id}</div> 
              })}
            </div>
          </div>
        :
          <div className='second-row'>
            <div>
              Take a look at our marketplace!
            </div>
            <div className='weather-container'>
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