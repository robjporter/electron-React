import React from 'react';
import Button from 'react-bootstrap/Button';

const UserActions = ({onClick}) => (
    <div className="container h-100 w-100">
        <table className="h-100 w-100">
            <tbody>
                <tr>
                <td className="text-center align-middle">
                    <Button variant="ciscoblue1" size="xlg" block onClick={onClick}>Create a new report</Button>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default UserActions;