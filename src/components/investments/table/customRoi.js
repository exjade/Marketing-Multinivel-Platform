import React from 'react';

const CustomRoi = () => {
  return (
    <table className='w-full '>
      <thead className='text-justify w-full bg-badges-primary h-5'>
        <tr>
          <th>Amount</th>
          <th>ROI</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>$10 - $300</td>
          <td>3%</td>
        </tr>
        <tr>
          <td>$300 - $1000</td>
          <td>4%</td>
        </tr>
        <tr>
          <td>$1000 - $5000</td>
          <td>5%</td>
        </tr>
        <tr>
          <td>$5000 - $10000</td>
          <td>6%</td>
        </tr>
        <tr>
          <td>+$10000 </td>
          <td>7%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CustomRoi;
