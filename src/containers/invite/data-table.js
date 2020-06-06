import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import {
    getRelations
} from '../../apis/relation';


function DataTable({
    usePaging,
    pageNo,
    pageScale,
    totalCount,
}) {
    // const [selecteds, setSelecteds] = useState([]);
    
    // const addSelected = (added) => {
    //     setSelecteds([
    //       ...selecteds,
    //       {
    //         id: items.length,
    //         value: Math.random() * 100
    //       }
    //     ]);
    //   };

    const [friends, setFriends] = useState([]);

    const getFriendList = async() => { 
        try {
            const data = await getRelations('friend');
            const list = [];
            data.forEach(element => {
                list.push(element.relatedUser);
            });

            setFriends(list);
            console.log("친구들");
            console.log(friends);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchDetails = (c) => {
        console.log(c);
    }

    useEffect(() => {
        getFriendList();
        console.log('component did mount with useEffect!')
    }, []);

    return(
        <div>
            <Table>
                <TableBody>
                    {friends.map(c => {
                        return (
                            <TableRow onClick={() => fetchDetails(c)}>
                                <TableCell>
                                    <Button>{c.email}</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )

}

export default DataTable;

const Button = styled.button`
  border: 0;
  width: 100%;
  height: 50px;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 8px;
  font-size: 14px;
  color: white;
  background-color: #00567f;
  border-radius: 4px;
  margin: 4px;
  cursor: pointer;
  &:hover {
    background-color: #316b88;
  }
`;