import AppLayout from '@/layouts/App.layout'
import { useOrders } from '@/network/order.api'

export default function Home() {
  const { orders } = useOrders()
  return (
    <AppLayout>
      <table className="shadow-lg border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">#</th>
            <th className="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">Status</th>
            <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">Created at</th>
            <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">Last update</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {order.id}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                {order.status}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                {order.createdAt}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                {order.updatedAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  )
}
