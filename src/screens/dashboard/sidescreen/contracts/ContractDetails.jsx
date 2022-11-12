
import './ContractDetails.scss'
import { ProgressBar } from 'react-loader-spinner';
import { getBills } from '../../../../services/BillService';
import { useEffect } from 'react';
import { useState } from 'react';
import { MdAssignmentReturned } from 'react-icons/md';



const ContractDetails = ({contract}) => {

  const [ bills, setBills ] = useState([])
  

  const sortFunction = (a , b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  }

  const toMonthName= (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
  }

  useEffect(() => {
    getBills()
      .then(bills => {
        return bills.filter(bill => bill.contract.id === contract.id).sort(sortFunction)
      })
      .then(filteredBills => {
        setBills(filteredBills.slice(0, 19))
      })
      .catch(err => console.error(err))
  }, [contract])
  


  // console.log('bills', bills[0] ? bills[0].contract.location.street : "");
  return contract ? (
    <div className='contract-container'>
      <h2>{contract.location.street} {contract.location.streetNumber}, {contract.location.city}</h2>
      <div className='content'>
        <div className='contract-info'>
          <div className='details'>
            <h3>Details</h3>
            <p><b>ID:</b> {contract.id}</p>
            <p><b>Postal code:</b> {contract.location.postalCode}</p>
            <p><b>Price:</b> {contract.price}€/kWh</p>
            {contract.solarPanels ?
              <p><b>Solar panels:</b> {contract.solarPanels}</p>
             
            :
            ""
            }
            {contract.solarPanels ?
              <p><b>Power per panel:</b> {contract.powerPerPanel}</p>
            :
            ""
            }
            
            <p><b>Creation date:</b> {contract.createdAt.slice(0, 10)}</p>
          </div>
          <div className='billing'>
            <h3>Billing</h3>
            <div>
              <p className='name'>{contract.user.firstName} {contract.user.lastName}</p>
              <p>{contract.billingAccount}</p>
            </div>
          </div>
        </div>
        <div className='bills'>
          <h3>Bills</h3>
          <div className='bill-list'>
            {bills.map(bill => {

              const downloadFile = ({ data, fileName, fileType }) => {
                // Create a blob with the data we want to download as a file
                const blob = new Blob([data], { type: fileType })
                // Create an anchor element and dispatch a click event on it
                // to trigger a download
                const a = document.createElement('a')
                a.download = fileName
                a.href = window.URL.createObjectURL(blob)
                const clickEvt = new MouseEvent('click', {
                  view: window,
                  bubbles: true,
                  cancelable: true,
                })
                a.dispatchEvent(clickEvt)
                a.remove()
              }
              
              const exportToJson = e => {
                e.preventDefault()
                downloadFile({
                  data: JSON.stringify(bill),
                  fileName: `Lumio bill ${bill.createdAt.slice(0, 10)}.json`,
                  fileType: 'text/json',
                })
              }

              return (
                <div className='bill-card'>
                  <div className='left'>
                    <h4>{toMonthName(bill.createdAt.split('-').slice(1,-1).toString())} {bill.createdAt.slice(0,4)}</h4>
                    <p>{bill.id}</p>
                  </div>
                  <div className='right'>
                    <p>{bill.total}€</p>
                    <MdAssignmentReturned onClick={exportToJson}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
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

export default ContractDetails;