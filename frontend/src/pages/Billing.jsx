import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faFileInvoiceDollar, faCheckCircle, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const billingHistory = [
  { date: 'July 1, 2024', amount: '$29.00', status: 'Paid', invoiceId: 'INV-12345' },
  { date: 'June 1, 2024', amount: '$29.00', status: 'Paid', invoiceId: 'INV-12344' },
  { date: 'May 1, 2024', amount: '$29.00', status: 'Paid', invoiceId: 'INV-12343' },
  { date: 'April 1, 2024', amount: '$29.00', status: 'Paid', invoiceId: 'INV-12342' },
];

function Billing() {
  const usagePercentage = (128 / 300) * 100;

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Billing & Subscription</h1>
        <p className="text-gray-600 mt-1">Manage your plan, payment method, and view your invoices.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Plan and Usage */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Current Plan</h2>
                <p className="text-4xl font-extrabold text-vibrant-blue">Creator Plan</p>
                <p className="text-gray-600 mt-1 font-semibold">$29.00 <span className="font-normal">per month</span></p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/pricing" className="bg-vibrant-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-vibrant-orange transition shadow">
                  Change Plan
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Monthly Usage</h3>
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>128 / 300 minutes used</span>
                <span>{usagePercentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-vibrant-blue h-3 rounded-full" style={{ width: `${usagePercentage}%` }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Your usage will reset on August 1, 2024.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Billing History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-semibold text-gray-500 uppercase border-b bg-gray-50">
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Amount</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {billingHistory.map((item) => (
                    <tr key={item.invoiceId} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-700 font-medium">{item.date}</td>
                      <td className="py-4 px-6 text-gray-700">{item.amount}</td>
                      <td className="py-4 px-6">
                        <span className="flex items-center text-sm text-green-600 font-semibold">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a href="#" className="flex items-center justify-end text-sm text-vibrant-blue hover:underline font-semibold">
                          <FontAwesomeIcon icon={faDownload} className="mr-2" /> Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Method */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Methods</h2>
            <ul className="space-y-4">
                <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-vibrant-blue">
                    <div className="flex items-center">
                        <img src="/visa-logo.svg" alt="Visa" className="w-10 h-auto mr-4"/>
                        <div>
                            <p className="font-semibold text-gray-800">Visa •••• 1234</p>
                            <p className="text-sm text-gray-500">Expires 12/2026</p>
                        </div>
                    </div>
                     <span className="px-2 py-1 text-xs font-semibold text-vibrant-blue bg-blue-100 rounded-full">Primary</span>
                </li>
                 <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                        <img src="/mastercard-logo.svg" alt="Mastercard" className="w-10 h-auto mr-4"/>
                        <div>
                            <p className="font-semibold text-gray-800">Mastercard •••• 5678</p>
                            <p className="text-sm text-gray-500">Expires 08/2025</p>
                        </div>
                    </div>
                </li>
            </ul>
             <button className="mt-6 w-full text-center bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold py-3 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Payment Method
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing; 