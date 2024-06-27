"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react';

const useSuppressWarnings = (warningFilter: string) => {
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes(warningFilter)) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, [warningFilter]);
};

// placeholder data, will come from whatever we want to display from the database
const data = [
    {
      name: "Sun",
      visit: 4000,
      click: 2400,
    },
    {
      name: "Mon",
      visit: 3000,
      click: 1398,
    },
    {
      name: "Tue",
      visit: 2000,
      click: 3800,
    },
    {
      name: "Wed",
      visit: 2780,
      click: 3908,
    },
    {
      name: "Thu",
      visit: 1890,
      click: 4800,
    },
    {
      name: "Fri",
      visit: 2390,
      click: 3800,
    },
    {
      name: "Sat",
      visit: 3490,
      click: 4300,
    },
  ];

  // the type of chart we use can be changed, code comes from recharts documentation -- recharts.org
export default function Chart() {

  useSuppressWarnings("Support for defaultProps will be removed")

    return (
        <div className="h-96 bg-bgSoft p-5 rounded-lg shadow-lg shadow-slate-700">
        <h2 className='font-extralight text-textSoft mb-5'>Weekly Recap</h2>
        <ResponsiveContainer width="100%" height="90%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                {/* can change content background here */}
                <Tooltip contentStyle={{background: "#151c2c", border: "none"}}/>
                <Legend />
                <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
            </LineChart>
      </ResponsiveContainer>
        </div>
    );
}
