import Card from "../components/dashboard/card";
import Chart from "../components/dashboard/chart";
import Rightbar from "../components/dashboard/rightbar";
import Transactions from "../components/dashboard/transactions";

const Dashboard = () => {
    return (
        <div className="flex gap-5 mt-5">
            <div className="flex flex-col gap-5 w-4/5">
                <div className="flex gap-5 justify-between">
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Transactions />
                <Chart />
            </div>
            <div className="flex w-1/5">
                <Rightbar />
            </div>
        </div>
    );
}

export default Dashboard;